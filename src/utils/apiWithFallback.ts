import { getFallbackData } from '@/data/fallbackData'

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  isFallback: boolean
}

/**
 * Generic function to make API calls with fallback data
 * @param url - API endpoint URL
 * @param fallbackType - Type of fallback data to use
 * @param options - Fetch options
 * @returns Promise with data, error, and fallback status
 */
export async function apiCallWithFallback<T>(
  url: string,
  fallbackType: 'featured-book' | 'books' | 'blog' | 'gallery' | 'reviews',
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return {
      data: data.book || data.books || data.posts || data.images || data.reviews || data,
      error: null,
      isFallback: false,
    }
  } catch (error) {
    console.error(`API call failed for ${url}:`, error)
    
    // Return fallback data
    const fallbackData = getFallbackData(fallbackType)
    return {
      data: fallbackData as T,
      error: `Failed to fetch data - using fallback: ${error instanceof Error ? error.message : 'Unknown error'}`,
      isFallback: true,
    }
  }
}

/**
 * Specific function for fetching featured book with fallback
 */
export async function fetchFeaturedBookWithFallback() {
  return apiCallWithFallback(
    '/api/books/featured',
    'featured-book'
  )
}

/**
 * Specific function for fetching all books with fallback
 */
export async function fetchBooksWithFallback() {
  return apiCallWithFallback(
    '/api/books',
    'books'
  )
}

/**
 * Specific function for fetching blog posts with fallback
 */
export async function fetchBlogPostsWithFallback() {
  return apiCallWithFallback(
    '/api/blog',
    'blog'
  )
}

/**
 * Specific function for fetching gallery images with fallback
 */
export async function fetchGalleryImagesWithFallback() {
  return apiCallWithFallback(
    '/api/gallery',
    'gallery'
  )
}

/**
 * Specific function for fetching reviews with fallback
 */
export async function fetchReviewsWithFallback() {
  return apiCallWithFallback(
    '/api/reviews',
    'reviews'
  )
}

/**
 * Hook-like function to handle loading states with fallback
 */
export function useApiWithFallback<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  initialData: T | null = null
) {
  return {
    fetchData: apiCall,
    initialData,
  }
}
