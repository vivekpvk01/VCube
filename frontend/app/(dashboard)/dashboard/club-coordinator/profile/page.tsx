"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Calendar, Edit, Save, Loader2, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClubMember {
  id: string
  name: string
  role: string
  email: string
  joinedAt: string
}

const clubMembers: ClubMember[] = [
  { id: "1", name: "Emily Davis", role: "President", email: "emily@university.edu", joinedAt: "Jan 2023" },
  { id: "2", name: "Michael Chen", role: "Vice President", email: "michael@university.edu", joinedAt: "Jan 2023" },
  { id: "3", name: "Sarah Johnson", role: "Secretary", email: "sarah@university.edu", joinedAt: "Aug 2023" },
  { id: "4", name: "Alex Kumar", role: "Treasurer", email: "alex@university.edu", joinedAt: "Aug 2023" },
  { id: "5", name: "James Wilson", role: "Member", email: "james@university.edu", joinedAt: "Jan 2024" },
]

export default function ClubProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [clubInfo, setClubInfo] = useState({
    name: "Computer Science Society",
    description:
      "A student-run organization dedicated to fostering innovation, learning, and collaboration in computer science and technology.",
    founded: "2015",
    email: "css@university.edu",
    phone: "+91 9876543210",
    meetingDay: "Every Wednesday",
    meetingTime: "5:00 PM - 7:00 PM",
    meetingVenue: "Lab Complex, Room 301",
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Club Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your club information</p>
        </div>
        <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} className="gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Club Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="animate-fade-in-up stagger-1 border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Club Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Club Name</Label>
                {isEditing ? (
                  <Input
                    value={clubInfo.name}
                    onChange={(e) => setClubInfo({ ...clubInfo, name: e.target.value })}
                    className="bg-background"
                  />
                ) : (
                  <p className="text-lg font-semibold text-card-foreground">{clubInfo.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                {isEditing ? (
                  <Textarea
                    value={clubInfo.description}
                    onChange={(e) => setClubInfo({ ...clubInfo, description: e.target.value })}
                    className="bg-background min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground">{clubInfo.description}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  {isEditing ? (
                    <Input
                      value={clubInfo.email}
                      onChange={(e) => setClubInfo({ ...clubInfo, email: e.target.value })}
                      className="bg-background"
                    />
                  ) : (
                    <p className="text-card-foreground">{clubInfo.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  {isEditing ? (
                    <Input
                      value={clubInfo.phone}
                      onChange={(e) => setClubInfo({ ...clubInfo, phone: e.target.value })}
                      className="bg-background"
                    />
                  ) : (
                    <p className="text-card-foreground">{clubInfo.phone}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Schedule */}
          <Card className="animate-fade-in-up stagger-2 border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Meeting Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-foreground">Day</Label>
                {isEditing ? (
                  <Input
                    value={clubInfo.meetingDay}
                    onChange={(e) => setClubInfo({ ...clubInfo, meetingDay: e.target.value })}
                    className="bg-background"
                  />
                ) : (
                  <p className="text-card-foreground">{clubInfo.meetingDay}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Time</Label>
                {isEditing ? (
                  <Input
                    value={clubInfo.meetingTime}
                    onChange={(e) => setClubInfo({ ...clubInfo, meetingTime: e.target.value })}
                    className="bg-background"
                  />
                ) : (
                  <p className="text-card-foreground">{clubInfo.meetingTime}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Venue</Label>
                {isEditing ? (
                  <Input
                    value={clubInfo.meetingVenue}
                    onChange={(e) => setClubInfo({ ...clubInfo, meetingVenue: e.target.value })}
                    className="bg-background"
                  />
                ) : (
                  <p className="text-card-foreground">{clubInfo.meetingVenue}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        <Card className="animate-fade-in-up stagger-3 border-border h-fit">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Users className="h-5 w-5" />
              Members ({clubMembers.length})
            </CardTitle>
            <CardDescription>Club executive committee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clubMembers.map((member, index) => (
              <div
                key={member.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg bg-muted/30 transition-all opacity-0 animate-fade-in-up",
                  "hover:bg-muted/50",
                )}
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
