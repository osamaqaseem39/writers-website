'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'

interface Book {
  _id: string
  title: string
  author: string
  genre?: string
  description: string
  fullDescription?: string
  year?: string
  pages?: number
  status: string
  isbn?: string
  language?: string
  readingTime?: string
  publisher?: string
  publishDate?: string
  price: number
  coverImageUrl: string
  rating?: number
  reviews?: number
}

interface BookDetailsProps {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      format: 'hardcover',
      coverImage: book.coverImageUrl
    })
  }

  const handleBuyNow = () => {
    router.push('/checkout')
  }

  return (
    <div className="space-y-6">
      {/* Title and Author */}
      <div>
        <h1 className="text-4xl font-serif text-navy mb-2">{book.title}</h1>
        <p className="text-xl text-teal mb-4">by {book.author}</p>
        
        {/* Rating */}
        {book.rating && book.reviews && (
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-navy font-medium">{book.rating}</span>
              <span className="text-teal">({book.reviews} reviews)</span>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p className="text-navy leading-relaxed">{book.description}</p>
        {book.fullDescription && (
          <p className="text-navy leading-relaxed">{book.fullDescription}</p>
        )}
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-skyblue to-transparent my-8"></div>

      {/* Quantity Selection */}
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Quantity:</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full bg-skyblue hover:bg-teal flex items-center justify-center text-navy"
          >
            -
          </button>
          <span className="text-lg font-medium text-navy min-w-[2rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full bg-skyblue hover:bg-teal flex items-center justify-center text-navy"
          >
            +
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-skyblue to-transparent my-8"></div>

      {/* Price */}
      <div className="mb-8">
        <div className="text-3xl font-bold text-navy">${book.price}</div>
        <div className="text-sm text-teal">Free shipping on orders over $25</div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-navy to-teal text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Buy Now - ${(book.price * quantity).toFixed(2)}
        </button>
        <button
          onClick={handleAddToCart}
          className={`w-full px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-lg ${
            isInCart(book._id) 
              ? 'bg-navy text-white border-navy' 
              : 'bg-white/80 hover:bg-white text-navy border-teal hover:border-navy'
          }`}
        >
          {isInCart(book._id) ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}