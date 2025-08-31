from pydantic import BaseModel
from typing import Optional
from app.schemas.category import CategoryBase
from app.schemas.image import ImageBase     

class ProductBase(BaseModel):
    name: str
    description: Optional[str]
    size: str
    color: str
    price: float
    quantity: int
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    category: CategoryBase
    # image: ImageBase
    class Config:
        orm_mode = True
