from sqlalchemy.orm import Session
from app.models.item import Item as ItemModel
from app.schemas.item import NewItem
import uuid

def create_item(db: Session, item: NewItem):
    db_item = ItemModel(
        id=str(uuid.uuid4()), 
        name=item.name,
        description=item.description,
        price=item.price,
        expiryDate=item.expiryDate,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_items(db: Session):
    return db.query(ItemModel).all()

def delete_item(db: Session, item_id: str):
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def update_item(db: Session, item_id: str, updated_item: NewItem):
    item = db.query(ItemModel).filter(ItemModel.id == item_id).first()
    if not item:
        return None
    
    item.name = updated_item.name
    item.description = updated_item.description
    item.price = updated_item.price
    item.expiryDate = updated_item.expiryDate

    db.commit()
    db.refresh(item)
    return item