'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import GalleryForm from '@/components/forms/GalleryForm'
import ProtectedRoute from '@/components/ProtectedRoute'

interface GalleryImage {
  _id: string
  title: string
  description: string
  src: string
  status: string
  createdAt: string
}

export default function GalleryManagementPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Authentication is now handled by ProtectedRoute component

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      setIsLoadingImages(true)
      const token = localStorage.getItem('token')
      const res = await fetch('/api/gallery/admin', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      const data = await res.json()
      setImages(data.images || [])
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setIsLoadingImages(false)
    }
  }

  const handleAddImage = () => {
    setEditingImage(null)
    setShowForm(true)
  }

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image)
    setShowForm(true)
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      if (res.ok) {
        setImages(prev => prev.filter(image => image._id !== imageId))
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      
      const url = editingImage ? `/api/gallery/${editingImage._id}` : '/api/gallery/admin'
      const method = editingImage ? 'PUT' : 'POST'
      
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
        if (editingImage) {
          setImages(prev => prev.map(image => 
            image._id === editingImage._id ? { ...image, ...formData } : image
          ))
        } else {
          setImages(prev => [data.image, ...prev])
        }
        setShowForm(false)
        setEditingImage(null)
      }
    } catch (error) {
      console.error('Error saving image:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingImage(null)
  }

  // Authentication and admin checks are now handled by ProtectedRoute component

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Gallery Management</h1>
            <p className="text-lg text-brand-700">Manage your gallery images</p>
          </div>

          {showForm ? (
            <GalleryForm
              image={editingImage || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-brand-900">All Images</h2>
                <button
                  onClick={handleAddImage}
                  className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Add New Image
                </button>
              </div>

              {isLoadingImages ? (
                <div className="text-center py-12">
                  <div className="text-brand-600">Loading images...</div>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <h3 className="text-lg font-medium text-brand-900 mb-2">No images yet</h3>
                  <p className="text-brand-600 mb-6">Add your first gallery image</p>
                  <button
                    onClick={handleAddImage}
                    className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                  >
                    Add Your First Image
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <div key={image._id} className="bg-white border border-brand-200 rounded-2xl overflow-hidden">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium text-brand-900 mb-2">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-brand-600 mb-3 line-clamp-2">{image.description}</p>
                        )}
                        <div className="flex justify-between items-center mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            image.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {image.status}
                          </span>
                          <span className="text-xs text-brand-500">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditImage(image)}
                            className="flex-1 bg-brand-500 text-white px-3 py-2 rounded text-sm hover:bg-brand-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteImage(image._id)}
                            className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
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
