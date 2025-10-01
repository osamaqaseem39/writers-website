'use client'

import { PageShell } from '@/components/PageShell'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export default function BlogPage() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Art of Storytelling in the Digital Age',
      excerpt:
        "Exploring how traditional storytelling techniques adapt and evolve in our modern, technology-driven world.",
      category: 'Writing Tips',
      date: 'Dec 15, 2024',
      readTime: '5 min read',
      image: '✍️',
      featured: true,
    },
    {
      id: 2,
      title: 'Finding Inspiration in Everyday Moments',
      excerpt:
        "Discover how the mundane can become extraordinary when viewed through an author's lens.",
      category: 'Inspiration',
      date: 'Dec 10, 2024',
      readTime: '4 min read',
      image: '💡',
    },
    {
      id: 3,
      title: 'Building Complex Characters Readers Love',
      excerpt:
        'Techniques for creating memorable characters that resonate with your audience.',
      category: 'Character Development',
      date: 'Dec 5, 2024',
      readTime: '7 min read',
      image: '👥',
    },
    {
      id: 4,
      title: 'The Power of Setting in Fiction',
      excerpt:
        'How the right setting can transform your story and immerse readers in your world.',
      category: 'World Building',
      date: 'Nov 28, 2024',
      readTime: '6 min read',
      image: '🌍',
    },
  ]

  const featured = blogPosts.find((p) => p.featured)
  const others = blogPosts.filter((p) => !p.featured)

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
                  <div className="w-32 h-32 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                    {featured.image}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                    <span className="text-xs text-brand-600 bg-brand-100 px-3 py-1 rounded-full">Featured</span>
                    <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">{featured.category}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-4 group-hover:text-brand-700 transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-brand-800 text-lg leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-brand-600 mb-6">
                    <span>{featured.date}</span>
                    <span>{featured.readTime}</span>
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
          <div key={post.id} className="group">
            <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6 shadow-lg transition-all duration-300 group-hover:bg-white/80 group-hover:scale-105 group-hover:shadow-2xl h-full">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-xl mx-auto flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-brand-500 to-brand-600">
                  {post.image}
                </div>
                <span className="text-xs text-white px-3 py-1 rounded-full bg-brand-500">{post.category}</span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-700 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-brand-800 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-brand-600 mb-4">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
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

