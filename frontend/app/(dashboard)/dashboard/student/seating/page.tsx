"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Clock, Building2, Hash, Armchair } from "lucide-react"
import { cn } from "@/lib/utils"

interface SeatingInfo {
  examName: string
  date: string
  time: string
  building: string
  room: string
  bench: string
  seat: string
}

const upcomingExams: SeatingInfo[] = [
  {
    examName: "Machine Learning (CS501)",
    date: "December 20, 2024",
    time: "10:00 AM - 1:00 PM",
    building: "Block A",
    room: "Room 201",
    bench: "Row 3",
    seat: "Seat 12",
  },
  {
    examName: "Computer Networks (CS502)",
    date: "December 22, 2024",
    time: "10:00 AM - 1:00 PM",
    building: "Block A",
    room: "Room 105",
    bench: "Row 5",
    seat: "Seat 8",
  },
  {
    examName: "Database Systems (CS503)",
    date: "December 24, 2024",
    time: "2:00 PM - 5:00 PM",
    building: "Block B",
    room: "Room 302",
    bench: "Row 2",
    seat: "Seat 15",
  },
]

export default function SeatingPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Seating Arrangement</h1>
        <p className="text-muted-foreground mt-1">Find your exam room and seat allocation</p>
      </div>

      {/* Student Info */}
      <Card className="animate-fade-in-up stagger-1 border-border bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-card-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">
                {user?.rollNumber} • {user?.department}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingExams.map((exam, index) => (
          <Card
            key={exam.examName}
            className={cn(
              "border-border overflow-hidden transition-all duration-300 opacity-0 animate-fade-in-up",
              "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
            )}
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
          >
            <CardHeader className="bg-muted/50 pb-4">
              <CardTitle className="text-lg text-card-foreground">{exam.examName}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {exam.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-card-foreground">{exam.time}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Building</p>
                    <p className="font-medium text-card-foreground">{exam.building}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Room</p>
                    <p className="font-medium text-card-foreground">{exam.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bench</p>
                    <p className="font-medium text-card-foreground">{exam.bench}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Armchair className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Seat</p>
                    <p className="font-medium text-card-foreground">{exam.seat}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
