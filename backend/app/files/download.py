from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.config.database import get_database
from bson.objectid import ObjectId
from typing import Optional

router = APIRouter(prefix="/api/files", tags=["Files"])

@router.get("/{file_id}")
async def download_file(
    file_id: str,
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    try:
        file_doc = await db["files"].find_one({"_id": ObjectId(file_id)})
    except Exception:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not found.")
    if not file_doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not found.")
    uploaded_by = file_doc.get("uploaded_by")
    user_role = user.get("role")
    if uploaded_by != user["user_id"] and user_role not in ["ADMIN"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    url = file_doc.get("url")
    if not url:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File URL not available.")
    return RedirectResponse(url=url, status_code=status.HTTP_302_FOUND)

