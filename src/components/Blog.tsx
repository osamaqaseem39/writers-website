'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getFallbackData } from '@/data/fallbackData'
import { BlogPost } from '@/types/uniformData'

export function Blog() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation()
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        const data = await response.json()
        setBlogPosts(data.posts || [])
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Failed to load blog posts - showing fallback data')
        // Use fallback data
        setBlogPosts(getFallbackData('blog') as BlogPost[])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700">Loading stories and poems...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            Stories & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Poems</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Explore my collection of short stories and poetry. 
            Each piece is a window into emotions, experiences, and the human condition.</span>
            <span className="sm:hidden">My collection of short stories and poetry.</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800 text-center">
            {error} - Showing fallback data
          </div>
        )}

        {/* Featured Post - Show first post as featured */}
        {blogPosts.length > 0 && (
          <div 
            ref={featuredRef}
            className={`mb-16 scroll-animate-scale scroll-animate-delay-200 ${featuredVisible ? 'animate-in' : ''}`}
          >
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl transition-all duration-300 group-hover:bg-white/90 group-hover:scale-[1.02]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Featured Post Image */}
                  <div className="text-center lg:text-left">
                    <div className="w-32 h-32 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                      📖
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                      <span className="text-xs text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
                        Featured
                      </span>
                      {blogPosts[0].category && (
                        <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">
                          {blogPosts[0].category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Featured Post Content */}
                  <div>
                    <h3 className="text-3xl font-bold text-brand-900 mb-4 group-hover:text-brand-700 transition-colors duration-300">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-brand-800 text-lg leading-relaxed mb-6">
                      {blogPosts[0].content.substring(0, 200)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-brand-600 mb-6">
                      <span>{new Date(blogPosts[0].createdAt).toLocaleDateString()}</span>
                      <span>{blogPosts[0].category || 'Story'}</span>
                    </div>
                    <a 
                      href={`/blog`}
                      className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600 inline-block"
                    >
                      Read Full Story
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Blog Posts */}
        {blogPosts.length > 1 && (
          <div 
            ref={postsRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 scroll-animate scroll-animate-delay-300 ${postsVisible ? 'animate-in' : ''}`}
          >
            {blogPosts.slice(1).map((post) => (
              <div key={post._id} className="group">
                <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105 group-hover:shadow-2xl h-full">
                  {/* Post Image */}
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-xl mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                      📝
                    </div>
                    {post.category && (
                      <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-brand-800 text-sm leading-relaxed mb-4">
                      {post.content.substring(0, 100)}...
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-brand-600 mb-4">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>{post.category || 'Story'}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="text-center">
                    <a 
                      href={`/blog`}
                      className="w-full text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600 inline-block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Posts Button */}
        <div 
          ref={ctaRef}
          className={`text-center scroll-animate scroll-animate-delay-500 ${ctaVisible ? 'animate-in' : ''}`}
        >
          <button className="border-2 border-brand-300 text-brand-800 hover:bg-brand-50 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:border-brand-400">
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  )
} 