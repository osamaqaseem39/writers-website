import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Books } from '@/components/Books'
import { Gallery } from '@/components/Gallery'
import { Reviews } from '@/components/Reviews'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { getServerSideData } from '@/utils/serverData'

export default async function Home() {
  // Fetch data on the server for better performance
  const [featuredBook, blogPosts, reviews] = await Promise.all([
    getServerSideData('featured-book'),
    getServerSideData('blog'),
    getServerSideData('reviews')
  ])

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Books initialData={featuredBook} />
      <Gallery />
      <Reviews initialData={reviews} />
      <Blog initialData={blogPosts} />
      <Contact />
    </>
  )
} 