import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For now, return mock data since we don't have a database connection
    // In a real app, you would fetch from your backend API here
    const mockBooks = [
      {
        id: "1",
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ books: mockBooks })
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}