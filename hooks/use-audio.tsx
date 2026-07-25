"use client"

import * as React from "react"
import { Product } from "@/data/products"

interface AudioContextType {
  currentTrack: Product | null
  isPlaying: boolean
  playTrack: (track: Product) => void
  togglePlay: () => void
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

  React.useEffect(() => {
    audioRef.current = new Audio()
    
    const audio = audioRef.current
    
    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
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

  const playTrack = (track: Product) => {
    if (currentTrack?.id === track.id) {
      togglePlay()
    } else {
      setCurrentTrack(track)
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const togglePlay = () => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      playTrack,
      togglePlay,
      progress,
      duration,
      volume,
      setVolume,
      seek
    }}>
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
