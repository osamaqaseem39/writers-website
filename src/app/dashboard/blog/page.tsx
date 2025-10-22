'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import BlogForm from '@/components/forms/BlogForm'
import ProtectedRoute from '@/components/ProtectedRoute'

interface BlogPost {
  _id: string
  title: string
  content: string
  category?: string
  imageUrl?: string
  published: boolean
  createdAt: string
  views?: number
}

export default function BlogManagementPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Authentication is now handled by ProtectedRoute component

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setIsLoadingPosts(true)
      const res = await fetch('/api/blog')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setIsLoadingPosts(false)
    }
  }

  const handleAddPost = () => {
    setEditingPost(null)
    setShowForm(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      if (res.ok) {
        setPosts(prev => prev.filter(post => post._id !== postId))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      
      const url = editingPost ? `/api/blog/${editingPost._id}` : '/api/blog/admin'
      const method = editingPost ? 'PUT' : 'POST'
      
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
        if (editingPost) {
          setPosts(prev => prev.map(post => 
            post._id === editingPost._id ? { ...post, ...formData } : post
          ))
        } else {
          setPosts(prev => [data.post, ...prev])
        }
        setShowForm(false)
        setEditingPost(null)
      }
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingPost(null)
  }

  // Authentication and admin checks are now handled by ProtectedRoute component

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Blog Management</h1>
            <p className="text-lg text-brand-700">Manage your blog posts</p>
          </div>

          {showForm ? (
            <BlogForm
              post={editingPost || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-brand-900">All Posts</h2>
                <button
                  onClick={handleAddPost}
                  className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Add New Post
                </button>
              </div>

              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <div className="text-brand-600">Loading posts...</div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h3 className="text-lg font-medium text-brand-900 mb-2">No posts yet</h3>
                  <p className="text-brand-600 mb-6">Create your first blog post</p>
                  <button
                    onClick={handleAddPost}
                    className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Write Your First Post
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post._id} className="bg-white border border-brand-200 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-brand-900 mb-2">{post.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-brand-600 mb-3">
                            <span>{post.category || 'General'}</span>
                            <span>•</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{post.views || 0} views</span>
                          </div>
                          <p className="text-brand-700 line-clamp-3">
                            {post.content.substring(0, 200)}...
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            post.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      
                      {post.imageUrl && (
                        <div className="mb-4">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-32 h-20 object-cover rounded"
                          />
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
