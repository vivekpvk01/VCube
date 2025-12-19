from fastapi import Request, HTTPException, status, Depends
from typing import Callable, List

def require_roles(allowed_roles: List[str]) -> Callable:
    async def checker(request: Request = Depends()):
        user = getattr(request.state, "user", None)
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
        user_role = user.get("role")
        if user_role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions.")
        return user
    return checker
