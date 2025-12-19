"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Download, Trash2, Loader2 } from "lucide-react"

interface Syllabus {
  id: string
  name: string
  department: string
  semester: string
  subject: string
  uploadedAt: string
  size: string
}

const initialSyllabi: Syllabus[] = [
  {
    id: "1",
    name: "CS501_ML_Syllabus.pdf",
    department: "Computer Science",
    semester: "5",
    subject: "Machine Learning",
    uploadedAt: "Dec 1, 2024",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "CS502_Networks_Syllabus.pdf",
    department: "Computer Science",
    semester: "5",
    subject: "Computer Networks",
    uploadedAt: "Dec 1, 2024",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "EC301_Signals_Syllabus.pdf",
    department: "Electronics",
    semester: "3",
    subject: "Signals & Systems",
    uploadedAt: "Nov 28, 2024",
    size: "3.1 MB",
  },
]

export default function SyllabusUploadPage() {
  const [syllabi, setSyllabi] = useState<Syllabus[]>(initialSyllabi)
  const [showForm, setShowForm] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newSyllabus, setNewSyllabus] = useState({
    department: "",
    semester: "",
    subject: "",
    file: null as File | null,
  })

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSyllabus.department || !newSyllabus.semester || !newSyllabus.subject) return

    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSyllabi([
      ...syllabi,
      {
        id: Date.now().toString(),
        name: `${newSyllabus.subject.replace(/\s+/g, "_")}_Syllabus.pdf`,
        department: newSyllabus.department,
        semester: newSyllabus.semester,
        subject: newSyllabus.subject,
        uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        size: "1.5 MB",
      },
    ])

    setNewSyllabus({ department: "", semester: "", subject: "", file: null })
    setShowForm(false)
    setIsUploading(false)
  }

  const handleDelete = (id: string) => {
    setSyllabi(syllabi.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Syllabus Upload</h1>
          <p className="text-muted-foreground mt-1">Upload and manage course syllabi</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Syllabus
        </Button>
      </div>

      {/* Upload Form */}
      {showForm && (
        <Card className="animate-scale-in border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Upload New Syllabus</CardTitle>
            <CardDescription>Select department, semester, and upload the syllabus file</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-foreground">Department</Label>
                <Select
                  value={newSyllabus.department}
                  onValueChange={(value) => setNewSyllabus({ ...newSyllabus, department: value })}
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
                <Select
                  value={newSyllabus.semester}
                  onValueChange={(value) => setNewSyllabus({ ...newSyllabus, semester: value })}
                >
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
                <Label className="text-foreground">Subject Name</Label>
                <Input
                  value={newSyllabus.subject}
                  onChange={(e) => setNewSyllabus({ ...newSyllabus, subject: e.target.value })}
                  placeholder="e.g., Machine Learning"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Syllabus File (PDF)</Label>
                <Input type="file" accept=".pdf" className="bg-background" />
              </div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
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
            </form>
          </CardContent>
        </Card>
      )}

      {/* Syllabi List */}
      <Card className="animate-fade-in-up stagger-1 border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Uploaded Syllabi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Subject</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Semester</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Uploaded</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Size</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {syllabi.map((syllabus, index) => (
                  <tr
                    key={syllabus.id}
                    className="hover:bg-muted/30 transition-colors opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                          <FileText className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{syllabus.subject}</p>
                          <p className="text-xs text-muted-foreground">{syllabus.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-card-foreground">{syllabus.department}</td>
                    <td className="px-4 py-3 text-card-foreground">Sem {syllabus.semester}</td>
                    <td className="px-4 py-3 text-muted-foreground">{syllabus.uploadedAt}</td>
                    <td className="px-4 py-3 text-muted-foreground">{syllabus.size}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(syllabus.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
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
