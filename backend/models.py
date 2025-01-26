from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, JSON, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    progress = relationship("Progress", back_populates="user")
    quiz_results = relationship("QuizResult", back_populates="user")

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    level = Column(String)  # beginner, intermediate, advanced
    title = Column(String)
    description = Column(Text)
    content = Column(JSON)  # Store lesson content as JSON
    order = Column(Integer)  # For lesson sequence
    language = Column(String)  # hindi, tamil, etc.
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    completed = Column(Boolean, default=False)
    score = Column(Float)
    last_attempted = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime)
    
    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson")

class QuizResult(Base):
    __tablename__ = "quiz_results"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    score = Column(Float)
    answers = Column(JSON)  # Store user's answers
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="quiz_results")