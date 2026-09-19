import { useEffect, useRef, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import {
  Calendar,
  Clock,
  Terminal,
  Radio,
  Flag,
  Lock,
  Trophy,
} from 'lucide-react'

const events = [
  {
    number: '01',
    phase: 'PHASE // 01',
    status: 'ACTIVE NOW',
    statusType: 'active',
    title: 'REGISTRATION OPENS',
    date: 'SEPTEMBER 20, 2026',
    time: '12:00 PM IST',
    detail: 'Team portals unlock globally with zero entry fee for all student squads.',
    tag: 'GLOBAL ENTRY · ZERO FEE',
    icon: Terminal,
  },
  {
    number: '02',
    phase: 'PHASE // 02',
    status: 'INTEL BRIEFING',
    statusType: 'scheduled',
    title: 'DISCORD BRIEFING & WARMUP',
    date: 'OCTOBER 05, 2026',
    time: '06:00 PM IST',
    detail: 'Discord credentials released, team briefings, and warmup sanity flags unlock.',
    tag: 'DISCORD REALM · SANITY FLAGS',
    icon: Radio,
  },
  {
    number: '03',
    phase: 'PHASE // 03',
    status: 'CRITICAL WINDOW',
    statusType: 'critical',
    title: 'CTF COMMENCES (FLAG HUNT)',
    date: 'OCTOBER 10, 2026',
    time: '10:00 AM IST',
    detail: '8-hour non-stop flag hunt begins across all 7 challenge disciplines.',
    tag: '8-HOUR SPRINT · DYNAMIC JEOPARDY',
    icon: Flag,
    isHighlight: true,
  },
  {
    number: '04',
    phase: 'PHASE // 04',
    status: 'LOCKDOWN',
    statusType: 'freeze',
    title: 'FLAG HUNT CLOSES',
    date: 'OCTOBER 10, 2026',
    time: '06:00 PM IST',
    detail: 'Scoreboard freezes. Flag gateways lock and writeup reviews begin.',
    tag: 'SCOREBOARD FREEZE · WRITEUPS',
    icon: Lock,
  },
  {
    number: '05',
    phase: 'PHASE // 05',
    status: 'CEREMONY',
    statusType: 'victory',
    title: 'GRAND RESULTS & KEYNOTE',
    date: 'OCTOBER 14, 2026',
    time: '05:00 PM IST',
    detail: 'Champions crowned, official bounties disbursed, and author writeups published.',
    tag: 'CASH PRIZES · HTB VOUCHERS · PERKS',
    icon: Trophy,
  },
]

export default function Timeline() {
  const line = useRef()
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const target = line.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        anime({
          targets: target,
          scaleY: [0, 1],
          transformOrigin: 'top',
          duration: 1800,
          easing: 'easeOutExpo',
        })
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const tilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`)
    card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - 0.5) * 6}deg`)
  }

  const filteredEvents = filter === 'ALL'
    ? events
    : filter === 'PRE'
      ? events.filter((e) => ['01', '02'].includes(e.number))
      : filter === 'LIVE'
        ? events.filter((e) => ['03', '04'].includes(e.number))
        : events.filter((e) => e.number === '05')

  return (
    <section id="timeline" className="timeline section-shell">
      {/* Cinematic Intro Header */}
      <div className="timeline-intro reveal">
        <div className="timeline-badge-row">
          <span className="section-kicker">THE ASCENT</span>
          <span className="timeline-telemetry-badge">
            <Clock size={12} /> 8-HOUR TIMEFRAME
          </span>
        </div>

        <h2>THE SIGNAL<br /><em>UNFOLDS</em></h2>
        <p className="timeline-sub">
          Mark your coordinates across five key milestones leading into and through the 8-hour competition window.
        </p>

        <div className="timeline-actions-row">
          {/* Filter Pills */}
          <div className="timeline-filter-pills" role="tablist" aria-label="Filter timeline milestones">
            <button
              className={`timeline-filter-btn ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              ALL PHASES
            </button>
            <button
              className={`timeline-filter-btn ${filter === 'PRE' ? 'active' : ''}`}
              onClick={() => setFilter('PRE')}
            >
              PRE-EVENT
            </button>
            <button
              className={`timeline-filter-btn ${filter === 'LIVE' ? 'active' : ''}`}
              onClick={() => setFilter('LIVE')}
            >
              THE SIEGE
            </button>
            <button
              className={`timeline-filter-btn ${filter === 'POST' ? 'active' : ''}`}
              onClick={() => setFilter('POST')}
            >
              RESULTS
            </button>
          </div>
        </div>
      </div>

      {/* Central Interactive Timeline */}
      <div className="timeline-list">
        {/* Animated Laser Data Conduit */}
        <div className="timeline-line-track">
          <div className="timeline-line" ref={line} />
          <div className="timeline-conduit-pulse" aria-hidden="true" />
        </div>

        {filteredEvents.map((evt, index) => {
          const IconComponent = evt.icon
          const isRight = index % 2 !== 0

          return (
            <article
              className={`timeline-event ${isRight ? 'timeline-event--right' : ''} ${evt.isHighlight ? 'timeline-event--highlight' : ''} reveal`}
              onMouseMove={tilt}
              onMouseLeave={(e) => {
                e.currentTarget.style.removeProperty('--rx')
                e.currentTarget.style.removeProperty('--ry')
              }}
              key={evt.number}
            >
              {/* Central Cyber Node / Beacon */}
              <div className="timeline-node-wrap">
                <div className={`timeline-node ${evt.isHighlight ? 'timeline-node--critical' : ''}`}>
                  <span className="node-index">{evt.number}</span>
                  {evt.isHighlight && <span className="node-radar" aria-hidden="true" />}
                </div>
                <div className="timeline-connector" aria-hidden="true" />
              </div>

              {/* Obsidian Telemetry Event Card */}
              <div className={`timeline-card ${evt.isHighlight ? 'timeline-card--highlight' : ''}`}>
                {/* Tech Corner Brackets */}
                <span className="card-bracket card-bracket--tl" aria-hidden="true" />
                <span className="card-bracket card-bracket--br" aria-hidden="true" />

                {/* Top Status Telemetry Row */}
                <div className="timeline-card-top">
                  <span className="phase-id">{evt.phase}</span>
                  <div className={`status-pill status-pill--${evt.statusType}`}>
                    <span className="status-dot" />
                    <span>{evt.status}</span>
                  </div>
                </div>

                {/* Card Title & Icon */}
                <div className="timeline-card-heading">
                  <div className="event-icon-box">
                    <IconComponent size={18} />
                  </div>
                  <h3>{evt.title}</h3>
                </div>

                {/* Date & Time Holographic Strip */}
                <div className="timeline-datetime-strip">
                  <div className="strip-date">
                    <Calendar size={13} className="strip-icon" />
                    <b>{evt.date}</b>
                  </div>
                  <div className="strip-divider" />
                  <div className="strip-time">
                    <Clock size={13} className="strip-icon" />
                    <span>{evt.time}</span>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
