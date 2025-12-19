"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Loader2, QrCode, Calendar, GraduationCap, User } from "lucide-react"
import { cn } from "@/lib/utils"

const academicYears = ["2024-25", "2023-24", "2022-23"]
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]
const examTypes = [
  { value: "mid1", label: "Mid Semester 1" },
  { value: "mid2", label: "Mid Semester 2" },
  { value: "end", label: "End Semester" },
]

interface HallTicketData {
  studentName: string
  rollNumber: string
  department: string
  semester: string
  academicYear: string
  examType: string
  subjects: { code: string; name: string; date: string; time: string }[]
  venue: string
  instructions: string[]
}

export default function HallTicketPage() {
  const { user } = useAuth()
  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [examType, setExamType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [hallTicket, setHallTicket] = useState<HallTicketData | null>(null)

  const canGenerate = academicYear && semester && examType

  const handleGenerate = async () => {
    if (!canGenerate) return

    setIsGenerating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setHallTicket({
      studentName: user?.name || "Student Name",
      rollNumber: user?.rollNumber || "21CS1045",
      department: user?.department || "Computer Science",
      semester: semester,
      academicYear: academicYear,
      examType: examTypes.find((e) => e.value === examType)?.label || examType,
      subjects: [
        { code: "CS501", name: "Machine Learning", date: "Dec 20, 2024", time: "10:00 AM" },
        { code: "CS502", name: "Computer Networks", date: "Dec 22, 2024", time: "10:00 AM" },
        { code: "CS503", name: "Database Systems", date: "Dec 24, 2024", time: "02:00 PM" },
        { code: "CS504", name: "Software Engineering", date: "Dec 26, 2024", time: "10:00 AM" },
        { code: "CS505", name: "Operating Systems", date: "Dec 28, 2024", time: "02:00 PM" },
      ],
      venue: "Main Examination Hall, Block A",
      instructions: [
        "Report 30 minutes before the exam",
        "Carry valid ID proof along with hall ticket",
        "Electronic devices are not allowed",
        "Follow COVID-19 safety protocols",
      ],
    })

    setIsGenerating(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Hall Ticket Generation</h1>
        <p className="text-muted-foreground mt-1">Generate and download your examination hall ticket</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Selection Form */}
        <Card className="animate-fade-in-up stagger-1 border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Select Examination</CardTitle>
            <CardDescription>Choose your academic year, semester, and exam type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground">Academic Year</Label>
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Select academic year" />
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
              <Label className="text-foreground">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="bg-background border-input">
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
              <Label className="text-foreground">Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className="bg-background border-input">
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

            <Button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={cn(
                "w-full py-5 transition-all duration-300",
                canGenerate && !isGenerating && "animate-shimmer",
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Hall Ticket"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Hall Ticket Preview */}
        {hallTicket ? (
          <Card
            className={cn(
              "border-border overflow-hidden opacity-0 animate-fade-in-up",
              "bg-gradient-to-br from-card via-card to-muted/30",
            )}
          >
            <CardHeader className="bg-primary text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary-foreground">Examination Hall Ticket</CardTitle>
                  <CardDescription className="text-primary-foreground/80">
                    {hallTicket.examType} - {hallTicket.academicYear}
                  </CardDescription>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <QrCode className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Student Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Student Name</p>
                    <p className="font-semibold text-card-foreground">{hallTicket.studentName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Roll Number</p>
                    <p className="font-semibold text-card-foreground">{hallTicket.rollNumber}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Department & Semester</p>
                  <p className="font-medium text-card-foreground">
                    {hallTicket.department} - Semester {hallTicket.semester}
                  </p>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Subject</th>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-2 text-left font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {hallTicket.subjects.map((subject, index) => (
                      <tr
                        key={subject.code}
                        className="opacity-0 animate-slide-in-right"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-card-foreground">{subject.name}</p>
                          <p className="text-xs text-muted-foreground">{subject.code}</p>
                        </td>
                        <td className="px-4 py-3 text-card-foreground">{subject.date}</td>
                        <td className="px-4 py-3 text-card-foreground">{subject.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Download Button */}
              <Button className="w-full group">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="animate-fade-in-up stagger-2 border-border border-dashed flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-muted">
                <QrCode className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">No Hall Ticket Generated</p>
                <p className="text-sm text-muted-foreground">Select options and generate to preview</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
