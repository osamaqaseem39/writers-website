import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://writer-server.vercel.app').replace(/\/$/, '')

export async function POST(request: NextRequest) {
	const body = await request.json()
	const auth = request.headers.get('authorization') || ''
	
	// Convert published boolean to status string if needed
	const backendBody = { ...body }
	if (typeof backendBody.published === 'boolean') {
		backendBody.status = backendBody.published ? 'Published' : 'Draft'
		delete backendBody.published
	}
	
	const resp = await fetch(`${BACKEND_URL}/api/blog`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(auth ? { Authorization: auth } : {})
		},
		body: JSON.stringify(backendBody)
	})
	const data = await resp.json()
	
	// Convert status back to published for frontend compatibility
	if (data.post && data.post.status) {
		data.post.published = data.post.status === 'Published'
	}
	
	return NextResponse.json(data, { status: resp.status })
}

