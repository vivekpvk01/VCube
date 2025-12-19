from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import datetime
from app.calendar.schemas import CalendarEventCreate, CalendarEventUpdate, CalendarEventResponse

def _serialize_event(doc) -> dict:
    if not doc:
        return None
    return {
        "_id": str(doc.get("_id")),
        "title": doc.get("title"),
        "description": doc.get("description"),
        "event_type": doc.get("event_type"),
        "start_date": doc.get("start_date"),
        "end_date": doc.get("end_date"),
        "created_by": doc.get("created_by"),
        "created_at": doc.get("created_at"),
    }

async def create_event(db: AsyncIOMotorDatabase, data: CalendarEventCreate, created_by: str) -> CalendarEventResponse:
    to_insert = data.dict()
    to_insert["created_by"] = created_by
    to_insert["created_at"] = datetime.utcnow()
    res = await db["academic_calendar"].insert_one(to_insert)
    doc = await db["academic_calendar"].find_one({"_id": res.inserted_id})
    return CalendarEventResponse.parse_obj(_serialize_event(doc))

async def update_event(db: AsyncIOMotorDatabase, event_id: str, data: CalendarEventUpdate) -> Optional[CalendarEventResponse]:
    update_data = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        doc = await db["academic_calendar"].find_one({"_id": ObjectId(event_id)})
        if not doc:
            return None
        return CalendarEventResponse.parse_obj(_serialize_event(doc))
    await db["academic_calendar"].update_one({"_id": ObjectId(event_id)}, {"$set": update_data})
    doc = await db["academic_calendar"].find_one({"_id": ObjectId(event_id)})
    return CalendarEventResponse.parse_obj(_serialize_event(doc)) if doc else None

async def delete_event(db: AsyncIOMotorDatabase, event_id: str) -> bool:
    res = await db["academic_calendar"].delete_one({"_id": ObjectId(event_id)})
    return res.deleted_count > 0

async def fetch_events(db: AsyncIOMotorDatabase) -> List[CalendarEventResponse]:
    cursor = db["academic_calendar"].find({})
    events = []
    async for doc in cursor:
        events.append(CalendarEventResponse.parse_obj(_serialize_event(doc)))
    return events
