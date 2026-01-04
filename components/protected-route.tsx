"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useAuth, type UserRole } from "@/lib/auth-context"

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  fallback?: ReactNode
}

export function ProtectedRoute({ children, allowedRoles, fallback }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      window.location.href = "/"
    }
  }, [mounted, isAuthenticated])

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  // Check if user role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">You don't have permission to access this page.</p>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
