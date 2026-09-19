import { useState, lazy, Suspense } from 'react'

// Lazy-load the project's interactive 3D SoulStoneScene
const SoulStoneScene = lazy(() => import('./SoulStoneScene'))

const TRACKS = [
  {
    id: '01',
    key: 'web',
    name: 'WEB',
    tagline: 'EXPLOIT THE SURFACE',
    image: '/assets/cards/card-web.webp',
    imageFallback: '/assets/cards/card-web.jpg',
    description: 'Break the surface. Exploit fragile APIs, server-side template injection, session vulnerabilities, and authorization bypasses.',
    topics: ['SSRF', 'SQLi', 'LFI', 'XSS', 'OAuth Bypass'],
    difficulty: 'MEDIUM TO HARD',
    level: 2,
    pos: { x: 50.0, y: 14.0 },
    layout: 'layout-meta-top',
  },
  {
    id: '07',
    key: 'misc',
    name: 'MISC',
    tagline: 'EXPECT THE UNEXPECTED',
    image: '/assets/cards/card-misc.webp',
    imageFallback: '/assets/cards/card-misc.jpg',
    description: 'Expect the unexpected. Hardware logic captures, radio frequencies, AI prompt injection, and esoteric puzzles.',
    topics: ['Hardware Analysis', 'Radio Signals', 'AI Jailbreaks', 'Esoteric Languages'],
    difficulty: 'VARIES',
    level: 2,
    pos: { x: 20.7, y: 27.5 },
    layout: 'layout-meta-left',
  },
  {
    id: '02',
    key: 'crypto',
    name: 'CRYPTO',
    tagline: 'BREAK THE CIPHERS',
    image: '/assets/cards/card-crypto.webp',
    imageFallback: '/assets/cards/card-crypto.jpg',
    description: 'Decode mathematical echoes. Turn cryptographic secrets, weak elliptic curves and lattice reduction into plaintext.',
    topics: ['RSA Attacks', 'AES Modes', 'ECC Weaknesses', 'Lattice Reduction', 'ZK Proofs'],
    difficulty: 'MEDIUM TO HARD',
    level: 2,
    pos: { x: 79.3, y: 27.5 },
    layout: 'layout-meta-right',
  },
  {
    id: '06',
    key: 'osint',
    name: 'OSINT',
    tagline: 'CONNECT THE DOTS',
    image: '/assets/cards/card-osint.webp',
    imageFallback: '/assets/cards/card-osint.jpg',
    description: 'The world leaves subtle clues. Connect the dots across geospatial coordinates, metadata breadcrumbs and intelligence archives.',
    topics: ['Geolocation', 'Social Graphing', 'Metadata Recon', 'Adversary Profiling'],
    difficulty: 'EASY TO MEDIUM',
    level: 1,
    pos: { x: 13.4, y: 58.0 },
    layout: 'layout-meta-left',
  },
  {
    id: '03',
    key: 'pwn',
    name: 'PWN',
    tagline: 'TAKE CONTROL',
    image: '/assets/cards/card-pwn.webp',
    imageFallback: '/assets/cards/card-pwn.jpg',
    description: 'Take control. Exploit memory corruptions, defeat ASLR/ROP protections, leak pointers, and hijack execution flow.',
    topics: ['Buffer Overflow', 'ROP Chains', 'Heap Exploitation', 'Kernel Pwn'],
    difficulty: 'HARD',
    level: 3,
    pos: { x: 86.6, y: 58.0 },
    layout: 'layout-meta-right',
  },
  {
    id: '05',
    key: 'forensics',
    name: 'FORENSICS',
    tagline: 'FIND THE TRUTH',
    image: '/assets/cards/card-forensics.webp',
    imageFallback: '/assets/cards/card-forensics.jpg',
    description: 'Trace digital footprints across network PCAP dumps, memory captures, compromised file systems and hidden signals.',
    topics: ['Network PCAP', 'Volatility Memory', 'Steganography', 'Disk Artifacts'],
    difficulty: 'MEDIUM',
    level: 2,
    pos: { x: 33.7, y: 82.4 },
    layout: 'layout-meta-left',
  },
  {
    id: '04',
    key: 'reverse',
    name: 'REVERSE',
    tagline: 'UNRAVEL THE UNKNOWN',
    image: '/assets/cards/card-reverse.webp',
    imageFallback: '/assets/cards/card-reverse.jpg',
    description: 'Deconstruct truth from compiled machine code. Disassemble, defeat anti-analysis tricks, and unpack esoteric binaries.',
    topics: ['Ghidra / IDA', 'Anti-Debugging', 'VM Obfuscation', 'Assembly'],
    difficulty: 'MEDIUM TO HARD',
    level: 2,
    pos: { x: 66.3, y: 82.4 },
    layout: 'layout-meta-right',
  },
]

export default function Tracks() {
  const [activeTrack, setActiveTrack] = useState(null)

  return (
    <section id="tracks" className="tracks reclaim-real-section">
      {/* ── Realistic Cinematic Background Image Layer ── */}
      <div className="tracks-cinematic-bg-layer" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/tracks-bg-mobile.jpg" />
          <source srcSet="/assets/tracks-bg.webp" type="image/webp" />
          <img src="/assets/tracks-bg.jpg" alt="" className="tracks-cinematic-bg-img" />
        </picture>
        <div className="tracks-bg-vignette-overlay" />
        <div className="tracks-bg-sides-fade" />
        <div className="tracks-bg-top-fade" />
        <div className="tracks-bg-bottom-fade" />
      </div>

      {/* Floating Atmosphere Embers */}
      <div className="tracks-embers" aria-hidden="true">
        <span className="ember ember--1" />
        <span className="ember ember--2" />
        <span className="ember ember--3" />
        <span className="ember ember--4" />
        <span className="ember ember--5" />
      </div>

      <div className="reclaim-real-shell">
        {/* ── Real Header Component matching Reference Artwork ───────── */}
        <header className="reclaim-header reveal">
          <span className="reclaim-eyebrow">// CHALLENGE TRACKS</span>
          <h2 className="reclaim-title">
            <span>RECLAIM</span> <span className="reclaim-the">THE</span> <span>FRAGMENTS</span>
          </h2>
          <p className="reclaim-sub">Seven disciplines. One path to the flag.</p>
        </header>

        {/* ── Real Side Editorial Marginalia Text ──────────────────────── */}
        <aside className="real-marginalia real-marginalia--left desktop-only" aria-hidden="true">
          <div className="marginalia-block">
            <span>BYTE ME CTF</span>
            <small>// 2026</small>
            <div className="marginalia-dash" />
          </div>
          <div className="marginalia-block marginalia-block--spaced">
            <span>DIFFERENT</span>
            <span>CHALLENGES</span>
            <span>SAME</span>
            <span>DESTINATION</span>
          </div>
          <div className="marginalia-block">
            <span>MORE</span>
            <span>THAN A</span>
            <span>CHALLENGE</span>
          </div>
        </aside>

        <aside className="real-marginalia real-marginalia--right desktop-only" aria-hidden="true">
          <div className="marginalia-block">
            <span>SKILLS</span>
            <span>DISCIPLINE</span>
            <span>CURIOSITY</span>
            <span>VICTORY</span>
          </div>
          <div className="marginalia-block marginalia-block--spaced">
            <span>EXPLORE</span>
            <span>BREAK</span>
            <span>EVOLVE</span>
          </div>
          <div className="marginalia-block">
            <span>A</span>
            <span>CAPTURE</span>
            <span>THE FLAG</span>
            <span>EVENT</span>
          </div>
        </aside>

        {/* ── Real Orbital Realm Stage (Desktop Subtle Oval Composition with 3D SoulStone in Center) ─── */}
        <div className="reclaim-orbital-stage desktop-only">
          {/* Concentric Golden Subtle Oval Orbital Coordinate Lines SVG */}
          <svg className="orbital-coordinate-svg" viewBox="0 0 1120 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="orbitGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7b10" stopOpacity="0.2" />
                <stop offset="30%" stopColor="#ffa726" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#ffd54f" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#ffa726" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff7b10" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Horizontal Axis with Ticks & Nodes */}
            <line x1="40" y1="400" x2="1080" y2="400" stroke="rgba(255, 140, 40, 0.2)" strokeWidth="1" strokeDasharray="3 6" />
            <circle cx="140" cy="400" r="3.5" fill="#ff9436" />
            <circle cx="265" cy="400" r="2.5" fill="#ffa726" />
            <circle cx="560" cy="400" r="4.5" fill="#ffb74d" />
            <circle cx="855" cy="400" r="2.5" fill="#ffa726" />
            <circle cx="980" cy="400" r="3.5" fill="#ff9436" />

            {/* Vertical Axis with Alignment Dots */}
            <line x1="560" y1="40" x2="560" y2="760" stroke="rgba(255, 140, 40, 0.2)" strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="560" cy="112" r="3.5" fill="#ff9436" />
            <circle cx="560" cy="195" r="2.5" fill="#ffa726" />
            <circle cx="560" cy="605" r="2.5" fill="#ffa726" />
            <circle cx="560" cy="688" r="3.5" fill="#ff9436" />

            {/* Subtle Diagonal Alignment Ticks */}
            <line x1="250" y1="180" x2="275" y2="198" stroke="rgba(255, 140, 40, 0.28)" strokeWidth="1" />
            <line x1="870" y1="180" x2="845" y2="198" stroke="rgba(255, 140, 40, 0.28)" strokeWidth="1" />
            <line x1="250" y1="620" x2="275" y2="602" stroke="rgba(255, 140, 40, 0.28)" strokeWidth="1" />
            <line x1="870" y1="620" x2="845" y2="602" stroke="rgba(255, 140, 40, 0.28)" strokeWidth="1" />

            {/* Inner Core Subtle Oval Ring around Stone */}
            <ellipse cx="560" cy="400" rx="180" ry="130" stroke="rgba(255, 140, 40, 0.3)" strokeWidth="1" strokeDasharray="4 6" />

            {/* Middle Concentric Golden Oval Ring */}
            <ellipse cx="560" cy="400" rx="295" ry="205" stroke="url(#orbitGoldGrad)" strokeWidth="1.2" />

            {/* Primary Subtle Oval Orbit Ring Passing Through Card Monoliths */}
            <ellipse cx="560" cy="400" rx="420" ry="288" stroke="rgba(255, 140, 40, 0.38)" strokeWidth="1.2" />

            {/* Outer Concentric Dotted Horizon Perimeter Oval */}
            <ellipse cx="560" cy="400" rx="505" ry="350" stroke="rgba(255, 110, 20, 0.16)" strokeWidth="0.8" strokeDasharray="5 8" />
          </svg>

            {/* ── Central 3D Soul Stone Component (Our interactive 3D Stone!) ── */}
            <div className="tracks-center-stone-stage">
              <div className="center-stone-aurora" aria-hidden="true" />
              <div className="center-stone-canvas-wrapper" title="Interactive Soul Stone: Drag to rotate">
                <Suspense fallback={<div className="tracks-stone-fallback"><i /></div>}>
                  <SoulStoneScene
                    className="tracks-center-scene"
                    scale={0.70}
                    activeShard={activeTrack?.id}
                    float={true}
                  />
                </Suspense>
              </div>

              {/* Pedestal Ring */}
              <div className="center-stone-pedestal-ring" aria-hidden="true" />
            </div>

            {/* ── 7 Real Track Monolith Card Units in Circular Orbit ───────── */}
            {TRACKS.map((track) => {
              const isActive = activeTrack?.id === track.id
              return (
                <div
                  key={track.id}
                  className={`orbital-card-unit ${track.layout} ${isActive ? 'active' : ''}`}
                  style={{
                    left: `${track.pos.x}%`,
                    top: `${track.pos.y}%`,
                  }}
                  onMouseEnter={() => setActiveTrack(track)}
                  onMouseLeave={() => setActiveTrack(null)}
                >
                  {/* The Realistic Monolith Card Component */}
                  <div className="unit-monolith-stage">
                    <div className="unit-realistic-card-wrapper">
                      <picture>
                        <source srcSet={track.image} type="image/webp" />
                        <img
                          src={track.imageFallback}
                          alt={`${track.name} Monolith Card`}
                          className="unit-card-artwork"
                          loading="lazy"
                        />
                      </picture>
                      <div className="unit-card-cyber-overlay" />
                      <div className="unit-card-hover-flare" />
                    </div>

                    {/* Floating Rocky Pedestal with Glowing Orange Neon Ring */}
                    <div className="unit-floating-pedestal">
                      <div className="pedestal-neon-oval" />
                      <div className="pedestal-basalt-disk" />
                    </div>
                  </div>

                  {/* Real Text Information Block */}
                  <div className="unit-meta-block">
                    <h3 className="unit-track-name">{track.name}</h3>
                    <span className="unit-track-tagline">{track.tagline}</span>
                  </div>
                </div>
              )
            })}
        </div>

        {/* ── Mobile / Tablet Responsive Monolith Cards Grid ──────────── */}
        <div className="mobile-monolith-cards-wrap">
          {/* Mobile Center Stone Stage */}
          <div className="mobile-center-stone-stage">
            <div className="mobile-stone-canvas-wrapper">
              <Suspense fallback={<div className="tracks-stone-fallback"><i /></div>}>
                <SoulStoneScene className="tracks-mobile-scene" scale={0.58} float={true} />
              </Suspense>
            </div>
          </div>

          <div className="mobile-cards-grid">
            {TRACKS.map((track) => {
              return (
                <article
                  key={track.id}
                  className="mobile-stone-card reveal"
                >
                  <div className="mobile-stone-showcase">
                    <div className="mobile-monolith-img-wrap">
                      <picture>
                        <source srcSet={track.image} type="image/webp" />
                        <img src={track.imageFallback} alt={`${track.name} Monolith`} className="mobile-card-art" />
                      </picture>
                    </div>
                  </div>

                  <div className="mobile-card-content">
                    <div className="mobile-title-block">
                      <h3 className="mobile-track-name">{track.name}</h3>
                      <span className="mobile-track-tagline">{track.tagline}</span>
                    </div>

                    <p className="mobile-desc">{track.description}</p>

                    <div className="mobile-topics">
                      {track.topics.map((t) => (
                        <span key={t} className="topic-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
