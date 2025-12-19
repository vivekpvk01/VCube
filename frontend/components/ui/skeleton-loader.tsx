"use client"

import { cn } from "@/lib/utils"

interface SkeletonLoaderProps {
  className?: string
  variant?: "card" | "text" | "circle" | "rectangle"
  count?: number
}

export function SkeletonLoader({ className, variant = "rectangle", count = 1 }: SkeletonLoaderProps) {
  const baseClasses = "animate-pulse bg-muted rounded-lg"

  const variants = {
    card: "h-32 w-full",
    text: "h-4 w-full",
    circle: "h-12 w-12 rounded-full",
    rectangle: "h-24 w-full",
  }

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn(baseClasses, variants[variant])} />
      ))}
    </div>
  )
}
