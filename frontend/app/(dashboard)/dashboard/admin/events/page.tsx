"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Calendar, MapPin, Users, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventRequest {
  id: string
  title: string
  club: string
  coordinator: string
  date: string
  time: string
  venue: string
  expectedAttendees: number
  description: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

const initialRequests: EventRequest[] = [
  {
    id: "1",
    title: "Coding Hackathon",
    club: "Computer Science Society",
    coordinator: "John Smith",
    date: "January 15, 2025",
    time: "9:00 AM - 9:00 PM",
    venue: "Lab Complex, Room 301-305",
    expectedAttendees: 100,
    description: "24-hour coding hackathon focusing on AI/ML solutions for real-world problems.",
    status: "pending",
    submittedAt: "Dec 10, 2024",
  },
  {
    id: "2",
    title: "Photography Workshop",
    club: "Arts & Culture Club",
    coordinator: "Emily Chen",
    date: "January 20, 2025",
    time: "2:00 PM - 5:00 PM",
    venue: "Seminar Hall B",
    expectedAttendees: 40,
    description: "Professional photography workshop with hands-on sessions.",
    status: "pending",
    submittedAt: "Dec 12, 2024",
  },
  {
    id: "3",
    title: "Robotics Competition",
    club: "Robotics Club",
    coordinator: "Alex Johnson",
    date: "February 5, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "Sports Complex",
    expectedAttendees: 150,
    description: "Inter-college robotics competition with multiple categories.",
    status: "pending",
    submittedAt: "Dec 15, 2024",
  },
]

const statusColors = {
  pending: "bg-chart-3/20 text-chart-3",
  approved: "bg-accent/20 text-accent",
  rejected: "bg-destructive/20 text-destructive",
}

export default function EventApprovalPage() {
  const [requests, setRequests] = useState<EventRequest[]>(initialRequests)

  const handleApprove = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r)))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)))
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const processedRequests = requests.filter((r) => r.status !== "pending")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Event Approval</h1>
        <p className="text-muted-foreground mt-1">Review and approve club event requests</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 animate-fade-in-up stagger-1">
        <Card className="border-border bg-chart-3/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Clock className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{pendingRequests.length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-accent/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <CheckCircle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {requests.filter((r) => r.status === "approved").length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-destructive/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {requests.filter((r) => r.status === "rejected").length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground animate-fade-in-up">Pending Requests</h2>
          <div className="grid gap-6">
            {pendingRequests.map((request, index) => (
              <Card
                key={request.id}
                className={cn(
                  "border-border transition-all duration-300 opacity-0 animate-fade-in-up",
                  "hover:shadow-lg hover:border-primary/30",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge className={statusColors[request.status]} variant="secondary">
                        {request.status}
                      </Badge>
                      <CardTitle className="text-xl text-card-foreground mt-2">{request.title}</CardTitle>
                      <CardDescription>
                        {request.club} • Submitted by {request.coordinator}
                      </CardDescription>
                    </div>
                    <p className="text-xs text-muted-foreground">{request.submittedAt}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{request.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm text-card-foreground">{request.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm text-card-foreground">{request.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm text-card-foreground">{request.venue}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm text-card-foreground">{request.expectedAttendees} expected</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => handleApprove(request.id)} className="gap-2 flex-1">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="destructive" onClick={() => handleReject(request.id)} className="gap-2 flex-1">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <MessageSquare className="h-4 w-4" />
                      Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Processed Requests */}
      {processedRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Decisions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {processedRequests.map((request, index) => (
              <Card
                key={request.id}
                className="border-border opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">{request.title}</p>
                    <p className="text-sm text-muted-foreground">{request.club}</p>
                  </div>
                  <Badge className={statusColors[request.status]}>{request.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
