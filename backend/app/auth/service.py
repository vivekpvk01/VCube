from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.config.security import verify_password, create_access_token
from app.auth.schemas import AuthUserPayload


async def verify_user_credentials(
    db: AsyncIOMotorDatabase,
    email: str,
    password: str
) -> Optional[AuthUserPayload]:

    user = await db["users"].find_one({"email": email})
    if not user:
        return None

    stored_hash = user.get("password")
    if not stored_hash:
        return None

    if not verify_password(password, stored_hash):
        return None

    return AuthUserPayload(
        user_id=str(user["_id"]),
        email=user["email"],
        role=user["role"],
    )


def generate_jwt_for_user(user: AuthUserPayload) -> str:
    return create_access_token(
        subject=user.user_id,
        expires_delta=None  # uses default from config
    )
