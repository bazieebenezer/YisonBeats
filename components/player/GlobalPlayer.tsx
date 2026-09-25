"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause, X, Volume2, Volume1 } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import { Waveform } from "@/components/ui/waveform"

function fmt(t: number) {
  if (isNaN(t) || !isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

export function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    stop,
    progress,
    duration,
    seek,
    volume,
    setVolume,
  } = useAudio()

  if (!currentTrack) return null

  const ratio = duration > 0 ? Math.min(progress / duration, 1) : 0

  const onWaveformSeek = (r: number) => {
    seek(r * duration)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] select-none">
      <div className="border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6">
          {/* Cover */}
          <Link
            href={`/product/${currentTrack.slug}`}
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border sm:h-14 sm:w-14"
            aria-label={`Ouvrir ${currentTrack.name}`}
          >
            <Image
              src={currentTrack.coverImage}
              alt={currentTrack.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </Link>

          {/* Title + waveform (desktop) */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/product/${currentTrack.slug}`}
                className="truncate text-sm font-semibold hover:text-foreground/70 transition-colors"
              >
                {currentTrack.name}
              </Link>
              <span className="hidden truncate text-xs text-muted-foreground sm:inline">{currentTrack.style}</span>
            </div>

            <div className="mt-1.5 hidden items-center gap-3 md:flex">
              <div className="h-10 w-full rounded-lg border border-border bg-muted/40 px-2">
                <Waveform
                  seed={currentTrack.id}
                  progress={ratio}
                  isPlaying={isPlaying}
                  interactive
                  onSeek={onWaveformSeek}
                  activeClass="bg-primary"
                  inactiveClass="bg-foreground/15"
                  label="Position de lecture"
                />
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground tabular">{fmt(progress)} / {fmt(duration)}</span>
            </div>

            {/* Mobile progress */}
            <div className="mt-1.5 flex items-center gap-2 md:hidden">
              <div className="relative h-1 flex-1 rounded-lg bg-muted overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-lg bg-foreground"
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground tabular">{fmt(progress)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              {volume > 0 ? (
                <Volume2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              ) : (
                <Volume1 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="h-1 w-24 cursor-pointer accent-[hsl(var(--primary))]"
              />
            </div>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Mettre en pause" : "Lecture"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground$ hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={stop}
              aria-label="Fermer le lecteur"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}