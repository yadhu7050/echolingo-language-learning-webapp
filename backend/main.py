from fastapi import FastAPI
from auth import auth_router
from ai import ai_router
from lessons import lesson_router
from progress import progress_router

app = FastAPI(title="Language Learning AI")

# Include routes
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(lesson_router, prefix="/lessons", tags=["Lessons"])
app.include_router(ai_router, prefix="/ai", tags=["AI Features"])
app.include_router(progress_router, prefix="/progress", tags=["Progress Tracking"])

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Language Learning!",
        "available_languages": ["English", "Hindi"],
        "features": [
            "Interactive Lessons",
            "AI Translation",
            "Pronunciation Check",
            "Progress Tracking",
            "Personalized Quizzes"
        ]
    }
