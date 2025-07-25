from pymongo import MongoClient
from backend.core.config import MONGODB_URI, DATABASE_NAME

def get_database():
    client = MongoClient(MONGODB_URI)
    db = client[DATABASE_NAME]
    return db 