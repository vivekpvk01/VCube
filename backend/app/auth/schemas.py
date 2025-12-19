from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    message: str

class AuthUserPayload(BaseModel):
    user_id: str
    email: EmailStr
    role: str

