from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from app.models.product import Product as ProductModel
from app.schemas.product import ProductCreate, ProductOut
from app.database import SessionLocal
from app.models.category import Category as CategoryModel

router = APIRouter(prefix="/products", tags=["Products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductOut)
def create_product(p: ProductCreate, db: Session = Depends(get_db)):
    product = ProductModel(**p.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/", response_model=list[ProductOut])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).options(joinedload(ProductModel.category, ProductModel.image)).all()
