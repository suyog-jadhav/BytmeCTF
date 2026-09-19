import { useEffect } from 'react'
import { X, Scale } from 'lucide-react'

const RULES = [
  {
    num: '01',
    title: 'Flag Format',
    text: 'All flags follow the format',
    code: 'byteme{flag_here}',
    note: '(strictly case-sensitive).'
  },
  {
    num: '02',
    title: 'Team Limit',
    text: 'Teams consist of 1 to 2 members (solo or duo).'
  },
  {
    num: '03',
    title: 'Dynamic Scoring',
    text: 'Challenges start at 500 points and decay to 100 points as solves increase.'
  },
  {
    num: '04',
    title: 'No Sharing',
    text: 'Sharing flags, solutions, or hints with other teams is strictly prohibited.'
  },
  {
    num: '05',
    title: 'No Sabotage',
    text: 'Do not attack competition servers, scoring engines, or peers (no DoS/DDoS).'
  },
  {
    num: '06',
    title: 'No Brute-Force',
    text: 'Automated brute-forcing on flag submission portals is strictly forbidden.'
  },
  {
    num: '07',
    title: 'Writeups for Prizes',
    text: 'Top 10 teams must submit writeups within 4 hours to claim podium prizes.'
  },
  {
    num: '08',
    title: 'Organizers\' Decision',
    text: 'Decisions made by the OWASP PCCOE team are final.'
  }
]

export default function RulesModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-title"
    >
      <div className="modal-card modal-card--simple" onClick={(e) => e.stopPropagation()}>
        {/* Top Decorative Laser Beam */}
        <div className="modal-laser-beam" aria-hidden="true" />

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-kicker">
            <span className="modal-kicker-beacon" aria-hidden="true" />
            <Scale size={13} />
            <span>OFFICIAL GUIDELINES</span>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close rules modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Title & Subtitle */}
        <h2 id="rules-title" className="modal-title">
          COMPETITION <em>RULES</em>
        </h2>
        <p className="modal-subtitle">
          Please review the official guidelines below before competing.
        </p>

        {/* Simple & Short Rules List */}
        <ol className="simple-rules-list">
          {RULES.map((rule) => (
            <li key={rule.num} className="simple-rule-item">
              <span className="simple-rule-num">{rule.num}</span>
              <div className="simple-rule-body">
                <strong className="simple-rule-title">{rule.title}:</strong>{' '}
                <span className="simple-rule-text">{rule.text}</span>
                {rule.code && (
                  <code className="simple-rule-code">{rule.code}</code>
                )}
                {rule.note && (
                  <span className="simple-rule-note"> {rule.note}</span>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Modal Footer */}
        <div className="modal-footer">
          <p className="modal-note">Questions? Reach out on the official OWASP PCCOE Discord.</p>
          <button className="button-magnetic modal-action-btn" onClick={onClose}>
            I UNDERSTAND &amp; ACCEPT
          </button>
        </div>
      </div>
    </div>
  )
}
