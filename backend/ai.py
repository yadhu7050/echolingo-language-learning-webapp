from fastapi import APIRouter, UploadFile, File
from transformers import MarianMTModel, MarianTokenizer
import speech_recognition as sr
from typing import Optional

ai_router = APIRouter()

# Initialize translation model
model_name = "Helsinki-NLP/opus-mt-en-hi"
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

@ai_router.post("/translate")
async def translate(text: str, direction: str = "en-hi"):
    try:
        if direction == "en-hi":
            inputs = tokenizer(text, return_tensors="pt", padding=True)
            translated = model.generate(**inputs)
            translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)
        else:
            # For hi-en, you'd need another model or API
            translated_text = "Hindi to English translation not implemented yet"
            
        return {
            "original": text,
            "translated": translated_text,
            "direction": direction
        }
    except Exception as e:
        return {"error": str(e)}

@ai_router.post("/check-pronunciation")
async def check_pronunciation(audio: UploadFile = File(...), text: str = None):
    # Placeholder for pronunciation checking
    # In a real app, you'd use a speech recognition service
    return {
        "accuracy": 0.85,
        "feedback": "Good pronunciation! Work on stress on the second syllable."
    }

@ai_router.post("/generate-quiz")
async def generate_quiz(topic: str, difficulty: str = "beginner"):
    # Generate a quiz based on the user's level and topic
    sample_quiz = {
        "questions": [
            {
                "question": "What is 'Hello' in Hindi?",
                "options": ["नमस्ते", "धन्यवाद", "अलविदा"],
                "correct": "नमस्ते"
            }
        ]
    }
    return sample_quiz