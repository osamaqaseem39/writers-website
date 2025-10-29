import { PageShell } from '@/components/PageShell'
import { getServerSideData } from '@/utils/serverData'
import { BlogPost } from '@/types/uniformData'
import { BlogPageClient } from './BlogPageClient'

export default async function BlogPage() {
  // Fetch blog posts data on the server
  const posts = await getServerSideData('blog') as BlogPost[]

  return (
    <PageShell>
      <BlogPageClient initialPosts={posts} />
    </PageShell>
  )
}