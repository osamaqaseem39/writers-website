'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // If no user is logged in, redirect to login
      if (!user) {
        router.replace(redirectTo)
        return
      }

      // If admin is required but user is not admin, redirect to dashboard
      if (requireAdmin && user.role !== 'admin') {
        router.replace('/dashboard')
        return
      }
    }
  }, [user, isLoading, router, requireAdmin, redirectTo])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-brand-700">Loading...</div>
      </div>
    )
  }

  // If no user, don't render children (redirect will happen)
  if (!user) {
    return null
  }

  // If admin required but user is not admin, don't render children
  if (requireAdmin && user.role !== 'admin') {
    return null
  }

  return <>{children}</>
}

