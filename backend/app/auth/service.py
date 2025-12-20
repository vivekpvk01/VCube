from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.auth.schemas import AuthUserPayload

async def verify_user_credentials(
    db: AsyncIOMotorDatabase,
    email: str,
    password: str,
    role: str
) -> Optional[AuthUserPayload]:

    # 🔴 FIX: include role in query
    user = await db["users"].find_one({
        "email": email,
        "role": role
    })

    if not user:
        return None

    # 🔥 Hackathon-friendly plain-text check (as you decided)
    if user.get("password") != password:
        return None

    return AuthUserPayload(
        user_id=str(user["_id"]),
        email=user["email"],
        role=user["role"]
    )
