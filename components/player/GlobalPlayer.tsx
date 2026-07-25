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
  X,
  Maximize2
} from "lucide-react"
import { useAudio } from "@/hooks/use-audio"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GlobalPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
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
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container max-w-5xl">
        <div className="glass rounded-2xl border border-white/10 p-3 flex flex-col md:flex-row items-center gap-4">
          
          {/* Info Section */}
          <div className="flex items-center gap-4 w-full md:w-1/4">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
              <Image 
                src={currentTrack.coverImage} 
                alt={currentTrack.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate text-foreground">{currentTrack.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.style}</p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex-1 flex flex-col items-center gap-2 w-full">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/70 hover:text-foreground">
                <SkipBack className="h-4 w-4 fill-current" />
              </Button>
              <Button 
                onClick={togglePlay}
                size="icon" 
                className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/70 hover:text-foreground">
                <SkipForward className="h-4 w-4 fill-current" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 w-full max-w-lg">
              <span className="text-[10px] font-medium text-muted-foreground w-8 text-right">
                {formatTime(progress)}
              </span>
              <div className="relative flex-1 h-1 bg-foreground/10 rounded-full overflow-hidden cursor-pointer group">
                <div 
                  className="absolute top-0 left-0 h-full bg-primary group-hover:bg-primary/80 transition-all"
                  style={{ width: `${(progress / duration) * 100}%` }}
                />
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 0} 
                  value={progress}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Section */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/70 hover:text-foreground" onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="relative w-24 h-1 bg-foreground/10 rounded-full overflow-hidden group">
               <div 
                  className="absolute top-0 left-0 h-full bg-foreground/70 group-hover:bg-primary transition-all"
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
        </div>
      </div>
    </div>
  )
}
