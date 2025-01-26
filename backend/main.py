from fastapi import FastAPI
from auth import auth_router
from ai import ai_router

app = FastAPI()

# Include routes
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])

@app.get("/")
def home():
    return {"message": "Welcome to the Language Learning App!"}
