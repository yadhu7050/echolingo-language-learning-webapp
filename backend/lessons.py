from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Lesson, Progress
from typing import List, Optional

lesson_router = APIRouter()

@lesson_router.get("/levels")
def get_levels(db: Session = Depends(get_db)):
    levels = db.query(Lesson.level).distinct().all()
    return {
        "levels": [level[0] for level in levels],
        "description": {
            "beginner": "Basic vocabulary and simple phrases",
            "intermediate": "Daily conversations and grammar",
            "advanced": "Complex topics and cultural content"
        }
    }

@lesson_router.get("/{level}")
def get_lessons(level: str, db: Session = Depends(get_db)):
    lessons = db.query(Lesson).filter(Lesson.level == level).order_by(Lesson.order).all()
    if not lessons:
        raise HTTPException(status_code=404, detail="Level not found")
    return lessons

@lesson_router.get("/{level}/{lesson_id}")
def get_lesson(level: str, lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(
        Lesson.level == level,
        Lesson.id == lesson_id
    ).first()
    
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson