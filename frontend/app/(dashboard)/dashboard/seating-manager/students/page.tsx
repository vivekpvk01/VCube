"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileSpreadsheet, Loader2, CheckCircle, Users, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Student {
  rollNumber: string
  name: string
  department: string
  semester: string
}

const mockStudents: Student[] = [
  { rollNumber: "21CS1001", name: "John Smith", department: "Computer Science", semester: "5" },
  { rollNumber: "21CS1002", name: "Emily Chen", department: "Computer Science", semester: "5" },
  { rollNumber: "21CS1003", name: "Michael Kumar", department: "Computer Science", semester: "5" },
  { rollNumber: "21EC1001", name: "Sarah Johnson", department: "Electronics", semester: "5" },
  { rollNumber: "21EC1002", name: "Alex Wilson", department: "Electronics", semester: "5" },
  { rollNumber: "21ME1001", name: "David Brown", department: "Mechanical", semester: "5" },
]

export default function UploadStudentsPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [students] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDept, setFilterDept] = useState("")

  const handleUpload = async () => {
    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)
    setUploadSuccess(true)
    setTimeout(() => setUploadSuccess(false), 3000)
  }

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = !filterDept || filterDept === "all" || s.department === filterDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Upload Students</h1>
        <p className="text-muted-foreground mt-1">Import and manage student data for seating arrangements</p>
      </div>

      {/* Upload Section */}
      <Card className="animate-fade-in-up stagger-1 border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Student Data
          </CardTitle>
          <CardDescription>Upload a CSV or Excel file containing student information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                  uploadSuccess ? "bg-accent/20" : "bg-muted",
                )}
              >
                {uploadSuccess ? (
                  <CheckCircle className="h-8 w-8 text-accent" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-card-foreground">
                  {uploadSuccess ? "Upload Successful!" : "Drag and drop your file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {uploadSuccess ? "Student data has been imported" : "Supports CSV, XLS, XLSX formats"}
                </p>
              </div>
              <div className="flex gap-2">
                <Input type="file" accept=".csv,.xls,.xlsx" className="hidden" id="file-upload" />
                <Button asChild variant="outline" className="bg-transparent">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card className="animate-fade-in-up stagger-2 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Database ({filteredStudents.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Roll Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Semester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.rollNumber}
                    className="hover:bg-muted/30 transition-colors opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-4 py-3 font-medium text-card-foreground">{student.rollNumber}</td>
                    <td className="px-4 py-3 text-card-foreground">{student.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{student.department}</td>
                    <td className="px-4 py-3 text-muted-foreground">Sem {student.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
