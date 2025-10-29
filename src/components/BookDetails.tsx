'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/currency'

import { Book } from '@/types/uniformData'

interface BookDetailsProps {
  book: Book
}

export function BookDetails({ book }: BookDetailsProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isInCart, updateQuantity } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      format: 'hardcover',
      coverImage: book.coverImageUrl || '/bookhomepage.jpeg'
    })
  }

  const handleBuyNow = () => {
    // Add book to cart with selected quantity
    const cartItem = {
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      format: 'hardcover',
      coverImage: book.coverImageUrl || '/bookhomepage.jpeg'
    }
    
    // Add the item (will add with quantity 1 or increment if already exists)
    addToCart(cartItem)
    
    // If quantity > 1, update to the correct quantity
    // Using setTimeout to ensure state update happens before navigation
    if (quantity > 1) {
      setTimeout(() => {
        updateQuantity(book._id, quantity)
        setTimeout(() => router.push('/checkout'), 50)
      }, 50)
    } else {
      // Small delay to ensure cart state is saved to localStorage
      setTimeout(() => router.push('/checkout'), 50)
    }
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

      {/* Additional Book Information */}
      {(book.pages || book.year || book.readingTime || book.publisher || book.isbn) && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-navy">Book Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {book.pages && (
              <div>
                <span className="font-medium text-navy">Pages:</span>
                <span className="ml-2 text-teal">{book.pages}</span>
              </div>
            )}
            {book.year && (
              <div>
                <span className="font-medium text-navy">Year:</span>
                <span className="ml-2 text-teal">{book.year}</span>
              </div>
            )}
            {book.readingTime && (
              <div>
                <span className="font-medium text-navy">Reading Time:</span>
                <span className="ml-2 text-teal">{book.readingTime}</span>
              </div>
            )}
            {book.publisher && (
              <div>
                <span className="font-medium text-navy">Publisher:</span>
                <span className="ml-2 text-teal">{book.publisher}</span>
              </div>
            )}
            {book.isbn && (
              <div>
                <span className="font-medium text-navy">ISBN:</span>
                <span className="ml-2 text-teal">{book.isbn}</span>
              </div>
            )}
            {book.language && (
              <div>
                <span className="font-medium text-navy">Language:</span>
                <span className="ml-2 text-teal">{book.language}</span>
              </div>
            )}
            {book.publishDate && (
              <div>
                <span className="font-medium text-navy">Publish Date:</span>
                <span className="ml-2 text-teal">{book.publishDate}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-skyblue to-transparent my-8"></div>

      {/* Price */}
      <div className="mb-8">
        <div className="text-3xl font-bold text-navy">{formatCurrency(book.price)}</div>
        <div className="text-sm text-teal">Free shipping on orders over ₨2,500</div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-navy to-teal text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Buy Now - {formatCurrency(book.price * quantity)}
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