from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.calendar.schemas import CalendarEventCreate, CalendarEventUpdate, CalendarEventResponse
from app.calendar.service import create_event, update_event, delete_event, fetch_events
from app.config.database import get_database
from app.middleware.role_guard import require_roles
from typing import List

router = APIRouter(prefix="/api/calendar", tags=["Calendar"])

@router.post("/", response_model=CalendarEventResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles(["ADMIN"]))])
async def create_calendar_event(
    data: CalendarEventCreate,
    request: Request,
    db=Depends(get_database),
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await create_event(db, data, user["user_id"])

@router.put("/{event_id}", response_model=CalendarEventResponse, dependencies=[Depends(require_roles(["ADMIN"]))])
async def update_calendar_event(
    event_id: str,
    data: CalendarEventUpdate,
    request: Request,
    db=Depends(get_database),
):
    updated = await update_event(db, event_id, data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return updated

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_roles(["ADMIN"]))])
async def delete_calendar_event(
    event_id: str,
    request: Request,
    db=Depends(get_database),
):
    deleted = await delete_event(db, event_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return

@router.get("/", response_model=List[CalendarEventResponse])
async def get_calendar_events(request: Request, db=Depends(get_database)):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await fetch_events(db)
