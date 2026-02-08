from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Chinnari Paata API", description="Telugu Language Learning App for Toddlers")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ProgressData(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    device_id: str
    letters_heard: List[str] = []
    words_tapped: List[str] = []
    rhymes_watched: List[str] = []
    stickers_earned: List[str] = []
    total_interactions: int = 0
    daily_limit: int = 30
    daily_usage: int = 0
    last_usage_date: Optional[str] = None
    last_active: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProgressUpdate(BaseModel):
    device_id: str
    letters_heard: Optional[List[str]] = None
    words_tapped: Optional[List[str]] = None
    rhymes_watched: Optional[List[str]] = None
    stickers_earned: Optional[List[str]] = None
    total_interactions: Optional[int] = None
    daily_limit: Optional[int] = None
    daily_usage: Optional[int] = None

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Chinnari Paata API - Telugu Learning for Toddlers", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "app": "Chinnari Paata"}

# Progress endpoints
@api_router.get("/progress/{device_id}", response_model=ProgressData)
async def get_progress(device_id: str):
    """Get learning progress for a device"""
    progress = await db.progress.find_one({"device_id": device_id}, {"_id": 0})
    
    if not progress:
        # Create new progress record
        new_progress = ProgressData(device_id=device_id)
        doc = new_progress.model_dump()
        await db.progress.insert_one(doc)
        return new_progress
    
    return progress

@api_router.post("/progress", response_model=ProgressData)
async def save_progress(progress_update: ProgressUpdate):
    """Save or update learning progress"""
    device_id = progress_update.device_id
    
    # Check if progress exists
    existing = await db.progress.find_one({"device_id": device_id}, {"_id": 0})
    
    update_data = progress_update.model_dump(exclude_none=True)
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    update_data["last_active"] = datetime.now(timezone.utc).isoformat()
    
    if existing:
        # Update existing progress
        await db.progress.update_one(
            {"device_id": device_id},
            {"$set": update_data}
        )
        updated = await db.progress.find_one({"device_id": device_id}, {"_id": 0})
        return updated
    else:
        # Create new progress
        new_progress = ProgressData(**update_data)
        doc = new_progress.model_dump()
        await db.progress.insert_one(doc)
        return new_progress

@api_router.delete("/progress/{device_id}")
async def reset_progress(device_id: str):
    """Reset progress for a device"""
    result = await db.progress.delete_one({"device_id": device_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Progress not found")
    return {"message": "Progress reset successfully"}

# Analytics endpoints (for parent dashboard)
@api_router.get("/analytics/{device_id}")
async def get_analytics(device_id: str):
    """Get learning analytics for a device"""
    progress = await db.progress.find_one({"device_id": device_id}, {"_id": 0})
    
    if not progress:
        return {
            "total_letters": 0,
            "total_words": 0,
            "total_rhymes": 0,
            "total_stickers": 0,
            "total_interactions": 0,
            "daily_usage": 0,
            "learning_streak": 0
        }
    
    return {
        "total_letters": len(progress.get("letters_heard", [])),
        "total_words": len(progress.get("words_tapped", [])),
        "total_rhymes": len(progress.get("rhymes_watched", [])),
        "total_stickers": len(progress.get("stickers_earned", [])),
        "total_interactions": progress.get("total_interactions", 0),
        "daily_usage": progress.get("daily_usage", 0),
        "daily_limit": progress.get("daily_limit", 30),
        "last_active": progress.get("last_active")
    }

# Status check endpoints (kept for backward compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
