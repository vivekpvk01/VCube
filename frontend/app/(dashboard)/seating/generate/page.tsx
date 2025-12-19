"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings, Play, CheckCircle, Loader2 } from "lucide-react"

const exams = [
  { value: "mid1-dec", label: "Mid Semester 1 - December 2024" },
  { value: "mid2-feb", label: "Mid Semester 2 - February 2025" },
  { value: "end-may", label: "End Semester - May 2025" },
]

const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical"]

export default function GenerateSeatingPage() {
  const [selectedExam, setSelectedExam] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [mixDepartments, setMixDepartments] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleGenerate = () => {
    if (selectedExam && selectedDepartments.length > 0) {
      setGenerating(true)
      setProgress(0)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setGenerating(false)
            setGenerated(true)
            return 100
          }
          return prev + 10
        })
      }, 300)
    }
  }

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) => (prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Generate Seating
        </h1>
        <p className="text-muted-foreground">Auto-generate seating arrangements for examinations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configuration */}
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Set up seating generation parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Examination</Label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose exam" />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.value} value={exam.value}>
                      {exam.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Select Departments</Label>
              <div className="space-y-2">
                {departments.map((dept) => (
                  <div key={dept} className="flex items-center gap-2">
                    <Checkbox
                      id={dept}
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={() => toggleDepartment(dept)}
                    />
                    <label htmlFor={dept} className="text-sm cursor-pointer">
                      {dept}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Checkbox
                id="mix"
                checked={mixDepartments}
                onCheckedChange={(checked) => setMixDepartments(checked as boolean)}
              />
              <label htmlFor="mix" className="text-sm cursor-pointer">
                Mix students from different departments (recommended to prevent cheating)
              </label>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating || !selectedExam || selectedDepartments.length === 0}
              className="w-full gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Generate Seating Chart
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Progress / Result */}
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader>
            <CardTitle>Generation Status</CardTitle>
            <CardDescription>
              {generated ? "Seating chart generated successfully" : "Configure and generate seating"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generating && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className={progress >= 20 ? "text-foreground" : ""}>
                    {progress >= 20 ? "✓" : "○"} Loading student data...
                  </p>
                  <p className={progress >= 40 ? "text-foreground" : ""}>
                    {progress >= 40 ? "✓" : "○"} Loading room configuration...
                  </p>
                  <p className={progress >= 60 ? "text-foreground" : ""}>
                    {progress >= 60 ? "✓" : "○"} Generating seating arrangement...
                  </p>
                  <p className={progress >= 80 ? "text-foreground" : ""}>
                    {progress >= 80 ? "✓" : "○"} Validating assignments...
                  </p>
                  <p className={progress >= 100 ? "text-foreground" : ""}>
                    {progress >= 100 ? "✓" : "○"} Finalizing chart...
                  </p>
                </div>
              </div>
            )}

            {generated && !generating && (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Seating Chart Ready!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generated for {selectedDepartments.length} departments
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-2xl font-bold">2,450</p>
                    <p className="text-sm text-muted-foreground">Students Assigned</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">45</p>
                    <p className="text-sm text-muted-foreground">Rooms Used</p>
                  </div>
                </div>
                <Button className="w-full">View Seating Chart</Button>
              </div>
            )}

            {!generating && !generated && (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Configure the settings and click Generate to create a seating chart</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
