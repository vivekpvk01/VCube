from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime

class CalendarEventBase(BaseModel):
    title: str
    description: Optional[str] = None
    event_type: str
    start_date: date
    end_date: date

class CalendarEventCreate(CalendarEventBase):
    pass

class CalendarEventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_type: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None

class CalendarEventResponse(CalendarEventBase):
    event_id: str = Field(..., alias="_id")
    created_by: str
    created_at: datetime
