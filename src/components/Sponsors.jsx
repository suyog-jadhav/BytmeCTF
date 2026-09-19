export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors section-shell">
      <div className="section-kicker reveal">THE ALLIANCE</div>
      <h2 className="reveal">SPONSORS</h2>

      {/* Single Sponsor (Clean logo and name without box) */}
      <div className="sponsor-showcase reveal">
        <div className="sponsor-logo-wrap">
          <img
            src="/assets/owasp-logo.png"
            alt="OWASP PCCOE Logo"
            className="sponsor-brand-logo"
          />
        </div>
        <h3 className="sponsor-brand-name">OWASP PCCOE</h3>
      </div>
    </section>
  )
}
