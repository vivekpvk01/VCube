"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Calendar, Users, Brain, PartyPopper, ArrowRight } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Hall Ticket",
    description: "Generate and download your exam hall tickets",
    icon: Ticket,
    href: "/student/hall-ticket",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Academic Calendar",
    description: "View important dates and exam schedules",
    icon: Calendar,
    href: "/student/calendar",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Seating Arrangement",
    description: "Check your exam seating details",
    icon: Users,
    href: "/student/seating",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Mind Map",
    description: "Visual study guides for your courses",
    icon: Brain,
    href: "/student/mind-map",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Events",
    description: "Browse approved college events",
    icon: PartyPopper,
    href: "/student/events",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">
          {user?.department} • Semester {user?.semester} • {user?.rollNumber}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Data Structures (Dec 22)</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hall Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Available for download</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events This Week</CardTitle>
            <PartyPopper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 you might be interested in</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Study Progress</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Mind maps completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link key={action.title} href={action.href}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${action.bgColor}`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
