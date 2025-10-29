import { getFallbackData } from '@/data/fallbackData'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

// Server-side data fetching with caching and fallback
export async function getServerSideData(type: 'featured-book' | 'books' | 'blog' | 'reviews' | 'gallery') {
  try {
    let endpoint = ''
    switch (type) {
      case 'featured-book':
        endpoint = '/api/books/featured'
        break
      case 'books':
        endpoint = '/api/books'
        break
      case 'blog':
        endpoint = '/api/blog'
        break
      case 'reviews':
        endpoint = '/api/reviews'
        break
      case 'gallery':
        endpoint = '/api/gallery'
        break
    }

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add caching for better performance
      next: { 
        revalidate: 300, // Revalidate every 5 minutes
        tags: [type] // Cache tags for manual revalidation
      }
    })

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Return the appropriate data based on type
    switch (type) {
      case 'featured-book':
        return data.book || getFallbackData('featured-book')
      case 'books':
        return data.books?.length > 0 ? data.books : getFallbackData('books')
      case 'blog':
        return data.posts?.length > 0 ? data.posts : getFallbackData('blog')
      case 'reviews':
        return data.reviews?.length > 0 ? data.reviews : getFallbackData('reviews')
      case 'gallery':
        return data.images?.length > 0 ? data.images : getFallbackData('gallery')
      default:
        return null
    }
  } catch (error) {
    console.error(`Error fetching ${type} from backend:`, error)
    // Return fallback data when backend is unavailable
    return getFallbackData(type)
  }
}

// Client-side data fetching with SWR-like caching
export async function getClientSideData(type: 'featured-book' | 'books' | 'blog' | 'reviews' | 'gallery') {
  try {
    let endpoint = ''
    switch (type) {
      case 'featured-book':
        endpoint = '/api/books/featured'
        break
      case 'books':
        endpoint = '/api/books'
        break
      case 'blog':
        endpoint = '/api/blog'
        break
      case 'reviews':
        endpoint = '/api/reviews'
        break
      case 'gallery':
        endpoint = '/api/gallery'
        break
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Client-side caching
      cache: 'force-cache',
      next: { 
        revalidate: 300 // Revalidate every 5 minutes
      }
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Return the appropriate data based on type
    switch (type) {
      case 'featured-book':
        return data.book || getFallbackData('featured-book')
      case 'books':
        return data.books?.length > 0 ? data.books : getFallbackData('books')
      case 'blog':
        return data.posts?.length > 0 ? data.posts : getFallbackData('blog')
      case 'reviews':
        return data.reviews?.length > 0 ? data.reviews : getFallbackData('reviews')
      case 'gallery':
        return data.images?.length > 0 ? data.images : getFallbackData('gallery')
      default:
        return null
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error)
    // Return fallback data when API is unavailable
    return getFallbackData(type)
  }
}

// Manual revalidation function
export async function revalidateData(tag: string) {
  try {
    const response = await fetch(`/api/revalidate?tag=${tag}`, {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error('Failed to revalidate data')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error revalidating data:', error)
    throw error
  }
}
