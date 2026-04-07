import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase'
import { Post, PostCategory } from '@/types'

export const revalidate = 60

const CATEGORY_LABELS: Record<PostCategory, string> = {
  guide: 'Guide',
  education: 'Education',
  news: 'News',
  'pilot-story': 'Pilot Story',
}

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts').select('title, excerpt')
      .eq('slug', params.slug).eq('status', 'published').single()
    if (!data) return {}
    return { title: `${data.title} — Paraura`, description: data.excerpt ?? undefined }
  } catch { return {} }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function InsightPage({ params }: Props) {
  let post: Post | null = null
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts').select('*')
      .eq('slug', params.slug).eq('status', 'published').single()
    post = data as Post
  } catch { notFound() }

  if (!post) notFound()

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-32 pb-12 lg:pt-40 lg:pb-16"
        style={{ backgroundColor: 'var(--color-night)' }}>
        <div className="section max-w-3xl">
          <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--color-thermal)' }}>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <span>/</span>
            <span style={{ color: 'rgba(240,239,237,0.6)' }}>{CATEGORY_LABELS[post.category]}</span>
          </div>
          <p className="eyebrow-dark mb-4">{CATEGORY_LABELS[post.category]}</p>
          <h1 className="display-lg mb-6" style={{ color: 'white' }}>{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--color-thermal)' }}>
              {post.excerpt}
            </p>
          )}
          {post.published_at && (
            <p className="mt-6 text-sm" style={{ color: 'rgba(107,163,214,0.7)' }}>
              {formatDate(post.published_at)}
            </p>
          )}
        </div>
      </div>

      {post.cover_image && (
        <div className="w-full overflow-hidden" style={{ maxHeight: '480px' }}>
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="py-16 lg:py-20">
        <div className="section max-w-3xl">
          {post.content ? (
            <div className="prose-paraura" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p style={{ color: 'var(--text-muted-light)' }}>Content coming soon.</p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--color-blue)' }}>Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: 'rgba(43,108,176,0.08)', color: 'var(--color-blue)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-night)' }}>
            <p className="eyebrow-dark mb-3">Ready to find your wing?</p>
            <h3 className="display-sm mb-4" style={{ color: 'white' }}>Talk to Paraura.</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--color-thermal)' }}>
              Our advice is free, personal, and based on real flying experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/selector" className="btn-primary">Try the Wing Selector</Link>
              <Link href="/advice" className="btn-secondary-dark">Get Personal Advice</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
