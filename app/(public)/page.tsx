import type { Metadata } from 'next'
import Link from 'next/link'
import { placeholderProducts } from '@/lib/placeholder-products'

export const metadata: Metadata = {
  title: 'Paraura — Skywalk Paragliders South Africa',
  description:
    'South Africa\'s official Skywalk paraglider specialist. Expert guidance, premium wings, tandem flights and trusted advice.',
}

export default function HomePage() {
  const featured = placeholderProducts.slice(0, 3)

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-slate-900 to-stone-950" />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-800/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
          <div
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)' }}
          />
        </div>

        <div className="section relative z-20 w-full">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">South Africa&apos;s Skywalk Specialist</p>
            <h1 className="display-xl text-white mb-8">
              Find Your<br />
              <em className="text-sky-300">Perfect Wing.</em>
            </h1>
            <p className="text-stone-300 text-lg font-light max-w-md mb-10 leading-relaxed">
              Expert guidance for pilots at every level. From your first tandem flight to your competition weapon.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wings" className="btn-primary">Explore Wings</Link>
              <Link href="/selector" className="btn-secondary">Find Your Wing</Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <div className="w-px h-8 bg-white" />
        </div>
      </section>

      {/* ── 2. TRUST ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-6">Why Paraura</p>
              <h2 className="display-lg text-white mb-6">
                Not a store.<br />
                <em className="text-stone-400">An advisor.</em>
              </h2>
              <p className="text-stone-300 text-lg font-light leading-relaxed mb-6">
                Paraura is South Africa&apos;s only dedicated Skywalk specialist. We don&apos;t stock hundreds of brands — we know one brand deeply, and we know how to match pilots to the right wing.
              </p>
              <p className="text-stone-400 leading-relaxed">
                Every recommendation is built on real flying knowledge, honest assessment of your goals, and a genuine interest in keeping you safe and progressing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Official', detail: 'Skywalk distributor for South Africa' },
                { label: 'Expert', detail: 'Pilot-to-pilot advice, not sales scripts' },
                { label: 'Personalised', detail: 'Matched to your weight, level, and goals' },
                { label: 'Trusted', detail: 'Long-term relationships over one-off sales' },
              ].map((item) => (
                <div key={item.label} className="card p-5">
                  <p className="text-sky-400 text-xs tracking-widest uppercase font-medium mb-2">{item.label}</p>
                  <p className="text-stone-300 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED WINGS ────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="section">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Skywalk Range</p>
              <h2 className="display-md text-white">Featured Wings</h2>
            </div>
            <Link href="/wings" className="btn-ghost hidden sm:inline-flex">View all →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <Link key={product.id} href={`/wings/${product.slug}`} className="card group block">
                <div className="aspect-[4/3] bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-stone-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
                    </svg>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`badge-${product.wing_level}`}>EN-{product.wing_level}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-medium mb-1 group-hover:text-sky-300 transition-colors">{product.name}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/wings" className="btn-secondary w-full text-center">View all wings</Link>
          </div>
        </div>
      </section>

      {/* ── 4. WING SELECTOR ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5 bg-stone-900/30">
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-6">Wing Selector</p>
            <h2 className="display-lg text-white mb-6">
              Not sure which<br />
              <em className="text-sky-300">wing is right?</em>
            </h2>
            <p className="text-stone-300 text-lg font-light leading-relaxed mb-10">
              Answer five quick questions about your weight, experience, and goals. Our selector will match you to the right Skywalk wing — and explain why.
            </p>
            <Link href="/selector" className="btn-primary text-base px-8 py-4">Find Your Wing</Link>
            <p className="text-stone-600 text-sm mt-4">Takes about 2 minutes</p>
          </div>
        </div>
      </section>

      {/* ── 5. FLY WITH PARAURA ──────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Experiences</p>
              <h2 className="display-lg text-white mb-6">
                Want to fly<br />
                <em className="text-sky-300">before you buy?</em>
              </h2>
              <p className="text-stone-300 text-lg font-light leading-relaxed mb-6">
                We can connect you with tandem flights across South Africa — Cape Town, Johannesburg, and the Wilderness. Or if you want to learn to fly solo, we&apos;ll point you to the right school.
              </p>
              <p className="text-stone-400 leading-relaxed mb-8">
                Our partner pilots are SAHPA certified, personally known to us, and chosen for the quality of the experience they deliver.
              </p>
              <Link href="/fly" className="btn-primary">Explore Experiences</Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: '🪂',
                  title: 'Tandem Flights',
                  desc: 'No experience needed. Fly with a certified pilot above Cape Town, JHB or the Wilderness.',
                },
                {
                  icon: '🎓',
                  title: 'Learn to Fly',
                  desc: 'We\'ll connect you with a trusted flight school and help you choose your first wing when you graduate.',
                },
                {
                  icon: '📍',
                  title: 'Flying Locations',
                  desc: 'Cape Town · Johannesburg · Wilderness — each site with its own unique character and conditions.',
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex gap-4 items-start">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-white font-medium mb-1">{item.title}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CONTENT / SEO ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="section">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Flying in South Africa</p>
              <h2 className="display-md text-white">Know the Sky</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Where to Fly in South Africa', tag: 'Guide', desc: 'From the Cape Peninsula to the Drakensberg — the best paragliding sites and what to expect.' },
              { title: 'Understanding EN Ratings', tag: 'Education', desc: 'What EN-A, B, C, D actually mean — and why the right certification matters more than you think.' },
              { title: 'Choosing Your First Wing', tag: 'Beginner', desc: 'A guide for student pilots ready to buy their first glider after graduating from school equipment.' },
            ].map((article) => (
              <div key={article.title} className="card p-6">
                <span className="eyebrow mb-4 block">{article.tag}</span>
                <h3 className="text-white font-light text-lg mb-3 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                  {article.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{article.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ADVICE CTA ────────────────────────────────────── */}
      <section className="py-24 lg:py-32 border-t border-white/5">
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-6">Paraura Advisory</p>
            <h2 className="display-lg text-white mb-6">
              Still unsure?<br />
              <em className="text-stone-400">Let&apos;s talk.</em>
            </h2>
            <p className="text-stone-300 text-lg font-light leading-relaxed mb-10">
              The selector is a starting point. For a real conversation about your flying goals, get in touch — we respond personally, via email or WhatsApp.
            </p>
            <Link href="/advice" className="btn-primary text-base px-8 py-4">Get Expert Advice</Link>
          </div>
        </div>
      </section>
    </>
  )
}
