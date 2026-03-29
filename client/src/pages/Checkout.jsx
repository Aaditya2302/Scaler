import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

export default function Checkout() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: ''
  });

  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.address && formData.city && formData.state) {
      setStep(2);
    } else {
      alert("Please fill in all address fields.");
    }
  };

  const handlePlaceOrder = () => {
    if (cartCount === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    // Create order object
    const orderData = {
      items: cartItems,
      total: finalTotal,
      tax: tax,
      shippingAddress: formData
    };

    const orderId = addOrder(orderData);
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Side: Forms */}
        <div className="flex-1 space-y-4">
          <h1 className="text-[28px] font-medium text-gray-900 mb-6">Checkout</h1>
          
          {/* Step 1 */}
          <div className={`bg-white p-6 border ${step === 1 ? 'border-orange-500 shadow-md' : 'border-gray-300 shadow-sm'} rounded`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className={step > 1 ? "text-green-600" : ""}>1</span> 
                <span className={step > 1 ? "text-green-600" : ""}>Shipping address</span>
                {step > 1 && <span className="text-green-600 text-sm ml-2">✓</span>}
              </h2>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-[#007185] hover:underline text-sm font-medium">Change</button>
              )}
            </div>
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Full name (First and Last name)</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-gray-400 rounded p-[6px] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm transition-colors" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">Street address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address or P.O. Box" className="w-full border border-gray-400 rounded p-[6px] mb-2 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm transition-colors" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-400 rounded p-[6px] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">State</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-400 rounded p-[6px] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm transition-colors" required />
                  </div>
                </div>
                <button type="submit" className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] rounded-[8px] px-5 py-2 text-[14px] text-black border border-[#fcd200] shadow-sm mt-2 transition-colors">
                  Use this address
                </button>
              </form>
            ) : (
              <div className="text-sm text-gray-800 ml-5 leading-relaxed">
                <p className="font-bold">{formData.fullName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state}</p>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div className={`bg-white p-6 border ${step === 2 ? 'border-orange-500 shadow-md' : 'border-gray-300 shadow-sm'} rounded ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                 <span className={step > 2 ? "text-green-600" : ""}>2</span>
                 <span className={step > 2 ? "text-green-600" : ""}>Payment method</span>
                 {step > 2 && <span className="text-green-600 text-sm ml-2">✓</span>}
              </h2>
              {step > 2 && (
                <button onClick={() => setStep(2)} className="text-[#007185] hover:underline text-sm font-medium">Change</button>
              )}
            </div>
            
            {step === 2 ? (
              <div className="space-y-4 ml-5">
                <div className="border border-[#e77600] bg-[#fdfaf6] p-3 rounded flex items-start gap-3">
                  <input type="radio" checked readOnly className="mt-1 accent-[#e77600]" />
                  <div>
                    <span className="font-bold text-[14px]">Cash on Delivery</span>
                    <p className="text-[13px] text-gray-600">Pay digitally with SMS Pay Link.</p>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] rounded-[8px] px-5 py-2 text-[14px] text-black border border-[#fcd200] shadow-sm transition-colors">
                  Use this payment method
                </button>
              </div>
            ) : step > 2 ? (
              <div className="text-sm text-gray-800 ml-5">
                <p className="font-bold">Pay on Delivery</p>
                <p className="text-gray-600 mt-1">Cash/Pay on Delivery</p>
              </div>
            ) : null}
          </div>

          {/* Step 3 */}
          <div className={`bg-white p-6 border ${step === 3 ? 'border-orange-500 shadow-md' : 'border-gray-300 shadow-sm'} rounded ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-bold mb-4">3 Items and shipping</h2>
            
            {step === 3 && (
              <div className="border border-gray-200 rounded p-4 ml-5 mb-4">
                 <h3 className="font-bold text-green-700 text-[15px] mb-3">Guaranteed delivery: Tomorrow</h3>
                 <p className="text-[13px] text-gray-600 mb-4">If you order in the next 10 hours and 19 minutes</p>
                 
                 <div className="space-y-4">
                   {cartItems.map(item => (
                     <div key={item.id} className="flex gap-4">
                       <img src={item.images ? item.images[0] : item.image} alt={item.title || item.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                       <div>
                         <div className="font-medium text-[#007185] text-[14px] line-clamp-2">{item.title || item.name}</div>
                         <div className="font-bold text-[#b12704] text-[14px]">₹{item.price}</div>
                         <div className="text-[13px] font-medium text-gray-800">Qty: {item.quantity}</div>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-[320px] shrink-0">
          <div className="bg-white border border-gray-300 p-5 rounded sticky top-6 shadow-sm">
            <button 
              onClick={handlePlaceOrder}
              disabled={step < 3 || cartCount === 0}
              className={`w-full rounded-[8px] py-2 text-[14px] font-medium border shadow-sm transition-colors mb-4 ${step < 3 || cartCount === 0 ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] text-black border-[#fcd200]'}`}
            >
              Place your order
            </button>
            <p className="text-[12px] text-gray-600 text-center mb-4 border-b border-gray-200 pb-4 leading-relaxed">
              By placing your order, you agree to Amazon's <span className="text-[#007185] hover:underline cursor-pointer">privacy notice</span> and <span className="text-[#007185] hover:underline cursor-pointer">conditions of use</span>.
            </p>

            <h3 className="font-bold text-[18px] mb-3">Order Summary</h3>
            <div className="text-[14px] space-y-[4px] border-b border-gray-200 pb-3 mb-3 text-gray-800">
              <div className="flex justify-between">
                <span>Items ({cartCount}):</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Promotion Applied:</span>
                <span>-₹0.00</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-[20px] text-[#b12704] mb-4">
              <span>Order Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
            
            <div className="bg-[#f0f2f2] p-3 rounded text-[13px] border border-gray-200">
              <span className="text-[#007185] hover:underline cursor-pointer font-medium">How are delivery costs calculated?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
