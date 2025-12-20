from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional
from bson.objectid import ObjectId
from app.users.schemas import UserResponse, UserUpdateRequest

def _serialize_user(user_doc) -> dict:
    if not user_doc:
        return None
    mapped = {
        "_id": str(user_doc.get("_id")),
        "email": user_doc.get("email"),
        "role": user_doc.get("role"),
        "name": user_doc.get("name"),
        "phone": user_doc.get("phone"),
        "department": user_doc.get("department"),
    }
    return mapped

async def get_user_by_id(db: AsyncIOMotorDatabase, user_id: str) -> Optional[UserResponse]:
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    return UserResponse.parse_obj(_serialize_user(user)) if user else None

async def update_user_profile(db: AsyncIOMotorDatabase, user_id: str, data: UserUpdateRequest) -> Optional[UserResponse]:
    update_data = {k: v for k, v in data.dict(exclude_unset=True).items() if v is not None}
    if not update_data:
        return await get_user_by_id(db, user_id)
    await db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    return await get_user_by_id(db, user_id)


