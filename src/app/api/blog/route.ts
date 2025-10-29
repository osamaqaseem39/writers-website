import { NextResponse } from 'next/server'
import { getFallbackData } from '@/data/fallbackData'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET() {
	try {
		const resp = await fetch(`${BACKEND_URL}/api/blog`, { 
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store' // Ensure fresh data
		})
		
		if (!resp.ok) {
			throw new Error(`Backend API responded with status: ${resp.status}`)
		}
		
		const data = await resp.json()
		
		// Convert status to published for frontend compatibility
		const posts = (data.posts || []).map((post: any) => ({
			...post,
			published: post.status === 'Published' || post.published
		}))
		
		// Ensure we return posts array even if empty
		return NextResponse.json({ 
			posts 
		}, { status: 200 })
	} catch (e) {
		console.error('Error fetching blog posts:', e)
		// Return fallback data instead of empty array
		const fallbackData = getFallbackData('blog')
		return NextResponse.json({ 
			posts: Array.isArray(fallbackData) ? fallbackData : [] 
		}, { status: 200 })
	}
}

