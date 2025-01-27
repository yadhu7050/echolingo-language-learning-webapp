from sqlalchemy import create_engine, Column, Integer, String, Text, JSON, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from typing import Generator


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    quiz_results = relationship("QuizResult", back_populates="user")


class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True)
    english_text = Column(Text, nullable=False)
    translated_text = Column(Text, nullable=False)
    options = Column(JSON)  # Stores multiple choice options
    correct_answer = Column(Text, nullable=False)
    language = Column(String(20), nullable=False)  # hindi, tamil, telugu, marathi, bengali
    level = Column(String(20), nullable=False)     # beginner, intermediate, advanced


class QuizResult(Base):
    __tablename__ = 'quiz_results'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    language = Column(String(20), nullable=False)
    level = Column(String(20), nullable=False)
    score = Column(Integer, nullable=False)
    clues_used = Column(Integer, default=0)
    user = relationship("User", back_populates="quiz_results")


SQLALCHEMY_DATABASE_URL = "sqlite:///./language_learning.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # Needed for SQLite
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)