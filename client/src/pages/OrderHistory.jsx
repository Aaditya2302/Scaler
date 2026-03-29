import React from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

export default function OrderHistory() {
  const { orders } = useOrder();

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-medium text-gray-900">Your Orders</h1>
          <div className="hidden sm:flex items-center gap-4 text-sm mt-2">
             <div className="font-bold border-b-2 border-[#e77600] text-gray-900 pb-1">Orders</div>
             <div className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer pb-1 transition-colors">Buy Again</div>
             <div className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer pb-1 transition-colors">Not Yet Shipped</div>
             <div className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer pb-1 transition-colors">Cancelled Orders</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white py-12 px-8 rounded border border-gray-300 shadow-sm text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-3">Looks like you haven't placed any orders yet</h2>
            <Link to="/" className="text-[#007185] hover:text-[#c45500] hover:underline text-lg transition-colors">Start shopping today</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm">
                <div className="bg-[#f0f2f2] border-b border-gray-300 p-4 text-sm text-[#565959] flex flex-col sm:flex-row justify-between flex-wrap gap-4">
                  <div className="flex gap-8 md:gap-14">
                    <div className="flex flex-col">
                      <span className="uppercase text-xs font-medium">Order Placed</span>
                      <span className="text-gray-800">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase text-xs font-medium">Total</span>
                      <span className="text-gray-800">₹{order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase text-xs font-medium">Ship To</span>
                      <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer transition-colors">{order.shippingAddress.fullName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end">
                    <span className="uppercase text-xs font-medium mb-0.5">Order # {order.id}</span>
                    <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer transition-colors">View order details</span>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-lg mb-4 text-[#008a00]">Preparing for Shipment</h3>
                  <div className="flex flex-col gap-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                        <img src={item.images ? item.images[0] : item.image} alt={item.title || item.name} className="w-20 h-20 object-contain mix-blend-multiply" />
                        <div className="flex-1">
                          <Link to={`/product/${item.id}`} className="text-[#007185] hover:text-[#c45500] hover:underline font-medium text-[15px] line-clamp-2 mb-1 transition-colors">
                            {item.title || item.name}
                          </Link>
                          <div className="text-[12px] text-gray-500 mb-1">Return window closed on {new Date(new Date(order.date).getTime() + 30*24*60*60*1000).toLocaleDateString()}</div>
                          <div className="text-[13px] font-bold text-gray-900 mb-2">Qty: {item.quantity}</div>
                          <div className="flex flex-wrap gap-3 mt-3 text-sm">
                            <button className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] text-black border border-transparent hover:shadow-sm rounded-full px-4 py-1.5 transition-colors">Buy it again</button>
                            <button className="bg-white hover:bg-gray-50 text-gray-800 border border-[#d5d9d9] hover:shadow-sm rounded-full px-4 py-1.5 transition-colors">View your item</button>
                          </div>
                        </div>
                        <div className="hidden sm:block w-[200px] shrink-0">
                           <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-[#d5d9d9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-3 py-1.5 text-[13px] mb-2 text-center whitespace-nowrap transition-colors">Leave seller feedback</button>
                           <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-[#d5d9d9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[8px] px-3 py-1.5 text-[13px] text-center whitespace-nowrap transition-colors">Write a product review</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
