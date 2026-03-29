import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(order => ({
            id: order.id,
            total: order.totalAmount,
            date: order.createdAt,
            status: order.status,
            shippingAddress: order.shippingAddress ? JSON.parse(order.shippingAddress) : {},
            items: order.orderItems.map(item => ({
              id: item.product.id,
              title: item.product.name,
              price: item.price,
              quantity: item.quantity,
              images: item.product.images
            }))
          }));
          setOrders(mapped);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const addOrder = async (order) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error('Failed to create order');
      const data = await res.json();
      
      const newOrder = {
        ...order,
        id: data.id,
        date: data.createdAt || new Date().toISOString()
      };
      
      setOrders(prev => [newOrder, ...prev]);
      return newOrder.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
