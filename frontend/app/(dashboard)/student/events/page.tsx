"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PartyPopper, Calendar, MapPin, Clock, Users } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "Tech Fest 2025",
    club: "Technical Club",
    date: "Jan 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "Main Auditorium",
    attendees: 500,
    category: "Technical",
    description: "Annual technical festival featuring hackathons, workshops, and competitions.",
  },
  {
    id: 2,
    title: "Cultural Night",
    club: "Cultural Committee",
    date: "Jan 20, 2025",
    time: "5:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    attendees: 800,
    category: "Cultural",
    description: "A night of music, dance, and theatrical performances by students.",
  },
  {
    id: 3,
    title: "Career Fair",
    club: "Placement Cell",
    date: "Jan 25, 2025",
    time: "10:00 AM - 4:00 PM",
    venue: "Convention Center",
    attendees: 1200,
    category: "Career",
    description: "Connect with top companies and explore internship and job opportunities.",
  },
  {
    id: 4,
    title: "Sports Meet",
    club: "Sports Committee",
    date: "Feb 1-3, 2025",
    time: "7:00 AM - 5:00 PM",
    venue: "Sports Complex",
    attendees: 600,
    category: "Sports",
    description: "Inter-departmental sports competition featuring various athletic events.",
  },
]

const categoryColors: Record<string, string> = {
  Technical: "bg-blue-500",
  Cultural: "bg-pink-500",
  Career: "bg-green-500",
  Sports: "bg-orange-500",
}

export default function EventsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <PartyPopper className="h-8 w-8 text-primary" />
          Approved Events
        </h1>
        <p className="text-muted-foreground">Browse and register for upcoming college events</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button variant="default" size="sm">
          All Events
        </Button>
        {Object.keys(categoryColors).map((cat) => (
          <Button key={cat} variant="outline" size="sm">
            {cat}
          </Button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockEvents.map((event, index) => (
          <Card
            key={event.id}
            className="overflow-hidden animate-fade-in-up hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="mt-1">Organized by {event.club}</CardDescription>
                </div>
                <Badge className={`${categoryColors[event.category]} text-white`}>{event.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees}+ attending</span>
                </div>
              </div>
              <Button className="w-full">Register Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
