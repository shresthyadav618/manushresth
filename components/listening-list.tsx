"use client";

import type { CSSProperties } from "react";
import { usePlayer } from "@/components/music-provider";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function ListeningList() {
  const {
    songs,
    index,
    playing,
    error,
    time,
    duration,
    playAt,
    toggle,
    seek,
    current,
  } = usePlayer();

  if (songs.length === 0) {
    return <p className="empty-note">Nothing here yet.</p>;
  }

  const max = duration > 0 ? duration : 0;
  const progress = max > 0 ? Math.min(100, (time / max) * 100) : 0;

  return (
    <>
      {current ? (
        <p className="sr-only" aria-live="polite">
          {playing ? "Playing" : "Paused"}: {current.title} by {current.artist}
        </p>
      ) : null}
      <ol className="listening-list">
        {songs.map((song, songIndex) => {
          const active = songIndex === index;

          return (
            <li key={song.id} className="listening-item">
              <button
                type="button"
                className={active ? "listening-track is-current" : "listening-track"}
                onClick={() => {
                  if (active) {
                    toggle();
                  } else {
                    playAt(songIndex);
                  }
                }}
                aria-current={active ? "true" : undefined}
                aria-label={
                  active && playing
                    ? `Pause ${song.title} by ${song.artist}`
                    : `Play ${song.title} by ${song.artist}`
                }
              >
                <span className="listening-index" aria-hidden="true">
                  {active && playing ? "▶" : pad(songIndex + 1)}
                </span>
                <span className="listening-copy">
                  <span className="display listening-title">{song.title}</span>
                  <span className="listening-artist">{song.artist}</span>
                  {active && error ? (
                    <span className="player-error">{error}</span>
                  ) : null}
                </span>
              </button>

              {active ? (
                <div className="listening-inline">
                  <button
                    type="button"
                    className="player-icon"
                    onClick={toggle}
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? "❚❚" : "▶"}
                  </button>
                  <label className="player-progress">
                    <span className="sr-only">Seek</span>
                    <input
                      type="range"
                      min={0}
                      max={max || 0}
                      step={0.1}
                      value={max ? Math.min(time, max) : 0}
                      onChange={(event) => seek(Number(event.target.value))}
                      aria-valuetext={`${formatTime(time)} of ${formatTime(max)}`}
                      style={{ "--progress": `${progress}%` } as CSSProperties}
                    />
                  </label>
                  <span className="now-playing-time">
                    {formatTime(time)}
                    <span aria-hidden="true"> / </span>
                    {max > 0 ? formatTime(max) : "–:––"}
                  </span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </>
  );
}
