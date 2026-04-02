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
  B: 'The largest class in paragliding — covers everything from post-school pilots to serious XC flyers. Broad range of demands.',
  C: 'For experienced, regular pilots comfortable with active flying and occasional collapses. Serious performance.',
  D: 'Competition-level performance. Requires expert pilot skill, SIV training, and significant airtime.',
}

const GOAL_LABELS: Record<string, string> = {
  leisure: 'Leisure & soaring',
  xc: 'Cross-country (XC)',
  competition: 'Competition',
  'hike-and-fly': 'Hike & fly',
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

interface Props {
  params: { slug: string }
}

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
    .filter((p) => p.slug !== product.slug)
    .filter((p) => Math.abs(['A','B','C','D'].indexOf(p.wing_level) - ['A','B','C','D'].indexOf(product.wing_level)) <= 1)
    .slice(0, 2)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-24 pb-0 relative overflow-hidden">
        <div className="section">
          <div className="flex items-center gap-2 text-stone-500 text-sm mb-10 pt-8">
            <Link href="/wings" className="hover:text-white transition-colors">Skywalk Wings</Link>
            <span>/</span>
            <span className="text-stone-300">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="aspect-square rounded-2xl relative overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-stone-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                <span className={`badge-${product.wing_level}`}>EN-{product.wing_level}</span>
                {product.is_lightweight && (
                  <span className="badge bg-stone-800 text-stone-300 border border-stone-700">Lightweight</span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:pt-4">
              <p className="eyebrow mb-2">{LEVEL_LABELS[product.wing_level]}</p>
              <h1 className="display-lg text-white mb-6">{product.name}</h1>
              <p className="text-stone-300 text-lg font-light leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="bg-stone-900/50 border border-white/5 rounded-xl p-5 mb-8">
                <p className="eyebrow mb-3">Who this wing is for</p>
                <p className="text-stone-400 text-sm mb-4">{LEVEL_DESCRIPTIONS[product.wing_level]}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {goals.map((g: string) => (
                    <span key={g} className="badge bg-sky-950/60 text-sky-400 border border-sky-900">
                      {GOAL_LABELS[g] ?? g}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c: string) => (
                    <span key={c} className="badge bg-stone-800 text-stone-300 border border-stone-700">
                      {CONDITIONS_LABELS[c] ?? c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/advice?wing=${product.slug}&name=${encodeURIComponent(product.name)}`}
                  className="btn-primary"
                >
                  Get Advice on This Wing
                </Link>
                <Link href="/selector" className="btn-secondary">
                  Try the Selector
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS ──────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 mt-20">
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
                <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-white text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL SPECS ───────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">Full Specifications</p>
            <div className="card divide-y divide-white/5">
              {Object.entries(product.specs)
                .filter(([key]) => !HIDDEN_SPEC_KEYS.includes(key))
                .map(([key, value]) => (
                  <div key={key} className="spec-row px-5">
                    <span className="text-stone-400 text-sm">
                      {SPEC_LABELS[key] ?? key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-white text-sm text-right max-w-xs">{value as string}</span>
                  </div>
                ))}
            </div>
            <p className="text-stone-600 text-xs mt-3">Specs shown for mid-range size. Full size table below.</p>
          </div>
        </div>
      </section>

      {/* ── SIZING TABLE ─────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="section">
          <div className="max-w-2xl">
            <p className="eyebrow mb-2">Sizing & Weight Range</p>
            <p className="text-stone-500 text-sm mb-6">
              All-up weight: pilot + harness + reserve parachute + any additional gear.
            </p>
            <div className="card overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-3 border-b border-white/5 bg-stone-900/30">
                <span className="text-stone-400 text-xs uppercase tracking-widest">Size</span>
                <span className="text-stone-400 text-xs uppercase tracking-widest">Min Weight</span>
                <span className="text-stone-400 text-xs uppercase tracking-widest">Max Weight</span>
              </div>
              {product.weight_ranges.map((range, i) => (
                <div
                  key={range.size}
                  className={`grid grid-cols-3 px-5 py-4 border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-stone-900/20'}`}
                >
                  <span className="text-white font-medium">{range.size}</span>
                  <span className="text-stone-300">{range.min_weight} kg</span>
                  <span className="text-stone-300">{range.max_weight} kg</span>
                </div>
              ))}
            </div>
            <p className="text-stone-600 text-xs mt-3">Not sure which size? Tell us your all-up weight and we&apos;ll advise.</p>
          </div>
        </div>
      </section>

      {/* ── RELATED WINGS ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="section">
            <p className="eyebrow mb-6">Also Consider</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              {related.map((p) => (
                <Link key={p.id} href={`/wings/${p.slug}`} className="card group overflow-hidden">
                  {p.images?.[0] && (
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium group-hover:text-sky-300 transition-colors">{p.name}</h3>
                      <span className={`badge-${p.wing_level}`}>EN-{p.wing_level}</span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 bg-stone-900/30">
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow mb-4">Ready to Talk?</p>
          <h2 className="display-md text-white mb-6">
            Get expert advice<br />
            <em className="text-stone-400">on this wing.</em>
          </h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Tell us about your experience and goals. We&apos;ll confirm whether the {product.name} is the right choice — or point you to something better suited.
          </p>
          <Link
            href={`/advice?wing=${product.slug}&name=${encodeURIComponent(product.name)}`}
            className="btn-primary text-base px-8 py-4"
          >
            Get Advice on This Wing
          </Link>
        </div>
      </section>
    </>
  )
}
