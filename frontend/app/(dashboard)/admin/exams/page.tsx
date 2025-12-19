"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Plus, Calendar, Clock, MapPin } from "lucide-react"

const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"]
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]

const initialExams = [
  {
    id: 1,
    subject: "Data Structures",
    code: "CS301",
    department: "Computer Science",
    semester: "5",
    date: "2024-12-22",
    time: "10:00",
    venue: "Block A",
  },
  {
    id: 2,
    subject: "Database Systems",
    code: "CS302",
    department: "Computer Science",
    semester: "5",
    date: "2024-12-24",
    time: "14:00",
    venue: "Block B",
  },
  {
    id: 3,
    subject: "Digital Electronics",
    code: "EC301",
    department: "Electronics",
    semester: "5",
    date: "2024-12-23",
    time: "10:00",
    venue: "Block C",
  },
]

export default function ExamCreationPage() {
  const [exams, setExams] = useState(initialExams)
  const [showForm, setShowForm] = useState(false)
  const [newExam, setNewExam] = useState({
    subject: "",
    code: "",
    department: "",
    semester: "",
    date: "",
    time: "",
    venue: "",
  })

  const handleAddExam = () => {
    if (newExam.subject && newExam.code && newExam.department && newExam.date) {
      setExams([...exams, { ...newExam, id: Date.now() }])
      setNewExam({ subject: "", code: "", department: "", semester: "", date: "", time: "", venue: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            Exam Creation
          </h1>
          <p className="text-muted-foreground">Schedule and configure examinations</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Exam
        </Button>
      </div>

      {/* Add Exam Form */}
      {showForm && (
        <Card className="animate-fade-in-up border-primary/50">
          <CardHeader>
            <CardTitle>Schedule New Exam</CardTitle>
            <CardDescription>Fill in the examination details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Subject Name</Label>
                <Input
                  placeholder="Enter subject name"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subject Code</Label>
                <Input
                  placeholder="e.g., CS301"
                  value={newExam.code}
                  onChange={(e) => setNewExam({ ...newExam, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={newExam.department}
                  onValueChange={(value) => setNewExam({ ...newExam, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select value={newExam.semester} onValueChange={(value) => setNewExam({ ...newExam, semester: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        Semester {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newExam.time}
                  onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Venue</Label>
                <Input
                  placeholder="e.g., Block A"
                  value={newExam.venue}
                  onChange={(e) => setNewExam({ ...newExam, venue: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddExam}>Schedule Exam</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exams List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Scheduled Examinations</CardTitle>
          <CardDescription>{exams.length} exams scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exams.map((exam, index) => (
              <div
                key={exam.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.03}s` }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{exam.subject}</p>
                    <Badge variant="outline">{exam.code}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exam.department} • Semester {exam.semester}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 md:mt-0 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {new Date(exam.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {exam.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {exam.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
