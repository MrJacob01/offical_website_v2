from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
