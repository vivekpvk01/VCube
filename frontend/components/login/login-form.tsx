"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Mail, Lock, Building2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const institutions = [
  "National Institute of Technology",
  "Indian Institute of Technology",
  "State University of Engineering",
  "Central Technical University",
]

const roleRoutes: Record<UserRole, string> = {
  student: "/student/dashboard",
  admin: "/admin/dashboard",
  "seating-manager": "/seating/dashboard",
  "club-coordinator": "/club/dashboard",
}

export function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    institution: "",
    email: "",
    password: "",
    role: "" as UserRole | "",
  })

  useState(() => {
    setMounted(true)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.institution || !formData.email || !formData.password || !formData.role) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      const success = await login(formData.email, formData.password, formData.role as UserRole)
      if (success) {
        router.push(roleRoutes[formData.role as UserRole])
      } else {
        setError("Invalid credentials")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/30">
      <Card
        className={cn(
          "w-full max-w-md border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl opacity-0",
          "animate-scale-in",
        )}
      >
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">Sign in to access your academic portal</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Institution Selector */}
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Institution
              </Label>
              <Select
                value={formData.institution}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, institution: value }))}
              >
                <SelectTrigger
                  id="institution"
                  className="bg-background/50 border-input focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <SelectValue placeholder="Select your institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst} value={inst}>
                      {inst}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email / Roll Number
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-background/50 border-input focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-background/50 border-input focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="text-foreground">Login As</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "student", label: "Student" },
                  { value: "admin", label: "Admin" },
                  { value: "seating-manager", label: "Seating Manager" },
                  { value: "club-coordinator", label: "Club Coordinator" },
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: role.value as UserRole }))}
                    className={cn(
                      "px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200",
                      formData.role === role.value
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                        : "bg-background/50 text-foreground border-input hover:border-primary/50 hover:bg-muted/50",
                    )}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full py-5 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
