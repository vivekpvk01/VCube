from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.config.settings import settings
from app.config.database import connect_to_mongo, close_mongo
from app.auth.routes import router as auth_router
from app.users.routes import router as users_router

app = FastAPI(
    title="VCube Academic & Examination Management API",
    version="1.0.0"
)

# 🔥 REQUIRED: Mongo lifecycle
@app.on_event("startup")
async def startup():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown():
    await close_mongo()

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Error handler ---
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"ok": False, "detail": str(exc)}
    )

@app.get("/")
async def root():
    return {
        "message": "VCube Academic & Examination Management API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
async def health():
    return {"ok": True}

# --- Routers ---
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
