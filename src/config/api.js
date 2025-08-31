// Configuration for API endpoints used by src/services/api.js

export const API_CONFIG = {
  // Set REACT_APP_API_URL in your .env to override (e.g. "https://api.example.com")
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
};

export const ENDPOINTS = {
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USER: '/user',
};

// Optional helper if you want to build full URLs easily:
// export const url = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;