import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-20 pb-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-lg w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed, thank you!</h1>
        <p className="text-gray-700 mb-6">Confirmation will be sent to your email.</p>
        
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6 text-left shadow-inner">
          <p className="font-bold text-gray-900 mb-1">Order Number:</p>
          <p className="text-lg text-[#007185] font-mono tracking-wider">{id}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium py-2 px-6 rounded-full border border-[#fcd200] transition-colors">
            View Order History
          </Link>
          <Link to="/" className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-full border border-gray-300 transition-colors shadow-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
