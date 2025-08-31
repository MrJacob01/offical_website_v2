from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from app.database import Base

class ProductView(Base):
    __tablename__ = "product_views"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer)
    viewed_at = Column(DateTime, default=func.now())
    def __repr__(self):
        return f"<ProductView(id={self.id}, product_id={self.product_id}, user_id={self.user_id}, viewed_at={self.viewed_at})>"