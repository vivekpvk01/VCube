"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Upload, FileText, Trash2, Download } from "lucide-react"

const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"]
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]

const initialSyllabi = [
  {
    id: 1,
    subject: "Data Structures",
    code: "CS301",
    department: "Computer Science",
    semester: "5",
    fileName: "ds_syllabus.pdf",
    uploadDate: "2024-12-01",
  },
  {
    id: 2,
    subject: "Database Systems",
    code: "CS302",
    department: "Computer Science",
    semester: "5",
    fileName: "dbms_syllabus.pdf",
    uploadDate: "2024-12-02",
  },
  {
    id: 3,
    subject: "Digital Electronics",
    code: "EC301",
    department: "Electronics",
    semester: "5",
    fileName: "de_syllabus.pdf",
    uploadDate: "2024-12-03",
  },
]

export default function SyllabusUploadPage() {
  const [syllabi, setSyllabi] = useState(initialSyllabi)
  const [showForm, setShowForm] = useState(false)
  const [newSyllabus, setNewSyllabus] = useState({
    subject: "",
    code: "",
    department: "",
    semester: "",
    fileName: "",
  })

  const handleUpload = () => {
    if (newSyllabus.subject && newSyllabus.code && newSyllabus.department) {
      setSyllabi([
        ...syllabi,
        {
          ...newSyllabus,
          id: Date.now(),
          fileName: `${newSyllabus.code.toLowerCase()}_syllabus.pdf`,
          uploadDate: new Date().toISOString().split("T")[0],
        },
      ])
      setNewSyllabus({ subject: "", code: "", department: "", semester: "", fileName: "" })
      setShowForm(false)
    }
  }

  const handleDelete = (id: number) => {
    setSyllabi(syllabi.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Syllabus Upload
          </h1>
          <p className="text-muted-foreground">Upload and manage course syllabi</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Upload className="h-4 w-4" /> Upload Syllabus
        </Button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <Card className="animate-fade-in-up border-primary/50">
          <CardHeader>
            <CardTitle>Upload New Syllabus</CardTitle>
            <CardDescription>Add syllabus details and upload the file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Subject Name</Label>
                <Input
                  placeholder="Enter subject name"
                  value={newSyllabus.subject}
                  onChange={(e) => setNewSyllabus({ ...newSyllabus, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Subject Code</Label>
                <Input
                  placeholder="e.g., CS301"
                  value={newSyllabus.code}
                  onChange={(e) => setNewSyllabus({ ...newSyllabus, code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select
                  value={newSyllabus.department}
                  onValueChange={(value) => setNewSyllabus({ ...newSyllabus, department: value })}
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
                <Select
                  value={newSyllabus.semester}
                  onValueChange={(value) => setNewSyllabus({ ...newSyllabus, semester: value })}
                >
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
              <div className="space-y-2 md:col-span-2">
                <Label>Syllabus File (PDF)</Label>
                <Input type="file" accept=".pdf" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpload}>Upload</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Syllabi List */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle>Uploaded Syllabi</CardTitle>
          <CardDescription>{syllabi.length} syllabi available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {syllabi.map((syllabus, index) => (
              <div
                key={syllabus.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${0.15 + index * 0.03}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{syllabus.subject}</p>
                      <Badge variant="outline">{syllabus.code}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {syllabus.department} • Semester {syllabus.semester} • Uploaded{" "}
                      {new Date(syllabus.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(syllabus.id)}>
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
