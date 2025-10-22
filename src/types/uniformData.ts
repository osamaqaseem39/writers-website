/**
 * Uniform Data Types - Backend and Frontend Consistency
 * 
 * This file defines the data interfaces that are consistent between
 * the backend MongoDB models and frontend TypeScript interfaces.
 */

// Book Interface - Matches backend Book model
export interface Book {
  _id: string
  title: string
  author: string
  description: string
  price: number
  coverImageUrl?: string
  status: 'Draft' | 'Published'
  inventory: number
  featured: boolean
  genre?: string
  year?: string
  pages?: number
  rating?: number
  reviews?: number
  isbn?: string
  language?: string
  readingTime?: string
  publisher?: string
  publishDate?: string
  fullDescription?: string
  createdAt: string
  updatedAt: string
}

// BlogPost Interface - Matches backend BlogPost model
export interface BlogPost {
  _id: string
  title: string
  content: string
  category?: string
  status: 'Draft' | 'Published'
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

// Review Interface - Matches backend Review model
export interface Review {
  _id: string
  name: string
  email: string
  rating: number
  comment: string
  bookId: string
  approved: boolean
  orderId?: string
  orderStatus?: string
  isVerified: boolean
  location?: string
  profession?: string
  createdAt: string
  updatedAt: string
}

// GalleryImage Interface - Matches backend GalleryImage model
export interface GalleryImage {
  _id: string
  title: string
  description: string
  src: string
  status: 'Draft' | 'Published'
  alt?: string
  order?: number
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  isFallback: boolean
}

// Featured Book Response
export interface FeaturedBookResponse {
  book: Book
}

// Books Response
export interface BooksResponse {
  books: Book[]
}

// Blog Posts Response
export interface BlogPostsResponse {
  posts: BlogPost[]
}

// Reviews Response
export interface ReviewsResponse {
  reviews: Review[]
}

// Gallery Images Response
export interface GalleryImagesResponse {
  images: GalleryImage[]
}

// Order Status Types
export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'

// Book Status Types
export type BookStatus = 'Draft' | 'Published'

// Review Approval Status
export type ReviewApproval = boolean

// Currency Configuration
export const CURRENCY_CONFIG = {
  symbol: '₨',
  code: 'PKR',
  decimalPlaces: 2
} as const

// Data Validation Schemas (for reference)
export const VALIDATION_RULES = {
  book: {
    title: { required: true, maxLength: 200 },
    author: { required: true, maxLength: 100 },
    price: { required: true, min: 0 },
    rating: { min: 1, max: 5 },
    pages: { min: 1 }
  },
  review: {
    name: { required: true, maxLength: 100 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    rating: { required: true, min: 1, max: 5 },
    comment: { required: true, maxLength: 1000 }
  },
  blogPost: {
    title: { required: true, maxLength: 200 },
    content: { required: true, maxLength: 10000 },
    category: { maxLength: 50 }
  }
} as const
