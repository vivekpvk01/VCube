"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowRight } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage: `url('/aerial-view-of-modern-university-campus-with-build.jpg')`,
        }}
      />

      {/* Dark Gradient Overlay - 55-65% opacity as per spec */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-black/95 via-indigo-950/85 to-black/70 transition-opacity duration-1000",
          mounted ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Secondary overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12">
        <div className={cn("flex items-center gap-3 opacity-0", mounted && "animate-fade-in-up")}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-white">AcademiX University</span>
        </div>

        <div />
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl space-y-8">
          <h1
            className={cn(
              "text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl opacity-0 text-balance",
              mounted && "animate-fade-in-up stagger-1",
            )}
          >
            Integrated Academic & <span className="text-primary">Examination</span> Management System
          </h1>

          <p
            className={cn(
              "mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl opacity-0 text-pretty",
              mounted && "animate-fade-in-up stagger-2",
            )}
          >
            Streamline your academic journey with our comprehensive platform for students, administrators, and staff.
          </p>

          <div
            className={cn(
              "flex flex-col items-center gap-4 sm:flex-row sm:justify-center opacity-0",
              mounted && "animate-fade-in-up stagger-3",
            )}
          >
            <Link href="/login">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 animate-pulse-glow"
              >
                Login to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
