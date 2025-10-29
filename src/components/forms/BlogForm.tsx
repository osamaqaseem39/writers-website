'use client'

import { useRef, useState } from 'react'
import Markdown, { markdownToPlainText } from '@/components/Markdown'

interface BlogFormProps {
  post?: {
    _id?: string
    title: string
    content: string
    category?: string
    imageUrl?: string
    published?: boolean
    status?: string
  }
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function BlogForm({ post, onSubmit, onCancel, isLoading = false }: BlogFormProps) {
  // Determine published status from either published boolean or status string
  const getPublishedStatus = () => {
    if (post?.published !== undefined) return post.published
    if (post?.status) return post.status === 'Published'
    return true
  }
  
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    category: post?.category || 'General',
    imageUrl: post?.imageUrl || '',
    published: getPublishedStatus()
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const applyWrap = (before: string, after: string = before) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart || 0
    const end = el.selectionEnd || 0
    const value = formData.content
    const selected = value.slice(start, end)
    const next = value.slice(0, start) + before + selected + after + value.slice(end)
    setFormData({ ...formData, content: next })
    requestAnimationFrame(() => {
      el.focus()
      const cursor = start + before.length + selected.length + after.length
      el.setSelectionRange(cursor, cursor)
    })
  }

  const insertAtCursor = (snippet: string) => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart || 0
    const end = el.selectionEnd || 0
    const value = formData.content
    const next = value.slice(0, start) + snippet + value.slice(end)
    setFormData({ ...formData, content: next })
    requestAnimationFrame(() => {
      el.focus()
      const cursor = start + snippet.length
      el.setSelectionRange(cursor, cursor)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalImageUrl = formData.imageUrl
    
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
      imageUrl: finalImageUrl
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
        {post ? 'Edit Blog Post' : 'Add New Blog Post'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Post Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              placeholder="e.g., Writing Tips, Book Reviews"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">
              Status
            </label>
            <select
              value={formData.published ? 'Published' : 'Draft'}
              onChange={(e) => setFormData({ ...formData, published: e.target.value === 'Published' })}
              className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Content (Markdown) *
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            <button type="button" onClick={() => applyWrap('**')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Bold</button>
            <button type="button" onClick={() => applyWrap('*')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Italic</button>
            <button type="button" onClick={() => applyWrap('~~')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Strike</button>
            <button type="button" onClick={() => insertAtCursor('\n# ')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">H1</button>
            <button type="button" onClick={() => insertAtCursor('\n## ')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">H2</button>
            <button type="button" onClick={() => insertAtCursor('\n- ')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">List</button>
            <button type="button" onClick={() => insertAtCursor('\n> ')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Quote</button>
            <button type="button" onClick={() => applyWrap('`')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Code</button>
            <button type="button" onClick={() => applyWrap('[', '](https://)')} className="px-3 py-1 text-sm border border-brand-200 rounded bg-white hover:bg-brand-50">Link</button>
          </div>
          <textarea
            ref={textareaRef}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            className="w-full border border-brand-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-mono"
            placeholder="Write your blog post in Markdown..."
            required
          />
          <div className="mt-4">
            <div className="text-sm text-brand-600 mb-2">Preview</div>
            <div className="prose max-w-none prose-headings:font-serif prose-p:leading-7">
              <Markdown markdown={formData.content} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-2">
            Featured Image
          </label>
          <div className="space-y-4">
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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

        {formData.imageUrl && (
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">
              Image Preview
            </label>
            <img
              src={formData.imageUrl}
              alt="Featured image preview"
              className="w-48 h-32 object-cover rounded border border-brand-200"
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
            {isLoading || isUploading ? 'Saving...' : (post ? 'Update Post' : 'Add Post')}
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
