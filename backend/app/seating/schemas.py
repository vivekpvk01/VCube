from pydantic import BaseModel, Field
from typing import List, Optional

class StudentData(BaseModel):
    student_id: str
    name: str
    department: str
    semester: str
    roll_number: str

class RoomData(BaseModel):
    room_id: str
    block: str
    room_number: str
    rows: int
    benches_per_row: int
    capacity: int

class SeatAssignment(BaseModel):
    student_id: str
    student_name: str
    roll_number: str
    department: str
    room_id: str
    block: str
    room_number: str
    row: int
    seat: int

class SeatingMapResponse(BaseModel):
    seating_map_id: str = Field(..., alias="_id")
    exam_id: Optional[str] = None
    exam_name: Optional[str] = None
    assignments: List[SeatAssignment]
    generated_at: str

class UploadResponse(BaseModel):
    message: str
    records_processed: int

