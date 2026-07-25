"use client"

import * as React from "react"
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

  const fmt = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, '0')}`

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, elX: pos.x, elY: pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  React.useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => setPos({
      x: Math.max(0, Math.min(window.innerWidth - 300, dragRef.current.elX + e.clientX - dragRef.current.startX)),
      y: Math.max(0, Math.min(window.innerHeight - 200, dragRef.current.elY + e.clientY - dragRef.current.startY))
    })
    const onUp = () => setDragging(false)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp) }
  }, [dragging])

  return (
    <div className="fixed z-[100] select-none" style={{ left: pos.x, bottom: pos.y }}>
      <div className="w-72 rounded-2xl overflow-hidden border border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="flex flex-col">
          <div className="flex items-center justify-between px-3 pt-3">
            <button onPointerDown={onPointerDown} className="text-white/40 hover:text-white/70 p-1 -ml-1 cursor-grab active:cursor-grabbing"><GripHorizontal className="h-4 w-4" /></button>
            <button onClick={stop} className="text-white/40 hover:text-white/70 p-1"><X className="h-4 w-4" /></button>
          </div>
          <div className="px-4 pb-4 pt-6">
            <div className="flex items-center gap-3 mb-3">
              <button onClick={togglePlay} className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
              </button>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{currentTrack.name}</p>
                <p className="text-xs text-white/50 truncate">{currentTrack.style}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-white/90 rounded-full" style={{ width: `${(progress / (duration || 1)) * 100}%` }} />
                <input type="range" min="0" max={duration || 0} step="0.1" value={progress} onChange={(e) => seek(parseFloat(e.target.value))} className="absolute inset-0 w-full opacity-0 cursor-pointer" />
              </div>
              <span className="text-[10px] text-white/40 tabular-nums">{fmt(progress)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
