'use client'

import { useEffect, useState } from 'react'

interface Review {
  _id: string
  name: string
  location?: string
  rating: number
  text: string
  imageUrl?: string
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="group">
        <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8 shadow-lg h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-brand-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review Text */}
        <div>
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-400 scrollbar-track-brand-100 pr-2' : 'max-h-32'}`}>
            <p className="text-brand-800 leading-relaxed italic">"{review.text}"</p>
          </div>
        </div>

        {/* Reviewer Info */}
        <div className="flex items-center mt-6">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-brand-100 border border-brand-200">
            {review.imageUrl ? (
              <img src={review.imageUrl} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">{review.name}</h4>
            <p className="text-sm text-brand-600">{review.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/reviews', { cache: 'no-store' })
        const data = await res.json()
        if (isMounted) setReviews(data.reviews || [])
      } catch {
        if (isMounted) setReviews([])
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            What Readers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Say</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Discover why readers around the world are falling in love with "You Never Cried" and Nawa's storytelling.</span>
            <span className="sm:hidden">What readers say about "You Never Cried".</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <ReviewCard key={(review as any)._id || `${review.name}-${review.rating}`} review={review} />
          ))}
        </div>

        {/* Overall Rating */}
        <div className="text-center">
          <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-10 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif text-brand-900 mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 text-brand-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-3xl font-bold text-brand-800 ml-4">5.0</span>
            </div>
            <p className="text-brand-700 text-lg">
              Based on 6+ reviews from readers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}