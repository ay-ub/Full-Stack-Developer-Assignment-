from sqlalchemy import Column, String, Float
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    expiryDate = Column(String, nullable=False) 
