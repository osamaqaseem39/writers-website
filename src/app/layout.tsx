import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Nawa Sohail - Author',
  description: 'Official website of author Nawa Sohail. Coming soon with new works and literary insights.',
  keywords: ['Nawa Sohail', 'author', 'books', 'literature', 'coming soon'],
  authors: [{ name: 'Nawa Sohail' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Nawa Sohail - Author',
    description: 'Official website of author Nawa Sohail. Coming soon with new works and literary insights.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-jost">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-jost">
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col scale-screen">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 