'use client'

import { useState } from 'react'
import { formatCurrency } from '@/utils/currency'

interface BookFormProps {
  book?: {
    _id?: string
    title: string
    author: string
    price: number
    coverImageUrl?: string
    status?: string
    featured?: boolean
    genre?: string
    year?: string
    pages?: number
    rating?: number
    reviews?: number
    isbn?: string
    language?: string
    readingTime?: string
    publisher?: string
    publishDate?: string
    description?: string
    fullDescription?: string
    inventory?: number
  }
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function BookForm({ book, onSubmit, onCancel, isLoading = false }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    price: book?.price || 0,
    coverImageUrl: book?.coverImageUrl || '',
    status: book?.status || 'Published',
    featured: book?.featured || false,
    genre: book?.genre || '',
    year: book?.year || '',
    pages: book?.pages || '',
    rating: book?.rating || '',
    reviews: book?.reviews || '',
    isbn: book?.isbn || '',
    language: book?.language || '',
    readingTime: book?.readingTime || '',
    publisher: book?.publisher || '',
    publishDate: book?.publishDate || '',
    description: book?.description || '',
    fullDescription: book?.fullDescription || '',
    inventory: book?.inventory || 100
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalImageUrl = formData.coverImageUrl
    
    // If a file is uploaded, upload it first
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
        if (uploadResp.ok && uploadJson?.url) {
          finalImageUrl = uploadJson.url
        }
      } catch (error) {
        console.error('Upload failed:', error)
        return
      } finally {
        setIsUploading(false)
      }
    }

    await onSubmit({
      ...formData,
      coverImageUrl: finalImageUrl
    })
  }

  return (
    <div className="bg-white border border-brand-200 rounded-2xl p-8">
      <h2 className="text-2xl font-serif text-brand-900 mb-6">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-brand-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Price (PKR) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Genre
              </label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="e.g., Contemporary Fiction, Romance, Mystery"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Inventory
              </label>
              <input
                type="number"
                min="0"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) || 0 })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-brand-600 border-brand-300 rounded focus:ring-brand-500"
              />
              <span className="text-sm font-medium text-brand-700">
                Set as Featured Book (only one book can be featured at a time)
              </span>
            </label>
          </div>
        </div>

        {/* Book Details */}
        <div className="bg-brand-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Book Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Year Published
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2024"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Number of Pages
              </label>
              <input
                type="number"
                min="1"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) || 0 })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Reading Time
              </label>
              <input
                type="text"
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                placeholder="e.g., 7 hours, 5-6 hours"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Language
              </label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="e.g., English, Urdu"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Publisher
              </label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                placeholder="e.g., Daastan, Penguin"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Publish Date
              </label>
              <input
                type="text"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                placeholder="e.g., 08 Oct 2024"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                ISBN
              </label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                placeholder="e.g., 978-969-696-969-3"
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Number of Reviews
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) || 0 })}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-brand-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Book Descriptions</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Short Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="A brief description of the book (2-3 sentences)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Full Description
              </label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                rows={6}
                className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                placeholder="A detailed description of the book, including themes, setting, and what readers can expect"
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-brand-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Cover Image</h3>
          <div className="space-y-4">
            <input
              type="url"
              value={formData.coverImageUrl}
              onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
              placeholder="Enter image URL"
              className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            <div className="text-center text-brand-600">OR</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
            {uploadFile && (
              <p className="text-sm text-brand-600">
                Selected: {uploadFile.name}
              </p>
            )}
          </div>

          {formData.coverImageUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Preview
              </label>
              <img
                src={formData.coverImageUrl}
                alt="Cover preview"
                className="w-32 h-40 object-cover rounded border border-brand-200"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || isUploading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
