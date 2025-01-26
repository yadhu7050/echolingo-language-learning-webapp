from fastapi import APIRouter

ai_router = APIRouter()

# Simple translation dictionary for demonstration
translations = {
    "hello": "नमस्ते",
    "how are you": "आप कैसे हैं",
    "good morning": "शुभ प्रभात"
}

@ai_router.post("/translate")
def translate(text: str, target_lang: str = "hi"):
    # Simple demonstration translation
    translated = translations.get(text.lower(), f"Translation not found for: {text}")
    return {
        "original": text,
        "translated": translated
    }
