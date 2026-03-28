import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DUMMY_PRODUCT = {
  id: 1,
  name: "Wireless Earbuds with Active Noise Cancelling, Bluetooth 5.3, 40H Playtime, Built-in Mic, Deep Bass",
  price: 99.99,
  images: [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    "https://images.unsplash.com/photo-1572569433114-1fca7622955f", 
    "https://images.unsplash.com/photo-1606220838315-056192153282",
  ],
  category: "Electronics",
  rating: 4.5,
  count: 1200,
  description: "Experience premium sound quality with these active noise-cancelling wireless earbuds. Featuring Bluetooth 5.3 for seamless connectivity and up to 40 hours of playtime with the included charging case.",
  specs: [
    { label: "Brand", value: "AudioTech" },
    { label: "Color", value: "Matte Black" },
    { label: "Form Factor", value: "In Ear" },
    { label: "Connectivity", value: "Bluetooth" },
  ],
  stock: 15,
};

export default function ProductDetail() {
  const { id } = useParams(); // Using dummy data for now
  const [mainImg, setMainImg] = useState(DUMMY_PRODUCT.images[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="bg-white min-h-screen p-4 sm:p-6 max-w-[1500px] mx-auto">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to results
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 md:w-[40%]">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-visible py-2 sm:py-0">
            {DUMMY_PRODUCT.images.map((img, idx) => (
              <img 
                key={idx} 
                src={`${img}?w=100&h=100&fit=crop`} 
                alt="thumbnail" 
                className={`w-12 h-12 md:w-16 md:h-16 object-cover border-2 rounded cursor-pointer transition-colors ${mainImg === img ? 'border-orange-500 shadow-sm' : 'border-transparent hover:border-gray-300'}`}
                onMouseEnter={() => setMainImg(img)}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 flex justify-center items-start bg-gray-50 rounded p-4 h-[300px] sm:h-[400px] md:h-[500px]">
            <img src={`${mainImg}?w=600&h=600&fit=crop`} alt={DUMMY_PRODUCT.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
          </div>
        </div>
        
        {/* Middle Column - Details */}
        <div className="flex-1 md:w-[40%] border-t pt-6 md:border-t-0 md:pt-0">
          <h1 className="text-xl sm:text-2xl font-medium leading-normal mb-2 text-gray-900">{DUMMY_PRODUCT.name}</h1>
          
          <div className="flex items-center text-sm mb-4 pb-4 border-b border-gray-200">
            <div className="flex text-yellow-500 mr-2 items-center">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">{DUMMY_PRODUCT.count} ratings</span>
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-medium px-1 text-gray-900">${Math.floor(DUMMY_PRODUCT.price)}</span>
            <span className="text-sm font-medium align-top text-gray-900">.{Math.round((DUMMY_PRODUCT.price % 1) * 100).toString().padStart(2, '0')}</span>
          </div>

          <table className="text-sm w-full mb-6">
            <tbody>
              {DUMMY_PRODUCT.specs.map((spec, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0">
                  <td className="w-32 py-2 font-bold text-gray-800">{spec.label}</td>
                  <td className="py-2 text-gray-600">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-bold text-base mb-2 text-gray-900">About this item</h3>
            <p className="text-sm text-gray-800 leading-relaxed">{DUMMY_PRODUCT.description}</p>
          </div>
        </div>
        
        {/* Right Column - Buy Box */}
        <div className="w-full md:w-[20%] border border-gray-200 rounded-lg p-5 h-fit shadow-sm">
          <div className="text-2xl font-medium mb-4 text-gray-900">${DUMMY_PRODUCT.price}</div>
          
          <div className="text-sm text-gray-600 mb-4 leading-snug">
            <span className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">FREE Returns</span><br/>
            <span className="font-medium text-gray-900">FREE delivery</span> Tuesday, April 2. Order within 12 hrs 30 mins
          </div>
          
          <div className="flex items-start text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer mb-4">
            <MapPin className="w-4 h-4 mr-1 text-gray-700 mt-0.5 shrink-0" /> Deliver to User - City
          </div>
          
          <div className="text-[17px] font-medium text-green-700 mb-4">
            {DUMMY_PRODUCT.stock > 0 ? "In Stock." : "Out of Stock."}
          </div>
          
          <div className="mb-5">
            <select 
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-gray-100 hover:bg-gray-200 cursor-pointer w-24 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(5)].map((_, i) => (
                <option key={i+1} value={i+1}>Qty: {i+1}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => addToCart(DUMMY_PRODUCT, qty)}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] rounded-full py-2.5 text-sm text-black shadow-sm mb-2.5 transition-colors border border-[#fcd200]"
          >
            Add to Cart
          </button>
          <Link to="/cart">
            <button 
              onClick={() => addToCart(DUMMY_PRODUCT, qty)}
              className="w-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#f28000] rounded-full py-2.5 text-sm text-black shadow-sm mb-5 transition-colors border border-[#ff8f00]"
            >
              Buy Now
            </button>
          </Link>
          
          <div className="flex items-start text-[13px] text-blue-600 hover:text-orange-600 hover:underline cursor-pointer gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Secure transaction</span>
          </div>
        </div>
      </div>
    </div>
  )
}
