import { lazy, Suspense, useState } from 'react'

const SoulStoneScene = lazy(() => import('./SoulStoneScene'))

const fragments = [
  { id: '01', title: 'THE PERIMETER', track: 'WEB EXPLOITATION', text: 'Where modern interfaces mask fragile substrates. SQL injections, prototype pollution, and broken access controls bleed into the open.' },
  { id: '02', title: 'THE CIPHER VOID', track: 'CRYPTOGRAPHY', text: 'Whispered equations and broken primes. Lattices warp under mathematical scrutiny; bad nonces bring ancient ciphers crashing down.' },
  { id: '03', title: 'THE MACHINE PULSE', track: 'BINARY EXPLOITATION', text: 'Stack layouts, return-oriented programming, and heap allocations. Seize control of the instruction pointer and rewrite execution flow.' },
  { id: '04', title: 'THE DECOMPILED GHOST', track: 'REVERSE ENGINEERING', text: 'Obfuscated binaries, stripped symbols, and virtual machines. Reconstruct the author’s intent byte by disassembly byte.' },
  { id: '05', title: 'THE DIGITAL STRATA', track: 'DIGITAL FORENSICS', text: 'Memory dumps, raw disk images, and pcap packet streams. Nothing on a digital system truly vanishes—every byte leaves an echo.' },
  { id: '06', title: 'THE RECON BEACON', track: 'OPEN SOURCE INTEL', text: 'Public registries, metadata footprints, and forgotten commits. The world leaves clues everywhere for those who know how to query.' },
  { id: '07', title: 'THE SINGULARITY', track: 'MISC / ESOTERIC', text: 'PyJails, custom hardware protocols, esoteric VMs, and unconventional enigmas at the bleeding edge of logic.' },
]

export default function Lore() {
  const [activeShard, setActiveShard] = useState(0)
  const current = fragments[activeShard]

  return (
    <section id="lore" className="lore section-shell">
      <div className="lore-visual reveal">
        <div className="lore-orbit" />
        <Suspense fallback={<div className="lore-stone-fallback" aria-hidden="true" />}>
          <SoulStoneScene className="lore-scene" scale={0.78} activeShard={activeShard} />
        </Suspense>
        <div className="shard-selector">
          {fragments.map((frag, idx) => (
            <button
              key={frag.id}
              className={`shard-btn ${activeShard === idx ? 'active' : ''}`}
              onClick={() => setActiveShard(idx)}
              aria-label={`Inspect Fragment ${frag.id}`}
            >
              {frag.id}
            </button>
          ))}
        </div>
        <span>FRAGMENT / {current.id} — {current.track}</span>
      </div>

      <div className="lore-copy reveal">
        <h2>CHALLENGE<br /><em>TRACKS</em></h2>
        <div className="lore-rule" />
        
        <div className="active-shard-card">
          <div className="shard-card-header">
            <b>TRACK {current.id}</b>
            <span>{current.track}</span>
          </div>
          <h4>{current.title}</h4>
          <p>{current.text}</p>
        </div>
      </div>
    </section>
  )
}
