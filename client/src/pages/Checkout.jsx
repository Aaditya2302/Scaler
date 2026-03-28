import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems, cartTotal, cartCount } = useCart();
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + tax;

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side: Forms */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Checkout</h1>
          
          <div className="bg-white p-6 border border-gray-300 shadow-sm rounded">
            <h2 className="text-lg font-bold mb-4">1. Shipping address</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name (First and Last name)</label>
                <input type="text" className="w-full border border-gray-400 rounded p-1.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street address</label>
                <input type="text" placeholder="Street address or P.O. Box" className="w-full border border-gray-400 rounded p-1.5 mb-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full border border-gray-400 rounded p-1.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" className="w-full border border-gray-400 rounded p-1.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
              </div>
              <button type="button" className="bg-[#ffd814] hover:bg-[#f7ca00] rounded-lg px-4 py-2 text-sm text-black border border-[#fcd200]">
                Use this address
              </button>
            </form>
          </div>

          <div className="bg-white p-6 border border-gray-300 shadow-sm rounded opacity-50 pointer-events-none">
            <h2 className="text-lg font-bold">2. Payment method</h2>
          </div>

          <div className="bg-white p-6 border border-gray-300 shadow-sm rounded opacity-50 pointer-events-none">
            <h2 className="text-lg font-bold">3. Items and shipping</h2>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-80">
          <div className="bg-white border border-gray-300 p-5 rounded sticky top-6 shadow-sm">
            <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] rounded-lg py-2.5 text-sm text-black border border-[#fcd200] font-medium mb-4">
              Place your order
            </button>
            <p className="text-xs text-gray-600 text-center mb-4 border-b border-gray-200 pb-4">
              By placing your order, you agree to AmazonClone's privacy notice and conditions of use.
            </p>

            <h3 className="font-bold text-lg mb-3">Order Summary</h3>
            <div className="text-sm space-y-1 border-b border-gray-200 pb-3 mb-3">
              <div className="flex justify-between">
                <span>Items ({cartCount}):</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax to be collected:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl text-red-700">
              <span>Order total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
