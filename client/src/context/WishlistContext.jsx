import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`);
        if (res.ok) {
          const data = await res.json();
          const mapped = data.map(item => ({
            ...(item.product || {}),
            id: item.productId,
            wishlistItemId: item.id
          }));
          setWishlistItems(mapped);
        }
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    // Optimistic UI update
    setWishlistItems(prev => {
      const existing = prev.find(item => String(item.id) === String(product.id));
      if (existing) return prev;
      return [...prev, product];
    });

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: String(product.id) })
      });
    } catch (e) {
      console.error('Wishlist sync failed', e);
    }
  };

  const removeFromWishlist = async (id) => {
    setWishlistItems(prev => prev.filter(item => String(item.id) !== String(id)));
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Wishlist removal failed', e);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
