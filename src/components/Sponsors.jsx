import { ExternalLink } from 'lucide-react'

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors section-shell">
      <h2 className="reveal">SPONSORS &amp; PARTNERS</h2>

      <div className="sponsors-showcase-grid reveal">
        {/* Official CTF Partner */}
        <div className="sponsor-showcase sponsor-showcase--featured">
          <span className="sponsor-partner-badge">OFFICIAL CTF PARTNER</span>
          <a
            href="https://ctf7.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-logo-wrap"
            title="Visit CTF7"
          >
            <img
              src="/assets/CTF7-logo.webp"
              alt="CTF7 Logo"
              className="sponsor-brand-logo sponsor-brand-logo--ctf7"
            />
          </a>
          <h3 className="sponsor-brand-name">
            <a
              href="https://ctf7.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-brand-name-link"
            >
              CTF7
            </a>
          </h3>
          <p className="sponsor-partner-desc">
            CTF7 is the platform this competition runs on; built for cybersecurity CTFs, hackathons and hands-on security labs, with live leaderboards, on-demand challenge infrastructure and built-in anti-cheat. Universities, student chapters and training teams use it to run their events end to end.
          </p>

          <a
            href="https://ctf7.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-visit-btn"
          >
            <span>VISIT CTF7</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Organizer */}
        <div className="sponsor-showcase sponsor-showcase--organizer">
          <span className="sponsor-partner-badge sponsor-partner-badge--sub">ORGANIZED BY</span>
          <div className="sponsor-logo-wrap">
            <img
              src="/assets/owasp-logo.png"
              alt="OWASP PCCOE Logo"
              className="sponsor-brand-logo"
            />
          </div>
          <h3 className="sponsor-brand-name">OWASP PCCOE</h3>
        </div>
      </div>
    </section>
  )
}
