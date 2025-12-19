from motor.motor_asyncio import AsyncIOMotorDatabase
from app.hall_ticket.schemas import HallTicketMeta, HallTicketResponse
from app.utils.qr_generator import generate_qr_code
from app.utils.pdf_generator import create_hall_ticket_pdf
from typing import Optional, List
from datetime import datetime

# Cloud storage upload to be implemented (S3/Cloudinary)
async def upload_pdf(file_bytes: bytes, filename: str) -> str:
    # Placeholder: integrate with S3/Cloudinary here, return URL
    raise NotImplementedError("Upload logic not implemented.")

# Fetch hall ticket for a student
def _serialize_ticket(doc):
    doc["hall_ticket_id"] = str(doc.get("_id"))
    return doc

async def get_hall_ticket_by_student(db: AsyncIOMotorDatabase, student_id: str) -> Optional[HallTicketResponse]:
    doc = await db["hall_tickets"].find_one({"student_id": student_id})
    return HallTicketResponse.parse_obj(_serialize_ticket(doc)) if doc else None

async def generate_hall_ticket(db: AsyncIOMotorDatabase, student_id: str, student_name: str, exams: List[dict]) -> HallTicketResponse:
    issued_at = datetime.utcnow().isoformat()
    pdf_bytes = create_hall_ticket_pdf(student_name, exams)
    pdf_url = await upload_pdf(pdf_bytes, f"hall_ticket_{student_id}.pdf")
    qr_content = f"{student_id}|{issued_at}"
    qr_code_bytes = generate_qr_code(qr_content)
    qr_code_url = await upload_pdf(qr_code_bytes, f"hall_ticket_{student_id}_qr.png")
    record = {
        "student_id": student_id,
        "student_name": student_name,
        "exams": exams,
        "pdf_url": pdf_url,
        "qr_code_url": qr_code_url,
        "issued_at": issued_at
    }
    res = await db["hall_tickets"].insert_one(record)
    record["_id"] = res.inserted_id
    return HallTicketResponse.parse_obj(_serialize_ticket(record))

# For admin access
def admin_get_hall_ticket(db: AsyncIOMotorDatabase, student_id: str):
    return get_hall_ticket_by_student(db, student_id)

