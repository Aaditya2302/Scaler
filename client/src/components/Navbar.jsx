import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user } = useUser();
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  
  return (
    <>
      {/* Background Overlay */}
      {isHoveringMenu && (
        <div className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 pointer-events-none"></div>
      )}

      {/* Header Elevated Above Overlay */}
      <header className="flex flex-col text-white w-full text-[14px] z-50 relative">
        {/* Top Nav */}
        <div className="bg-[#131921] px-4 flex items-center justify-between gap-4 h-[60px]">
          {/* Logo */}
          <div className="flex items-center gap-1 cursor-pointer border border-transparent hover:border-white p-1 rounded h-12">
            <Link to="/" className="text-2xl font-bold tracking-tighter mt-1 flex items-start text-white hover:text-white">
              amazon.in
            </Link>
          </div>

          {/* Deliver to */}
          <div className="hidden md:flex items-center cursor-pointer border border-transparent hover:border-white p-1 rounded h-12">
            <MapPin className="w-4 h-4 mt-3 text-white shrink-0" />
            <div className="flex flex-col leading-tight ml-1 whitespace-nowrap">
              <span className="text-[12px] text-gray-300">Deliver to {user.firstName}</span>
              <span className="text-[14px] font-bold">{user.city} {user.pinCode}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden sm:flex h-10 rounded-md overflow-hidden bg-white hover:ring-2 ring-orange-400 focus-within:ring-2 border-none">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[12px] px-2 border-r border-gray-300 flex items-center justify-center outline-none shrink-0 whitespace-nowrap">
              All <ChevronDown className="w-3 h-3 ml-1 text-gray-500"/>
            </button>
            <input 
              type="text" 
              placeholder="Search Amazon.in" 
              className="flex-1 px-3 text-black outline-none text-[15px] placeholder-gray-500"
            />
            <button className="bg-[#febd69] hover:bg-[#f3a847] w-12 flex items-center justify-center text-gray-900 cursor-pointer shrink-0">
              <Search className="w-5 h-5 font-bold" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 h-full py-2 relative">
            
            {/* Language / Country */}
            <div 
              className="group hidden lg:flex items-end gap-1 cursor-pointer border border-transparent hover:border-white p-2 rounded h-full pb-3 z-50 relative"
              onMouseEnter={() => setIsHoveringMenu(true)}
              onMouseLeave={() => setIsHoveringMenu(false)}
            >
              <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="IN" className="h-[14px] w-5 object-cover" />
              <span className="text-[14px] font-bold leading-none flex items-center">EN <ChevronDown className="w-3 h-3 ml-1 text-gray-400"/></span>
              
              {/* Language Dropdown */}
              <div className="absolute top-[100%] left-0 w-[240px] bg-white text-gray-900 shadow-lg rounded-sm border border-gray-200 hidden group-hover:block p-3 cursor-default text-[13px] hover:block">
                <div className="absolute -top-[5px] left-6 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45 z-[-1]"></div>
                
                <div className="flex items-center gap-2 mb-2 font-bold select-text">
                  Change Language <span className="text-xs text-[#007185] font-normal hover:text-[#c45500] hover:underline ml-auto cursor-pointer">Learn more</span>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                    <input type="radio" name="lang" defaultChecked className="accent-orange-500 cursor-pointer" />
                    <span>English - EN</span>
                  </label>
                  <div className="bg-gray-200 h-[1px] my-1 w-full"></div>
                  {['हिन्दी - HI', 'தமிழ் - TA', 'తెలుగు - TE', 'ಕನ್ನಡ - KN', 'മലയാളം - ML', 'বাংলা - BN', 'मराठी - MR'].map(lang => (
                    <label key={lang} className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                      <input type="radio" name="lang" className="accent-orange-500 cursor-pointer" />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
                <div className="bg-gray-200 h-[1px] my-2 w-full"></div>
                <div className="flex items-center gap-2 mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" className="w-[18px] h-[12px] object-cover" alt="India flag" />
                  <span className="text-gray-600">You are shopping on Amazon.in</span>
                </div>
                <div className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Change country/region.</div>
              </div>
            </div>

            {/* Account */}
            <div 
              className="group hidden md:flex flex-col justify-center leading-tight cursor-pointer border border-transparent hover:border-white px-2 py-1 rounded h-full whitespace-nowrap z-50 relative"
              onMouseEnter={() => setIsHoveringMenu(true)}
              onMouseLeave={() => setIsHoveringMenu(false)}
            >
              <span className="text-[12px]">Hello, {user.firstName}</span>
              <span className="text-[14px] font-bold flex items-center">Account & Lists <ChevronDown className="w-3 h-3 ml-1 text-gray-400"/></span>
              
              {/* Account Dropdown */}
              <div className="absolute top-[100%] right-[-50px] w-[450px] bg-white text-gray-900 shadow-lg rounded-sm border border-gray-200 hidden group-hover:block p-4 mt-0 cursor-default hover:block">
                <div className="absolute -top-[5px] right-[75px] w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45 z-[-1]"></div>
                
                <div className="bg-blue-50/50 -mx-4 -mt-4 p-3 px-4 border-b border-gray-100 flex justify-between items-center mb-4">
                  <span className="text-gray-700 text-[13px]">Who is shopping? Select a profile.</span>
                  <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer text-[13px]">Manage Profiles ›</span>
                </div>

                <div className="flex gap-6 text-left">
                  <div className="w-[45%] border-r border-gray-200 pr-5">
                    <h3 className="font-bold text-[16px] mb-2">Your Lists</h3>
                    <ul className="text-[13px] text-gray-600 space-y-[6px]">
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Shopping List</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Create a Wish List</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Wish from Any Website</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Baby Wishlist</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Discover Your Style</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Explore Showroom</li>
                    </ul>
                  </div>

                  <div className="w-[55%]">
                    <h3 className="font-bold text-[16px] mb-2">Your Account</h3>
                    <ul className="text-[13px] text-gray-600 space-y-[6px]">
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Switch Accounts</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Sign Out</li>
                      <div className="h-[1px] bg-gray-200 my-1 -ml-1 mr-4"></div>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Account</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Orders</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Wish List</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Keep shopping for</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Recommendations</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Returns</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Recalls and Product Safety Alerts</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Prime Membership</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Prime Video</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Subscribe & Save Items</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Memberships & Subscriptions</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Your Seller Account</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Content Library</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Devices</li>
                      <li className="hover:text-orange-600 hover:underline cursor-pointer">Register for a free Business Account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Returns & Orders */}
            <div className="hidden md:flex flex-col justify-center leading-tight cursor-pointer border border-transparent hover:border-white px-2 py-1 rounded h-full whitespace-nowrap">
              <span className="text-[12px]">Returns</span>
              <span className="text-[14px] font-bold">& Orders</span>
            </div>

            {/* Cart */}
            <Link to="/cart" className="flex items-end cursor-pointer border border-transparent hover:border-white px-2 py-1 rounded relative h-full pb-2 shrink-0">
              <div className="relative flex items-end">
                <ShoppingCart className="w-9 h-9" />
                <span className="absolute -top-1 left-[16px] text-[#f08804] text-[16px] font-bold w-full text-center">{cartCount}</span>
              </div>
              <span className="hidden sm:block text-[14px] font-bold mt-auto mb-0.5 ml-1">Cart</span>
            </Link>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="bg-[#232f3e] px-4 flex items-center text-[14px] gap-4 overflow-x-auto whitespace-nowrap h-[39px] scrollbar-hide">
          <div className="flex items-center gap-1 cursor-pointer border border-transparent hover:border-white p-1 rounded font-bold">
            <Menu className="w-5 h-5 -ml-1" /> All
          </div>
          <div className="flex items-center gap-3">
            {["Rufus", "Fresh", "MX Player", "Sell", "Gift Cards", "Amazon Pay", "Buy Again", "AmazonBasics", "Today's Deals", "Browsing History", "Subscribe & Save", "Audible"].map((item) => (
              <span key={item} className="cursor-pointer border border-transparent hover:border-white p-1 rounded text-[14px]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
