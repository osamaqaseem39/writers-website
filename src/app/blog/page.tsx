'use client'

import { useEffect, useMemo, useState } from 'react'
import { PageShell } from '@/components/PageShell'

interface BlogPost {
  _id: string
  title: string
  content: string
  category?: string
  imageUrl?: string
  published: boolean
  createdAt: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' })
        const data = await res.json()
        if (isMounted) setPosts((data.posts || []).filter((p: BlogPost) => p.published))
      } catch {
        if (isMounted) setPosts([])
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const featured = useMemo(() => posts[0], [posts])
  const others = useMemo(() => posts.slice(1), [posts])

  return (
    <PageShell>
      {/* Hero + Controls */}
      <section className="mb-8">
        <div className="rounded-3xl border border-brand-200/50 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-2xl p-8 lg:p-10">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-serif text-brand-900 mb-3">Blog</h1>
              <p className="text-brand-700">Thoughts on writing, creativity, and the literary world.</p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input placeholder="Search articles..." className="px-4 py-3 rounded-xl bg-white border border-brand-200 text-brand-900 placeholder-brand-400" />
              <select className="px-4 py-3 rounded-xl bg-white border border-brand-200 text-brand-900">
                <option>All Categories</option>
                <option>Writing Tips</option>
                <option>Inspiration</option>
                <option>Character Development</option>
                <option>World Building</option>
              </select>
              <select className="px-4 py-3 rounded-xl bg-white border border-brand-200 text-brand-900">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="mb-16">
          <div className="group">
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl transition-all duration-300 group-hover:bg-white/90 group-hover:scale-[1.02]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-32 h-32 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600 overflow-hidden">
                    {featured.imageUrl ? (
                      <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white">✍️</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    <span className="text-xs text-brand-600 bg-brand-100 px-3 py-1 rounded-full">Featured</span>
                    <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">{featured.category || 'General'}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-4 group-hover:text-brand-700 transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-brand-800 text-lg leading-relaxed mb-6">{featured.content.slice(0, 160)}...</p>
                  <div className="flex items-center justify-between text-sm text-brand-600 mb-6">
                    <span>{new Date(featured.createdAt).toDateString()}</span>
                    <span>{Math.max(1, Math.round((featured.content.length || 0) / 800))} min read</span>
                  </div>
                  <a
                    href="#"
                    className="inline-block text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600"
                  >
                    Read Full Article
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {others.map((post) => (
          <div key={post._id} className="group">
            <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105 group-hover:shadow-2xl h-full">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-xl mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600 overflow-hidden">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white">✍️</span>
                  )}
                </div>
                <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">{post.category || 'General'}</span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-brand-800 text-sm leading-relaxed mb-4">{post.content.slice(0, 120)}...</p>
                <div className="flex items-center justify-between text-sm text-brand-600 mb-4">
                  <span>{new Date(post.createdAt).toDateString()}</span>
                  <span>{Math.max(1, Math.round((post.content.length || 0) / 800))} min read</span>
                </div>
              </div>
              <div className="text-center">
                <a
                  href="#"
                  className="w-full inline-block text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  )
}

