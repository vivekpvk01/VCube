"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "student" | "admin" | "seating-manager" | "club-coordinator"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  institution: string
  rollNumber?: string
  department?: string
  semester?: number
  academicYear?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data for demo
const mockUsers: Record<string, User> = {
  "student@university.edu": {
    id: "STU001",
    name: "Alex Johnson",
    email: "student@university.edu",
    role: "student",
    institution: "National Institute of Technology",
    rollNumber: "21CS1045",
    department: "Computer Science",
    semester: 5,
    academicYear: "2024-25",
  },
  "admin@university.edu": {
    id: "ADM001",
    name: "Dr. Sarah Williams",
    email: "admin@university.edu",
    role: "admin",
    institution: "National Institute of Technology",
  },
  "seating@university.edu": {
    id: "SM001",
    name: "Michael Chen",
    email: "seating@university.edu",
    role: "seating-manager",
    institution: "National Institute of Technology",
  },
  "club@university.edu": {
    id: "CC001",
    name: "Emily Davis",
    email: "club@university.edu",
    role: "club-coordinator",
    institution: "National Institute of Technology",
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockUser = mockUsers[email]
    if (mockUser && mockUser.role === role) {
      setUser(mockUser)
      return true
    }

    // For demo, allow any login with matching role
    setUser({
      id: `USER_${Date.now()}`,
      name: email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role,
      institution: "National Institute of Technology",
      ...(role === "student" && {
        rollNumber: "21XX1000",
        department: "Engineering",
        semester: 5,
        academicYear: "2024-25",
      }),
    })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
