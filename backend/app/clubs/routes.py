from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.clubs.schemas import ClubProfile, ClubProfileCreate, ClubProfileUpdate, EventCreate, EventResponse, EventStatusUpdate
from app.clubs.service import (
    create_club_profile, get_club_profile, update_club_profile,
    create_event, get_club_events, get_pending_events, update_event_status
)
from app.config.database import get_database
from app.middleware.role_guard import require_roles
from typing import List

router = APIRouter(prefix="/api/clubs", tags=["Clubs"])

@router.post("/profile", response_model=ClubProfile, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles(["CLUB_COORDINATOR"]))])
async def create_profile(
    data: ClubProfileCreate,
    request: Request,
    db=Depends(get_database)
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await create_club_profile(db, user["user_id"], data)

@router.get("/profile", response_model=ClubProfile, dependencies=[Depends(require_roles(["CLUB_COORDINATOR"]))])
async def get_profile(request: Request, db=Depends(get_database)):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    profile = await get_club_profile(db, user["user_id"])
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Club profile not found.")
    return profile

@router.put("/profile", response_model=ClubProfile, dependencies=[Depends(require_roles(["CLUB_COORDINATOR"]))])
async def update_profile(
    data: ClubProfileUpdate,
    request: Request,
    db=Depends(get_database)
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    updated = await update_club_profile(db, user["user_id"], data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Club profile not found.")
    return updated

@router.post("/events", response_model=EventResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles(["CLUB_COORDINATOR"]))])
async def submit_event(
    data: EventCreate,
    request: Request,
    db=Depends(get_database)
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await create_event(db, user["user_id"], data)

@router.get("/events", response_model=List[EventResponse], dependencies=[Depends(require_roles(["CLUB_COORDINATOR"]))])
async def get_events(request: Request, db=Depends(get_database)):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await get_club_events(db, user["user_id"])

admin_router = APIRouter(prefix="/api/admin", tags=["Admin"])

@admin_router.get("/events/pending", response_model=List[EventResponse], dependencies=[Depends(require_roles(["ADMIN"]))])
async def get_pending_events_endpoint(db=Depends(get_database)):
    return await get_pending_events(db)

@admin_router.post("/events/{event_id}/approve", response_model=EventResponse, dependencies=[Depends(require_roles(["ADMIN"]))])
async def approve_event(
    event_id: str,
    db=Depends(get_database)
):
    status_update = EventStatusUpdate(status="approved")
    updated = await update_event_status(db, event_id, status_update)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return updated

@admin_router.post("/events/{event_id}/reject", response_model=EventResponse, dependencies=[Depends(require_roles(["ADMIN"]))])
async def reject_event(
    event_id: str,
    db=Depends(get_database)
):
    status_update = EventStatusUpdate(status="rejected")
    updated = await update_event_status(db, event_id, status_update)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found.")
    return updated

