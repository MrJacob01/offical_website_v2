export const formatPrice = (price) => price.toLocaleString('uz-UZ') + ' сум';

export const getTotalItems = (cartItems) =>
  cartItems.reduce((total, item) => total + item.quantity, 0);

export const getTotalPrice = (cartItems) =>
  cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

// ...other utility functions as needed...
