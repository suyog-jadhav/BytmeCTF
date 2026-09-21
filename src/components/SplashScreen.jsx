import { useEffect, useRef, useState, useCallback } from 'react'

const DESKTOP_VIDEO_LOCAL = '/assets/new_splash.mp4'
const DESKTOP_VIDEO_REMOTE = 'https://res.cloudinary.com/xzpsnxrr/video/upload/v1789819633/new_splash.mp4'
const MOBILE_VIDEO = '/assets/mobile_spash.mp4'

function isMobileScreen() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 860px), (orientation: portrait) and (max-width: 1024px)').matches
}

export default function SplashScreen({ onFinish }) {
  const videoRef = useRef(null)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [activeSrc, setActiveSrc] = useState(null)
  const [isBlobReady, setIsBlobReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const hasFinishedRef = useRef(false)
  const hasStartedPlaybackRef = useRef(false)
  const blobUrlRef = useRef(null)

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

  // Robust Unmute + Play: ensures video continues playing seamlessly on mobile
  const unmuteAndPlay = useCallback((e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1.0
    setIsMuted(false)

    // Crucial for iOS Safari and Android Chrome: calling play() directly
    // within the user gesture handler ensures audio is enabled without pausing the video
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Playback resume notice:', err)
      })
    }
  }, [])

  const toggleSound = (e) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    const video = videoRef.current
    if (!video) return

    if (video.muted || isMuted) {
      unmuteAndPlay(e)
    } else {
      video.muted = true
      setIsMuted(true)
    }
  }

  // Play video smoothly once 100% buffered with audio
  const startPlayback = useCallback(() => {
    if (hasStartedPlaybackRef.current) return
    const video = videoRef.current
    if (!video) return

    hasStartedPlaybackRef.current = true

    video.currentTime = 0
    video.muted = false
    video.volume = 1.0

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false)
          setIsReady(true) // Loading animation ends only after smooth playback starts
        })
        .catch(() => {
          // If mobile browser policy restricts unmuted autoplay, start muted
          video.muted = true
          setIsMuted(true)
          video
            .play()
            .then(() => {
              setIsReady(true)
            })
            .catch(() => {
              // Fallback: reveal video even if initial autoplay was blocked
              setIsReady(true)
            })
        })
    } else {
      setIsReady(true)
    }
  }, [])

  // Preload the entire video and audio stream into local memory as a Blob before playback
  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchAsBlob(url) {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const contentLengthHeader = res.headers.get('content-length')
      const total = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0

      if (!res.body || !total) {
        const blob = await res.blob()
        return blob
      }

      const reader = res.body.getReader()
      let received = 0
      const chunks = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        chunks.push(value)
        received += value.length
        if (total > 0 && !isCancelled) {
          const pct = Math.min(99, Math.round((received / total) * 100))
          setLoadProgress(pct)
        }
      }

      return new Blob(chunks, { type: 'video/mp4' })
    }

    async function preloadVideo() {
      const candidates = isMobileScreen()
        ? [MOBILE_VIDEO]
        : [DESKTOP_VIDEO_LOCAL, DESKTOP_VIDEO_REMOTE]

      for (const src of candidates) {
        if (isCancelled) return
        try {
          const fullBlob = await fetchAsBlob(src)
          if (isCancelled) return
          const url = URL.createObjectURL(fullBlob)
          blobUrlRef.current = url
          setActiveSrc(url)
          setLoadProgress(100)
          setIsBlobReady(true)
          return
        } catch (err) {
          if (isCancelled) return
          console.warn(`Preload attempt for ${src} failed, checking fallback:`, err)
        }
      }

      // Direct fallback only if all preload attempts fail
      if (!isCancelled && !blobUrlRef.current) {
        const fallbackSrc = isMobileScreen() ? MOBILE_VIDEO : DESKTOP_VIDEO_REMOTE
        setActiveSrc(fallbackSrc)
        setLoadProgress(100)
        setIsBlobReady(true)
      }
    }

    preloadVideo()

    return () => {
      isCancelled = true
      controller.abort()
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
        blobUrlRef.current = null
      }
    }
  }, [])

  // Strict Condition: Keep loading animation running until the full video & audio are decoded and ready to play through
  useEffect(() => {
    if (!isBlobReady || !activeSrc) return
    const video = videoRef.current
    if (!video) return

    video.load()

    // readyState 4 = HAVE_ENOUGH_DATA (video & audio can play through without buffering lag)
    if (video.readyState >= 4) {
      startPlayback()
      return
    }

    const onCanPlayThrough = () => {
      if (video.readyState >= 4) {
        startPlayback()
      } else {
        requestAnimationFrame(() => {
          if (video.readyState >= 3) {
            startPlayback()
          }
        })
      }
    }

    video.addEventListener('canplaythrough', onCanPlayThrough, { once: true })

    // Safety timeout: in case browser delays firing canplaythrough even with full blob
    const safetyTimer = setTimeout(() => {
      if (video.readyState >= 2) {
        startPlayback()
      }
    }, 4000)

    return () => {
      clearTimeout(safetyTimer)
      video.removeEventListener('canplaythrough', onCanPlayThrough)
    }
  }, [isBlobReady, activeSrc, startPlayback])

  // Mobile Tap-to-Unmute: when muted on mobile, tapping anywhere unmutes and continues playback
  useEffect(() => {
    if (!isMuted || !isReady) return

    const handleTapToUnmute = (e) => {
      // Don't intercept clicks on the skip button or direct audio button
      if (e.target && typeof e.target.closest === 'function') {
        if (e.target.closest('.splash-btn-skip') || e.target.closest('.splash-btn-audio')) {
          return
        }
      }
      unmuteAndPlay(e)
    }

    window.addEventListener('touchend', handleTapToUnmute, { capture: true, once: true })
    window.addEventListener('click', handleTapToUnmute, { capture: true, once: true })

    return () => {
      window.removeEventListener('touchend', handleTapToUnmute, { capture: true })
      window.removeEventListener('click', handleTapToUnmute, { capture: true })
    }
  }, [isMuted, isReady, unmuteAndPlay])

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

  return (
    <div
      className={`splash-fullscreen ${isFadingOut ? 'splash-fullscreen--fade-out' : ''}`}
      role="region"
      aria-label="Splash Screen"
      onClick={(e) => {
        if (isMuted && !e.target.closest('.splash-controls')) {
          unmuteAndPlay(e)
        }
      }}
    >
      {/* Sleek Theme Preloader while video completely loads */}
      {!isReady && (
        <div className="splash-preloader" aria-live="polite">
          <div className="splash-preloader-ring">
            <span className="splash-preloader-core" />
          </div>
          <div className="splash-preloader-text">
            <span className="splash-preloader-label">
              {loadProgress > 0 && loadProgress < 100
                ? `BUFFERING SOUL REALM // ${loadProgress}%`
                : loadProgress === 100
                  ? 'SYNCHRONIZING AUDIO & VIDEO...'
                  : 'INITIALIZING SOUL REALM'}
            </span>
            <span className="splash-preloader-bar">
              <span
                className="splash-preloader-fill"
                style={
                  loadProgress > 0
                    ? {
                        width: `${loadProgress}%`,
                        left: 0,
                        animation: 'none',
                        transition: 'width 0.15s ease',
                      }
                    : undefined
                }
              />
            </span>
          </div>
        </div>
      )}

      {/* Pure Fullscreen Responsive Video */}
      {activeSrc && (
        <video
          ref={videoRef}
          src={activeSrc}
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          className={`splash-fullscreen-video ${isReady ? 'splash-fullscreen-video--ready' : ''}`}
        />
      )}

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
                <span>TAP TO ENABLE AUDIO</span>
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
