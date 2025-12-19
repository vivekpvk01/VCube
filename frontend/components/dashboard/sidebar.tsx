"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  LayoutDashboard,
  Ticket,
  Calendar,
  Users,
  Brain,
  ClipboardList,
  Building2,
  Upload,
  CheckSquare,
  BookOpen,
  Settings,
  PartyPopper,
} from "lucide-react"

const roleNavigation = {
  student: [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Hall Ticket", href: "/student/hall-ticket", icon: Ticket },
    { name: "Academic Calendar", href: "/student/calendar", icon: Calendar },
    { name: "Seating Arrangement", href: "/student/seating", icon: Users },
    { name: "Mind Map", href: "/student/mind-map", icon: Brain },
    { name: "Approved Events", href: "/student/events", icon: PartyPopper },
  ],
  admin: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Calendar Management", href: "/admin/calendar", icon: Calendar },
    { name: "Exam Creation", href: "/admin/exams", icon: ClipboardList },
    { name: "Event Approval", href: "/admin/events", icon: CheckSquare },
    { name: "Syllabus Upload", href: "/admin/syllabus", icon: BookOpen },
  ],
  "seating-manager": [
    { name: "Dashboard", href: "/seating/dashboard", icon: LayoutDashboard },
    { name: "Upload Students", href: "/seating/upload-students", icon: Upload },
    { name: "Upload Rooms", href: "/seating/upload-rooms", icon: Building2 },
    { name: "Generate Seating", href: "/seating/generate", icon: Settings },
    { name: "View Chart", href: "/seating/view", icon: Users },
  ],
  "club-coordinator": [
    { name: "Dashboard", href: "/club/dashboard", icon: LayoutDashboard },
    { name: "Club Profile", href: "/club/profile", icon: Building2 },
    { name: "Submit Event", href: "/club/events", icon: Upload },
    { name: "Event Status", href: "/club/status", icon: ClipboardList },
  ],
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) return null

  const navigation = roleNavigation[user.role] || []

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <span className="font-bold text-sidebar-foreground">AcademiX</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 opacity-0 animate-fade-in-up",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-sidebar-primary")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user.role.replace("-", " ")}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
