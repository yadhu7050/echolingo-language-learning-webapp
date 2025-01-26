from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

lesson_router = APIRouter()

# Sample lesson data (in real app, use database)
lessons = {
    "beginner": [
        {
            "id": 1,
            "title": "Basic Greetings",
            "words": [
                {"english": "Hello", "hindi": "नमस्ते", "pronunciation": "namaste"},
                {"english": "Thank you", "hindi": "धन्यवाद", "pronunciation": "dhanyavaad"},
                {"english": "How are you", "hindi": "आप कैसे हैं", "pronunciation": "aap kaise hain"}
            ],
            "practice_phrases": [
                "Hello, how are you?",
                "Thank you, goodbye!"
            ]
        }
    ]
}

@lesson_router.get("/levels")
def get_levels():
    return {
        "levels": ["beginner", "intermediate", "advanced"],
        "current_available": ["beginner"]
    }

@lesson_router.get("/{level}")
def get_lessons(level: str):
    if level not in lessons:
        raise HTTPException(status_code=404, detail="Level not found")
    return lessons[level]

@lesson_router.get("/{level}/{lesson_id}")
def get_lesson(level: str, lesson_id: int):
    if level not in lessons:
        raise HTTPException(status_code=404, detail="Level not found")
    
    lesson = next((l for l in lessons[level] if l["id"] == lesson_id), None)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    return lesson