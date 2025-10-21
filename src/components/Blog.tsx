'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function Blog() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: featuredRef, isVisible: featuredVisible } = useScrollAnimation()
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Storytelling in the Digital Age",
      excerpt: "Exploring how traditional storytelling techniques adapt and evolve in our modern, technology-driven world.",
      category: "Writing Tips",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "✍️",
      featured: true
    },
    {
      id: 2,
      title: "Finding Inspiration in Everyday Moments",
        excerpt: "Discover how the mundane can become extraordinary when viewed through an author's lens.",
      category: "Inspiration",
      date: "Dec 10, 2024",
      readTime: "4 min read",
      image: "💡",
      featured: false
    },
    {
      id: 3,
      title: "Building Complex Characters Readers Love",
      excerpt: "Techniques for creating memorable characters that resonate with your audience.",
      category: "Character Development",
      date: "Dec 5, 2024",
      readTime: "7 min read",
      image: "👥",
      featured: false
    },
    {
      id: 4,
      title: "The Power of Setting in Fiction",
      excerpt: "How the right setting can transform your story and immerse readers in your world.",
      category: "World Building",
      date: "Nov 28, 2024",
      readTime: "6 min read",
      image: "🌍",
      featured: false
    }
  ]

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
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Blog</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Dive into my thoughts on writing, creativity, and the literary world. 
            From practical tips to philosophical musings, there's something for every author and reader.</span>
            <span className="sm:hidden">My thoughts on writing, creativity, and the literary world.</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Featured Post */}
        <div 
          ref={featuredRef}
          className={`mb-16 scroll-animate-scale scroll-animate-delay-200 ${featuredVisible ? 'animate-in' : ''}`}
        >
          {blogPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="group">
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl transition-all duration-300 group-hover:bg-white/90 group-hover:scale-[1.02]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Featured Post Image */}
                  <div className="text-center lg:text-left">
                    <div className="w-32 h-32 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                      {post.image}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                      <span className="text-xs text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Featured Post Content */}
                  <div>
                    <h3 className="text-3xl font-bold text-brand-900 mb-4 group-hover:text-brand-700 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-brand-800 text-lg leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-brand-600 mb-6">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <button className="text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600">
                      Read Full Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Blog Posts */}
        <div 
          ref={postsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 scroll-animate scroll-animate-delay-300 ${postsVisible ? 'animate-in' : ''}`}
        >
          {blogPosts.filter(post => !post.featured).map((post) => (
            <div key={post.id} className="group">
              <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105 group-hover:shadow-2xl h-full">
                {/* Post Image */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-xl mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                    {post.image}
                  </div>
                  <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-brand-800 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-brand-600 mb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="text-center">
                  <button className="w-full text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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