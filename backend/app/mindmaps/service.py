from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import datetime
from app.mindmaps.schemas import MindMapCreateRequest, MindMapResponse, MindMapNode

def _serialize_mindmap(doc) -> dict:
    if not doc:
        return None
    return {
        "_id": str(doc.get("_id")),
        "subject": doc.get("subject"),
        "tree": doc.get("tree"),
        "created_at": doc.get("created_at"),
        "created_by": doc.get("created_by"),
    }

def _create_basic_tree(subject: str) -> dict:
    return {
        "id": "root",
        "title": subject,
        "children": []
    }

async def create_mindmap(
    db: AsyncIOMotorDatabase,
    data: MindMapCreateRequest,
    created_by: str
) -> MindMapResponse:
    file_doc = await db["files"].find_one({"_id": ObjectId(data.syllabus_file_id)})
    if not file_doc:
        raise ValueError("Syllabus file not found.")
    tree = _create_basic_tree(data.subject)
    mindmap_doc = {
        "subject": data.subject,
        "syllabus_file_id": data.syllabus_file_id,
        "tree": tree,
        "created_at": datetime.utcnow(),
        "created_by": created_by,
    }
    res = await db["mindmaps"].insert_one(mindmap_doc)
    doc = await db["mindmaps"].find_one({"_id": res.inserted_id})
    return MindMapResponse.parse_obj(_serialize_mindmap(doc))

async def get_user_mindmaps(
    db: AsyncIOMotorDatabase,
    user_id: str
) -> List[MindMapResponse]:
    cursor = db["mindmaps"].find({"created_by": user_id})
    mindmaps = []
    async for doc in cursor:
        mindmaps.append(MindMapResponse.parse_obj(_serialize_mindmap(doc)))
    return mindmaps

async def get_mindmap_by_id(
    db: AsyncIOMotorDatabase,
    mindmap_id: str,
    user_id: str
) -> Optional[MindMapResponse]:
    doc = await db["mindmaps"].find_one({"_id": ObjectId(mindmap_id), "created_by": user_id})
    return MindMapResponse.parse_obj(_serialize_mindmap(doc)) if doc else None

