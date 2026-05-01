import type { Metadata } from 'next'
import Link from 'next/link'
import { reserves } from '@/lib/placeholder-products'

export const metadata: Metadata = {
  title: 'Skywalk Rescue Parachutes — Paraura South Africa',
  description:
    'Skywalk reserve parachutes for paragliding — from everyday XC reserves to ultralight hike & fly options. Available in South Africa through Paraura.',
}

export default function ReservesPage() {
  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <p className="eyebrow-dark mb-4">Skywalk Equipment</p>
          <h1 className="display-lg mb-4" style={{ color: 'white' }}>Reserve Parachutes</h1>
          <p className="text-lg font-light max-w-lg" style={{ color: 'var(--color-thermal)' }}>
            Your reserve is the last line of defence. Skywalk&apos;s reserve range covers everyday XC pilots through to ultralight hike &amp; fly setups.
          </p>
        </div>
      </div>

      {/* Safety note */}
      <div style={{ backgroundColor: 'rgba(43,108,176,0.06)', borderBottom: '1px solid rgba(43,108,176,0.1)' }}>
        <div className="section py-5">
          <p className="text-sm" style={{ color: 'var(--color-blue)' }}>
            <strong>Important:</strong> Reserve parachutes must be correctly sized for your all-up weight, packed by a qualified rigger, and repacked every 6–12 months. Get in touch and we&apos;ll help you choose the right reserve and connect you with a qualified rigger in South Africa.
          </p>
        </div>
      </div>

      {/* Reserves grid */}
      <div className="py-16 lg:py-20">
        <div className="section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reserves.map((reserve) => (
              <div key={reserve.id} className="card p-6">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(43,108,176,0.08)', border: '1px solid rgba(43,108,176,0.12)' }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"
                    style={{ color: 'var(--color-blue)' }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor" opacity={0.5} />
                  </svg>
                </div>

                <h3 className="font-medium text-lg mb-3"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
                  {reserve.name}
                </h3>
                <p className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted-light)' }}>
                  {reserve.description}
                </p>

                <div className="flex flex-col gap-3">
                  <Link href="/advice"
                    className="btn-primary text-sm text-center">
                    Request Pricing
                  </Link>
                  {reserve.skywalk_url && (
                    <a href={reserve.skywalk_url} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-center transition-colors"
                      style={{ color: 'var(--color-blue)' }}>
                      View on skywalk.info ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Repack reminder */}
      <section className="py-16" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Reserve Repacking</p>
            <h2 className="display-sm mb-4" style={{ color: 'var(--color-night)' }}>
              When did you last repack yours?
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--color-carbon)' }}>
              SAHPA and most international standards recommend repacking your reserve every 6–12 months, even if it hasn&apos;t been deployed. Moisture, compression set, and UV exposure all affect your reserve&apos;s deployment reliability over time.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted-light)' }}>
              If you&apos;re not sure when your reserve was last packed, or if you need a referral to a qualified rigger in South Africa, get in touch. This is not something to leave to chance.
            </p>
            <Link href="/advice?source=reserve-repack" className="btn-primary">
              Get a Rigger Referral
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Full setup advice</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Wing, harness<br />
            <em style={{ color: 'var(--color-thermal)' }}>&amp; reserve together.</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            Tell us your all-up weight and flying goals. We&apos;ll recommend a complete setup — wing, harness, and the right reserve.
          </p>
          <Link href="/advice" className="btn-primary text-base px-8 py-4">Get Advice</Link>
        </div>
      </section>
    </div>
  )
}
