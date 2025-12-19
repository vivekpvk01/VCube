from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator, model_validator
from functools import lru_cache
import json
import os
from typing import Any

# #region agent log
log_path = r"c:\Users\vivek\Desktop\VCube\.cursor\debug.log"
try:
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "settings.py:6", "message": "Settings module loading", "data": {"cwd": os.getcwd(), "env_file_exists": os.path.exists(".env")}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
except: pass
# #endregion

class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str = "vcube"

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 600
    JWT_REFRESH_TOKEN_EXPIRE_MINUTES: int = 10080

    AWS_S3_BUCKET: str = ""
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_REGION: str = ""
    CLOUDINARY_URL: str = ""

    FRONTEND_ORIGIN: str = "http://localhost:3000"
    cors_origins_str: str = "http://localhost:3000"
    ENV: str = "development"

    @property
    def CORS_ORIGINS(self) -> list[str]:
        # #region agent log
        try:
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "post-fix", "hypothesisId": "A", "location": "settings.py:33", "message": "CORS_ORIGINS property accessed", "data": {"value": self.cors_origins_str}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
        except: pass
        # #endregion
        if not self.cors_origins_str or self.cors_origins_str.strip() == "":
            return ["http://localhost:3000"]
        try:
            parsed = json.loads(self.cors_origins_str)
            # #region agent log
            try:
                with open(log_path, "a", encoding="utf-8") as f:
                    f.write(json.dumps({"sessionId": "debug-session", "runId": "post-fix", "hypothesisId": "A", "location": "settings.py:40", "message": "CORS_ORIGINS parsed as JSON", "data": {"parsed": str(parsed)}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
            except: pass
            # #endregion
            return parsed if isinstance(parsed, list) else [parsed]
        except json.JSONDecodeError:
            # #region agent log
            try:
                with open(log_path, "a", encoding="utf-8") as f:
                    f.write(json.dumps({"sessionId": "debug-session", "runId": "post-fix", "hypothesisId": "A", "location": "settings.py:47", "message": "CORS_ORIGINS not JSON, treating as single string", "data": {}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
            except: pass
            # #endregion
            return [self.cors_origins_str]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="",
        case_sensitive=False,
        extra="ignore"
    )
    
    def __init__(self, **kwargs):
        # #region agent log
        try:
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "post-fix", "hypothesisId": "A", "location": "settings.py:58", "message": "Settings __init__ called", "data": {"kwargs_keys": list(kwargs.keys())}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
        except: pass
        # #endregion
        if "CORS_ORIGINS" in kwargs:
            kwargs["cors_origins_str"] = kwargs.pop("CORS_ORIGINS")
        super().__init__(**kwargs)


@lru_cache
def get_settings():
    # #region agent log
    try:
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "settings.py:62", "message": "get_settings called", "data": {}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
    except: pass
    # #endregion
    try:
        settings = Settings()
        # #region agent log
        try:
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "settings.py:68", "message": "Settings created successfully", "data": {"cors_origins": str(settings.CORS_ORIGINS)}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
        except: pass
        # #endregion
        return settings
    except Exception as e:
        # #region agent log
        try:
            with open(log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "post-fix", "hypothesisId": "A", "location": "settings.py:95", "message": "Settings creation failed", "data": {"error": str(e), "error_type": type(e).__name__}, "timestamp": int(__import__("time").time() * 1000)}) + "\n")
        except: pass
        # #endregion
        raise

settings = get_settings()
