import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';

const DUMMY_PRODUCTS = [
  { id: 1, name: "Wireless Earbuds with Active Noise Cancelling", price: 99.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop", category: "Electronics", rating: 4.5, count: 1200 },
  { id: 2, name: "Smart TV 55 Inch 4K UHD", price: 499.99, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop", category: "Electronics", rating: 4.8, count: 853 },
  { id: 3, name: "Programmable Coffee Maker with Glass Carafe", price: 59.99, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop", category: "Home", rating: 4.2, count: 420 },
  { id: 4, name: "Men's Everyday Running Shoes", price: 79.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", category: "Sports", rating: 4.6, count: 2150 },
  { id: 5, name: "Non-Stick Cookware Set, 12-Piece", price: 129.50, image: "https://images.unsplash.com/photo-1584990347449-a6e812f8e136?w=400&h=400&fit=crop", category: "Home", rating: 4.7, count: 934 },
  { id: 6, name: "Professional DSLR Camera with Kit Lens", price: 899.00, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop", category: "Electronics", rating: 4.9, count: 154 },
  { id: 7, name: "Yoga Mat with Alignment Lines", price: 29.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", category: "Sports", rating: 4.3, count: 830 },
  { id: 8, name: "Electric Toothbrush with Extra Brush Heads", price: 45.00, image: "https://images.unsplash.com/photo-1559544978-654dbbd3c3ed?w=400&h=400&fit=crop", category: "Health", rating: 4.8, count: 3200 },
];

const CAROUSEL_IMAGES = [
  banner1,
  banner2,
  banner3,
  banner4
];

export default function Home() {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const length = CAROUSEL_IMAGES.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentSlide((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentSlide >= length + 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide <= 0) {
      setIsTransitioning(false);
      setCurrentSlide(length);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const slides = [CAROUSEL_IMAGES[length - 1], ...CAROUSEL_IMAGES, CAROUSEL_IMAGES[0]];

  return (
    <div className="bg-[#e3e6e6] min-h-screen pb-10 font-sans">
      <div className="relative max-w-[1500px] mx-auto">
        
        {/* Banner Carousel */}
        <div 
          className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden bg-gray-200 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fading mask at the bottom to blend into gray background */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#e3e6e6] to-transparent z-10 pointer-events-none"></div>
          
          <div 
            className={`flex h-full w-full ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`} 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((img, idx) => (
              <img key={idx} src={img} alt={`slide-${idx}`} className="w-full h-full object-cover flex-shrink-0 [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)] object-top" />
            ))}
          </div>

          {/* Banner Controls */}
          <div onClick={prevSlide} className="absolute top-[10%] sm:top-[15%] md:top-[20%] left-4 w-10 sm:w-12 h-16 sm:h-20 md:h-24 bg-white/80 hover:bg-white shadow-lg cursor-pointer flex items-center justify-center z-20 rounded shadow-gray-500/50 transition-colors opacity-0 group-hover:opacity-100 duration-300">
             <ChevronLeft className="w-8 h-8 text-black" />
          </div>
          <div onClick={nextSlide} className="absolute top-[10%] sm:top-[15%] md:top-[20%] right-4 w-10 sm:w-12 h-16 sm:h-20 md:h-24 bg-white/80 hover:bg-white shadow-lg cursor-pointer flex items-center justify-center z-20 rounded shadow-gray-500/50 transition-colors opacity-0 group-hover:opacity-100 duration-300">
             <ChevronRight className="w-8 h-8 text-black" />
          </div>
        </div>

        {/* Quadrant Cards */}
        <div className="relative z-20 -mt-36 sm:-mt-64 md:-mt-[340px] px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('deals_saved')}</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <Link to="/product/1" className="cursor-pointer text-center">
                <img src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150&h=150&fit=crop" className="h-[120px] w-full object-contain mb-1" alt="Table" />
              </Link>
              <Link to="/product/2" className="cursor-pointer text-center">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop" className="h-[120px] w-full object-contain mb-1" alt="Hoodie" />
              </Link>
              <Link to="/product/3" className="cursor-pointer text-center">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800847?w=150&h=150&fit=crop" className="h-[120px] w-full object-contain mb-1" alt="Half Zip" />
              </Link>
              <Link to="/product/4" className="cursor-pointer text-center">
                <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&h=150&fit=crop" className="h-[120px] w-full object-contain mb-1" alt="Jacket" />
              </Link>
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('see_more')}</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('revamp_home')}</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              <Link to="/product/revamp-1" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1584100936595-c0654b35e263?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Cushions" />
                <span className="text-[12px] leading-tight text-gray-800">Cushion covers, bedsheets & more</span>
              </Link>
              <Link to="/product/revamp-2" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1507652313656-b72e5008dd52?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Figurines" />
                <span className="text-[12px] leading-tight text-gray-800">Figurines, vases & more</span>
              </Link>
              <Link to="/product/revamp-3" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Storage" />
                <span className="text-[12px] leading-tight text-gray-800">Home storage</span>
              </Link>
              <Link to="/product/revamp-4" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1507149833261-aa7a8f154bea?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Lighting" />
                <span className="text-[12px] leading-tight text-gray-800">Lighting solutions</span>
              </Link>
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('explore_all')}</Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('up_to_60')}</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              <Link to="/product/shoes-1" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Shoes" />
                <span className="text-[12px] leading-tight text-gray-800">Sports shoes</span>
              </Link>
              <Link to="/product/shoes-2" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d40?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Men shoes" />
                <span className="text-[12px] leading-tight text-gray-800">Men's shoes</span>
              </Link>
              <Link to="/product/shoes-3" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Heels" />
                <span className="text-[12px] leading-tight text-gray-800">Women's shoes</span>
              </Link>
              <Link to="/product/shoes-4" className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Handbags" />
                <span className="text-[12px] leading-tight text-gray-800">Handbags</span>
              </Link>
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('see_all')}</Link>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('up_to_75')}</h2>
            <Link to="/product/5" className="flex-1 flex justify-center items-center h-[280px]">
              <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=350&h=350&fit=crop" className="max-h-full max-w-full object-contain bg-[#f9ebe0] w-full h-full" alt="Headphones" />
            </Link>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('shop_now')}</Link>
          </div>
          
        </div>

        {/* Second Row of Cards (Single wide card in screenshot) */}
        <div className="relative z-20 px-5 mt-5">
          <div className="bg-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm h-auto sm:h-[150px]">
            <div className="flex flex-col mb-4 sm:mb-0">
              <h2 className="text-[21px] font-bold leading-tight mb-2 text-gray-900">Starting ₹70,348 | Engineered for the road</h2>
              <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline">See all offers</Link>
            </div>
            <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=150&fit=crop" className="h-[100px] w-full sm:w-[300px] object-cover rounded" alt="Engineered for the road" />
          </div>
        </div>

        {/* Amazon LIVE Section */}
        <div className="relative z-20 px-5 mt-5">
          <div className="bg-white p-5 flex flex-col shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-[21px] font-bold leading-tight text-gray-900">Amazon LIVE - Watch, Chat & Shop LIVE</h2>
              <Link to="/" className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline mt-1">See more from Amazon Live</Link>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Video snapshot */}
              <Link to="/product/live-video" className="w-full md:w-[450px] shrink-0 relative cursor-pointer block">
                <img src="https://images.unsplash.com/photo-1555529771-464a9bd4191c?w=450&h=250&fit=crop" className="w-full h-[250px] object-cover rounded shadow ring-1 ring-gray-200" alt="Live Event" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                  <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center p-1 cursor-pointer hover:bg-black/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
              </Link>
              {/* Product Cards */}
              <div className="flex flex-1 gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {['1511707171634-5f8f7eb4815a', '1505740420928-5e560c06d30e', '1523206489230-c6224c5bbd69', '1505156868547-9b19f7fd1ae3', '1546868871-7041f2a55e12', '1600080972464-8e5fcea04ac4', '1526170375885-3ba577e38714', '1584990347449-a6e812f8e136'].map((imgId, idx) => (
                  <Link key={idx} to={`/product/live-${idx+1}`} className="min-w-[150px] border border-gray-200 rounded p-3 flex flex-col cursor-pointer snap-start hover:shadow-md transition-shadow">
                    <div className="h-[120px] w-full mb-2 flex items-center justify-center">
                      <img src={`https://images.unsplash.com/photo-${imgId}?w=120&h=120&fit=crop`} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="Product" />
                    </div>
                    <span className="text-[11px] bg-[#CC0C39] text-white px-2 py-0.5 w-max font-bold mb-1 rounded-[2px]">Up to {(idx + 1) * 10}% off</span>
                    <span className="text-[12px] text-[#CC0C39] font-bold leading-tight mb-1">Limited time deal</span>
                    <div className="flex items-baseline gap-1 mt-auto">
                      <span className="text-[15px] font-bold text-gray-900">₹{(idx + 1) * 10},999</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Row of Cards (4-Grid matching image) */}
        <div className="relative z-20 px-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 5 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Customers' Most-Loved Fashion for you</h2>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {['1542291026-7eec264c27ff', '1515886657613-9f3515b0c78f', '1434389670869-bace65042450', '1608231387042-66d1773070a5'].map((imgId, i) => (
                <Link key={i} to={`/product/${i+10}`} className="cursor-pointer text-center">
                  <img src={`https://images.unsplash.com/photo-${imgId}?w=150&h=150&fit=crop`} className="h-[120px] w-full object-contain mb-1" alt="Fashion" />
                </Link>
              ))}
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Explore more</Link>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">For all your school needs</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               <Link to="/product/school-1" className="cursor-pointer flex flex-col justify-between">
                 <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Notebooks" />
                 <span className="text-[12px] leading-tight text-gray-800">Notebooks, diaries & more</span>
               </Link>
               <Link to="/product/school-2" className="cursor-pointer flex flex-col justify-between">
                 <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Books" />
                 <span className="text-[12px] leading-tight text-gray-800">School books</span>
               </Link>
               <Link to="/product/school-3" className="cursor-pointer flex flex-col justify-between">
                 <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Storage" />
                 <span className="text-[12px] leading-tight text-gray-800">Books bundles</span>
               </Link>
               <Link to="/product/school-4" className="cursor-pointer flex flex-col justify-between">
                 <img src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Writing" />
                 <span className="text-[12px] leading-tight text-gray-800">Pens, pencils & writing supplies</span>
               </Link>
             </div>
             <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See all</Link>
          </div>

          {/* Card 7 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Min. 30% off | Top deals from Small Businesses</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               {['1505691938859-e1bc18cb8e07', '1507149833261-aa7a8f154bea', '1518455027359-f3f8164ba6bd', '1485955900006-d0c28e7349ce'].map((imgId, i) => (
                 <Link key={i} to={`/product/small-biz-${i+1}`} className="cursor-pointer flex flex-col justify-between">
                   <img src={`https://images.unsplash.com/photo-${imgId}?w=150&h=120&fit=crop`} className="h-[120px] w-full object-cover" alt="Small business deal" />
                 </Link>
               ))}
             </div>
             <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See all offers</Link>
          </div>

          {/* Card 8 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Min. 45% off | Deals on home essentials from Amazon Lau...</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               {['1505693314120-0d4438671346', '1493663280031-bbf4a2ea14c7', '1416862291207-4ca732144d83', '1517668808822-9ebb02f2a0e6'].map((imgId, i) => (
                 <Link key={i} to={`/product/home-ess-${i+1}`} className="cursor-pointer flex flex-col justify-between">
                   <img src={`https://images.unsplash.com/photo-${imgId}?w=150&h=120&fit=crop`} className="h-[120px] w-full object-cover" alt="Home essentials" />
                 </Link>
               ))}
             </div>
             <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Explore more</Link>
          </div>

        </div>

        {/* Wide Carousel Strip at the bottom */}
        <div className="relative z-20 px-5 mt-5">
          <div className="bg-white p-5 flex flex-col shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-[21px] font-bold leading-tight text-gray-900">Min. 35% off | Best selling products from Small Businesses</h2>
              <Link to="/" className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline mt-1">See more</Link>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x">
               {['1524805444758-089113d48a6d', '1593359677879-a4bb92f829d1', '1516035069371-29a1b244cc32', '1601925260368-ae2f83cf8b7f', '1584990347449-a6e812f8e136', '1505156868547-9b19f7fd1ae3', '1523206489230-c6224c5bbd69', '1505691938859-e1bc18cb8e07', '1542291026-7eec264c27ff', '1553062407-98eeb64c6a62'].map((imgId, idx) => (
                 <Link key={idx} to={`/product/bestseller-${idx+1}`} className="min-w-[200px] h-[200px] cursor-pointer snap-start shrink-0 mr-1 hover:opacity-90 transition-opacity block">
                   <img src={`https://images.unsplash.com/photo-${imgId}?w=200&h=200&fit=crop`} className="w-full h-full object-contain bg-gray-50 mix-blend-multiply" alt="Deal strip product" />
                 </Link>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
