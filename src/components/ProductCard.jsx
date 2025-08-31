import React, { useState } from 'react';
import { Heart, X, Minus, Plus } from 'lucide-react';

const ProductCard = ({
  product,
  wishlistItems,
  toggleWishlist,
  removeFromWishlist,
  addToCart,
  updateQuantity,
  getItemQuantityInCart,
  showSizeSelector = false,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const quantityInCart = getItemQuantityInCart(product.id, selectedSize || null);

  return (
    <div className="border border-gray-200 rounded-lg p-4 transition-all transform group">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 relative overflow-hidden group-hover:shadow-lg transition-all">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzEwMCAxMDQuNDc3IDEwNC40NzcgMTAwIDExMCAxMDBIMTMwQzEzNS41MjMgMTAwIDE0MCAxMDQuNDc3IDE0MCAxMTBWMTMwQzE0MCAxMzUuNTIzIDEzNS41MjMgMTQwIDEzMCAxNDBIMTEwQzEwNC40NzcgMTQwIDEwMCAxMzUuNTIzIDEwMCAxMzBWMTEwWiIgZmlsbD0iIzO0NjY2NiIvPgo8cGF0aCBkPSJNMTAwIDE4MEM5NC40NzcxIDE4MCA5MCAxODQuNDc3IDkwIDE5MFYyMTBDOTAgMjE1LjUyMyA5NC40NzcxIDIyMCAxMDAgMjIwSDEyMEMxMjUuNTIzIDIyMCAxMzAgMjE1LjUyMyAxMzAgMjEwQzE1MCAyMTAgMTcwIDE5MCAxNzAgMTYwUzE1MCAxMTAgMTMwIDExMEMxMTAgMTEwIDEwMCAxMzAgMTAwIDE2MFYxODBaIiBmaWxsPSIjOUI5Q0E0Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5Q0E0IiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPtCk0L7RgtC+INC90LUg0L3QsNC50LTQtdC90L48L3RleHQ+Cjwvc3ZnPgo=';
          }}
        />
        {!showSizeSelector && (
          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all backdrop-blur-sm ${
              wishlistItems.some(item => item.id === product.id)
                ? 'bg-blue-100/80 text-red-600'
                : 'bg-white/80 text-gray-400 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${wishlistItems.some(item => item.id === product.id) ? 'fill-current' : ''}`} />
          </button>
        )}
        {showSizeSelector && (
          <button
            onClick={() => removeFromWishlist(product.id)}
            className="absolute top-2 right-2 p-2 rounded-full transition-all backdrop-blur-sm bg-blue-100/80 text-blue-600 hover:bg-blue-200/80"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Недоступен
            </span>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
      {product.description && (
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
      )}
      
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">Размер:</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 text-sm border rounded transition-colors ${
                  selectedSize === size
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          product.inStock 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-blue-800'
        }`}>
          {product.inStock ? 'В наличии' : 'Нет в наличии'}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">{product.price && product.price.toLocaleString('uz-UZ') + ' сум'}</span>
        {quantityInCart > 0 ? (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => updateQuantity(selectedSize ? `${product.id}-${selectedSize}` : product.id, -1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-semibold min-w-[2rem] text-center">{quantityInCart}</span>
            <button 
              onClick={() => updateQuantity(selectedSize ? `${product.id}-${selectedSize}` : product.id, 1)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(product, selectedSize)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
              product.inStock
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Добавить' : 'Недоступен'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
