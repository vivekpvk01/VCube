from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserResponse(BaseModel):
    user_id: str = Field(..., alias="_id")
    email: EmailStr
    role: str
    name: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None

class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None


