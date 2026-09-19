import { useEffect } from 'react'
import { X, Clock, Radio } from 'lucide-react'

export default function RegistrationModal({ isOpen, onClose }) {
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
      aria-labelledby="register-modal-title"
    >
      <div
        className="modal-card modal-card--starting-soon"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top illuminated laser beam */}
        <div className="modal-laser-beam" aria-hidden="true" />

        {/* Chamfered Tech Corner Brackets */}
        <span className="card-bracket card-bracket--tl" aria-hidden="true" />
        <span className="card-bracket card-bracket--tr" aria-hidden="true" />
        <span className="card-bracket card-bracket--bl" aria-hidden="true" />
        <span className="card-bracket card-bracket--br" aria-hidden="true" />

        <div className="modal-header">
          <div className="modal-kicker">
            <span className="modal-kicker-beacon" aria-hidden="true" />
            <Radio size={14} /> REGISTRATION PORTAL
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close registration modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="starting-soon-container">
          <div className="starting-soon-beacon-ring">
            <Clock size={32} className="starting-soon-icon" />
          </div>

          <h2 id="register-modal-title" className="modal-title starting-soon-title">
            STARTING <em>SOON</em>
          </h2>
        </div>
      </div>
    </div>
  )
}
