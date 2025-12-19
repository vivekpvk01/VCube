"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, CheckCircle, Clock, XCircle, Calendar, MapPin } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "Hackathon 2025",
    status: "approved",
    date: "Feb 10-11, 2025",
    venue: "Tech Block",
    submittedDate: "Dec 10, 2024",
  },
  {
    id: 2,
    title: "Coding Workshop",
    status: "pending",
    date: "Feb 20, 2025",
    venue: "Seminar Hall",
    submittedDate: "Dec 15, 2024",
  },
  {
    id: 3,
    title: "Tech Talk Series",
    status: "pending",
    date: "Mar 5, 2025",
    venue: "Auditorium",
    submittedDate: "Dec 18, 2024",
  },
  {
    id: 4,
    title: "App Development Bootcamp",
    status: "approved",
    date: "Jan 15, 2025",
    venue: "Computer Lab",
    submittedDate: "Nov 20, 2024",
  },
  {
    id: 5,
    title: "AI/ML Workshop",
    status: "rejected",
    date: "Jan 25, 2025",
    venue: "Tech Block",
    submittedDate: "Nov 25, 2024",
  },
]

const statusConfig = {
  approved: { label: "Approved", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-orange-500", icon: Clock },
  rejected: { label: "Rejected", color: "bg-red-500", icon: XCircle },
}

export default function EventStatusPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-primary" />
          Event Status
        </h1>
        <p className="text-muted-foreground">Track the status of your submitted events</p>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(statusConfig).map(([key, config], index) => {
          const count = mockEvents.filter((e) => e.status === key).length
          return (
            <Card key={key} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${config.color}/10`}>
                    <config.icon className={`h-6 w-6 ${config.color.replace("bg-", "text-")}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Events List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <CardHeader>
          <CardTitle>All Submitted Events</CardTitle>
          <CardDescription>{mockEvents.length} events submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event, index) => {
              const status = statusConfig[event.status as keyof typeof statusConfig]
              return (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.03}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {event.venue}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Submitted: {event.submittedDate}</div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground">Submitted</span>
                    </div>
                    <div className={`flex-1 h-0.5 ${event.status !== "pending" ? "bg-green-500" : "bg-muted"}`} />
                    <div className="flex items-center gap-1">
                      <div
                        className={`h-3 w-3 rounded-full ${event.status !== "pending" ? (event.status === "approved" ? "bg-green-500" : "bg-red-500") : "bg-muted"}`}
                      />
                      <span className="text-xs text-muted-foreground">Reviewed</span>
                    </div>
                    <div className={`flex-1 h-0.5 ${event.status === "approved" ? "bg-green-500" : "bg-muted"}`} />
                    <div className="flex items-center gap-1">
                      <div
                        className={`h-3 w-3 rounded-full ${event.status === "approved" ? "bg-green-500" : "bg-muted"}`}
                      />
                      <span className="text-xs text-muted-foreground">Approved</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
