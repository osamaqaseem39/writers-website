import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    // Fetch book from backend API
    const response = await fetch(`${BACKEND_URL}/api/books/${id}`, {
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
    console.error('Error fetching book from backend:', error)
    
    // Fallback to mock data if backend is not available
    const mockBook = {
      _id: id,
      title: "You Never Cried",
      author: "Nawa Sohail",
      description: "Pace Town is a place of quiet nights, rustling leaves, and stories waiting to be told. Dan, a gentle bookseller and devoted father, has long kept his heart closed. When Rose arrives, carrying secrets of her own, everything begins to change. Together, they find comfort in starlit walks, whispered conversations, and the fragile beauty of second chances.",
      price: 24.99,
      coverImageUrl: "/bookhomepage.jpeg",
      status: "Published",
      inventory: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Optional fields
      genre: "Fiction",
      fullDescription: "Yet the past is never far behind. When old wounds resurface, their love is tested in ways they never imagined. You Never Cried is a tender, atmospheric novel about love, vulnerability, and the courage it takes to finally let go. Set in the picturesque English countryside, this story explores themes of healing, forgiveness, and the transformative power of love.",
      year: "2024",
      pages: 329,
      isbn: "978-969-696-969-3",
      language: "English",
      readingTime: "7 hours",
      publisher: "Daastan",
      publishDate: "08 Oct 2024",
      rating: 5.0,
      reviews: 6
    }

    return NextResponse.json({ book: mockBook })
  }
}