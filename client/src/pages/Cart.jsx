import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Cart Items List */}
        <div className="flex-1 bg-white p-6 rounded-sm shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-normal mb-2">Shopping Cart</h1>
          <div className="text-sm text-gray-600 border-b border-gray-300 pb-2 mb-4 text-right">
            Price
          </div>

          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-gray-600">
              <p className="mb-4">Your AmazonClone Cart is empty.</p>
              <Link to="/" className="text-blue-600 hover:text-orange-600 hover:underline">
                Shop today's deals
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 pb-4">
                  {/* Item Image */}
                  <div className="w-full sm:w-48 h-48 flex-shrink-0 flex items-center justify-center p-2">
                    <img 
                      src={item.image || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop"} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 pt-2">
                    <div className="flex justify-between">
                      <Link to={`/product/${item.id}`} className="text-lg font-medium text-gray-900 hover:text-orange-600 hover:underline line-clamp-2 pr-4">
                        {item.name}
                      </Link>
                      <span className="text-lg font-bold text-gray-900 shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-green-700 text-xs mt-1 mb-1">In Stock</p>
                    <p className="text-xs text-gray-600 mb-2">Eligible for FREE Shipping</p>
                    <div className="flex items-center gap-4 mt-4">
                      <select 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1.5 shadow-sm cursor-pointer"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i+1} value={i+1}>Qty: {i+1}</option>
                        ))}
                      </select>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-blue-600 hover:text-orange-600 hover:underline pt-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right pt-2 font-medium text-lg">
                Subtotal ({cartCount} item{cartCount !== 1 && 's'}): <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Sidebar */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-80 h-fit bg-white p-5 rounded-sm shadow-sm pt-6">
            <div className="flex items-center gap-2 mb-4 text-green-700 text-sm">
              <div className="bg-green-700 rounded-full w-4 h-4 text-white flex items-center justify-center text-xs font-bold">✓</div>
              <span>Your order qualifies for FREE Shipping.</span>
            </div>
            
            <div className="text-[19px] mb-4">
              Subtotal ({cartCount} item{cartCount !== 1 && 's'}): <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" id="gift" className="rounded text-blue-500 w-4 h-4 cursor-pointer" />
              <label htmlFor="gift" className="text-sm cursor-pointer">This order contains a gift</label>
            </div>
            
            <Link to="/checkout" className="block w-full">
              <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] rounded-lg py-2 text-sm text-black shadow-sm transition-colors border border-[#fcd200]">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
