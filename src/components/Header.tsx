'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Ensure we're on the client side before using context
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const { getTotalItems } = useCart()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-teal/50' 
        : 'bg-gradient-to-r from-skyblue/90 via-beige/90 to-white/90 backdrop-blur-sm border-b border-teal/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="w-20 h-6 sm:w-24 sm:h-8 md:w-32 md:h-10 lg:w-40 lg:h-14 overflow-hidden flex items-center justify-center">
              <img 
                src="/logo.webp" 
                alt="Nawa Sohail Logo" 
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" onClick={handleAnchorClick} className="text-navy hover:text-teal transition-all duration-300 font-light text-lg relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-navy to-teal"></span>
            </a>
            <a href="/about" onClick={handleAnchorClick} className="text-navy hover:text-teal transition-all duration-300 font-light text-lg relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-navy to-teal"></span>
            </a>
            <a href="/books" onClick={handleAnchorClick} className="text-navy hover:text-teal transition-all duration-300 font-light text-lg relative group">
              Books
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-navy to-teal"></span>
            </a>
            <a href="/blog" onClick={handleAnchorClick} className="text-navy hover:text-teal transition-all duration-300 font-light text-lg relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-navy to-teal"></span>
            </a>
            <a href="/contact" onClick={handleAnchorClick} className="text-navy hover:text-teal transition-all duration-300 font-light text-lg relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-navy to-teal"></span>
            </a>
            
          </nav>

          {/* Cart + CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/checkout"
              className="relative inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-medium text-navy border border-skyblue bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow"
              aria-label="View cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.706c.31 0 .58.202.67.497l2.716 8.92a2.25 2.25 0 002.152 1.583h6.606a2.25 2.25 0 002.152-1.583l1.889-6.213A.75.75 0 0019.5 5.25H6.78l-.4-1.315A2.25 2.25 0 003.956 3.75H2.25z" />
                <path d="M8.25 21a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              <span>Cart</span>
              {isClient && getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </a>
            <a href="/books" className="text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-navy to-teal inline-block">
              Shop Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-navy hover:text-teal focus:outline-none focus:text-teal transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-skyblue/95 via-beige/95 to-white/95 backdrop-blur-md border-b border-teal/50 shadow-lg z-50">
            <div className="px-4 py-4 space-y-1">
              <a href="#home" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                Home
              </a>
              <a href="/about" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                About
              </a>
              <a href="/books" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                Books
              </a>
              <a href="/blog" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                Blog
              </a>
              <a href="/contact" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                Contact
              </a>
              <a href="/checkout" onClick={handleAnchorClick} className="block px-4 py-3 text-navy hover:text-teal hover:bg-skyblue/50 transition-all duration-300 font-medium text-base rounded-xl">
                Cart
              </a>
              
              <div className="px-4 py-4 pt-6 border-t border-skyblue/30">
                <a href="/books" className="block w-full text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-navy to-teal text-center text-base">
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