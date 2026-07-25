"use client"

import * as React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  X,
  GripHorizontal
} from "lucide-react"
import { useAudio } from "@/hooks/use-audio"

export function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    stop,
    progress,
    duration,
    seek
  } = useAudio()

  const [pos, setPos] = React.useState({ x: 16, y: 16 })
  const [dragging, setDragging] = React.useState(false)
  const dragRef = React.useRef({ startX: 0, startY: 0, elX: 0, elY: 0 })

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    dragRef.current.startX = e.clientX
    dragRef.current.startY = e.clientY
    dragRef.current.elX = pos.x
    dragRef.current.elY = pos.y
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  React.useEffect(() => {
    if (!dragging) return

    const handlePointerMove = (e: PointerEvent) => {
      const maxX = typeof window !== "undefined" ? window.innerWidth - 300 : 0
      const maxY = typeof window !== "undefined" ? window.innerHeight - 200 : 0
      setPos({
        x: Math.max(0, Math.min(maxX, dragRef.current.elX + e.clientX - dragRef.current.startX)),
        y: Math.max(0, Math.min(maxY, dragRef.current.elY + e.clientY - dragRef.current.startY))
      })
    }

    const handlePointerUp = () => setDragging(false)

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [dragging])

  return (
    <div className="fixed z-[100] select-none" style={{ left: pos.x, bottom: pos.y }}>
      <div className="relative w-[270px] rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl">
        {/* Background image layer */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={currentTrack.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="270px"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

        {/* Drag handle + Close */}
        <div className="flex items-center justify-between px-3 pt-3 relative">
          <button
            onPointerDown={handlePointerDown}
            className="cursor-grab active:cursor-grabbing text-white/40 hover:text-white/70 transition-colors p-1 -ml-1"
            aria-label="Déplacer"
          >
            <GripHorizontal className="h-4 w-4" />
          </button>
          <button
            onClick={stop}
            className="text-white/40 hover:text-white/70 transition-colors p-1"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-8 relative">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shrink-0"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="h-4 w-4 fill-current ml-0.5" />
              )}
            </button>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate drop-shadow-sm">{currentTrack.name}</p>
              <p className="text-xs text-white/50 truncate drop-shadow-sm">{currentTrack.style}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 h-1 rounded-full overflow-hidden bg-white/20 group cursor-pointer">
              <div
                className="absolute top-0 left-0 h-full bg-white/90 rounded-full transition-all duration-75"
                style={{ width: `${(progress / (duration || 1)) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={progress}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-[10px] font-medium text-white/40 tabular-nums">
              {formatTime(progress)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
