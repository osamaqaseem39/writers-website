'use client'

import { useState } from 'react'

interface GalleryFormProps {
  image?: {
    _id?: string
    title: string
    description: string
    src: string
    status: string
  }
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function GalleryForm({ image, onSubmit, onCancel, isLoading = false }: GalleryFormProps) {
  const [formData, setFormData] = useState({
    title: image?.title || '',
    description: image?.description || '',
    src: image?.src || '',
    status: image?.status || 'Published'
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalSrc = formData.src
    
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
          finalSrc = uploadJson.url
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
      src: finalSrc
    })
  }

  return (
    <div className="bg-white border border-brand-200 rounded-2xl p-8">
      <div className="mb-4 flex items-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-brand-600 hover:text-brand-700 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>
      </div>
      <h2 className="text-2xl font-serif text-brand-900 mb-6">
        {image ? 'Edit Gallery Image' : 'Add New Gallery Image'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Image Title *
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
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            placeholder="Describe this image..."
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
            Image
          </label>
          <div className="space-y-4">
            <input
              type="url"
              value={formData.src}
              onChange={(e) => setFormData({ ...formData, src: e.target.value })}
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
        </div>

        {formData.src && (
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">
              Image Preview
            </label>
            <img
              src={formData.src}
              alt="Gallery image preview"
              className="w-64 h-48 object-cover rounded border border-brand-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || isUploading ? 'Saving...' : (image ? 'Update Image' : 'Add Image')}
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
