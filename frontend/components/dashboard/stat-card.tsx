"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: { value: number; label: string }
  index?: number
}

export function StatCard({ title, value, icon: Icon, trend, index = 0 }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card p-6 transition-all duration-300 opacity-0 animate-fade-in-up",
        "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <p className={cn("text-xs font-medium", trend.value >= 0 ? "text-accent" : "text-destructive")}>
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
