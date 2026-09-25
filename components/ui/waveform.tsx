"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function hashCode(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Déterministe : même seed = même forme d'onde (représente la structure du titre). */
function buildHeights(seed: string, bars: number): number[] {
  const rand = mulberry32(hashCode(seed))
  const heights: number[] = []
  for (let i = 0; i < bars; i++) {
    const x = i / (bars - 1)
    const envelope = Math.pow(Math.sin(Math.PI * x), 0.8)
    const boost =
      (Math.abs(x - 0.34) < 0.08 ? 0.2 : 0) + (Math.abs(x - 0.68) < 0.08 ? 0.2 : 0)
    let h = envelope * (0.3 + 0.7 * rand())
    h = Math.min(h + boost * rand(), 1)
    heights.push(Math.max(0.12, h))
  }
  return heights
}

interface WaveformProps {
  seed: string
  bars?: number
  progress?: number
  isPlaying?: boolean
  interactive?: boolean
  onSeek?: (ratio: number) => void
  activeClass?: string
  inactiveClass?: string
  className?: string
  label?: string
}

export function Waveform({
  seed,
  bars = 48,
  progress = 0,
  isPlaying = false,
  interactive = false,
  onSeek,
  activeClass = "bg-primary",
  inactiveClass = "bg-white/25",
  className,
  label = "Prévisualisation",
}: WaveformProps) {
  const heights = React.useMemo(() => buildHeights(seed, bars), [seed, bars])
  const containerRef = React.useRef<HTMLDivElement>(null)

  const ratio = Math.max(0, Math.min(1, progress))
  const activeIndex = Math.round(ratio * (bars - 1))

  const handleSeek = React.useCallback(
    (clientX: number) => {
      const el = containerRef.current
      if (!el || !onSeek) return
      const rect = el.getBoundingClientRect()
      const next = (clientX - rect.left) / rect.width
      onSeek(Math.max(0, Math.min(1, next)))
    },
    [onSeek]
  )

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (!onSeek) return
      let next = ratio
      if (e.key === "ArrowLeft") next = ratio - 0.05
      else if (e.key === "ArrowRight") next = ratio + 0.05
      else if (e.key === "Home") next = 0
      else if (e.key === "End") next = 1
      else return
      e.preventDefault()
      onSeek(Math.max(0, Math.min(1, next)))
    },
    [ratio, onSeek]
  )

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
      aria-valuetext={`${Math.round(ratio * 100)}%`}
      tabIndex={interactive ? 0 : undefined}
      onPointerDown={interactive ? (e) => handleSeek(e.clientX) : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      className={cn(
        "flex h-full w-full items-center gap-[2px]",
        interactive && "cursor-pointer touch-none",
        className
      )}
    >
      <div className={cn("flex h-full w-full items-center gap-[2px]", isPlaying && "waveform-dancing")} aria-hidden="true">
        {heights.map((height, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-lg transition-colors duration-200",
              i <= activeIndex ? activeClass : inactiveClass
            )}
            style={{
              height: `${height * 100}%`,
              animationDelay: isPlaying ? `${(i % 8) * 0.06}s` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}