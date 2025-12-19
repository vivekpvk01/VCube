"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClipboardList, Plus, Calendar, Clock, Users, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Exam {
  id: string
  name: string
  type: "mid1" | "mid2" | "end"
  department: string
  semester: string
  startDate: string
  endDate: string
  subjects: number
  status: "scheduled" | "ongoing" | "completed"
}

const initialExams: Exam[] = [
  {
    id: "1",
    name: "Mid Semester 1",
    type: "mid1",
    department: "Computer Science",
    semester: "5",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    subjects: 5,
    status: "scheduled",
  },
  {
    id: "2",
    name: "End Semester",
    type: "end",
    department: "Electronics",
    semester: "3",
    startDate: "2025-01-05",
    endDate: "2025-01-20",
    subjects: 6,
    status: "scheduled",
  },
]

const statusColors = {
  scheduled: "bg-primary/20 text-primary",
  ongoing: "bg-accent/20 text-accent",
  completed: "bg-muted text-muted-foreground",
}

export default function ExamCreationPage() {
  const [exams, setExams] = useState<Exam[]>(initialExams)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newExam, setNewExam] = useState({
    name: "",
    type: "" as "mid1" | "mid2" | "end" | "",
    department: "",
    semester: "",
    startDate: "",
    endDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExam.name || !newExam.type || !newExam.department) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    setExams([
      ...exams,
      {
        id: Date.now().toString(),
        ...newExam,
        type: newExam.type as "mid1" | "mid2" | "end",
        subjects: 5,
        status: "scheduled",
      },
    ])

    setNewExam({ name: "", type: "", department: "", semester: "", startDate: "", endDate: "" })
    setShowForm(false)
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Exam Creation</h1>
          <p className="text-muted-foreground mt-1">Create and schedule examinations</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Exam
        </Button>
      </div>

      {/* Create Exam Form */}
      {showForm && (
        <Card className="animate-scale-in border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Create New Examination</CardTitle>
            <CardDescription>Set up examination schedule and details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-foreground">Exam Name</Label>
                <Input
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                  placeholder="e.g., Mid Semester 1"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Exam Type</Label>
                <Select
                  value={newExam.type}
                  onValueChange={(value: "mid1" | "mid2" | "end") => setNewExam({ ...newExam, type: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mid1">Mid Semester 1</SelectItem>
                    <SelectItem value="mid2">Mid Semester 2</SelectItem>
                    <SelectItem value="end">End Semester</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Department</Label>
                <Select
                  value={newExam.department}
                  onValueChange={(value) => setNewExam({ ...newExam, department: value })}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Semester</Label>
                <Select value={newExam.semester} onValueChange={(value) => setNewExam({ ...newExam, semester: value })}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <SelectItem key={sem} value={sem.toString()}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Start Date</Label>
                <Input
                  type="date"
                  value={newExam.startDate}
                  onChange={(e) => setNewExam({ ...newExam, startDate: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">End Date</Label>
                <Input
                  type="date"
                  value={newExam.endDate}
                  onChange={(e) => setNewExam({ ...newExam, endDate: e.target.value })}
                  className="bg-background"
                />
              </div>
              <div className="lg:col-span-3 flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Exam"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Exams Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {exams.map((exam, index) => (
          <Card
            key={exam.id}
            className={cn(
              "border-border transition-all duration-300 opacity-0 animate-fade-in-up",
              "hover:shadow-lg hover:-translate-y-1 hover:border-primary/30",
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-card-foreground">{exam.name}</CardTitle>
                  <CardDescription>{exam.department}</CardDescription>
                </div>
                <Badge className={statusColors[exam.status]}>{exam.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm text-card-foreground">{exam.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm text-card-foreground">{exam.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm text-card-foreground">Semester {exam.semester}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ClipboardList className="h-4 w-4" />
                  <span className="text-sm text-card-foreground">{exam.subjects} Subjects</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Manage Subjects
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
