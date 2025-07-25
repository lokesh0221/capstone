from fastapi import APIRouter, HTTPException, Depends
from datetime import timedelta
import logging
from backend.models.user import UserCreate, UserLogin, User
from backend.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from backend.db.client import get_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
async def register(user_data: UserCreate):
    db = get_database()
    if db.users.find_one({"email": user_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user_data.model_dump(exclude={"password"})
    user_dict["hashed_password"] = get_password_hash(user_data.password)
    result = db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    access_token = create_access_token(
        data={"sub": str(result.inserted_id)},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "token": access_token,
        "user": User(**user_dict).model_dump(exclude={"hashed_password"})
    }

@router.post("/login")
async def login(credentials: UserLogin):
    db = get_database()
    logger.info(f"Login attempt for email: {credentials.email}")
    user = db.users.find_one({"email": credentials.email})
    if not user:
        logger.warning(f"User not found for email: {credentials.email}")
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    logger.info(f"Found user with email: {credentials.email}")
    try:
        is_valid = verify_password(credentials.password, user["hashed_password"])
        logger.info(f"Password verification result: {is_valid}")
        if not is_valid:
            raise HTTPException(status_code=401, detail="Incorrect email or password")
    except Exception as e:
        logger.error(f"Error during password verification: {str(e)}")
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(
        data={"sub": str(user["_id"])},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    user_dict = dict(user)
    user_dict["_id"] = str(user_dict["_id"])
    logger.info(f"Successful login for user: {credentials.email}")
    return {
        "token": access_token,
        "user": User(**user_dict).model_dump(exclude={"hashed_password"})
    }

@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user.model_dump(exclude={"hashed_password"}) 