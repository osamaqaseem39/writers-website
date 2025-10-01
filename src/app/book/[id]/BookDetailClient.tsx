'use client'

import { Header } from '@/components/Header'
import { BookImage } from '@/components/BookImage'
import { BookDetails } from '@/components/BookDetails'
import { useEffect, useState } from 'react'

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

interface BookDetailClientProps {
  id: string
}

export function BookDetailClient({ id }: BookDetailClientProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch book')
        }
        const data = await response.json()
        setBook(data.book)
      } catch (err) {
        console.error('Error fetching book:', err)
        setError('Failed to load book')
        // Fallback to mock data
        setBook({
          _id: id,
          title: "You Never Cried",
          author: "Nawa Sohail",
          genre: "Fiction",
          description: "Pace Town is a place of quiet nights, rustling leaves, and stories waiting to be told. Dan, a gentle bookseller and devoted father, has long kept his heart closed. When Rose arrives, carrying secrets of her own, everything begins to change. Together, they find comfort in starlit walks, whispered conversations, and the fragile beauty of second chances.",
          fullDescription: "Yet the past is never far behind. When old wounds resurface, their love is tested in ways they never imagined. You Never Cried is a tender, atmospheric novel about love, vulnerability, and the courage it takes to finally let go. Set in the picturesque English countryside, this story explores themes of healing, forgiveness, and the transformative power of love.",
          year: "2024",
          pages: 329,
          status: "Published",
          isbn: "978-969-696-969-3",
          language: "English",
          readingTime: "7 hours",
          publisher: "Daastan",
          publishDate: "08 Oct 2024",
          price: 24.99,
          coverImageUrl: "/bookhomepage.jpeg",
          rating: 5.0,
          reviews: 6
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
        <Header />
        <main className="pt-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
            <p className="text-brand-700">Loading book details...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
        <Header />
        <main className="pt-20 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-brand-900 mb-4">Book Not Found</h1>
            <p className="text-brand-700 mb-6">The book you're looking for doesn't exist.</p>
            <a 
              href="/books" 
              className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300"
            >
              Back to Books
            </a>
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
          {error && (
            <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800">
              {error} - Showing cached data
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Book Cover + Book Info */}
            <div className="space-y-8">
              {/* Book Cover Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
                <BookImage book={book} />
              </div>

              {/* Book Info Card */}
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-serif text-brand-900 mb-6">Book Information</h3>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {book.genre && (
                    <div>
                      <span className="font-semibold text-brand-900">Genre:</span>
                      <span className="ml-2 text-brand-700">{book.genre}</span>
                    </div>
                  )}
                  {book.year && (
                    <div>
                      <span className="font-semibold text-brand-900">Year:</span>
                      <span className="ml-2 text-brand-700">{book.year}</span>
                    </div>
                  )}
                  {book.pages && (
                    <div>
                      <span className="font-semibold text-brand-900">Pages:</span>
                      <span className="ml-2 text-brand-700">{book.pages}</span>
                    </div>
                  )}
                  {book.readingTime && (
                    <div>
                      <span className="font-semibold text-brand-900">Reading Time:</span>
                      <span className="ml-2 text-brand-700">{book.readingTime}</span>
                    </div>
                  )}
                  {book.publisher && (
                    <div>
                      <span className="font-semibold text-brand-900">Publisher:</span>
                      <span className="ml-2 text-brand-700">{book.publisher}</span>
                    </div>
                  )}
                  {book.isbn && (
                    <div>
                      <span className="font-semibold text-brand-900">ISBN:</span>
                      <span className="ml-2 text-brand-700">{book.isbn}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 2: Book Details Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
              <BookDetails book={book} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}