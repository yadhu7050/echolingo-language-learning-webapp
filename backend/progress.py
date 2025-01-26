from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict

progress_router = APIRouter()

# In-memory storage (use database in production)
user_progress = {}

class Progress(BaseModel):
    lesson_id: int
    completed: bool
    score: float
    words_mastered: List[str]

@progress_router.post("/update")
def update_progress(user_id: int, progress: Progress):
    if user_id not in user_progress:
        user_progress[user_id] = []
    user_progress[user_id].append(progress.dict())
    return {"message": "Progress updated successfully"}

@progress_router.get("/user/{user_id}")
def get_progress(user_id: int):
    if user_id not in user_progress:
        raise HTTPException(status_code=404, detail="No progress found for user")
    return user_progress[user_id]