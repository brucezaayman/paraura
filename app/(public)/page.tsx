import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { placeholderProducts } from '@/lib/placeholder-products'

export const metadata: Metadata = {
  title: 'Paraura — Skywalk Paragliders South Africa',
  description:
    "South Africa's official Skywalk Paragliders importer and distributor. Expert guidance, premium wings, tandem flights and trusted advice.",
}

export default function HomePage() {
  const featured = placeholderProducts.slice(0, 3)

  return (
    <>
      {/* ── 1. HERO — night sky, full height ─────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{
          minHeight: '90vh',
          paddingBottom: '5rem',
          backgroundColor: 'var(--color-night)',
        }}
      >
        {/* Atmospheric gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 65% 30%, rgba(43,108,176,0.35) 0%, transparent 60%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--color-night), transparent)' }} />

        {/* Hero image — when supplied, sits behind gradient */}
        {/* Drop hero-bg.jpg into public/images/ to activate */}

        <div className="section relative z-10 w-full">
          <div className="max-w-2xl">
            <p className="eyebrow-dark mb-5">South Africa&apos;s Skywalk Specialist</p>
            <h1 className="display-xl mb-6" style={{ color: 'white' }}>
              Find your perfect<br />
              <em style={{ color: 'var(--color-thermal)' }}>Skywalk Paragliders wing.</em>
            </h1>
            <p className="text-lg font-light max-w-md mb-10 leading-relaxed" style={{ color: 'rgba(240,239,237,0.75)' }}>
              Expert guidance for pilots at every level. From your first tandem flight to your competition weapon.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/wings" className="btn-primary">Explore Skywalk Wings</Link>
              <Link href="/selector" className="btn-secondary-dark">Find Your Wing</Link>
            </div>
            <div className="mt-8">
              <a href="https://www.skywalk.info" target="_blank" rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase transition-colors"
                style={{ color: 'rgba(107,163,214,0.6)' }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--color-thermal)')}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'rgba(107,163,214,0.6)')}>
                Official Skywalk Importer &amp; Distributor — South Africa ↗
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-30">
          <div className="w-px h-8" style={{ backgroundColor: 'white' }} />
        </div>
      </section>

      {/* ── 2. TRUST — light section ─────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-5">Why Paraura</p>
              <h2 className="display-lg mb-6" style={{ color: 'var(--color-night)' }}>
                Not a store.<br />
                <em style={{ color: 'var(--color-blue)' }}>An advisor.</em>
              </h2>
              <p className="text-lg font-light leading-relaxed mb-5" style={{ color: 'var(--color-carbon)' }}>
                Paraura is South Africa&apos;s official Skywalk Paragliders importer and distributor. We don&apos;t stock hundreds of brands — we know one brand deeply, and we know how to match pilots to the right wing.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted-light)' }}>
                Every recommendation is built on real flying knowledge, honest assessment of your goals, and a genuine interest in keeping you safe and progressing.
              </p>

              {/* Skywalk official badge */}
              <a href="https://www.skywalk.info" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl transition-all hover:shadow-md"
                style={{ border: '1.5px solid rgba(43,108,176,0.25)', backgroundColor: 'rgba(43,108,176,0.04)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" style={{ color: 'var(--color-blue)' }}>
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--color-blue)' }}>
                    Official Skywalk Paragliders
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-night)' }}>
                    Importer &amp; Distributor — South Africa
                  </p>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Official', detail: 'Skywalk Paragliders importer & distributor for South Africa' },
                { label: 'Expert', detail: 'Pilot-to-pilot advice, not sales scripts' },
                { label: 'Personalised', detail: 'Matched to your weight, level, and goals' },
                { label: 'Trusted', detail: 'Long-term relationships over one-off sales' },
              ].map((item) => (
                <div key={item.label} className="card p-5">
                  <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: 'var(--color-blue)' }}>
                    {item.label}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-carbon)' }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED WINGS — alt light ────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Skywalk Paragliders</p>
              <h2 className="display-md" style={{ color: 'var(--color-night)' }}>Featured Wings</h2>
            </div>
            <Link href="/wings" className="btn-ghost hidden sm:inline-flex">View all →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <Link key={product.id} href={`/wings/${product.slug}`} className="card group block overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden"
                  style={{ backgroundColor: 'var(--color-night)' }}>
                  {product.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <svg className="w-16 h-16" viewBox="0 0 24 24" fill="white">
                        <path d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`badge-${product.wing_level}`}>EN-{product.wing_level}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-medium mb-1 group-hover:text-brand-blue transition-colors"
                    style={{ color: 'var(--color-night)' }}>
                    {product.name}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted-light)' }}>
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/wings" className="btn-secondary w-full text-center">View all Skywalk wings</Link>
          </div>
        </div>
      </section>

      {/* ── 4. WING SELECTOR — night blue ────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow-dark mb-5">Wing Selector</p>
            <h2 className="display-lg mb-6" style={{ color: 'white' }}>
              Not sure which<br />
              <em style={{ color: 'var(--color-thermal)' }}>Skywalk wing is right?</em>
            </h2>
            <p className="text-lg font-light leading-relaxed mb-10" style={{ color: 'rgba(240,239,237,0.7)' }}>
              Answer five quick questions about your weight, experience, and goals. Our selector will match you to the right Skywalk Paragliders wing — and explain why.
            </p>
            <Link href="/selector" className="btn-primary text-base px-8 py-4">Find Your Wing</Link>
            <p className="text-sm mt-4" style={{ color: 'rgba(107,163,214,0.5)' }}>Takes about 2 minutes</p>
          </div>
        </div>
      </section>

      {/* ── 5. FLY WITH PARAURA — light ──────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Experiences</p>
              <h2 className="display-lg mb-6" style={{ color: 'var(--color-night)' }}>
                Want to fly<br />
                <em style={{ color: 'var(--color-blue)' }}>before you buy?</em>
              </h2>
              <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'var(--color-carbon)' }}>
                We can connect you with tandem flights across South Africa — Cape Town, Johannesburg, and the Garden Route. Or if you want to learn to fly solo, we&apos;ll point you to the right school.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted-light)' }}>
                Our partner pilots are SAHPA certified, personally known to us, and chosen for the quality of the experience they deliver.
              </p>
              <Link href="/fly" className="btn-primary">Explore Experiences</Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: '🪂', title: 'Tandem Flights', desc: 'No experience needed. Fly with a certified pilot above Cape Town, JHB or the Garden Route.' },
                { icon: '🎓', title: 'Learn to Fly', desc: "We'll connect you with a trusted flight school and help you choose your first Skywalk wing when you graduate." },
                { icon: '📍', title: 'Flying Locations', desc: 'Cape Town · Johannesburg · Garden Route — each with its own unique character and conditions.' },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex gap-4 items-start">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-medium mb-1" style={{ color: 'var(--color-night)' }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted-light)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INSIGHTS — alt light ──────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Flying in South Africa</p>
              <h2 className="display-md" style={{ color: 'var(--color-night)' }}>Insights</h2>
            </div>
            <Link href="/insights" className="btn-ghost hidden sm:inline-flex">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Where to Fly in South Africa', tag: 'Guide', desc: 'From the Cape Peninsula to the Drakensberg — the best paragliding sites and what to expect.' },
              { title: 'Understanding EN Ratings', tag: 'Education', desc: 'What EN-A, B, C, D actually mean — and why the right certification matters more than you think.' },
              { title: 'Choosing Your First Skywalk Wing', tag: 'Beginner', desc: 'A guide for student pilots ready to buy their first Skywalk Paragliders wing after graduating from school equipment.' },
            ].map((article) => (
              <div key={article.title} className="card p-6">
                <span className="text-xs tracking-widest uppercase font-medium mb-4 block" style={{ color: 'var(--color-blue)' }}>
                  {article.tag}
                </span>
                <h3 className="font-light text-lg mb-3 leading-snug" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted-light)' }}>{article.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ADVICE CTA — night blue ───────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow-dark mb-5">Paraura Advisory</p>
            <h2 className="display-lg mb-6" style={{ color: 'white' }}>
              Still unsure?<br />
              <em style={{ color: 'var(--color-thermal)' }}>Let&apos;s talk.</em>
            </h2>
            <p className="text-lg font-light leading-relaxed mb-10" style={{ color: 'rgba(240,239,237,0.7)' }}>
              The selector is a starting point. For a real conversation about your flying goals, get in touch — we respond personally, via email or WhatsApp.
            </p>
            <Link href="/advice" className="btn-primary text-base px-8 py-4">Get Expert Advice</Link>
          </div>
        </div>
      </section>
    </>
  )
}
