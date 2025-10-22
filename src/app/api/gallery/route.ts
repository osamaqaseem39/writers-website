import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function GET() {
	try {
		const resp = await fetch(`${BACKEND_URL}/api/gallery/public`, { headers: { 'Content-Type': 'application/json' } })
		if (!resp.ok) throw new Error(`Status ${resp.status}`)
		const data = await resp.json()
		return NextResponse.json(data)
	} catch (err) {
		console.error('Error fetching gallery:', err)
		return NextResponse.json({ images: [] })
	}
}

