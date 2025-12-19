"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Users, Mail, Save } from "lucide-react"

export default function ClubProfilePage() {
  const [profile, setProfile] = useState({
    name: "Technical Club",
    description:
      "We organize hackathons, coding competitions, and technical workshops to foster innovation and learning among students.",
    email: "techclub@university.edu",
    phone: "+91 9876543210",
    members: "150",
    coordinator: "Emily Davis",
    founded: "2018",
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          Club Profile
        </h1>
        <p className="text-muted-foreground">Manage your club information and details</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Form */}
        <Card className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Update your club details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Club Name</Label>
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Coordinator Name</Label>
                <Input
                  value={profile.coordinator}
                  onChange={(e) => setProfile({ ...profile, coordinator: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                />
              </div>
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <CardHeader>
            <CardTitle>Club Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{profile.members}</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{profile.founded}</p>
                <p className="text-sm text-muted-foreground">Year Founded</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium truncate">{profile.email}</p>
                <p className="text-sm text-muted-foreground">Contact Email</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
