from fastapi import APIRouter, Depends, Request, HTTPException, status
from app.users.schemas import UserResponse, UserUpdateRequest
from app.users.service import get_user_by_id, update_user_profile
from app.config.database import get_database

router = APIRouter(tags=["Users"])  # ❗ REMOVED prefix

@router.get("/me", response_model=UserResponse)
async def get_my_profile(
    request: Request,
    db=Depends(get_database)
):
    user_state = getattr(request.state, "user", None)
    if not user_state:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required."
        )

    user = await get_user_by_id(db, user_state["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return user


@router.put("/me", response_model=UserResponse)
async def update_my_profile(
    data: UserUpdateRequest,
    request: Request,
    db=Depends(get_database)
):
    user_state = getattr(request.state, "user", None)
    if not user_state:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required."
        )

    updated = await update_user_profile(db, user_state["user_id"], data)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found."
        )

    return updated

