from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.config.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Password Hashing ---
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# --- JWT Tokens ---
def create_access_token(subject: str, expires_delta: Optional[timedelta] = None):
    return _create_token(subject, expires_delta, fresh=True)

def create_refresh_token(subject: str, expires_delta: Optional[timedelta] = None):
    return _create_token(subject, expires_delta, refresh=True)

def _create_token(subject: str, expires_delta: Optional[timedelta] = None, fresh=False, refresh=False):
    to_encode = {"sub": subject, "iat": datetime.utcnow(), "fresh": fresh, "refresh": refresh}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire_minutes = settings.JWT_REFRESH_TOKEN_EXPIRE_MINUTES if refresh else settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        expire = datetime.utcnow() + timedelta(minutes=expire_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

# --- JWT Verification ---
def decode_jwt_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None

