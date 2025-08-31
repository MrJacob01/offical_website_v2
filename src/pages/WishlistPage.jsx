import React from 'react';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Heart } from 'lucide-react';

const WishlistPage = ({
  wishlistItems,
  setCurrentPage,
  toggleWishlist,
  removeFromWishlist,
  addToCart,
  updateQuantity,
  getItemQuantityInCart,
  formatPrice,
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
        <h2 className="text-2xl font-bold text-gray-800">Избранное</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Ваш список избранного пуст</p>
          <button
            onClick={() => setCurrentPage('catalog')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlistItems={wishlistItems}
              toggleWishlist={toggleWishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              getItemQuantityInCart={getItemQuantityInCart}
              formatPrice={formatPrice}
              showSizeSelector={true}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default WishlistPage;
