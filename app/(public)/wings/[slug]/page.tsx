import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { placeholderProducts } from '@/lib/placeholder-products'
import { WingLevel } from '@/types'

const LEVEL_LABELS: Record<WingLevel, string> = {
  A: 'EN-A — Beginner / Student',
  B: 'EN-B — Intermediate',
  C: 'EN-C — Advanced',
  D: 'EN-D — Expert / Competition',
}

const LEVEL_DESCRIPTIONS: Record<WingLevel, string> = {
  A: 'Ideal for student pilots and those in their first 1–2 years of flying. Maximum passive safety, easy handling.',
  B: 'The largest class in paragliding — covers everything from post-school pilots to serious XC flyers.',
  C: 'For experienced, regular pilots comfortable with active flying. Serious performance.',
  D: 'Competition-level performance. Requires expert pilot skill, SIV training, and significant airtime.',
}

const GOAL_LABELS: Record<string, string> = {
  leisure: 'Leisure & soaring',
  xc: 'Cross-country (XC)',
  competition: 'Competition',
  'hike-and-fly': 'Hike & fly',
  tandem: 'Tandem',
}

const CONDITIONS_LABELS: Record<string, string> = {
  coastal: 'Coastal / smooth',
  'thermal-inland': 'Thermal / inland',
  mixed: 'Mixed conditions',
}

const HIDDEN_SPEC_KEYS = ['flying_goal', 'conditions']

const SPEC_LABELS: Record<string, string> = {
  certification: 'Certification',
  cells: 'Number of cells',
  flat_area: 'Flat area',
  aspect_ratio: 'Flat aspect ratio',
  glide_ratio: 'Best glide',
  top_speed: 'Top speed',
  glider_weight: 'Glider weight',
  technology: 'Key technologies',
}

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return placeholderProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = placeholderProducts.find((p) => p.slug === params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Skywalk Paraglider`,
    description: product.description.slice(0, 155),
  }
}

export default function ProductPage({ params }: Props) {
  const product = placeholderProducts.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const heroImage = product.images?.[0] ?? null
  const goals = product.specs.flying_goal?.split(',').map((g: string) => g.trim()).filter(Boolean) ?? []
  const conditions = product.specs.conditions?.split(',').map((c: string) => c.trim()).filter(Boolean) ?? []

  const related = placeholderProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 2)

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="pt-24 lg:pt-28" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section pt-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-10" style={{ color: 'var(--text-muted-light)' }}>
            <Link href="/wings" className="transition-colors hover:text-brand-blue">Skywalk Wings</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-carbon)' }}>{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="aspect-square rounded-2xl relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-night)' }}>
              {heroImage ? (
                <Image src={heroImage} alt={product.name} fill
                  className="object-cover" priority
                  sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg className="w-32 h-32" viewBox="0 0 24 24" fill="white">
                    <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                <span className={`badge-${product.wing_level}`}>EN-{product.wing_level}</span>
                {product.is_lightweight && (
                  <span className="badge text-xs" style={{ backgroundColor: 'rgba(26,58,92,0.85)', color: 'var(--color-thermal)', border: '1px solid rgba(107,163,214,0.3)' }}>
                    Lightweight
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <p className="eyebrow mb-2">{LEVEL_LABELS[product.wing_level]}</p>
              <h1 className="display-lg mb-6" style={{ color: 'var(--color-night)' }}>{product.name}</h1>
              <p className="text-lg font-light leading-relaxed mb-8" style={{ color: 'var(--color-carbon)' }}>
                {product.description}
              </p>

              {/* Pilot fit */}
              <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: 'var(--surface-light-card)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <p className="eyebrow mb-3">Who this wing is for</p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted-light)' }}>
                  {LEVEL_DESCRIPTIONS[product.wing_level]}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {goals.map((g: string) => (
                    <span key={g} className="badge text-xs"
                      style={{ backgroundColor: 'rgba(43,108,176,0.08)', color: 'var(--color-blue)', border: '1px solid rgba(43,108,176,0.15)' }}>
                      {GOAL_LABELS[g] ?? g}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c: string) => (
                    <span key={c} className="badge text-xs"
                      style={{ backgroundColor: 'rgba(0,0,0,0.04)', color: 'var(--color-carbon)', border: '1px solid rgba(0,0,0,0.08)' }}>
                      {CONDITIONS_LABELS[c] ?? c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/advice?wing=${product.slug}&name=${encodeURIComponent(product.name)}`}
                  className="btn-primary">
                  Get Advice on This Wing
                </Link>
                <Link href="/selector" className="btn-secondary">Try the Selector</Link>
              </div>

              {product.skywalk_url && (
                <div className="mt-5">
                  <a href={product.skywalk_url} target="_blank" rel="noopener noreferrer"
                    className="text-sm transition-colors hover:opacity-80"
                    style={{ color: 'var(--color-blue)' }}>
                    View full specs on skywalk.info ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── KEY NUMBERS ──────────────────────────────────────── */}
      <section className="py-20 mt-12" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <p className="eyebrow mb-8">At a Glance</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Certification', value: product.specs.certification },
              { label: 'Cells', value: product.specs.cells },
              { label: 'Aspect Ratio', value: product.specs.aspect_ratio },
              { label: 'Top Speed', value: product.specs.top_speed },
            ].filter(s => s.value).map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted-light)' }}>
                  {stat.label}
                </p>
                <p className="text-2xl font-light" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SPECS ───────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">Full Specifications</p>
            <div className="card divide-y" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
              {Object.entries(product.specs)
                .filter(([key]) => !HIDDEN_SPEC_KEYS.includes(key))
                .map(([key, value]) => (
                  <div key={key} className="spec-row px-5">
                    <span className="text-sm" style={{ color: 'var(--text-muted-light)' }}>
                      {SPEC_LABELS[key] ?? key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm text-right max-w-xs" style={{ color: 'var(--color-carbon)' }}>
                      {value as string}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted-light)' }}>
              Specs shown for mid-range size.
              {product.skywalk_url && (
                <> <a href={product.skywalk_url} target="_blank" rel="noopener noreferrer"
                  className="underline underline-offset-2" style={{ color: 'var(--color-blue)' }}>
                  Full technical data on skywalk.info ↗
                </a></>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── SIZING TABLE ─────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Sizing & Weight Range</p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted-light)' }}>
              All-up weight: pilot + harness + reserve + gear.
            </p>
            <div className="card overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-3 border-b"
                style={{ backgroundColor: 'var(--surface-light-card)', borderColor: 'rgba(0,0,0,0.07)' }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted-light)' }}>Size</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted-light)' }}>Min Weight</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted-light)' }}>Max Weight</span>
              </div>
              {product.weight_ranges.map((range, i) => (
                <div key={range.size}
                  className="grid grid-cols-3 px-5 py-4 border-b last:border-0"
                  style={{ borderColor: 'rgba(0,0,0,0.06)', backgroundColor: i % 2 === 0 ? 'white' : 'rgba(0,0,0,0.01)' }}>
                  <span className="font-medium" style={{ color: 'var(--color-night)' }}>{range.size}</span>
                  <span style={{ color: 'var(--color-carbon)' }}>{range.min_weight} kg</span>
                  <span style={{ color: 'var(--color-carbon)' }}>{range.max_weight} kg</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted-light)' }}>
              Not sure which size? Tell us your all-up weight and we&apos;ll advise.
            </p>
          </div>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16" style={{ backgroundColor: 'var(--surface-light)' }}>
          <div className="section">
            <p className="eyebrow mb-6">Also Consider</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              {related.map((p) => (
                <Link key={p.id} href={`/wings/${p.slug}`} className="card group overflow-hidden">
                  {p.images?.[0] && (
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image src={p.images[0]} alt={p.name} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="50vw" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium group-hover:text-brand-blue transition-colors"
                        style={{ color: 'var(--color-night)' }}>{p.name}</h3>
                      <span className={`badge-${p.wing_level}`}>EN-{p.wing_level}</span>
                    </div>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted-light)' }}>
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Ready to Talk?</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Get expert advice<br />
            <em style={{ color: 'var(--color-thermal)' }}>on this wing.</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            Tell us about your experience and goals. We&apos;ll confirm whether the {product.name} is the right choice — or point you to something better suited.
          </p>
          <Link href={`/advice?wing=${product.slug}&name=${encodeURIComponent(product.name)}`}
            className="btn-primary text-base px-8 py-4">
            Get Advice on This Wing
          </Link>
        </div>
      </section>
    </div>
  )
}
