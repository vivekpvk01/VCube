"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, ChevronRight, ZoomIn, ZoomOut, RotateCcw, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface Subject {
  id: string
  code: string
  name: string
  topics: Topic[]
}

interface Topic {
  id: string
  name: string
  subtopics?: string[]
}

const subjects: Subject[] = [
  {
    id: "1",
    code: "CS501",
    name: "Machine Learning",
    topics: [
      {
        id: "t1",
        name: "Supervised Learning",
        subtopics: ["Linear Regression", "Logistic Regression", "Decision Trees", "SVM"],
      },
      {
        id: "t2",
        name: "Unsupervised Learning",
        subtopics: ["K-Means", "Hierarchical Clustering", "PCA", "Autoencoders"],
      },
      { id: "t3", name: "Neural Networks", subtopics: ["Perceptron", "MLP", "CNN", "RNN", "Transformers"] },
      {
        id: "t4",
        name: "Model Evaluation",
        subtopics: ["Cross Validation", "ROC Curve", "Precision/Recall", "F1 Score"],
      },
    ],
  },
  {
    id: "2",
    code: "CS502",
    name: "Computer Networks",
    topics: [
      { id: "t1", name: "OSI Model", subtopics: ["Physical", "Data Link", "Network", "Transport", "Application"] },
      { id: "t2", name: "Protocols", subtopics: ["TCP/IP", "HTTP/HTTPS", "DNS", "DHCP"] },
      { id: "t3", name: "Network Security", subtopics: ["Firewalls", "Encryption", "VPN", "SSL/TLS"] },
    ],
  },
  {
    id: "3",
    code: "CS503",
    name: "Database Systems",
    topics: [
      { id: "t1", name: "SQL", subtopics: ["DDL", "DML", "Joins", "Subqueries"] },
      { id: "t2", name: "Normalization", subtopics: ["1NF", "2NF", "3NF", "BCNF"] },
      { id: "t3", name: "Transactions", subtopics: ["ACID", "Concurrency Control", "Locking", "Recovery"] },
    ],
  },
]

export default function MindMapPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [zoom, setZoom] = useState(1)
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(topicId)) {
        next.delete(topicId)
      } else {
        next.add(topicId)
      }
      return next
    })
  }

  const resetView = () => {
    setZoom(1)
    setExpandedTopics(new Set())
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-foreground">Mind Map / Study Support</h1>
        <p className="text-muted-foreground mt-1">Interactive concept visualization for your subjects</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Subject List */}
        <Card className="lg:col-span-1 animate-fade-in-up stagger-1 border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subjects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {subjects.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject)
                  setExpandedTopics(new Set())
                }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all opacity-0 animate-fade-in-up",
                  selectedSubject?.id === subject.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-muted/50",
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-left">
                  <p className="font-medium">{subject.name}</p>
                  <p
                    className={cn(
                      "text-xs",
                      selectedSubject?.id === subject.id ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {subject.code}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Mind Map View */}
        <Card className="lg:col-span-3 animate-fade-in-up stagger-2 border-border min-h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {selectedSubject ? selectedSubject.name : "Select a Subject"}
            </CardTitle>
            {selectedSubject && (
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.min(z + 0.1, 1.5))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setZoom((z) => Math.max(z - 0.1, 0.5))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={resetView}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {selectedSubject ? (
              <div
                className="relative overflow-auto p-8 transition-transform duration-300"
                style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
              >
                {/* Central Node */}
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-48 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg animate-scale-in">
                    {selectedSubject.name}
                  </div>

                  {/* Topic Branches */}
                  <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
                    {selectedSubject.topics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className="flex flex-col items-center opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                      >
                        {/* Connection Line */}
                        <div className="h-8 w-0.5 bg-border" />

                        {/* Topic Node */}
                        <button
                          onClick={() => toggleTopic(topic.id)}
                          className={cn(
                            "w-full p-3 rounded-lg border transition-all",
                            "hover:shadow-md hover:border-primary/50",
                            expandedTopics.has(topic.id)
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-card border-border text-card-foreground",
                          )}
                        >
                          <p className="font-medium text-sm">{topic.name}</p>
                          {topic.subtopics && (
                            <p className="text-xs mt-1 opacity-70">{topic.subtopics.length} subtopics</p>
                          )}
                        </button>

                        {/* Subtopics */}
                        {expandedTopics.has(topic.id) && topic.subtopics && (
                          <div className="mt-2 space-y-2 w-full">
                            {topic.subtopics.map((subtopic, subIndex) => (
                              <div
                                key={subtopic}
                                className="p-2 rounded-md bg-muted/50 text-card-foreground text-xs text-center border border-border opacity-0 animate-fade-in-up"
                                style={{ animationDelay: `${subIndex * 0.05}s` }}
                              >
                                {subtopic}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                  <Brain className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="font-medium text-card-foreground">Select a Subject</p>
                <p className="text-sm text-muted-foreground">Choose a subject from the list to view its mind map</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
