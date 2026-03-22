'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Status = 'all' | 'new' | 'contacted' | 'closed'

interface Inquiry {
  id: string
  source: string
  status: string
  message: string
  created_at: string
  pilot_id: string
  pilots: { name: string; email: string; whatsapp: string | null } | null
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-sky-950/60 text-sky-400 border-sky-900',
  contacted: 'bg-amber-950/60 text-amber-400 border-amber-900',
  closed: 'bg-stone-800 text-stone-500 border-stone-700',
}

const SOURCE_LABELS: Record<string, string> = {
  selector: 'Wing Selector',
  product: 'Product Page',
  homepage: 'Homepage',
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (mins > 0) return `${mins}m ago`
  return 'Just now'
}

export default function LeadsPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState<Status>('all')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    loadInquiries()
  }, [filter])

  async function loadInquiries() {
    setLoading(true)
    let query = supabase
      .from('inquiries')
      .select('id, source, status, message, created_at, pilot_id, pilots(name, email, whatsapp)')
      .order('created_at', { ascending: false })

    if (filter !== 'all') {
      query = query.eq('status', filter)
    }

    const { data } = await query
    setInquiries((data as Inquiry[]) ?? [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id)
    await supabase.from('inquiries').update({ status }).eq('id', id)
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    )
    if (selected?.id === id) {
      setSelected((s) => s ? { ...s, status } : null)
    }
    setUpdatingId(null)
  }

  const STATUSES: Status[] = ['all', 'new', 'contacted', 'closed']

  return (
    <div className="flex h-[calc(100vh-56px)] lg:h-screen overflow-hidden">
      {/* ── List panel ────────────────────────────────── */}
      <div className={`flex flex-col ${selected ? 'hidden lg:flex' : 'flex'} w-full lg:w-80 xl:w-96 border-r border-white/5 shrink-0`}>
        <div className="px-4 py-4 border-b border-white/5">
          <h1 className="text-white text-base font-medium mb-3">Inquiries</h1>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === s
                    ? 'bg-white text-stone-950'
                    : 'text-stone-400 hover:text-white border border-white/10'
                }`}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {!loading && inquiries.length === 0 && (
            <p className="text-stone-600 text-sm text-center py-12">No inquiries found.</p>
          )}
          {inquiries.map((inq) => (
            <button
              key={inq.id}
              onClick={() => setSelected(inq)}
              className={`w-full text-left px-4 py-4 border-b border-white/5 transition-colors ${
                selected?.id === inq.id ? 'bg-white/5' : 'hover:bg-white/3'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-1">
                <span className="text-white text-sm font-medium truncate">
                  {inq.pilots?.name ?? 'Unknown'}
                </span>
                <span className={`badge border text-xs shrink-0 ${STATUS_STYLES[inq.status] ?? STATUS_STYLES.new}`}>
                  {inq.status}
                </span>
              </div>
              <p className="text-stone-500 text-xs truncate mb-1">{inq.message}</p>
              <div className="flex items-center gap-2 text-stone-600 text-xs">
                <span>{SOURCE_LABELS[inq.source] ?? inq.source}</span>
                <span>·</span>
                <span>{timeAgo(inq.created_at)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail panel ──────────────────────────────── */}
      <div className={`flex-1 overflow-y-auto ${!selected ? 'hidden lg:flex items-center justify-center' : 'flex flex-col'}`}>
        {!selected ? (
          <p className="text-stone-600 text-sm">Select an inquiry to view details</p>
        ) : (
          <div className="p-6 lg:p-8 max-w-2xl">
            {/* Back (mobile) */}
            <button
              onClick={() => setSelected(null)}
              className="lg:hidden text-stone-500 hover:text-white text-sm flex items-center gap-2 mb-6 transition-colors"
            >
              ← All inquiries
            </button>

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-white text-xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {selected.pilots?.name ?? 'Unknown Pilot'}
                </h2>
                <p className="text-stone-500 text-sm">{selected.pilots?.email}</p>
                {selected.pilots?.whatsapp && (
                  <a
                    href={`https://wa.me/${selected.pilots.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 text-sm hover:text-sky-300 transition-colors"
                  >
                    WhatsApp ↗
                  </a>
                )}
              </div>
              <span className={`badge border ${STATUS_STYLES[selected.status] ?? STATUS_STYLES.new}`}>
                {selected.status}
              </span>
            </div>

            {/* Inquiry details */}
            <div className="card p-5 mb-5">
              <div className="flex items-center gap-3 mb-4 text-xs text-stone-500">
                <span className="uppercase tracking-widest">{SOURCE_LABELS[selected.source] ?? selected.source}</span>
                <span>·</span>
                <span>{new Date(selected.created_at).toLocaleDateString('en-ZA', { dateStyle: 'medium' })}</span>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{selected.message}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              {(['new', 'contacted', 'closed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(selected.id, s)}
                  disabled={selected.status === s || updatingId === selected.id}
                  className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                    selected.status === s
                      ? `${STATUS_STYLES[s]} cursor-default`
                      : 'border-white/10 text-stone-400 hover:text-white hover:border-white/30'
                  } ${updatingId === selected.id ? 'opacity-50 cursor-wait' : ''}`}
                >
                  Mark {s}
                </button>
              ))}
            </div>

            {/* Quick contact */}
            <div className="flex flex-wrap gap-3">
              {selected.pilots?.email && (
                <a
                  href={`mailto:${selected.pilots.email}?subject=Your Paraura inquiry`}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Reply by Email
                </a>
              )}
              {selected.pilots?.whatsapp && (
                <a
                  href={`https://wa.me/${selected.pilots.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm px-5 py-2.5"
                >
                  WhatsApp
                </a>
              )}
              {selected.pilot_id && (
                <Link
                  href={`/pilots/${selected.pilot_id}`}
                  className="btn-ghost text-sm px-5 py-2.5"
                >
                  View Pilot Profile →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
