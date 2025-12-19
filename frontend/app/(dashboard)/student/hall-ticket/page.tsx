"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Ticket, Download, QrCode, Calendar, MapPin, Clock } from "lucide-react"

const academicYears = ["2024-25", "2023-24", "2022-23"]
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]
const examTypes = [
  { value: "mid1", label: "Mid Semester 1" },
  { value: "mid2", label: "Mid Semester 2" },
  { value: "end", label: "End Semester" },
]

const mockExamSchedule = [
  { subject: "Data Structures", code: "CS301", date: "Dec 22, 2024", time: "10:00 AM", venue: "Block A - Room 201" },
  { subject: "Database Systems", code: "CS302", date: "Dec 24, 2024", time: "2:00 PM", venue: "Block B - Room 105" },
  { subject: "Operating Systems", code: "CS303", date: "Dec 26, 2024", time: "10:00 AM", venue: "Block A - Room 301" },
  { subject: "Computer Networks", code: "CS304", date: "Dec 28, 2024", time: "2:00 PM", venue: "Block C - Room 102" },
]

export default function HallTicketPage() {
  const { user } = useAuth()
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedExamType, setSelectedExamType] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const canGenerate = selectedYear && selectedSemester && selectedExamType

  const handleGenerate = () => {
    if (canGenerate) {
      setShowPreview(true)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Ticket className="h-8 w-8 text-primary" />
          Hall Ticket
        </h1>
        <p className="text-muted-foreground">Generate and download your examination hall tickets</p>
      </div>

      {/* Selection Form */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Select Examination</CardTitle>
          <CardDescription>
            Choose the academic year, semester, and exam type to generate your hall ticket
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Academic Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Semester</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
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
              <Label>Exam Type</Label>
              <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={!canGenerate} className="w-full md:w-auto">
            Generate Hall Ticket
          </Button>
        </CardContent>
      </Card>

      {/* Hall Ticket Preview */}
      {showPreview && (
        <Card className="animate-fade-in-up border-primary/50" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Examination Hall Ticket</CardTitle>
                <CardDescription>
                  {examTypes.find((e) => e.value === selectedExamType)?.label} - Semester {selectedSemester} (
                  {selectedYear})
                </CardDescription>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30">
                <QrCode className="h-10 w-10 text-muted-foreground/50" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Student Info */}
            <div className="grid gap-4 md:grid-cols-2 p-4 rounded-lg bg-muted/30">
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
                <p className="text-sm text-muted-foreground">Institution</p>
                <p className="font-semibold">{user?.institution}</p>
              </div>
            </div>

            {/* Exam Schedule */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Examination Schedule</h3>
              <div className="space-y-2">
                {mockExamSchedule.map((exam, index) => (
                  <div
                    key={exam.code}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{exam.subject}</p>
                      <p className="text-sm text-muted-foreground">{exam.code}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 md:mt-0 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" /> {exam.date}
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
            </div>

            {/* Download Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download Hall Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
