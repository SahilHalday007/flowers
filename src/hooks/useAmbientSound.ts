import { useCallback, useEffect, useRef, useState } from 'react'

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/bg-music.mp3')
    audio.autoplay = true
    audio.loop = true
    audio.muted = true
    audio.preload = 'auto'
    audioRef.current = audio
    void audio.play().catch(() => {})

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const next = !enabled
    audio.muted = !next
    if (next) void audio.play().catch(() => {})
    setEnabled(next)
  }, [enabled])

  return { enabled, toggle }
}
