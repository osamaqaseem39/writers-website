'use client'

import { useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return

    let lenis: any = null
    let rafId: number | null = null

    try {
      lenis = new Lenis()

      // Lenis will handle the scrolling, no need to hide overflow

      // Animation frame loop
      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time)
        }
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)

      // Handle resize
      const handleResize = () => {
        if (lenis) {
          lenis.resize()
        }
      }

      window.addEventListener('resize', handleResize)

      // Expose lenis globally for debugging
      ;(window as any).lenis = lenis

      return () => {
        window.removeEventListener('resize', handleResize)
        if (rafId) {
          cancelAnimationFrame(rafId)
        }
        if (lenis) {
          lenis.destroy()
        }
        // Cleanup handled by Lenis
        ;(window as any).lenis = null
      }
    } catch (error) {
      console.warn('Lenis failed to initialize:', error)
      // Fallback to native smooth scroll
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [isClient])

  return <>{children}</>
}