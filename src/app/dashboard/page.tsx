'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
// import { useWishlist } from '@/contexts/WishlistContext'

interface DashboardTab {
  id: string
  name: string
  icon: string
}

interface Order {
  _id: string
  items: Array<{
    book: {
      _id: string
      title: string
      author: string
      coverImageUrl: string
    }
    title: string
    price: number
    quantity: number
  }>
  totalAmount: number
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  // Temporarily disable wishlist to isolate the issue
  const wishlistItems: any[] = []
  const removeFromWishlist = (id: string) => {}
  
  // All state declarations must be at the top level
  const [activeTab, setActiveTab] = useState('overview')
  const [books, setBooks] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [isGalleryLoading, setIsGalleryLoading] = useState(false)
  const [newImage, setNewImage] = useState({ title: '', description: '', src: '', status: 'Published' })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  // Edit states
  const [editingBook, setEditingBook] = useState<any>(null)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [editingImage, setEditingImage] = useState<any>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({ name: '', email: '' })

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
    // Remove the redirect for customers - let them access the dashboard
  }, [user, isLoading, router])

  // Load customer orders
  useEffect(() => {
    const loadOrders = async () => {
      if (user && user.role !== 'admin') {
        setIsLoadingOrders(true)
        try {
          const token = localStorage.getItem('token')
          if (token) {
            const res = await fetch('/api/orders', {
              headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
              const data = await res.json()
              setOrders(data.orders || [])
            } else {
              console.warn('Failed to load orders:', res.status)
            }
          }
        } catch (error) {
          console.error('Error loading orders:', error)
        } finally {
          setIsLoadingOrders(false)
        }
      }
    }
    
    // Only load orders if user is available and not admin
    if (user && user.role !== 'admin') {
      loadOrders()
    }
  }, [user])

  // Initialize profile data
  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email })
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Loading...</div>
      </div>
    )
  }

  useEffect(() => {
    const loadGallery = async () => {
      setIsGalleryLoading(true)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/gallery/admin', {
          headers: token ? { Authorization: `Bearer ${token}` } as any : undefined
        })
        const data = await res.json()
        setGalleryImages(data.images || [])
      } catch {
        setGalleryImages([])
      } finally {
        setIsGalleryLoading(false)
      }
    }
    if (activeTab === 'gallery') loadGallery()
  }, [activeTab])

  const adminTabs: DashboardTab[] = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'blog', name: 'Blog', icon: '✍️' },
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'orders', name: 'Orders', icon: '🛒' }
  ]

  const customerTabs: DashboardTab[] = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'orders', name: 'My Orders', icon: '🛒' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' }
  ]

  const tabs = user.role === 'admin' ? adminTabs : customerTabs

  useEffect(() => {
    // Load initial data for books, reviews, blog
    const loadInitial = async () => {
      try {
        const [booksRes, reviewsRes, blogRes] = await Promise.all([
          fetch('/api/books'),
          fetch('/api/reviews'),
          fetch('/api/blog')
        ])
        const [booksJson, reviewsJson, blogJson] = await Promise.all([
          booksRes.json(),
          reviewsRes.json(),
          blogRes.json()
        ])
        setBooks((booksJson?.books || []).map((b: any) => ({
          id: b._id,
          title: b.title,
          author: b.author,
          price: b.price,
          status: b.status || 'Published',
          sales: 0,
          revenue: 0,
          coverImage: b.coverImageUrl || '/bookhomepage.jpeg'
        })))
        setReviews(reviewsJson?.reviews || [])
        setBlogPosts((blogJson?.posts || []).map((p: any) => ({
          id: p._id,
          title: p.title,
          category: p.category || 'General',
          date: p.createdAt ? new Date(p.createdAt).toDateString() : '',
          status: p.published ? 'Published' : 'Draft',
          views: p.views || 0
        })))
      } catch {
        setBooks([])
        setReviews([])
        setBlogPosts([])
      }
    }
    loadInitial()
  }, [])

  const totalRevenue = books.reduce((sum, book) => sum + (book.revenue || 0), 0)
  const totalSales = books.reduce((sum, book) => sum + (book.sales || 0), 0)
  const pendingReviews = reviews.filter((review: any) => !review.approved).length
  const draftPosts = blogPosts.filter((post: any) => post.status === 'Draft').length

  // Customer-specific calculations
  const totalOrders = orders.length
  const totalBooksPurchased = orders.reduce((sum, order) => 
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  )
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const wishlistCount = wishlistItems.length

  // CRUD Functions
  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } as any : {}
      })
      if (res.ok) {
        setBooks(prev => prev.filter(book => book.id !== bookId))
      }
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  const handleEditBook = async (book: any) => {
    const title = prompt('Book title', book.title) || book.title
    const author = prompt('Author', book.author) || book.author
    const priceStr = prompt('Price', book.price.toString()) || book.price.toString()
    const price = parseFloat(priceStr) || book.price
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ title, author, price })
      })
      if (res.ok) {
        setBooks(prev => prev.map(b => b.id === book.id ? { ...b, title, author, price } : b))
      }
    } catch (error) {
      console.error('Error updating book:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } as any : {}
      })
      if (res.ok) {
        setBlogPosts(prev => prev.filter(post => post.id !== postId))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleEditPost = async (post: any) => {
    const title = prompt('Post title', post.title) || post.title
    const content = prompt('Content', post.content || '') || post.content || ''
    const category = prompt('Category', post.category) || post.category
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ title, content, category })
      })
      if (res.ok) {
        setBlogPosts(prev => prev.map(p => p.id === post.id ? { ...p, title, content, category } : p))
      }
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } as any : {}
      })
      if (res.ok) {
        setGalleryImages(prev => prev.filter(img => img._id !== imageId))
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleEditImage = async (image: any) => {
    const title = prompt('Image title', image.title) || image.title
    const description = prompt('Description', image.description) || image.description
    const status = confirm('Published? (Cancel for Draft)') ? 'Published' : 'Draft'
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/gallery/${image._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ title, description, status })
      })
      if (res.ok) {
        setGalleryImages(prev => prev.map(img => img._id === image._id ? { ...img, title, description, status } : img))
      }
    } catch (error) {
      console.error('Error updating image:', error)
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
        setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, approved: true } : r))
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
        headers: token ? { Authorization: `Bearer ${token}` } as any : {}
      })
      if (res.ok) {
        setReviews(prev => prev.filter(r => r._id !== reviewId))
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">
              {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
            </h1>
            <p className="text-lg text-brand-700">
              {user.role === 'admin' 
                ? 'Manage your content and ecommerce' 
                : 'Welcome back! View your orders and account information'
              }
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-brand-200 rounded-2xl p-2 mb-8">
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
                {user.role === 'admin' ? (
                  <>
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
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
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
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
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
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
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
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
                  </>
                ) : (
                  <>
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-brand-600">Total Orders</p>
                          <p className="text-2xl font-bold text-brand-900">{totalOrders}</p>
                        </div>
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🛒</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-brand-600">Books Purchased</p>
                          <p className="text-2xl font-bold text-brand-900">{totalBooksPurchased}</p>
                        </div>
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">📚</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-brand-600">Wishlist Items</p>
                          <p className="text-2xl font-bold text-brand-900">{wishlistCount}</p>
                        </div>
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">❤️</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-brand-600">Total Spent</p>
                          <p className="text-2xl font-bold text-brand-900">${totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">💰</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-brand-200 rounded-2xl p-8">
                <h3 className="text-xl font-serif text-brand-900 mb-6">Recent Activity</h3>
                <div className="text-brand-600">
                  {user.role === 'admin' 
                    ? 'No recent activity.' 
                    : 'Welcome! Start by browsing our books or creating an account.'
                  }
                </div>
              </div>
            </div>
          )}

          {/* Customer Profile Tab */}
          {activeTab === 'profile' && user.role !== 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={isEditingProfile ? profileData.name : user.name} 
                      onChange={isEditingProfile ? (e) => setProfileData({...profileData, name: e.target.value}) : undefined}
                      className={`w-full border border-brand-200 rounded-lg px-3 py-2 ${isEditingProfile ? 'bg-white' : 'bg-gray-50'}`}
                      readOnly={!isEditingProfile}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      value={isEditingProfile ? profileData.email : user.email} 
                      onChange={isEditingProfile ? (e) => setProfileData({...profileData, email: e.target.value}) : undefined}
                      className={`w-full border border-brand-200 rounded-lg px-3 py-2 ${isEditingProfile ? 'bg-white' : 'bg-gray-50'}`}
                      readOnly={!isEditingProfile}
                    />
                  </div>
                </div>
                <div className="pt-4 flex space-x-4">
                  {!isEditingProfile ? (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={async () => {
                          // Here you would typically make an API call to update the profile
                          // For now, we'll just update the local state
                          setIsEditingProfile(false)
                          // You could add a success message here
                        }}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditingProfile(false)
                          setProfileData({ name: user.name, email: user.email })
                        }}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customer Wishlist Tab */}
          {activeTab === 'wishlist' && user.role !== 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">My Wishlist</h3>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h4 className="text-lg font-medium text-brand-900 mb-2">Your wishlist is empty</h4>
                  <p className="text-brand-600 mb-6">Add books to your wishlist to save them for later</p>
                  <a 
                    href="/books" 
                    className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors inline-block"
                  >
                    Browse Books
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border border-brand-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-brand-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-brand-600 mb-2">by {item.author}</p>
                        <p className="text-lg font-bold text-brand-700 mb-3">${item.price}</p>
                        <div className="flex space-x-2">
                          <a 
                            href={`/book/${item.id}`}
                            className="flex-1 bg-brand-500 text-white px-4 py-2 rounded text-center hover:bg-brand-600 transition-colors"
                          >
                            View Details
                          </a>
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Books Tab - Admin Only */}
          {activeTab === 'books' && user.role === 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Books Management</h3>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem('token')
                    // demo create using external upload if file chosen via prompt
                    const title = prompt('Book title') || ''
                    const author = prompt('Author') || ''
                    const priceStr = prompt('Price') || '0'
                    const filePick = confirm('Upload cover image from your computer? Click Cancel to paste a URL')
                    let coverImageUrl = ''
                    if (filePick) {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      const file = await new Promise<File | null>((resolve) => {
                        input.onchange = () => resolve(input.files?.[0] || null)
                        input.click()
                      })
                      if (file) {
                        const fd = new FormData()
                        fd.append('file', file)
                        const up = await fetch('https://ns.osamaqaseem.online/upload.php', { method: 'POST', body: fd })
                        const upJson = await up.json()
                        if (up.ok && upJson?.url) coverImageUrl = upJson.url
                      }
                    } else {
                      coverImageUrl = prompt('Paste image URL (optional)') || ''
                    }
                    const price = parseFloat(priceStr) || 0
                    if (!title || !author || !price) return
                    const res = await fetch('/api/books/admin', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                      },
                      body: JSON.stringify({ title, author, price, coverImageUrl })
                    })
                    const data = await res.json()
                    if (res.ok && data.book) {
                      setBooks((prev) => [
                        { id: data.book._id, title: data.book.title, author: data.book.author, price: data.book.price, status: data.book.status || 'Published', sales: 0, revenue: 0, coverImage: data.book.coverImageUrl || '/bookhomepage.jpeg' },
                        ...prev
                      ])
                    }
                  }}
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
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
                    {books.map((book: any) => (
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
                        <td className="py-3 px-4">${(book.revenue || 0).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {book.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditBook(book)}
                              className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                            <button 
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab - Admin Only */}
          {activeTab === 'reviews' && user.role === 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">Reviews Management</h3>
              <div className="space-y-4">
                {reviews.map((review: any) => (
                  <div key={review._id || review.id} className="border border-brand-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium text-brand-900">{review.name}</h4>
                        <div className="flex items-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-brand-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          {review.createdAt && (
                            <span className="text-sm text-brand-600">{new Date(review.createdAt).toDateString()}</span>
                          )}
                        </div>
                      </div>
                      {typeof review.approved === 'boolean' && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          review.approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.approved ? 'Approved' : 'Pending'}
                        </span>
                      )}
                    </div>
                    <p className="text-brand-700 mb-4">{review.text}</p>
                    <div className="flex space-x-2">
                      {!review.approved && (
                        <button 
                          onClick={() => handleApproveReview(review._id || review.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteReview(review._id || review.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Tab - Admin Only */}
          {activeTab === 'blog' && user.role === 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Blog Management</h3>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem('token')
                    const title = prompt('Post title') || ''
                    const content = prompt('Content') || ''
                    const category = prompt('Category (optional)') || ''
                    const filePick = confirm('Upload featured image from your computer? Click Cancel to paste a URL')
                    let imageUrl = ''
                    if (filePick) {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      const file = await new Promise<File | null>((resolve) => {
                        input.onchange = () => resolve(input.files?.[0] || null)
                        input.click()
                      })
                      if (file) {
                        const fd = new FormData()
                        fd.append('file', file)
                        const up = await fetch('https://ns.osamaqaseem.online/upload.php', { method: 'POST', body: fd })
                        const upJson = await up.json()
                        if (up.ok && upJson?.url) imageUrl = upJson.url
                      }
                    } else {
                      imageUrl = prompt('Paste image URL (optional)') || ''
                    }
                    if (!title || !content) return
                    const res = await fetch('/api/blog/admin', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                      },
                      body: JSON.stringify({ title, content, category, imageUrl, published: true })
                    })
                    const data = await res.json()
                    if (res.ok && data.post) {
                      setBlogPosts((prev) => [
                        { id: data.post._id, title: data.post.title, category: data.post.category || 'General', date: new Date(data.post.createdAt).toDateString(), status: data.post.published ? 'Published' : 'Draft', views: 0 },
                        ...prev
                      ])
                    }
                  }}
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                  New Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post: any) => (
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
                        <span className={`${post.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded-full text-xs`}>
                          {post.status}
                        </span>
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab - Admin Only */}
          {activeTab === 'gallery' && user.role === 'admin' && (
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-brand-900">Gallery Management</h3>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem('token')
                    if (!newImage.title || (!newImage.src && !uploadFile)) return

                    // If a file is provided, upload it to the external uploader first
                    let finalSrc = newImage.src
                    if (uploadFile) {
                      try {
                        setIsUploading(true)
                        const formData = new FormData()
                        formData.append('file', uploadFile)
                        const uploadResp = await fetch('https://ns.osamaqaseem.online/upload.php', {
                          method: 'POST',
                          body: formData
                        })
                        const uploadJson = await uploadResp.json()
                        if (!uploadResp.ok || !uploadJson?.url) {
                          setIsUploading(false)
                          return
                        }
                        finalSrc = uploadJson.url
                      } catch {
                        setIsUploading(false)
                        return
                      } finally {
                        setIsUploading(false)
                      }
                    }

                    const res = await fetch('/api/gallery/admin', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                      },
                      body: JSON.stringify({ ...newImage, src: finalSrc })
                    })
                    const data = await res.json()
                    if (res.ok && data.image) {
                      setGalleryImages((prev) => [data.image, ...prev])
                      setNewImage({ title: '', description: '', src: '', status: 'Published' })
                      setUploadFile(null)
                    }
                  }}
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  placeholder="Title"
                  className="border border-brand-200 rounded-lg px-3 py-2"
                />
                <input
                  value={newImage.src}
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                  placeholder="Image URL"
                  className="border border-brand-200 rounded-lg px-3 py-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="border border-brand-200 rounded-lg px-3 py-2"
                />
                <input
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                  placeholder="Description"
                  className="border border-brand-200 rounded-lg px-3 py-2"
                />
                <select
                  value={newImage.status}
                  onChange={(e) => setNewImage({ ...newImage, status: e.target.value })}
                  className="border border-brand-200 rounded-lg px-3 py-2"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isGalleryLoading && <div className="text-brand-600">Loading...</div>}
                {!isGalleryLoading && galleryImages.map((image) => (
                  <div key={image._id} className="border border-brand-200 rounded-lg overflow-hidden">
                    <img src={image.src} alt={image.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="font-medium text-brand-900 mb-2">{image.title}</h4>
                      <p className="text-sm text-brand-600 mb-3">{image.description}</p>
                      <div className="flex justify-between items-center">
                        <span className={`${image.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded-full text-xs`}>
                          {image.status}
                        </span>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditImage(image)}
                            className="text-brand-600 hover:text-brand-700 text-sm">Edit</button>
                          <button 
                            onClick={() => handleDeleteImage(image._id)}
                            className="text-red-600 hover:text-red-700 text-sm">Delete</button>
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
            <div className="bg-white border border-brand-200 rounded-2xl p-8">
              <h3 className="text-xl font-serif text-brand-900 mb-6">
                {user.role === 'admin' ? 'Orders Management' : 'My Orders'}
              </h3>
              {user.role === 'admin' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h4 className="text-lg font-medium text-brand-900 mb-2">No orders yet</h4>
                  <p className="text-brand-600">Orders will appear here when customers make purchases</p>
                </div>
              ) : (
                <>
                  {isLoadingOrders ? (
                    <div className="text-center py-12">
                      <div className="text-brand-600">Loading orders...</div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🛒</span>
                      </div>
                      <h4 className="text-lg font-medium text-brand-900 mb-2">You have no orders yet</h4>
                      <p className="text-brand-600 mb-6">Start shopping to see your orders here</p>
                      <a 
                        href="/books" 
                        className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors inline-block"
                      >
                        Browse Books
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-brand-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-medium text-brand-900">Order #{order._id.slice(-8)}</h4>
                              <p className="text-sm text-brand-600">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-brand-900">${order.totalAmount.toFixed(2)}</p>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'Completed' ? 'bg-purple-100 text-purple-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded">
                                <img 
                                  src={item.book.coverImageUrl || '/bookhomepage.jpeg'} 
                                  alt={item.title}
                                  className="w-12 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-brand-900">{item.title}</h5>
                                  <p className="text-sm text-brand-600">by {item.book.author}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-brand-900">${item.price.toFixed(2)}</p>
                                  <p className="text-sm text-brand-600">Qty: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}