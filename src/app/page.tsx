import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Books } from '@/components/Books'
import { Gallery } from '@/components/Gallery'
import { Reviews } from '@/components/Reviews'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Books />
      <Gallery />
      <Reviews />
      <Blog />
      <Contact />
    </>
  )
} 