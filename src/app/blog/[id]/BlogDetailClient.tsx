'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import Markdown from '@/components/Markdown'
import { BlogPost } from '@/types/uniformData'

interface BlogDetailClientProps {
  id: string
}

export function BlogDetailClient({ id }: BlogDetailClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`)
        if (!res.ok) throw new Error('Failed to fetch blog post')
        const data = await res.json()
        setPost(data.post)
      } catch (e) {
        console.error('Error fetching blog post:', e)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
        <Header />
        <main className="pt-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700">Loading article...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
        <Header />
        <main className="pt-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-brand-900 mb-4">Article Not Found</h1>
            <p className="text-brand-700 mb-6">The article you're looking for doesn't exist.</p>
            <a 
              href="/blog" 
              className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300"
            >
              Back to Blog
            </a>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
      <Header />
      <main className="pt-20 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
              {error}
            </div>
          )}

          <article className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-brand-900 mb-2">{post.title}</h1>
              <div className="text-sm text-brand-600 flex items-center gap-3">
                <span>{new Date(post.createdAt).toDateString()}</span>
                {post.category && (
                  <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">{post.category}</span>
                )}
              </div>
            </header>

            {post.imageUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
              </div>
            )}

            <Markdown markdown={post.content} className="prose max-w-none prose-brand" />
          </article>
        </div>
      </main>
    </div>
  )
}


