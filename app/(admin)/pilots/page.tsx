'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Pilot {
  id: string
  name: string
  email: string
  whatsapp: string | null
  pilot_level: string | null
  hours_flown: number | null
  location: string | null
  created_at: string
}

const LEVEL_LABELS: Record<string, string> = {
  A: 'EN-A',
  B: 'EN-B',
  C: 'EN-C',
  D: 'EN-D',
}

const LEVEL_STYLES: Record<string, string> = {
  A: 'badge-A',
  B: 'badge-B',
  C: 'badge-C',
  D: 'badge-D',
}

export default function PilotsPage() {
  const [pilots, setPilots] = useState<Pilot[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadPilots = useCallback(async (q: string) => {
    setLoading(true)
    let query = supabase
      .from('pilots')
      .select('id, name, email, whatsapp, pilot_level, hours_flown, location, created_at')
      .order('created_at', { ascending: false })

    if (q.trim()) {
      query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,location.ilike.%${q}%`)
    }

    const { data } = await query.limit(100)
    setPilots((data as Pilot[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => loadPilots(search), 250)
    return () => clearTimeout(timeout)
  }, [search, loadPilots])

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Pilots
          </h1>
          <p className="text-stone-500 text-sm">All pilots in your CRM</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : pilots.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-stone-500 text-sm">
            {search ? 'No pilots match your search.' : 'No pilots yet. They\'ll appear when advice forms are submitted.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-stone-500 text-xs uppercase tracking-widest px-5 py-3 font-medium">Pilot</th>
                  <th className="text-left text-stone-500 text-xs uppercase tracking-widest px-4 py-3 font-medium">Level</th>
                  <th className="text-left text-stone-500 text-xs uppercase tracking-widest px-4 py-3 font-medium hidden lg:table-cell">Location</th>
                  <th className="text-left text-stone-500 text-xs uppercase tracking-widest px-4 py-3 font-medium hidden lg:table-cell">Hours</th>
                  <th className="text-right text-stone-500 text-xs uppercase tracking-widest px-5 py-3 font-medium">Added</th>
                </tr>
              </thead>
              <tbody>
                {pilots.map((pilot) => (
                  <tr
                    key={pilot.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors cursor-pointer"
                    onClick={() => window.location.href = `/pilots/${pilot.id}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 text-xs font-medium uppercase shrink-0">
                          {pilot.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{pilot.name}</p>
                          <p className="text-stone-500 text-xs">{pilot.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {pilot.pilot_level ? (
                        <span className={LEVEL_STYLES[pilot.pilot_level] ?? 'badge bg-stone-800 text-stone-400 border-stone-700'}>
                          {LEVEL_LABELS[pilot.pilot_level] ?? pilot.pilot_level}
                        </span>
                      ) : (
                        <span className="text-stone-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-stone-400 text-sm">{pilot.location ?? '—'}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-stone-400 text-sm">
                        {pilot.hours_flown != null ? `${pilot.hours_flown}h` : '—'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-stone-500 text-xs">
                        {new Date(pilot.created_at).toLocaleDateString('en-ZA', { dateStyle: 'short' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {pilots.map((pilot) => (
              <Link key={pilot.id} href={`/pilots/${pilot.id}`} className="card flex items-center gap-4 p-4">
                <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-medium uppercase shrink-0">
                  {pilot.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{pilot.name}</p>
                  <p className="text-stone-500 text-xs truncate">{pilot.email}</p>
                </div>
                {pilot.pilot_level && (
                  <span className={LEVEL_STYLES[pilot.pilot_level] ?? ''}>
                    {LEVEL_LABELS[pilot.pilot_level] ?? pilot.pilot_level}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <p className="text-stone-600 text-xs mt-4 text-right">{pilots.length} pilot{pilots.length !== 1 ? 's' : ''}</p>
        </>
      )}
    </div>
  )
}
