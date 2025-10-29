import { NextRequest, NextResponse } from 'next/server'
import { getFallbackData } from '@/data/fallbackData'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET() {
	try {
		const resp = await fetch(`${BACKEND_URL}/api/gallery/public`, { headers: { 'Content-Type': 'application/json' } })
		if (!resp.ok) throw new Error(`Status ${resp.status}`)
		const data = await resp.json()
		
		// If backend returns empty images array, use fallback data
		if (!data.images || data.images.length === 0) {
			console.log('Backend gallery is empty, using fallback images')
			return NextResponse.json({ images: getFallbackData('gallery') })
		}
		
		return NextResponse.json(data)
	} catch (err) {
		console.error('Error fetching gallery:', err)
		// Return fallback gallery images when backend is unavailable
		return NextResponse.json({ images: getFallbackData('gallery') })
	}
}

