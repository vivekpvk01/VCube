from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.exams.schemas import ExamCreate, ExamUpdate, ExamResponse
from app.exams.service import create_exam, update_exam, delete_exam, fetch_exams
from app.config.database import get_database
from app.middleware.role_guard import require_roles
from typing import List

router = APIRouter(prefix="/api/exams", tags=["Exams"])

@router.post("/", response_model=ExamResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles(["ADMIN"]))])
async def create_exam_endpoint(
    data: ExamCreate,
    request: Request,
    db=Depends(get_database),
):
    return await create_exam(db, data)

@router.put("/{exam_id}", response_model=ExamResponse, dependencies=[Depends(require_roles(["ADMIN"]))])
async def update_exam_endpoint(
    exam_id: str,
    data: ExamUpdate,
    request: Request,
    db=Depends(get_database),
):
    updated = await update_exam(db, exam_id, data)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exam not found.")
    return updated

@router.delete("/{exam_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_roles(["ADMIN"]))])
async def delete_exam_endpoint(
    exam_id: str,
    request: Request,
    db=Depends(get_database),
):
    deleted = await delete_exam(db, exam_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exam not found.")
    return

@router.get("/", response_model=List[ExamResponse])
async def get_exams_endpoint(request: Request, db=Depends(get_database)):
    return await fetch_exams(db)

