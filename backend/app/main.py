# from fastapi import FastAPI
# from app.api import category, product
# from app.database import Base, engine

# Base.metadata.create_all(bind=engine)

# app = FastAPI(title="ClothesUp Store API")

# app.include_router(category.router)
# app.include_router(product.router)
# app.include_router(image.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# 🚀 Enable CORS
origins = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],         # GET, POST, PUT, DELETE...
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    name: str
    price: float
    description: str


class Category(BaseModel):
    id: int
    name: str

# Dummy products
products_db = {
    1: [
        { "id": 1, "name": 'CASUAL COMBO', "price": 280000, "description": 'Футболка + джинсы + кроссовки', "sizes": ['S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center' },
        { "id": 2, "name": 'BUSINESS COMBO', "price": 450000, "description": 'Рубашка + брюки + туфли', "sizes": ['S', 'M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center' },
        { "id": 3, "name": 'SUMMER COMBO', "price": 320000, "description": 'Шорты + футболка + сандалии', "sizes": ['XS', 'S', 'M', 'L'], "inStock": True, "image": 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=400&fit=crop&crop=center' },
        { "id": 4, "name": 'WINTER COMBO', "price": 380000, "description": 'Свитер + джинсы + ботинки', "sizes": ['M', 'L', 'XL'], "inStock": False, "image": 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center' },
        { "id": 5, "name": 'SPORT COMBO', "price": 350000, "description": 'Спортивный костюм + кроссовки', "sizes": ['S', 'M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center' },
        { "id": 6, "name": 'EVENING COMBO', "price": 520000, "description": 'Платье + туфли + аксессуары', "sizes": ['XS', 'S', 'M', 'L'], "inStock": True, "image": 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop&crop=center' }
    ],
    2: [
        { "id": 7, "name": 'КЛАССИЧЕСКАЯ ФУТБОЛКА', "price": 85000, "description": 'Хлопок 100%', "sizes": ['XS', 'S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center' },
        { "id": 8, "name": 'POLO ФУТБОЛКА', "price": 120000, "description": 'Премиум качество', "sizes": ['S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center' },
        { "id": 9, "name": 'СПОРТИВНАЯ ФУТБОЛКА', "price": 95000, "description": 'Дышащая ткань', "sizes": ['S', 'M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1583743814966-8936f37f4ca9?w=400&h=400&fit=crop&crop=center' },
        { "id": 10, "name": 'OVERSIZE ФУТБОЛКА', "price": 110000, "description": 'Модный крой', "sizes": ['M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&crop=center' }
    ],
    3: [
        { "id": 11, "name": 'ДЕЛОВАЯ РУБАШКА', "price": 180000, "description": 'Классический стиль', "sizes": ['S', 'M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=center' },
        { "id": 12, "name": 'CASUAL РУБАШКА', "price": 150000, "description": 'Повседневная', "sizes": ['XS', 'S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center' },
        { "id": 13, "name": 'ДЖИНСОВАЯ РУБАШКА', "price": 160000, "description": 'Стильный деним', "sizes": ['S', 'M', 'L', 'XL'], "inStock": False, "image": 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&crop=center' }
    ],
    4: [
        { "id": 14, "name": 'КЛАССИЧЕСКИЕ БРЮКИ', "price": 220000, "description": 'Офисный стиль', "sizes": ['28', '30', '32', '34', '36'], "inStock": True, "image": 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center' },
        { "id": 15, "name": 'CHINO БРЮКИ', "price": 190000, "description": 'Casual стиль', "sizes": ['28', '30', '32', '34', '36', '38'], "inStock": True, "image": 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop&crop=center' },
        { "id": 16, "name": 'СПОРТИВНЫЕ БРЮКИ', "price": 140000, "description": 'Удобные и практичные', "sizes": ['S', 'M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center' }
    ],
    5: [
        { "id": 17, "name": 'ЛЕТНЕЕ ПЛАТЬЕ', "price": 250000, "description": 'Легкое и воздушное', "sizes": ['XS', 'S', 'M', 'L'], "inStock": True, "image": 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center' },
        { "id": 18, "name": 'ВЕЧЕРНЕЕ ПЛАТЬЕ', "price": 480000, "description": 'Элегантный стиль', "sizes": ['XS', 'S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1566479179817-c96300ad87f1?w=400&h=400&fit=crop&crop=center' }
    ],
    6: [
        { "id": 19, "name": 'ДЖИНСОВАЯ КУРТКА', "price": 280000, "description": 'Классический деним', "sizes": ['S', 'M', 'L', 'XL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center' },
        { "id": 20, "name": 'ЗИМНЯЯ КУРТКА', "price": 420000, "description": 'Теплая и стильная', "sizes": ['M', 'L', 'XL', 'XXL'], "inStock": True, "image": 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop&crop=center' }
    ],
    7: [
        { "id": 21, "name": 'КРОССОВКИ CASUAL', "price": 320000, "description": 'Удобные повседневные', "sizes": ['38', '39', '40', '41', '42', '43', '44'], "inStock": True, "image": 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center' },
        { "id": 22, "name": 'ТУФЛИ КЛАССИЧЕСКИЕ', "price": 380000, "description": 'Для деловых встреч', "sizes": ['38', '39', '40', '41', '42', '43'], "inStock": True, "image": 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop&crop=center' }
    ]
}


categories_db = [
    {"id": 1, "name": "Комбо"},
    {"id": 2, "name": "Футболки"},
    {"id": 3, "name": "Рубашки"},
    {"id": 4, "name": "Брюки"},
    {"id": 5, "name": "Куртки"},
    {"id": 6, "name": "Платья"},
    {"id": 7, "name": "Аксессуары"},
    {"id": 8, "name": "Джинсы"},
    {"id": 9, "name": "Обувь"},
    {"id": 10, "name": "Нижнее белье"},
    {"id": 11, "name": "Спорт"},
    {"id": 12, "name": "Детская одежда"},
    {"id": 13, "name": "Дополнительно"},
]

@app.get("/products", response_model=List[Product])
def get_products():
    return products_db

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    return next(p for p in products_db if p["id"] == product_id)


@app.get("/categories", response_model=List[Category])
def get_categories():
    return categories_db


@app.get("/categories/{category_id}", response_model=Category)
def get_category(category_id: int):
    return next(p for p in categories_db if p["id"] == category_id)