"use client"

import { useAuth } from "@/lib/auth-context"
import { StatCard } from "@/components/dashboard/stat-card"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { Building2, Upload, ClipboardList, CheckCircle } from "lucide-react"

const coordinatorStats = [
  { title: "Active Events", value: "3", icon: CheckCircle, trend: { value: 2, label: "this month" } },
  { title: "Pending Approvals", value: "2", icon: ClipboardList, trend: { value: 1, label: "awaiting" } },
  { title: "Total Members", value: "45", icon: Building2, trend: { value: 8, label: "new this semester" } },
]

const coordinatorFeatures = [
  {
    title: "Club Profile",
    description: "Manage your club information, description, and member list",
    icon: Building2,
    href: "/dashboard/club-coordinator/profile",
  },
  {
    title: "Submit Event",
    description: "Create and submit new event requests for approval",
    icon: Upload,
    href: "/dashboard/club-coordinator/submit",
    variant: "accent" as const,
  },
  {
    title: "Event Status",
    description: "Track the status of your submitted event requests",
    icon: ClipboardList,
    href: "/dashboard/club-coordinator/status",
  },
]

export default function ClubCoordinatorDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">Club Coordinator Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {coordinatorStats.map((stat, index) => (
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
      <div className="grid gap-6 sm:grid-cols-3">
        {coordinatorFeatures.map((feature, index) => (
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
