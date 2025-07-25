from pydantic import Field
from typing import Optional
from .base import BaseDBModel

class Item(BaseDBModel):
    name: str
    description: Optional[str] = None
    quantity: int = 0
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Sample Item",
                "description": "This is a sample item",
                "quantity": 1
            }
        } 