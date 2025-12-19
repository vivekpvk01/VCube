"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Send, CheckCircle } from "lucide-react"

const categories = ["Technical", "Cultural", "Sports", "Academic", "Social"]
const venues = ["Main Auditorium", "Seminar Hall", "Open Air Theatre", "Sports Complex", "Tech Block"]

export default function SubmitEventPage() {
  const [submitted, setSubmitted] = useState(false)
  const [event, setEvent] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    duration: "",
    venue: "",
    expectedAttendees: "",
    budget: "",
  })

  const handleSubmit = () => {
    if (event.title && event.category && event.date && event.venue) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Event Submitted!</h2>
              <p className="text-muted-foreground mt-2">
                Your event has been submitted for approval. You can track its status in the Event Status page.
              </p>
            </div>
            <Button onClick={() => setSubmitted(false)}>Submit Another Event</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Upload className="h-8 w-8 text-primary" />
          Submit Event
        </h1>
        <p className="text-muted-foreground">Submit a new event for admin approval</p>
      </div>

      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Fill in all the details about your event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>Event Title</Label>
              <Input
                placeholder="Enter event title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your event"
                rows={4}
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={event.category} onValueChange={(value) => setEvent({ ...event, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Venue</Label>
              <Select value={event.venue} onValueChange={(value) => setEvent({ ...event, venue: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue} value={venue}>
                      {venue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Duration (hours)</Label>
              <Input
                type="number"
                placeholder="e.g., 3"
                value={event.duration}
                onChange={(e) => setEvent({ ...event, duration: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Expected Attendees</Label>
              <Input
                type="number"
                placeholder="e.g., 200"
                value={event.expectedAttendees}
                onChange={(e) => setEvent({ ...event, expectedAttendees: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Estimated Budget (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 50000"
                value={event.budget}
                onChange={(e) => setEvent({ ...event, budget: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="h-4 w-4" /> Submit for Approval
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
