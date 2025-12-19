from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response
from starlette.responses import JSONResponse
from starlette.status import HTTP_401_UNAUTHORIZED
from app.config.security import decode_jwt_token

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        token = request.cookies.get("access_token")
        if not token:
            return JSONResponse(status_code=HTTP_401_UNAUTHORIZED, content={"detail": "Missing access token."})
        payload = decode_jwt_token(token)
        if not payload:
            return JSONResponse(status_code=HTTP_401_UNAUTHORIZED, content={"detail": "Invalid or expired token."})
        request.state.user = payload
        return await call_next(request)
