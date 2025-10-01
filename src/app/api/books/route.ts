import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

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
    
    // Fallback to mock data if backend is not available
    const mockBooks = [
      {
        _id: "1",
        title: "You Never Cried",
        author: "Nawa Sohail",
        description: "Pace Town is a place of quiet nights, rustling leaves, and stories waiting to be told. Dan, a gentle bookseller and devoted father, has long kept his heart closed. When Rose arrives, carrying secrets of her own, everything begins to change.",
        price: 24.99,
        coverImageUrl: "/bookhomepage.jpeg",
        status: "Published",
        inventory: 50,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // Optional fields
        genre: "Fiction",
        year: "2024",
        pages: 329,
        rating: 5.0,
        reviews: 6
      }
    ]

    return NextResponse.json({ books: mockBooks })
  }
}