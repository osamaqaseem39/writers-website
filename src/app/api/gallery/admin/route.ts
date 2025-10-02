import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app'

export async function GET(request: NextRequest) {
	const auth = request.headers.get('authorization') || ''
	const resp = await fetch(`${BACKEND_URL}/api/gallery`, { 
		headers: { 
			'Content-Type': 'application/json',
			...(auth ? { Authorization: auth } : {})
		} 
	})
	const data = await resp.json()
	return NextResponse.json(data, { status: resp.status })
}

export async function POST(request: NextRequest) {
	const body = await request.json()
	const auth = request.headers.get('authorization') || ''
	const resp = await fetch(`${BACKEND_URL}/api/gallery`, {
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
			...(auth ? { Authorization: auth } : {})
		},
		body: JSON.stringify(body)
	})
	const data = await resp.json()
	return NextResponse.json(data, { status: resp.status })
}

