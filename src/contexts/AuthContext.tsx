'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role?: 'admin' | 'customer'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>
  autoRegister: (email: string, firstName: string, lastName: string, phone: string) => Promise<{ success: boolean; isNewUser?: boolean; message?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://writer-server.vercel.app'}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            const data = await res.json()
            setUser(data.user)
          } else {
            localStorage.removeItem('token')
          }
        }
      } catch (e) {
        // noop
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://writer-server.vercel.app'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        setIsLoading(false)
        return false
      }
      const data = await res.json()
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsLoading(false)
      return true
    } catch {
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://writer-server.vercel.app'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setIsLoading(false)
        return { success: false, message: data?.message || data?.errors?.[0]?.msg || 'Registration failed' }
      }
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsLoading(false)
      return { success: true }
    } catch {
      setIsLoading(false)
      return { success: false, message: 'Network error. Please try again.' }
    }
  }

  const autoRegister = async (email: string, firstName: string, lastName: string, phone: string): Promise<{ success: boolean; isNewUser?: boolean; message?: string }> => {
    setIsLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://writer-server.vercel.app'}/api/auth/auto-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, phone })
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        setIsLoading(false)
        return { 
          success: false, 
          message: errorData.message || 'Auto-registration failed' 
        }
      }
      
      const data = await res.json()
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsLoading(false)
      
      return { 
        success: true, 
        isNewUser: data.isNewUser,
        message: data.isNewUser ? 'Account created successfully!' : 'Welcome back!'
      }
    } catch (error) {
      setIsLoading(false)
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, autoRegister, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}