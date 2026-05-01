import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { harnesses } from '@/lib/placeholder-products'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return harnesses.map((h) => ({ slug: h.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const harness = harnesses.find((h) => h.slug === params.slug)
  if (!harness) return {}
  return {
    title: `${harness.name} — Skywalk Harness`,
    description: harness.description,
  }
}

const TYPE_LABELS: Record<string, string> = {
  classic: 'Classic Harness',
  lightweight: 'Lightweight Harness',
  competition: 'Competition Harness',
  tandem: 'Tandem Harness',
}

export default function HarnessPage({ params }: Props) {
  const harness = harnesses.find((h) => h.slug === params.slug)
  if (!harness) notFound()

  const related = harnesses
    .filter((h) => h.slug !== harness.slug && h.type === harness.type)
    .slice(0, 2)

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section max-w-3xl">
          <div className="flex items-center gap-2 text-sm mb-8"
            style={{ color: 'var(--color-thermal)' }}>
            <Link href="/harnesses" className="hover:text-white transition-colors">Harnesses</Link>
            <span>/</span>
            <span style={{ color: 'rgba(240,239,237,0.6)' }}>{TYPE_LABELS[harness.type]}</span>
          </div>
          <p className="eyebrow-dark mb-4">{TYPE_LABELS[harness.type]}</p>
          <h1 className="display-lg mb-6" style={{ color: 'white' }}>{harness.name}</h1>
          <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--color-thermal)' }}>
            {harness.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 lg:py-20">
        <div className="section max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card p-6">
              <p className="eyebrow mb-4">Get Pricing</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted-light)' }}>
                Contact us for current pricing in ZAR. Harness pricing depends on size and optional extras. We&apos;ll match you to the right configuration for your setup.
              </p>
              <Link href="/advice" className="btn-primary text-sm">Request Pricing</Link>
            </div>
            <div className="card p-6">
              <p className="eyebrow mb-4">Full Specifications</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted-light)' }}>
                Complete technical specifications, weight data, and compatibility details are available on the Skywalk website.
              </p>
              {harness.skywalk_url && (
                <a href={harness.skywalk_url} target="_blank" rel="noopener noreferrer"
                  className="btn-secondary text-sm">
                  View on skywalk.info ↗
                </a>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div>
              <p className="eyebrow mb-6">Also in this range</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((h) => (
                  <Link key={h.id} href={`/harnesses/${h.slug}`}
                    className="card group p-5 block">
                    <p className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: 'var(--color-blue)' }}>
                      {TYPE_LABELS[h.type]}
                    </p>
                    <h3 className="font-medium mb-2 group-hover:text-brand-blue transition-colors"
                      style={{ color: 'var(--color-night)' }}>
                      {h.name}
                    </h3>
                    <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted-light)' }}>
                      {h.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Get the right setup</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Wing + harness<br />
            <em style={{ color: 'var(--color-thermal)' }}>as a package.</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            Tell us your wing, your flying goals, and how you get to the launch. We&apos;ll recommend the right harness to complete your setup.
          </p>
          <Link href="/advice" className="btn-primary text-base px-8 py-4">Get Advice</Link>
        </div>
      </section>
    </div>
  )
}
