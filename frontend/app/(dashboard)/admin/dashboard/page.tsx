"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ClipboardList, CheckSquare, BookOpen, ArrowRight, Users, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Calendar Management",
    description: "Add and manage academic calendar events",
    icon: Calendar,
    href: "/admin/calendar",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Exam Creation",
    description: "Schedule and configure examinations",
    icon: ClipboardList,
    href: "/admin/exams",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Event Approval",
    description: "Review and approve club events",
    icon: CheckSquare,
    href: "/admin/events",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Syllabus Upload",
    description: "Upload and manage course syllabi",
    icon: BookOpen,
    href: "/admin/syllabus",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450</div>
            <p className="text-xs text-muted-foreground">+120 this semester</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next: Dec 22</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Events</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Syllabi Uploaded</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Across 6 departments</p>
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
