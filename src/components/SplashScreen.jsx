import { useEffect, useRef, useState, useCallback } from 'react'

export default function SplashScreen({ onFinish }) {
  const videoRef = useRef(null)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const hasFinishedRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setIsFadingOut(true)
    // Synchronized 2.4s ultra-slow cinematic middle line anamorphic transition into landing page
    setTimeout(() => {
      onFinish?.()
    }, 2400)
  }, [onFinish])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return

    // Let BYTEME CTF title settle firmly on screen before the slow 2.4s transition begins
    if (video.currentTime >= video.duration - 0.45 && !hasFinishedRef.current) {
      handleFinish()
    }
  }

  // Keyboard shortcut: Escape, Space, or Enter skips immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFinish])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback if browser policy blocks autoplay
      })
    }
  }, [])

  return (
    <div
      className={`splash-fullscreen ${isFadingOut ? 'splash-fullscreen--fade-out' : ''}`}
      role="region"
      aria-label="Splash Screen"
      onClick={handleFinish}
    >
      {/* Pure Fullscreen Video */}
      <video
        ref={videoRef}
        src="/assets/splash_screen_bytme_completed.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className="splash-fullscreen-video"
      />

      {/* Horizontal Glowing Middle Line Anamorphic Transition Effect */}
      {isFadingOut && (
        <div className="splash-middle-line-transition" aria-hidden="true">
          <div className="middle-line-glow" />
          <div className="middle-line-beam" />
          <div className="middle-line-flare" />
        </div>
      )}
    </div>
  )
}
