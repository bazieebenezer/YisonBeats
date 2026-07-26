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

// Renamed to avoid shadowing the browser's native AudioContext (Web Audio API)
const PlayerContext = React.createContext<AudioContextType | undefined>(undefined)

/** Parse a "M:SS" or "MM:SS" duration string into seconds */
function parseDurationString(dur?: string): number {
  if (!dur) return 180 // default 3 min
  const parts = dur.split(":")
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0
    const secs = parseInt(parts[1], 10) || 0
    return mins * 60 + secs
  }
  return 180
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = React.useState<Product | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [volume, setVolumeState] = React.useState(0.8)
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const rafIdRef = React.useRef<number | null>(null)

  // Simulation mode refs
  const isSimulatingRef = React.useRef(false)
  const simRafRef = React.useRef<number | null>(null)
  const simLastTimeRef = React.useRef<number>(0)
  const simProgressRef = React.useRef<number>(0)
  const simDurationRef = React.useRef<number>(0)
  const simPlayingRef = React.useRef(false)

  // --- Simulation engine ---
  const startSimulation = React.useCallback((trackDuration: number, startAt: number = 0) => {
    isSimulatingRef.current = true
    simDurationRef.current = trackDuration
    simProgressRef.current = startAt
    simPlayingRef.current = true
    simLastTimeRef.current = performance.now()

    setDuration(trackDuration)
    setProgress(startAt)
    setIsPlaying(true)

    const tick = (now: number) => {
      if (!simPlayingRef.current || !isSimulatingRef.current) return

      const delta = (now - simLastTimeRef.current) / 1000
      simLastTimeRef.current = now
      simProgressRef.current = Math.min(simProgressRef.current + delta, simDurationRef.current)

      setProgress(simProgressRef.current)

      if (simProgressRef.current >= simDurationRef.current) {
        // Track ended
        simPlayingRef.current = false
        isSimulatingRef.current = false
        setIsPlaying(false)
        setProgress(0)
        return
      }

      simRafRef.current = requestAnimationFrame(tick)
    }

    simRafRef.current = requestAnimationFrame(tick)
  }, [])

  const pauseSimulation = React.useCallback(() => {
    simPlayingRef.current = false
    if (simRafRef.current !== null) {
      cancelAnimationFrame(simRafRef.current)
      simRafRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const resumeSimulation = React.useCallback(() => {
    if (!isSimulatingRef.current) return
    simPlayingRef.current = true
    simLastTimeRef.current = performance.now()
    setIsPlaying(true)

    const tick = (now: number) => {
      if (!simPlayingRef.current || !isSimulatingRef.current) return

      const delta = (now - simLastTimeRef.current) / 1000
      simLastTimeRef.current = now
      simProgressRef.current = Math.min(simProgressRef.current + delta, simDurationRef.current)

      setProgress(simProgressRef.current)

      if (simProgressRef.current >= simDurationRef.current) {
        simPlayingRef.current = false
        isSimulatingRef.current = false
        setIsPlaying(false)
        setProgress(0)
        return
      }

      simRafRef.current = requestAnimationFrame(tick)
    }

    simRafRef.current = requestAnimationFrame(tick)
  }, [])

  const stopSimulation = React.useCallback(() => {
    simPlayingRef.current = false
    isSimulatingRef.current = false
    if (simRafRef.current !== null) {
      cancelAnimationFrame(simRafRef.current)
      simRafRef.current = null
    }
  }, [])

  // --- Real audio setup ---
  React.useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = 0.8
    
    const audio = audioRef.current

    const updateProgress = () => {
      if (audio && !isNaN(audio.currentTime) && !isSimulatingRef.current) {
        setProgress(audio.currentTime)
      }
      rafIdRef.current = requestAnimationFrame(updateProgress)
    }

    const onLoadedMetadata = () => {
      if (audio && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    const onError = () => {
      // Audio file not available — don't log as error, just note it
      console.info("Audio file not available, switching to simulation mode")
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    rafIdRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      if (simRafRef.current !== null) {
        cancelAnimationFrame(simRafRef.current)
      }
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.pause()
      audio.src = ""
    }
  }, [])

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = React.useCallback(() => {
    // Simulation mode toggle
    if (isSimulatingRef.current) {
      if (simPlayingRef.current) {
        pauseSimulation()
      } else {
        resumeSimulation()
      }
      return
    }

    // Real audio toggle
    const audio = audioRef.current
    if (!audio || !audio.src || audio.src === window.location.href) return

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [pauseSimulation, resumeSimulation])

  const playTrack = React.useCallback((track: Product) => {
    const audio = audioRef.current
    if (!audio) return

    // If same track is clicked, toggle play/pause
    if (currentTrack?.id === track.id) {
      if (isSimulatingRef.current) {
        if (simPlayingRef.current) {
          pauseSimulation()
        } else {
          resumeSimulation()
        }
      } else {
        if (audio.paused) {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Fallback to simulation
              const dur = parseDurationString(track.duration)
              startSimulation(dur, simProgressRef.current)
            })
        } else {
          audio.pause()
          setIsPlaying(false)
        }
      }
      return
    }

    // New track: stop any ongoing simulation
    stopSimulation()
    audio.pause()
    setCurrentTrack(track)
    setProgress(0)
    setDuration(0)

    // Try real audio first
    audio.src = track.previewUrl
    audio.load()

    audio.play()
      .then(() => {
        isSimulatingRef.current = false
        setIsPlaying(true)
      })
      .catch(() => {
        // Audio file not available — start simulation
        const dur = parseDurationString(track.duration)
        startSimulation(dur)
      })
  }, [currentTrack?.id, startSimulation, stopSimulation, pauseSimulation, resumeSimulation])

  const stop = React.useCallback(() => {
    stopSimulation()
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      audio.src = ""
    }
    setIsPlaying(false)
    setCurrentTrack(null)
    setProgress(0)
    setDuration(0)
  }, [stopSimulation])

  const seek = React.useCallback((time: number) => {
    if (isNaN(time) || !isFinite(time)) return

    if (isSimulatingRef.current) {
      simProgressRef.current = Math.max(0, Math.min(time, simDurationRef.current))
      simLastTimeRef.current = performance.now()
      setProgress(simProgressRef.current)
      return
    }

    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
      setProgress(time)
    }
  }, [])

  const setVolume = React.useCallback((v: number) => {
    setVolumeState(Math.max(0, Math.min(1, v)))
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
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export const useAudio = () => {
  const context = React.useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
