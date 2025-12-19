"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Download, Printer, Search, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface SeatAssignment {
  seat: string
  rollNumber: string
  name: string
  department: string
}

const mockSeating: SeatAssignment[] = [
  { seat: "A1", rollNumber: "21CS1001", name: "John Smith", department: "CS" },
  { seat: "A2", rollNumber: "21EC1001", name: "Sarah Johnson", department: "EC" },
  { seat: "A3", rollNumber: "21ME1001", name: "David Brown", department: "ME" },
  { seat: "A4", rollNumber: "21CS1002", name: "Emily Chen", department: "CS" },
  { seat: "A5", rollNumber: "21EC1002", name: "Alex Wilson", department: "EC" },
  { seat: "B1", rollNumber: "21ME1002", name: "Chris Lee", department: "ME" },
  { seat: "B2", rollNumber: "21CS1003", name: "Michael Kumar", department: "CS" },
  { seat: "B3", rollNumber: "21EC1003", name: "Lisa Park", department: "EC" },
  { seat: "B4", rollNumber: "21ME1003", name: "James Taylor", department: "ME" },
  { seat: "B5", rollNumber: "21CS1004", name: "Amy Wong", department: "CS" },
]

const departmentColors: Record<string, string> = {
  CS: "bg-primary/20 text-primary",
  EC: "bg-accent/20 text-accent",
  ME: "bg-chart-3/20 text-chart-3",
}

export default function SeatingChartPage() {
  const [selectedRoom, setSelectedRoom] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSeating = mockSeating.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group by rows
  const rows: SeatAssignment[][] = []
  for (let i = 0; i < filteredSeating.length; i += 5) {
    rows.push(filteredSeating.slice(i, i + 5))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Seating Chart Viewer</h1>
          <p className="text-muted-foreground mt-1">View and export seating arrangements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="animate-fade-in-up stagger-1 border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="101">Room 101 - Block A</SelectItem>
                <SelectItem value="102">Room 102 - Block A</SelectItem>
                <SelectItem value="201">Room 201 - Block A</SelectItem>
                <SelectItem value="301">Room 301 - Block B</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge className={departmentColors.CS}>CS</Badge>
                <span className="text-xs text-muted-foreground">Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={departmentColors.EC}>EC</Badge>
                <span className="text-xs text-muted-foreground">Electronics</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={departmentColors.ME}>ME</Badge>
                <span className="text-xs text-muted-foreground">Mechanical</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Chart */}
      <Card className="animate-fade-in-up stagger-2 border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Room 101 - Block A
          </CardTitle>
          <CardDescription>Seating arrangement for Mid Semester 1 - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Instructor Desk */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg px-12 py-3 text-center">
              <p className="text-sm font-medium text-muted-foreground">INSTRUCTOR DESK</p>
            </div>
          </div>

          {/* Seating Grid */}
          <div className="space-y-4">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex justify-center gap-4 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${rowIndex * 0.15}s` }}
              >
                <div className="flex items-center justify-center w-8 text-sm font-medium text-muted-foreground">
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                {row.map((seat, seatIndex) => (
                  <div
                    key={seat.seat}
                    className={cn(
                      "w-32 p-3 rounded-lg border transition-all duration-300",
                      "hover:shadow-lg hover:-translate-y-1 hover:border-primary/50",
                      "bg-card border-border",
                    )}
                    style={{ animationDelay: `${(rowIndex * 5 + seatIndex) * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {seat.seat}
                      </Badge>
                      <Badge className={cn("text-xs", departmentColors[seat.department])}>{seat.department}</Badge>
                    </div>
                    <p className="font-medium text-card-foreground text-sm truncate">{seat.name}</p>
                    <p className="text-xs text-muted-foreground">{seat.rollNumber}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Door Indicator */}
          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-8 w-1 bg-accent rounded-full" />
              <span className="text-sm">Entry/Exit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 animate-fade-in-up stagger-3">
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">60</p>
              <p className="text-sm text-muted-foreground">Total Seats</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">58</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Users className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">2</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
