"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, FileText, Send, Loader2, CheckCircle } from "lucide-react"

export default function SubmitEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    expectedAttendees: "",
    description: "",
    requirements: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventData.title || !eventData.category || !eventData.date) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md animate-scale-in border-border text-center">
          <CardContent className="p-8 space-y-4">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-accent/20">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">Event Submitted!</h2>
            <p className="text-muted-foreground">
              Your event request has been submitted successfully. You can track its status in the Event Status page.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Event
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Submit Event Request</h1>
        <p className="text-muted-foreground mt-1">Create a new event request for admin approval</p>
      </div>

      <Card className="animate-fade-in-up stagger-1 border-border max-w-3xl">
        <CardHeader>
          <CardTitle className="text-card-foreground">Event Details</CardTitle>
          <CardDescription>Fill in all the required information about your event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-foreground">Event Title</Label>
                <Input
                  value={eventData.title}
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                  placeholder="Enter event title"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Category</Label>
                <Select
                  value={eventData.category}
                  onValueChange={(value) => setEventData({ ...eventData, category: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date
                </Label>
                <Input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Start Time
                </Label>
                <Input
                  type="time"
                  value={eventData.startTime}
                  onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  End Time
                </Label>
                <Input
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Venue
                </Label>
                <Input
                  value={eventData.venue}
                  onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                  placeholder="e.g., Main Auditorium"
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Expected Attendees
                </Label>
                <Input
                  type="number"
                  value={eventData.expectedAttendees}
                  onChange={(e) => setEventData({ ...eventData, expectedAttendees: e.target.value })}
                  placeholder="e.g., 100"
                  className="bg-background"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Event Description
              </Label>
              <Textarea
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                placeholder="Describe your event in detail..."
                className="bg-background min-h-[120px]"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label className="text-foreground">Special Requirements (Optional)</Label>
              <Textarea
                value={eventData.requirements}
                onChange={(e) => setEventData({ ...eventData, requirements: e.target.value })}
                placeholder="Any special equipment, setup, or arrangements needed..."
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full py-5 gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Event Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
