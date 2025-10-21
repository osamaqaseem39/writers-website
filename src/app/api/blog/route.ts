import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app'

export async function GET() {
	try {
		const resp = await fetch(`${BACKEND_URL}/api/blog`, { headers: { 'Content-Type': 'application/json' } })
		const data = await resp.json()
		return NextResponse.json(data, { status: resp.status })
	} catch (e) {
		return NextResponse.json({ posts: [] }, { status: 200 })
	}
}

