"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Upload, ClipboardList, ArrowRight, Calendar, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Club Profile",
    description: "Manage your club information and details",
    icon: Building2,
    href: "/club/profile",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Submit Event",
    description: "Submit a new event for approval",
    icon: Upload,
    href: "/club/events",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Event Status",
    description: "Track your submitted events",
    icon: ClipboardList,
    href: "/club/status",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

export default function ClubDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Club Coordinator Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events Submitted</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Events</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">9</div>
            <p className="text-xs text-muted-foreground">Successfully conducted</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">2</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link key={action.title} href={action.href}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${0.25 + index * 0.05}s` }}
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
