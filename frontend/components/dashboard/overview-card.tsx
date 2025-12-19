"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { type LucideIcon, ArrowRight } from "lucide-react"

interface OverviewCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  index?: number
  variant?: "default" | "accent"
}

export function OverviewCard({
  title,
  description,
  icon: Icon,
  href,
  index = 0,
  variant = "default",
}: OverviewCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border p-6 transition-all duration-300 opacity-0 animate-fade-in-up",
        "hover:shadow-lg hover:-translate-y-1",
        variant === "accent"
          ? "border-primary/30 bg-primary/5 hover:border-primary/50 hover:shadow-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:shadow-primary/5",
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
          variant === "accent"
            ? "bg-primary text-primary-foreground"
            : "bg-muted group-hover:bg-primary group-hover:text-primary-foreground",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>

      <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Open
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
