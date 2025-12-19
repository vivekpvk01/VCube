"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Settings, Loader2, CheckCircle, AlertCircle, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GenerateSeatingPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [config, setConfig] = useState({
    exam: "",
    department: "",
    semester: "",
    algorithm: "",
  })

  const handleGenerate = async () => {
    if (!config.exam || !config.department || !config.semester) return

    setIsGenerating(true)
    setProgress(0)
    setIsComplete(false)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setIsComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Generate Seating Arrangement</h1>
        <p className="text-muted-foreground mt-1">Auto-generate seating plans for examinations</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Configuration */}
        <Card className="animate-fade-in-up stagger-1 border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>Select examination and seating parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Examination</Label>
              <Select value={config.exam} onValueChange={(value) => setConfig({ ...config, exam: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select examination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mid1">Mid Semester 1 - Dec 2024</SelectItem>
                  <SelectItem value="mid2">Mid Semester 2 - Feb 2025</SelectItem>
                  <SelectItem value="end">End Semester - May 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Department</Label>
              <Select value={config.department} onValueChange={(value) => setConfig({ ...config, department: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ec">Electronics</SelectItem>
                  <SelectItem value="me">Mechanical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Semester</Label>
              <Select value={config.semester} onValueChange={(value) => setConfig({ ...config, semester: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <SelectItem key={sem} value={sem.toString()}>
                      Semester {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Seating Algorithm</Label>
              <Select value={config.algorithm} onValueChange={(value) => setConfig({ ...config, algorithm: value })}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="random">Random Distribution</SelectItem>
                  <SelectItem value="alternate">Alternate Departments</SelectItem>
                  <SelectItem value="sequential">Sequential by Roll Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !config.exam || !config.department || !config.semester}
              className="w-full py-5 gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Generate Seating Plan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Progress / Result */}
        <Card className="animate-fade-in-up stagger-2 border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Generation Status</CardTitle>
          </CardHeader>
          <CardContent>
            {!isGenerating && !isComplete ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-card-foreground">Ready to Generate</p>
                <p className="text-sm text-muted-foreground">Configure options and click generate</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-6 py-8">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/20">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-card-foreground">Generating Seating Plan...</p>
                  <p className="text-sm text-muted-foreground">This may take a few moments</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-card-foreground font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Loading student data", done: progress > 20 },
                    { label: "Fetching room configuration", done: progress > 40 },
                    { label: "Applying seating algorithm", done: progress > 60 },
                    { label: "Validating arrangements", done: progress > 80 },
                    { label: "Finalizing seating plan", done: progress >= 100 },
                  ].map((step, index) => (
                    <div
                      key={step.label}
                      className={cn(
                        "flex items-center gap-2 text-sm opacity-0 animate-fade-in-up",
                        step.done ? "text-card-foreground" : "text-muted-foreground",
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {step.done ? (
                        <CheckCircle className="h-4 w-4 text-accent" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted" />
                      )}
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-8 animate-scale-in">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-card-foreground">Generation Complete!</p>
                  <p className="text-sm text-muted-foreground">Seating plan has been generated successfully</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-card-foreground">2,456</p>
                    <p className="text-xs text-muted-foreground">Students Assigned</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-card-foreground">48</p>
                    <p className="text-xs text-muted-foreground">Rooms Used</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">View Seating Chart</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Export PDF
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Warning */}
      <Card className="animate-fade-in-up stagger-3 border-border border-chart-3/30 bg-chart-3/5">
        <CardContent className="p-4 flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-chart-3 flex-shrink-0" />
          <p className="text-sm text-card-foreground">
            <span className="font-medium">Note:</span> Generating a new seating plan will override any existing
            arrangements for the selected examination. Please review carefully before publishing.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
