'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'

interface Review {
  _id: string
  name: string
  text: string
  rating: number
  approved: boolean
  createdAt: string
}

export default function ReviewsManagementPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
    if (!isLoading && user && user.role !== 'admin') {
      router.replace('/dashboard')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setIsLoadingReviews(true)
      const res = await fetch('/api/reviews')
      const data = await res.json()
      setReviews(data.reviews || [])
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setIsLoadingReviews(false)
    }
  }

  const handleApproveReview = async (reviewId: string) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ approved: true })
      })
      
      if (res.ok) {
        setReviews(prev => prev.map(review => 
          review._id === reviewId ? { ...review, approved: true } : review
        ))
      }
    } catch (error) {
      console.error('Error approving review:', error)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      if (res.ok) {
        setReviews(prev => prev.filter(review => review._id !== reviewId))
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
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

  const pendingReviews = reviews.filter(review => !review.approved)
  const approvedReviews = reviews.filter(review => review.approved)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Reviews Management</h1>
            <p className="text-lg text-brand-700">Manage customer reviews</p>
          </div>

          {isLoadingReviews ? (
            <div className="text-center py-12">
              <div className="text-brand-600">Loading reviews...</div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Pending Reviews */}
              {pendingReviews.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif text-brand-900 mb-6">
                    Pending Reviews ({pendingReviews.length})
                  </h2>
                  <div className="space-y-4">
                    {pendingReviews.map((review) => (
                      <div key={review._id} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-brand-900">{review.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-sm text-brand-600">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            Pending
                          </span>
                        </div>
                        <p className="text-brand-700 mb-4">{review.text}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveReview(review._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved Reviews */}
              <div>
                <h2 className="text-2xl font-serif text-brand-900 mb-6">
                  Approved Reviews ({approvedReviews.length})
                </h2>
                {approvedReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <h3 className="text-lg font-medium text-brand-900 mb-2">No approved reviews yet</h3>
                    <p className="text-brand-600">Approved reviews will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {approvedReviews.map((review) => (
                      <div key={review._id} className="bg-white border border-brand-200 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-medium text-brand-900">{review.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-sm text-brand-600">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Approved
                          </span>
                        </div>
                        <p className="text-brand-700 mb-4">{review.text}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
