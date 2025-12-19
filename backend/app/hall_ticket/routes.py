from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.hall_ticket.schemas import HallTicketResponse
from app.hall_ticket.service import get_hall_ticket_by_student, admin_get_hall_ticket
from app.config.database import get_database
from app.middleware.role_guard import require_roles

router = APIRouter(prefix="/api/hall-ticket", tags=["Hall Ticket"])

@router.get("/", response_model=HallTicketResponse)
async def get_my_hall_ticket(request: Request, db=Depends(get_database)):
    user = getattr(request.state, "user", None)
    if not user or user.get("role") != "STUDENT":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Students only.")
    ticket = await get_hall_ticket_by_student(db, user["user_id"])
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hall ticket not found.")
    return ticket

@router.get("/{student_id}", response_model=HallTicketResponse, dependencies=[Depends(require_roles(["ADMIN"]))])
async def admin_get_ticket(student_id: str, db=Depends(get_database)):
    ticket = await admin_get_hall_ticket(db, student_id)
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hall ticket not found.")
    return ticket

