'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { submitAdviceRequest } from '@/server/actions/advice'

const GOALS: Record<string, string> = {
  leisure: 'Leisure & enjoyment',
  xc: 'Cross-country (XC)',
  competition: 'Competition',
  'hike-and-fly': 'Hike & fly',
}

const LEVELS = [
  { value: '', label: 'Not sure / not certified' },
  { value: 'A', label: 'EN-A (Beginner / Student)' },
  { value: 'B', label: 'EN-B (Intermediate)' },
  { value: 'C', label: 'EN-C (Advanced)' },
  { value: 'D', label: 'EN-D (Expert / Competition)' },
]

function AdviceFormInner() {
  const params = useSearchParams()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    pilot_level: '',
    weight: '',
    wing_of_interest: params.get('name') ?? '',
    flying_goal: params.get('goal') ?? '',
    message: '',
  })

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const canNextStep0 = form.name.trim().length > 1 && form.email.includes('@')
  const canSubmit = form.message.trim().length > 5

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const source = params.get('wing') ? 'product' : params.get('goal') ? 'selector' : 'homepage'

    try {
      const result = await submitAdviceRequest({
        name: form.name,
        email: form.email,
        whatsapp: form.whatsapp || undefined,
        pilot_level: form.pilot_level || undefined,
        weight: form.weight ? Number(form.weight) : undefined,
        wing_of_interest: form.wing_of_interest || undefined,
        flying_goal: form.flying_goal || undefined,
        message: form.message,
        source,
      })

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  // ── SUCCESS ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--surface-light)' }}>
        <div className="section max-w-lg text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(43,108,176,0.1)', border: '1px solid rgba(43,108,176,0.2)' }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{ color: 'var(--color-blue)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="eyebrow mb-4">Request Received</p>
          <h2 className="display-md mb-4" style={{ color: 'var(--color-night)' }}>
            We&apos;ll be in touch soon.
          </h2>
          <p className="leading-relaxed mb-3" style={{ color: 'var(--text-muted-light)' }}>
            Thanks {form.name.split(' ')[0]}. We&apos;ve received your request and will get back to you personally — usually within 24 hours.
          </p>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted-light)' }}>
            Check your email for a confirmation. If you shared your WhatsApp number we may reach out there too.
          </p>
          <Link href="/" className="btn-primary">
            Back to Paraura
          </Link>
        </div>
      </div>
    )
  }

  // ── FORM ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: 'var(--surface-light)' }}>

      {/* Night hero strip */}
      <div className="pt-32 pb-12 lg:pt-40 lg:pb-16"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section max-w-xl mx-auto">
          <p className="eyebrow-dark mb-3">Get Advice</p>
          <h1 className="display-lg mb-3" style={{ color: 'white' }}>
            Talk to Paraura.
          </h1>
          <p className="font-light" style={{ color: 'var(--color-thermal)' }}>
            Personal, expert advice — no sales pressure. We respond via email or WhatsApp.
          </p>
        </div>
      </div>

      <div className="section max-w-xl mx-auto pt-12">

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: i <= step ? 'var(--color-blue)' : 'rgba(0,0,0,0.1)' }} />
          ))}
        </div>

        {/* ── Step 0: Contact info ── */}
        {step === 0 && (
          <div>
            <p className="eyebrow mb-3">Step 1 of 3</p>
            <h2 className="display-sm mb-2" style={{ color: 'var(--color-night)' }}>
              Let&apos;s start with your details.
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted-light)' }}>
              We respond personally — your info stays with Paraura only.
            </p>

            <div className="space-y-4">
              <div>
                <label className="label">Name *</label>
                <input type="text" placeholder="Your name" value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input" autoFocus />
              </div>
              <div>
                <label className="label">Email *</label>
                <input type="email" placeholder="you@email.com" value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input" />
              </div>
              <div>
                <label className="label">WhatsApp (optional but encouraged)</label>
                <input type="tel" placeholder="+27 82 000 0000" value={form.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                  className="input" />
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted-light)' }}>
                  We use WhatsApp for quick follow-ups — much faster than email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Context ── */}
        {step === 1 && (
          <div>
            <p className="eyebrow mb-3">Step 2 of 3</p>
            <h2 className="display-sm mb-2" style={{ color: 'var(--color-night)' }}>
              Tell us about your flying.
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted-light)' }}>
              This helps us give you precise advice. All fields optional.
            </p>

            <div className="space-y-4">
              {form.wing_of_interest && (
                <div className="rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ backgroundColor: 'rgba(43,108,176,0.08)', color: 'var(--color-blue)', border: '1px solid rgba(43,108,176,0.15)' }}>
                  Wing of interest: {form.wing_of_interest}
                </div>
              )}
              <div>
                <label className="label">Pilot Level</label>
                <select value={form.pilot_level}
                  onChange={(e) => update('pilot_level', e.target.value)}
                  className="select">
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">All-up flying weight (kg)</label>
                <input type="number" min={40} max={200} placeholder="e.g. 90"
                  value={form.weight}
                  onChange={(e) => update('weight', e.target.value)}
                  className="input" />
                <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted-light)' }}>
                  You + harness + reserve + gear
                </p>
              </div>
              <div>
                <label className="label">Flying goal</label>
                <select value={form.flying_goal}
                  onChange={(e) => update('flying_goal', e.target.value)}
                  className="select">
                  <option value="">Select...</option>
                  {Object.entries(GOALS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Message ── */}
        {step === 2 && (
          <div>
            <p className="eyebrow mb-3">Step 3 of 3</p>
            <h2 className="display-sm mb-2" style={{ color: 'var(--color-night)' }}>
              Anything else to add?
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-muted-light)' }}>
              Questions, context, or anything that helps us understand what you&apos;re looking for.
            </p>
            <div>
              <label className="label">Your message *</label>
              <textarea rows={6}
                placeholder="e.g. I'm a post-school pilot with about 50 hours, flying mostly at Hermanus. I want to step up from my school wing and buy my first personal glider..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="textarea" />
            </div>

            {error && (
              <div className="mt-4 rounded-xl px-4 py-3 text-sm"
                style={{ backgroundColor: 'rgba(220,38,38,0.06)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.15)' }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)}
              className="btn-ghost" style={{ color: 'var(--color-blue)' }}>
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button type="button" onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 ? !canNextStep0 : false}
              className={`btn-primary ${step === 0 && !canNextStep0 ? 'opacity-40 cursor-not-allowed' : ''}`}>
              Continue →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className={`btn-primary ${!canSubmit || loading ? 'opacity-40 cursor-not-allowed' : ''}`}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          )}
        </div>

        {/* WhatsApp fallback */}
        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted-light)' }}>
          Prefer to chat directly?{' '}
          <a href="https://wa.me/27826363666" target="_blank" rel="noopener noreferrer"
            className="font-medium" style={{ color: 'var(--color-blue)' }}>
            WhatsApp us
          </a>
        </p>
      </div>
    </div>
  )
}

export default function AdvicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--surface-light)', color: 'var(--text-muted-light)' }}>
        Loading...
      </div>
    }>
      <AdviceFormInner />
    </Suspense>
  )
}
