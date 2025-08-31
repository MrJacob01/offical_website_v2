from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from app.models.image import Image as ImageModel
from app.schemas.image import ImageBase, ImageCreate, Image 
from app.database import SessionLocal


router = APIRouter(prefix="/images", tags=["images"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Image)
def create_product(p: ImageCreate, db: Session = Depends(get_db)):
    product = ImageModel(**p.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.get("/", response_model=list[Image])
def get_products(db: Session = Depends(get_db)):
    return db.query(ImageModel).all()
