"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, Calendar, MapPin, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventSubmission {
  id: string
  title: string
  date: string
  venue: string
  status: "pending" | "approved" | "rejected" | "revision"
  submittedAt: string
  updatedAt: string
  adminComment?: string
  timeline: { status: string; date: string; note?: string }[]
}

const submissions: EventSubmission[] = [
  {
    id: "1",
    title: "Coding Hackathon 2025",
    date: "January 15, 2025",
    venue: "Lab Complex",
    status: "pending",
    submittedAt: "Dec 10, 2024",
    updatedAt: "Dec 10, 2024",
    timeline: [{ status: "Submitted", date: "Dec 10, 2024", note: "Event request submitted for approval" }],
  },
  {
    id: "2",
    title: "Tech Talk: AI in Healthcare",
    date: "January 20, 2025",
    venue: "Seminar Hall A",
    status: "approved",
    submittedAt: "Dec 5, 2024",
    updatedAt: "Dec 8, 2024",
    adminComment: "Approved. Please coordinate with facilities for AV setup.",
    timeline: [
      { status: "Submitted", date: "Dec 5, 2024", note: "Event request submitted" },
      { status: "Under Review", date: "Dec 6, 2024" },
      { status: "Approved", date: "Dec 8, 2024", note: "Event approved by admin" },
    ],
  },
  {
    id: "3",
    title: "Photography Workshop",
    date: "December 28, 2024",
    venue: "Open Air Theatre",
    status: "revision",
    submittedAt: "Dec 1, 2024",
    updatedAt: "Dec 3, 2024",
    adminComment: "Please provide more details about the instructor and budget breakdown.",
    timeline: [
      { status: "Submitted", date: "Dec 1, 2024", note: "Event request submitted" },
      { status: "Revision Required", date: "Dec 3, 2024", note: "Additional information needed" },
    ],
  },
]

const statusConfig = {
  pending: { color: "bg-chart-3/20 text-chart-3", icon: Clock, label: "Pending Review" },
  approved: { color: "bg-accent/20 text-accent", icon: CheckCircle, label: "Approved" },
  rejected: { color: "bg-destructive/20 text-destructive", icon: XCircle, label: "Rejected" },
  revision: { color: "bg-primary/20 text-primary", icon: MessageSquare, label: "Revision Required" },
}

export default function EventStatusPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Event Status Tracker</h1>
        <p className="text-muted-foreground mt-1">Track the status of your submitted event requests</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4 animate-fade-in-up stagger-1">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = submissions.filter((s) => s.status === key).length
          const Icon = config.icon
          return (
            <Card key={key} className="border-border">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", config.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Submissions List */}
      <div className="space-y-6">
        {submissions.map((submission, index) => {
          const status = statusConfig[submission.status]
          const StatusIcon = status.icon

          return (
            <Card
              key={submission.id}
              className={cn(
                "border-border transition-all duration-300 opacity-0 animate-fade-in-up",
                "hover:shadow-lg hover:border-primary/30",
              )}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className={status.color}>{status.label}</Badge>
                    <CardTitle className="text-xl text-card-foreground mt-2">{submission.title}</CardTitle>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {submission.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {submission.venue}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>Submitted: {submission.submittedAt}</p>
                    <p>Updated: {submission.updatedAt}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Admin Comment */}
                {submission.adminComment && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">Admin Comment</p>
                      <p className="text-sm text-muted-foreground">{submission.adminComment}</p>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-card-foreground">Progress Timeline</p>
                  <div className="relative pl-6 space-y-4">
                    {submission.timeline.map((step, stepIndex) => (
                      <div
                        key={stepIndex}
                        className="relative opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${stepIndex * 0.1}s` }}
                      >
                        {/* Timeline connector */}
                        <div className="absolute left-[-20px] top-2 h-3 w-3 rounded-full bg-primary" />
                        {stepIndex < submission.timeline.length - 1 && (
                          <div className="absolute left-[-15px] top-5 h-[calc(100%+8px)] w-0.5 bg-border" />
                        )}

                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-card-foreground">{step.status}</p>
                            <p className="text-xs text-muted-foreground">{step.date}</p>
                          </div>
                          {step.note && <p className="text-sm text-muted-foreground mt-1">{step.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
