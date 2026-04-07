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
    tagline: "Coastal soaring above one of the world's most iconic landscapes",
    description:
      "Cape Town offers world-class paragliding conditions with consistent south-easterly winds, dramatic mountain launches, and breathtaking views of the Atlantic Ocean, Table Mountain, and the Cape Peninsula. Signal Hill and Lion's Head are legendary sites visited by pilots from around the world.",
    conditions: 'Coastal / sea breeze',
    season: 'Year-round, best Oct–Apr',
    highlights: ["Signal Hill", "Lion's Head", "Chapman's Peak", "Constantia"],
  },
  {
    name: 'Johannesburg & Gauteng',
    slug: 'johannesburg',
    tagline: 'High-altitude thermal flying on the Highveld plateau',
    description:
      "Flying in Gauteng is a different experience entirely — strong thermals, high altitude (1,700m above sea level), and wide open spaces. The Highveld flying season produces some of South Africa's longest XC flights. Ideal for both first-timers and experienced pilots looking to clock serious distance.",
    conditions: 'Thermal / inland',
    season: 'Best Sep–Nov and Feb–Apr',
    highlights: ['Harties', 'Magaliesberg', 'Dunnottar', 'Heidelberg'],
  },
  {
    name: 'Garden Route',
    slug: 'garden-route',
    tagline: 'Plett, Wilderness, Sedgefield — the Garden Route from above',
    description:
      "The Garden Route stretches from Plettenberg Bay through Wilderness and Sedgefield — one of South Africa's most scenic flying destinations. Gentle coastal conditions, forested hills, and launch sites with sweeping views of the Indian Ocean make this a favourite for both tandem experiences and leisure flying. George airport makes it an easy destination to reach from anywhere in the country.",
    conditions: 'Coastal / mixed',
    season: 'Year-round, best Mar–May and Sep–Nov',
    highlights: ['Plettenberg Bay', 'Wilderness', 'Sedgefield', 'Knysna', 'George'],
  },
]

const VIDEO_CATEGORIES = [
  {
    label: 'Tandem Flights — Signal Hill, Cape Town',
    desc: 'Flying off the iconic Signal Hill with the Atlantic Ocean and Table Mountain as the backdrop.',
    videos: [
      { id: 'glBCLXxW29E', title: 'Tandem with Ronnie' },
      { id: '171WqhTdMTA', title: 'Tandem with Jakes' },
      { id: 'Z8LGJSentBo', title: 'Tandem with Tanya' },
    ],
  },
  {
    label: 'Tandem Flights — Sedgefield & Wilderness, Garden Route',
    desc: 'Beach launches and Indian Ocean views on the Garden Route.',
    videos: [
      { id: 'yT0Zlfjj5U8', title: 'Tandem with Thandi' },
      { id: 'VxzKvAPcZI4', title: 'Tandem with Niel' },
      { id: 'NUX26fcRRSs', title: 'Tandem with Janneke' },
      { id: '46lbtzn60Fs', title: 'Tandem with Christianne' },
    ],
  },
  {
    label: 'Tandem Flights — Dunnottar, Gauteng',
    desc: 'Winch-launched tandem flights on the Highveld — a completely different flying experience.',
    videos: [
      { id: 'AutPbEe4kmE', title: 'Tandem with Reena' },
      { id: '1v2CWFj2RxU', title: 'Tandem with Niraj' },
      { id: 'Bu4qZLk1FmA', title: 'Tandem with Charlotte' },
      { id: 'naDUFaZ9ACA', title: 'Tandem with Lesego' },
      { id: '_1GcqvrRiXg', title: 'Tandem with Natacha' },
      { id: 'LvNhZ6P_xHc', title: 'Tandem with Mmabhato' },
      { id: 'M3-bxv1zKy0', title: 'Tandem with Gareth (age 10!)' },
      { id: 'p671gaFEleg', title: 'Tandem with Wai' },
      { id: 'ZX5qZDTFVH4', title: 'Tandem with John' },
      { id: 'ywRq15TK23s', title: 'Tandem with Kyle' },
    ],
  },
  {
    label: 'XC & Tandem — Rustenburg',
    desc: 'Cross-country and tandem flying in the Magaliesberg region.',
    videos: [
      { id: 'jnfxTPDmI48', title: 'Tandem with Lezelle' },
      { id: '_35RAm6D4Co', title: 'XC flight with Lezelle' },
    ],
  },
  {
    label: 'Competition Flying',
    desc: 'Competition flights in the Barberton mountains on a Skywalk Cayenne 5, and XC flying on the Skywalk Poison in the UK.',
    videos: [
      { id: 'La_sD-8maY0', title: 'Barberton Comp — Cayenne 5' },
      { id: 'wI4rglpSMqk', title: 'Barberton Comp — Cayenne 5' },
      { id: 'ib5zNsuTVns', title: 'XC Flight UK — Skywalk Poison' },
    ],
  },
  {
    label: 'International Flying — Annecy, France',
    desc: 'Flying in Annecy — one of the most beautiful paragliding destinations in the world.',
    videos: [
      { id: 'XDBTpZ2Z6Ik', title: 'Flying in Annecy, France' },
    ],
  },
]

export default function FlyPage() {
  return (
    <div style={{ backgroundColor: 'var(--surface-light)' }}>

      {/* ── HERO — night blue ─────────────────────────────────── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 60% 40%, var(--color-blue) 0%, transparent 60%)' }} />
        <div className="section relative z-10">
          <p className="eyebrow-dark mb-4">Experiences</p>
          <h1 className="display-xl mb-6" style={{ color: 'white' }}>
            Fly with<br />
            <em style={{ color: 'var(--color-thermal)' }}>Paraura</em>
          </h1>
          <p className="text-lg font-light max-w-lg leading-relaxed" style={{ color: 'rgba(240,239,237,0.75)' }}>
            Tandem flights, first-timer experiences, and connections to South Africa&apos;s best paragliding schools — across Cape Town, Johannesburg, and the Garden Route.
          </p>
        </div>
      </section>

      {/* ── TANDEM FLIGHTS — light ────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-4">Tandem Flights</p>
              <h2 className="display-lg mb-6" style={{ color: 'var(--color-night)' }}>
                Your first flight.<br />
                <em style={{ color: 'var(--color-blue)' }}>Unforgettable</em>
              </h2>
              <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'var(--color-carbon)' }}>
                A tandem paragliding flight is the purest way to experience free flight — no training required, just you and an experienced pilot sharing the sky. We work with a trusted network of tandem operators across South Africa.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--text-muted-light)' }}>
                Whether you&apos;re looking for a scenic coastal glide above Cape Town, a thermal flight over the Highveld, or a beach landing on the Garden Route — we&apos;ll connect you with the right pilot for the experience you&apos;re after.
              </p>
              <Link href="/advice?source=tandem" className="btn-primary">
                Book a Tandem Experience
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { title: 'No experience needed', desc: 'Your pilot handles everything. You just enjoy the view.' },
                { title: 'Fully certified operators', desc: 'All our partner pilots are SAHPA certified and fully insured.' },
                { title: 'Multiple locations', desc: "Cape Town, Johannesburg, and the Garden Route — we'll match you to the best site." },
                { title: 'Personal referral', desc: "We know our operators personally. You're not booking through a generic platform." },
              ].map((item) => (
                <div key={item.title} className="card p-5 flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--color-blue)' }} />
                  <div>
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--color-night)' }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted-light)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEOS — alt light ────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light-card)' }}>
        <div className="section">
          <p className="eyebrow mb-4">See it for yourself</p>
          <h2 className="display-md mb-4" style={{ color: 'var(--color-night)' }}>
            Real flights.<br />Real people.
          </h2>
          <p className="text-lg font-light mb-16 max-w-xl" style={{ color: 'var(--text-muted-light)' }}>
            Over the years we&apos;ve flown hundreds of people — from first-timers to competition pilots, from the Garden Route coast to the French Alps.
          </p>

          <div className="space-y-16">
            {VIDEO_CATEGORIES.map((cat) => (
              <div key={cat.label}>
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-1" style={{ color: 'var(--color-night)' }}>{cat.label}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted-light)' }}>{cat.desc}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.videos.map((video) => (
                    <div key={video.id} className="card overflow-hidden">
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium" style={{ color: 'var(--color-carbon)' }}>{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="https://www.youtube.com/@parauraparagliding" target="_blank" rel="noopener noreferrer"
              className="btn-secondary">
              More on YouTube ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── LEARN TO FLY — night ──────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section">
          <div className="max-w-3xl">
            <p className="eyebrow-dark mb-4">Learn to Fly</p>
            <h2 className="display-lg mb-6" style={{ color: 'white' }}>
              Ready to fly<br />
              <em style={{ color: 'var(--color-thermal)' }}>solo?</em>
            </h2>
            <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(240,239,237,0.75)' }}>
              Learning to paraglide is one of the most rewarding things you can do. A full course takes around 10–14 days of instruction spread over several weeks, and leads to your SAHPA student pilot licence.
            </p>
            <p className="leading-relaxed mb-10" style={{ color: 'rgba(107,163,214,0.8)' }}>
              Paraura has long-standing relationships with reputable flight schools across South Africa. We&apos;ll point you to the right school for your location, schedule, and budget — and when you graduate, we&apos;ll help you choose your first wing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { step: '01', label: 'Talk to us', desc: "Tell us where you are and what you're looking for" },
                { step: '02', label: 'We refer you', desc: 'We connect you with a trusted school in your area' },
                { step: '03', label: 'You graduate', desc: "We help you choose your first Skywalk wing when you're ready" },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl p-5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-thermal)' }}>{s.step}</p>
                  <p className="font-medium mb-2 text-white">{s.label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,239,237,0.6)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/advice?source=learn-to-fly" className="btn-primary">
              Find a Flight School
            </Link>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS — light ─────────────────────────────────── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section">
          <p className="eyebrow mb-4">Where We Fly</p>
          <h2 className="display-md mb-12" style={{ color: 'var(--color-night)' }}>
            South Africa&apos;s best<br />paragliding locations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.slug} className="card overflow-hidden">
                <div className="aspect-[3/2] relative flex items-end p-5"
                  style={{ background: 'linear-gradient(135deg, var(--color-night) 0%, var(--color-blue) 100%)' }}>
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(26,58,92,0.9) 0%, transparent 60%)' }} />
                  <div className="relative z-10">
                    <h3 className="text-white text-xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
                      {loc.name}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-thermal)' }}>{loc.tagline}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-carbon)' }}>
                    {loc.description}
                  </p>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-20 font-medium" style={{ color: 'var(--color-blue)' }}>Conditions</span>
                      <span style={{ color: 'var(--color-carbon)' }}>{loc.conditions}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-20 font-medium" style={{ color: 'var(--color-blue)' }}>Best season</span>
                      <span style={{ color: 'var(--color-carbon)' }}>{loc.season}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(43,108,176,0.08)', color: 'var(--color-blue)' }}>
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

      {/* ── CTA — night ───────────────────────────────────────── */}
      <section className="py-20 lg:py-24" style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section text-center max-w-xl mx-auto">
          <p className="eyebrow-dark mb-4">Ready to fly?</p>
          <h2 className="display-md mb-6" style={{ color: 'white' }}>
            Tell us what you&apos;re<br />
            <em style={{ color: 'var(--color-thermal)' }}>looking for</em>
          </h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(240,239,237,0.7)' }}>
            Whether it&apos;s a tandem experience, learning to fly, or finding the right wing — get in touch and we&apos;ll point you in the right direction.
          </p>
          <Link href="/advice?source=experience" className="btn-primary text-base px-8 py-4">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
