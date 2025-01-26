from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Progress, User
from pydantic import BaseModel
from typing import List

progress_router = APIRouter()

class ProgressCreate(BaseModel):
    lesson_id: int
    completed: bool
    score: float
    words_mastered: List[str]

@progress_router.post("/update")
def update_progress(
    user_id: int, 
    progress: ProgressCreate, 
    db: Session = Depends(get_db)
):
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create progress entry
    db_progress = Progress(
        user_id=user_id,
        lesson_id=progress.lesson_id,
        completed=progress.completed,
        score=progress.score,
        words_mastered=progress.words_mastered
    )
    
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    
    return {"message": "Progress updated successfully"}

@progress_router.get("/user/{user_id}")
def get_progress(user_id: int, db: Session = Depends(get_db)):
    progress = db.query(Progress).filter(Progress.user_id == user_id).all()
    if not progress:
        raise HTTPException(status_code=404, detail="No progress found for user")
    return progress