"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  club: string
  date: string
  time: string
  venue: string
  attendees: number
  category: "technical" | "cultural" | "sports" | "workshop"
  description: string
}

const approvedEvents: Event[] = [
  {
    id: "1",
    title: "Tech Fest 2024",
    club: "Computer Science Society",
    date: "December 20, 2024",
    time: "9:00 AM - 6:00 PM",
    venue: "Main Auditorium",
    attendees: 250,
    category: "technical",
    description: "Annual technical festival featuring hackathons, coding competitions, and tech talks.",
  },
  {
    id: "2",
    title: "Cultural Night",
    club: "Arts & Culture Club",
    date: "December 28, 2024",
    time: "6:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    attendees: 500,
    category: "cultural",
    description: "A celebration of diverse cultures through music, dance, and performances.",
  },
  {
    id: "3",
    title: "AI/ML Workshop",
    club: "Data Science Club",
    date: "January 5, 2025",
    time: "10:00 AM - 4:00 PM",
    venue: "Lab Complex, Room 301",
    attendees: 60,
    category: "workshop",
    description: "Hands-on workshop covering machine learning fundamentals and practical applications.",
  },
  {
    id: "4",
    title: "Inter-Department Cricket",
    club: "Sports Committee",
    date: "January 10, 2025",
    time: "7:00 AM - 5:00 PM",
    venue: "Sports Ground",
    attendees: 150,
    category: "sports",
    description: "Annual cricket tournament between departments. Register your team now!",
  },
]

const categoryColors = {
  technical: "bg-primary/20 text-primary border-primary/30",
  cultural: "bg-accent/20 text-accent border-accent/30",
  sports: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  workshop: "bg-chart-5/20 text-chart-5 border-chart-5/30",
}

export default function EventsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Approved Events</h1>
        <p className="text-muted-foreground mt-1">Browse upcoming club events and activities</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 animate-fade-in-up stagger-1">
        {["All", "Technical", "Cultural", "Sports", "Workshop"].map((category) => (
          <Badge
            key={category}
            variant="outline"
            className="px-4 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {approvedEvents.map((event, index) => (
          <Card
            key={event.id}
            className={cn(
              "border-border overflow-hidden transition-all duration-300 opacity-0 animate-fade-in-up",
              "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
            )}
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className={cn("mb-2", categoryColors[event.category])}>{event.category}</Badge>
                  <CardTitle className="text-xl text-card-foreground">{event.title}</CardTitle>
                  <CardDescription>{event.club}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-card-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-card-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-card-foreground">{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-card-foreground">{event.attendees} attending</span>
                </div>
              </div>

              <Button className="w-full group">
                View Details
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
