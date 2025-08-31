from pydantic import BaseModel
from typing import Optional
  

class ImageBase(BaseModel):
    name: str
    image_url: str  
    product_id: int

class ImageCreate(ImageBase):
    pass

class Image(ImageBase):
    pass

    # class Config:
    #     orm_mode = True
