import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SoulCursor from './components/SoulCursor'
import RulesModal from './components/RulesModal'
import RegistrationModal from './components/RegistrationModal'
import SplashScreen from './components/SplashScreen'
import { useScrollReveal } from './hooks/useScrollReveal'

// Lazy-load below-the-fold content
const About      = lazy(() => import('./components/About'))
const Tracks     = lazy(() => import('./components/Tracks'))
const Timeline   = lazy(() => import('./components/Timeline'))
const Prizes     = lazy(() => import('./components/Prizes'))
const Register   = lazy(() => import('./components/Register'))
const Sponsors   = lazy(() => import('./components/Sponsors'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function Cursor() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches
    setEnabled(isPointerFine)
  }, [])

  return enabled ? <SoulCursor /> : null
}

export default function App() {
  useScrollReveal()

  const [rulesOpen, setRulesOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [splashActive, setSplashActive] = useState(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const handleOpenRegister = () => setRegisterOpen(true)
  const handleOpenRules = () => setRulesOpen(true)
  const handleReplaySplash = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setSplashActive(true)
  }

  return (
    <>
      {splashActive && (
        <SplashScreen onFinish={() => setSplashActive(false)} />
      )}

      <Cursor />
      <div className="grain" />
      
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenRules={handleOpenRules}
      />

      <main>
        <Hero
          onOpenRegister={handleOpenRegister}
          onOpenRules={handleOpenRules}
        />

        <Suspense fallback={<div className="section-loader" />}>
          <About onOpenRules={handleOpenRules} />
          <Tracks onOpenRegister={handleOpenRegister} />
          <Timeline />
          <Prizes />
          <Register onOpenRegister={handleOpenRegister} />
          <Sponsors />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer onOpenRules={handleOpenRules} onReplaySplash={handleReplaySplash} />
      </Suspense>

      <RulesModal
        isOpen={rulesOpen}
        onClose={() => setRulesOpen(false)}
      />

      <RegistrationModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  )
}
