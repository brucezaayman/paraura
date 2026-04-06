'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Post } from '@/types'

const STATUS_STYLES = {
  published: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  draft: 'bg-amber-50 text-amber-700 border border-amber-200',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', { dateStyle: 'medium' })
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts((data as Post[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function deletePost(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('posts').delete().eq('id', id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-night)' }}>
            Articles
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted-light)' }}>Manage posts and guides</p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary text-sm px-5 py-2.5">
          + New Article
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--color-blue)', borderTopColor: 'transparent' }} />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 rounded-2xl"
          style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted-light)' }}>No articles yet.</p>
          <Link href="/admin/posts/new" className="btn-primary text-sm">Write your first article</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium truncate" style={{ color: 'var(--color-night)' }}>
                    {post.title}
                  </h3>
                  <span className={`badge text-xs ${STATUS_STYLES[post.status]}`}>
                    {post.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted-light)' }}>
                  <span className="capitalize">{post.category.replace('-', ' ')}</span>
                  <span>·</span>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {post.status === 'published' && (
                  <a href={`/articles/${post.slug}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{ color: 'var(--color-blue)', backgroundColor: 'rgba(43,108,176,0.06)' }}>
                    View ↗
                  </a>
                )}
                <Link href={`/admin/posts/${post.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ color: 'var(--color-carbon)', backgroundColor: 'rgba(0,0,0,0.04)' }}>
                  Edit
                </Link>
                <button onClick={() => deletePost(post.id)}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ color: '#DC2626', backgroundColor: 'rgba(220,38,38,0.06)' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
