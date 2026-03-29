import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch initial cart state from backend
    const fetchCart = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`);
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(item => ({
            ...(item.product || {}),
            id: item.productId || item.product?.id,
            quantity: item.quantity,
            cartItemId: item.id
          }));
          setCartItems(mapped);
        }
      } catch (err) {
        console.error("Error fetching cart from backend:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => String(item.id) === String(product.id));
      if (existing) {
        return prev.map(item => 
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + parseInt(quantity) } 
            : item
        );
      }
      return [...prev, { ...product, quantity: parseInt(quantity) }];
    });

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: String(product.id), quantity: parseInt(quantity) })
      });
    } catch (e) { console.error('Cart sync failed', e); }
  };

  const removeFromCart = async (id) => {
    setCartItems(prev => prev.filter(item => String(item.id) !== String(id)));
    fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, { method: 'DELETE' }).catch(console.error);
  };

  const updateQuantity = async (id, quantity) => {
    const parsedQty = parseInt(quantity);
    if (parsedQty <= 0) return removeFromCart(id);
    
    setCartItems(prev => prev.map(item => 
      String(item.id) === String(id) ? { ...item, quantity: parsedQty } : item
    ));
    
    fetch(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parsedQty })
    }).catch(console.error);
  };

  const clearCart = async () => {
    setCartItems([]);
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, { method: 'DELETE' }).catch(console.error);
  };

  const cartTotal = cartItems.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
