from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from typing import List
from datetime import datetime
from backend.models.item import Item
from backend.models.user import User
from backend.core.security import get_current_user
from backend.db.client import get_database

router = APIRouter(prefix="/items", tags=["items"])
db = get_database()

@router.post("/", response_model=Item)
async def create_item(item: Item, current_user: User = Depends(get_current_user)):
    item_dict = item.model_dump(exclude={"id"})
    result = db.items.insert_one(item_dict)
    item_dict["_id"] = str(result.inserted_id)
    return Item(**item_dict)

@router.get("/", response_model=List[Item])
async def read_items(current_user: User = Depends(get_current_user)):
    items = []
    for item in db.items.find():
        item["_id"] = str(item["_id"])
        items.append(Item(**item))
    return items

@router.get("/{item_id}", response_model=Item)
async def read_item(item_id: str, current_user: User = Depends(get_current_user)):
    try:
        item = db.items.find_one({"_id": ObjectId(item_id)})
        if item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        item["_id"] = str(item["_id"])
        return Item(**item)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")

@router.put("/{item_id}", response_model=Item)
async def update_item(item_id: str, item: Item, current_user: User = Depends(get_current_user)):
    try:
        item_dict = item.model_dump(exclude={"id"})
        item_dict["updated_at"] = datetime.utcnow()
        result = db.items.update_one(
            {"_id": ObjectId(item_id)},
            {"$set": item_dict}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        updated_item = db.items.find_one({"_id": ObjectId(item_id)})
        updated_item["_id"] = str(updated_item["_id"])
        return Item(**updated_item)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{item_id}")
async def delete_item(item_id: str, current_user: User = Depends(get_current_user)):
    try:
        result = db.items.delete_one({"_id": ObjectId(item_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found") 