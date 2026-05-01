import type { Metadata } from 'next'
import Link from 'next/link'
import { harnesses } from '@/lib/placeholder-products'

export const metadata: Metadata = {
  title: 'Skywalk Harnesses — Paraura South Africa',
  description:
    'The complete Skywalk harness range — from everyday XC harnesses to ultralight hike & fly systems and competition pods. Available in South Africa through Paraura.',
}

const TYPE_LABELS: Record<string, string> = {
  classic: 'Classic',
  lightweight: 'Lightweight',
  competition: 'Competition',
  tandem: 'Tandem',
}

const TYPE_DESCRIPTIONS: Record<string, string> = {
  classic: 'Comfort-focused harnesses for everyday XC flying. Airbag protection, generous storage, suitable for all pilot levels.',
  lightweight: 'Compact and packable for hike & fly. Minimal weight without compromising protection.',
  competition: 'Pod harnesses for maximum aerodynamics. Built for X-Alps and PWC-level performance.',
  tandem: 'Purpose-built for professional tandem operations — pilot and passenger.',
}

export default function HarnessesPage() {
  const grouped = harnesses.reduce((acc, h) => {
    if (!acc[h.type]) acc[h.type] = []
    acc[h.type].push(h)
    return acc
  }, {} as Record<string, typeof harnesses>)

  const order = ['classic', 'lightweight', 'competition', 'tandem']

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <p className="eyebrow-dark mb-4">Skywalk Equipment</p>
          <h1 className="display-lg mb-4" style={{ color: 'white' }}>Harnesses</h1>
          <p className="text-lg font-light max-w-lg" style={{ color: 'var(--color-thermal)' }}>
            From comfortable everyday XC systems to ultralight competition pods — the right harness is as important as the right wing.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="py-16 lg:py-20">
        <div className="section">
          {order.filter(t => grouped[t]?.length).map((type) => (
            <div key={type} className="mb-20">
              <div className="mb-8">
                <h2 className="display-sm mb-2" style={{ color: 'var(--color-night)' }}>
                  {TYPE_LABELS[type]}
                </h2>
                <p className="text-sm max-w-xl" style={{ color: 'var(--text-muted-light)' }}>
                  {TYPE_DESCRIPTIONS[type]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[type].map((harness) => (
                  <Link key={harness.id} href={`/harnesses/${harness.slug}`}
                    className="card group block p-6">
                    {/* Icon placeholder */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: 'rgba(43,108,176,0.08)', border: '1px solid rgba(43,108,176,0.12)' }}>
                      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"
                        style={{ color: 'var(--color-blue)' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                          fill="currentColor" opacity={0.3} />
                        <path d="M16 6H8a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1zm-1 9H9v-1h6v1zm0-3H9v-1h6v1zm0-3H9V8h6v1z"
                          fill="currentColor" />
                      </svg>
                    </div>

                    <span className="text-xs tracking-widest uppercase font-medium mb-2 block"
                      style={{ color: 'var(--color-blue)' }}>
                      {TYPE_LABELS[harness.type]}
                    </span>
                    <h3 className="font-medium text-lg mb-3 group-hover:text-brand-blue transition-colors"
                      style={{ color: 'var(--color-night)', fontFamily: 'var(--font-display)' }}>
                      {harness.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5"
                      style={{ color: 'var(--text-muted-light)' }}>
                      {harness.description}
                    </p>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-blue)' }}>
                      View details →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Need advice?</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Harness &amp; wing<br />
            <em style={{ color: 'var(--color-thermal)' }}>together.</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            The right harness depends on your wing, your flying style, and how you get to the launch. Get in touch and we&apos;ll put together the right combination.
          </p>
          <Link href="/advice" className="btn-primary text-base px-8 py-4">Get Advice</Link>
        </div>
      </section>
    </div>
  )
}
