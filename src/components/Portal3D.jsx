import { useEffect, useRef, useState } from 'react'

/**
 * Pixel-Perfect Symmetrical 3D Portal FX
 * Mapped to the exact 1024x426 coordinate system of perfected about-portal-bg.png:
 * - Circle Center: (513.0, 167.5), Radius: 144.4
 * - Doorway Slit: X=512.0, Y=75 to 265
 * - Floor Light: X=512.0, Y=265 to 370
 * 
 * Theme: Radiant Fiery Soul Stone Orange (#ff7b25, #ff5500, #ff881a, #e64200)
 */
export default function Portal3D() {
  const containerRef = useRef(null)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animFrame = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      // Gentle floating parallax preserving circular geometry
      targetX = ((e.clientX / innerWidth) - 0.5) * 12
      targetY = ((e.clientY / innerHeight) - 0.5) * 8
    }

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      setMouseOffset({ x: currentX, y: currentY })
      animFrame = requestAnimationFrame(updateParallax)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animFrame = requestAnimationFrame(updateParallax)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="portal-3d-stage"
      aria-hidden="true"
      style={{
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
      }}
    >
      <svg
        viewBox="0 0 1024 426"
        className="portal-3d-svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Intense Molten Orange Core Bloom Filter */}
          <filter id="portalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="6" result="blur2" />
            <feGaussianBlur stdDeviation="15" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Volumetric Slit Glow */}
          <filter id="slitGlow" x="-100%" y="-20%" width="300%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="9" result="blur2" />
            <feGaussianBlur stdDeviation="20" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Rich Radiant Theme Orange Gradient for Portal Halo */}
          <linearGradient id="ringAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8510" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#f06200" stopOpacity="0.92" />
            <stop offset="50%" stopColor="#db5000" stopOpacity="0.96" />
            <stop offset="75%" stopColor="#ea5d00" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#b83f00" stopOpacity="0.85" />
          </linearGradient>

          {/* Vertical Doorway Light Ray Gradient - Pure Molten Orange Theme */}
          <linearGradient id="doorRayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.25" />
            <stop offset="18%" stopColor="#ff8510" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#eb5e00" stopOpacity="0.95" />
            <stop offset="92%" stopColor="#c84a00" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#963400" stopOpacity="0" />
          </linearGradient>

          {/* Wet Floor Reflection Gradient */}
          <radialGradient id="floorReflectionGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f06200" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#d95000" stopOpacity="0.38" />
            <stop offset="75%" stopColor="#963400" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 1. REFINED VOLUMETRIC DOORWAY FISSURE ───────────────── */}
        <g className="portal-vertical-slit">
          {/* Subtle warm ember ambient guide */}
          <line
            x1="511.5"
            y1="75"
            x2="511.5"
            y2="265"
            stroke="url(#doorRayGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
            className="slit-glow-outer"
          />
          {/* Razor-thin warm incandescent core fissure */}
          <line
            x1="511.5"
            y1="78"
            x2="511.5"
            y2="262"
            stroke="#ffd5b3"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.6"
            className="slit-core-white"
          />
        </g>

        {/* ── 2. CELESTIAL STARGATE RINGS ASSEMBLY (CENTER: 511.5, 172) ── */}
        <g className="portal-rings-assembly">
          {/* Micro-Engraved Celestial Graduation Ticks */}
          <circle
            cx="511.5"
            cy="172"
            r="155.5"
            fill="none"
            stroke="#ff8008"
            strokeWidth="0.85"
            strokeDasharray="2 7 3.5 11 2 9 4.5 15"
            opacity="0.55"
            className="portal-ring-ticks-rotating"
          />

          {/* Outer Rotating Stargate Ring */}
          <circle
            cx="511.5"
            cy="172"
            r="151"
            fill="none"
            stroke="#f06200"
            strokeWidth="1.0"
            strokeDasharray="5 13 20 11 3 17"
            opacity="0.6"
            filter="url(#portalGlow)"
            className="portal-ring-outer-rotating"
          />

          {/* Primary Radiant Luminous Halo Ring */}
          <circle
            cx="511.5"
            cy="172"
            r="146"
            fill="none"
            stroke="url(#ringAmberGrad)"
            strokeWidth="1.5"
            opacity="0.88"
            filter="url(#portalGlow)"
            className="portal-ring-main-luminous"
          />

          {/* Inner Counter-Rotating Rune Arc */}
          <circle
            cx="511.5"
            cy="172"
            r="140"
            fill="none"
            stroke="#db5000"
            strokeWidth="0.8"
            strokeDasharray="2.5 13 9 17"
            opacity="0.45"
            className="portal-ring-inner-rotating"
          />

          {/* Orbiting Energy Spark Nodes - Theme Orange */}
          <g className="portal-orbit-photons">
            {/* Spark 1 */}
            <circle cx="511.5" cy="19" r="1.8" fill="#ffaa33" filter="url(#portalGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 511.5 172"
                to="360 511.5 172"
                dur="16s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Spark 2 */}
            <circle cx="511.5" cy="325" r="1.6" fill="#ff7b25" filter="url(#portalGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="180 511.5 172"
                to="540 511.5 172"
                dur="16s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Spark 3 */}
            <circle cx="356" cy="172" r="1.5" fill="#ff9426" filter="url(#portalGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="270 511.5 172"
                to="-90 511.5 172"
                dur="22s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>

        {/* ── 3. SHIMMERING FLOOR REFLECTION ON WET TILES ─────────── */}
        <ellipse
          cx="511.5"
          cy="328"
          rx="95"
          ry="14"
          fill="url(#floorReflectionGrad)"
          className="portal-floor-reflection"
        />

        {/* ── 4. ORGANIC FLOATING 3D AMBER-ORANGE EMBERS ───────────── */}
        <g className="portal-embers-field">
          <circle cx="506" cy="255" r="1.1" fill="#ffaa40" className="ember-p1" />
          <circle cx="518" cy="235" r="1.4" fill="#ff7b25" className="ember-p2" />
          <circle cx="494" cy="205" r="0.9" fill="#ff6200" className="ember-p3" />
          <circle cx="530" cy="180" r="1.3" fill="#ff9a2e" className="ember-p4" />
          <circle cx="510" cy="150" r="1.0" fill="#ff8010" className="ember-p5" />
          <circle cx="520" cy="120" r="1.2" fill="#ff5500" className="ember-p6" />
          <circle cx="488" cy="220" r="0.8" fill="#ff9426" className="ember-p7" />
          <circle cx="536" cy="245" r="1.1" fill="#ff7700" className="ember-p8" />
          <circle cx="502" cy="100" r="1.2" fill="#ffaa33" className="ember-p9" />
          <circle cx="526" cy="85" r="0.9" fill="#ff6a00" className="ember-p10" />
        </g>
      </svg>
    </div>
  )
}
