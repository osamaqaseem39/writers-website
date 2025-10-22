'use client'

import { Header } from '@/components/Header'
import { useCart } from '@/contexts/CartContext'
import { useEffect, useState } from 'react'
import { formatCurrency } from '@/utils/currency'
import { getFallbackData } from '@/data/fallbackData'
import { Book } from '@/types/uniformData'


export default function BooksPage() {
  const { addToCart, isInCart } = useCart()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data = await response.json()
        setBooks(data.books || [])
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Failed to load books - showing fallback data')
        // Use fallback data
        setBooks(getFallbackData('books') as Book[])
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])
  
  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      format: 'Hardcover', // Default format
      coverImage: book.coverImageUrl
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
        <Header />
        <main className="pt-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700">Loading books...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
      <Header />
      
      <main className="pt-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Books</h1>
            <p className="text-lg text-brand-700 max-w-2xl mx-auto">
              Discover my collection of literary works, each crafted with care and passion for storytelling.
            </p>
            {error && (
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
                {error} - Showing cached data
              </div>
            )}
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book._id} className="group">
                <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6 shadow-lg h-full transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                  {/* Book Cover */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img 
                      src={book.coverImageUrl} 
                      alt={book.title}
                      className="relative w-full h-64 object-cover rounded-xl shadow-lg z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Book Info */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-serif text-brand-900 mb-2">{book.title}</h3>
                      <p className="text-brand-600 mb-3">by {book.author}</p>
                      
                      {/* Rating */}
                      {book.rating && book.reviews && (
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 text-brand-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-brand-600">{book.rating} ({book.reviews} reviews)</span>
                        </div>
                      )}

                      {/* Genre and Status */}
                      <div className="flex items-center space-x-2 mb-4">
                        {book.genre && (
                          <span className="text-brand-600 bg-brand-100 px-3 py-1 rounded-full text-xs font-medium">
                            {book.genre}
                          </span>
                        )}
                        <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                          {book.status}
                        </span>
                      </div>

                      <p className="text-brand-700 text-sm leading-relaxed mb-4 line-clamp-3">
                        {book.description}
                      </p>

                      {/* Book Details */}
                      {(book.pages || book.year) && (
                        <div className="text-xs text-brand-600 space-y-1 mb-4">
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
                        </div>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-brand-900">{formatCurrency(book.price)}</span>
                        <span className="text-sm text-brand-600">Free shipping</span>
                      </div>
                      
                      <div className="space-y-2">
                        <a 
                          href={`/book/${book._id}`}
                          className="block w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white px-4 py-3 rounded-lg font-semibold text-center hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg"
                        >
                          View Details
                        </a>
                        <button 
                          onClick={() => handleAddToCart(book)}
                          className={`block w-full px-4 py-3 rounded-lg font-semibold text-center border-2 transition-all duration-300 backdrop-blur-sm shadow-lg ${
                            isInCart(book._id) 
                              ? 'bg-brand-500 text-white border-brand-500' 
                              : 'bg-white/80 hover:bg-white text-brand-800 border-brand-200 hover:border-brand-300'
                          }`}
                        >
                          {isInCart(book._id) ? 'Added to Cart ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-12">
              <h2 className="text-3xl font-serif text-brand-900 mb-4">More Books Coming Soon</h2>
              <p className="text-lg text-brand-700 mb-6">
                I'm working on new stories that will touch your heart and inspire your soul. 
                Stay tuned for more literary adventures.
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg"
                >
                  Get Notified
                </a>
                <a 
                  href="/dashboard" 
                  className="bg-white/80 hover:bg-white text-brand-800 px-6 py-3 rounded-lg font-semibold border-2 border-brand-200 hover:border-brand-300 transition-all duration-300 backdrop-blur-sm shadow-lg"
                >
                  Manage Content
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}