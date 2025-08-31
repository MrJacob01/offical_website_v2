import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, X } from 'lucide-react';

const STORAGE_ORDERS = 'tgshop_orders';
const STORAGE_USER = 'tgshop_userInfo';

const UserPage = ({ orders = [], userInfo = {}, setUserInfo, setOrders, setCurrentPage, formatPrice }) => {
  const [edit, setEdit] = useState(false);
  const [local, setLocal] = useState({
    firstName: userInfo.firstName || '',
    lastName: userInfo.lastName || '',
    phone: userInfo.phone || '',
    address: userInfo.address || ''
  });
  const [localOrders, setLocalOrders] = useState(orders || []);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // hydrate from localStorage if App state is empty
  useEffect(() => {
    try {
      const storedOrders = typeof window !== 'undefined' && localStorage.getItem(STORAGE_ORDERS);
      const storedUser = typeof window !== 'undefined' && localStorage.getItem(STORAGE_USER);

      if ((!orders || orders.length === 0) && storedOrders) {
        const parsed = JSON.parse(storedOrders);
        setOrders(parsed);
        setLocalOrders(parsed);
      } else {
        setLocalOrders(orders);
      }

      if ((!userInfo || !userInfo.firstName) && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        setLocal(parsedUser);
      } else {
        setLocal({
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          phone: userInfo.phone || '',
          address: userInfo.address || ''
        });
      }
    } catch (e) {
      // ignore parse errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync orders -> localStorage and App state
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(localOrders));
      }
      setOrders(localOrders);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localOrders]);

  // sync user info -> localStorage and App state
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_USER, JSON.stringify(local));
      }
      setUserInfo(local);
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local]);

  const save = () => {
    setEdit(false);
    // local already synced by effect
  };

  const clearHistory = () => {
    if (typeof window !== 'undefined' && window.confirm('Очистить историю заказов?')) {
      setLocalOrders([]);
    }
  };

  const deleteOrder = (id) => {
    if (typeof window !== 'undefined' && window.confirm('Удалить этот заказ?')) {
      setLocalOrders(prev => prev.filter(o => o.id !== id));
      if (expandedOrderId === id) setExpandedOrderId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => setCurrentPage('catalog')}
            className="flex items-center text-gray-600 hover:text-blue-600 mr-4 transition-colors"
            aria-label="Back to catalog"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Назад к каталогу
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Профиль</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Ваши данные</h3>
          {!edit ? (
            <div className="space-y-2">
              <div>Имя: <strong>{local.firstName || '-'}</strong></div>
              <div>Фамилия: <strong>{local.lastName || '-'}</strong></div>
              <div>Телефон: <strong>{local.phone || '-'}</strong></div>
              <div>Address: <strong>{local.address || '-'}</strong></div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEdit(true)} className="text-blue-600">Редактировать</button>
                <button onClick={() => { setLocal({ firstName: '', lastName: '', phone: '', address:'' }); setUserInfo({ firstName: '', lastName: '', phone: '', address:'' }); }} className="text-sm text-gray-600">Очистить</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input value={local.firstName} onChange={(e) => setLocal({...local, firstName: e.target.value})} placeholder="Имя" className="px-3 py-2 border rounded" />
              <input value={local.lastName} onChange={(e) => setLocal({...local, lastName: e.target.value})} placeholder="Фамилия" className="px-3 py-2 border rounded" />
              <input value={local.phone} onChange={(e) => setLocal({...local, phone: e.target.value})} placeholder="Телефон" className="px-3 py-2 border rounded" />
              <input value={local.address} onChange={(e) => setLocal({...local, address: e.target.value})} placeholder="address" className="px-3 py-2 border rounded" />
              <div className="col-span-full mt-2 flex gap-2">
                <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded">Сохранить</button>
                <button onClick={() => { setEdit(false); setLocal({ firstName: userInfo.firstName || '', lastName: userInfo.lastName || '', phone: userInfo.phone || '', address: userInfo.address || '' }); }} className="px-4 py-2 rounded border">Отмена</button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">История заказов</h3>
            <div className="flex items-center gap-2">
              <button onClick={clearHistory} className="text-sm text-blue-600 flex items-center gap-1">
                <Trash2 className="h-4 w-4" /> Очистить историю
              </button>
              <button onClick={() => { setLocalOrders([]); localStorage.removeItem(STORAGE_ORDERS); }} className="hidden">Reset storage</button>
            </div>
          </div>

          {localOrders.length === 0 ? (
            <div className="text-gray-500">У вас пока нет заказов</div>
          ) : (
            <div className="space-y-4">
              {localOrders.map(order => (
                <div key={order.id} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-sm text-gray-600">Заказ #{order.id}</div>
                      <div className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm px-2 py-1 rounded bg-gray-100">{order.status || 'unknown'}</span>
                      <button onClick={() => deleteOrder(order.id)} className="text-blue-600 text-sm">Удалить</button>
                      <button onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)} className="p-1 text-gray-600 rounded hover:bg-gray-100">
                        {expandedOrderId === order.id ? <X className="h-4 w-4" /> : 'Подробнее'}
                      </button>
                    </div>
                  </div>

                  {expandedOrderId === order.id && (
                    <>
                      <div className="mb-2">
                        <div className="text-sm text-gray-700">Получатель: {order.customer?.firstName} {order.customer?.lastName} — {order.customer?.phone}</div>
                        <div className="text-sm text-gray-600">Адрес: {order.customer?.address || '-'}</div>
                      </div>
                      <div className="mb-2">
                        <ul className="text-sm space-y-1">
                          {order.items.map(it => (
                            <li key={it.cartKey || `${it.id}-${Math.random()}`} className="flex justify-between">
                              <span>{it.name}{it.selectedSize ? ` (${it.selectedSize})` : ''} x{it.quantity}</span>
                              <span className="font-semibold text-blue-600">{formatPrice(it.price * it.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-end text-sm font-semibold">
                        Итого: <span className="ml-2 text-blue-600">{formatPrice(order.total)}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
