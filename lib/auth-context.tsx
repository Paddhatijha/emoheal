"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "user" | "guest"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  loginAsGuest: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isGuest: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("emoheal_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: "1",
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email: email,
      role: "user",
    }

    setUser(userData)
    localStorage.setItem("emoheal_user", JSON.stringify(userData))
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    }

    setUser(userData)
    localStorage.setItem("emoheal_user", JSON.stringify(userData))
  }

  const loginAsGuest = () => {
    const guestData: User = {
      id: "guest",
      name: "Guest User",
      email: "guest@emoheal.com",
      role: "guest",
    }

    setUser(guestData)
    localStorage.setItem("emoheal_user", JSON.stringify(guestData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("emoheal_user")
  }

  const value = {
    user,
    login,
    register,
    logout,
    loginAsGuest,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isGuest: user?.role === "guest",
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
