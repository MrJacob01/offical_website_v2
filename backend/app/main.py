from fastapi import FastAPI
from app.api import category, product
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ClothesUp Store API")

app.include_router(category.router)
app.include_router(product.router)
# app.include_router(image.router)
