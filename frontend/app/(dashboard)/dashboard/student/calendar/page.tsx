"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, BookOpen, PartyPopper, Palmtree } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  date: Date
  type: "exam" | "holiday" | "event"
  description?: string
}

const events: CalendarEvent[] = [
  { id: "1", title: "Mid Semester 1 Begins", date: new Date(2024, 11, 15), type: "exam" },
  { id: "2", title: "Christmas Holiday", date: new Date(2024, 11, 25), type: "holiday" },
  { id: "3", title: "Tech Fest 2024", date: new Date(2024, 11, 20), type: "event" },
  { id: "4", title: "Mid Semester 1 Ends", date: new Date(2024, 11, 22), type: "exam" },
  { id: "5", title: "New Year", date: new Date(2025, 0, 1), type: "holiday" },
  { id: "6", title: "Cultural Night", date: new Date(2024, 11, 28), type: "event" },
]

const eventColors = {
  exam: "bg-destructive/20 text-destructive border-destructive/30",
  holiday: "bg-accent/20 text-accent border-accent/30",
  event: "bg-primary/20 text-primary border-primary/30",
}

const eventIcons = {
  exam: BookOpen,
  holiday: Palmtree,
  event: PartyPopper,
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1))
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month && eventDate.getDate() === day
    })
  }

  const monthEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Academic Calendar</h1>
        <p className="text-muted-foreground mt-1">View upcoming exams, holidays, and events</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2 animate-fade-in-up stagger-1 border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-card-foreground">
              {months[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[80px] p-1" />
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayEvents = getEventsForDate(day)
                const isToday =
                  day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

                return (
                  <div
                    key={day}
                    className={cn(
                      "min-h-[80px] p-1 rounded-lg border border-transparent transition-all",
                      "hover:border-border hover:bg-muted/30",
                      isToday && "bg-primary/10 border-primary/30",
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full",
                        isToday && "bg-primary text-primary-foreground",
                        !isToday && "text-card-foreground",
                      )}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={cn(
                            "w-full text-left text-xs px-1.5 py-0.5 rounded truncate border",
                            eventColors[event.type],
                            "hover:opacity-80 transition-opacity",
                          )}
                        >
                          {event.title}
                        </button>
                      ))}
                      {dayEvents.length > 2 && (
                        <p className="text-xs text-muted-foreground px-1">+{dayEvents.length - 2} more</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card className="animate-fade-in-up stagger-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-card-foreground">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(eventColors).map(([type, color]) => {
                const Icon = eventIcons[type as keyof typeof eventIcons]
                return (
                  <div key={type} className="flex items-center gap-3">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg border", color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-card-foreground capitalize">{type}s</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="animate-fade-in-up stagger-3 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-card-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monthEvents.length > 0 ? (
                monthEvents.map((event, index) => {
                  const Icon = eventIcons[event.type]
                  return (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg border transition-all opacity-0 animate-fade-in-up",
                        "hover:bg-muted/50",
                        eventColors[event.type],
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <div className="text-left min-w-0">
                        <p className="font-medium text-sm truncate">{event.title}</p>
                        <p className="text-xs opacity-70">{event.date.toLocaleDateString()}</p>
                      </div>
                    </button>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No events this month</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedEvent(null)}
        >
          <Card className="w-full max-w-md mx-4 animate-scale-in border-border" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg border",
                    eventColors[selectedEvent.type],
                  )}
                >
                  {(() => {
                    const Icon = eventIcons[selectedEvent.type]
                    return <Icon className="h-6 w-6" />
                  })()}
                </div>
                <div>
                  <CardTitle className="text-card-foreground">{selectedEvent.title}</CardTitle>
                  <p className="text-sm text-muted-foreground capitalize">{selectedEvent.type}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-card-foreground">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span>
                  {selectedEvent.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Button className="w-full" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
