'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

declare global {
  interface Window {
    lenis: any
  }
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { getTotalItems } = useCart()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const href = (e.currentTarget.getAttribute('href') || '').trim()
    if (!href.startsWith('#')) return

    const targetId = href.slice(1)
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return

    e.preventDefault()

    const lenis = typeof window !== 'undefined' ? (window as any).lenis : null
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 })
    } else {
      const headerHeight = typeof window !== 'undefined' ? (window.innerWidth >= 1024 ? 96 : 64) : 80
      const rect = targetElement.getBoundingClientRect()
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      const targetY = rect.top + currentScroll - headerHeight
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }

    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    // Set initial state
    handleScroll()

    // Listen to window scroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-brand-200/50' 
        : 'bg-gradient-to-r from-brand-50/90 via-brand-100/90 to-brand-200/90 backdrop-blur-sm border-b border-brand-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="w-24 h-8 md:w-40 md:h-14 overflow-hidden flex items-center justify-center">
              <img 
                src="/logo.webp" 
                alt="Nawa Sohail Logo" 
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" onClick={handleAnchorClick} className="text-brand-900 hover:text-brand-600 transition-all duration-300 font-light text-lg relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-brand-500 to-brand-600"></span>
            </a>
            <a href="/about" onClick={handleAnchorClick} className="text-brand-900 hover:text-brand-600 transition-all duration-300 font-light text-lg relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-brand-500 to-brand-600"></span>
            </a>
            <a href="/books" onClick={handleAnchorClick} className="text-brand-900 hover:text-brand-600 transition-all duration-300 font-light text-lg relative group">
              Books
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-brand-500 to-brand-600"></span>
            </a>
            <a href="/blog" onClick={handleAnchorClick} className="text-brand-900 hover:text-brand-600 transition-all duration-300 font-light text-lg relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-brand-500 to-brand-600"></span>
            </a>
            <a href="/contact" onClick={handleAnchorClick} className="text-brand-900 hover:text-brand-600 transition-all duration-300 font-light text-lg relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-brand-500 to-brand-600"></span>
            </a>
            
          </nav>

          {/* Cart + CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/checkout"
              className="relative inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-medium text-brand-900 border border-brand-300 bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow"
              aria-label="View cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.706c.31 0 .58.202.67.497l2.716 8.92a2.25 2.25 0 002.152 1.583h6.606a2.25 2.25 0 002.152-1.583l1.889-6.213A.75.75 0 0019.5 5.25H6.78l-.4-1.315A2.25 2.25 0 003.956 3.75H2.25z" />
                <path d="M8.25 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </a>
            <a href="/books" className="text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-brand-500 to-brand-600 inline-block">
              Shop Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-900 hover:text-brand-600 focus:outline-none focus:text-brand-600 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-brand-50/95 via-brand-100/95 to-brand-200/95 backdrop-blur-md border-b border-brand-200/50 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              <a href="#home" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                Home
              </a>
              <a href="/about" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                About
              </a>
              <a href="/books" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                Books
              </a>
              <a href="/blog" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                Blog
              </a>
              <a href="/contact" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                Contact
              </a>
              <a href="/checkout" onClick={handleAnchorClick} className="block px-4 py-3 text-brand-900 hover:text-brand-600 hover:bg-brand-100/50 transition-all duration-300 font-light text-lg rounded-xl">
                Cart
              </a>
              
              <div className="px-4 py-3 pt-6">
                <a href="/books" className="block w-full text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-brand-500 to-brand-600 text-center">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 