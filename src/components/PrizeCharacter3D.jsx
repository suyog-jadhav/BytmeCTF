import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// ── Thanos 3D Model: Infinity Gauntlet & The Blazing Soul Stone ──
function ThanosModel({ mousePos }) {
  const groupRef = useRef()
  const coreRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const fragmentsRef = useRef()

  // Orbiting golden fragments
  const fragments = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      pos: [
        Math.cos(i * 1.2) * (1.2 + (i % 3) * 0.25),
        Math.sin(i * 1.5) * (0.8 + (i % 2) * 0.3),
        Math.sin(i * 0.9) * 0.7,
      ],
      rot: [i * 0.4, i * 0.6, i * 0.2],
      scale: 0.05 + (i % 3) * 0.035,
    }))
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Smooth floating and mouse tracking
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.08
    groupRef.current.rotation.y += delta * 0.45
    if (mousePos.current) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.8 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.current.y * 0.4,
        0.05
      )
    }

    // Pulse the amber Soul Stone
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.12
      coreRef.current.scale.setScalar(pulse)
    }

    // Counter-rotating celestial Infinity Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.6
      ring1Ref.current.rotation.x += delta * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.5
      ring2Ref.current.rotation.y += delta * 0.4
    }

    // Floating fragment rotation
    if (fragmentsRef.current) {
      fragmentsRef.current.rotation.y -= delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Heavy Gold Armor Gauntlet Hand Base */}
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.52, 0.68, 0.7, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.92}
          roughness={0.22}
          emissive="#543806"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Armored Knuckle Ridge */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.82, 0.22, 0.55]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.95}
          roughness={0.18}
          emissive="#78350f"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Central Soul Stone Socket Mount */}
      <mesh position={[0, 0.18, 0.22]}>
        <cylinderGeometry args={[0.32, 0.38, 0.14, 6]} />
        <meshStandardMaterial
          color="#b45309"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* The Blazing Soul Stone (Amber Octahedron) */}
      <group ref={coreRef} position={[0, 0.25, 0.26]}>
        <mesh>
          <octahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial
            color="#ff9a08"
            emissive="#ff7700"
            emissiveIntensity={3.2}
            roughness={0.08}
            metalness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh scale={1.2}>
          <octahedronGeometry args={[0.38, 0]} />
          <meshBasicMaterial
            color="#fff0aa"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Core Radiance Point Lights */}
        <pointLight color="#ff8800" intensity={42} distance={6} decay={2} />
        <pointLight color="#fff0aa" intensity={20} distance={3} decay={2} />
      </group>

      {/* Celestial Golden Infinity Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.25, 0.024, 16, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#b45309"
          emissiveIntensity={1.4}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.48, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#78350f"
          emissiveIntensity={1.2}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Golden Shards */}
      <group ref={fragmentsRef}>
        {fragments.map((frag, idx) => (
          <mesh key={idx} position={frag.pos} rotation={frag.rot} scale={frag.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#f59e0b"
              emissiveIntensity={2.5}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Ambient & Rim Lighting */}
      <pointLight color="#ffd700" position={[2, 3, 2]} intensity={25} />
      <pointLight color="#ff6b00" position={[-2, -2, -2]} intensity={15} />
    </group>
  )
}

// ── Gamora 3D Model: Godslayer Cosmic Blades & Ethereal Nexus ──
function GamoraModel({ mousePos }) {
  const groupRef = useRef()
  const blade1Ref = useRef()
  const blade2Ref = useRef()
  const gemRef = useRef()
  const astralRingRef = useRef()
  const fragmentsRef = useRef()

  const fragments = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      pos: [
        Math.sin(i * 1.3) * (1.1 + (i % 2) * 0.3),
        Math.cos(i * 1.7) * (0.8 + (i % 3) * 0.2),
        Math.cos(i * 1.1) * 0.6,
      ],
      rot: [i * 0.5, i * 0.3, i * 0.4],
      scale: 0.045 + (i % 3) * 0.03,
    }))
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08
    groupRef.current.rotation.y += delta * 0.4
    if (mousePos.current) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.8 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.current.y * 0.4,
        0.05
      )
    }

    // Emerald pulse
    if (gemRef.current) {
      const pulse = 1 + Math.sin(t * 3.8) * 0.14
      gemRef.current.scale.setScalar(pulse)
    }

    if (astralRingRef.current) {
      astralRingRef.current.rotation.x += delta * 0.7
      astralRingRef.current.rotation.y += delta * 0.35
    }

    if (fragmentsRef.current) {
      fragmentsRef.current.rotation.y -= delta * 0.35
    }
  })

  return (
    <group ref={groupRef}>
      {/* Blade 1 (Tilted Right) */}
      <group rotation={[0, 0, Math.PI / 4.2]}>
        {/* Central Steel Spine */}
        <mesh position={[0, 0, 0]} scale={[0.07, 1.85, 0.035]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.96}
            roughness={0.14}
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Emerald Edge Glow */}
        <mesh position={[0.045, 0, 0]} scale={[0.02, 1.75, 0.02]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
        {/* Blade Crossguard */}
        <mesh position={[0, -0.35, 0]} scale={[0.32, 0.06, 0.07]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Blade 2 (Tilted Left) */}
      <group rotation={[0, 0, -Math.PI / 4.2]}>
        <mesh position={[0, 0, 0]} scale={[0.07, 1.85, 0.035]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.96}
            roughness={0.14}
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh position={[-0.045, 0, 0]} scale={[0.02, 1.75, 0.02]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
        <mesh position={[0, -0.35, 0]} scale={[0.32, 0.06, 0.07]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Center Ethereal Emerald Soul Relic */}
      <group ref={gemRef} position={[0, 0, 0.08]}>
        <mesh>
          <icosahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={3.2}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh scale={1.22}>
          <icosahedronGeometry args={[0.36, 0]} />
          <meshBasicMaterial color="#a7f3d0" wireframe transparent opacity={0.4} />
        </mesh>
        <pointLight color="#10b981" intensity={36} distance={6} decay={2} />
        <pointLight color="#6ee7b7" intensity={18} distance={3} decay={2} />
      </group>

      {/* Astral Gyroscopic Orbit Ring */}
      <mesh ref={astralRingRef}>
        <torusGeometry args={[1.35, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#6ee7b7"
          emissive="#059669"
          emissiveIntensity={1.5}
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Emerald Shards */}
      <group ref={fragmentsRef}>
        {fragments.map((frag, idx) => (
          <mesh key={idx} position={frag.pos} rotation={frag.rot} scale={frag.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#10b981"
              emissiveIntensity={2.5}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      <pointLight color="#34d399" position={[2, 2, 3]} intensity={22} />
      <pointLight color="#059669" position={[-2, -2, -2]} intensity={14} />
    </group>
  )
}

// ── Red Skull 3D Model: Stonekeeper of Vormir Relic ──
function RedSkullModel({ mousePos }) {
  const groupRef = useRef()
  const eyeLeftRef = useRef()
  const eyeRightRef = useRef()
  const altarRingRef = useRef()
  const embersRef = useRef()

  const embers = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      pos: [
        Math.cos(i * 1.4) * (1.1 + (i % 3) * 0.2),
        Math.sin(i * 2.1) * (0.7 + (i % 2) * 0.35),
        Math.sin(i * 1.3) * 0.65,
      ],
      rot: [i * 0.3, i * 0.5, i * 0.2],
      scale: 0.04 + (i % 3) * 0.03,
    }))
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.position.y = Math.sin(t * 1.3) * 0.07
    groupRef.current.rotation.y += delta * 0.4
    if (mousePos.current) {
      groupRef.current.rotation.y += (mousePos.current.x * 0.8 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.current.y * 0.4,
        0.05
      )
    }

    // Eye sockets ominous pulse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyePulse = 2.8 + Math.sin(t * 4.2) * 1.2
      eyeLeftRef.current.material.emissiveIntensity = eyePulse
      eyeRightRef.current.material.emissiveIntensity = eyePulse
    }

    if (altarRingRef.current) {
      altarRingRef.current.rotation.z += delta * 0.5
      altarRingRef.current.rotation.x += delta * 0.25
    }

    if (embersRef.current) {
      embersRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Stonekeeper Cranium (Faceted Crimson Relic) */}
      <mesh position={[0, 0.16, 0]}>
        <dodecahedronGeometry args={[0.56, 1]} />
        <meshStandardMaterial
          color="#b91c1c"
          roughness={0.32}
          metalness={0.35}
          emissive="#7f1d1d"
          emissiveIntensity={1.4}
          flatShading
        />
      </mesh>

      {/* Jaw / Maxilla Section */}
      <mesh position={[0, -0.22, 0.12]} scale={[0.42, 0.35, 0.42]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#991b1b"
          roughness={0.35}
          metalness={0.3}
          emissive="#450a0a"
          emissiveIntensity={0.8}
          flatShading
        />
      </mesh>

      {/* Cheekbone ridges */}
      <mesh position={[-0.24, -0.02, 0.28]} scale={[0.18, 0.14, 0.22]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} flatShading />
      </mesh>
      <mesh position={[0.24, -0.02, 0.28]} scale={[0.18, 0.14, 0.22]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} flatShading />
      </mesh>

      {/* Piercing Glowing Red Eye Sockets */}
      <mesh ref={eyeLeftRef} position={[-0.17, 0.16, 0.48]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff1111"
          emissiveIntensity={3.5}
        />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.17, 0.16, 0.48]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff1111"
          emissiveIntensity={3.5}
        />
      </mesh>

      {/* Glowing Eye Point Lights */}
      <pointLight color="#ff0000" position={[0, 0.16, 0.6]} intensity={38} distance={5} decay={2} />

      {/* Hooded Vormir Altar Halo Ring */}
      <mesh ref={altarRingRef} position={[0, 0, -0.05]}>
        <torusGeometry args={[1.28, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#7f1d1d"
          emissiveIntensity={1.8}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Orbiting Fiery Soul Embers */}
      <group ref={embersRef}>
        {embers.map((ember, idx) => (
          <mesh key={idx} position={ember.pos} rotation={ember.rot} scale={ember.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#ff2222"
              emissiveIntensity={2.8}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      <pointLight color="#ef4444" position={[2, 2, 3]} intensity={24} />
      <pointLight color="#7f1d1d" position={[-2, -2, -2]} intensity={14} />
    </group>
  )
}

// ── Master 3D Canvas Scene for Prize Cards ──────────────────
export default function PrizeCharacter3D({ character = 'thanos', scale = 0.62 }) {
  const mousePos = useRef({ x: 0, y: 0 })

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mousePos.current = { x, y }
  }

  const handlePointerLeave = () => {
    mousePos.current = { x: 0, y: 0 }
  }

  return (
    <div
      className={`prize-3d-stage prize-3d-stage--${character}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />

        <group scale={scale} position={[0, -0.06, 0]}>
          {character === 'thanos' && (
            <>
              <ThanosModel mousePos={mousePos} />
              <Sparkles count={40} scale={[3.2, 3.2, 2]} size={2.2} speed={0.4} color="#ffd700" opacity={0.7} />
            </>
          )}

          {character === 'gamora' && (
            <>
              <GamoraModel mousePos={mousePos} />
              <Sparkles count={35} scale={[3.2, 3.2, 2]} size={2.0} speed={0.4} color="#34d399" opacity={0.7} />
            </>
          )}

          {character === 'redskull' && (
            <>
              <RedSkullModel mousePos={mousePos} />
              <Sparkles count={40} scale={[3.2, 3.2, 2]} size={2.2} speed={0.4} color="#ef4444" opacity={0.7} />
            </>
          )}
        </group>
      </Canvas>
    </div>
  )
}
