'use client'

import { useState } from 'react'
import Link from 'next/link'
import { placeholderProducts } from '@/lib/placeholder-products'
import { WingLevel } from '@/types'

const LEVELS: { value: WingLevel | 'all'; label: string }[] = [
  { value: 'all', label: 'All Levels' },
  { value: 'A', label: 'EN-A' },
  { value: 'B', label: 'EN-B' },
  { value: 'C', label: 'EN-C' },
  { value: 'D', label: 'EN-D' },
]

const LEVEL_LABELS: Record<WingLevel, string> = {
  A: 'EN-A (Beginner)',
  B: 'EN-B (Intermediate)',
  C: 'EN-C (Advanced)',
  D: 'EN-D (Expert / Competition)',
}

export default function WingsPage() {
  const [activeLevel, setActiveLevel] = useState<WingLevel | 'all'>('all')

  const filtered =
    activeLevel === 'all'
      ? placeholderProducts
      : placeholderProducts.filter((p) => p.wing_level === activeLevel)

  return (
    <>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="section">
          <p className="eyebrow mb-4">Skywalk Range</p>
          <h1 className="display-lg text-white mb-4">All Wings</h1>
          <p className="text-stone-400 text-lg font-light max-w-md">
            The complete Skywalk line-up, available in South Africa through Paraura.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-t border-b border-white/5 py-4 sticky top-16 lg:top-20 bg-stone-950/95 backdrop-blur-md z-30">
        <div className="section">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            <span className="text-stone-500 text-xs uppercase tracking-widest shrink-0 mr-2">Level:</span>
            {LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => setActiveLevel(level.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeLevel === level.value
                    ? 'bg-white text-stone-950'
                    : 'text-stone-400 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="py-16 lg:py-20">
        <div className="section">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-500">
              No wings found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/wings/${product.slug}`}
                  className="card group block"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-stone-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
                      </svg>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`badge-${product.wing_level}`}>
                        EN-{product.wing_level}
                      </span>
                      {product.is_lightweight && (
                        <span className="badge bg-stone-800 text-stone-300 border border-stone-700">
                          Lightweight
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-stone-500 text-xs tracking-widest uppercase mb-1">
                      {LEVEL_LABELS[product.wing_level]}
                    </p>
                    <h2 className="text-white font-medium text-lg mb-2 group-hover:text-sky-300 transition-colors">
                      {product.name}
                    </h2>
                    <p className="text-stone-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-stone-500">
                      <span>{product.weight_ranges.length} sizes</span>
                      {product.specs.cells && <span>{product.specs.cells} cells</span>}
                      {product.specs.glide_ratio && <span>Glide {product.specs.glide_ratio}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Advice CTA */}
      <div className="border-t border-white/5 py-16">
        <div className="section text-center">
          <p className="text-stone-400 mb-4">Not sure which wing is right for you?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/selector" className="btn-primary">
              Use the Wing Selector
            </Link>
            <Link href="/advice" className="btn-secondary">
              Ask Paraura directly
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
