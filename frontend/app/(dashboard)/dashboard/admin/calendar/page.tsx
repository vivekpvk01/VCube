"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AcademicEvent {
  id: string
  title: string
  date: string
  type: "exam" | "holiday" | "event"
  description: string
}

const initialEvents: AcademicEvent[] = [
  { id: "1", title: "Mid Semester 1 Begins", date: "2024-12-15", type: "exam", description: "First mid-term exams" },
  { id: "2", title: "Christmas Holiday", date: "2024-12-25", type: "holiday", description: "Institute holiday" },
  { id: "3", title: "Tech Fest 2024", date: "2024-12-20", type: "event", description: "Annual technical festival" },
  {
    id: "4",
    title: "Mid Semester 1 Ends",
    date: "2024-12-22",
    type: "exam",
    description: "End of first mid-term exams",
  },
]

const eventTypeColors = {
  exam: "bg-destructive/20 text-destructive",
  holiday: "bg-accent/20 text-accent",
  event: "bg-primary/20 text-primary",
}

export default function CalendarManagementPage() {
  const [events, setEvents] = useState<AcademicEvent[]>(initialEvents)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "" as "exam" | "holiday" | "event" | "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.title || !newEvent.date || !newEvent.type) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        ...newEvent,
        type: newEvent.type as "exam" | "holiday" | "event",
      },
    ])

    setNewEvent({ title: "", date: "", type: "", description: "" })
    setShowForm(false)
    setIsLoading(false)
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar Management</h1>
          <p className="text-muted-foreground mt-1">Add and manage academic calendar events</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <Card className="animate-scale-in border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Add New Event</CardTitle>
            <CardDescription>Create a new academic calendar entry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-foreground">Event Title</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Date</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Event Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: "exam" | "holiday" | "event") => setNewEvent({ ...newEvent, type: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Input
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Brief description"
                  className="bg-background"
                />
              </div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Event"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events Table */}
      <Card className="animate-fade-in-up stagger-1 border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Academic Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Event</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="hover:bg-muted/30 transition-colors opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-4 py-3 font-medium text-card-foreground">{event.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", eventTypeColors[event.type])}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{event.description}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
