"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckSquare, Check, X, Calendar, MapPin, Users } from "lucide-react"

const initialPendingEvents = [
  {
    id: 1,
    title: "Hackathon 2025",
    club: "Coding Club",
    date: "Feb 10-11, 2025",
    venue: "Tech Block",
    attendees: 200,
    description: "24-hour coding competition",
  },
  {
    id: 2,
    title: "Art Exhibition",
    club: "Fine Arts Club",
    date: "Feb 15, 2025",
    venue: "Gallery Hall",
    attendees: 150,
    description: "Student artwork showcase",
  },
  {
    id: 3,
    title: "Music Concert",
    club: "Music Society",
    date: "Feb 20, 2025",
    venue: "Auditorium",
    attendees: 400,
    description: "Annual music festival",
  },
  {
    id: 4,
    title: "Debate Championship",
    club: "Debate Club",
    date: "Feb 25, 2025",
    venue: "Seminar Hall",
    attendees: 100,
    description: "Inter-college debate competition",
  },
  {
    id: 5,
    title: "Photography Workshop",
    club: "Photography Club",
    date: "Mar 1, 2025",
    venue: "Media Room",
    attendees: 50,
    description: "Professional photography training",
  },
]

export default function EventApprovalPage() {
  const [pendingEvents, setPendingEvents] = useState(initialPendingEvents)
  const [approvedEvents, setApprovedEvents] = useState<typeof initialPendingEvents>([])

  const handleApprove = (event: (typeof initialPendingEvents)[0]) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== event.id))
    setApprovedEvents([...approvedEvents, event])
  }

  const handleReject = (id: number) => {
    setPendingEvents(pendingEvents.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <CheckSquare className="h-8 w-8 text-primary" />
          Event Approval
        </h1>
        <p className="text-muted-foreground">Review and approve club event requests</p>
      </div>

      {/* Pending Events */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Approval</CardTitle>
              <CardDescription>{pendingEvents.length} events awaiting review</CardDescription>
            </div>
            <Badge variant="secondary" className="text-orange-500">
              {pendingEvents.length} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {pendingEvents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No pending events to review</p>
          ) : (
            <div className="space-y-4">
              {pendingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${0.15 + index * 0.03}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge variant="outline">{event.club}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {event.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> {event.attendees} expected
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleApprove(event)} className="gap-2" variant="default">
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                      <Button onClick={() => handleReject(event.id)} className="gap-2" variant="outline">
                        <X className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Events */}
      {approvedEvents.length > 0 && (
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recently Approved</CardTitle>
                <CardDescription>{approvedEvents.length} events approved</CardDescription>
              </div>
              <Badge variant="secondary" className="text-green-500">
                {approvedEvents.length} Approved
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {approvedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                >
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.club} • {event.date}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">Approved</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
