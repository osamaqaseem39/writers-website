'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface WishlistItem {
  id: string
  title: string
  author: string
  price: number
  coverImage: string
  addedAt: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist')
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist))
        } catch (error) {
          console.error('Error loading wishlist from localStorage:', error)
        }
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
    }
  }, [wishlistItems])

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id)
      
      if (existingItem) {
        return prevItems // Item already in wishlist
      } else {
        return [...prevItems, { ...item, addedAt: new Date().toISOString() }]
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
