from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import get_db, Question, User
from ai_service import translation_service
from typing import List
import random
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/static", StaticFiles(directory="static"), name="static")


class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    username: str
    email: str
    password: str

@app.post("/register")
async def register(user: UserRegister, db: Session = Depends(get_db)):
 
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        username=user.username,
        email=user.email,
        password=user.password  
    )
    db.add(new_user)
    try:
        db.commit()
        return {"message": "Registration successful"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(
        User.email == user.email,
        User.password == user.password  
    ).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "username": db_user.username}

@app.get("/questions/{language}/{level}")
async def get_questions(language: str, level: str, db: Session = Depends(get_db)):
    questions = db.query(Question).filter(
        Question.language == language,
        Question.level == level
    ).all()
    
    if not questions:
        raise HTTPException(status_code=404, detail="No questions found")
    
    
    selected = random.sample(questions, min(5, len(questions)))
    return selected

@app.post("/translate")
async def translate(text: str, target_language: str):
    translated = translation_service.translate(text, target_language)
    if not translated:
        raise HTTPException(status_code=500, detail="Translation failed")
    return {"translated_text": translated}

@app.post("/quiz/score")
async def calculate_score(answers: list, current_score: int):
    
    final_score = current_score
    return {"score": final_score, "level": "intermediate"}  