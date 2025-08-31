import React from 'react';
import { ShoppingCart, Phone, Clock, Heart, User } from 'lucide-react';

/**
 * Header component with navigation and cart/wishlist counters
 * @param {Object} props - Component props
 * @param {Function} props.onPageChange - Page change handler
 * @param {number} props.cartItemsCount - Total items in cart
 * @param {number} props.wishlistCount - Total items in wishlist
 * @returns {JSX.Element} Header component
 */
const Header = ({ 
  onPageChange, 
  cartItemsCount = 0, 
  wishlistCount = 0, 
  notification = null
}) => {
  return (
    <div className="relative">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              className="text-2xl font-bold bg-blue-500 bg-clip-text text-transparent cursor-pointer transition-transform"
              onClick={() => onPageChange ? onPageChange('catalog') : null}
            >
              OnlineShop
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex flex-col text-right">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1" />
                +998 71 200 22 11
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Ежедневно с 09:00 до 22:00
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onPageChange ? onPageChange('wishlist') : null}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => onPageChange ? onPageChange('user') : null}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="User profile"
              >
                <User className="h-5 w-5" />
              </button>

              <button 
                onClick={() => onPageChange ? onPageChange('cart') : null}
                className="relative p-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;