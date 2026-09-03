"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  isLocalSong,
  isYouTubeSong,
  songs,
  type Song,
} from "@/content/songs";
import {
  loadYouTubeIframeAPI,
  PLAYBACK_ERROR,
  type YouTubePlayer,
} from "@/lib/youtube-iframe";

type Player = {
  songs: Song[];
  current: Song | null;
  index: number;
  playing: boolean;
  time: number;
  duration: number;
  volume: number;
  error: string | null;
  playSong: (song: Song) => void;
  playAt: (index: number) => void;
  pauseSong: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seek: (seconds: number) => void;
  seekTo: (seconds: number) => void;
  setVolume: (value: number) => void;
};

const PlayerContext = createContext<Player | null>(null);

export function usePlayer() {
  const value = useContext(PlayerContext);

  if (!value) {
    throw new Error("usePlayer must be used within MusicProvider");
  }

  return value;
}

function failMessage() {
  return PLAYBACK_ERROR;
}

export default function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<YouTubePlayer | null>(null);
  const indexRef = useRef(-1);
  const pendingPlay = useRef(false);
  const creatingYouTube = useRef(false);
  const userPaused = useRef(false);
  const timeRef = useRef(0);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.85);
  const [error, setError] = useState<string | null>(null);

  const current = index >= 0 ? songs[index] ?? null : null;

  const pauseLocal = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const pauseYouTube = useCallback(() => {
    try {
      youtubeRef.current?.pauseVideo();
    } catch {
      // Player may not be ready yet.
    }
  }, []);

  const applyVolume = useCallback((value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }

    try {
      youtubeRef.current?.setVolume(Math.round(value * 100));
    } catch {
      // Ignore until the YouTube player exists.
    }
  }, []);

  const stopPlayback = useCallback(() => {
    pendingPlay.current = false;
    pauseLocal();
    pauseYouTube();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    try {
      youtubeRef.current?.seekTo(0, true);
    } catch {
      // Ignore.
    }

    setPlaying(false);
    setTime(0);
    timeRef.current = 0;
  }, [pauseLocal, pauseYouTube]);

  const playAt = useCallback((nextIndex: number) => {
    if (!songs[nextIndex]) {
      return;
    }

    pendingPlay.current = true;
    userPaused.current = false;
    setError(null);
    setTime(0);
    setDuration(0);
    setIndex(nextIndex);
  }, []);

  const playSong = useCallback(
    (song: Song) => {
      const nextIndex = songs.findIndex((entry) => entry.id === song.id);

      if (nextIndex >= 0) {
        playAt(nextIndex);
      }
    },
    [playAt]
  );

  const pauseSong = useCallback(() => {
    pendingPlay.current = false;
    userPaused.current = true;
    pauseLocal();
    pauseYouTube();
    setPlaying(false);
  }, [pauseLocal, pauseYouTube]);

  const seek = useCallback((seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return;
    }

    const nextTime = Math.max(0, seconds);
    timeRef.current = nextTime;
    const song = songs[indexRef.current];

    if (song && isLocalSong(song) && audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }

    if (song && isYouTubeSong(song)) {
      try {
        youtubeRef.current?.seekTo(nextTime, true);
      } catch {
        setError(failMessage());
      }
    }

    setTime(nextTime);
  }, []);

  const toggle = useCallback(() => {
    const song = songs[indexRef.current];

    if (!song) {
      return;
    }

    if (playing) {
      pauseSong();
      return;
    }

    pendingPlay.current = true;
    userPaused.current = false;
    setError(null);

    if (isLocalSong(song)) {
      void audioRef.current?.play().catch(() => {
        setError(failMessage());
        setPlaying(false);
      });
      return;
    }

    try {
      youtubeRef.current?.playVideo();
    } catch {
      playAt(indexRef.current);
    }
  }, [pauseSong, playAt, playing]);

  const next = useCallback(() => {
    const currentIndex = indexRef.current;

    if (currentIndex < 0 || currentIndex >= songs.length - 1) {
      stopPlayback();
      return;
    }

    playAt(currentIndex + 1);
  }, [playAt, stopPlayback]);

  const prev = useCallback(() => {
    const currentIndex = indexRef.current;
    let now = timeRef.current;

    try {
      if (youtubeRef.current) {
        now = youtubeRef.current.getCurrentTime() || now;
      } else if (audioRef.current) {
        now = audioRef.current.currentTime;
      }
    } catch {
      // Fall back to the last known time.
    }

    if (now > 3) {
      seek(0);
      return;
    }

    if (currentIndex <= 0) {
      seek(0);
      return;
    }

    playAt(currentIndex - 1);
  }, [playAt, seek]);

  const setVolume = useCallback(
    (value: number) => {
      const nextValue = Math.min(1, Math.max(0, value));
      setVolumeState(nextValue);
      applyVolume(nextValue);
    },
    [applyVolume]
  );

  const volumeRef = useRef(volume);
  const nextRef = useRef(next);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    void loadYouTubeIframeAPI().catch(() => {
      // The player is created later, on an explicit click.
    });
  }, []);

  useEffect(() => {
    applyVolume(volume);
  }, [applyVolume, volume]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-now-playing", Boolean(current));

    return () => {
      document.documentElement.classList.remove("has-now-playing");
    };
  }, [current]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    const tick = () => {
      const song = songs[indexRef.current];

      if (song && isLocalSong(song) && audioRef.current) {
        timeRef.current = audioRef.current.currentTime;
        setTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
        return;
      }

      const player = youtubeRef.current;

      if (!player) {
        return;
      }

      try {
        const currentTime = player.getCurrentTime() || 0;
        timeRef.current = currentTime;
        setTime(currentTime);
        setDuration(player.getDuration() || 0);
      } catch {
        // Duration is unavailable until the video is ready.
      }
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [playing, current]);

  useEffect(() => {
    const audio = audioRef.current;
    const song = current;

    if (!song) {
      return;
    }

    if (isLocalSong(song)) {
      pauseYouTube();

      if (!audio) {
        return;
      }

      audio.src = song.src;
      audio.load();

      if (pendingPlay.current) {
        pendingPlay.current = false;
        void audio.play().catch(() => {
          setError(failMessage());
          setPlaying(false);
        });
      }

      return;
    }

    pauseLocal();

    const host = hostRef.current;

    if (!host || !isYouTubeSong(song)) {
      return;
    }

    let cancelled = false;

    const attach = async () => {
      try {
        const YT = await loadYouTubeIframeAPI();

        if (cancelled) {
          return;
        }

        const existing = youtubeRef.current;

        const latest = songs[indexRef.current];
        const videoId =
          latest && isYouTubeSong(latest) ? latest.youtubeId : song.youtubeId;

        if (existing) {
          existing.loadVideoById({ videoId, startSeconds: 0 });
          existing.setVolume(Math.round(volumeRef.current * 100));
          return;
        }

        if (creatingYouTube.current) {
          return;
        }

        creatingYouTube.current = true;
        host.replaceChildren();
        const mount = document.createElement("div");
        host.appendChild(mount);

        youtubeRef.current = new YT.Player(mount, {
          width: 320,
          height: 180,
          videoId,
          playerVars: {
            autoplay: pendingPlay.current ? 1 : 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event) => {
              creatingYouTube.current = false;
              event.target.setVolume(Math.round(volumeRef.current * 100));
              const active = songs[indexRef.current];
              const loaded = event.target.getVideoData?.()?.video_id;

              if (
                active &&
                isYouTubeSong(active) &&
                loaded &&
                loaded !== active.youtubeId
              ) {
                event.target.loadVideoById({
                  videoId: active.youtubeId,
                  startSeconds: 0,
                });
              }

              setDuration(event.target.getDuration() || 0);

              if (pendingPlay.current) {
                pendingPlay.current = false;
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              const state = event.data;

              if (state === YT.PlayerState.PLAYING) {
                userPaused.current = false;
                setPlaying(true);
                setError(null);
                setDuration(event.target.getDuration() || 0);
              }

              if (state === YT.PlayerState.PAUSED) {
                if (userPaused.current) {
                  setPlaying(false);
                }
              }

              if (state === YT.PlayerState.ENDED) {
                nextRef.current();
              }
            },
            onError: () => {
              pendingPlay.current = false;
              setPlaying(false);
              setError(failMessage());
            },
          },
        });
      } catch {
        creatingYouTube.current = false;
        pendingPlay.current = false;
        setPlaying(false);
        setError(failMessage());
      }
    };

    void attach();

    return () => {
      cancelled = true;
    };
  }, [current, pauseLocal, pauseYouTube]);

  useEffect(() => {
    return () => {
      try {
        youtubeRef.current?.destroy();
      } catch {
        // Unmounting.
      }
    };
  }, []);

  const value = useMemo<Player>(
    () => ({
      songs,
      current,
      index,
      playing,
      time,
      duration,
      volume,
      error,
      playSong,
      playAt,
      pauseSong,
      toggle,
      next,
      prev,
      nextSong: next,
      previousSong: prev,
      seek,
      seekTo: seek,
      setVolume,
    }),
    [
      current,
      duration,
      error,
      index,
      next,
      pauseSong,
      playAt,
      playSong,
      playing,
      prev,
      seek,
      setVolume,
      time,
      toggle,
      volume,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      <div
        ref={hostRef}
        className="yt-playback-host"
        aria-hidden="true"
      />
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) =>
          setDuration(event.currentTarget.duration || 0)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration || 0)
        }
        onEnded={next}
        onError={() => {
          setPlaying(false);
          setError(failMessage());
        }}
      />
      {children}
    </PlayerContext.Provider>
  );
}
