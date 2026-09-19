import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar({ onOpenRegister, onOpenRules }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const leftNavLinks = [
    { id: 'about', label: 'About', index: '01' },
    { id: 'tracks', label: 'Tracks', index: '02' },
    { id: 'timeline', label: 'Timeline', index: '03' },
  ]
  const rightNavLinks = [
    { id: 'prizes', label: 'Prizes', index: '04' },
    { id: 'sponsors', label: 'Sponsors', index: '05' },
    { id: 'contact', label: 'Contact', index: '06' },
  ]

  const allLinks = [...leftNavLinks, ...rightNavLinks]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32)

      const sections = ['home', 'about', 'tracks', 'timeline', 'prizes', 'register', 'sponsors', 'contact']
      const scrollPos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const navigate = (id, isModal = false) => {
    setMobileMenuOpen(false)
    if (isModal && id === 'rules') {
      onOpenRules?.()
      return
    }
    const element = document.querySelector(`#${id.toLowerCase()}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top Main Navbar */}
      <header className={`navbar ${scrolled ? 'navbar--solid' : ''}`}>
        <a
          href="https://owasppccoe.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="brand"
          aria-label="OWASP PCCOE official website"
        >
          <div className="brand-logo-wrap">
            <img src="/assets/owasp-logo.png" alt="OWASP Logo" className="brand-logo-img" width="52" height="52" />
            <div className="brand-text">
              <span>OWASP</span>
              <small>PCCOE</small>
            </div>
          </div>
        </a>

        <div className="nav-actions">
          <div className="nav-register-wrap">
            <button
              className="register-cyber-btn nav-cyber-btn"
              onClick={() => onOpenRegister ? onOpenRegister() : navigate('register')}
              aria-label="Register team"
            >
              {/* Glowing Beam Flares (Top & Bottom, active on hover) */}
              <span className="cyber-flare cyber-flare--top" aria-hidden="true" />
              <span className="cyber-flare cyber-flare--bottom" aria-hidden="true" />

              {/* Sci-Fi Chamfered Cyber Armor Vector Frame */}
              <svg
                className="cyber-btn-svg"
                viewBox="0 0 380 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  {/* Glowing Amber Gradient for Hover State */}
                  <linearGradient id="navCyberAmberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff7b10" />
                    <stop offset="20%" stopColor="#ffa726" />
                    <stop offset="50%" stopColor="#ffcc80" />
                    <stop offset="80%" stopColor="#ffa726" />
                    <stop offset="100%" stopColor="#ff7b10" />
                  </linearGradient>

                  {/* Corner Bracket Gradient */}
                  <linearGradient id="navCyberBracketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffb74d" />
                    <stop offset="50%" stopColor="#ff7b00" />
                    <stop offset="100%" stopColor="#d84315" />
                  </linearGradient>

                  {/* Dark Inner Plate Fill */}
                  <linearGradient id="navCyberPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1c100a" />
                    <stop offset="50%" stopColor="#0d0705" />
                    <stop offset="100%" stopColor="#080403" />
                  </linearGradient>
                </defs>

                {/* Dark Inner Plate Polygon */}
                <polygon
                  className="cyber-inner-plate"
                  points="32,6 348,6 370,22 370,42 348,58 32,58 10,42 10,22"
                  fill="url(#navCyberPlateGrad)"
                />

                {/* Octagonal Chassis Base Outline */}
                <polygon
                  className="cyber-base-frame"
                  points="32,6 348,6 370,22 370,42 348,58 32,58 10,42 10,22"
                  stroke="url(#navCyberAmberGlow)"
                  strokeWidth="1.8"
                />

                {/* Heavy Chamfered Corner Brackets */}
                <path
                  className="cyber-corner-bracket"
                  d="M 66,4 L 30,4 L 8,24 L 8,36"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                <path
                  className="cyber-corner-bracket"
                  d="M 314,4 L 350,4 L 372,24 L 372,36"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                <path
                  className="cyber-corner-bracket"
                  d="M 372,28 L 372,40 L 350,60 L 314,60"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />
                <path
                  className="cyber-corner-bracket"
                  d="M 8,28 L 8,40 L 30,60 L 66,60"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="4"
                  strokeLinecap="square"
                />

                {/* Outer Flanking Side Bars */}
                <line
                  className="cyber-side-tick"
                  x1="2"
                  y1="24"
                  x2="2"
                  y2="40"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
                <line
                  className="cyber-side-tick"
                  x1="378"
                  y1="24"
                  x2="378"
                  y2="40"
                  stroke="url(#navCyberBracketGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                />
              </svg>

              <span className="cyber-btn-text">REGISTER</span>
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Vertical Navigation Bar — Left Side */}
      <nav className="vertical-nav vertical-nav--left desktop-only" aria-label="Left Side Navigation">
        <div className="vertical-nav-indicator" />
        <div className="vertical-nav-group">
          {leftNavLinks.map((link) => (
            <button
              key={link.id}
              className={`vertical-nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span className="vnav-label">{link.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Vertical Navigation Bar — Right Side */}
      <nav className="vertical-nav vertical-nav--right desktop-only" aria-label="Right Side Navigation">
        <div className="vertical-nav-indicator" />
        <div className="vertical-nav-group">
          {rightNavLinks.map((link) => (
            <button
              key={link.id}
              className={`vertical-nav-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span className="vnav-label">{link.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">SIGNAL DIRECTORY</span>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-nav-links">
          {allLinks.map((link) => (
            <button
              key={link.id}
              className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => navigate(link.id, link.isModal)}
            >
              <span>{link.label}</span>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
        <div className="mobile-nav-footer">
          <button
            className="button-magnetic mobile-register-btn"
            onClick={() => {
              setMobileMenuOpen(false)
              if (onOpenRegister) onOpenRegister()
              else navigate('register')
            }}
          >
            REGISTER FOR BYTEME CTF <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
