import PrizeCharacter3D from './PrizeCharacter3D'

const medals = [
  {
    place: '02',
    tier: 'SILVER',
    title: 'RUNNER UP',
    cash: 'REVEALING SOON',
    character: 'gamora',
  },
  {
    place: '01',
    tier: 'GOLD',
    title: 'CHAMPION',
    cash: 'REVEALING SOON',
    character: 'thanos',
  },
  {
    place: '03',
    tier: 'BRONZE',
    title: 'THIRD PLACE',
    cash: 'REVEALING SOON',
    character: 'redskull',
  },
]

export default function Prizes() {
  return (
    <section id="prizes" className="prizes section-shell">
      {/* ── PRIZES ARENA CINEMATIC BACKDROP ──────────────── */}
      <div className="prizes-backdrop" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/prizes-arena-bg-mobile.jpg" />
          <img
            src="/assets/prizes-arena-bg.jpg"
            alt=""
            className="prizes-bg-img"
            loading="lazy"
          />
        </picture>
        <div className="prizes-vignette" />
        <div className="prizes-ambient-glow" />
      </div>

      <div className="prizes-content-wrap">
        <div className="prize-heading reveal">
          <div className="section-kicker">THE RECKONING // PRIZE POOL</div>
          <h2>CLAIM YOUR <em>REWARDS</em></h2>
          <p className="prize-subtitle">BOUNTY POOL &amp; REWARDS // REVEALING SOON</p>
        </div>

        <div className="prize-grid">
        {medals.map((medal) => {
          const isChampion = medal.place === '01'

          return (
            <article
              className={`prize-card prize-card--${isChampion ? '1' : medal.place === '02' ? '2' : '3'} reveal`}
              key={medal.title}
            >
              <div className="prize-card-header">
                <span className="prize-rank">RANK // {medal.place}</span>
              </div>

              {/* 3D Relic Character Animation */}
              <PrizeCharacter3D
                character={medal.character}
                scale={isChampion ? 0.68 : 0.58}
              />

              <div className="prize-reward-group">
                <h3>{medal.title}</h3>
                <div className="prize-cash">{medal.cash}</div>
              </div>
            </article>
          )
        })}
      </div>
      </div>
    </section>
  )
}
