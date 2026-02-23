import { useEffect, useRef, useState } from 'react'

export function useSound() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const successSound = useRef<HTMLAudioElement | null>(null)
  const errorSound = useRef<HTMLAudioElement | null>(null)
  const flipSound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    successSound.current = new Audio('/sounds/success.mp3')
    errorSound.current = new Audio('/sounds/error.mp3')
    flipSound.current = new Audio('/sounds/flip.mp3')
    
    // Загружаем из localStorage
    const saved = localStorage.getItem('soundEnabled')
    if (saved !== null) {
      setIsSoundEnabled(JSON.parse(saved))
    }
  }, [])

  const playSuccess = () => {
    if (isSoundEnabled && successSound.current) {
      successSound.current.currentTime = 0
      successSound.current.play().catch(() => {})
    }
  }

  const playError = () => {
    if (isSoundEnabled && errorSound.current) {
      errorSound.current.currentTime = 0
      errorSound.current.play().catch(() => {})
    }
  }

  const playFlip = () => {
    if (isSoundEnabled && flipSound.current) {
      flipSound.current.currentTime = 0
      flipSound.current.play().catch(() => {})
    }
  }

  const toggleSound = () => {
    const newValue = !isSoundEnabled
    setIsSoundEnabled(newValue)
    localStorage.setItem('soundEnabled', JSON.stringify(newValue))
  }

  return {
    isSoundEnabled,
    toggleSound,
    playSuccess,
    playError,
    playFlip
  }
}
