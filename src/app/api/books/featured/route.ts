import { NextRequest, NextResponse } from 'next/server'
import { getFallbackData } from '@/data/fallbackData'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/books/featured`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // If backend returns 404, it means no featured book is set
    if (response.status === 404) {
      const fallbackData = getFallbackData('featured-book')
      return NextResponse.json({ book: fallbackData })
    }

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching featured book:', error)
    // Return fallback data instead of error to ensure the page still displays
    const fallbackData = getFallbackData('featured-book')
    return NextResponse.json({ book: fallbackData })
  }
}
