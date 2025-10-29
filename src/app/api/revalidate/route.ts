import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    
    if (!tag) {
      return NextResponse.json({ error: 'Tag is required' }, { status: 400 })
    }
    
    // Revalidate the specific tag
    revalidateTag(tag)
    
    return NextResponse.json({ 
      message: `Data revalidated for tag: ${tag}`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revalidating data:', error)
    return NextResponse.json({ error: 'Failed to revalidate data' }, { status: 500 })
  }
}
