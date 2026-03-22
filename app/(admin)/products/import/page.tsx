'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type WingLevel = 'A' | 'B' | 'C' | 'D'

interface WeightRange {
  size: string
  min_weight: string
  max_weight: string
}

interface ProductForm {
  name: string
  slug: string
  category: string
  description: string
  wing_level: WingLevel | ''
  is_lightweight: boolean
  specs: {
    certification: string
    cells: string
    flat_area: string
    aspect_ratio: string
    glide_ratio: string
    top_speed: string
    flying_goal: string
    conditions: string
  }
  weight_ranges: WeightRange[]
}

const emptyForm: ProductForm = {
  name: '',
  slug: '',
  category: 'wing',
  description: '',
  wing_level: '',
  is_lightweight: false,
  specs: {
    certification: '',
    cells: '',
    flat_area: '',
    aspect_ratio: '',
    glide_ratio: '',
    top_speed: '',
    flying_goal: '',
    conditions: '',
  },
  weight_ranges: [{ size: 'S', min_weight: '', max_weight: '' }],
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProductImportPage() {
  const [url, setUrl] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function fetchFromUrl() {
    if (!url.trim()) return
    setFetching(true)
    setFetchError(null)

    try {
      const res = await fetch(`/api/extract-product?url=${encodeURIComponent(url)}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()

      setForm((f) => ({
        ...f,
        name: data.name ?? f.name,
        slug: data.name ? slugify(data.name) : f.slug,
        description: data.description ?? f.description,
      }))
    } catch {
      setFetchError('Could not extract from that URL. Fill in the fields manually below.')
    }

    setFetching(false)
  }

  function updateSpec(key: keyof ProductForm['specs'], value: string) {
    setForm((f) => ({ ...f, specs: { ...f.specs, [key]: value } }))
  }

  function addWeightRange() {
    setForm((f) => ({
      ...f,
      weight_ranges: [...f.weight_ranges, { size: '', min_weight: '', max_weight: '' }],
    }))
  }

  function updateWeightRange(i: number, key: keyof WeightRange, value: string) {
    setForm((f) => {
      const updated = [...f.weight_ranges]
      updated[i] = { ...updated[i], [key]: value }
      return { ...f, weight_ranges: updated }
    })
  }

  function removeWeightRange(i: number) {
    setForm((f) => ({ ...f, weight_ranges: f.weight_ranges.filter((_, idx) => idx !== i) }))
  }

  async function handleSave() {
    if (!form.name || !form.slug || !form.wing_level) {
      setSaveError('Name, slug, and wing level are required.')
      return
    }

    setSaving(true)
    setSaveError(null)

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      description: form.description,
      wing_level: form.wing_level,
      is_lightweight: form.is_lightweight,
      specs: form.specs,
      images: [],
      weight_ranges: form.weight_ranges.map((r) => ({
        size: r.size,
        min_weight: Number(r.min_weight),
        max_weight: Number(r.max_weight),
      })),
    }

    const { error } = await supabase.from('products').insert(payload)

    if (error) {
      setSaveError(error.message)
      setSaving(false)
    } else {
      setSaved(true)
      setForm(emptyForm)
      setUrl('')
    }
  }

  if (saved) {
    return (
      <div className="p-8 max-w-xl">
        <div className="card p-8 text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-900 flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-light mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Product saved.
          </h2>
          <p className="text-stone-400 text-sm mb-6">The product has been added to your database.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSaved(false)} className="btn-primary text-sm px-5 py-2.5">
              Add another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Import Product
        </h1>
        <p className="text-stone-500 text-sm">Add a Skywalk product to your database</p>
      </div>

      {/* URL fetch */}
      <div className="card p-5 mb-6">
        <p className="eyebrow mb-3">Step 1 — Fetch from Skywalk URL</p>
        <p className="text-stone-500 text-xs mb-4">
          Paste a skywalk.info product URL to pre-fill name and description.
        </p>
        <div className="flex gap-3">
          <input
            type="url"
            placeholder="https://www.skywalk.info/product/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input flex-1 text-sm"
          />
          <button
            onClick={fetchFromUrl}
            disabled={fetching || !url.trim()}
            className={`btn-secondary text-sm px-4 shrink-0 ${fetching ? 'opacity-50 cursor-wait' : ''}`}
          >
            {fetching ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
        {fetchError && (
          <p className="text-amber-400 text-xs mt-2">{fetchError}</p>
        )}
      </div>

      {/* Form */}
      <div className="card p-5 space-y-5">
        <p className="eyebrow">Step 2 — Complete Product Details</p>

        {/* Name + slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Product Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => {
                const name = e.target.value
                setForm((f) => ({ ...f, name, slug: slugify(name) }))
              }}
              placeholder="Skywalk Chili 6"
              className="input text-sm"
            />
          </div>
          <div>
            <label className="label">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="chili-6"
              className="input text-sm font-mono"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Short positioning statement for this wing..."
            className="textarea text-sm"
          />
        </div>

        {/* Wing level + lightweight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Wing Level *</label>
            <select
              value={form.wing_level}
              onChange={(e) => setForm((f) => ({ ...f, wing_level: e.target.value as WingLevel }))}
              className="select text-sm"
            >
              <option value="">Select...</option>
              <option value="A">EN-A (Beginner)</option>
              <option value="B">EN-B (Intermediate)</option>
              <option value="C">EN-C (Advanced)</option>
              <option value="D">EN-D (Expert)</option>
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setForm((f) => ({ ...f, is_lightweight: !f.is_lightweight }))}
                className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${form.is_lightweight ? 'bg-sky-500' : 'bg-stone-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-1 transition-transform ${form.is_lightweight ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
              <span className="text-stone-300 text-sm">Lightweight</span>
            </label>
          </div>
        </div>

        {/* Specs */}
        <div>
          <label className="label">Specifications</label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ['certification', 'Certification (e.g. EN-B)'],
                ['cells', 'Cells'],
                ['flat_area', 'Flat area (m²)'],
                ['aspect_ratio', 'Aspect ratio'],
                ['glide_ratio', 'Best glide'],
                ['top_speed', 'Top speed'],
              ] as [keyof ProductForm['specs'], string][]
            ).map(([key, label]) => (
              <div key={key}>
                <label className="text-stone-600 text-xs mb-1 block">{label}</label>
                <input
                  type="text"
                  value={form.specs[key]}
                  onChange={(e) => updateSpec(key, e.target.value)}
                  className="input text-sm"
                  placeholder="—"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flying goal + conditions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Flying goals (comma-separated)</label>
            <input
              type="text"
              value={form.specs.flying_goal}
              onChange={(e) => updateSpec('flying_goal', e.target.value)}
              placeholder="leisure,xc"
              className="input text-sm font-mono"
            />
            <p className="text-stone-700 text-xs mt-1">Options: leisure, xc, competition, hike-and-fly</p>
          </div>
          <div>
            <label className="label">Conditions (comma-separated)</label>
            <input
              type="text"
              value={form.specs.conditions}
              onChange={(e) => updateSpec('conditions', e.target.value)}
              placeholder="coastal,mixed"
              className="input text-sm font-mono"
            />
            <p className="text-stone-700 text-xs mt-1">Options: coastal, thermal-inland, mixed</p>
          </div>
        </div>

        {/* Weight ranges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Weight Ranges</label>
            <button onClick={addWeightRange} className="text-sky-400 text-xs hover:text-sky-300 transition-colors">
              + Add size
            </button>
          </div>
          <div className="space-y-2">
            {form.weight_ranges.map((range, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={range.size}
                  onChange={(e) => updateWeightRange(i, 'size', e.target.value)}
                  placeholder="Size (XS/S/M/L)"
                  className="input text-sm w-28"
                />
                <input
                  type="number"
                  value={range.min_weight}
                  onChange={(e) => updateWeightRange(i, 'min_weight', e.target.value)}
                  placeholder="Min kg"
                  className="input text-sm flex-1"
                />
                <input
                  type="number"
                  value={range.max_weight}
                  onChange={(e) => updateWeightRange(i, 'max_weight', e.target.value)}
                  placeholder="Max kg"
                  className="input text-sm flex-1"
                />
                {form.weight_ranges.length > 1 && (
                  <button
                    onClick={() => removeWeightRange(i)}
                    className="text-stone-600 hover:text-red-400 transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6">
        {saveError && (
          <div className="bg-red-950/40 border border-red-900 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
            {saveError}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`btn-primary w-full ${saving ? 'opacity-50 cursor-wait' : ''}`}
        >
          {saving ? 'Saving...' : 'Save Product to Database'}
        </button>
      </div>
    </div>
  )
}
