'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalPilots: number
  newInquiries: number
  totalInquiries: number
}

interface RecentInquiry {
  id: string
  source: string
  status: string
  message: string
  created_at: string
  pilots: { name: string; email: string } | null
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-sky-950/60 text-sky-400 border-sky-900',
  contacted: 'bg-amber-950/60 text-amber-400 border-amber-900',
  closed: 'bg-stone-800 text-stone-500 border-stone-700',
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

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<RecentInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [pilotsRes, inquiriesRes, newRes, recentRes] = await Promise.all([
        supabase.from('pilots').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
        supabase
          .from('inquiries')
          .select('id, source, status, message, created_at, pilots(name, email)')
          .order('created_at', { ascending: false })
          .limit(8),
      ])

      setStats({
        totalPilots: pilotsRes.count ?? 0,
        totalInquiries: inquiriesRes.count ?? 0,
        newInquiries: newRes.count ?? 0,
      })
      setRecent((recentRes.data as unknown as RecentInquiry[]) ?? [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Dashboard
        </h1>
        <p className="text-stone-500 text-sm">Paraura CRM overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'New Inquiries', value: stats?.newInquiries ?? 0, highlight: true },
          { label: 'Total Inquiries', value: stats?.totalInquiries ?? 0 },
          { label: 'Pilots in CRM', value: stats?.totalPilots ?? 0 },
        ].map((s) => (
          <div
            key={s.label}
            className={`card p-5 ${s.highlight && (stats?.newInquiries ?? 0) > 0 ? 'border-sky-400/20' : ''}`}
          >
            <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">{s.label}</p>
            <p
              className={`text-3xl font-light ${s.highlight && (stats?.newInquiries ?? 0) > 0 ? 'text-sky-400' : 'text-white'}`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-medium text-sm">Recent Inquiries</h2>
          <Link href="/leads" className="text-stone-500 hover:text-white text-xs transition-colors">
            View all →
          </Link>
        </div>

        <div className="space-y-2">
          {recent.length === 0 && (
            <p className="text-stone-600 text-sm py-8 text-center">No inquiries yet.</p>
          )}
          {recent.map((inq) => (
            <Link
              key={inq.id}
              href={`/leads?id=${inq.id}`}
              className="card flex items-center gap-4 p-4 hover:border-white/10 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-400 text-xs font-medium uppercase">
                {inq.pilots?.name?.charAt(0) ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white text-sm font-medium">
                    {inq.pilots?.name ?? 'Unknown'}
                  </span>
                  <span className="text-stone-600 text-xs">via {inq.source}</span>
                </div>
                <p className="text-stone-500 text-xs truncate">{inq.message}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={`badge border text-xs ${STATUS_STYLES[inq.status] ?? STATUS_STYLES.new}`}>
                  {inq.status}
                </span>
                <span className="text-stone-600 text-xs">{timeAgo(inq.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
