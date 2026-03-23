import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fly With Paraura — Tandem Flights & Paragliding South Africa',
  description:
    'Experience paragliding in South Africa. Tandem flights in Cape Town, Johannesburg and the Garden Route. Learn to fly with trusted schools. Expert referrals from Paraura.',
}

const LOCATIONS = [
  {
    name: 'Cape Town',
    slug: 'cape-town',
    tagline: 'Coastal soaring above one of the world\'s most iconic landscapes',
    description:
      'Cape Town offers world-class paragliding conditions with consistent south-easterly winds, dramatic mountain launches, and breathtaking views of the Atlantic Ocean, Table Mountain, and the Cape Peninsula. Signal Hill and Lion\'s Head are legendary sites visited by pilots from around the world.',
    conditions: 'Coastal / sea breeze',
    season: 'Year-round, best Oct–Apr',
    highlights: ['Signal Hill', 'Lion\'s Head', 'Chapman\'s Peak', 'Constantia'],
  },
  {
    name: 'Johannesburg & Gauteng',
    slug: 'johannesburg',
    tagline: 'High-altitude thermal flying on the Highveld plateau',
    description:
      'Flying in Gauteng is a different experience entirely — strong thermals, high altitude (1,700m above sea level), and wide open spaces. The Highveld flying season produces some of South Africa\'s longest XC flights. Ideal for both first-timers and experienced pilots looking to clock serious distance.',
    conditions: 'Thermal / inland',
    season: 'Best Sep–Nov and Feb–Apr',
    highlights: ['Harties', 'Magaliesberg', 'Krugersdorp', 'Heidelberg'],
  },
  {
    name: 'Garden Route',
    slug: 'garden-route',
    tagline: 'Plett, Wilderness, Sedgefield — the Garden Route from above',
    description:
      'The Garden Route stretches from Plettenberg Bay through Wilderness and Sedgefield — one of South Africa\'s most scenic flying destinations. Gentle coastal conditions, forested hills, and launch sites with sweeping views of the Indian Ocean make this a favourite for both tandem experiences and leisure flying. George airport makes it an easy destination to reach from anywhere in the country.',
    conditions: 'Coastal / mixed',
    season: 'Year-round, best Mar–May and Sep–Nov',
    highlights: ['Plettenberg Bay', 'Wilderness', 'Sedgefield', 'Knysna', 'George'],
  },
]

export default function FlyPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-slate-900 to-stone-950" />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-800/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>
        <div className="section relative z-10 w-full">
          <p className="eyebrow mb-4">Experiences</p>
          <h1 className="display-xl text-white mb-6">
            Fly with<br />
            <em className="text-sky-300">Paraura.</em>
          </h1>
          <p className="text-stone-300 text-lg font-light max-w-lg leading-relaxed">
            Tandem flights, first-timer experiences, and connections to South Africa&apos;s best paragliding schools — across Cape Town, Johannesburg, and the Garden Route.
          </p>
        </div>
      </section>

      {/* ── TANDEM FLIGHTS ───────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Tandem Flights</p>
              <h2 className="display-lg text-white mb-6">
                Your first flight.<br />
                <em className="text-stone-400">Unforgettable.</em>
              </h2>
              <p className="text-stone-300 text-lg font-light leading-relaxed mb-6">
                A tandem paragliding flight is the purest way to experience free flight — no training required, just you and an experienced pilot sharing the sky. We work with a trusted network of tandem operators across South Africa.
              </p>
              <p className="text-stone-400 leading-relaxed mb-8">
                Whether you&apos;re looking for a scenic coastal glide above Cape Town, a thermal flight over the Highveld, or a beach landing on the Garden Route — we&apos;ll connect you with the right pilot for the experience you&apos;re after.
              </p>
              <Link href="/advice?source=tandem" className="btn-primary">
                Book a Tandem Experience
              </Link>
            </div>

            {/* What to expect */}
            <div className="space-y-4">
              {[
                {
                  title: 'No experience needed',
                  desc: 'Your pilot handles everything. You just enjoy the view.',
                },
                {
                  title: 'Fully certified operators',
                  desc: 'All our partner pilots are SAHPA certified and fully insured.',
                },
                {
                  title: 'Multiple locations',
                  desc: 'Cape Town, Johannesburg, and the Garden Route — we\'ll match you to the best site.',
                },
                {
                  title: 'Personal referral',
                  desc: 'We know our operators personally. You\'re not booking through a generic platform.',
                },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARN TO FLY ─────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5 bg-stone-900/30">
        <div className="section">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Learn to Fly</p>
            <h2 className="display-lg text-white mb-6">
              Ready to fly<br />
              <em className="text-stone-400">solo?</em>
            </h2>
            <p className="text-stone-300 text-lg font-light leading-relaxed mb-6">
              Learning to paraglide is one of the most rewarding things you can do. A full course takes around 10–14 days of instruction spread over several weeks, and leads to your SAHPA student pilot licence.
            </p>
            <p className="text-stone-400 leading-relaxed mb-10">
              Paraura has long-standing relationships with reputable flight schools across South Africa. We&apos;ll point you to the right school for your location, schedule, and budget — and when you graduate, we&apos;ll help you choose your first wing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { step: '01', label: 'Talk to us', desc: 'Tell us where you are and what you\'re looking for' },
                { step: '02', label: 'We refer you', desc: 'We connect you with a trusted school in your area' },
                { step: '03', label: 'You graduate', desc: 'We help you choose your first wing when you\'re ready' },
              ].map((s) => (
                <div key={s.step} className="card p-5">
                  <p className="text-sky-400 text-xs tracking-widest uppercase mb-3">{s.step}</p>
                  <p className="text-white font-medium mb-2">{s.label}</p>
                  <p className="text-stone-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/advice?source=learn-to-fly" className="btn-primary">
              Find a Flight School
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/5">
        <div className="section">
          <p className="eyebrow mb-4">Where We Fly</p>
          <h2 className="display-md text-white mb-12">
            South Africa&apos;s best<br />paragliding locations.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.slug} className="card overflow-hidden">
                {/* Image placeholder */}
                <div className="aspect-[3/2] bg-gradient-to-br from-sky-950 to-stone-900 relative flex items-end p-5">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-white text-xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                      {loc.name}
                    </h3>
                    <p className="text-stone-400 text-xs mt-1">{loc.tagline}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-stone-300 text-sm leading-relaxed mb-5">
                    {loc.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-stone-500 w-20">Conditions</span>
                      <span className="text-stone-300">{loc.conditions}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-stone-500 w-20">Best season</span>
                      <span className="text-stone-300">{loc.season}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {loc.highlights.map((h) => (
                      <span key={h} className="badge bg-stone-800 text-stone-400 border border-stone-700 text-xs">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5 bg-stone-900/30">
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow mb-4">Ready to fly?</p>
          <h2 className="display-md text-white mb-6">
            Tell us what you&apos;re<br />
            <em className="text-stone-400">looking for.</em>
          </h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Whether it&apos;s a tandem experience, learning to fly, or finding the right wing — get in touch and we&apos;ll point you in the right direction.
          </p>
          <Link href="/advice?source=experience" className="btn-primary text-base px-8 py-4">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
