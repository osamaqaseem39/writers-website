'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import BookForm from '@/components/forms/BookForm'

interface Book {
  _id: string
  title: string
  author: string
  price: number
  coverImageUrl?: string
  status?: string
  sales?: number
  revenue?: number
}

export default function BooksManagementPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoadingBooks, setIsLoadingBooks] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
    if (!isLoading && user && user.role !== 'admin') {
      router.replace('/dashboard')
    }
  }, [user, isLoading, router])

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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Loading...</div>
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Access denied</div>
      </div>
    )
  }

  return (
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
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Price</th>
                          <th className="text-left py-4 px-6 font-medium text-brand-700">Status</th>
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
                            <td className="py-4 px-6 font-medium text-brand-900">${book.price.toFixed(2)}</td>
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
                              <div className="flex space-x-2">
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
  )
}
