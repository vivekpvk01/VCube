"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, Trash2 } from "lucide-react"

const blocks = ["Block A", "Block B", "Block C", "Block D"]

const initialRooms = [
  { id: 1, block: "Block A", room: "101", rows: 6, benches: 10, capacity: 60 },
  { id: 2, block: "Block A", room: "102", rows: 6, benches: 10, capacity: 60 },
  { id: 3, block: "Block A", room: "201", rows: 8, benches: 10, capacity: 80 },
  { id: 4, block: "Block B", room: "105", rows: 5, benches: 8, capacity: 40 },
  { id: 5, block: "Block C", room: "301", rows: 10, benches: 12, capacity: 120 },
]

export default function UploadRoomsPage() {
  const [rooms, setRooms] = useState(initialRooms)
  const [showForm, setShowForm] = useState(false)
  const [newRoom, setNewRoom] = useState({ block: "", room: "", rows: "", benches: "" })

  const handleAddRoom = () => {
    if (newRoom.block && newRoom.room && newRoom.rows && newRoom.benches) {
      const capacity = Number.parseInt(newRoom.rows) * Number.parseInt(newRoom.benches)
      setRooms([
        ...rooms,
        {
          id: Date.now(),
          block: newRoom.block,
          room: newRoom.room,
          rows: Number.parseInt(newRoom.rows),
          benches: Number.parseInt(newRoom.benches),
          capacity,
        },
      ])
      setNewRoom({ block: "", room: "", rows: "", benches: "" })
      setShowForm(false)
    }
  }

  const handleDelete = (id: number) => {
    setRooms(rooms.filter((r) => r.id !== id))
  }

  const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            Upload Rooms & Benches
          </h1>
          <p className="text-muted-foreground">Configure examination rooms and seating capacity</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{rooms.length}</div>
            <p className="text-sm text-muted-foreground">Total Rooms</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{new Set(rooms.map((r) => r.block)).size}</div>
            <p className="text-sm text-muted-foreground">Blocks</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-sm text-muted-foreground">Total Capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Room Form */}
      {showForm && (
        <Card className="animate-fade-in-up border-primary/50">
          <CardHeader>
            <CardTitle>Add New Room</CardTitle>
            <CardDescription>Configure room and bench details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Block</Label>
                <Select value={newRoom.block} onValueChange={(value) => setNewRoom({ ...newRoom, block: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    {blocks.map((block) => (
                      <SelectItem key={block} value={block}>
                        {block}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Room Number</Label>
                <Input
                  placeholder="e.g., 201"
                  value={newRoom.room}
                  onChange={(e) => setNewRoom({ ...newRoom, room: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Number of Rows</Label>
                <Input
                  type="number"
                  placeholder="e.g., 6"
                  value={newRoom.rows}
                  onChange={(e) => setNewRoom({ ...newRoom, rows: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Benches per Row</Label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={newRoom.benches}
                  onChange={(e) => setNewRoom({ ...newRoom, benches: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddRoom}>Add Room</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <CardHeader>
          <CardTitle>Configured Rooms</CardTitle>
          <CardDescription>
            {rooms.length} rooms with {totalCapacity} total seats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${0.3 + index * 0.02}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {room.block} - Room {room.room}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {room.rows} rows × {room.benches} benches
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{room.capacity} seats</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(room.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
