import { useState } from 'react';
import Header from './components/common/Header';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import PaymentPage from './pages/PaymentPage';
import UserPage from './pages/UserPage';
import { categories, products as initialProducts } from './data/products';
import { formatPrice, getTotalItems, getTotalPrice } from './utils';
// import getCategories from './services/api'; 

const ClothesUpStore = () => {
  // const apiproducts = getCategories();
  const [selectedCategory, setSelectedCategory] = useState('Комбо');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [notification, setNotification] = useState('');
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  // New state: orders history and saved user info
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState({ firstName: 'Yoqub', lastName: 'Abdulazizov', phone: '+998909219885', address: 'Tashkent, Olmazor, Sadoqat, 8a' });

  // Products data (static for now — not mutated)
  const productsState = initialProducts;

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 2000);
  };


  const addToCart = (product, selectedSize = null) => {
    if (!product.inStock) {
      showNotification('Товар временно недоступен');
      return;
    }

    if (!selectedSize && product.sizes) {
      showNotification('Пожалуйста, выберите размер');
      return;
    }
    
    const cartKey = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const existingItem = cartItems.find(item => item.cartKey === cartKey);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        cartKey, 
        selectedSize, 
        quantity: 1 
      }]);
    }
    // showNotification(`${product.name}${selectedSize ? ` (${selectedSize})` : ''} добавлен в корзину`);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter(item => item.id !== product.id));
      // showNotification('Удалено из избранного');
    } else {
      setWishlistItems([...wishlistItems, product]);
      // showNotification('Добавлено в избранное');
    }
  };

  const updateQuantity = (cartKey, change) => {
    setCartItems(cartItems.map(item => {
      if (item.cartKey === cartKey) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (cartKey) => {
    setCartItems(cartItems.filter(item => item.cartKey !== cartKey));
    // showNotification('Товар удален из корзины');
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    // showNotification('Удалено из избранного');
  };

  // Use editable productsState for catalog filtering
  const getFilteredAndSortedProducts = () => {
    let filtered = [...(productsState[selectedCategory] || [])];
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        (product.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    return filtered;
  };

  const getItemQuantityInCart = (productId, size = null) => {
    const cartKey = size ? `${productId}-${size}` : productId;
    const item = cartItems.find(item => item.cartKey === cartKey);
    return item ? item.quantity : 0;
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    const requiredFields = ['firstName', 'lastName', 'phone', 'address'];
    const allFields = [...requiredFields];
    const missingFields = allFields.filter(field => !orderData[field].trim());

    if (missingFields.length > 0) {
      showNotification('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Build order object and save to history (status included)
    const total = getTotalPrice(cartItems);
    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending',
      customer: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        phone: orderData.phone,
        address: orderData.address
      },
      items: cartItems,
      total
    };
    setOrders(prev => [order, ...prev]);

    // Save basic user info for profile
    setUserInfo({ firstName: orderData.firstName, lastName: orderData.lastName, phone: orderData.phone });

    // Simulate order processing
    showNotification('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    setTimeout(() => {
      setCartItems([]);
      setCurrentPage('catalog');
      setOrderData({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        paymentMethod: 'card',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header
        onPageChange={setCurrentPage}
        cartItemsCount={getTotalItems(cartItems)}
        wishlistCount={wishlistItems.length}
        notification={notification}
      />

      {currentPage === 'catalog' && (
        
        <CatalogPage
          // apiproducts = {apiproducts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filteredProducts={getFilteredAndSortedProducts()}
          wishlistItems={wishlistItems}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          getItemQuantityInCart={getItemQuantityInCart}
          formatPrice={formatPrice}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cartItems={cartItems}
          setCurrentPage={setCurrentPage}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          formatPrice={formatPrice}
          getTotalPrice={() => getTotalPrice(cartItems)}
          getTotalItems={() => getTotalItems(cartItems)}
        />
      )}

      {currentPage === 'wishlist' && (
        <WishlistPage
          wishlistItems={wishlistItems}
          setCurrentPage={setCurrentPage}
          toggleWishlist={toggleWishlist}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
          updateQuantity={updateQuantity}
          getItemQuantityInCart={getItemQuantityInCart}
          formatPrice={formatPrice}
        />
      )}

      {currentPage === 'payment' && (
        <PaymentPage
          cartItems={cartItems}
          setCurrentPage={setCurrentPage}
          orderData={orderData}
          setOrderData={setOrderData}
          handleOrderSubmit={handleOrderSubmit}
          formatPrice={formatPrice}
          getTotalPrice={() => getTotalPrice(cartItems)}
        />
      )}

      {/* New: User page */}
      {currentPage === 'user' && (
        <UserPage
          orders={orders}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setOrders={setOrders}
          setCurrentPage={setCurrentPage}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
};

export default ClothesUpStore;