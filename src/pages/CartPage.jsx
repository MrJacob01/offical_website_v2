import React from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';

const CartPage = ({
  cartItems,
  setCurrentPage,
  updateQuantity,
  removeFromCart,
  formatPrice,
  getTotalPrice,
  getTotalItems,
}) => (
  <div className="container mx-auto px-4 py-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => setCurrentPage('catalog')}
          className="flex items-center text-gray-600 hover:text-blue-600 mr-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Назад к каталогу
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Корзина</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
          <button 
            onClick={() => setCurrentPage('catalog')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.cartKey} className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNEMyMCAyMi44OTU0IDIwLjg5NTQgMjIgMjIgMjJIMjZDMjcuMTA0NiAyMiAyOCAyMi44OTU0IDI4IDI0VjI2QzI4IDI3LjEwNDYgMjcuMTA0NiAyOCAyNiAyOEgyMkMyMC44OTU0IDI4IDIwIDI3LjEwNDYgMjAgMjZWMThaIiBmaWxsPSIjOUI5Q0E0Ii8+CjxwYXRoIGQ9Ik0yMCAzNkMxOC44OTU0IDM2IDE4IDM2Ljg5NTQgMTggMzhWNDBDMTggNDEuMTA0NiAxOC44OTU0IDQyIDIwIDQySDI0QzI1LjEwNDYgNDIgMjYgNDEuMTA0NiAyNiA0MEMzMCA0MCAzNCAzNiAzNCAzMlMzMCAyNCAyNiAyNEMyMiAyNCAyMCAyOCAyMCAzMlYzNloiIGZpbGw9IiM5QjlDQTQiLz4KPC9zdmc+Cg==';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.selectedSize && (
                      <p className="text-sm text-blue-600">Размер: {item.selectedSize}</p>
                    )}
                    <p className="text-blue-600 font-semibold">{formatPrice(item.price)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.cartKey, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.cartKey, 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.cartKey)}
                    className="text-blue-600 hover:text-blue-700 p-1 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Итого:</span>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
              <span>Количество товаров:</span>
              <span>{getTotalItems()} шт.</span>
            </div>
            <button 
              onClick={() => setCurrentPage('payment')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all transform hover:scale-105"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CartPage;
