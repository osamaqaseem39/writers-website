import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/blog/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Backend API responded with status: ${response.status}`)
    }

    const data = await response.json()
    
    // Convert status back to published for frontend compatibility
    if (data.post && data.post.status) {
      data.post.published = data.post.status === 'Published'
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const auth = request.headers.get('authorization') || ''
  
  try {
    // Convert published boolean to status string if needed
    const backendBody = { ...body }
    if (typeof backendBody.published === 'boolean') {
      backendBody.status = backendBody.published ? 'Published' : 'Draft'
      delete backendBody.published
    }
    
    const response = await fetch(`${BACKEND_URL}/api/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {})
      },
      body: JSON.stringify(backendBody)
    })

    const data = await response.json()
    
    // Convert status back to published for frontend compatibility
    if (data.post && data.post.status) {
      data.post.published = data.post.status === 'Published'
    }
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = request.headers.get('authorization') || ''
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(auth ? { Authorization: auth } : {})
      }
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}

