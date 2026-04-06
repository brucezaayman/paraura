'use client'

import { useState } from 'react'
import { submitCampaignInterest } from '@/server/actions/campaign'

interface Props {
  campaignId: string
  campaignTitle: string
}

export default function CampaignInterestForm({ campaignId, campaignTitle }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', message: '' })

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit() {
    if (!form.name || !form.email) return
    setLoading(true)
    setError(null)
    const result = await submitCampaignInterest({
      campaign_id: campaignId,
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp || undefined,
      message: form.message || undefined,
    })
    setLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error ?? 'Something went wrong.')
    }
  }

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl text-center"
        style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'rgba(43,108,176,0.08)', border: '1px solid rgba(43,108,176,0.2)' }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ color: 'var(--color-blue)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-light mb-2"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-night)' }}>
          Interest registered.
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted-light)' }}>
          We&apos;ll be in touch shortly about {campaignTitle}.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
      <h3 className="font-light mb-1"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-night)' }}>
        Register Interest
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted-light)' }}>
        Submit your details and we&apos;ll get back to you personally.
      </p>
      <div className="space-y-4">
        <div>
          <label className="label">Name *</label>
          <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
            placeholder="Your name" className="input" />
        </div>
        <div>
          <label className="label">Email *</label>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com" className="input" />
        </div>
        <div>
          <label className="label">WhatsApp (optional)</label>
          <input type="tel" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)}
            placeholder="+27 82 000 0000" className="input" />
        </div>
        <div>
          <label className="label">Message (optional)</label>
          <textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)}
            placeholder="Any questions or specific requirements..." className="textarea" />
        </div>
      </div>
      {error && (
        <div className="mt-4 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'rgba(220,38,38,0.06)', color: '#DC2626' }}>
          {error}
        </div>
      )}
      <button onClick={handleSubmit} disabled={loading || !form.name || !form.email}
        className={`btn-primary w-full mt-6 ${(loading || !form.name || !form.email) ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {loading ? 'Sending...' : 'Register Interest'}
      </button>
    </div>
  )
}
