from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from io import BytesIO
from typing import Dict, List

def create_hall_ticket_pdf(student_name: str, exams: List[Dict]) -> bytes:
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    y_position = height - 50
    c.setFont("Helvetica-Bold", 16)
    c.drawString(50, y_position, "HALL TICKET")
    y_position -= 30
    c.setFont("Helvetica", 12)
    c.drawString(50, y_position, f"Student Name: {student_name}")
    y_position -= 30
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, y_position, "Examination Schedule")
    y_position -= 20
    c.setFont("Helvetica", 10)
    for exam in exams:
        if y_position < 100:
            c.showPage()
            y_position = height - 50
        subject = exam.get("subject", "")
        code = exam.get("code", "")
        date = exam.get("date", "")
        time = exam.get("time", "")
        venue = exam.get("venue", "")
        c.drawString(50, y_position, f"Subject: {subject} ({code})")
        y_position -= 15
        c.drawString(50, y_position, f"Date: {date} | Time: {time}")
        y_position -= 15
        c.drawString(50, y_position, f"Venue: {venue}")
        y_position -= 25
    c.save()
    buffer.seek(0)
    return buffer.getvalue()

