import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    // Generate a robust tracking order ID
    const newOrder = {
      ...order,
      id: `ORDER-${Math.floor(100000 + Math.random() * 900000)}-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString()
    };
    
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
