from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from app.exams.schemas import ExamCreate, ExamUpdate, ExamResponse

def _serialize_exam(doc) -> dict:
    if not doc:
        return None
    return {
        "_id": str(doc.get("_id")),
        "subject": doc.get("subject"),
        "code": doc.get("code"),
        "department": doc.get("department"),
        "semester": doc.get("semester"),
        "date": doc.get("date"),
        "time": doc.get("time"),
        "venue": doc.get("venue"),
    }

async def create_exam(db: AsyncIOMotorDatabase, data: ExamCreate) -> ExamResponse:
    to_insert = data.dict()
    res = await db["exams"].insert_one(to_insert)
    doc = await db["exams"].find_one({"_id": res.inserted_id})
    return ExamResponse.parse_obj(_serialize_exam(doc))

async def update_exam(db: AsyncIOMotorDatabase, exam_id: str, data: ExamUpdate) -> Optional[ExamResponse]:
    update_data = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        doc = await db["exams"].find_one({"_id": ObjectId(exam_id)})
        if not doc:
            return None
        return ExamResponse.parse_obj(_serialize_exam(doc))
    await db["exams"].update_one({"_id": ObjectId(exam_id)}, {"$set": update_data})
    doc = await db["exams"].find_one({"_id": ObjectId(exam_id)})
    return ExamResponse.parse_obj(_serialize_exam(doc)) if doc else None

async def delete_exam(db: AsyncIOMotorDatabase, exam_id: str) -> bool:
    res = await db["exams"].delete_one({"_id": ObjectId(exam_id)})
    return res.deleted_count > 0

async def fetch_exams(db: AsyncIOMotorDatabase) -> List[ExamResponse]:
    cursor = db["exams"].find({})
    exams = []
    async for doc in cursor:
        exams.append(ExamResponse.parse_obj(_serialize_exam(doc)))
    return exams


