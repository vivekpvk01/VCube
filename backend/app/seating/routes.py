from fastapi import APIRouter, Depends, Request, UploadFile, File, HTTPException, status, Query
from app.seating.schemas import UploadResponse, SeatingMapResponse
from app.seating.service import (
    parse_students_csv, parse_rooms_csv, store_students, store_rooms,
    generate_seating_map, get_seating_map
)
from app.config.database import get_database
from app.middleware.role_guard import require_roles

router = APIRouter(prefix="/api/seating", tags=["Seating"])

@router.post("/upload-students", response_model=UploadResponse, dependencies=[Depends(require_roles(["SEATING_MANAGER", "ADMIN"]))])
async def upload_students_csv(
    file: UploadFile = File(...),
    db=Depends(get_database)
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be a CSV.")
    content = await file.read()
    students = await parse_students_csv(content)
    count = await store_students(db, students)
    return UploadResponse(message="Students uploaded successfully.", records_processed=count)

@router.post("/upload-rooms", response_model=UploadResponse, dependencies=[Depends(require_roles(["SEATING_MANAGER", "ADMIN"]))])
async def upload_rooms_csv(
    file: UploadFile = File(...),
    db=Depends(get_database)
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File must be a CSV.")
    content = await file.read()
    rooms = await parse_rooms_csv(content)
    count = await store_rooms(db, rooms)
    return UploadResponse(message="Rooms uploaded successfully.", records_processed=count)

@router.post("/generate", response_model=SeatingMapResponse, dependencies=[Depends(require_roles(["SEATING_MANAGER", "ADMIN"]))])
async def generate_seating(
    exam_id: str = Query(None),
    exam_name: str = Query(None),
    mix_departments: bool = Query(True),
    db=Depends(get_database)
):
    result = await generate_seating_map(db, exam_id, exam_name, mix_departments)
    return result

@router.get("/view", response_model=SeatingMapResponse, dependencies=[Depends(require_roles(["SEATING_MANAGER", "ADMIN"]))])
async def view_seating_map(
    seating_map_id: str = Query(None),
    db=Depends(get_database)
):
    result = await get_seating_map(db, seating_map_id)
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Seating map not found.")
    return result


