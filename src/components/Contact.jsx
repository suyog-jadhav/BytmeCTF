import { useState } from 'react'
import {
  Mail,
  Phone,
  Send,
  Check,
  Copy,
  User,
  MapPin,
  ExternalLink,
} from 'lucide-react'

const ORGANIZERS = [
  {
    name: 'Suyog Jadhav',
    role: 'Lead Organizer & Technical Head',
    phone: '+91 98813 92295',
    email: 'suyog.jadhav24@pccoepune.org',
    initials: 'SJ',
  },
  {
    name: 'Sarthak Warale',
    role: 'Event Coordinator & Operations Lead',
    phone: '+91 95273 79149',
    email: 'sarthak.warale24@pccoepune.org',
    initials: 'SW',
  },
]

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx88pi6PGbd7jiQq6QX8u-ve929HZQuO4chlP4XYo8XsojsXx0XL-kBsjsMbgIIraPQgQ/exec'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [copiedText, setCopiedText] = useState(null)

  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2200)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          category: formData.category,
          message: formData.message.trim(),
        }),
      })

      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', category: 'General Inquiry', message: '' })
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err) {
      console.error('Failed to submit message to Google Sheet:', err)
      setIsSubmitting(false)
      setErrorMessage('Failed to send message. Please contact coordinators directly.')
      setTimeout(() => setErrorMessage(null), 6000)
    }
  }

  return (
    <section id="contact" className="contact-section section-shell">
      {/* Ambient background glow */}
      <div className="contact-ambient-glow" aria-hidden="true" />

      <div className="contact-header reveal">
        <h2>CONTACT <em>US</em></h2>
        <p className="contact-sub">
          Reach out to our event coordinators or send us a message directly.
        </p>
      </div>

      {/* Copy Notification Toast */}
      {copiedText && (
        <div className="contact-toast" role="status" aria-live="polite">
          <Check size={14} />
          <span>Copied {copiedText} to clipboard</span>
        </div>
      )}

      {/* Dual Layout: Mail Option (First on Mobile) + Event Coordinators */}
      <div className="contact-grid">
        {/* Mail / Message Option (Order 1 on mobile) */}
        <div className="contact-mail-col reveal">
          <div className="contact-box-header">
            <Mail size={16} className="contact-box-icon" />
            <h3 className="contact-col-title">SEND A MESSAGE</h3>
          </div>

          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">YOUR NAME</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">EMAIL ADDRESS</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="contact-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-category">SUBJECT</label>
                <select
                  id="contact-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="contact-select"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Squad Registration">Squad Registration</option>
                  <option value="Technical Support">Technical Challenge Support</option>
                  <option value="Sponsorship">Sponsorship &amp; Partnerships</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">MESSAGE</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-textarea"
                />
              </div>

              {errorMessage && (
                <div className="contact-error-banner" role="alert">
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div className="contact-success-banner">
                  <Check size={18} />
                  <span>Message transmitted successfully! We will get back to you soon.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>SENDING...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Event Coordinators (Order 2 on mobile) */}
        <div className="contact-coordinators-col reveal">
          <div className="contact-box-header">
            <User size={16} className="contact-box-icon" />
            <h3 className="contact-col-title">EVENT COORDINATORS</h3>
          </div>

          <div className="organizer-cards">
            {ORGANIZERS.map((org) => (
              <div className="organizer-card" key={org.name}>
                <div className="organizer-card-header">
                  <div className="organizer-avatar-badge" aria-hidden="true">
                    <span>{org.initials}</span>
                  </div>
                  <div className="organizer-meta">
                    <h4 className="organizer-name">{org.name}</h4>
                    <p className="organizer-role">{org.role}</p>
                  </div>
                </div>

                <div className="organizer-contact-actions">
                  {/* Phone */}
                  <div className="contact-item">
                    <a
                      href={`tel:${org.phone.replace(/\s+/g, '')}`}
                      className="contact-link"
                      aria-label={`Call ${org.name}`}
                    >
                      <Phone size={14} className="contact-icon" />
                      <span>{org.phone}</span>
                    </a>
                    <button
                      type="button"
                      className="contact-copy-btn"
                      onClick={() => handleCopy(org.phone, `${org.name}'s phone`)}
                      aria-label={`Copy ${org.name}'s phone number`}
                      title="Copy phone"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  {/* Email */}
                  <div className="contact-item">
                    <a
                      href={`mailto:${org.email}`}
                      className="contact-link"
                      aria-label={`Email ${org.name}`}
                    >
                      <Mail size={14} className="contact-icon" />
                      <span className="contact-email-text">{org.email}</span>
                    </a>
                    <button
                      type="button"
                      className="contact-copy-btn"
                      onClick={() => handleCopy(org.email, `${org.name}'s email`)}
                      aria-label={`Copy ${org.name}'s email`}
                      title="Copy email"
                    >
                      <Copy size={13} />
                    </button>
                  </div>


                </div>
              </div>
            ))}
          </div>

          {/* Quick Channels Bar */}
          <div className="contact-quick-channels">
            <div className="channel-chip">
              <MapPin size={14} className="channel-icon" />
              <span>PCCOE, Sector 26, Pradhikaran, Nigdi, Pune 411044</span>
            </div>
            <a
              href="https://discord.gg/ucs7zqR78U"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-chip channel-chip--link"
            >
              <ExternalLink size={14} className="channel-icon" />
              <span>Official CTF Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
