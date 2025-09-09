'use client'

import { useGlobalDragScroll } from '@/hooks/useGlobalDragScroll'
import { ReactNode } from 'react'

interface GlobalDragScrollProps {
  children: ReactNode
}

export function GlobalDragScroll({ children }: GlobalDragScrollProps) {
  const { isDragging } = useGlobalDragScroll({
    depth: 0.3,
    friction: 0.95,
    enabled: true
  })

  return (
    <div className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}>
      {children}
    </div>
  )
}