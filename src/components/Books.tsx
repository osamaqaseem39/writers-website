'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { formatCurrency } from '@/utils/currency'
import { fetchFeaturedBookWithFallback } from '@/utils/apiWithFallback'
import { getFallbackData } from '@/data/fallbackData'
import { Book } from '@/types/uniformData'


export function Books() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: bookCardRef, isVisible: bookCardVisible } = useScrollAnimation()
  const { ref: bookImageRef, isVisible: bookImageVisible } = useScrollAnimation()
  const { ref: bookDetailsRef, isVisible: bookDetailsVisible } = useScrollAnimation()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation()

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedBook = async () => {
      try {
        const response = await fetch('/api/books/featured')
        if (!response.ok) {
          throw new Error('Failed to fetch featured book')
        }
        const data = await response.json()
        setBook(data.book)
      } catch (err) {
        console.error('Error fetching featured book:', err)
        setError('Failed to load featured book - showing fallback data')
        // Use fallback data
        setBook(getFallbackData('featured-book') as Book)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBook()
  }, [])

  if (loading) {
    return (
      <section id="books" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700">Loading featured book...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!book) {
    return (
      <section id="books" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-brand-700">No featured book available</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="books" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Book</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Discover my featured work, a heartfelt journey through love, loss, and the beautiful complexity of human emotions.</span>
            <span className="sm:hidden">My featured work about love, loss, and human emotions.</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800 text-center">
            {error} - Showing default book
          </div>
        )}

        {/* Single Featured Book Display */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={bookCardRef}
            className={`bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-12 shadow-2xl scroll-animate ${bookCardVisible ? 'animate-in' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Book Cover/Visual */}
              <div 
                ref={bookImageRef}
                className={`text-center lg:text-left scroll-animate-scale scroll-animate-delay-200 ${bookImageVisible ? 'animate-in' : ''}`}
              >
                <div className="relative inline-block group">
                  {/* Elegant book frame */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute -inset-4 bg-white rounded-2xl shadow-xl"></div>
                  
                  {/* Book Cover Image */}
                  <img 
                    src={book.coverImageUrl || "/bookhomepage.jpeg"} 
                    alt={`${book.title} Book Cover`} 
                    className="relative w-80 h-full mx-auto lg:mx-0 rounded-2xl shadow-2xl object-cover z-10 group-hover:scale-105 transition-transform duration-500 filter sepia-20 brightness-110 contrast-105 saturate-110"
                  />
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-500 rounded-full shadow-lg animate-bounce"></div>
                  <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full shadow-lg animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              {/* Book Details */}
              <div 
                ref={bookDetailsRef}
                className={`space-y-8 scroll-animate-left scroll-animate-delay-300 ${bookDetailsVisible ? 'animate-in' : ''}`}
              >
                <div>
                  <h3 className="text-4xl font-serif text-brand-900 mb-4">{book.title}</h3>
                  <p className="text-lg text-brand-600 mb-4">by {book.author}</p>
                  
                  {/* Rating */}
                  {book.rating && book.reviews && (
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-brand-600">{book.rating} ({book.reviews} reviews)</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mb-6">
                    {book.genre && (
                      <span className="text-brand-600 bg-brand-100 px-4 py-2 rounded-full text-sm font-medium">
                        {book.genre}
                      </span>
                    )}
                    <span className="text-brand-600 bg-green-100 px-4 py-2 rounded-full text-sm font-medium">
                      {book.status}
                    </span>
                  </div>
                  
                  <p className="text-lg text-brand-800 leading-relaxed mb-4">
                    <span className="hidden sm:inline">{book.description}</span>
                    <span className="sm:hidden">{book.description?.substring(0, 150) || 'No description available'}...</span>
                  </p>
                  
                  {book.fullDescription && (
                    <p className="text-lg text-brand-800 leading-relaxed mb-6">
                      <span className="hidden sm:inline">{book.fullDescription}</span>
                      <span className="sm:hidden">{book.fullDescription?.substring(0, 100) || 'No full description available'}...</span>
                    </p>
                  )}

                  {/* Book Details */}
                  {(book.pages || book.year || book.readingTime) && (
                    <div className="text-sm text-brand-600 space-y-2 mb-6">
                      {book.pages && (
                        <div className="flex justify-between">
                          <span>Pages:</span>
                          <span>{book.pages}</span>
                        </div>
                      )}
                      {book.year && (
                        <div className="flex justify-between">
                          <span>Year:</span>
                          <span>{book.year}</span>
                        </div>
                      )}
                      {book.readingTime && (
                        <div className="flex justify-between">
                          <span>Reading Time:</span>
                          <span>{book.readingTime}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-brand-900 mb-2">{formatCurrency(book.price)}</div>
                    <div className="text-sm text-brand-600">Free shipping on orders over ₨2,500</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div 
                  ref={buttonsRef}
                  className={`space-y-4 scroll-animate scroll-animate-delay-500 ${buttonsVisible ? 'animate-in' : ''}`}
                >
                  <a href={`/book/${book._id}`} className="block w-full text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600 text-center">
                    Buy Now - {formatCurrency(book.price)}
                  </a>
                  <a href={`/book/${book._id}`} className="block w-full bg-white/80 hover:bg-white text-brand-800 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-brand-200 hover:border-brand-300 transition-all duration-300 backdrop-blur-sm shadow-lg text-center">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}