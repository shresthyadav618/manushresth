"use client";

import type { CSSProperties } from "react";
import { usePlayer } from "@/components/music-provider";

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const {
    current,
    playing,
    time,
    duration,
    volume,
    error,
    toggle,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer();

  if (!current) {
    return null;
  }

  const max = duration > 0 ? duration : 0;
  const progress = max > 0 ? Math.min(100, (time / max) * 100) : 0;

  return (
    <div className="now-playing" role="region" aria-label="Now playing">
      <div className="now-playing-inner">
        <button
          type="button"
          className="player-icon"
          onClick={prev}
          aria-label="Previous song"
        >
          ‹
        </button>

        <button
          type="button"
          className="player-icon"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? "❚❚" : "▶"}
        </button>

        <button
          type="button"
          className="player-icon"
          onClick={next}
          aria-label="Next song"
        >
          ›
        </button>

        <div className="now-playing-copy">
          <p className="now-playing-title">
            {current.title}
            <span className="now-playing-artist"> — {current.artist}</span>
          </p>
          {error ? <p className="player-error">{error}</p> : null}
        </div>

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

        <label className="player-volume">
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
