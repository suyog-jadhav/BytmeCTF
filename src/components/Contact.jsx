import { useState } from 'react'
import {
  Mail,
  Phone,
  Send,
  Check,
  Copy,
  MapPin,
  ExternalLink,
  Users,
} from 'lucide-react'

const ORGANIZERS = [
  {
    name: 'Suyog Jadhav',
    phone: '+91 98813 92295',
    email: 'suyog.jadhav24@pccoepune.org',
  },
  {
    name: 'Sarthak Warale',
    phone: '+91 95273 79149',
    email: 'sarthak.warale24@pccoepune.org',
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
  const [copiedField, setCopiedField] = useState(null)

  const handleCopy = (text, fieldId) => {
    navigator.clipboard?.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
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
    <section id="contact" className="contact-section">
      <div className="contact-shell">
        {/* Section Header */}
        <div className="contact-header reveal">
          <h2 className="contact-title">
            CONTACT <em>US</em>
          </h2>
        </div>

        {/* 2-Column Perfectly Aligned Layout */}
        <div className="contact-layout">
          {/* Left Column: Event Coordinators & Venue */}
          <div className="contact-roster-col reveal">
            {/* Coordinators Block */}
            <div className="contact-block">
              <div className="contact-block-label">
                <Users size={14} className="block-label-icon" />
                <span>EVENT COORDINATORS</span>
              </div>

              <div className="organizer-list">
                {ORGANIZERS.map((org, idx) => (
                  <article className="organizer-tile" key={org.name}>
                    <h4 className="organizer-name">{org.name}</h4>

                    <div className="organizer-channels">
                      {/* Phone Channel */}
                      <div className="channel-row">
                        <a
                          href={`tel:${org.phone.replace(/\s+/g, '')}`}
                          className="channel-link"
                          aria-label={`Call ${org.name}`}
                        >
                          <Phone size={13} className="channel-link-icon" />
                          <span>{org.phone}</span>
                        </a>
                        <button
                          type="button"
                          className={`channel-copy-btn ${copiedField === `${idx}-phone` ? 'copied' : ''}`}
                          onClick={() => handleCopy(org.phone, `${idx}-phone`)}
                          aria-label={`Copy ${org.name}'s phone number`}
                          title="Copy phone"
                        >
                          {copiedField === `${idx}-phone` ? (
                            <>
                              <Check size={12} />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Email Channel */}
                      <div className="channel-row">
                        <a
                          href={`mailto:${org.email}`}
                          className="channel-link"
                          aria-label={`Email ${org.name}`}
                        >
                          <Mail size={13} className="channel-link-icon" />
                          <span className="channel-link-text">{org.email}</span>
                        </a>
                        <button
                          type="button"
                          className={`channel-copy-btn ${copiedField === `${idx}-email` ? 'copied' : ''}`}
                          onClick={() => handleCopy(org.email, `${idx}-email`)}
                          aria-label={`Copy ${org.name}'s email`}
                          title="Copy email"
                        >
                          {copiedField === `${idx}-email` ? (
                            <>
                              <Check size={12} />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>COPY</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Campus Venue Block */}
            <div className="contact-block">
              <div className="contact-block-label">
                <MapPin size={14} className="block-label-icon" />
                <span>LOCATION</span>
              </div>
              <a
                href="https://maps.google.com/?q=Pimpri+Chinchwad+College+of+Engineering+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="venue-card"
                aria-label="Pimpri Chinchwad College of Engineering on Google Maps"
              >
                <div className="venue-icon-box">
                  <MapPin size={18} />
                </div>
                <span className="venue-title">Pimpri Chinchwad College of Engineering</span>
                <ExternalLink size={14} className="venue-external-icon" />
              </a>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="contact-form-col reveal">
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="card-header-main">
                  <Mail size={16} className="card-header-icon" />
                  <h3 className="card-header-title">SEND A MESSAGE</h3>
                </div>
                <span className="card-header-tag">DIRECT INQUIRY</span>
              </div>

              <form className="refined-form" onSubmit={handleSubmit}>
                {/* 2-Column Name & Email Row */}
                <div className="form-grid-row">
                  <div className="form-field">
                    <label htmlFor="contact-name" className="form-field-label">
                      YOUR NAME <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="refined-input"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email" className="form-field-label">
                      EMAIL ADDRESS <span className="req-star">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="refined-input"
                    />
                  </div>
                </div>

                {/* Subject / Category Dropdown */}
                <div className="form-field">
                  <label htmlFor="contact-category" className="form-field-label">
                    SUBJECT / CATEGORY
                  </label>
                  <div className="refined-select-wrap">
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="refined-select"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Squad Registration">Squad Registration</option>
                      <option value="Technical Support">Technical Challenge Support</option>
                      <option value="Sponsorship">Sponsorship &amp; Partnerships</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-field">
                  <label htmlFor="contact-message" className="form-field-label">
                    YOUR MESSAGE <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Write your message, question, or proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="refined-textarea"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="form-error-banner" role="alert">
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Banner or Submit Button */}
                {submitted ? (
                  <div className="form-success-banner">
                    <Check size={18} className="success-icon" />
                    <div className="success-text">
                      <strong>Message Sent Successfully</strong>
                      <span>Thank you. Our organizing team will review your inquiry and get back to you soon.</span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>SENDING MESSAGE...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={16} strokeWidth={2.8} />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
