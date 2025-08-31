from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models.category import Category as CategoryModel
from app.schemas.category import CategoryCreate, Category
from app.database import SessionLocal
from typing import List
router = APIRouter(prefix="/categories", tags=["Categories"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Category)
def create_category(cat: CategoryCreate, db: Session = Depends(get_db)):
    category = CategoryModel(**cat.dict())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category

@router.get("/", response_model=List[Category])
def get_categories_with_subcategories(db: Session = Depends(get_db)):
    categories = (
        db.query(CategoryModel)
        .options(joinedload(CategoryModel.subcategories))
        .filter(CategoryModel.parent_id == None)  # top-level categories only
        .all()
    )

    if not categories:
        raise HTTPException(status_code=404, detail="No categories found")
    
    return categories