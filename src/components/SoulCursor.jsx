import { useEffect, useRef } from 'react'

const COLORS = [
  { r: 255, g: 120, b: 30 },
  { r: 255, g: 165, b: 60 },
  { r: 255, g: 200, b: 80 },
  { r: 255, g: 240, b: 150 },
  { r: 255, g: 255, b: 200 },
]

function randomBetween(a, b) { return a + Math.random() * (b - a) }
function pickColor() { return COLORS[Math.floor(Math.random() * COLORS.length)] }

export default function SoulCursor() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -999, y: -999 })
  const particles = useRef([])
  const frameRef = useRef(null)
  const lastSpawnRef = useRef(0)

  useEffect(() => {
    // Disable particle cursor on mobile/touch screens to eliminate CPU/GPU drain and scroll lag
    if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768)) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const onClick = (e) => spawnBurst(e.clientX, e.clientY, 18)
    window.addEventListener('click', onClick)

    function spawnWisp(x, y) {
      const c = pickColor()
      particles.current.push({
        x, y,
        vx: randomBetween(-0.6, 0.6),
        vy: randomBetween(-2.2, -0.5),
        radius: randomBetween(1.5, 4),
        alpha: randomBetween(0.5, 0.9),
        decay: randomBetween(0.012, 0.025),
        wobble: randomBetween(0, Math.PI * 2),
        wobbleSpeed: randomBetween(0.04, 0.09),
        c, type: 'wisp',
      })
    }

    function spawnBurst(x, y, count) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = randomBetween(1.5, 5.5)
        const c = pickColor()
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          radius: randomBetween(2, 5),
          alpha: randomBetween(0.7, 1.0),
          decay: randomBetween(0.018, 0.035),
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: randomBetween(0.03, 0.07),
          c, type: 'burst',
        })
      }
    }

    function drawGlowOrb(x, y) {
      const halo = ctx.createRadialGradient(x, y, 0, x, y, 48)
      halo.addColorStop(0, 'rgba(255,160,40,0.18)')
      halo.addColorStop(0.5, 'rgba(255,100,10,0.07)')
      halo.addColorStop(1, 'rgba(255,80,0,0)')
      ctx.beginPath(); ctx.arc(x, y, 48, 0, Math.PI * 2)
      ctx.fillStyle = halo; ctx.fill()

      const mid = ctx.createRadialGradient(x, y, 0, x, y, 14)
      mid.addColorStop(0, 'rgba(255,230,120,0.9)')
      mid.addColorStop(0.4, 'rgba(255,140,30,0.6)')
      mid.addColorStop(1, 'rgba(255,80,0,0)')
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2)
      ctx.fillStyle = mid; ctx.fill()

      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,240,0.95)'; ctx.fill()

      ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 160, 40, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke()
    }

    function drawParticle(p) {
      const { x, y, radius, alpha, c } = p
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5)
      grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha})`)
      grd.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${alpha * 0.4})`)
      grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
      ctx.beginPath(); ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = grd; ctx.fill()
    }

    function animate(ts) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x, my = mouse.current.y

      if (mx > 0 && ts - lastSpawnRef.current > 28) {
        spawnWisp(mx + randomBetween(-8, 8), my + randomBetween(-8, 8))
        if (Math.random() < 0.3) spawnWisp(mx + randomBetween(-14, 14), my + randomBetween(-14, 14))
        lastSpawnRef.current = ts
      }

      particles.current = particles.current.filter(p => p.alpha > 0.01)
      for (const p of particles.current) {
        p.wobble += p.wobbleSpeed
        p.x += p.vx + Math.sin(p.wobble) * 0.4
        p.y += p.vy
        p.vy *= 0.985
        p.vx *= 0.98
        p.alpha -= p.decay
        p.radius *= 0.993
        drawParticle(p)
      }

      if (mx > 0) drawGlowOrb(mx, my)
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  if (typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768)) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  )
}
