import { useEffect, useRef, useState, useCallback } from 'react'

const DESKTOP_VIDEO = '/assets/splash_screen_bytme_completed.mp4'
const MOBILE_VIDEO = '/assets/mobile_spash.mp4'

function isMobileScreen() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 860px), (orientation: portrait) and (max-width: 1024px)').matches
}

export default function SplashScreen({ onFinish }) {
  const videoRef = useRef(null)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const hasFinishedRef = useRef(false)
  const hasStartedPlaybackRef = useRef(false)
  const [videoSrc] = useState(() => (isMobileScreen() ? MOBILE_VIDEO : DESKTOP_VIDEO))
  const [isMuted, setIsMuted] = useState(false)

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setIsFadingOut(true)
    // Synchronized 2.4s ultra-slow cinematic middle line anamorphic transition into landing page
    setTimeout(() => {
      onFinish?.()
    }, 2400)
  }, [onFinish])

  const toggleSound = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    if (!nextMuted) {
      video.volume = 1.0
      video.play().catch(() => {})
    }
    setIsMuted(nextMuted)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return

    // Let BYTEME CTF title settle firmly on screen before the slow 2.4s transition begins
    if (video.currentTime >= video.duration - 0.45 && !hasFinishedRef.current) {
      handleFinish()
    }
  }

  const unmute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    video.volume = 1.0
    setIsMuted(false)
  }, [])

  // Pre-set video audio configuration immediately on mount
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.muted = false
      video.volume = 1.0
    }
  }, [])

  // Play video smoothly once sufficiently buffered with audio unmuted by default
  const startPlayback = useCallback(() => {
    if (hasStartedPlaybackRef.current) return
    hasStartedPlaybackRef.current = true
    setIsReady(true)

    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1.0

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false)
        })
        .catch(() => {
          // If browser policy restricts unmuted autoplay, start video playing muted initially
          video.muted = true
          setIsMuted(true)
          video.play().catch(() => {})
        })
    }
  }, [])

  // If muted by browser policy, immediately unmute on first user interaction anywhere
  useEffect(() => {
    if (!isMuted) return

    const handleUserGesture = (e) => {
      // Don't intercept explicit skip button clicks or Escape key
      if (e.target && typeof e.target.closest === 'function' && e.target.closest('.splash-btn-skip')) {
        return
      }
      if (e.key === 'Escape') {
        return
      }
      unmute()
    }

    window.addEventListener('pointerdown', handleUserGesture, { capture: true, once: true })
    window.addEventListener('keydown', handleUserGesture, { capture: true, once: true })
    window.addEventListener('touchstart', handleUserGesture, { capture: true, once: true })

    return () => {
      window.removeEventListener('pointerdown', handleUserGesture, { capture: true })
      window.removeEventListener('keydown', handleUserGesture, { capture: true })
      window.removeEventListener('touchstart', handleUserGesture, { capture: true })
    }
  }, [isMuted, unmute])

  // Keyboard shortcut: Escape skips immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleFinish()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFinish])

  // Pre-buffering listener: ensures smooth glitch-free playback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // If video is already buffered enough
    if (video.readyState >= 3) {
      startPlayback()
      return
    }

    const onCanPlayThrough = () => {
      startPlayback()
    }

    // Safety fallback: after 1.8s, start playback if canplaythrough is delayed
    const timeoutId = setTimeout(() => {
      startPlayback()
    }, 1800)

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true })
    video.addEventListener('canplay', onCanPlayThrough, { once: true })

    return () => {
      clearTimeout(timeoutId)
      video.removeEventListener('canplaythrough', onCanPlayThrough)
      video.removeEventListener('canplay', onCanPlayThrough)
    }
  }, [startPlayback, videoSrc])

  return (
    <div
      className={`splash-fullscreen ${isFadingOut ? 'splash-fullscreen--fade-out' : ''}`}
      role="region"
      aria-label="Splash Screen"
      onClick={() => {
        if (isMuted) unmute()
      }}
    >
      {/* Sleek Theme Preloader while initial buffer completes */}
      {!isReady && (
        <div className="splash-preloader" aria-live="polite">
          <div className="splash-preloader-ring">
            <span className="splash-preloader-core" />
          </div>
          <div className="splash-preloader-text">
            <span className="splash-preloader-label">INITIALIZING SOUL REALM</span>
            <span className="splash-preloader-bar">
              <span className="splash-preloader-fill" />
            </span>
          </div>
        </div>
      )}

      {/* Pure Fullscreen Responsive Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className={`splash-fullscreen-video ${isReady ? 'splash-fullscreen-video--ready' : ''}`}
      />

      {/* Cinematic Audio Control */}
      {isReady && (
        <div className="splash-controls" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={toggleSound}
            className={`splash-btn-audio ${isMuted ? 'splash-btn-audio--unmute-alert' : ''}`}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <>
                <svg className="splash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                <span>CLICK TO UNMUTE</span>
              </>
            ) : (
              <>
                <svg className="splash-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <span>AUDIO ON</span>
              </>
            )}
          </button>
        </div>
      )}

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
