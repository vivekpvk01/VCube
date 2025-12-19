from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import datetime
from app.clubs.schemas import ClubProfile, ClubProfileCreate, ClubProfileUpdate, EventCreate, EventResponse, EventStatusUpdate

def _serialize_club(doc) -> dict:
    if not doc:
        return None
    return {
        "_id": str(doc.get("_id")),
        "name": doc.get("name"),
        "description": doc.get("description"),
        "email": doc.get("email"),
        "phone": doc.get("phone"),
        "coordinator_name": doc.get("coordinator_name"),
        "members_count": doc.get("members_count"),
        "founded_year": doc.get("founded_year"),
    }

def _serialize_event(doc) -> dict:
    if not doc:
        return None
    return {
        "_id": str(doc.get("_id")),
        "club_id": str(doc.get("club_id")),
        "title": doc.get("title"),
        "description": doc.get("description"),
        "category": doc.get("category"),
        "date": doc.get("date"),
        "time": doc.get("time"),
        "duration": doc.get("duration"),
        "venue": doc.get("venue"),
        "expected_attendees": doc.get("expected_attendees"),
        "budget": doc.get("budget"),
        "status": doc.get("status"),
        "submitted_at": doc.get("submitted_at"),
        "reviewed_at": doc.get("reviewed_at"),
    }

async def create_club_profile(db: AsyncIOMotorDatabase, club_id: str, data: ClubProfileCreate) -> ClubProfile:
    to_insert = data.dict()
    to_insert["club_id"] = club_id
    await db["clubs"].update_one(
        {"club_id": club_id},
        {"$set": to_insert},
        upsert=True
    )
    doc = await db["clubs"].find_one({"club_id": club_id})
    return ClubProfile.parse_obj(_serialize_club(doc))

async def get_club_profile(db: AsyncIOMotorDatabase, club_id: str) -> Optional[ClubProfile]:
    doc = await db["clubs"].find_one({"club_id": club_id})
    return ClubProfile.parse_obj(_serialize_club(doc)) if doc else None

async def update_club_profile(db: AsyncIOMotorDatabase, club_id: str, data: ClubProfileUpdate) -> Optional[ClubProfile]:
    update_data = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        return await get_club_profile(db, club_id)
    await db["clubs"].update_one({"club_id": club_id}, {"$set": update_data})
    return await get_club_profile(db, club_id)

async def create_event(db: AsyncIOMotorDatabase, club_id: str, data: EventCreate) -> EventResponse:
    to_insert = data.dict()
    to_insert["club_id"] = club_id
    to_insert["status"] = "pending"
    to_insert["submitted_at"] = datetime.utcnow().isoformat()
    res = await db["club_events"].insert_one(to_insert)
    doc = await db["club_events"].find_one({"_id": res.inserted_id})
    return EventResponse.parse_obj(_serialize_event(doc))

async def get_club_events(db: AsyncIOMotorDatabase, club_id: str) -> List[EventResponse]:
    cursor = db["club_events"].find({"club_id": club_id})
    events = []
    async for doc in cursor:
        events.append(EventResponse.parse_obj(_serialize_event(doc)))
    return events

async def get_pending_events(db: AsyncIOMotorDatabase) -> List[EventResponse]:
    cursor = db["club_events"].find({"status": "pending"})
    events = []
    async for doc in cursor:
        events.append(EventResponse.parse_obj(_serialize_event(doc)))
    return events

async def update_event_status(db: AsyncIOMotorDatabase, event_id: str, status_update: EventStatusUpdate) -> Optional[EventResponse]:
    update_data = {
        "status": status_update.status,
        "reviewed_at": datetime.utcnow().isoformat()
    }
    await db["club_events"].update_one({"_id": ObjectId(event_id)}, {"$set": update_data})
    doc = await db["club_events"].find_one({"_id": ObjectId(event_id)})
    return EventResponse.parse_obj(_serialize_event(doc)) if doc else None

