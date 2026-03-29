import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-200">
          <div className="flex items-end justify-between border-b border-gray-200 pb-2 mb-6">
            <h1 className="text-[28px] font-medium text-gray-900 leading-none">Your Wish List</h1>
            <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer text-sm hidden sm:block transition-colors">Send list to others</span>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="py-10 text-left pl-4">
              <h2 className="text-[17px] font-medium text-gray-900 mb-1">Your Wish List is empty</h2>
              <p className="text-[14px] text-gray-600 mb-4">Check your Saved for later items below or continue shopping.</p>
              <Link to="/" className="text-[#007185] hover:text-[#c45500] hover:underline text-[14px] transition-colors">Continue shopping</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {wishlistItems.map(item => (
                <div key={item.id} className="flex gap-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="w-[120px] sm:w-[150px] shrink-0 border border-gray-100 p-2 rounded relative">
                    <img src={item.images ? item.images[0] : item.image} alt={item.title || item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <Link to={`/product/${item.id}`} className="text-[16px] sm:text-[18px] text-[#007185] hover:text-[#c45500] hover:underline font-medium line-clamp-2 transition-colors">
                        {item.title || item.name}
                      </Link>
                      <div className="text-[18px] sm:text-[20px] font-bold text-[#b12704] shrink-0">
                        ₹{item.price}
                      </div>
                    </div>
                    
                    <div className="text-[13px] text-[#008a00] mt-1 mb-2 font-medium">In Stock</div>
                    <div className="text-[13px] text-[#565959] mb-4">
                      {item.rating && <span className="font-bold text-[#ffa41c] mr-2">{item.rating} ★</span>}
                      {item.brand || item.category || 'General Product'}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3 items-center text-sm">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] text-black px-4 py-1.5 rounded-full shadow-sm border border-[#fcd200] transition-colors"
                      >
                        Add to Cart
                      </button>
                      <span className="text-gray-300 hidden sm:block">|</span>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-1.5 rounded-[8px] shadow-sm border border-[#d5d9d9] transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
