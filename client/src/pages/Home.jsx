import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/products`;

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150';
  };

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

  if (loading) {
    return <div className="min-h-screen bg-[#e3e6e6] flex items-center justify-center font-bold text-xl">Loading Products...</div>;
  }

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
              {products.slice(0, 4).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer text-center">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                    onError={handleImageError}
                    className="h-[120px] w-full object-contain mb-1" 
                    alt={product.name} 
                  />
                </Link>
              ))}
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('see_more')}</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('revamp_home')}</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              {products.slice(4, 8).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer flex flex-col justify-between">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                    onError={handleImageError}
                    className="h-[110px] w-full object-cover mb-1" 
                    alt={product.name} 
                  />
                  <span className="text-[12px] line-clamp-2 leading-tight text-gray-800">{product.name}</span>
                </Link>
              ))}
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('explore_all')}</Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('up_to_60')}</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              {products.slice(8, 12).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer flex flex-col justify-between">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                    onError={handleImageError}
                    className="h-[110px] w-full object-contain bg-gray-50 mb-1" 
                    alt={product.name} 
                  />
                  <span className="text-[12px] line-clamp-2 leading-tight text-gray-800">{product.name}</span>
                </Link>
              ))}
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">{t('see_all')}</Link>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">{t('up_to_75')}</h2>
            {products[12] && (
              <Link to={`/product/${products[12].id}`} className="flex-1 flex justify-center items-center h-[280px]">
                <img 
                  src={products[12].images?.[0] || 'https://via.placeholder.com/150'} 
                  onError={handleImageError}
                  className="max-h-full max-w-full object-contain bg-[#f9ebe0] w-full h-full" 
                  alt={products[12].name} 
                />
              </Link>
            )}
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
            <img 
              src={products[47]?.images?.[0] || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=150&fit=crop'} 
              onError={handleImageError}
              className="h-[100px] w-full sm:w-[300px] object-cover rounded" 
              alt="Engineered for the road" 
            />
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
              <Link to={`/product/${products[48]?.id || 'live-video'}`} className="w-full md:w-[450px] shrink-0 relative cursor-pointer block">
                <img 
                  src={products[48]?.images?.[0] || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=450&h=250&fit=crop'} 
                  onError={handleImageError}
                  className="w-full h-[250px] object-cover rounded shadow ring-1 ring-gray-200" 
                  alt="Live Event" 
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                  <div className="w-14 h-14 bg-black/60 rounded-full flex items-center justify-center p-1 cursor-pointer hover:bg-black/80 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
              </Link>
              {/* Product Cards */}
              <div className="flex flex-1 gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {products.slice(13, 21).map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="min-w-[150px] border border-gray-200 rounded p-3 flex flex-col cursor-pointer snap-start hover:shadow-md transition-shadow">
                    <div className="h-[120px] w-full mb-2 flex items-center justify-center">
                      <img 
                        src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                        onError={handleImageError}
                        className="max-w-full max-h-full object-contain mix-blend-multiply" 
                        alt={product.name} 
                      />
                    </div>
                    <span className="text-[11px] bg-[#CC0C39] text-white px-2 py-0.5 w-max font-bold mb-1 rounded-[2px]">Up to {Math.floor(Math.random() * 20) + 10}% off</span>
                    <span className="text-[12px] text-[#CC0C39] font-bold leading-tight mb-1">Limited time deal</span>
                    <div className="flex items-baseline gap-1 mt-auto">
                      <span className="text-[15px] font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
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
              {products.slice(21, 25).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer text-center">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                    onError={handleImageError}
                    className="h-[120px] w-full object-contain mb-1" 
                    alt={product.name} 
                  />
                </Link>
              ))}
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Explore more</Link>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">For all your school needs</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               {products.slice(25, 29).map((product) => (
                 <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer flex flex-col justify-between">
                   <img 
                     src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                     onError={handleImageError}
                     className="h-[110px] w-full object-cover mb-1" 
                     alt={product.name} 
                   />
                   <span className="text-[12px] line-clamp-2 leading-tight text-gray-800">{product.name}</span>
                 </Link>
               ))}
             </div>
             <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See all</Link>
          </div>

          {/* Card 7 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Min. 30% off | Top deals from Small Businesses</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               {products.slice(29, 33).map((product) => (
                 <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer flex flex-col justify-between">
                   <img 
                     src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                     onError={handleImageError}
                     className="h-[120px] w-full object-cover" 
                     alt={product.name} 
                   />
                 </Link>
               ))}
             </div>
             <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See all offers</Link>
          </div>

          {/* Card 8 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
             <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Min. 45% off | Deals on home essentials from Amazon Lau...</h2>
             <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
               {products.slice(33, 37).map((product) => (
                 <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer flex flex-col justify-between">
                   <img 
                     src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                     onError={handleImageError}
                     className="h-[120px] w-full object-cover" 
                     alt={product.name} 
                   />
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
               {products.slice(37, 47).map((product) => (
                 <Link key={product.id} to={`/product/${product.id}`} className="min-w-[200px] h-[200px] cursor-pointer snap-start shrink-0 mr-1 hover:opacity-90 transition-opacity block">
                   <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                    onError={handleImageError}
                    className="w-full h-full object-contain bg-gray-50 mix-blend-multiply" 
                    alt={product.name} 
                   />
                 </Link>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
