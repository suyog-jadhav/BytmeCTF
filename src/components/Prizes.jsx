import { useState } from 'react'

const prizes = {
  offline: [
    {
      place: '02',
      title: 'RUNNER UP',
      reward: 'REVEALING SOON',
      rewardType: 'CASH PRIZE',
      icon: '/assets/prize-medal-2.png',
      motto: 'FIGHT / LEARN / LEVEL UP',
    },
    {
      place: '01',
      title: 'CHAMPION',
      reward: 'REVEALING SOON',
      rewardType: 'CASH PRIZE',
      icon: '/assets/prize-crown-1.png',
      motto: 'HACK / SOLVE / CONQUER',
    },
    {
      place: '03',
      title: 'THIRD PLACE',
      reward: 'REVEALING SOON',
      rewardType: 'CASH PRIZE',
      icon: '/assets/prize-medal-3.png',
      motto: 'CURIOSITY / LOGIC / PROGRESS',
    },
  ],
  online: [
    {
      place: '02',
      title: 'RUNNER UP',
      reward: 'REVEALING SOON',
      rewardType: 'VOUCHERS & PERKS',
      icon: '/assets/prize-medal-2.png',
      motto: 'FIGHT / LEARN / LEVEL UP',
    },
    {
      place: '01',
      title: 'CHAMPION',
      reward: 'REVEALING SOON',
      rewardType: 'VOUCHERS & PERKS',
      icon: '/assets/prize-crown-1.png',
      motto: 'HACK / SOLVE / CONQUER',
    },
    {
      place: '03',
      title: 'THIRD PLACE',
      reward: 'REVEALING SOON',
      rewardType: 'VOUCHERS & PERKS',
      icon: '/assets/prize-medal-3.png',
      motto: 'CURIOSITY / LOGIC / PROGRESS',
    },
  ],
}

export default function Prizes() {
  const [activeTrack, setActiveTrack] = useState('offline')

  return (
    <section id="prizes" className="prizes section-shell">
      {/* ── BACKDROP ─────────────────────────────────────── */}
      <div className="prizes-backdrop" aria-hidden="true">
        <picture>
          <source media="(max-width: 768px)" srcSet="/assets/prizes-arena-bg-mobile.jpg" />
          <img src="/assets/prizes-arena-bg.jpg" alt="" className="prizes-bg-img" loading="lazy" />
        </picture>
        <div className="prizes-vignette" />
        <div className="prizes-ambient-glow" />
      </div>

      <div className="prizes-content-wrap">
        {/* ── HEADING ──────────────────────────────────────── */}
        <div className="prize-heading reveal">
          <h2>CLAIM YOUR <em>REWARDS</em></h2>
          <p className="prize-subtitle">HYBRID EVENT — DUAL REWARD TRACKS</p>
        </div>

        {/* ── TRACK TOGGLE TABS ────────────────────────────── */}
        <div className="prize-mode-tabs" role="tablist" aria-label="Prize Track Selection">
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === 'offline'}
            className={`prize-mode-tab ${activeTrack === 'offline' ? 'prize-mode-tab--active' : ''}`}
            onClick={() => setActiveTrack('offline')}
          >
            <span className="prize-mode-tab-icon">🏆</span>
            <div className="prize-mode-tab-labels">
              <span className="prize-mode-tab-title">OFFLINE TRACK</span>
            </div>
          </button>

          <div className="prize-mode-tab-divider" />

          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === 'online'}
            className={`prize-mode-tab ${activeTrack === 'online' ? 'prize-mode-tab--active' : ''}`}
            onClick={() => setActiveTrack('online')}
          >
            <span className="prize-mode-tab-icon">🌐</span>
            <div className="prize-mode-tab-labels">
              <span className="prize-mode-tab-title">ONLINE TRACK</span>
            </div>
          </button>
        </div>

        {/* ── NOTICE INDICATOR ─────────────────────────────── */}
        <div className="prize-mode-notice" aria-live="polite">
          <span className="prize-mode-notice-dot" />
          {activeTrack === 'offline'
            ? 'OFFLINE PARTICIPANTS — ON-SITE EXCLUSIVE CASH PRIZES'
            : 'ONLINE PARTICIPANTS — GLOBAL LEADERBOARD VOUCHERS & DIGITAL REWARDS'}
        </div>

        {/* ── 3-PODIUM PRIZE GRID ──────────────────────────── */}
        <div className="prize-grid prize-grid--track" key={activeTrack}>
          {prizes[activeTrack].map((medal) => {
            const isChampion = medal.place === '01'
            const cardNum = isChampion ? '1' : medal.place === '02' ? '2' : '3'
            return (
              <article
                className={`prize-card prize-card--${cardNum}`}
                key={`${activeTrack}-${medal.title}`}
              >
                <div className="prize-rank">RANK // {medal.place}</div>

                <div className="prize-emblem" aria-hidden="true">
                  <img
                    src={medal.icon}
                    alt={medal.title}
                    className={`prize-emblem-img ${isChampion ? 'prize-emblem-img--crown' : ''}`}
                    loading="lazy"
                  />
                </div>

                <h3 className="prize-card-title">{medal.title}</h3>

                <div className="prize-card-divider" />
                <div className="prize-card-motto">{medal.motto}</div>

                <div className="prize-reward-box">
                  <span className={`prize-reward-tag ${activeTrack === 'online' ? 'prize-reward-tag--online' : ''}`}>
                    {medal.rewardType}
                  </span>
                  <div className="prize-reward-val">{medal.reward}</div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

