"use client"

import * as React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X
} from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import { Button } from "@/components/ui/button"

export function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    stop,
    progress,
    duration,
    volume,
    setVolume,
    seek
  } = useAudio()

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]">
      <div className="bg-background/95 backdrop-blur-xl border-t border-border">
        {/* Fine progress bar at top */}
        <div className="relative h-1 bg-foreground/10 cursor-pointer group">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-75"
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

        <div className="container max-w-7xl">
          <div className="flex items-center gap-2 h-14 md:h-16 px-2 md:px-4">
            {/* Cover + Info */}
            <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
              <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-md overflow-hidden shrink-0">
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 max-w-[80px] md:max-w-[160px]">
                <p className="text-xs md:text-sm font-semibold truncate text-foreground">{currentTrack.name}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground truncate hidden md:block">{currentTrack.style}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 md:gap-4 mx-auto">
              <Button
                onClick={togglePlay}
                size="icon"
                className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" /> : <Play className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current ml-0.5" />}
              </Button>
            </div>

            {/* Time (mobile) */}
            <span className="text-[10px] font-medium text-muted-foreground tabular-nums md:hidden">
              {formatTime(progress)}
            </span>

            {/* Volume + Close */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
                  {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="relative w-16 h-1 bg-foreground/10 rounded-full overflow-hidden group">
                  <div
                    className="absolute top-0 left-0 h-full bg-foreground/60 group-hover:bg-primary rounded-full transition-colors"
                    style={{ width: `${volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground tabular-nums hidden md:block w-8 text-right">
                {formatTime(progress)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
                onClick={stop}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
