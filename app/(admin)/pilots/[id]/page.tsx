'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Pilot {
  id: string
  name: string
  email: string
  whatsapp: string | null
  pilot_level: string | null
  hours_flown: number | null
  years_flying: number | null
  weight: number | null
  location: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

interface Inquiry {
  id: string
  source: string
  status: string
  message: string
  created_at: string
}

const LEVEL_LABELS: Record<string, string> = {
  A: 'EN-A (Beginner)',
  B: 'EN-B (Intermediate)',
  C: 'EN-C (Advanced)',
  D: 'EN-D (Expert / Competition)',
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-sky-950/60 text-sky-400 border-sky-900',
  contacted: 'bg-amber-950/60 text-amber-400 border-amber-900',
  closed: 'bg-stone-800 text-stone-500 border-stone-700',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return 'Just now'
}

export default function PilotDetailPage() {
  const { id } = useParams() as { id: string }
  const [pilot, setPilot] = useState<Pilot | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)
  const [notesSaved, setNotesSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [pilotRes, inqRes] = await Promise.all([
        supabase.from('pilots').select('*').eq('id', id).single(),
        supabase
          .from('inquiries')
          .select('id, source, status, message, created_at')
          .eq('pilot_id', id)
          .order('created_at', { ascending: false }),
      ])
      if (pilotRes.data) {
        setPilot(pilotRes.data as unknown as Pilot)
        setNotes(pilotRes.data.notes ?? '')
      }
      setInquiries((inqRes.data as unknown as Inquiry[]) ?? [])
      setLoading(false)
    }
    load()
  }, [id])

  async function saveNotes() {
    if (!pilot) return
    setSavingNotes(true)
    await supabase.from('pilots').update({ notes }).eq('id', id)
    setSavingNotes(false)
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!pilot) {
    return (
      <div className="p-8 text-center">
        <p className="text-stone-500 mb-4">Pilot not found.</p>
        <Link href="/pilots" className="btn-ghost">← Back to pilots</Link>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <Link href="/pilots" className="text-stone-500 hover:text-white text-sm flex items-center gap-2 mb-8 transition-colors">
        ← All Pilots
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-300 text-lg font-medium uppercase">
            {pilot.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-white text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
              {pilot.name}
            </h1>
            <p className="text-stone-500 text-sm">
              Added {new Date(pilot.created_at).toLocaleDateString('en-ZA', { dateStyle: 'medium' })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5">
            <p className="eyebrow mb-4">Contact</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-stone-500 text-xs w-16">Email</span>
                <a href={`mailto:${pilot.email}`} className="text-sky-400 hover:text-sky-300 text-sm transition-colors">
                  {pilot.email}
                </a>
              </div>
              {pilot.whatsapp && (
                <div className="flex items-center gap-3">
                  <span className="text-stone-500 text-xs w-16">WhatsApp</span>
                  <a
                    href={`https://wa.me/${pilot.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 text-sm transition-colors"
                  >
                    {pilot.whatsapp} ↗
                  </a>
                </div>
              )}
              {pilot.location && (
                <div className="flex items-center gap-3">
                  <span className="text-stone-500 text-xs w-16">Location</span>
                  <span className="text-stone-300 text-sm">{pilot.location}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5 pt-5 border-t border-white/5">
              <a href={`mailto:${pilot.email}?subject=Following up from Paraura`} className="btn-primary text-sm px-4 py-2">
                Email
              </a>
              {pilot.whatsapp && (
                <a
                  href={`https://wa.me/${pilot.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm px-4 py-2"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="eyebrow">Notes</p>
              {notesSaved && <span className="text-emerald-400 text-xs">Saved ✓</span>}
            </div>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Personal context, preferences, history, follow-up reminders..."
              className="textarea mb-3"
            />
            <button
              onClick={saveNotes}
              disabled={savingNotes}
              className={`btn-ghost text-sm ${savingNotes ? 'opacity-50 cursor-wait' : ''}`}
            >
              {savingNotes ? 'Saving...' : 'Save notes'}
            </button>
          </div>

          <div>
            <p className="eyebrow mb-4">Inquiry History</p>
            {inquiries.length === 0 ? (
              <div className="card p-5 text-center text-stone-600 text-sm">No inquiries recorded yet.</div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500 text-xs uppercase tracking-widest">{inq.source}</span>
                        <span className="text-stone-700">·</span>
                        <span className="text-stone-600 text-xs">{timeAgo(inq.created_at)}</span>
                      </div>
                      <span className={`badge border text-xs ${STATUS_STYLES[inq.status] ?? STATUS_STYLES.new}`}>
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="eyebrow mb-4">Pilot Profile</p>
            <div className="space-y-4">
              {pilot.pilot_level && (
                <div>
                  <p className="text-stone-600 text-xs mb-1">Level</p>
                  <p className="text-white text-sm">{LEVEL_LABELS[pilot.pilot_level] ?? pilot.pilot_level}</p>
                </div>
              )}
              {pilot.hours_flown != null && (
                <div>
                  <p className="text-stone-600 text-xs mb-1">Hours flown</p>
                  <p className="text-white text-sm">{pilot.hours_flown}h</p>
                </div>
              )}
              {pilot.years_flying != null && (
                <div>
                  <p className="text-stone-600 text-xs mb-1">Years flying</p>
                  <p className="text-white text-sm">{pilot.years_flying} yr</p>
                </div>
              )}
              {pilot.weight != null && (
                <div>
                  <p className="text-stone-600 text-xs mb-1">All-up weight</p>
                  <p className="text-white text-sm">{pilot.weight} kg</p>
                </div>
              )}
              {!pilot.pilot_level && !pilot.hours_flown && !pilot.weight && (
                <p className="text-stone-600 text-xs">No profile data yet.</p>
              )}
            </div>
          </div>

          <div className="card p-5">
            <p className="text-stone-600 text-xs mb-1">Inquiries</p>
            <p className="text-white text-2xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
              {inquiries.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
