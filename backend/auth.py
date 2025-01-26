from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from pydantic import BaseModel

auth_router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Fake user storage (in a real app, you'd use a database)
users = {}

class User(BaseModel):
    email: str
    password: str

@auth_router.post("/register")
def register(user: User):
    if user.email in users:
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(user.password)
    users[user.email] = hashed_password
    return {"message": "User registered successfully"}

@auth_router.post("/login")
def login(user: User):
    if user.email not in users or not pwd_context.verify(user.password, users[user.email]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}
