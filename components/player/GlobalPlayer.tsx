"use client"

import * as React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
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

  const [isExpanded, setIsExpanded] = React.useState(false)

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100]">
      <div className="relative bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl">
        <div className="container max-w-7xl">
          <div className="flex items-center gap-3 h-16 md:h-20 px-2 md:px-4">
            {/* Cover + Info */}
            <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
              <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-lg overflow-hidden shrink-0 shadow-md">
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 max-w-[100px] md:max-w-[180px]">
                <p className="text-sm font-semibold truncate text-foreground">{currentTrack.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.style}</p>
              </div>
            </div>

            {/* Controls + Progress */}
            <div className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 px-2 md:px-6">
              <div className="flex items-center gap-4 md:gap-6">
                <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-muted-foreground hover:text-foreground hidden sm:flex">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                >
                  {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5 fill-current" /> : <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-muted-foreground hover:text-foreground hidden sm:flex">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 w-full max-w-md">
                <span className="text-[11px] font-medium text-muted-foreground tabular-nums w-8 text-right hidden sm:block">
                  {formatTime(progress)}
                </span>
                <div className="relative flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden cursor-pointer group">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-75"
                    style={{ width: `${(progress / duration) * 100}%` }}
                  />
                  <div
                    className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-md -mr-1.5" />
                  </div>
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
                <span className="text-[11px] font-medium text-muted-foreground tabular-nums w-8 hidden sm:block">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume + Close */}
            <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
                  {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <div className="relative w-20 h-1.5 bg-foreground/10 rounded-full overflow-hidden group">
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
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
                onClick={stop}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
