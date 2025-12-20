import csv
import io
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from datetime import datetime
from app.seating.schemas import StudentData, RoomData, SeatAssignment, SeatingMapResponse
from app.seating.algorithm import allocate_seats
from bson.objectid import ObjectId

async def parse_students_csv(file_content: bytes) -> List[StudentData]:
    text = file_content.decode('utf-8')
    reader = csv.DictReader(io.StringIO(text))
    students = []
    for row in reader:
        students.append(StudentData(
            student_id=row.get("student_id", ""),
            name=row.get("name", ""),
            department=row.get("department", ""),
            semester=row.get("semester", ""),
            roll_number=row.get("roll_number", "")
        ))
    return students

async def parse_rooms_csv(file_content: bytes) -> List[RoomData]:
    text = file_content.decode('utf-8')
    reader = csv.DictReader(io.StringIO(text))
    rooms = []
    for row in reader:
        rows = int(row.get("rows", 0))
        benches = int(row.get("benches_per_row", 0))
        rooms.append(RoomData(
            room_id=row.get("room_id", ""),
            block=row.get("block", ""),
            room_number=row.get("room_number", ""),
            rows=rows,
            benches_per_row=benches,
            capacity=rows * benches
        ))
    return rooms

async def store_students(db: AsyncIOMotorDatabase, students: List[StudentData]) -> int:
    await db["students"].delete_many({})
    docs = [s.dict() for s in students]
    if docs:
        await db["students"].insert_many(docs)
    return len(students)

async def store_rooms(db: AsyncIOMotorDatabase, rooms: List[RoomData]) -> int:
    await db["rooms"].delete_many({})
    docs = [r.dict() for r in rooms]
    if docs:
        await db["rooms"].insert_many(docs)
    return len(rooms)

async def generate_seating_map(
    db: AsyncIOMotorDatabase,
    exam_id: Optional[str] = None,
    exam_name: Optional[str] = None,
    mix_departments: bool = True
) -> SeatingMapResponse:
    students_cursor = db["students"].find({})
    rooms_cursor = db["rooms"].find({})
    students_list = []
    rooms_list = []
    async for doc in students_cursor:
        students_list.append(StudentData.parse_obj(doc))
    async for doc in rooms_cursor:
        rooms_list.append(RoomData.parse_obj(doc))
    assignments = allocate_seats(students_list, rooms_list, mix_departments)
    seating_map = {
        "exam_id": exam_id,
        "exam_name": exam_name,
        "assignments": [a.dict() for a in assignments],
        "generated_at": datetime.utcnow().isoformat()
    }
    res = await db["seating_maps"].insert_one(seating_map)
    seating_map["_id"] = str(res.inserted_id)
    return SeatingMapResponse.parse_obj(seating_map)

async def get_seating_map(db: AsyncIOMotorDatabase, seating_map_id: Optional[str] = None) -> Optional[SeatingMapResponse]:
    if seating_map_id:
        doc = await db["seating_maps"].find_one({"_id": ObjectId(seating_map_id)})
    else:
        doc = await db["seating_maps"].find_one(sort=[("generated_at", -1)])
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return SeatingMapResponse.parse_obj(doc)


