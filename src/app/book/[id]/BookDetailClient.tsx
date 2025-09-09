'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  fullDescription: string
  year: string
  pages: number
  status: string
  isbn: string
  language: string
  readingTime: string
  publisher: string
  publishDate: string
  price: number
  coverImage: string
  rating: number
  reviews: number
}

interface BookDetailClientProps {
  id: string
}

export function BookDetailClient({ id }: BookDetailClientProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState('hardcover')
  const { addToCart, isInCart } = useCart()

  const book: Book = {
    id: 1,
    title: "You Never Cried",
    author: "Nawa Sohail",
    genre: "Fiction",
    description: "Pace Town is a place of quiet nights, rustling leaves, and stories waiting to be told. Dan, a gentle bookseller and devoted father, has long kept his heart closed. When Rose arrives, carrying secrets of her own, everything begins to change. Together, they find comfort in starlit walks, whispered conversations, and the fragile beauty of second chances.",
    fullDescription: "Yet the past is never far behind. When old wounds resurface, their love is tested in ways they never imagined. You Never Cried is a tender, atmospheric novel about love, vulnerability, and the courage it takes to finally let go. Set in the picturesque English countryside, this story explores themes of healing, forgiveness, and the transformative power of love.",
    year: "2024",
    pages: 329,
    status: "Available Now",
    isbn: "978-969-696-969-3",
    language: "English",
    readingTime: "7 hours",
    publisher: "Daastan",
    publishDate: "08 Oct 2024",
    price: 24.99,
    coverImage: "/bookhomepage.jpeg",
    rating: 5.0,
    reviews: 6
  }

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      format: selectedFormat,
      coverImage: book.coverImage
    })
  }

  const handleBuyNow = () => {
    // Navigate to checkout
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Book Cover */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="absolute -inset-2 bg-white rounded-2xl shadow-xl"></div>
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="relative w-80 h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-serif text-brand-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-brand-600 mb-4">by {book.author}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-brand-700 font-medium">{book.rating}</span>
                      <span className="text-brand-500">({book.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-brand-800 leading-relaxed">{book.description}</p>
                  <p className="text-brand-800 leading-relaxed">{book.fullDescription}</p>
                </div>

                {/* Book Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-brand-900">Genre:</span>
                    <span className="ml-2 text-brand-700">{book.genre}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-900">Year:</span>
                    <span className="ml-2 text-brand-700">{book.year}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-900">Pages:</span>
                    <span className="ml-2 text-brand-700">{book.pages}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-900">Reading Time:</span>
                    <span className="ml-2 text-brand-700">{book.readingTime}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-900">Publisher:</span>
                    <span className="ml-2 text-brand-700">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-brand-900">ISBN:</span>
                    <span className="ml-2 text-brand-700">{book.isbn}</span>
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2">Format:</label>
                  <div className="flex space-x-3">
                    {['hardcover', 'paperback', 'ebook'].map((format) => (
                      <button
                        key={format}
                        onClick={() => setSelectedFormat(format)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedFormat === format
                            ? 'border-brand-500 bg-brand-50 text-brand-900'
                            : 'border-brand-200 hover:border-brand-300 text-brand-700'
                        }`}
                      >
                        {format.charAt(0).toUpperCase() + format.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2">Quantity:</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-brand-900 min-w-[2rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="text-3xl font-bold text-brand-900">${book.price}</div>
                  <div className="text-sm text-brand-600">Free shipping on orders over $25</div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Buy Now - ${(book.price * quantity).toFixed(2)}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`w-full px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-lg ${
                      isInCart(book.id) 
                        ? 'bg-brand-500 text-white border-brand-500' 
                        : 'bg-white/80 hover:bg-white text-brand-800 border-brand-200 hover:border-brand-300'
                    }`}
                  >
                    {isInCart(book.id) ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}