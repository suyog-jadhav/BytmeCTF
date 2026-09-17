const stats = [
  ['7+', 'CHALLENGE TRACKS'],
  ['₹15,000', 'PRIZE POOL & PERKS'],
  ['8 HRS', 'CONTINUOUS SIEGE'],
]

export default function About() {
  return (
    <section id="about" className="about section-shell">
      <div className="section-kicker reveal">01 / THE INVITATION</div>
      <div className="about-grid">
        <div className="about-copy reveal">
          <h2>ENTER THE<br /><em>SOUL REALM</em></h2>
        </div>
        <div className="about-detail reveal">
          <p>
            A relentless Capture The Flag siege pushing the boundaries of offensive security and vulnerability research. Race the clock to reclaim shattered digital souls across encrypted networks.
          </p>
        </div>
      </div>

      <div className="stat-row reveal">
        {stats.map(([value, label]) => (
          <div className="stat" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
