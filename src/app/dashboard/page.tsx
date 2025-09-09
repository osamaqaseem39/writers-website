'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardTab {
  id: string
  name: string
  icon: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 flex items-center justify-center">
        <div className="text-brand-700">Loading...</div>
      </div>
    )
  }
  const [activeTab, setActiveTab] = useState('overview')
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "You Never Cried",
      author: "Nawa Sohail",
      price: 24.99,
      status: "Published",
      sales: 156,
      revenue: 3894.44,
      coverImage: "/bookhomepage.jpeg"
    }
  ])
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sourath",
      rating: 5,
      text: "Do you believe in love? A question that's been asked throughout the annals of history of love...",
      date: "2024-12-15",
      approved: true
    },
    {
      id: 2,
      name: "Hassan Ali",
      rating: 5,
      text: "Amazing portrayal of emotions. I literally felt every part of it...",
      date: "2024-12-14",
      approved: false
    }
  ])
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "The Art of Storytelling in the Digital Age",
      category: "Writing Tips",
      date: "Dec 15, 2024",
      status: "Published",
      views: 1250
    },
    {
      id: 2,
      title: "Finding Inspiration in Everyday Moments",
      category: "Inspiration",
      date: "Dec 10, 2024",
      status: "Draft",
      views: 0
    }
  ])
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      src: "/gallery1.jpeg",
      title: "Gallery Image 1",
      description: "Behind the scenes moment",
      status: "Published"
    },
    {
      id: 2,
      src: "/gallery2.jpeg",
      title: "Gallery Image 2", 
      description: "Behind the scenes moment",
      status: "Draft"
    }
  ])

  const tabs: DashboardTab[] = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'blog', name: 'Blog', icon: '✍️' },
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'orders', name: 'Orders', icon: '🛒' }
  ]

  const totalRevenue = books.reduce((sum, book) => sum + book.revenue, 0)
  const totalSales = books.reduce((sum, book) => sum + book.sales, 0)
  const pendingReviews = reviews.filter(review => !review.approved).length
  const draftPosts = blogPosts.filter(post => post.status === 'Draft').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Dashboard</h1>
            <p className="text-lg text-brand-700">Manage your content and ecommerce</p>
          </div>

          {/* Tabs */}
          <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-500 text-white'
                      : 'text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brand-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-brand-900">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brand-600">Total Sales</p>
                      <p className="text-2xl font-bold text-brand-900">{totalSales}</p>
                    </div>
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brand-600">Pending Reviews</p>
                      <p className="text-2xl font-bold text-brand-900">{pendingReviews}</p>
                    </div>
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">⭐</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-brand-600">Draft Posts</p>
                      <p className="text-2xl font-bold text-brand-900">{draftPosts}</p>
                    </div>
                    <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✍️</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
                <h3 className="text-xl font-serif text-brand-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-brand-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-900">New sale: You Never Cried</p>
                      <p className="text-sm text-brand-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-brand-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">⭐</span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-900">New review from Hassan Ali</p>
                      <p className="text-sm text-brand-600">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-brand-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">✍️</span>
                    </div>
                    <div>
                      <p className="font-medium text-brand-900">Blog post published</p>
                      <p className="text-sm text-brand-600">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Books Tab */}
          {activeTab === 'books' && (
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Books Management</h3>
                <button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                  Add New Book
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-200">
                      <th className="text-left py-3 px-4">Cover</th>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Sales</th>
                      <th className="text-left py-3 px-4">Revenue</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id} className="border-b border-brand-100">
                        <td className="py-3 px-4">
                          <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded" />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-brand-900">{book.title}</p>
                            <p className="text-sm text-brand-600">{book.author}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">${book.price}</td>
                        <td className="py-3 px-4">{book.sales}</td>
                        <td className="py-3 px-4">${book.revenue.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {book.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                            <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">Reviews Management</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-brand-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-brand-900">{review.name}</h4>
                        <div className="flex items-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-brand-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-brand-600">{review.date}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        review.approved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-brand-700 mb-4">{review.text}</p>
                    <div className="flex space-x-2">
                      {!review.approved && (
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                          Approve
                        </button>
                      )}
                      <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Blog Management</h3>
                <button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                  New Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border border-brand-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-brand-900 mb-2">{post.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-brand-600">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          post.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <button className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Gallery Management</h3>
                <button className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                  Upload Image
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <div key={image.id} className="border border-brand-200 rounded-lg overflow-hidden">
                    <img src={image.src} alt={image.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-medium text-brand-900 mb-2">{image.title}</h4>
                      <p className="text-sm text-brand-600 mb-3">{image.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          image.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {image.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">Orders Management</h3>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <h4 className="text-lg font-medium text-brand-900 mb-2">No orders yet</h4>
                <p className="text-brand-600">Orders will appear here when customers make purchases</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}