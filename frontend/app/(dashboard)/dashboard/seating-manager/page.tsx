"use client"

import { useAuth } from "@/lib/auth-context"
import { StatCard } from "@/components/dashboard/stat-card"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { Upload, Building2, Settings, Users } from "lucide-react"

const managerStats = [
  { title: "Total Students", value: "2,456", icon: Users, trend: { value: 12, label: "vs last semester" } },
  { title: "Exam Rooms", value: "48", icon: Building2, trend: { value: 4, label: "new rooms" } },
  { title: "Seating Plans", value: "12", icon: Settings, trend: { value: 8, label: "generated" } },
]

const managerFeatures = [
  {
    title: "Upload Students",
    description: "Import student data from CSV or Excel files",
    icon: Upload,
    href: "/dashboard/seating-manager/students",
  },
  {
    title: "Upload Rooms",
    description: "Configure room and bench information",
    icon: Building2,
    href: "/dashboard/seating-manager/rooms",
  },
  {
    title: "Generate Seating",
    description: "Auto-generate seating arrangements for exams",
    icon: Settings,
    href: "/dashboard/seating-manager/generate",
    variant: "accent" as const,
  },
  {
    title: "View Chart",
    description: "View and export seating arrangement charts",
    icon: Users,
    href: "/dashboard/seating-manager/chart",
  },
]

export default function SeatingManagerDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">Seating Manager Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {managerStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            index={index}
          />
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {managerFeatures.map((feature, index) => (
          <OverviewCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            index={index + 3}
            variant={feature.variant}
          />
        ))}
      </div>
    </div>
  )
}
