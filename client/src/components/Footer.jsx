import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();
  const [isHoveringLang, setIsHoveringLang] = useState(false);
  const languagesList = ['हिन्दी - HI', 'தமிழ் - TA', 'తెలుగు - TE', 'ಕನ್ನಡ - KN', 'മലയാളം - ML', 'বাংলা - BN', 'मराठी - MR'];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-white font-sans mt-auto">
      {/* Top Bar */}
      <div 
        onClick={scrollToTop}
        className="bg-[#37475A] hover:bg-[#485769] h-[50px] flex items-center justify-center cursor-pointer text-[13px] font-medium"
      >
        Back to top
      </div>

      {/* Main Footer - 4 Columns */}
      <div className="bg-[#232F3E] py-10 flex justify-center border-b border-[#3a4553]">
        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-4 gap-[40px] px-4">
          
          <div className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-white text-[16px] mb-1">Get to Know Us</h3>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">About Amazon</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Careers</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Press Releases</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Amazon Science</Link>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-white text-[16px] mb-1">Connect with Us</h3>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Facebook</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Twitter</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Instagram</Link>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-white text-[16px] mb-1">Make Money with Us</h3>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Sell on Amazon</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Sell under Amazon Accelerator</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Protect and Build Your Brand</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Amazon Global Selling</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Supply to Amazon</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Become an Affiliate</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Fulfilment by Amazon</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Advertise Your Products</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Amazon Pay on Merchants</Link>
          </div>

          <div className="flex flex-col gap-[10px]">
            <h3 className="font-bold text-white text-[16px] mb-1">Let Us Help You</h3>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Your Account</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Returns Centre</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Recalls and Product Safety Alerts</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">100% Purchase Protection</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Amazon App Download</Link>
            <Link to="#" className="text-[#DDD] hover:underline text-[13px]">Help</Link>
          </div>

        </div>
      </div>

      {/* Bottom Section - Logo & Language */}
      <div className="bg-[#232F3E] py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[60px]">
        <Link to="/" className="text-3xl font-bold tracking-tighter text-white hover:text-white pb-1">
          amazon
        </Link>
        <div className="flex gap-2">
          {/* Language Selector */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHoveringLang(true)}
            onMouseLeave={() => setIsHoveringLang(false)}
          >
            <div className={`border ${isHoveringLang ? 'border-gray-200' : 'border-gray-400'} rounded-[3px] px-[10px] py-[6px] flex items-center gap-2 cursor-pointer text-[13px] text-[#CCC] hover:text-white h-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <span className="min-w-[45px]">{language === 'EN' ? 'English' : language}</span>
              <div className="flex flex-col ml-1">
                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-mt-1"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            {/* Language Dropdown content */}
            <div 
              className={`absolute bottom-[100%] left-0 w-[240px] bg-white text-gray-900 shadow-md border border-gray-300 p-4 cursor-default text-[13px] ${isHoveringLang ? 'block' : 'hidden'} z-50`}
            >
              {/* Tooltip arrow */}
              <div className="absolute -bottom-[6px] left-[30px] w-3 h-3 bg-white border-b border-r border-gray-300 transform rotate-45 z-[-1]"></div>

              <div className="flex flex-col gap-2 mb-1">
                <div className="text-gray-800 mb-2">Change Language</div>
                <label className="flex items-center gap-2 cursor-pointer hover:text-orange-500 mb-1">
                  <input type="radio" name="footer_lang" checked={language === 'EN'} onChange={() => setLanguage('EN')} className="accent-orange-500 cursor-pointer" />
                  <span>English - EN</span>
                </label>
                <div className="bg-gray-200 h-[1px] my-1 w-full"></div>
                {languagesList.map(lang => {
                  const code = lang.split(' - ')[1];
                  return (
                    <label key={lang} className="flex items-center gap-2 cursor-pointer hover:text-orange-500 mt-1">
                      <input type="radio" name="footer_lang" checked={language === code} onChange={() => setLanguage(code)} className="accent-orange-500 cursor-pointer" />
                      <span>{lang}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border border-gray-400 rounded-[3px] px-[10px] py-[6px] flex items-center gap-2 cursor-pointer text-[13px] text-[#CCC] hover:text-white">
             <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="IN" className="h-[10px] w-4 object-cover" />
             India
          </div>
        </div>
      </div>

      {/* Final Footer */}
      <div className="bg-[#131A22] py-8 px-4 flex flex-col items-center">
        <div className="max-w-[1000px] w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-x-12 mb-8">
          
          <div className="flex flex-col gap-6">
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">AbeBooks</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Books, art<br/>& collectibles</span>
            </Link>
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">Shopbop</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Designer<br/>Fashion Brands</span>
            </Link>
          </div>
          
          <div className="flex flex-col gap-6">
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">Amazon Web Services</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Scalable Cloud<br/>Computing Services</span>
            </Link>
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">Amazon Business</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Everything For<br/>Your Business</span>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">Audible</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Download<br/>Audio Books</span>
            </Link>
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">Amazon Prime Music</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">100 million songs, ad-<br/>free<br/>Over 15 million podcast<br/>episodes</span>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link to="#" className="flex flex-col group">
              <span className="text-[12px] text-[#DDD] group-hover:underline leading-[14px]">IMDb</span>
              <span className="text-[11px] text-[#999] group-hover:underline leading-[14px] mt-[1px]">Movies, TV<br/>& Celebrities</span>
            </Link>
          </div>

        </div>
        
        <div className="flex flex-col items-center gap-1 text-[12px] text-[#DDD]">
          <div className="flex gap-4 sm:gap-6 mb-1">
            <Link to="#" className="hover:underline">Conditions of Use & Sale</Link>
            <Link to="#" className="hover:underline">Privacy Notice</Link>
            <Link to="#" className="hover:underline">Interest-Based Ads</Link>
          </div>
          <span>© 1996-2026, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  );
}
