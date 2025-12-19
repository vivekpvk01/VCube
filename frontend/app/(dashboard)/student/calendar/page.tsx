"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

const eventTypes = {
  exam: { label: "Exam", color: "bg-red-500" },
  holiday: { label: "Holiday", color: "bg-green-500" },
  event: { label: "Event", color: "bg-blue-500" },
  deadline: { label: "Deadline", color: "bg-orange-500" },
}

const mockEvents = [
  { date: "2024-12-22", title: "Mid Semester Exams Begin", type: "exam" },
  { date: "2024-12-25", title: "Christmas Holiday", type: "holiday" },
  { date: "2024-12-28", title: "Mid Semester Exams End", type: "exam" },
  { date: "2024-12-31", title: "New Year's Eve", type: "holiday" },
  { date: "2025-01-02", title: "Classes Resume", type: "event" },
  { date: "2025-01-10", title: "Assignment Submission", type: "deadline" },
  { date: "2025-01-15", title: "Tech Fest", type: "event" },
  { date: "2025-01-26", title: "Republic Day", type: "holiday" },
]

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((e) => e.date === dateStr)
  }

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          Academic Calendar
        </h1>
        <p className="text-muted-foreground">View important dates, exams, and events</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(eventTypes).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${value.color}`} />
            <span className="text-sm text-muted-foreground">{value.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const events = getEventsForDate(day)
              const isToday =
                new Date().toDateString() ===
                new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

              return (
                <div
                  key={day}
                  className={`min-h-[80px] p-2 border rounded-lg transition-colors hover:bg-muted/50 ${isToday ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
                  <div className="mt-1 space-y-1">
                    {events.map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs px-1 py-0.5 rounded truncate text-white ${eventTypes[event.type as keyof typeof eventTypes].color}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.slice(0, 5).map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${eventTypes[event.type as keyof typeof eventTypes].color}`} />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{eventTypes[event.type as keyof typeof eventTypes].label}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
