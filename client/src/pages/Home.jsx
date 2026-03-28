import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1500&h=600&fit=crop",
  "https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=1500&h=600&fit=crop"
];

export default function Home() {
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));

  return (
    <div className="bg-[#e3e6e6] min-h-screen pb-10 font-sans">
      <div className="relative max-w-[1500px] mx-auto">
        
        {/* Banner Carousel */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden bg-gray-200">
          {/* Fading mask at the bottom to blend into gray background */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#e3e6e6] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex transition-transform duration-500 ease-out h-full w-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {CAROUSEL_IMAGES.map((img, idx) => (
              <img key={idx} src={img} alt={`slide-${idx}`} className="w-full h-full object-cover flex-shrink-0 [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)] object-top" />
            ))}
          </div>

          {/* Banner Controls */}
          <div onClick={prevSlide} className="absolute top-[30%] sm:top-[20%] left-0 w-12 h-64 hover:border-white border-2 border-transparent cursor-pointer flex items-center justify-center z-20 rounded-sm">
             <ChevronLeft className="w-12 h-12 text-[#232f3e] stroke-[1px]" />
          </div>
          <div onClick={nextSlide} className="absolute top-[30%] sm:top-[20%] right-0 w-12 h-64 hover:border-white border-2 border-transparent cursor-pointer flex items-center justify-center z-20 rounded-sm">
             <ChevronRight className="w-12 h-12 text-[#232f3e] stroke-[1px]" />
          </div>
        </div>

        {/* Quadrant Cards */}
        <div className="relative z-20 -mt-36 sm:-mt-64 md:-mt-[340px] px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Deals related to items you've saved</h2>
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
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See more deals</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Revamp your home in style</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1584100936595-c0654b35e263?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Cushions" />
                <span className="text-[12px] leading-tight text-gray-800">Cushion covers, bedsheets & more</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1507652313656-b72e5008dd52?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Figurines" />
                <span className="text-[12px] leading-tight text-gray-800">Figurines, vases & more</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Storage" />
                <span className="text-[12px] leading-tight text-gray-800">Home storage</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1507149833261-aa7a8f154bea?w=150&h=120&fit=crop" className="h-[110px] w-full object-cover mb-1" alt="Lighting" />
                <span className="text-[12px] leading-tight text-gray-800">Lighting solutions</span>
              </div>
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Explore all</Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Up to 60% off | Footwear & handbags</h2>
            <div className="grid grid-cols-2 gap-4 gap-y-6 flex-1">
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Shoes" />
                <span className="text-[12px] leading-tight text-gray-800">Sports shoes</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d40?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Men shoes" />
                <span className="text-[12px] leading-tight text-gray-800">Men's shoes</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Heels" />
                <span className="text-[12px] leading-tight text-gray-800">Women's shoes</span>
              </div>
              <div className="cursor-pointer flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=150&h=120&fit=crop" className="h-[110px] w-full object-contain bg-gray-50 mb-1" alt="Handbags" />
                <span className="text-[12px] leading-tight text-gray-800">Handbags</span>
              </div>
            </div>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">See all offers</Link>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 flex flex-col h-[420px]">
            <h2 className="text-[21px] font-bold leading-tight mb-4 text-gray-900 pr-4">Up to 75% off | Headphones</h2>
            <Link to="/product/5" className="flex-1 flex justify-center items-center h-[280px]">
              <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=350&h=350&fit=crop" className="max-h-full max-w-full object-contain bg-[#f9ebe0] w-full h-full" alt="Headphones" />
            </Link>
            <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Shop Now</Link>
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
      </div>
    </div>
  )
}
