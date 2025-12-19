"use client"

import { useAuth } from "@/lib/auth-context"
import { StatCard } from "@/components/dashboard/stat-card"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { Users, ClipboardList, CheckSquare, Calendar, BookOpen } from "lucide-react"

const adminStats = [
  { title: "Total Students", value: "2,456", icon: Users, trend: { value: 12, label: "vs last year" } },
  { title: "Upcoming Exams", value: "8", icon: ClipboardList, trend: { value: 3, label: "this month" } },
  { title: "Pending Approvals", value: "15", icon: CheckSquare, trend: { value: -5, label: "vs last week" } },
  { title: "Academic Events", value: "24", icon: Calendar, trend: { value: 8, label: "scheduled" } },
]

const adminFeatures = [
  {
    title: "Calendar Management",
    description: "Manage academic calendar, add events, holidays, and exam schedules",
    icon: Calendar,
    href: "/dashboard/admin/calendar",
  },
  {
    title: "Exam Creation",
    description: "Create and schedule examinations, set subjects and time slots",
    icon: ClipboardList,
    href: "/dashboard/admin/exams",
  },
  {
    title: "Event Approval",
    description: "Review and approve club event requests",
    icon: CheckSquare,
    href: "/dashboard/admin/events",
    variant: "accent" as const,
  },
  {
    title: "Syllabus Upload",
    description: "Upload and manage course syllabi for all departments",
    icon: BookOpen,
    href: "/dashboard/admin/syllabus",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">Admin Control Center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, index) => (
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
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 animate-fade-in-up">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminFeatures.map((feature, index) => (
            <OverviewCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
              index={index + 4}
              variant={feature.variant}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
