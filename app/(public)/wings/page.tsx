'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { classicWings, lightweightWings, competitionWings, miniwings, tandemWings } from '@/lib/placeholder-products'
import { Product, WingLevel } from '@/types'

const FILTERS = [
  { value: 'all', label: 'All Wings' },
  { value: 'classic', label: 'Classic' },
  { value: 'lightweight', label: 'Lightweight' },
  { value: 'competition', label: 'Competition' },
  { value: 'miniwing', label: 'Miniwings' },
  { value: 'tandem', label: 'Tandem' },
]

const LEVEL_LABELS: Record<WingLevel, string> = {
  A: 'EN-A (Beginner)',
  B: 'EN-B (Intermediate)',
  C: 'EN-C (Advanced)',
  D: 'EN-D (Expert)',
}

const SECTION_DESCRIPTIONS: Record<string, string> = {
  classic: 'The core Skywalk range — from student pilots to serious XC flyers. Robust, capable, and refined over many generations.',
  lightweight: 'Ultralight construction for pilots who earn their launches on foot. No performance compromise, just less weight.',
  competition: 'Built for the Red Bull X-Alps and PWC. For elite pilots who demand the absolute maximum.',
  miniwing: 'Small wings, big fun. Speed riding, strong wind flying, and hike & fly at its most minimal.',
  tandem: 'Professional tandem wings for licensed tandem pilots and commercial operators.',
}

function WingCard({ product }: { product: Product }) {
  const heroImage = product.images?.[0] ?? null
  return (
    <Link href={`/wings/${product.slug}`} className="card group block overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-night)' }}>
        {heroImage ? (
          <Image src={heroImage} alt={product.name} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="white">
              <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2 z-10 flex-wrap">
          <span className={`badge-${product.wing_level}`}>EN-{product.wing_level}</span>
          {product.is_lightweight && (
            <span className="badge text-xs" style={{ backgroundColor: 'rgba(26,58,92,0.85)', color: 'var(--color-thermal)', border: '1px solid rgba(107,163,214,0.3)' }}>
              Lightweight
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--color-blue)' }}>
          {LEVEL_LABELS[product.wing_level]}
        </p>
        <h3 className="font-medium text-lg mb-2 group-hover:text-brand-blue transition-colors"
          style={{ color: 'var(--color-night)' }}>
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: 'var(--text-muted-light)' }}>
          {product.description}
        </p>
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted-light)' }}>
          {product.specs.cells && <span>{product.specs.cells} cells</span>}
          {product.specs.aspect_ratio && <span>AR {product.specs.aspect_ratio}</span>}
          <span>{product.weight_ranges.length} sizes</span>
        </div>
      </div>
    </Link>
  )
}

function Section({ title, description, wings, show }: {
  title: string
  description: string
  wings: Product[]
  show: boolean
}) {
  if (!show || wings.length === 0) return null
  return (
    <div className="mb-20">
      <div className="mb-8">
        <h2 className="display-sm mb-2" style={{ color: 'var(--color-night)' }}>{title}</h2>
        <p className="text-sm max-w-xl" style={{ color: 'var(--text-muted-light)' }}>{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wings.map((w) => <WingCard key={w.id} product={w} />)}
      </div>
    </div>
  )
}

export default function WingsPage() {
  const [active, setActive] = useState('all')

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <p className="eyebrow-dark mb-4">Skywalk Paragliders</p>
          <h1 className="display-lg mb-4" style={{ color: 'white' }}>Skywalk Wings</h1>
          <p className="text-lg font-light max-w-lg" style={{ color: 'var(--color-thermal)' }}>
            The complete Skywalk Paragliders line-up — available in South Africa through Paraura, official importer &amp; distributor.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 border-b py-4"
        style={{ backgroundColor: 'rgba(240,239,237,0.97)', backdropFilter: 'blur(12px)', borderColor: 'rgba(0,0,0,0.07)' }}>
        <div className="section">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs tracking-widest uppercase shrink-0 mr-2" style={{ color: 'var(--text-muted-light)' }}>
              Category:
            </span>
            {FILTERS.map((f) => (
              <button key={f.value} onClick={() => setActive(f.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? 'text-white'
                    : 'border hover:text-brand-blue'
                }`}
                style={{
                  backgroundColor: active === f.value ? 'var(--color-blue)' : 'transparent',
                  borderColor: active === f.value ? 'var(--color-blue)' : 'rgba(0,0,0,0.12)',
                  color: active === f.value ? 'white' : 'var(--color-carbon)',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="py-16 lg:py-20">
        <div className="section">
          <Section title="Classic Wings" description={SECTION_DESCRIPTIONS.classic}
            wings={classicWings} show={active === 'all' || active === 'classic'} />
          <Section title="Lightweight Wings" description={SECTION_DESCRIPTIONS.lightweight}
            wings={lightweightWings} show={active === 'all' || active === 'lightweight'} />
          <Section title="Competition" description={SECTION_DESCRIPTIONS.competition}
            wings={competitionWings} show={active === 'all' || active === 'competition'} />
          <Section title="Miniwings" description={SECTION_DESCRIPTIONS.miniwing}
            wings={miniwings} show={active === 'all' || active === 'miniwing'} />
          <Section title="Tandem Wings" description={SECTION_DESCRIPTIONS.tandem}
            wings={tandemWings} show={active === 'all' || active === 'tandem'} />
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 border-t" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
        <div className="section text-center">
          <p className="mb-4" style={{ color: 'var(--text-muted-light)' }}>
            Not sure which Skywalk wing is right for you?
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/selector" className="btn-primary">Use the Wing Selector</Link>
            <Link href="/advice" className="btn-secondary">Ask Paraura directly</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
