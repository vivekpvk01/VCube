"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, Download, Printer, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const rooms = ["A-101", "A-102", "A-201", "B-105", "C-301"]
const departments = [
  { name: "CSE", color: "bg-blue-500" },
  { name: "ECE", color: "bg-green-500" },
  { name: "MECH", color: "bg-orange-500" },
  { name: "CIVIL", color: "bg-purple-500" },
]

// Generate mock seating data
const generateSeats = (rows: number, cols: number) => {
  const seats = []
  for (let r = 0; r < rows; r++) {
    const row = []
    for (let c = 0; c < cols; c++) {
      const dept = departments[Math.floor(Math.random() * departments.length)]
      row.push({
        rollNumber: `${dept.name.substring(0, 2)}${21 + Math.floor(Math.random() * 4)}${String(Math.floor(Math.random() * 200) + 1).padStart(3, "0")}`,
        department: dept.name,
        color: dept.color,
      })
    }
    seats.push(row)
  }
  return seats
}

export default function ViewSeatingPage() {
  const [selectedRoom, setSelectedRoom] = useState("A-101")
  const [searchQuery, setSearchQuery] = useState("")
  const seats = generateSeats(6, 10)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Seating Chart
          </h1>
          <p className="text-muted-foreground">View and export seating arrangements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" /> Print
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select room" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map((room) => (
              <SelectItem key={room} value={room}>
                Room {room}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {departments.map((dept) => (
          <div key={dept.name} className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded ${dept.color}`} />
            <span className="text-sm">{dept.name}</span>
          </div>
        ))}
      </div>

      {/* Seating Chart */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Room {selectedRoom}</CardTitle>
              <CardDescription>6 rows × 10 seats = 60 capacity</CardDescription>
            </div>
            <Badge variant="outline">Mid Semester 1 - Dec 2024</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Blackboard */}
          <div className="mb-6 p-3 rounded-lg bg-muted text-center text-sm font-medium text-muted-foreground">
            BLACKBOARD / FRONT
          </div>

          {/* Seats Grid */}
          <div className="overflow-x-auto">
            <div className="space-y-2 min-w-[600px]">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                  <div className="w-8 flex items-center justify-center text-sm text-muted-foreground font-medium">
                    R{rowIndex + 1}
                  </div>
                  {row.map((seat, seatIndex) => {
                    const isHighlighted =
                      searchQuery && seat.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
                    return (
                      <div
                        key={seatIndex}
                        className={`flex-1 p-2 rounded-lg border text-center text-xs transition-all ${
                          isHighlighted ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted/50"
                        }`}
                        title={`${seat.rollNumber} - ${seat.department}`}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${seat.color} mx-auto mb-1`} />
                        <span className="font-mono">{seat.rollNumber.slice(-5)}</span>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Door */}
          <div className="mt-6 flex justify-end">
            <div className="px-4 py-2 rounded-lg border-2 border-dashed text-sm text-muted-foreground">DOOR</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
