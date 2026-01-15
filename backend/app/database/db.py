"""
Database Connection Module
Handles MongoDB connections
"""

"""
MongoDB Async Connection Manager
Uses Motor for async database operations
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os
from dotenv import load_dotenv
import logging

load_dotenv()

logger = logging.getLogger(__name__)

MONGO_URL = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "EmoHeal")

class MongoDB:
    """Singleton MongoDB connection manager"""
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

async def connect_to_mongo():
    """Connect to MongoDB on startup"""
    try:
        MongoDB.client = AsyncIOMotorClient(MONGO_URL)
        MongoDB.db = MongoDB.client[DB_NAME]
        
        # Verify connection
        await MongoDB.db.command("ping")
        logger.info(f"✅ Connected to MongoDB: {DB_NAME}")
        
    except Exception as e:
        logger.error(f"❌ MongoDB connection failed: {e}")
        raise

async def close_mongo_connection():
    """Disconnect from MongoDB on shutdown"""
    if MongoDB.client:
        MongoDB.client.close()
        logger.info("✅ Disconnected from MongoDB")

async def get_database() -> AsyncIOMotorDatabase:
    """Get MongoDB database instance"""
    if MongoDB.db is None:
        await connect_to_mongo()
    return MongoDB.db

async def create_indexes():
    """Create database indexes for performance"""
    db = await get_database()
    
    # Index for fast user lookups
    await db.chatbot_history.create_index("user_id")
    await db.chatbot_history.create_index("timestamp")
    
    # Index for crisis alerts
    await db.crisis_alerts.create_index("user_id")
    await db.crisis_alerts.create_index("resolved")
    
    logger.info("✅ Database indexes created")
