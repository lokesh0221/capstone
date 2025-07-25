from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from .base import BaseDBModel

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: Literal["STUDENT", "TEACHER"] = "STUDENT"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase, BaseDBModel):
    hashed_password: str

    class Config:
        json_schema_extra = {
            "example": {
                "username": "johndoe",
                "email": "john@example.com",
                "role": "STUDENT"
            }
        } 