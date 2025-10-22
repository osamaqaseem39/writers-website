import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET(request: NextRequest) {
  try {
    // Fetch books from backend API
    const response = await fetch(`${BACKEND_URL}/api/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching books from backend:', error)
    return NextResponse.json({ books: [] }, { status: 200 })
  }
}