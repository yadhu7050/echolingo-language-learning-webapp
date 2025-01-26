from database import SessionLocal, engine
import models
from models import Lesson
import json

# Create tables
models.Base.metadata.create_all(bind=engine)

# Sample lesson data
lessons_data = [
    {
        "level": "beginner",
        "title": "Basic Greetings",
        "description": "Learn essential Hindi greetings",
        "language": "hindi",
        "order": 1,
        "content": {
            "vocabulary": [
                {"english": "Hello", "hindi": "नमस्ते", "pronunciation": "namaste"},
                {"english": "Good morning", "hindi": "शुभ प्रभात", "pronunciation": "shubh prabhaat"},
                {"english": "Thank you", "hindi": "धन्यवाद", "pronunciation": "dhanyavaad"}
            ],
            "exercises": [
                {
                    "type": "match",
                    "pairs": [
                        {"english": "Hello", "hindi": "नमस्ते"},
                        {"english": "Thank you", "hindi": "धन्यवाद"}
                    ]
                }
            ],
            "quiz": {
                "questions": [
                    {
                        "question": "How do you say 'Hello' in Hindi?",
                        "options": ["नमस्ते", "धन्यवाद", "शुभ प्रभात"],
                        "correct": "नमस्ते"
                    }
                ]
            }
        }
    },
    # Add more lessons here
]

def seed_database():
    db = SessionLocal()
    try:
        # Clear existing lessons
        db.query(Lesson).delete()
        
        # Add new lessons
        for lesson_data in lessons_data:
            lesson = Lesson(
                level=lesson_data["level"],
                title=lesson_data["title"],
                description=lesson_data["description"],
                content=lesson_data["content"],
                order=lesson_data["order"],
                language=lesson_data["language"]
            )
            db.add(lesson)
        
        db.commit()
        print("Database seeded successfully!")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()