import type { Metadata } from 'next'
import Link from 'next/link'
import { accessories } from '@/lib/placeholder-products'

export const metadata: Metadata = {
  title: 'Skywalk Accessories — Paraura South Africa',
  description:
    'Skywalk paragliding accessories — bags, packs, and gear for pilots. Available in South Africa through Paraura.',
}

export default function AccessoriesPage() {
  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <p className="eyebrow-dark mb-4">Skywalk Equipment</p>
          <h1 className="display-lg mb-4" style={{ color: 'white' }}>Accessories</h1>
          <p className="text-lg font-light max-w-lg" style={{ color: 'var(--color-thermal)' }}>
            Bags, backpacks, and gear to complete your Skywalk setup. Sold alongside wing orders — contact us for current pricing and availability.
          </p>
        </div>
      </div>

      {/* Accessories grid */}
      <div className="py-16 lg:py-20">
        <div className="section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {accessories.map((item) => (
              <div key={item.id} className="card p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(43,108,176,0.08)', border: '1px solid rgba(43,108,176,0.12)' }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"
                    style={{ color: 'var(--color-blue)' }}>
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                      stroke="currentColor" strokeWidth={1.5} />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
                      stroke="currentColor" strokeWidth={1.5} />
                  </svg>
                </div>
                <h3 className="font-medium mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)', fontSize: '1.05rem' }}>
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed mb-5"
                  style={{ color: 'var(--text-muted-light)' }}>
                  {item.description}
                </p>
                {item.skywalk_url && (
                  <a href={item.skywalk_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs transition-colors"
                    style={{ color: 'var(--color-blue)' }}>
                    View on skywalk.info ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* More accessories note */}
          <div className="rounded-2xl p-8 max-w-2xl"
            style={{ backgroundColor: 'var(--surface-light-card)', border: '1px solid rgba(0,0,0,0.07)' }}>
            <p className="eyebrow mb-3">More available</p>
            <h3 className="display-sm mb-4" style={{ color: 'var(--color-night)' }}>
              Not seeing what you need?
            </h3>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--color-carbon)' }}>
              We carry a broader range of Skywalk accessories including the DROP variometer mount, ULTRA backpack, FLASHBAG deployment bag, and more. Accessories are typically sold alongside wing or harness orders.
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted-light)' }}>
              Get in touch with what you&apos;re looking for and we&apos;ll confirm availability and pricing.
            </p>
            <Link href="/advice" className="btn-primary">Contact Paraura</Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Complete your setup</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Everything you need<br />
            <em style={{ color: 'var(--color-thermal)' }}>in one order.</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            Wing, harness, reserve, and accessories — we can put together a complete package. Get in touch and tell us what you&apos;re building toward.
          </p>
          <Link href="/advice" className="btn-primary text-base px-8 py-4">Get in Touch</Link>
        </div>
      </section>
    </div>
  )
}
