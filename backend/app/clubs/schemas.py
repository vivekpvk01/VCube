from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class ClubProfile(BaseModel):
    club_id: str = Field(..., alias="_id")
    name: str
    description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    coordinator_name: Optional[str] = None
    members_count: Optional[int] = None
    founded_year: Optional[str] = None

class ClubProfileCreate(BaseModel):
    name: str
    description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    coordinator_name: Optional[str] = None
    members_count: Optional[int] = None
    founded_year: Optional[str] = None

class ClubProfileUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    coordinator_name: Optional[str] = None
    members_count: Optional[int] = None
    founded_year: Optional[str] = None

class EventCreate(BaseModel):
    title: str
    description: str
    category: str
    date: str
    time: str
    duration: Optional[str] = None
    venue: str
    expected_attendees: Optional[int] = None
    budget: Optional[str] = None

class EventResponse(BaseModel):
    event_id: str = Field(..., alias="_id")
    club_id: str
    title: str
    description: str
    category: str
    date: str
    time: str
    duration: Optional[str] = None
    venue: str
    expected_attendees: Optional[int] = None
    budget: Optional[str] = None
    status: str  # pending, approved, rejected
    submitted_at: str
    reviewed_at: Optional[str] = None

class EventStatusUpdate(BaseModel):
    status: str  # approved or rejected

