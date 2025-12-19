"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, ChevronRight, ChevronDown, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface Topic {
  id: string
  name: string
  subtopics?: Topic[]
}

const mockSubjects = [
  {
    id: "cs301",
    name: "Data Structures",
    progress: 75,
    topics: [
      {
        id: "arrays",
        name: "Arrays & Strings",
        subtopics: [
          { id: "1d", name: "1D Arrays" },
          { id: "2d", name: "2D Arrays" },
          { id: "strings", name: "String Operations" },
        ],
      },
      {
        id: "linkedlist",
        name: "Linked Lists",
        subtopics: [
          { id: "singly", name: "Singly Linked" },
          { id: "doubly", name: "Doubly Linked" },
          { id: "circular", name: "Circular Linked" },
        ],
      },
      {
        id: "trees",
        name: "Trees",
        subtopics: [
          { id: "binary", name: "Binary Trees" },
          { id: "bst", name: "BST" },
          { id: "avl", name: "AVL Trees" },
        ],
      },
    ],
  },
  {
    id: "cs302",
    name: "Database Systems",
    progress: 60,
    topics: [
      {
        id: "sql",
        name: "SQL",
        subtopics: [
          { id: "ddl", name: "DDL Commands" },
          { id: "dml", name: "DML Commands" },
          { id: "joins", name: "Joins" },
        ],
      },
      {
        id: "normalization",
        name: "Normalization",
        subtopics: [
          { id: "1nf", name: "1NF" },
          { id: "2nf", name: "2NF" },
          { id: "3nf", name: "3NF & BCNF" },
        ],
      },
    ],
  },
]

function TopicNode({ topic, level = 0 }: { topic: Topic; level?: number }) {
  const [expanded, setExpanded] = useState(level < 1)
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => hasSubtopics && setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-2 w-full p-2 rounded-lg text-left transition-colors",
          "hover:bg-muted/50",
          level === 0 && "font-medium",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasSubtopics ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )
        ) : (
          <div className="h-4 w-4 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        )}
        <span>{topic.name}</span>
      </button>
      {expanded && hasSubtopics && (
        <div className="border-l-2 border-muted ml-4">
          {topic.subtopics!.map((subtopic) => (
            <TopicNode key={subtopic.id} topic={subtopic} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MindMapPage() {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          Mind Map
        </h1>
        <p className="text-muted-foreground">Visual study guides to help you prepare for exams</p>
      </div>

      {/* Subject Selection */}
      <div className="flex flex-wrap gap-2">
        {mockSubjects.map((subject) => (
          <Button
            key={subject.id}
            variant={selectedSubject.id === subject.id ? "default" : "outline"}
            onClick={() => setSelectedSubject(subject)}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            {subject.name}
          </Button>
        ))}
      </div>

      {/* Mind Map View */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedSubject.name}</CardTitle>
                <CardDescription>Expand topics to see detailed breakdown</CardDescription>
              </div>
              <Badge variant="secondary">{selectedSubject.progress}% Complete</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {selectedSubject.topics.map((topic) => (
                <TopicNode key={topic.id} topic={topic} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader>
            <CardTitle>Study Progress</CardTitle>
            <CardDescription>Track your preparation across subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSubjects.map((subject, index) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-muted-foreground">{subject.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${subject.progress}%`, animationDelay: `${0.2 + index * 0.1}s` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
