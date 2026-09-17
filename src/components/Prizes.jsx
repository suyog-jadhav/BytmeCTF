import { Sparkles } from 'lucide-react'
import PrizeCharacter3D from './PrizeCharacter3D'

const medals = [
  {
    place: '02',
    tier: 'SILVER',
    title: 'RUNNER UP',
    cash: '₹5,000',
    character: 'gamora',
  },
  {
    place: '01',
    tier: 'GOLD',
    title: 'CHAMPION',
    cash: '₹7,500',
    character: 'thanos',
  },
  {
    place: '03',
    tier: 'BRONZE',
    title: 'THIRD PLACE',
    cash: '₹2,500',
    character: 'redskull',
  },
]

export default function Prizes() {
  return (
    <section id="prizes" className="prizes section-shell">
      <div className="prize-heading reveal">
        <div className="section-kicker">04 / THE RECKONING</div>
        <h2>CLAIM YOUR<br /><em>REWARD</em></h2>
        <p className="prize-sub">
          ₹15,000 in cash bounties, certifications, and premium security subscriptions await the sharpest minds.
        </p>
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
                <span className={`prize-tier-badge prize-tier-badge--${medal.tier.toLowerCase()}`}>
                  {medal.tier} DIVISION <Sparkles size={10} style={{ marginLeft: 4 }} />
                </span>
              </div>

              {/* 3D Relic Character Animation */}
              <PrizeCharacter3D
                character={medal.character}
                scale={isChampion ? 0.68 : 0.58}
              />

              <h3>{medal.title}</h3>
              <div className="prize-cash">{medal.cash}</div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
