import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nawa Sohail - Writer & Author',
  description: 'Official website of writer and author Nawa Sohail. Coming soon with new works and literary insights.',
  keywords: ['Nawa Sohail', 'writer', 'author', 'books', 'literature', 'coming soon'],
  authors: [{ name: 'Nawa Sohail' }],
  openGraph: {
    title: 'Nawa Sohail - Writer & Author',
    description: 'Official website of writer and author Nawa Sohail. Coming soon with new works and literary insights.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 