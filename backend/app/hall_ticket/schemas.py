from pydantic import BaseModel
from typing import List, Optional

class HallTicketMeta(BaseModel):
    hall_ticket_id: str
    student_id: str
    exam_ids: List[str]
    generated_at: str  # ISO datetime
    pdf_url: str
    qr_code_url: Optional[str] = None

class HallTicketResponse(BaseModel):
    student_id: str
    student_name: str
    exams: List[dict]  # Each contains subject, date, venue, etc.
    pdf_url: str
    qr_code_url: Optional[str] = None
    issued_at: str


