'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import BookForm from '@/components/forms/BookForm'
import ProtectedRoute from '@/components/ProtectedRoute'
import { formatCurrency } from '@/utils/currency'
import { Book } from '@/types/uniformData'

export default function BooksManagementPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoadingBooks, setIsLoadingBooks] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Authentication is now handled by ProtectedRoute component

  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setIsLoadingBooks(true)
      const res = await fetch('/api/books')
      const data = await res.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setIsLoadingBooks(false)
    }
  }

  const handleAddBook = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      if (res.ok) {
        setBooks(prev => prev.filter(book => book._id !== bookId))
      }
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const handleToggleFeatured = async (bookId: string, currentFeatured: boolean) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ featured: !currentFeatured })
      })
      if (res.ok) {
        // If setting as featured, unfeature all other books first
        if (!currentFeatured) {
          const updatePromises = books
            .filter(book => book._id !== bookId && book.featured)
            .map(book => 
              fetch(`/api/books/${book._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ featured: false })
              })
            )
          await Promise.all(updatePromises)
        }
        
        // Update the local state
        setBooks(books.map(book => 
          book._id === bookId 
            ? { ...book, featured: !currentFeatured }
            : { ...book, featured: false }
        ))
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      
      const url = editingBook ? `/api/books/${editingBook._id}` : '/api/books/admin'
      const method = editingBook ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (res.ok) {
        if (editingBook) {
          setBooks(prev => prev.map(book => 
            book._id === editingBook._id ? { ...book, ...formData } : book
          ))
        } else {
          setBooks(prev => [data.book, ...prev])
        }
        setShowForm(false)
        setEditingBook(null)
      }
    } catch (error) {
      console.error('Error saving book:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  // Authentication and admin checks are now handled by ProtectedRoute component

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Books Management</h1>
            <p className="text-lg text-brand-700">Manage your book collection</p>
          </div>

          {showForm ? (
            <BookForm
              book={editingBook || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-brand-900">All Books</h2>
                <button
                  onClick={handleAddBook}
                  className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Add New Book
                </button>
              </div>

              {isLoadingBooks ? (
                <div className="text-center py-12">
                  <div className="text-brand-600">Loading books...</div>
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-medium text-brand-900 mb-2">No books yet</h3>
                  <p className="text-brand-600 mb-6">Add your first book to get started</p>
                  <button
                    onClick={handleAddBook}
                    className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Add Your First Book
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-brand-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Cover</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Title</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Author</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Genre</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Price</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Inventory</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Status</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Featured</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr key={book._id} className="border-b border-brand-100 hover:bg-brand-50">
                            <td className="py-4 px-6">
                              <img 
                                src={book.coverImageUrl || '/bookhomepage.jpeg'} 
                                alt={book.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-medium text-brand-900">{book.title}</div>
                            </td>
                            <td className="py-4 px-6 text-brand-700">{book.author}</td>
                            <td className="py-4 px-6 text-brand-700">{book.genre || 'N/A'}</td>
                            <td className="py-4 px-6 font-medium text-brand-900">{formatCurrency(book.price)}</td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  book.inventory > 10 
                                    ? 'bg-green-100 text-green-800' 
                                    : book.inventory > 5 
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : book.inventory > 0
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {book.inventory || 0}
                                </span>
                                {book.inventory <= 5 && book.inventory > 0 && (
                                  <span className="text-xs text-red-600">Low Stock</span>
                                )}
                                {book.inventory === 0 && (
                                  <span className="text-xs text-gray-600">Out of Stock</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                book.status === 'Published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {book.status || 'Published'}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                book.featured 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {book.featured ? 'Featured' : 'Regular'}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleToggleFeatured(book._id, book.featured || false)}
                                  className={`text-sm font-medium ${
                                    book.featured 
                                      ? 'text-orange-600 hover:text-orange-700' 
                                      : 'text-brand-600 hover:text-brand-700'
                                  }`}
                                >
                                  {book.featured ? 'Unfeature' : 'Set Featured'}
                                </button>
                                <button
                                  onClick={() => handleEditBook(book)}
                                  className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteBook(book._id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      </div>
    </ProtectedRoute>
  )
}
