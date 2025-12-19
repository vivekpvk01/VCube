"use client"

import { useAuth } from "@/lib/auth-context"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { Ticket, Calendar, Users, Brain, PartyPopper } from "lucide-react"

const studentFeatures = [
  {
    title: "Hall Ticket",
    description: "Generate and download your examination hall tickets with QR codes",
    icon: Ticket,
    href: "/dashboard/student/hall-ticket",
    variant: "accent" as const,
  },
  {
    title: "Academic Calendar",
    description: "View upcoming exams, holidays, and important academic dates",
    icon: Calendar,
    href: "/dashboard/student/calendar",
  },
  {
    title: "Seating Arrangement",
    description: "Find your exam room, bench, and seat number",
    icon: Users,
    href: "/dashboard/student/seating",
  },
  {
    title: "Mind Map",
    description: "Interactive study support and concept visualization",
    icon: Brain,
    href: "/dashboard/student/mind-map",
  },
  {
    title: "Approved Events",
    description: "Browse upcoming club events and activities",
    icon: PartyPopper,
    href: "/dashboard/student/events",
  },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground mt-1">
          {user?.department} • Semester {user?.semester} • {user?.rollNumber}
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studentFeatures.map((feature, index) => (
          <OverviewCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            index={index}
            variant={feature.variant}
          />
        ))}
      </div>
    </div>
  )
}
