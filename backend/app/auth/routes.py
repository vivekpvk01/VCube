from fastapi import APIRouter, Depends, Request, Response, status, HTTPException
from app.auth.schemas import LoginRequest, TokenResponse
from app.auth.service import verify_user_credentials
from app.config.database import get_database
from app.config.settings import settings
from app.auth.service import verify_user_credentials

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
async def login(
    data: LoginRequest,
    response: Response,
    request: Request,
    db=Depends(get_database)
):
    user = await verify_user_credentials(
        db,
        data.email,
        data.password,
        data.role      # 🔴 PASS ROLE
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email, password, or role"
        )

    from app.config.security import create_access_token
    access_token = create_access_token(subject=user.user_id)

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=settings.ENV == "production",
        samesite="lax",
        max_age=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

    return TokenResponse(message="Login successful")

@router.post("/logout", response_model=TokenResponse)
async def logout(response: Response):
    response.delete_cookie(key="access_token", samesite="lax")
    return TokenResponse(message="Logout successful")
