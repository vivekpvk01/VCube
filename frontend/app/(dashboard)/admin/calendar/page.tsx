"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Pencil, Trash2 } from "lucide-react"

const eventTypes = [
  { value: "exam", label: "Exam", color: "bg-red-500" },
  { value: "holiday", label: "Holiday", color: "bg-green-500" },
  { value: "event", label: "Event", color: "bg-blue-500" },
  { value: "deadline", label: "Deadline", color: "bg-orange-500" },
]

const initialEvents = [
  { id: 1, title: "Mid Semester Exams Begin", date: "2024-12-22", type: "exam" },
  { id: 2, title: "Christmas Holiday", date: "2024-12-25", type: "holiday" },
  { id: 3, title: "Tech Fest", date: "2025-01-15", type: "event" },
  { id: 4, title: "Assignment Deadline", date: "2025-01-10", type: "deadline" },
]

export default function AdminCalendarPage() {
  const [events, setEvents] = useState(initialEvents)
  const [showForm, setShowForm] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "" })

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.type) {
      setEvents([...events, { ...newEvent, id: Date.now() }])
      setNewEvent({ title: "", date: "", type: "" })
      setShowForm(false)
    }
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Calendar Management
          </h1>
          <p className="text-muted-foreground">Add and manage academic calendar events</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <Card className="animate-fade-in-up border-primary/50">
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Create a new calendar event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Event Title</Label>
                <Input
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddEvent}>Save Event</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Calendar Events</CardTitle>
          <CardDescription>{events.length} events scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.map((event, index) => {
              const eventType = eventTypes.find((t) => t.value === event.type)
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                  style={{ animationDelay: `${0.15 + index * 0.03}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${eventType?.color}`} />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{eventType?.label}</Badge>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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
