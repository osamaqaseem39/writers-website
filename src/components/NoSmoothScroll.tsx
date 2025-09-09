'use client'

import { useEffect } from 'react'

export function NoSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enable native smooth scroll as fallback
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return <>{children}</>
}