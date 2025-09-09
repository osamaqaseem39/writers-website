import Link from 'next/link'
import { Header } from '@/components/Header'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-serif text-brand-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-brand-700 mb-6">Page Not Found</h2>
          <p className="text-brand-600 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </main>
    </div>
  )
}