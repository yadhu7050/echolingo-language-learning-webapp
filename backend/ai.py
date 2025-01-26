from fastapi import APIRouter, HTTPException
from transformers import MarianMTModel, MarianTokenizer
from typing import List
import torch

ai_router = APIRouter()

# Dictionary of supported language models
LANGUAGE_MODELS = {
    "hindi": "Helsinki-NLP/opus-mt-en-hi",
    "tamil": "Helsinki-NLP/opus-mt-en-ta",
    "telugu": "Helsinki-NLP/opus-mt-en-te",
    "bengali": "Helsinki-NLP/opus-mt-en-bn",
    "marathi": "Helsinki-NLP/opus-mt-en-mr"
}

# Initialize models dictionary
models = {}
tokenizers = {}

# Load models on demand to save memory
def load_model(language: str):
    if language not in models:
        try:
            model_name = LANGUAGE_MODELS[language]
            tokenizers[language] = MarianTokenizer.from_pretrained(model_name)
            models[language] = MarianMTModel.from_pretrained(model_name)
        except Exception as e:
            print(f"Error loading {language} model: {e}")
            return False
    return True

# Fallback translations for different languages
FALLBACK_TRANSLATIONS = {
    "hindi": {
        "hello": "नमस्ते",
        "how are you": "आप कैसे हैं",
        "good morning": "शुभ प्रभात"
    },
    "tamil": {
        "hello": "வணக்கம்",
        "how are you": "எப்படி இருக்கிறீர்கள்",
        "good morning": "காலை வணக்கம்"
    },
    "telugu": {
        "hello": "నమస్కారం",
        "how are you": "ఎలా ఉన్నారు",
        "good morning": "శుభోదయం"
    },
    "bengali": {
        "hello": "নমস্কার",
        "how are you": "কেমন আছেন",
        "good morning": "সুপ্রভাত"
    },
    "marathi": {
        "hello": "नमस्कार",
        "how are you": "कसे आहात",
        "good morning": "शुभ प्रभात"
    }
}

@ai_router.get("/supported-languages")
async def get_supported_languages():
    return {
        "languages": list(LANGUAGE_MODELS.keys()),
        "message": "Select any of these languages for translation"
    }

@ai_router.post("/translate")
async def translate(text: str, target_language: str):
    if target_language not in LANGUAGE_MODELS:
        raise HTTPException(
            status_code=400, 
            detail=f"Language not supported. Supported languages: {list(LANGUAGE_MODELS.keys())}"
        )
    
    try:
        # Load model if not already loaded
        if load_model(target_language):
            inputs = tokenizers[target_language](text, return_tensors="pt", padding=True)
            translated = models[target_language].generate(**inputs)
            translated_text = tokenizers[target_language].decode(translated[0], skip_special_tokens=True)
        else:
            # Fallback to dictionary
            translated_text = FALLBACK_TRANSLATIONS[target_language].get(
                text.lower(), 
                f"Translation not available for: {text}"
            )
        
        return {
            "original": text,
            "translated": translated_text,
            "language": target_language
        }
    except Exception as e:
        # Fallback to dictionary
        translated_text = FALLBACK_TRANSLATIONS[target_language].get(
            text.lower(), 
            f"Translation not available for: {text}"
        )
        return {
            "original": text,
            "translated": translated_text,
            "language": target_language,
            "method": "fallback_dictionary"
        }

@ai_router.post("/practice/{language}")
async def generate_practice(language: str, level: str = "beginner"):
    if language not in LANGUAGE_MODELS:
        raise HTTPException(status_code=400, detail="Language not supported")
    
    # Practice phrases for different levels
    practice_sets = {
        "beginner": [
            "Hello, how are you?",
            "My name is John",
            "Thank you very much",
            "Good morning",
            "I like learning languages"
        ],
        "intermediate": [
            "I would like to learn more about Indian culture",
            "Can you help me practice?",
            "What is your favorite food?",
            "How long have you been learning?"
        ],
        "advanced": [
            "The cultural diversity in India is fascinating",
            "Learning a new language opens up new perspectives",
            "Let's discuss the similarities between languages"
        ]
    }
    
    # Translate all practice phrases
    translated_phrases = []
    phrases = practice_sets.get(level, practice_sets["beginner"])
    
    for phrase in phrases:
        translation = await translate(phrase, language)
        translated_phrases.append({
            "english": phrase,
            "translated": translation["translated"]
        })
    
    return {
        "language": language,
        "level": level,
        "practice_pairs": translated_phrases
    }