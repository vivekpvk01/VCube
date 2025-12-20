from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.mindmaps.schemas import MindMapCreateRequest, MindMapResponse
from app.mindmaps.service import create_mindmap, get_user_mindmaps
from app.config.database import get_database
from app.middleware.role_guard import require_roles
from typing import List

router = APIRouter(prefix="/api/mindmaps", tags=["Mind Maps"])

@router.post("/", response_model=MindMapResponse, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_roles(["STUDENT"]))])
async def create_mindmap_endpoint(
    data: MindMapCreateRequest,
    request: Request,
    db=Depends(get_database),
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    try:
        return await create_mindmap(db, data, user["user_id"])
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create mind map.")

@router.get("/", response_model=List[MindMapResponse], dependencies=[Depends(require_roles(["STUDENT"]))])
async def get_mindmaps_endpoint(
    request: Request,
    db=Depends(get_database),
):
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    return await get_user_mindmaps(db, user["user_id"])


