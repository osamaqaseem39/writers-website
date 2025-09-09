'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle resize
    const handleResize = () => {
      lenis.resize()
    }

    window.addEventListener('resize', handleResize)

    // Expose lenis globally for debugging
    if (typeof window !== 'undefined') {
      ;(window as any).lenis = lenis
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
      if (typeof window !== 'undefined') {
        ;(window as any).lenis = null
      }
    }
  }, [])

  return <>{children}</>
}