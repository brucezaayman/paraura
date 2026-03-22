'use client'

import { useState, useEffect, Suspense } from 'react'
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
  const canNextStep1 = true // context is optional
  const canSubmit = form.message.trim().length > 5

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    const source = params.get('wing') ? 'product' : params.get('goal') ? 'selector' : 'homepage'

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

    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error ?? 'Something went wrong.')
    }
  }

  // ── SUCCESS ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="section max-w-lg text-center">
          <div className="w-12 h-12 rounded-full bg-sky-400/20 border border-sky-400/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="eyebrow mb-4">Request Received</p>
          <h2 className="display-md text-white mb-4">We&apos;ll be in touch soon.</h2>
          <p className="text-stone-400 leading-relaxed mb-8">
            Thanks {form.name.split(' ')[0]}. We&apos;ve received your request and will get back to you personally via email — or WhatsApp if you shared your number.
          </p>
          <Link href="/" className="btn-secondary">
            Back to Paraura
          </Link>
        </div>
      </div>
    )
  }

  // ── FORM ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="section max-w-xl mx-auto">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-px flex-1 transition-all duration-300 ${
                i <= step ? 'bg-sky-400' : 'bg-stone-800'
              }`}
            />
          ))}
        </div>

        {/* ── Step 0: Contact info ── */}
        {step === 0 && (
          <div>
            <p className="eyebrow mb-4">Step 1 of 3</p>
            <h1 className="display-md text-white mb-2">Let&apos;s start with your details.</h1>
            <p className="text-stone-400 mb-8 text-sm">
              We respond personally — your info stays with Paraura only.
            </p>

            <div className="space-y-4">
              <div>
                <label className="label">Name *</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input"
                  autoFocus
                />
              </div>
              <div>
                <label className="label">Email *</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">WhatsApp (optional but encouraged)</label>
                <input
                  type="tel"
                  placeholder="+27 82 000 0000"
                  value={form.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                  className="input"
                />
                <p className="text-stone-600 text-xs mt-1.5">
                  We use WhatsApp for quick follow-ups — much faster than email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 1: Context ── */}
        {step === 1 && (
          <div>
            <p className="eyebrow mb-4">Step 2 of 3</p>
            <h1 className="display-md text-white mb-2">Tell us about your flying.</h1>
            <p className="text-stone-400 mb-8 text-sm">
              This helps us give you precise advice. All fields optional — fill in what you know.
            </p>

            <div className="space-y-4">
              {form.wing_of_interest && (
                <div className="bg-sky-950/30 border border-sky-900/50 rounded-xl px-4 py-3 text-sm text-sky-300">
                  Wing of interest: <strong>{form.wing_of_interest}</strong>
                </div>
              )}
              <div>
                <label className="label">Pilot Level</label>
                <select
                  value={form.pilot_level}
                  onChange={(e) => update('pilot_level', e.target.value)}
                  className="select"
                >
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">All-up flying weight (kg)</label>
                <input
                  type="number"
                  min={40}
                  max={200}
                  placeholder="e.g. 90"
                  value={form.weight}
                  onChange={(e) => update('weight', e.target.value)}
                  className="input"
                />
                <p className="text-stone-600 text-xs mt-1.5">You + harness + reserve + gear</p>
              </div>
              <div>
                <label className="label">Flying goal</label>
                <select
                  value={form.flying_goal}
                  onChange={(e) => update('flying_goal', e.target.value)}
                  className="select"
                >
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
            <p className="eyebrow mb-4">Step 3 of 3</p>
            <h1 className="display-md text-white mb-2">Anything else to add?</h1>
            <p className="text-stone-400 mb-8 text-sm">
              Questions, context, or anything that helps us understand what you&apos;re looking for.
            </p>
            <div>
              <label className="label">Your message *</label>
              <textarea
                rows={5}
                placeholder="e.g. I'm a post-school pilot with about 50 hours, flying mostly at Chapmans Peak. I want to step up from my school wing and buy my first personal glider..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="textarea"
              />
            </div>

            {error && (
              <div className="mt-4 bg-red-950/40 border border-red-900 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between mt-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-ghost"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 0 ? !canNextStep0 : !canNextStep1}
              className={`btn-primary ${(step === 0 ? !canNextStep0 : false) ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className={`btn-primary ${(!canSubmit || loading) ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdvicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex items-center justify-center text-stone-400">Loading...</div>}>
      <AdviceFormInner />
    </Suspense>
  )
}
