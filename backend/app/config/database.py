from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

mongo_client: AsyncIOMotorClient | None = None
mongo_db = None


async def connect_to_mongo():
    global mongo_client, mongo_db
    if mongo_client is None:
        mongo_client = AsyncIOMotorClient(settings.MONGODB_URI)
        mongo_db = mongo_client[settings.DATABASE_NAME]


async def close_mongo():
    global mongo_client, mongo_db
    if mongo_client:
        mongo_client.close()
        mongo_client = None
        mongo_db = None


def get_database():
    if mongo_db is None:
        raise RuntimeError("MongoDB is not initialized. Call connect_to_mongo first.")
    return mongo_db

