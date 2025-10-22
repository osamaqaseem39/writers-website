import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'https://writer-server.vercel.app'

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/books/featured`, {
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
    console.error('Error fetching featured book:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured book' },
      { status: 500 }
    )
  }
}
