"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Building2, Settings, Users, ArrowRight, FileSpreadsheet, CheckCircle } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Upload Students",
    description: "Import student data from CSV files",
    icon: Upload,
    href: "/seating/upload-students",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Upload Rooms",
    description: "Configure rooms and bench capacity",
    icon: Building2,
    href: "/seating/upload-rooms",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Generate Seating",
    description: "Auto-generate seating arrangements",
    icon: Settings,
    href: "/seating/generate",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "View Chart",
    description: "View and export seating charts",
    icon: Users,
    href: "/seating/view",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export default function SeatingDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Seating Manager Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students Uploaded</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">From 6 departments</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rooms Configured</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Across 3 blocks</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,700</div>
            <p className="text-xs text-muted-foreground">Seats available</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Charts Generated</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">8</div>
            <p className="text-xs text-muted-foreground">For upcoming exams</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
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
