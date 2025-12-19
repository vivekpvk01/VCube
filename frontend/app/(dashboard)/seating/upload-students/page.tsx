"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download, Trash2 } from "lucide-react"

const mockUploads = [
  {
    id: 1,
    fileName: "cse_sem5_students.csv",
    department: "Computer Science",
    count: 120,
    uploadDate: "Dec 15, 2024",
    status: "success",
  },
  {
    id: 2,
    fileName: "ece_sem5_students.csv",
    department: "Electronics",
    count: 95,
    uploadDate: "Dec 15, 2024",
    status: "success",
  },
  {
    id: 3,
    fileName: "mech_sem5_students.csv",
    department: "Mechanical",
    count: 80,
    uploadDate: "Dec 16, 2024",
    status: "success",
  },
]

export default function UploadStudentsPage() {
  const [uploads, setUploads] = useState(mockUploads)
  const [dragging, setDragging] = useState(false)

  const handleDelete = (id: number) => {
    setUploads(uploads.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Upload className="h-8 w-8 text-primary" />
          Upload Student Data
        </h1>
        <p className="text-muted-foreground">Import student information from CSV files</p>
      </div>

      {/* Upload Area */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <CardContent className="pt-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
            }}
          >
            <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop CSV files here</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
            <Input type="file" accept=".csv" className="max-w-xs mx-auto" />
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              CSV Format Requirements
            </h4>
            <p className="text-sm text-muted-foreground">
              Required columns: Roll Number, Name, Department, Semester, Section. First row should contain column
              headers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>
            {uploads.reduce((acc, u) => acc + u.count, 0)} students from {uploads.length} files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {uploads.map((upload, index) => (
              <div
                key={upload.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.03}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">{upload.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {upload.department} • {upload.count} students • {upload.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{upload.count} records</Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(upload.id)}>
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
