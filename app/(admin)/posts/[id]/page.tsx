'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Post, PostCategory, PostStatus } from '@/types'

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'guide', label: 'Guide' },
  { value: 'education', label: 'Education' },
  { value: 'news', label: 'News' },
  { value: 'pilot-story', label: 'Pilot Story' },
]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function PostEditorPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: 'guide' as PostCategory,
    tags: '',
    status: 'draft' as PostStatus,
  })

  useEffect(() => {
    if (isNew) return
    supabase.from('posts').select('*').eq('id', params.id as string).single()
      .then(({ data }) => {
        if (data) {
          const p = data as Post
          setForm({
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt ?? '',
            content: p.content ?? '',
            cover_image: p.cover_image ?? '',
            category: p.category,
            tags: p.tags?.join(', ') ?? '',
            status: p.status,
          })
        }
        setLoading(false)
      })
  }, [params.id, isNew])

  function update(key: keyof typeof form, value: string) {
    setForm((f) => {
      const next = { ...f, [key]: value }
      if (key === 'title' && isNew) next.slug = slugify(value)
      return next
    })
  }

  async function handleSave(publish = false) {
    if (!form.title) return
    setSaving(true)
    setError(null)

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content || null,
      cover_image: form.cover_image || null,
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: publish ? 'published' : form.status,
      ...(publish ? { published_at: new Date().toISOString() } : {}),
      updated_at: new Date().toISOString(),
    }

    if (isNew) {
      const { data, error: err } = await supabase.from('posts').insert(payload).select('id').single()
      if (err) { setError(err.message); setSaving(false); return }
      if (data) router.replace(`/admin/posts/${data.id}`)
    } else {
      const { error: err } = await supabase.from('posts').update(payload).eq('id', params.id as string)
      if (err) { setError(err.message); setSaving(false); return }
    }

    setSaving(false)
    setSaved(true)
    if (publish) setForm((f) => ({ ...f, status: 'published' }))
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--color-blue)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="text-sm" style={{ color: 'var(--text-muted-light)' }}>
            ← Articles
          </Link>
          <h1 className="text-xl font-light"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
            {isNew ? 'New Article' : 'Edit Article'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="text-xs text-emerald-600">Saved ✓</span>}
          <button onClick={() => handleSave(false)} disabled={saving}
            className="text-sm px-4 py-2 rounded-lg border transition-all"
            style={{ borderColor: 'rgba(0,0,0,0.12)', color: 'var(--color-carbon)' }}>
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          {form.status !== 'published' && (
            <button onClick={() => handleSave(true)} disabled={saving || !form.title}
              className="btn-primary text-sm px-4 py-2">
              Publish
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'rgba(220,38,38,0.06)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.15)' }}>
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="label">Title *</label>
          <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)}
            placeholder="Article title" className="input text-lg"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }} />
        </div>

        <div>
          <label className="label">Slug</label>
          <input type="text" value={form.slug} onChange={(e) => update('slug', e.target.value)}
            placeholder="url-friendly-slug" className="input font-mono text-sm" />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted-light)' }}>
            /articles/{form.slug || 'your-slug'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <select value={form.category} onChange={(e) => update('category', e.target.value)} className="select">
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} className="select">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Excerpt</label>
          <textarea rows={2} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)}
            placeholder="Short description shown in article listings..." className="textarea" />
        </div>

        <div>
          <label className="label">Cover Image URL</label>
          <input type="url" value={form.cover_image} onChange={(e) => update('cover_image', e.target.value)}
            placeholder="https://..." className="input" />
        </div>

        <div>
          <label className="label">Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={(e) => update('tags', e.target.value)}
            placeholder="beginner, EN-A, South Africa" className="input" />
        </div>

        <div>
          <label className="label">Content (HTML)</label>
          <textarea rows={20} value={form.content} onChange={(e) => update('content', e.target.value)}
            placeholder="<p>Write your article here. HTML is supported.</p>"
            className="textarea font-mono text-sm" />
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted-light)' }}>
            Supports HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;a&gt; etc.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={() => handleSave(false)} disabled={saving || !form.title} className="btn-secondary text-sm">
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          {form.status !== 'published' && (
            <button onClick={() => handleSave(true)} disabled={saving || !form.title} className="btn-primary text-sm">
              Publish Article
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
