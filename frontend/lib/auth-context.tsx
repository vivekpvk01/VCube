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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, role }),
      });

      // Debug: Show actual network response
      console.log("Login response status:", res.status, "ok:", res.ok);

      if (!res.ok) {
        let errMsg = "Unknown error";
        try {
          const errorJson = await res.json();
          errMsg = errorJson?.detail || errorJson?.message || JSON.stringify(errorJson);
        } catch (e) {}
        console.error("Login failed with backend error:", errMsg);
        return false;
      }

      // Backend does not return user info, so we store minimal local info
      setUser({
        id: email,
        name: email.split("@")[0],
        email,
        role,
        institution: "", // Could be loaded with user profile endpoint in the future
      });

      return true;
    } catch (err) {
      console.error("Login fetch error:", err);
      return false;
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}