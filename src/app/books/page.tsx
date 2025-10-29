import { Header } from '@/components/Header'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/currency'
import { getServerSideData } from '@/utils/serverData'
import { Book } from '@/types/uniformData'
import { BooksPageClient } from './BooksPageClient'

export default async function BooksPage() {
  // Fetch books data on the server
  const books = await getServerSideData('books') as Book[]

  return <BooksPageClient initialBooks={books} />
}