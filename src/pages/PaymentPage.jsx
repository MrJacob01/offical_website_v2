import React, { useEffect, useRef } from 'react';
import { ArrowLeft, User, MapPin, CreditCard, Check } from 'lucide-react';

const PaymentPage = ({
  cartItems,
  setCurrentPage,
  orderData,
  setOrderData,
  handleOrderSubmit,
  formatPrice,
  getTotalPrice,
}) => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const placemarkRef = useRef(null);
  const API_KEY = '4707688b-1945-461a-8a40-4d5b3938a9a4';

  useEffect(() => {
    let mounted = true;

    const initMap = () => {
      if (!mounted || !window.ymaps || !containerRef.current) return;

      window.ymaps.ready(() => {
        if (!mounted) return;

        const map = new window.ymaps.Map(containerRef.current, {
          center: [41.2995, 69.2401],
          zoom: 12,
          controls: ['zoomControl'],
        });
        mapRef.current = map;

        // Try to center on user's location (optional)
        try {
          window.ymaps.geolocation.get().then((res) => {
            const geoObj = res.geoObjects.get(0);
            const coords = geoObj && geoObj.geometry && geoObj.geometry.getCoordinates
              ? geoObj.geometry.getCoordinates()
              : null;
            if (coords) map.setCenter(coords, 12);
          }).catch(() => {});
        } catch (e) {}

        // Click handler: place/move placemark, reverse geocode, update state
        map.events.add('click', async (e) => {
          const coords = e.get('coords');
          if (!coords) return;

          // create or move placemark
          if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
          } else {
            placemarkRef.current = new window.ymaps.Placemark(coords, {}, { draggable: false });
            map.geoObjects.add(placemarkRef.current);
          }

          // Reverse geocode to address
          try {
            const res = await window.ymaps.geocode(coords);
            const first = res.geoObjects.get(0);
            const addressLine = first ? first.getAddressLine() : `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`;
            if (mounted) {
              setOrderData(prev => ({
                ...prev,
                address: `${addressLine} (${coords[0].toFixed(6)}, ${coords[1].toFixed(6)})`,
              }));
            }
          } catch {
            if (mounted) {
              setOrderData(prev => ({
                ...prev,
                address: `${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}`,
              }));
            }
          }
        });
      });
    };

    // Load script once and init
    if (!window.__ymaps_script_loaded) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        window.__ymaps_script_loaded = true;
        initMap();
      };
      script.onerror = () => {
        // script failed to load
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      mounted = false;
      try {
        if (mapRef.current && typeof mapRef.current.destroy === 'function') {
          mapRef.current.destroy();
        }
      } catch (_) {}
    };
  }, [setOrderData]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentPage('cart')}
            className="flex items-center text-gray-600 hover:text-blue-600 mr-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Назад к корзине
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Оформление заказа</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleOrderSubmit} className="bg-white rounded-lg shadow-sm p-6">
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Контактная информация
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.firstName}
                      onChange={(e) => setOrderData({...orderData, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.lastName}
                      onChange={(e) => setOrderData({...orderData, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderData.phone}
                      onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+998 xx xxx xx xx"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Адрес доставки
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Отметьте местоположение на карте *
                  </label>
                  <div className="w-full h-64 rounded-lg border border-gray-300 overflow-hidden mb-2">
                    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <input
                    type="text"
                    required
                    readOnly
                    value={orderData.address || ''}
                    placeholder="Кликните на карте, чтобы отметить местоположение"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    tabIndex={-1}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Способ оплаты
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="payment-card"
                      name="payment-method"
                      type="radio"
                      value="card"
                      checked={orderData.paymentMethod === 'card'}
                      onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="payment-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Банковская карта
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="payment-cash"
                      name="payment-method"
                      type="radio"
                      value="cash"
                      checked={orderData.paymentMethod === 'cash'}
                      onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="payment-cash" className="ml-3 block text-sm font-medium text-gray-700">
                      Наличными при получении
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Подтвердить заказ
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Ваш заказ</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartKey} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxOEMxNiAxNi44OTU0IDE2Ljg5NTQgMTYgMTggMTZIMjJDMjMuMTA0NiAxNiAyNCAxNi44OTU0IDI0IDE4VjIwQzI0IDIxLjEwNDYgMjMuMTA0NiAyMiAyMiAyMkgxOEMxNi44OTU0IDIyIDE2IDIxLjEwNDYgMTYgMjBWMThaIiBmaWxsPSIjOUI5Q0E0Ii8+CjxwYXRoIGQ9Ik0xNiAyOCMxNC44OTU0IDI4IDE0IDI4Ljg5NTQgMTQgMzBWMzJDMTQgMzMuMTA0NiAxNC44OTU0IDM0IDE2IDM0SDIwQzIxLjEwNDYgMzQgMjIgMzMuMTA0NiAyMiAzMkMyNiAzMiAzMCAyOCAzMCAyNFMyNiAyMCAyMiAyMEMxOCAyMCAxNiAyNCAxNiAyOFoiIGZpbGw9IiM5QjlDQTQiLz4KPC9zdmc+Cg==';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">{item.name}</h4>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-600">Размер: {item.selectedSize}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">x{item.quantity}</span>
                        <span className="text-sm font-semibold text-blue-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Товары:</span>
                  <span className="text-sm">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Доставка:</span>
                  <span className="text-sm text-green-600">Бесплатно</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Итого:</span>
                    <span className="text-lg font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default PaymentPage;
