from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.controllers import item_controller
from app.schemas.item import NewItem, Item
from typing import List

router = APIRouter()

@router.post("/items", response_model=Item)
def create_item(item: NewItem, db: Session = Depends(get_db)):
    return item_controller.create_item(db, item)

@router.get("/items", response_model=List[Item])
def read_items(db: Session = Depends(get_db)):
    return item_controller.get_items(db)

@router.delete("/items/{item_id}", response_model=Item)
def delete_item(item_id: str, db: Session = Depends(get_db)):
    item = item_controller.delete_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.put("/items/{item_id}", response_model=Item)
def update_item(item_id: str, updated_item: NewItem, db: Session = Depends(get_db)):
    item = item_controller.update_item(db, item_id, updated_item)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item