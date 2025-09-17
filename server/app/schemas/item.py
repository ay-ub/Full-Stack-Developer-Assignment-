from pydantic import BaseModel

class NewItem(BaseModel):
    name: str
    description: str
    price: float
    expiryDate: str  

class Item(NewItem):
    id: str

    class Config:
        from_attributes  = True
