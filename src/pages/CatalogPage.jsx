import React from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const CatalogPage = ({
  // apiproducts,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filteredProducts,
  wishlistItems,
  toggleWishlist,
  addToCart,
  updateQuantity,
  getItemQuantityInCart,
  formatPrice,
}) => (
  <div>
    {/* Search and Filter Bar */}
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">По названию</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
            </select>
          </div>
        </div>
      </div>
    </div>  

    {/* Horizontal Categories */}
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-2">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all whitespace-nowrap transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{selectedCategory}</h2>
          <span className="text-gray-500">{filteredProducts.length} товаров</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlistItems={wishlistItems}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              getItemQuantityInCart={getItemQuantityInCart}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'По вашему запросу ничего не найдено' : 'Товары в этой категории скоро появятся'}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-700"
              >
                Очистить поиск
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CatalogPage;
