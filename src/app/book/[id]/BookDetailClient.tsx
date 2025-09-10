'use client'

import { Header } from '@/components/Header'
import { BookImage } from '@/components/BookImage'
import { BookDetails } from '@/components/BookDetails'

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


  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex flex-col">
      <Header />
      <main className="pt-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
              <BookImage book={book} />
            </div>

            {/* Book Details Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
              <BookDetails book={book} />
            </div>

            {/* Book Info Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-serif text-brand-900 mb-6">Book Information</h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}