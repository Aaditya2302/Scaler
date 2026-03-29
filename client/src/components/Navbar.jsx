import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Menu, MapPin, ChevronDown, User, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const Sidebar = ({ isOpen, onClose, user }) => {
  return (
    <>
      {/* Dark Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[100] transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[101] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto pb-10`}
      >
        {/* Header */}
        <div className="bg-[#232F3E] text-white flex items-center px-6 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-3 font-bold text-[19px]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 overflow-hidden">
               <User className="w-7 h-7 text-white mt-2" />
            </div>
            Hello, {user?.firstName}
          </div>
        </div>
        
        {/* Close Button positioned outside the sidebar */}
        {isOpen && (
          <button onClick={onClose} className="fixed top-3 left-[310px] text-white z-[101] focus:outline-none cursor-pointer hover:bg-white/10 p-1 rounded">
            <X className="w-8 h-8" />
          </button>
        )}

        <div className="py-2 text-[14px] text-gray-800 font-medium">
          {/* Trending Section */}
          <div className="py-3 border-b border-gray-300">
            <h3 className="font-bold text-[16px] text-black px-6 mb-2">Trending</h3>
            <ul className="flex flex-col">
              {['Best Sellers', 'New Releases', 'Movers and Shakers'].map(item => (
                <li key={item} className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>

          {/* Digital Content */}
          <div className="py-3 border-b border-gray-300">
            <h3 className="font-bold text-[16px] text-black px-6 mb-2 mt-1">Digital Content and Devices</h3>
            <ul className="flex flex-col">
              {['Amazon miniTV- FREE entertainment', 'Echo & Alexa', 'Fire TV', 'Kindle E-Readers & eBooks', 'Audible Audiobooks', 'Amazon Prime Video', 'Amazon Prime Music'].map(item => (
                <li key={item} className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                  {item}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" strokeWidth={1.5} />
                </li>
              ))}
            </ul>
          </div>

          {/* Shop By Category */}
          <div className="py-3 border-b border-gray-300">
            <h3 className="font-bold text-[16px] text-black px-6 mb-2 mt-1">Shop by Category</h3>
            <ul className="flex flex-col">
              {['Mobiles, Computers', 'TV, Appliances, Electronics', 'Men\'s Fashion', 'Women\'s Fashion'].map(item => (
                <li key={item} className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                  {item}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" strokeWidth={1.5} />
                </li>
              ))}
               <li className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer flex items-center gap-2 group">
                 See all <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black mt-1" strokeWidth={1.5} />
               </li>
            </ul>
          </div>

          {/* Programs & Features */}
          <div className="py-3 border-b border-gray-300">
            <h3 className="font-bold text-[16px] text-black px-6 mb-2 mt-1">Programs & Features</h3>
            <ul className="flex flex-col">
               {['Gift Cards & Mobile Recharges', 'Amazon Launchpad', 'Amazon Business'].map(item => (
                <li key={item} className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                  {item}
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" strokeWidth={1.5} />
                </li>
              ))}
               <li className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer flex items-center gap-2 group">
                 See all <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-black mt-1" strokeWidth={1.5} />
               </li>
            </ul>
          </div>

          {/* Help & Settings */}
          <div className="py-3">
            <h3 className="font-bold text-[16px] text-black px-6 mb-2 mt-1">Help & Settings</h3>
            <ul className="flex flex-col">
              {['Your Account', 'Customer Service', 'Sign Out'].map(item => (
                <li key={item} className="px-6 py-[12px] hover:bg-gray-100 cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const RufusSidebar = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e, explicitMessage = null) => {
    if (e) e.preventDefault();
    const textToSend = explicitMessage || inputValue;
    if (!textToSend.trim()) return;
    
    setMessages([...messages, { type: 'user', text: textToSend }]);
    if (!explicitMessage) setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: "I'm a demo AI. I can help you find products, compare features, or track orders. What would you like to explore today?" }]);
    }, 800);
  };

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Rufus Panel */}
      <div 
        className={`fixed top-0 left-0 h-[100vh] w-full sm:w-[350px] bg-white z-[101] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl`}
      >
        {/* Header (Sticky Top) */}
        <div className="flex items-center justify-between px-4 py-3 bg-white z-10 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-1 font-bold text-[18px] text-black tracking-tight">
            Rufus <span className="font-semibold text-[16px] italic bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-400">ai</span>
            <span className="text-[10px] text-gray-400 -ml-1 mt-2.5">beta</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
             <button className="hover:bg-gray-100 p-1.5 rounded-md transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
             </button>
             <button className="hover:bg-gray-100 p-1.5 rounded-md transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/></svg>
             </button>
             <button onClick={onClose} className="hover:bg-gray-100 p-1.5 rounded-md transition-colors ml-1">
               <X className="w-5 h-5 text-gray-700" />
             </button>
          </div>
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4 scrollbar-hide">
           
           {/* Welcome Card */}
           <div className="border border-[#cce6f4] rounded-xl p-4 bg-white shadow-sm mt-1">
             <h3 className="font-bold text-gray-900 text-[15px] mb-1.5">Hi, I'm Rufus!</h3>
             <p className="text-[13px] text-gray-700 leading-relaxed">
               You can ask me all your shopping questions. My answers are powered by AI, so I may not always get things right. <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Learn more about Rufus</span>
             </p>
           </div>

           {messages.length === 0 && (
             <div className="flex flex-col gap-6 mt-2">
               {/* Suggestions */}
               <div>
                 <h4 className="font-bold text-[14px] text-gray-900 mb-2.5">Explore the options</h4>
                 <div className="flex flex-col gap-2 items-start">
                   <button onClick={(e) => handleSend(e, 'Types of smartphones')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Types of smartphones</button>
                   <button onClick={(e) => handleSend(e, 'Noise-cancelling wireless earbuds')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Noise-cancelling wireless earbuds</button>
                   <button onClick={(e) => handleSend(e, 'Smartphone accessories')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Smartphone accessories</button>
                 </div>
               </div>

               <div>
                 <h4 className="font-bold text-[14px] text-gray-900 mb-2.5">Try something new</h4>
                 <div className="flex flex-col gap-2 items-start">
                   <button onClick={(e) => handleSend(e, 'Time-saving cooking appliances')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Time-saving cooking appliances</button>
                   <button onClick={(e) => handleSend(e, 'Must-have products for travelling')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Must-have products for travelling</button>
                   <div className="flex items-center gap-2">
                     <button onClick={(e) => handleSend(e, 'Gym workout gear')} className="bg-[#f0f8fc] hover:bg-[#dceeeb] text-[#007185] text-[13px] px-4 py-2 rounded-full font-medium transition-colors text-left border border-transparent hover:border-[#83d6cb]">Gym workout gear</button>
                     <button className="bg-white border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-50 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg></button>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {messages.length > 0 && (
             <div className="flex flex-col gap-4 mt-2">
               {messages.map((msg, i) => (
                 <div key={i} className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] rounded-[18px] px-4 py-2.5 text-[14px] leading-[1.4] shadow-sm ${msg.type === 'user' ? 'bg-[#f0f8fc] text-[#007185] font-medium border border-transparent selection:bg-[#007185] selection:text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'}`}>
                     {msg.text}
                   </div>
                 </div>
               ))}
               {/* Auto Scroll Anchor */}
               <div ref={messagesEndRef} className="h-[1px]"></div>
             </div>
           )}

        </div>

        {/* Fixed Input Box at Bottom */}
        <div className="p-3 bg-white shrink-0 border-t border-gray-100 relative z-10 shadow-[0_-2px_6px_rgba(0,0,0,0.03)] pb-4">
          <form onSubmit={(e) => handleSend(e)} className="relative flex items-center bg-white border border-gray-300 rounded-[24px] focus-within:border-[#007185] focus-within:ring-1 focus-within:ring-[#007185] transition-all shadow-inner">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Rufus a question" 
              className="w-full bg-transparent py-[10px] pl-[16px] pr-16 text-[14px] outline-none text-gray-800 placeholder:text-gray-500"
            />
            {/* Mic / Send Icon */}
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {!inputValue && (
                <button type="button" className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded-full text-gray-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </button>
              )}
              {inputValue && (
                <button type="submit" className="w-8 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded-full">
                  <svg className="text-[#007185] w-[22px] h-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> 
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
    </>
  );
};

export default function Navbar() {
  const { cartCount } = useCart();
  const { user } = useUser();
  const { t, language, setLanguage } = useLanguage();
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRufusOpen, setIsRufusOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = [
    "All Categories", "Alexa Skills", "Amazon Devices", "Amazon Fashion",
    "Amazon Fresh", "Amazon Pharmacy", "Appliances", "Apps & Games",
    "Audible Audiobooks", "Baby", "Beauty", "Books", "Car & Motorbike",
    "Clothing & Accessories", "Collectibles", "Computers & Accessories",
    "Deals", "Electronics", "Furniture", "Garden & Outdoors"
  ];
  
  return (
    <>
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} />
      
      {/* Rufus Chat Component */}
      <RufusSidebar isOpen={isRufusOpen} onClose={() => setIsRufusOpen(false)} />

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
              <span className="text-[12px] text-gray-300">{t('deliver_to')} {user.firstName}</span>
              <span className="text-[14px] font-bold">{user.city} {user.pinCode}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 hidden sm:flex h-10 rounded-md overflow-hidden bg-white hover:ring-2 ring-orange-400 focus-within:ring-2 border-none">
            <div className="relative flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 text-[12px] px-2 border-r border-gray-300 outline-none shrink-0 cursor-pointer">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-[12px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="whitespace-nowrap z-10 pointer-events-none pr-1">
                {selectedCategory === 'All Categories' ? t('all') : selectedCategory}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500 z-10 pointer-events-none"/>
            </div>
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
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
              <span className="text-[14px] font-bold leading-none flex items-center">{language} <ChevronDown className="w-3 h-3 ml-1 text-gray-400"/></span>
              
              {/* Language Dropdown */}
              <div className="absolute top-[100%] left-0 w-[240px] bg-white text-gray-900 shadow-lg rounded-sm border border-gray-200 hidden group-hover:block p-3 cursor-default text-[13px] hover:block">
                <div className="absolute -top-[5px] left-6 w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45 z-[-1]"></div>
                
                <div className="flex items-center gap-2 mb-2 font-bold select-text">
                  Change Language <span className="text-xs text-[#007185] font-normal hover:text-[#c45500] hover:underline ml-auto cursor-pointer">Learn more</span>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                    <input type="radio" name="lang" checked={language === 'EN'} onChange={() => setLanguage('EN')} className="accent-orange-500 cursor-pointer" />
                    <span>English - EN</span>
                  </label>
                  <div className="bg-gray-200 h-[1px] my-1 w-full"></div>
                  {['हिन्दी - HI', 'தமிழ் - TA', 'తెలుగు - TE', 'ಕನ್ನಡ - KN', 'മലയാളം - ML', 'বাংলা - BN', 'मराठी - MR'].map(lang => {
                    const code = lang.split(' - ')[1];
                    return (
                      <label key={lang} className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                        <input type="radio" name="lang" checked={language === code} onChange={() => setLanguage(code)} className="accent-orange-500 cursor-pointer" />
                        <span>{lang}</span>
                      </label>
                    );
                  })}
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
              <span className="text-[12px]">{t('hello')} {user.firstName}</span>
              <span className="text-[14px] font-bold flex items-center">{t('account_lists')} <ChevronDown className="w-3 h-3 ml-1 text-gray-400"/></span>
              
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
                      <li><Link to="/orders" className="hover:text-orange-600 hover:underline cursor-pointer block">Your Orders</Link></li>
                      <li><Link to="/wishlist" className="hover:text-orange-600 hover:underline cursor-pointer block">Your Wish List</Link></li>
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
            <Link to="/orders" className="hidden md:flex flex-col justify-center leading-tight cursor-pointer border border-transparent hover:border-white px-2 py-1 rounded h-full whitespace-nowrap">
              <span className="text-[12px]">{t('returns')}</span>
              <span className="text-[14px] font-bold">{t('orders')}</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex items-end cursor-pointer border border-transparent hover:border-white px-2 py-1 rounded relative h-full pb-2 shrink-0">
              <div className="relative flex items-center mt-1">
                <ShoppingCart className="w-[36px] h-[36px]" strokeWidth={1.5} />
                <span className="absolute top-[3px] left-[15px] bg-[#f08804] text-black w-5 h-5 flex items-center justify-center rounded-full text-[13px] font-bold leading-none">{cartCount}</span>
              </div>
              <span className="hidden sm:block text-[14px] font-bold mt-auto mb-0.5 ml-1">{t('cart')}</span>
            </Link>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="bg-[#232f3e] px-4 flex items-center overflow-x-auto whitespace-nowrap h-[40px] scrollbar-hide w-full shadow-[0_1px_0_rgba(255,255,255,0.2)]">
          <div onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-1 cursor-pointer border border-transparent hover:border-white px-[12px] py-[8px] rounded font-bold mr-2 text-[14px]">
            <Menu className="w-5 h-5 -ml-1" /> {t('all')}
          </div>
          <div className="flex items-center">
            {/* Rufus Custom Styling */}
            <div onClick={() => setIsRufusOpen(true)} className="cursor-pointer border border-transparent mr-1 hover:border-white rounded-full bg-black text-white px-[10px] py-[3px] gap-[6px] flex items-center shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
              <div className="w-[18px] h-[18px] rounded-full bg-gradient-to-tr from-[#FF9900] via-[#E13228] to-[#146EB4] p-[1.5px] flex items-center justify-center">
                 <div className="w-full h-full bg-black rounded-full mix-blend-multiply flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="w-[6px] h-[6px] rounded-full border-[1px] border-white absolute -left-[1px]"></div>
                      <div className="w-[6px] h-[6px] rounded-full border-[1px] border-white absolute -right-[1px]"></div>
                    </div>
                 </div>
              </div>
              <span className="font-bold text-[13px] tracking-wide">Rufus</span>
            </div>

            {["Fresh", "MX Player", "Sell", "Gift Cards", "Amazon Pay", "Buy Again", "AmazonBasics", "Today's Deals", "Browsing History", "Subscribe & Save", "Audible"].map((item) => (
              <span key={item} className="cursor-pointer border border-transparent hover:border-white px-[12px] py-[8px] rounded text-[13px]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
