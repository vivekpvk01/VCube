from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, time

class ExamCreate(BaseModel):
    subject: str
    code: str
    department: str
    semester: str
    date: date
    time: str  # Keep as string for time slot, e.g. '10:00', '14:00'
    venue: str

class ExamUpdate(BaseModel):
    subject: Optional[str] = None
    code: Optional[str] = None
    department: Optional[str] = None
    semester: Optional[str] = None
    date: Optional[date] = None
    time: Optional[str] = None
    venue: Optional[str] = None

class ExamResponse(BaseModel):
    exam_id: str = Field(..., alias="_id")
    subject: str
    code: str
    department: str
    semester: str
    date: date
    time: str
    venue: str


