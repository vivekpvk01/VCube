from fastapi import APIRouter, Depends, Request, UploadFile, File, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.config.database import get_database
from app.config.settings import settings
from datetime import datetime
from typing import Optional
import boto3
from botocore.exceptions import ClientError
import cloudinary
import cloudinary.uploader
from io import BytesIO

router = APIRouter(prefix="/api/files", tags=["Files"])

ALLOWED_CONTENT_TYPES = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "text/csv": [".csv"],
    "application/vnd.ms-excel": [".csv"],
}

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

async def upload_to_storage(file_content: bytes, filename: str, content_type: str) -> str:
    if settings.AWS_S3_BUCKET and settings.AWS_ACCESS_KEY_ID:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION,
        )
        key = f"uploads/{datetime.utcnow().strftime('%Y/%m/%d')}/{filename}"
        s3_client.put_object(Bucket=settings.AWS_S3_BUCKET, Key=key, Body=file_content, ContentType=content_type)
        return f"https://{settings.AWS_S3_BUCKET}.s3.{settings.AWS_S3_REGION}.amazonaws.com/{key}"
    elif settings.CLOUDINARY_URL:
        cloudinary.config(cloudinary_url=settings.CLOUDINARY_URL)
        result = cloudinary.uploader.upload(
            BytesIO(file_content),
            resource_type="auto",
            folder="uploads",
            public_id=filename.rsplit(".", 1)[0],
        )
        return result.get("secure_url", result.get("url", ""))
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="File storage not configured.")

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    request: Request,
    db: AsyncIOMotorDatabase = Depends(get_database),
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    if not file.content_type or file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type.")
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size exceeds limit.")
    try:
        url = await upload_to_storage(content, file.filename, file.content_type)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="File upload failed.")
    file_doc = {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(content),
        "url": url,
        "uploaded_by": user["user_id"],
        "uploaded_at": datetime.utcnow(),
    }
    result = await db["files"].insert_one(file_doc)
    return {
        "file_id": str(result.inserted_id),
        "filename": file.filename,
        "url": url,
        "size": len(content),
    }

