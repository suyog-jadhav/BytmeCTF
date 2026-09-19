import { Sparkles, useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'


function makeCrystalGeometry() {
  const geometry = new THREE.OctahedronGeometry(1.14, 2)
  const position = geometry.attributes.position
  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index)
    const y = position.getY(index)
    const z = position.getZ(index)
    const taper = 0.57 + (1 - Math.abs(y)) * 0.43
    position.setXYZ(index, x * taper * 0.8, y * 1.82, z * taper * 0.72)
  }
  position.needsUpdate = true
  geometry.computeVertexNormals()
  return geometry
}

function Crystal({ geometry, handlers }) {
  const core = useRef()
  const surface = useTexture('/assets/amber-crystal-surface.png')
  useMemo(() => {
    surface.colorSpace = THREE.SRGBColorSpace
    surface.wrapS = THREE.RepeatWrapping
    surface.wrapT = THREE.RepeatWrapping
    surface.repeat.set(1.35, 1.35)
    surface.anisotropy = 4
    surface.needsUpdate = true
  }, [surface])
  useFrame((state) => {
    if (core.current) {
      const pulse = 0.94 + Math.sin(state.clock.elapsedTime * 2.05) * 0.06
      core.current.scale.setScalar(pulse)
    }
  })
  return (
    <group>
      <mesh geometry={geometry} {...handlers} castShadow>
        <meshPhysicalMaterial
          map={surface}
          bumpMap={surface}
          bumpScale={0.10}
          roughnessMap={surface}
          color="#FFB52A"
          emissive="#FF9A08"
          emissiveMap={surface}
          emissiveIntensity={1.65}
          roughness={0.20}
          metalness={0.03}
          transmission={0.48}
          thickness={1.9}
          ior={1.45}
          clearcoat={0.88}
          clearcoatRoughness={0.07}
          transparent
          opacity={0.94}
          flatShading
        />
      </mesh>
      <mesh geometry={geometry} scale={1.009} {...handlers}>
        <meshBasicMaterial color="#FFF4B0" wireframe transparent opacity={0.025} />
      </mesh>
      <mesh ref={core} geometry={geometry} scale={0.54} {...handlers}>
        <meshBasicMaterial color="#FFD84A" transparent opacity={0.88} />
      </mesh>
      <mesh geometry={geometry} scale={[0.31, 0.45, 0.32]} position={[0.05, -0.05, 0.38]}>
        <meshBasicMaterial color="#FFF3A6" transparent opacity={0.92} />
      </mesh>
      <pointLight color="#FFB52A" intensity={64} distance={10} decay={2} />
      <pointLight color="#FFF3A6" intensity={28} distance={5} decay={2} position={[0.05, -0.05, 0.38]} />
    </group>
  )
}


function Fragments() {
  const fragments = useMemo(() => Array.from({ length: 22 }, (_, index) => ({
    position: [Math.sin(index * 9.4) * (1.55 + (index % 4) * 0.31), Math.cos(index * 5.6) * 1.86, Math.cos(index * 3.2) * 0.9],
    scale: 0.035 + (index % 4) * 0.026,
    rotation: [index * 0.7, index * 0.4, index * 0.2],
  })), [])
  return fragments.map((fragment, index) => (
    <mesh key={index} position={fragment.position} rotation={fragment.rotation} scale={fragment.scale}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#FF9A18" emissive="#FF9A18" emissiveIntensity={2.2} roughness={0.35} flatShading />
    </mesh>
  ))
}

function StoneAssembly({ reducedMotion, scale = 0.82, activeShard, float = true }) {
  const root = useRef()
  const targetRotation = useRef(new THREE.Euler(0.08, -0.35, 0))
  const lastPointer = useRef([0, 0])
  const dragging = useRef(false)
  const geometry = useMemo(makeCrystalGeometry, [])

  // Smoothly rotate stone to present facet when activeShard changes
  const prevShard = useRef(activeShard)
  useEffect(() => {
    if (activeShard !== undefined && prevShard.current !== activeShard) {
      const diff = activeShard - (prevShard.current ?? 0)
      prevShard.current = activeShard
      targetRotation.current.y += diff * 0.85 + 0.4
    }
  }, [activeShard])

  const onPointerDown = (event) => {
    if (reducedMotion) return
    event.stopPropagation()
    dragging.current = true
    lastPointer.current = [event.clientX, event.clientY]
    event.target.setPointerCapture?.(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (!dragging.current || reducedMotion) return
    event.stopPropagation()
    const [lastX, lastY] = lastPointer.current
    targetRotation.current.y += (event.clientX - lastX) * 0.012
    targetRotation.current.x = THREE.MathUtils.clamp(targetRotation.current.x + (event.clientY - lastY) * 0.009, -0.52, 0.52)
    lastPointer.current = [event.clientX, event.clientY]
  }
  const onPointerUp = (event) => {
    event.stopPropagation()
    dragging.current = false
    event.target.releasePointerCapture?.(event.pointerId)
  }
  const handlers = { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp }

  useFrame((state, delta) => {
    if (!root.current) return
    if (!reducedMotion && !dragging.current) targetRotation.current.y += delta * 0.18
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetRotation.current.x, 0.11)
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetRotation.current.y, 0.11)
    root.current.position.y = (reducedMotion || !float) ? 0 : Math.sin(state.clock.elapsedTime * 0.78) * 0.08
  })

  return (
    <group ref={root} scale={scale}>
      <Crystal geometry={geometry} handlers={handlers} />
      <Fragments />
    </group>
  )
}

function Scene({ reducedMotion, scale = 0.82, activeShard, float = true }) {
  return <>
    <ambientLight color="#ffe8b8" intensity={0.32} />
    <StoneAssembly reducedMotion={reducedMotion} scale={scale} activeShard={activeShard} float={float} />
    <Sparkles count={reducedMotion ? 35 : 118} scale={[6, 6, 3]} size={2.05} speed={reducedMotion ? 0 : 0.2} color="#FFD166" opacity={0.75} />
    <EffectComposer>
      <Bloom intensity={1.45} luminanceThreshold={0.35} mipmapBlur />
      <Vignette eskil={false} offset={0.2} darkness={1.12} />
    </EffectComposer>
  </>
}

export default function SoulStoneScene({ className = 'scene', scale = 0.82, activeShard, float = true }) {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div className={className} role="application" aria-label="Interactive glowing crystal. Drag the stone to rotate it.">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.1, 6.15], fov: 39 }} gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}><Scene reducedMotion={reducedMotion} scale={scale} activeShard={activeShard} float={float} /></Suspense>
      </Canvas>
    </div>
  )
}
