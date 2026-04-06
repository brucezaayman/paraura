import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { Post, PostCategory } from '@/types'

export const metadata: Metadata = {
  title: 'Articles — Paraura Paragliding',
  description: 'Guides, education and insights for paragliding pilots in South Africa.',
}

export const revalidate = 60

const CATEGORY_LABELS: Record<PostCategory, string> = {
  guide: 'Guide',
  education: 'Education',
  news: 'News',
  'pilot-story': 'Pilot Story',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ArticlesPage() {
  let posts: Post[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
    posts = (data as Post[]) ?? []
  } catch { /* DB not yet migrated */ }

  return (
    <div style={{ backgroundColor: 'var(--surface-light)', minHeight: '100vh' }}>
      <div className="pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ backgroundColor: 'var(--color-night)', color: 'var(--color-cloud)' }}>
        <div className="section">
          <p className="eyebrow-dark mb-4">Knowledge</p>
          <h1 className="display-lg text-white mb-4">Articles</h1>
          <p className="text-lg font-light max-w-lg" style={{ color: 'var(--color-thermal)' }}>
            Guides, education, and insights for paragliding pilots in South Africa.
          </p>
        </div>
      </div>

      <div className="py-16 lg:py-20">
        <div className="section">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg font-light mb-2" style={{ color: 'var(--color-carbon)' }}>
                Articles coming soon.
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted-light)' }}>
                We&apos;re working on guides and educational content for South African pilots.
              </p>
              <div className="mt-8">
                <Link href="/advice" className="btn-primary">Get in touch directly</Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="card group block">
                  <div className="aspect-[16/9] overflow-hidden"
                    style={{ background: post.cover_image ? undefined : 'linear-gradient(135deg, var(--color-night) 0%, var(--color-blue) 100%)' }}>
                    {post.cover_image && (
                      <img src={post.cover_image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: 'rgba(43,108,176,0.08)', color: 'var(--color-blue)' }}>
                        {CATEGORY_LABELS[post.category]}
                      </span>
                      {post.published_at && (
                        <span className="text-xs" style={{ color: 'var(--text-muted-light)' }}>
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-light text-lg mb-2 leading-snug group-hover:text-brand-blue transition-colors"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted-light)' }}>
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--color-blue)' }}>
                      Read more <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
