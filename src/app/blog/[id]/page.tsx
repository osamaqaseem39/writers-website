import { BlogDetailClient } from './BlogDetailClient'

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return <BlogDetailClient id={id} />
}

