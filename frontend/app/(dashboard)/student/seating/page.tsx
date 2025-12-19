"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Calendar, Clock } from "lucide-react"

const mockSeatingData = [
  {
    exam: "Data Structures",
    code: "CS301",
    date: "Dec 22, 2024",
    time: "10:00 AM",
    block: "Block A",
    room: "201",
    row: "3",
    seat: "15",
  },
  {
    exam: "Database Systems",
    code: "CS302",
    date: "Dec 24, 2024",
    time: "2:00 PM",
    block: "Block B",
    room: "105",
    row: "2",
    seat: "8",
  },
  {
    exam: "Operating Systems",
    code: "CS303",
    date: "Dec 26, 2024",
    time: "10:00 AM",
    block: "Block A",
    room: "301",
    row: "4",
    seat: "22",
  },
]

export default function SeatingPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          Seating Arrangement
        </h1>
        <p className="text-muted-foreground">View your assigned seats for upcoming examinations</p>
      </div>

      {/* Student Info Card */}
      <Card className="animate-fade-in-up bg-primary/5 border-primary/20" style={{ animationDelay: "0.1s" }}>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Student Name</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Roll Number</p>
              <p className="font-semibold">{user?.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-semibold">{user?.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="font-semibold">{user?.semester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockSeatingData.map((seat, index) => (
          <Card
            key={seat.code}
            className="overflow-hidden animate-fade-in-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${0.15 + index * 0.05}s` }}
          >
            <CardHeader className="bg-muted/30 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{seat.exam}</CardTitle>
                <Badge variant="outline">{seat.code}</Badge>
              </div>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {seat.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {seat.time}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {seat.block} - Room {seat.room}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Row</p>
                  <p className="text-2xl font-bold text-primary">{seat.row}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Seat</p>
                  <p className="text-2xl font-bold text-primary">{seat.seat}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
