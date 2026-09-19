import Portal3D from './Portal3D'
import LaserFlow from './LaserFlow'

const stats = [
  {
    idx: '01',
    value: '7+',
    label: 'CHALLENGE TRACKS',
    isAmber: false,
  },
  {
    idx: '02',
    value: 'TBA',
    label: 'PRIZE POOL & PERKS',
    isAmber: true,
  },
  {
    idx: '03',
    value: '8 HRS',
    label: 'CONTINUOUS SIEGE',
    isAmber: true,
  },
]

export default function About() {
  return (
    <section id="about" className="about-portal-section">
      {/* ── CINEMATIC PORTAL BACKGROUND & 3D LAYER ──────────────── */}
      <div className="about-portal-backdrop" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/about-portal-bg-mobile.jpg" />
          <img
            src="/assets/about-portal-bg.png"
            alt=""
            className="about-portal-bg-img"
            loading="eager"
          />
        </picture>

        {/* Dynamic GPU LaserFlow Door Spark Light - Ground spread & refined glow */}
        <div className="portal-door-laser-stage">
          <LaserFlow
            horizontalBeamOffset={0.0}
            verticalBeamOffset={-0.28}
            color="#f06200"
            intensity={0.34}
            wispDensity={1.2}
            wispSpeed={14.0}
            wispIntensity={3.2}
            flowSpeed={0.32}
            verticalSizing={3.4}
            horizontalSizing={1.1}
            falloffStart={0.85}
            fogIntensity={0.18}
            backgroundColor="transparent"
          />
        </div>

        {/* Pixel-Matched 3D Rotating Stargate Ring & Volumetric Light Ray */}
        <Portal3D />

        {/* Atmospheric Vignettes for Seamless Edge Integration */}
        <div className="about-portal-vignette" />
        <div className="about-portal-ambient-glow" />
      </div>

      {/* ── FOREGROUND CONTENT OVERLAY ────────────────────────────── */}
      <div className="about-portal-container">
        {/* Main Hero Header: Left Column Title & Narrative (Right side open for portal) */}
        <div className="about-portal-top-grid">
          {/* Left Column: Title, Subtitle, & Narrative */}
          <div className="about-portal-headline reveal">
            <div className="about-kicker">
              <span>THE INVITATION</span>
              <span className="kicker-line" />
            </div>

            <h2 className="about-title">
              <span className="title-line-white">ENTER THE</span>
              <span className="title-line-amber">SOUL REALM</span>
            </h2>

            <div className="about-tagline">
              <span>HACK</span>
              <span className="tag-sep">&times;</span>
              <span>EXPLORE</span>
              <span className="tag-sep">&times;</span>
              <span>SOLVE</span>
              <span className="tag-sep">&times;</span>
              <span>RECLAIM</span>
            </div>

            {/* Narrative Card positioned directly below Enter the Soul Realm */}
            <div className="about-narrative-block">
              <div className="about-mission-card">
                <p className="about-mission-text">
                  A relentless Capture The Flag siege pushing the boundaries of
                  offensive security and vulnerability research. Race the clock to
                  reclaim shattered digital souls across encrypted networks.
                </p>

                <div className="about-curiosity-tag">
                  <span className="curiosity-bar" />
                  <span>CURIOSITY LEADS HERE.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM STATS CYBER PANEL ──────────────────────────────── */}
        <div className="about-portal-stat-panel reveal">
          {/* Cyber Corner Brackets */}
          <span className="cyber-bracket cyber-bracket--tl" />
          <span className="cyber-bracket cyber-bracket--tr" />
          <span className="cyber-bracket cyber-bracket--bl" />
          <span className="cyber-bracket cyber-bracket--br" />

          {/* Stat Columns */}
          <div className="about-stat-columns">
            {stats.map((item, index) => (
              <div key={item.label} className="about-stat-cell">
                <div className="about-stat-inner">
                  <div
                    className={`stat-cell-val ${item.isAmber ? 'stat-cell-val--amber' : 'stat-cell-val--white'}`}
                  >
                    {item.value}
                  </div>
                  <div className="stat-cell-label">{item.label}</div>
                </div>

                {index < stats.length - 1 && (
                  <div className="stat-cell-divider" aria-hidden="true">
                    <span className="divider-glow-node" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
