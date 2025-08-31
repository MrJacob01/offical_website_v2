from pydantic import BaseModel
from typing import List, Optional

class CategoryBase(BaseModel):
    name: str
    parent_id:int | None = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    subcategories: List["Category"] = []  # recursive reference
    
    class Config:
        orm_mode = True
