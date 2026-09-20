
import { Scale } from 'lucide-react'

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

export default function About({ onOpenRules }) {
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
                  A relentless hybrid Capture The Flag siege pushing the boundaries of
                  offensive security and vulnerability research. Compete on-site or
                  breach the perimeter remotely to reclaim shattered digital souls across
                  encrypted networks.
                </p>

                <div className="about-curiosity-tag">
                  <span className="curiosity-bar" />
                  <span>CURIOSITY LEADS HERE.</span>
                </div>
              </div>

              {/* View Official Rules CTA */}
              <div className="about-actions-row">
                <button
                  type="button"
                  className="about-rules-btn"
                  onClick={onOpenRules}
                  aria-label="View competition rules"
                >
                  {/* Ornamental corner brackets */}
                  <span className="rules-btn-corner rules-btn-corner--tl" aria-hidden="true" />
                  <span className="rules-btn-corner rules-btn-corner--tr" aria-hidden="true" />
                  <span className="rules-btn-corner rules-btn-corner--bl" aria-hidden="true" />
                  <span className="rules-btn-corner rules-btn-corner--br" aria-hidden="true" />

                  {/* Circular icon badge */}
                  <span className="rules-btn-icon-badge" aria-hidden="true">
                    <Scale size={16} />
                  </span>

                  <span className="rules-btn-label">RULES OF ENGAGEMENT</span>
                  <span className="rules-btn-arrow" aria-hidden="true">→</span>
                </button>
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
