import { useEffect } from 'react'
import { X, Radio, Globe, MapPin, ArrowUpRight } from 'lucide-react'

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
        className="modal-card modal-card--registration"
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

        <div className="registration-choice-container">
          <h2 id="register-modal-title" className="registration-choice-title">
            REGISTER <em>FOR</em>
          </h2>
          <p className="registration-choice-subtitle">
            SELECT YOUR TRACK
          </p>

          <div className="registration-tracks-grid">
            {/* Online Track Button */}
            <a
              href="https://ctf7.com/console/events/byteme-ctf/"
              target="_blank"
              rel="noopener noreferrer"
              className="registration-track-btn"
            >
              <Globe size={15} className="track-btn-icon" />
              <span className="track-btn-text">ONLINE TRACK</span>
              <ArrowUpRight size={13} className="track-btn-arrow" />
            </a>

            {/* Offline Track Button */}
            <a
              href="https://unstop.com/p/byteme-ctf-26-pimpri-chinchwad-college-of-engineering-1760412"
              target="_blank"
              rel="noopener noreferrer"
              className="registration-track-btn"
            >
              <MapPin size={15} className="track-btn-icon" />
              <span className="track-btn-text">OFFLINE TRACK</span>
              <ArrowUpRight size={13} className="track-btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
