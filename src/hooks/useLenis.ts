'use client'

import { useEffect, useState } from 'react'

export function useLenis() {
  const [lenis, setLenis] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLenis((window as any).lenis)
    }
  }, [])

  const scrollTo = (target: string | number, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  const stop = () => {
    if (lenis) {
      lenis.stop()
    }
  }

  const start = () => {
    if (lenis) {
      lenis.start()
    }
  }

  const destroy = () => {
    if (lenis) {
      lenis.destroy()
    }
  }

  return {
    lenis,
    scrollTo,
    stop,
    start,
    destroy,
  }
}