'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import BookForm from '@/components/forms/BookForm'
import ProtectedRoute from '@/components/ProtectedRoute'
import { formatCurrency } from '@/utils/currency'
import { Book } from '@/types/uniformData'

export default function BookDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useAuth()
  const [book, setBook] = useState<Book | null>(null)
  const [isLoadingBook, setIsLoadingBook] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Authentication is now handled by ProtectedRoute component

  useEffect(() => {
    if (params.id) {
      loadBook(params.id as string)
    }
  }, [params.id])

  const loadBook = async (bookId: string) => {
    try {
      setIsLoadingBook(true)
      const res = await fetch(`/api/books/${bookId}`)
      const data = await res.json()
      if (res.ok && data.book) {
        setBook(data.book)
      } else {
        router.replace('/dashboard/books')
      }
    } catch (error) {
      console.error('Error loading book:', error)
      router.replace('/dashboard/books')
    } finally {
      setIsLoadingBook(false)
    }
  }

  const handleEdit = () => {
    setShowForm(true)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/books/${book?._id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      if (res.ok) {
        router.replace('/dashboard/books')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      
      const res = await fetch(`/api/books/${book?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setBook(data.book)
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error updating book:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
  }

  // Authentication and admin checks are now handled by ProtectedRoute component

  if (isLoadingBook) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Loading book...</div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Book not found</div>
      </div>
    )
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <a 
                href="/dashboard/books"
                className="text-brand-600 hover:text-brand-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Books</span>
              </a>
            </div>
            <h1 className="text-4xl font-serif text-brand-900 mb-4">{book.title}</h1>
            <p className="text-lg text-brand-700">Book Details & Management</p>
          </div>

          {showForm ? (
            <BookForm
              book={book}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Book Image */}
              <div>
                <div className="bg-white border border-brand-200 rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-brand-900 mb-4">Cover Image</h2>
                  <img 
                    src={book.coverImageUrl || '/bookhomepage.jpeg'} 
                    alt={book.title}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div className="bg-white border border-brand-200 rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-brand-900 mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Title</label>
                      <p className="text-lg font-medium text-brand-900">{book.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Author</label>
                      <p className="text-lg text-brand-700">{book.author}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Genre</label>
                      <p className="text-lg text-brand-700">{book.genre || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Status</label>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        book.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {book.status || 'Published'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Price</label>
                      <p className="text-2xl font-bold text-brand-900">{formatCurrency(book.price)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Inventory</label>
                      <p className="text-lg text-brand-700">{book.inventory || 0} copies</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-brand-200 rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-brand-900 mb-4">Book Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.year && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Year Published</label>
                        <p className="text-brand-700">{book.year}</p>
                      </div>
                    )}
                    {book.pages && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Pages</label>
                        <p className="text-brand-700">{book.pages}</p>
                      </div>
                    )}
                    {book.readingTime && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Reading Time</label>
                        <p className="text-brand-700">{book.readingTime}</p>
                      </div>
                    )}
                    {book.language && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Language</label>
                        <p className="text-brand-700">{book.language}</p>
                      </div>
                    )}
                    {book.publisher && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Publisher</label>
                        <p className="text-brand-700">{book.publisher}</p>
                      </div>
                    )}
                    {book.publishDate && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Publish Date</label>
                        <p className="text-brand-700">{book.publishDate}</p>
                      </div>
                    )}
                    {book.isbn && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">ISBN</label>
                        <p className="text-brand-700 font-mono text-sm">{book.isbn}</p>
                      </div>
                    )}
                    {book.rating && (
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-1">Rating</label>
                        <p className="text-brand-700">{book.rating}/5 ({book.reviews || 0} reviews)</p>
                      </div>
                    )}
                  </div>
                </div>

                {(book.description || book.fullDescription) && (
                  <div className="bg-white border border-brand-200 rounded-2xl p-6">
                    <h2 className="text-xl font-serif text-brand-900 mb-4">Descriptions</h2>
                    <div className="space-y-4">
                      {book.description && (
                        <div>
                          <label className="block text-sm font-medium text-brand-700 mb-2">Short Description</label>
                          <p className="text-brand-700 leading-relaxed">{book.description}</p>
                        </div>
                      )}
                      {book.fullDescription && (
                        <div>
                          <label className="block text-sm font-medium text-brand-700 mb-2">Full Description</label>
                          <p className="text-brand-700 leading-relaxed">{book.fullDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white border border-brand-200 rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-brand-900 mb-4">Sales Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Total Sales</label>
                      <p className="text-2xl font-bold text-brand-900">{book.sales || 0}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Revenue</label>
                      <p className="text-2xl font-bold text-brand-900">{formatCurrency(book.revenue || 0)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-brand-200 rounded-2xl p-6">
                  <h2 className="text-xl font-serif text-brand-900 mb-4">Timestamps</h2>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Created</label>
                      <p className="text-brand-700">{book.createdAt ? new Date(book.createdAt).toLocaleString() : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Last Updated</label>
                      <p className="text-brand-700">{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleEdit}
                    className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Edit Book
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
    </ProtectedRoute>
  )
}
