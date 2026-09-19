import { Clock, Users, ShieldCheck, Terminal } from 'lucide-react'

export default function Register({ onOpenRegister }) {
  return (
    <section id="register" className="register">
      {/* Subtle atmospheric ambient glow */}
      <div className="register-ambient-glow" aria-hidden="true" />

      <div className="register-container">
        {/* Left Column: Registration Command Dossier */}
        <div className="register-dossier reveal">
          {/* Epic Main Heading with Punishment Marvel Font & increased letter spacing */}
          <h2 className="register-heading">
            <em>REGISTER</em>
          </h2>

          {/* Thematic Subtitle */}
          <p className="register-desc">
            8 hours of non-stop offensive research. 7 specialized challenge tracks. Free and open to all squads worldwide. Claim your place in the pantheon.
          </p>

          {/* Primary Action Button */}
          <div className="register-action-row">
            <button
              className="register-cyber-btn"
              onClick={onOpenRegister}
              aria-label="Register squad for ByteMe CTF"
            >
              {/* Glowing Beam Flares (Top & Bottom, active on hover) */}
              <span className="cyber-flare cyber-flare--top" aria-hidden="true" />
              <span className="cyber-flare cyber-flare--bottom" aria-hidden="true" />

              {/* Sci-Fi Chamfered Cyber Armor Vector Frame */}
              <svg
                className="cyber-btn-svg"
                viewBox="0 0 380 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Glowing Amber Gradient for Hover State */}
                  <linearGradient id="cyberAmberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff7b10" />
                    <stop offset="20%" stopColor="#ffa726" />
                    <stop offset="50%" stopColor="#ffcc80" />
                    <stop offset="80%" stopColor="#ffa726" />
                    <stop offset="100%" stopColor="#ff7b10" />
                  </linearGradient>

                  {/* Corner Bracket Gradient */}
                  <linearGradient id="cyberBracketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffb74d" />
                    <stop offset="50%" stopColor="#ff7b00" />
                    <stop offset="100%" stopColor="#d84315" />
                  </linearGradient>

                  {/* Dark Inner Plate Fill */}
                  <linearGradient id="cyberPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1c100a" />
                    <stop offset="50%" stopColor="#0d0705" />
                    <stop offset="100%" stopColor="#080403" />
                  </linearGradient>
                </defs>

                {/* Dark Inner Plate Polygon */}
                <polygon
                  className="cyber-inner-plate"
                  points="32,6 348,6 370,22 370,42 348,58 32,58 10,42 10,22"
                  fill="url(#cyberPlateGrad)"
                />

                {/* Octagonal Chassis Base Outline */}
                <polygon
                  className="cyber-base-frame"
                  points="32,6 348,6 370,22 370,42 348,58 32,58 10,42 10,22"
                  stroke="url(#cyberAmberGlow)"
                  strokeWidth="1.8"
                />

                {/* Heavy Chamfered Corner Brackets */}
                {/* Top-Left */}
                <path
                  className="cyber-corner-bracket"
                  d="M 66,4 L 30,4 L 8,24 L 8,36"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                {/* Top-Right */}
                <path
                  className="cyber-corner-bracket"
                  d="M 314,4 L 350,4 L 372,24 L 372,36"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                {/* Bottom-Right */}
                <path
                  className="cyber-corner-bracket"
                  d="M 372,28 L 372,40 L 350,60 L 314,60"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                {/* Bottom-Left */}
                <path
                  className="cyber-corner-bracket"
                  d="M 8,28 L 8,40 L 30,60 L 66,60"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />

                {/* Outer Flanking Side Bars */}
                <line
                  className="cyber-side-tick"
                  x1="2"
                  y1="24"
                  x2="2"
                  y2="40"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
                <line
                  className="cyber-side-tick"
                  x1="378"
                  y1="24"
                  x2="378"
                  y2="40"
                  stroke="url(#cyberBracketGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
              </svg>

              <span className="cyber-btn-text">REGISTER </span>
            </button>
          </div>

          {/* Tactical High-Tech Mission Console / Registration Matrix Terminal */}
          <div className="register-spec-terminal">
            {/* Top Terminal Status Header */}
            <div className="spec-terminal-top">
              <div className="spec-terminal-beacon">
                <span className="spec-beacon-dot" />
                <span className="spec-beacon-label">TRANSMISSION // GATEWAY ACTIVE</span>
              </div>
              <span className="spec-terminal-id">GATE // 08-BYTEME</span>
            </div>

            {/* 4-Item Telemetry Metric Matrix */}
            <div className="spec-grid">
              <div className="spec-item">
                <div className="spec-item-icon-wrap">
                  <Clock className="spec-icon" size={17} />
                </div>
                <div className="spec-item-body">
                  <span className="spec-item-label">TIMEFRAME</span>
                  <strong className="spec-item-val">OCT 09, 2026</strong>
                  <small className="spec-item-sub">8-HOUR SPRINT</small>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-item-icon-wrap">
                  <Users className="spec-icon" size={17} />
                </div>
                <div className="spec-item-body">
                  <span className="spec-item-label">SQUAD LIMIT</span>
                  <strong className="spec-item-val">1–2 OPERATIVES</strong>
                  <small className="spec-item-sub">SOLO OR DUO UNITS</small>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-item-icon-wrap">
                  <ShieldCheck className="spec-icon" size={17} />
                </div>
                <div className="spec-item-body">
                  <span className="spec-item-label">ENTRY PROTOCOL</span>
                  <strong className="spec-item-val">100% FREE</strong>
                  <small className="spec-item-sub">OPEN WORLDWIDE</small>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-item-icon-wrap">
                  <Terminal className="spec-icon" size={17} />
                </div>
                <div className="spec-item-body">
                  <span className="spec-item-label">FLAG REALM</span>
                  <strong className="spec-item-val">JEOPARDY CTF</strong>
                  <small className="spec-item-sub">7 CHALLENGE TRACKS</small>
                </div>
              </div>
            </div>

            {/* Corner Tech Brackets */}
            <span className="spec-bracket spec-bracket--tl" aria-hidden="true" />
            <span className="spec-bracket spec-bracket--tr" aria-hidden="true" />
            <span className="spec-bracket spec-bracket--bl" aria-hidden="true" />
            <span className="spec-bracket spec-bracket--br" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

