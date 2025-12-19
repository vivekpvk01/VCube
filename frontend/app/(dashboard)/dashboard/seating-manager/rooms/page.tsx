"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Plus, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Room {
  id: string
  name: string
  building: string
  capacity: number
  rows: number
  seatsPerRow: number
}

const initialRooms: Room[] = [
  { id: "1", name: "Room 101", building: "Block A", capacity: 60, rows: 6, seatsPerRow: 10 },
  { id: "2", name: "Room 102", building: "Block A", capacity: 40, rows: 4, seatsPerRow: 10 },
  { id: "3", name: "Room 201", building: "Block A", capacity: 50, rows: 5, seatsPerRow: 10 },
  { id: "4", name: "Room 301", building: "Block B", capacity: 80, rows: 8, seatsPerRow: 10 },
  { id: "5", name: "Room 302", building: "Block B", capacity: 45, rows: 5, seatsPerRow: 9 },
]

export default function UploadRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [showForm, setShowForm] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    building: "",
    rows: "",
    seatsPerRow: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoom.name || !newRoom.building || !newRoom.rows || !newRoom.seatsPerRow) return

    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const rows = Number.parseInt(newRoom.rows)
    const seatsPerRow = Number.parseInt(newRoom.seatsPerRow)

    setRooms([
      ...rooms,
      {
        id: Date.now().toString(),
        name: newRoom.name,
        building: newRoom.building,
        rows,
        seatsPerRow,
        capacity: rows * seatsPerRow,
      },
    ])

    setNewRoom({ name: "", building: "", rows: "", seatsPerRow: "" })
    setShowForm(false)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id))
  }

  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Rooms & Benches</h1>
          <p className="text-muted-foreground mt-1">Configure examination rooms and seating capacity</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 animate-fade-in-up stagger-1">
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{rooms.length}</p>
              <p className="text-sm text-muted-foreground">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Building2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{totalCapacity}</p>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
              <Building2 className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{new Set(rooms.map((r) => r.building)).size}</p>
              <p className="text-sm text-muted-foreground">Buildings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Room Form */}
      {showForm && (
        <Card className="animate-scale-in border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Add New Room</CardTitle>
            <CardDescription>Configure room details and seating arrangement</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-foreground">Room Name</Label>
                <Input
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  placeholder="e.g., Room 101"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Building</Label>
                <Input
                  value={newRoom.building}
                  onChange={(e) => setNewRoom({ ...newRoom, building: e.target.value })}
                  placeholder="e.g., Block A"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Number of Rows</Label>
                <Input
                  type="number"
                  value={newRoom.rows}
                  onChange={(e) => setNewRoom({ ...newRoom, rows: e.target.value })}
                  placeholder="e.g., 6"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Seats per Row</Label>
                <Input
                  type="number"
                  value={newRoom.seatsPerRow}
                  onChange={(e) => setNewRoom({ ...newRoom, seatsPerRow: e.target.value })}
                  placeholder="e.g., 10"
                  className="bg-background"
                />
              </div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Room"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Rooms Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, index) => (
          <Card
            key={room.id}
            className={cn(
              "border-border transition-all duration-300 opacity-0 animate-fade-in-up",
              "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
            )}
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDelete(room.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">{room.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{room.building}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-card-foreground">{room.capacity}</p>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-card-foreground">{room.rows}</p>
                  <p className="text-xs text-muted-foreground">Rows</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-card-foreground">{room.seatsPerRow}</p>
                  <p className="text-xs text-muted-foreground">Seats/Row</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
