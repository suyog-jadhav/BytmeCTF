import { useState, useEffect } from 'react'
import { X, CheckCircle2, Shield, Copy, Check, Download, Users, ArrowRight, Sparkles } from 'lucide-react'

export default function RegistrationModal({ isOpen, onClose }) {
  const [existingReg, setExistingReg] = useState(null)
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    college: '',
    discordTag: '',
    teamSize: '2',
    experience: 'Intermediate',
    memberNames: '',
  })
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('byteme_team_registration')
      if (saved) {
        setExistingReg(JSON.parse(saved))
      }
    } catch {
      // ignore
    }
  }, [isOpen])

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

  const validate = () => {
    const errs = {}
    if (!formData.teamName.trim()) errs.teamName = 'Team name is required'
    if (!formData.leaderName.trim()) errs.leaderName = 'Team leader name is required'
    if (!formData.leaderEmail.trim() || !formData.leaderEmail.includes('@')) {
      errs.leaderEmail = 'A valid email is required'
    }
    if (!formData.college.trim()) errs.college = 'College or organization is required'
    if (!formData.discordTag.trim()) errs.discordTag = 'Discord username is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setTimeout(() => {
      const passId = `SOUL-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`
      const registration = {
        ...formData,
        passId,
        registeredAt: new Date().toISOString(),
      }
      try {
        localStorage.setItem('byteme_team_registration', JSON.stringify(registration))
      } catch {
        // ignore
      }
      setExistingReg(registration)
      setSubmitting(false)
    }, 600)
  }

  const handleCopyTicket = () => {
    if (!existingReg) return
    navigator.clipboard?.writeText(existingReg.passId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleResetRegistration = () => {
    localStorage.removeItem('byteme_team_registration')
    setExistingReg(null)
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="register-modal-title">
      <div className="modal-card modal-card--cyber" onClick={(e) => e.stopPropagation()}>
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
            <Users size={14} /> TEAM REGISTRATION
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close registration modal">
            <X size={20} />
          </button>
        </div>

        {existingReg ? (
          <div className="ticket-view">
            <div className="ticket-badge">
              <CheckCircle2 size={16} /> REGISTRATION CONFIRMED · ACCESS GRANTED
            </div>
            <h2 id="register-modal-title" className="modal-title">
              SOUL CREST <em>UNLOCKED</em>
            </h2>
            <p className="modal-subtitle">
              Your squad coordinates have been locked into the Soul Realm. Retain your access token for the opening signal.
            </p>

            <div className="digital-ticket">
              <span className="ticket-notch ticket-notch--left" aria-hidden="true" />
              <span className="ticket-notch ticket-notch--right" aria-hidden="true" />

              <div className="ticket-header">
                <div className="ticket-brand">
                  <Shield size={22} className="ticket-shield" />
                  <div>
                    <b>BYTEME CTF</b>
                    <small>OFFICIAL OWASP PCCOE CHAPTER PASS</small>
                  </div>
                </div>
                <span className="ticket-status">● VERIFIED SQUAD</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-field">
                  <span>TEAM CODENAME</span>
                  <strong>{existingReg.teamName}</strong>
                </div>
                <div className="ticket-field">
                  <span>TEAM LEADER</span>
                  <strong>{existingReg.leaderName}</strong>
                </div>
                <div className="ticket-field">
                  <span>AFFILIATION</span>
                  <strong>{existingReg.college}</strong>
                </div>
                <div className="ticket-field">
                  <span>CREW SIZE</span>
                  <strong>{existingReg.teamSize === '1' ? 'Solo (1 Operative)' : 'Duo (2 Operatives)'}</strong>
                </div>
                {existingReg.teamSize === '2' && existingReg.memberNames && (
                  <div className="ticket-field ticket-field--full">
                    <span>SECOND OPERATIVE</span>
                    <strong>{existingReg.memberNames}</strong>
                  </div>
                )}
                <div className="ticket-field ticket-field--full">
                  <span>COMMUNICATION FREQ</span>
                  <strong>{existingReg.leaderEmail} · {existingReg.discordTag}</strong>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="ticket-token-col">
                  <span className="ticket-label">OFFICIAL ACCESS TOKEN KEY</span>
                  <code className="ticket-passcode">{existingReg.passId}</code>
                </div>
                <button className="ticket-copy-btn" onClick={handleCopyTicket} title="Copy Token ID">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'TOKEN COPIED' : 'COPY TOKEN'}
                </button>
              </div>

              <div className="ticket-barcode-row" aria-hidden="true">
                <span className="ticket-barcode-hash">01000010 01111001 01110100 01100101 01001101 01100101 // BYTEME-CTF-2026</span>
              </div>
            </div>

            <div className="ticket-actions">
              <button
                className="button-magnetic ticket-discord-btn"
                onClick={() => {
                  window.open('https://discord.gg/invite/owasp-pccoe', '_blank')
                }}
              >
                JOIN OPERATIVES DISCORD <ArrowRight size={16} />
              </button>
              <button className="text-button" onClick={handleResetRegistration}>
                Register a different squad
              </button>
            </div>
          </div>
        ) : (
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2 id="register-modal-title" className="modal-title">
              SUMMON YOUR <em>SQUAD</em>
            </h2>
            <p className="modal-subtitle">
              Free entry · Solo or Duo · Unlocks October 10, 2026
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="teamName">TEAM CODENAME *</label>
                <input
                  id="teamName"
                  type="text"
                  placeholder="e.g. 0xByteBenders"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className={errors.teamName ? 'input-error' : ''}
                />
                {errors.teamName && <span className="field-error">{errors.teamName}</span>}
              </div>

              <div className="form-group">
                <label>TEAM FORMAT *</label>
                <div className="team-format-toggle" role="radiogroup" aria-label="Select Team Format">
                  <button
                    type="button"
                    className={`team-format-btn ${formData.teamSize === '1' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, teamSize: '1', memberNames: '' })}
                  >
                    <span className="format-badge">01</span>
                    <span className="format-label">SOLO (1P)</span>
                  </button>

                  <button
                    type="button"
                    className={`team-format-btn ${formData.teamSize === '2' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, teamSize: '2' })}
                  >
                    <span className="format-badge">02</span>
                    <span className="format-label">DUO (2P)</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="leaderName">LEADER NAME *</label>
                <input
                  id="leaderName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.leaderName}
                  onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                  className={errors.leaderName ? 'input-error' : ''}
                />
                {errors.leaderName && <span className="field-error">{errors.leaderName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="leaderEmail">EMAIL ADDRESS *</label>
                <input
                  id="leaderEmail"
                  type="email"
                  placeholder="leader@domain.com"
                  value={formData.leaderEmail}
                  onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                  className={errors.leaderEmail ? 'input-error' : ''}
                />
                {errors.leaderEmail && <span className="field-error">{errors.leaderEmail}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="college">COLLEGE / INSTITUTION *</label>
                <input
                  id="college"
                  type="text"
                  placeholder="e.g. PCCOE Pune / Self"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className={errors.college ? 'input-error' : ''}
                />
                {errors.college && <span className="field-error">{errors.college}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="discordTag">DISCORD HANDLE *</label>
                <input
                  id="discordTag"
                  type="text"
                  placeholder="e.g. username#1337"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  className={errors.discordTag ? 'input-error' : ''}
                />
                {errors.discordTag && <span className="field-error">{errors.discordTag}</span>}
              </div>

              {formData.teamSize === '2' && (
                <div className="form-group form-group--full form-group--highlight">
                  <label htmlFor="memberNames">TEAMMATE (NAME &amp; EMAIL) *</label>
                  <input
                    id="memberNames"
                    type="text"
                    placeholder="Teammate Name (teammate@domain.com)"
                    value={formData.memberNames}
                    onChange={(e) => setFormData({ ...formData, memberNames: e.target.value })}
                  />
                </div>
              )}

              <div className="form-group form-group--full">
                <label htmlFor="experience">EXPERIENCE LEVEL</label>
                <div className="radio-pill-group">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <label
                      key={lvl}
                      className={`radio-pill ${formData.experience === lvl ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={lvl}
                        checked={formData.experience === lvl}
                        onChange={() => setFormData({ ...formData, experience: lvl })}
                      />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="button-magnetic form-submit-btn" disabled={submitting}>
                {submitting ? 'REGISTERING SQUAD...' : 'REGISTER SQUAD'}
                {!submitting && <Sparkles size={16} />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
