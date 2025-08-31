from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    size = Column(String)
    color = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
    
    category_id = Column(Integer, ForeignKey("categories.id"))
    # image = relationship("Image", cascade="all, delete-orphan")         
    category = relationship("Category")
    def __repr__(self):
        return f"<Product(name={self.name}, price={self.price}, quantity={self.quantity})>"
