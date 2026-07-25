"use client"

import * as React from "react"
import { Product } from "@/data/products"

interface AudioContextType {
  currentTrack: Product | null
  isPlaying: boolean
  playTrack: (track: Product) => void
  togglePlay: () => void
  stop: () => void
  progress: number
  duration: number
  volume: number
  setVolume: (volume: number) => void
  seek: (time: number) => void
}

const AudioContext = React.createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = React.useState<Product | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolume] = React.useState(0.8)
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const progressRef = React.useRef(0)

  React.useEffect(() => {
    audioRef.current = new Audio()
    
    const audio = audioRef.current
    let rafId: number | null = null

    const updateProgress = () => {
      if (audio) {
        progressRef.current = audio.currentTime
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            setProgress(progressRef.current)
            rafId = null
          })
        }
      }
    }
    const updateDuration = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = React.useCallback(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    }
  }, [currentTrack, isPlaying])

  const playTrack = React.useCallback(async (track: Product) => {
    if (audioRef.current && currentTrack?.id === track.id) {
      togglePlay()
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl
        setCurrentTrack(track)
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Playback failed:", error)
          setIsPlaying(false)
        }
      }
    }
  }, [currentTrack, togglePlay])

  const stop = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setCurrentTrack(null)
    setProgress(0)
    setDuration(0)
  }, [])

  const seek = React.useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }, [])

  const value = React.useMemo(() => ({
    currentTrack,
    isPlaying,
    playTrack,
    togglePlay,
    stop,
    progress,
    duration,
    volume,
    setVolume,
    seek
  }), [currentTrack, isPlaying, playTrack, togglePlay, stop, progress, duration, volume, setVolume, seek])

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = React.useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
