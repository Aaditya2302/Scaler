import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ChevronRight, Share, ChevronDown, Check, ChevronLeft, ShoppingCart, PlayCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

const DUMMY_DB = {
  "1": {
    category: "Amazon Fashion",
    breadcrumbs: ["Clothing & Accessories", "Men", "Winter Wear", "Sweatshirts & Hoodies", "Hoodies"],
    brand: "Visit the TAGAS Store",
    title: "Tagas Hoodie for Men|Sweatshirt for Man Stylish | Hooded (Sweatshirt) for Mans| Winter Wear for Mans",
    rating: 4.2,
    reviews: 471,
    isDeal: true,
    discount: "-69%",
    price: 629,
    mrp: 1999,
    fulfilled: true,
    colors: [
      { name: "Navy", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop" },
      { name: "Coffee", img: "https://images.unsplash.com/photo-1556821839-440d9df764f6?w=100&h=100&fit=crop" },
      { name: "Navy Blue", img: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=100&h=100&fit=crop" }
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556821839-440d9df764f6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&h=800&fit=crop"
    ],
    details: [
      { label: "Material composition", value: "5% Stretchable , Composition: 95% Polyster" },
      { label: "Pattern", value: "Graphic Print" },
      { label: "Fit type", value: "Regular" },
      { label: "Length", value: "Standard Length" },
      { label: "Neck style", value: "Hooded Neck" },
      { label: "Country of Origin", value: "India" }
    ],
    about: [
      "Neckline: Round Neck, Details: Pullover, Sleeve Length: Full Sleeve",
      "Sleeve Type: Regular Sleeve",
      "Length: Regular, Fit Type: Regular Fit",
      "Fabric: 5% Stretchable , Composition: 95% Polyster"
    ],
    rufusQuestions: ["Is it machine washable?", "Does it have pockets?", "Is the hood adjustable?"],
    deliveryDate: "Wednesday, 1 April",
    stockStatus: "Only 1 left in stock.",
    seller: "Cocobia Retail"
  },
  "default": {
    category: "Electronics",
    breadcrumbs: ["Electronics", "Headphones, Earbuds & Accessories", "Headphones", "In-Ear"],
    brand: "Visit the AudioTech Store",
    title: "AudioTech Noise Cancelling Wireless Earbuds, Bluetooth 5.3, 40H Playtime, Deep Bass",
    rating: 4.5,
    reviews: 12450,
    isDeal: true,
    discount: "-40%",
    price: 999,
    mrp: 1665,
    fulfilled: true,
    colors: [
      { name: "Matte Black", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop" },
      { name: "Pure White", img: "https://images.unsplash.com/photo-1606220838315-056192153282?w=100&h=100&fit=crop" }
    ],
    sizes: ["Standard"],
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572569433114-1fca7622955f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606220838315-056192153282?w=800&h=800&fit=crop"
    ],
    details: [
      { label: "Brand", value: "AudioTech" },
      { label: "Color", value: "Matte Black" },
      { label: "Form Factor", value: "In Ear" },
      { label: "Connectivity", value: "Bluetooth" }
    ],
    about: [
      "Experience premium sound quality with robust active noise-cancelling.",
      "Bluetooth 5.3 for seamless, stutter-free connectivity.",
      "Up to 40 hours of playtime with the included fast-charging case.",
      "IPX5 waterproof rating against sweat and rain."
    ],
    rufusQuestions: ["How long does the battery last?", "Is it compatible with iPhone?", "Can I use just one earbud?"],
    deliveryDate: "Tomorrow",
    stockStatus: "In Stock.",
    seller: "Appario Retail"
  }
};

const MEGA_MENUS = {
  "Men": {
    columns: [
      { title: "CLOTHING", links: ["T-Shirts & Polos", "Shirts", "Trousers", "Jeans", "Innerwear", "Sportswear", "Sleep & Lounge Wear", "Ethnic Wear", "Ties, Socks & Belts", "Suits & Blazers", "Sweaters", "Jackets & Coats"] },
      { title: "SHOES", links: ["Sports Shoes", "Formal Shoes", "Casual Shoes", "Sneakers", "Loafers & Mocassins", "Flip-Flops", "Boots", "Sandals & Floaters", "Thong Sandals", "Boat Shoes"] },
      { title: "WATCHES", links: ["Metallic", "Chronographs", "Leather"] },
      { title: "JEWELLERY", links: ["Rings", "Bracelets"] },
      { title: "EYEWEAR", links: ["Sunglasses", "Spectacle Frames"] },
      { title: "WALLETS", links: [] },
    ],
    promos: [
      { img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=220&h=260&fit=crop", title: "Men's Clothing", subtitle: "Explore Store" },
      { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=220&h=260&fit=crop", title: "Running Shoes", subtitle: "See More" },
      { img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=220&h=260&fit=crop", title: "MAX | Just Launched", subtitle: "Explore Store" }
    ]
  },
  "Women": {
    columns: [
      { title: "TRENDING", links: ["New Arrivals", "Best Sellers", "Premium Brands", "Plus Size", "Maternity", "Sustainable Fashion"] },
      { title: "ETHNIC WEAR", links: ["Sarees", "Kurtas & Kurtis", "Lehengas", "Salwar Suits", "Dupattas", "Readymade Blouses"] },
      { title: "WESTERN WEAR", links: ["Dresses", "Tops & Tunics", "Jeans", "Trousers & Tights", "Shirts", "Co-ords", "Jumpsuits"] },
      { title: "BEAUTY", links: ["Makeup", "Skincare", "Haircare", "Fragrances", "Bath & Body"] },
      { title: "SHOES", links: ["Heels", "Flats", "Sneakers", "Wedges", "Sports Shoes"] },
    ],
    promos: [
      { img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=220&h=260&fit=crop", title: "Women's Fashion", subtitle: "Up to 70% Off" },
      { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=220&h=260&fit=crop", title: "Beauty Edit", subtitle: "Explore Top Brands" },
      { img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=220&h=260&fit=crop", title: "Footwear Sale", subtitle: "Min 50% Off" }
    ]
  },
  "Kids": {
    columns: [
      { title: "GIRLS", links: ["ALL CLOTHING", "Tops & Tees", "Dresses", "Jeans", "Pants", "Clothing Sets", "Baby Girl"] },
      { title: "BOYS", links: ["ALL CLOTHING", "T-Shirts", "Shirts", "Jeans", "Pants", "Clothing Sets", "Baby Boy"] },
      { title: "KIDS", links: ["Clothing", "Shoes", "Watches", "Jewellery", "Sunglasses", "School Bags"] },
      { title: "BABY", links: ["Clothing", "Shoes"] },
      { title: "SHOES", links: ["Sports shoes", "Casual shoes", "Sandals"] },
    ],
    promos: [
      { img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=220&h=260&fit=crop", title: "MAX | Just Launched", subtitle: "Explore Store" },
      { img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=220&h=260&fit=crop", title: "Boys' Clothing", subtitle: "40% - 70% off" },
      { img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=220&h=260&fit=crop", title: "Girls' Clothing", subtitle: "40% - 70% off" }
    ]
  },
  "Bags & Luggage": {
    columns: [
      { title: "BAGS & BACKPACKS", links: ["Backpacks", "Laptop Bags", "Briefcases", "Messenger Bags", "Rucksacks", "School Bags"] },
      { title: "HANDBAGS & CLUTCHES", links: ["Handbags", "Clutches", "Totes", "Sling Bags", "Hobos and Shoulder Bags", "Satchels"] },
      { title: "STORES", links: ["Leather Handbags", "Ethnic Bags", "Party Bags", "Work Bags", "College Bags", "Premium Handbags"] },
      { title: "LUGGAGE", links: ["Suitcases & Trolley Bags", "Travel Duffles", "Travel Accessories"] },
      { title: "WALLETS", links: ["Men's Wallets", "Women's Wallets"] },
    ],
    promos: [
      { img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=220&h=260&fit=crop", title: "Handbags", subtitle: "40% - 70% off" },
      { img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=220&h=260&fit=crop", title: "Backpacks", subtitle: "40% - 70% off" },
      { img: "https://images.unsplash.com/photo-1565026057447-bc90829ecf61?w=220&h=260&fit=crop", title: "New Arrivals", subtitle: "Bags and Luggage" }
    ]
  }
};

const generateMockProduct = (id) => {
  let title = "Premium Amazon Product";
  let category = "General";
  let image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"; 
  let price = 999;
  
  if (id.includes('shoes')) {
    title = "Comfortable Sports Shoes for Men & Women";
    category = "Fashion & Sports";
    image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop";
    price = 1499;
  } else if (id.includes('revamp')) {
    title = "Luxury Home Decor & Furnishing Set";
    category = "Home";
    image = "https://images.unsplash.com/photo-1584100936595-c0654b35e263?w=800&h=800&fit=crop";
    price = 899;
  } else if (id.includes('school')) {
    title = "Complete School Essentials & Stationery Kit";
    category = "Office Products";
    image = "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop";
    price = 299;
  } else if (id.includes('live') || id.includes('deal') || id.includes('small-biz')) {
    title = "Special Limited Time Deal Item";
    category = "Deals";
    image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
    price = 1999;
  } else if (id.includes('related') || id.includes('bestseller') || id.includes('home-ess')) {
    title = "Top Rated Customer Favorite Product";
    category = "Best Sellers";
    image = "https://images.unsplash.com/photo-1556821839-440d9df764f6?w=800&h=800&fit=crop";
    price = 799;
  }

  return {
    category,
    breadcrumbs: [category, "Best Sellers", "Item"],
    brand: "Visit the Generic Store",
    title: `${title} - Collection: ${id}`,
    rating: (4.0 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 5000) + 100,
    isDeal: true,
    discount: "-30%",
    price,
    mrp: Math.floor(price * 1.4),
    fulfilled: true,
    colors: [
      { name: "Standard", img: image }
    ],
    sizes: ["Regular"],
    images: [ image, image, image ],
    details: [
      { label: "Brand", value: "Generic" },
      { label: "Quality", value: "Premium" },
      { label: "Condition", value: "New" }
    ],
    about: [
      "High quality standard material.",
      "Durability guaranteed for everyday use.",
      "Comes with manufacturer warranty."
    ],
    rufusQuestions: ["Is this product durable?", "What is the warranty period?", "Can it be returned?"],
    deliveryDate: "Tomorrow",
    stockStatus: "In Stock.",
    seller: "Retail Cloud"
  };
};

export default function ProductDetail() {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [mainImg, setMainImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);

  const { cartItems, addToCart, updateQuantity } = useCart();
  const { wishlistItems, addToWishlist } = useWishlist();
  const itemInCart = cartItems.find(item => String(item.id) === String(id));
  const inWishlist = wishlistItems.some(item => String(item.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(false);
    
    const timer = setTimeout(() => {
      let fetchedProduct = DUMMY_DB[id];
      if (!fetchedProduct) {
        if (id === 'error-test') {
           setError(true);
           setLoading(false);
           return;
        }
        // Generate a dynamic mock product instead of showing default earbuds
        fetchedProduct = generateMockProduct(id);
      }

      setProduct(fetchedProduct);
      setMainImg(fetchedProduct.images[0]);
      setSelectedColor(fetchedProduct.colors[0].name);
      setSelectedSize(fetchedProduct.sizes[0]);
      setLoading(false);
    }, 400); // Simulated network delay

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center font-sans">
        <div className="text-[16px] text-gray-700 flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#ffa41c] border-t-transparent rounded-full animate-spin drop-shadow-sm"></div>
          Loading product...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center font-sans py-20">
        <h2 className="text-[24px] font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-[15px] text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
        <Link to="/" className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] px-6 py-2 rounded-full font-medium shadow-sm transition-colors text-[14px] text-black border border-transparent">
          Return to Home
        </Link>
      </div>
    );
  }

  const productWithId = { ...product, id };

  return (
    <div className="bg-white min-h-screen text-[14px] text-[#0f1111] font-sans pb-10">
      
      {/* Top Banner (Category Bar) */}
      <div className="bg-white border-b border-gray-200 py-[4px] px-5 flex items-center shadow-sm relative group" onMouseLeave={() => setActiveMenu(null)}>
        <span className="font-bold text-[15px] mr-6 hidden md:block">{product.category}</span>
        <div className="flex gap-7 text-[13px] text-gray-700 hidden lg:flex h-[36px] items-center">
          {["Women", "Men", "Kids", "Bags & Luggage", "Sportswear", "Sales & Deals"].map(c => (
            <div key={c} className="h-full flex items-center">
              <span 
                className={`cursor-pointer flex items-center gap-1 transition-colors border-b-[3px] h-full ${activeMenu === c ? 'text-orange-500 border-orange-500 font-bold' : 'border-transparent hover:text-orange-500'}`}
                onMouseEnter={() => setActiveMenu(MEGA_MENUS[c] ? c : MEGA_MENUS["Men"] ? "Men" : null)}
              >
                {c} <ChevronDown className="w-3 h-3 text-gray-400"/>
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Mega Menu Dropdown */}
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <div className="absolute top-[100%] left-0 w-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50 py-8 px-10 flex min-h-[380px]">
             
             {/* Left Text Columns */}
             <div className="flex-1">
               <div className="columns-3 gap-8">
                 {MEGA_MENUS[activeMenu].columns.map((col, idx) => (
                   <div key={idx} className="break-inside-avoid mb-8">
                     <h4 className="font-bold text-[12px] text-gray-900 tracking-wider mb-3 uppercase">{col.title}</h4>
                     <ul className="flex flex-col gap-1.5 text-[13px] text-gray-700">
                       {col.links.map(link => (
                         <li key={link} className="hover:text-orange-500 hover:underline cursor-pointer">{link}</li>
                       ))}
                     </ul>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Right Image Promos */}
             <div className="w-[800px] flex gap-4 pl-10 border-l border-gray-100 shrink-0">
               {MEGA_MENUS[activeMenu].promos.map((promo, idx) => (
                 <div key={idx} className="flex flex-col flex-1 items-center cursor-pointer group">
                   <div className="w-full h-[260px] bg-gray-50 flex items-center justify-center p-2 mb-3 overflow-hidden rounded-sm">
                     <img src={promo.img} alt={promo.title} className="max-w-full max-h-full object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                   </div>
                   <h5 className="font-bold text-[14px] text-gray-900 mb-0.5">{promo.title}</h5>
                   <p className="text-[13px] text-gray-500 group-hover:underline group-hover:text-[#007185]">{promo.subtitle}</p>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      <div className="max-w-[1500px] mx-auto px-4 sm:px-5">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-[12px] text-[#565959] py-3 flex-wrap">
          {product.breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Link to="#" className="hover:underline">{crumb}</Link>
              {idx < product.breadcrumbs.length - 1 && <span className="mx-1.5 font-bold"></span>}
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center relative">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:w-[40%] shrink-0">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible py-2 lg:py-0 w-full lg:w-16">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`w-11 h-[54px] lg:w-11 lg:h-14 border rounded-[4px] cursor-pointer bg-white flex items-center justify-center p-0.5 ${mainImg === img ? 'border-[#e77600] ring-1 ring-[#e77600] shadow-[0_0_3px_rgba(231,118,0,0.5)]' : 'border-[#a2a6ac] hover:border-[#e77600]'}`}
                  onMouseEnter={() => setMainImg(img)}
                  onClick={() => setMainImg(img)}
                >
                  <img src={img} alt="thumb" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
            
            {/* Main Image Container */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-[350px] lg:h-[550px] flex items-center justify-center bg-white">
                <img src={mainImg} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply cursor-crosshair" />
                <button className="absolute top-2 right-2 w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"><Share className="w-5 h-5 text-gray-600" /></button>
              </div>
              
              {/* Ask Rufus Pills */}
              <div className="w-full mt-8">
                 <div className="flex items-center gap-1.5 font-bold text-[12px] mb-2">
                   <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#FF9900] to-[#146EB4] p-[1px]"><div className="w-full h-full bg-white rounded-full"></div></div> Ask Rufus
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {product.rufusQuestions.map((q, i) => (
                     <span key={i} className="bg-[#f0f8fc] text-[#007185] text-[12px] border border-transparent hover:border-[#83d6cb] rounded-full px-3 py-1.5 cursor-pointer font-medium shadow-sm transition-colors">{q}</span>
                   ))}
                   <span className="bg-[#007185] text-white text-[12px] rounded-full px-3 py-1.5 cursor-pointer font-medium shadow-sm hover:bg-[#005e6e] transition-colors">Ask something else</span>
                 </div>
              </div>
            </div>
          </div>
          
          {/* CENTER COLUMN: Details */}
          <div className="flex-1 lg:max-w-fit">
            <Link to="#" className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline font-medium">{product.brand}</Link>
            <h1 className="text-[24px] leading-[1.2] font-medium text-gray-900 mt-1 sm:mt-0 mb-1 max-w-[800px]">{product.title}</h1>
            
            {/* Ratings */}
            <div className="flex items-center text-[14px] mb-2">
              <span className="font-bold mr-1">{product.rating}</span>
              <div className="flex text-[#ffa41c] mr-2">
                {[1,2,3,4].map(s => <Star key={s} className="w-4 h-4 fill-current"/>)}
                <Star className="w-4 h-4 fill-current text-white border-white stroke-orange-400" />
              </div>
              <ChevronDown className="w-3 h-3 text-gray-500 mr-2" />
              <Link to="#" className="text-[#007185] hover:text-[#c45500] hover:underline flex items-center">
                 {product.reviews} ratings <span className="mx-2 text-gray-300">|</span> Search this page
              </Link>
            </div>
            
            <div className="h-[1px] bg-gray-200 w-full my-3"></div>
            
            {/* Price section */}
            {product.isDeal && <div className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-1 rounded-[2px] w-max mb-2 uppercase">Limited time deal</div>}
            
            <div className="flex items-start text-gray-900 mb-1">
              {product.isDeal && <span className="text-[28px] text-[#cc0c39] font-light mr-3">{product.discount}</span>}
              <span className="text-[14px] mt-1 pr-0.5">₹</span>
              <span className="text-[28px] font-medium leading-none">{product.price}</span>
            </div>
            
            <div className="text-[12px] text-[#565959] flex items-center gap-1 mb-1">
              M.R.P.: <span className="line-through">₹{product.mrp}</span>
            </div>
            <div className="text-[14px] font-bold text-gray-900 mt-1 mb-2">Inclusive of all taxes</div>

            {/* Offers */}
            <div className="border border-gray-200 rounded-[8px] mt-4 mb-4">
               <div className="border-b border-gray-200 px-4 py-2 flex gap-2 font-bold text-[14px]">
                 <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">%</span> Offers
               </div>
               <div className="flex overflow-x-auto gap-4 px-4 py-3 scrollbar-hide">
                 <div className="min-w-[130px] border border-gray-200 rounded p-3 text-[12px] shadow-sm bg-white">
                   <div className="font-bold mb-1">Cashback</div>
                   <div className="text-gray-800 leading-snug">Upto ₹50.00 cashback as Amazon Pay Balance...</div>
                   <Link to="#" className="text-[#007185] hover:underline mt-2 block">3 offers {'>'}</Link>
                 </div>
                 <div className="min-w-[130px] border border-gray-200 rounded p-3 text-[12px] shadow-sm bg-white">
                   <div className="font-bold mb-1">Bank Offer</div>
                   <div className="text-gray-800 leading-snug">Upto ₹1,000.00 discount on select Credit Cards</div>
                   <Link to="#" className="text-[#007185] hover:underline mt-2 block">25 offers {'>'}</Link>
                 </div>
               </div>
            </div>

            <div className="h-[1px] bg-gray-200 w-full my-4"></div>

            {/* Variations */}
            <div className="mb-4">
              <span className="text-[#565959] text-[14px]">Colour: </span>
              <span className="font-bold text-[14px] text-black">{selectedColor}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.colors.map((c) => (
                  <div 
                    key={c.name}
                    className={`border ${selectedColor === c.name ? 'border-[#e77600] ring-1 ring-[#e77600] p-[1px]' : 'border-gray-300 p-[1px] hover:border-gray-500'} cursor-pointer flex flex-col items-center group bg-white`}
                    onClick={() => setSelectedColor(c.name)}
                  >
                    <img src={c.img} className="w-12 h-14 object-contain" alt={c.name} />
                    <div className="text-[11px] text-gray-600 px-1 py-0.5 border-t border-gray-100 w-full text-center bg-gray-50 truncate max-w-[50px]">{c.price || `₹${product.price}`}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between max-w-[280px]">
                <div>
                  <span className="text-[#565959] text-[14px]">Size: </span>
                  <span className="font-bold text-[14px] text-black">{selectedSize}</span>
                </div>
                <Link to="#" className="text-[14px] text-[#007185] hover:underline flex items-center"><PlanIcon /> Size Chart {'>'}</Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((s) => (
                  <div 
                    key={s}
                    className={`border ${selectedSize === s ? 'border-[#e77600] ring-1 ring-[#e77600] bg-[#fdfaf6]' : 'border-gray-400 bg-white hover:bg-gray-50'} cursor-pointer px-3 py-1.5 rounded-[3px] text-[14px] font-medium`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Table */}
            <div className="mt-5">
              <h3 className="font-bold text-[16px] mb-2">Product details</h3>
              <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-y-1.5 text-[14px] max-w-[450px]">
                 {product.details.map(d => (
                   <React.Fragment key={d.label}>
                     <div className="font-bold text-gray-800">{d.label}</div>
                     <div className="text-gray-900">{d.value}</div>
                   </React.Fragment>
                 ))}
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 w-full my-5"></div>

            {/* About Item */}
            <div>
              <h3 className="font-bold text-[16px] mb-2">About this item</h3>
              <ul className="list-disc pl-5 text-[14px] text-[#0f1111] leading-relaxed flex flex-col gap-1">
                {product.about.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
            
          </div>
          
          {/* RIGHT COLUMN: Buy Box */}
          <div className="w-full lg:w-[280px] shrink-0 border border-gray-300 rounded-[8px] p-[18px] flex flex-col h-max shadow-sm mt-4 lg:mt-0 relative">
             <div className="absolute top-0 right-4 p-1 border border-gray-200 border-t-0 rounded-b shadow-sm text-[12px] bg-white text-gray-500 font-medium">Share</div>
             <div className="text-[28px] font-medium leading-[1] mb-2 pt-2 text-[#cc0c39] flex items-start">
                <span className="text-[14px] mt-1 pr-0.5">₹</span>{product.price}<span className="text-[14px] mt-1 pl-0.5">00</span>
             </div>
             
             {product.fulfilled && <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485936079_.png" alt="Fulfilled" className="h-[18px] object-contain w-max mb-3"/>}
             
             <div className="text-[14px] text-gray-800 mb-3 leading-snug">
               <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">FREE delivery</span> <span className="font-bold">{product.deliveryDate}</span>. Order within <span className="text-[#008a00]">10 hrs 19 mins</span>. <Link to="#" className="text-[#007185] hover:underline">Details</Link>
             </div>
             
             <div className="flex items-start text-[14px] text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer mb-3">
               <MapPin className="w-4 h-4 mr-1 text-gray-700 mt-0.5 shrink-0" /> Deliver to Aaditya - New Delhi 110085
             </div>
             
             <div className="text-[18px] font-medium text-[#b12704] mb-4">
               {product.stockStatus}
             </div>
             
             <div className="flex flex-col text-[14px] gap-2 mb-4">
               <div className="flex"><span className="w-20 text-gray-500">Ships from</span> <span className="text-gray-900">Amazon</span></div>
               <div className="flex"><span className="w-20 text-gray-500">Sold by</span> <Link to="#" className="text-[#007185] hover:underline truncate">{product.seller}</Link></div>
               <div className="flex"><span className="w-20 text-gray-500">Packaging</span> <Link to="#" className="text-[#007185] hover:underline">Shows what's inside</Link></div>
               <div className="flex"><span className="w-20 text-gray-500">Payment</span> <Link to="#" className="text-[#007185] hover:underline">Secure transaction</Link></div>
             </div>
             
             <div className="mb-4">
               {!itemInCart && (
                 <div className="relative border border-[#d5d9d9] bg-[#f0f2f2] hover:bg-[#e3e6e6] rounded-md px-2 py-1 shadow-[0_1px_3px_rgba(0,0,0,0.05)] w-[85px] cursor-pointer inline-flex items-center gap-2">
                   <span className="text-[13px] font-medium leading-none mt-1">Qty: 
                     <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="bg-transparent border-none outline-none cursor-pointer pl-1 leading-none h-full truncate absolute inset-0 opacity-0 z-10 block">
                       {[...Array(5)].map((_, i) => (<option key={i+1} value={i+1}>{i+1}</option>))}
                     </select> 
                   </span>
                   <span className="text-[13px] font-medium">{qty}</span>
                   <ChevronDown className="w-3 h-3 text-gray-500 ml-auto" />
                 </div>
               )}
             </div>
             
             {itemInCart ? (
               <div className="w-full flex items-center justify-between border border-[#d5d9d9] bg-[#f0f2f2] rounded-[24px] px-1 py-1 mb-2.5 shadow-[0_2px_5px_rgba(213,217,217,0.5)]">
                 <button 
                   onClick={() => updateQuantity(itemInCart.id, itemInCart.quantity - 1)}
                   className="w-12 h-8 flex items-center justify-center font-bold text-[20px] text-gray-800 hover:bg-[#e3e6e6] rounded-l-full cursor-pointer pb-[2px]"
                 >-</button>
                 <span className="font-bold text-[14px] bg-white px-8 py-1.5 rounded-[12px] border border-[#d5d9d9] shadow-inner text-black">
                   {itemInCart.quantity}
                 </span>
                 <button 
                   onClick={() => updateQuantity(itemInCart.id, itemInCart.quantity + 1)}
                   className="w-12 h-8 flex items-center justify-center font-bold text-[20px] text-gray-800 hover:bg-[#e3e6e6] rounded-r-full cursor-pointer pb-[2px]"
                 >+</button>
               </div>
             ) : (
               <button 
                 onClick={() => addToCart(productWithId, qty)}
                 className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] rounded-full py-2 text-[14px] text-black shadow-[0_2px_5px_rgba(213,217,217,0.5)] mb-2.5 transition-colors border border-transparent font-medium"
               >
                 Add to Cart
               </button>
             )}

             <Link to="/cart" className="block w-full">
               <button 
                 onClick={() => { if(!itemInCart) addToCart(productWithId, qty); }}
                 className="w-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#f28000] rounded-full py-2 text-[14px] text-black shadow-[0_2px_5px_rgba(213,217,217,0.5)] mb-3 transition-colors border border-transparent font-medium"
               >
                 Buy Now
               </button>
             </Link>
             
             <div className="h-[1px] bg-gray-200 w-full mb-3"></div>
             
             {inWishlist ? (
               <Link to="/wishlist" className="block w-full">
                 <button className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-gray-300 rounded-[4px] py-1.5 text-[13px] text-gray-800 shadow-sm text-center mb-0 transition-colors">
                   Added to Wish List. View List
                 </button>
               </Link>
             ) : (
               <button onClick={() => addToWishlist(productWithId)} className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-[4px] py-1.5 text-[13px] text-gray-800 shadow-sm text-center mb-0 transition-colors">
                 Add to Wish List
               </button>
             )}
          </div>
          
        </div>

        <div className="h-[1px] bg-gray-200 w-full mt-10 mb-6"></div>

        {/* Carousel: Customers Who Viewed */}
        <div className="py-2">
           <h2 className="text-[20px] font-bold text-gray-900 mb-4 px-2">Customers who viewed this item also viewed</h2>
           <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x px-2">
             {[1,2,3,4,5,6].map((idx) => (
                <Link key={idx} to={`/product/related-${idx}`} className="min-w-[180px] w-[180px] flex flex-col snap-start shrink-0 mb-2 cursor-pointer group block">
                  <div className="w-full h-[180px] bg-white flex items-center justify-center p-2 mb-1">
                    <img src={`https://images.unsplash.com/photo-1556821839-440d9df764f6?w=200&h=200&fit=crop`} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:opacity-90 transition-opacity" alt="Related product" />
                  </div>
                  <div className="text-[14px] text-[#007185] group-hover:text-[#c45500] group-hover:underline line-clamp-3 leading-snug">
                     Winter Hoodie Stylish For Men Basic Plain Graphic
                  </div>
                  <div className="flex text-[#ffa41c] mt-1 mb-1 items-center gap-1 text-[12px]">
                    <div className="flex"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 text-gray-300"/></div>
                    <span className="text-[#007185] group-hover:underline">{idx * 217}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[10px] mt-[3px] pr-0.5 text-black">₹</span><span className="text-[20px] font-medium leading-none">{499 + idx * 50}</span>
                  </div>
                  <div className="text-[12px] text-gray-500 mt-0.5 line-through">₹{1299}</div>
                </Link>
             ))}
           </div>
        </div>

        <div className="h-[1px] bg-gray-200 w-full my-6"></div>

        {/* Customer Reviews Pane */}
        <div className="flex flex-col md:flex-row gap-10 mt-2 mb-10">
          {/* Left Bars */}
          <div className="w-full md:w-[300px] shrink-0">
             <h2 className="text-[21px] font-bold text-gray-900 mb-2">Customer reviews</h2>
             <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#ffa41c] items-center"><Star className="w-[18px] h-[18px] fill-current"/><Star className="w-[18px] h-[18px] fill-current"/><Star className="w-[18px] h-[18px] fill-current"/><Star className="w-[18px] h-[18px] fill-current"/><Star className="w-[18px] h-[18px] text-gray-300"/></div>
                <span className="text-[18px] text-black">4.2 out of 5</span>
             </div>
             <p className="text-[14px] text-gray-500 mb-4">{product.reviews} global ratings</p>
             
             {/* Rating Bars */}
             <div className="flex flex-col gap-2 mb-8">
               {[ {s: '5', pct: '56%'}, {s: '4', pct: '25%'}, {s: '3', pct: '9%'}, {s: '2', pct: '2%'}, {s: '1', pct: '8%'} ].map((row) => (
                 <div key={row.s} className="flex items-center gap-3 text-[14px] hover:text-[#c45500] hover:underline cursor-pointer group text-[#007185]">
                    <span className="w-10 whitespace-nowrap">{row.s} star</span>
                    <div className="flex-1 h-5 bg-gray-100 border border-gray-300 rounded-[2px] overflow-hidden shadow-inner">
                      <div className="h-full bg-[#ffa41c] border-r border-[#fa8900]" style={{width: row.pct}}></div>
                    </div>
                    <span className="w-12 text-right">{row.pct}</span>
                 </div>
               ))}
             </div>

             <div className="h-[1px] bg-gray-200 w-full my-6"></div>
             
             <h3 className="text-[18px] font-bold text-gray-900 mb-1">Review this product</h3>
             <p className="text-[14px] text-gray-800 mb-3">Share your thoughts with other customers</p>
             <button className="w-full border border-[#d5d9d9] bg-white hover:bg-gray-50 rounded-[8px] py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] text-[13px] font-medium text-black">
               Write a product review
             </button>
          </div>

          {/* Right Main Review Content */}
          <div className="flex-1 max-w-[800px]">
             <h3 className="text-[18px] font-bold text-gray-900 mb-2">Customers say</h3>
             <p className="text-[14px] text-gray-800 mb-2 leading-relaxed">
               Customers find the hoodie to be of good quality, with one noting its durability after washing. They appreciate its comfort, with one mentioning it's suitable for temperatures. The fabric receives positive feedback for its material thickness.
             </p>
             <div className="flex flex-wrap text-[#007185] text-[13px] gap-2 mb-6">
                <span className="cursor-pointer hover:underline border-r border-gray-300 pr-2">Fabric quality (18)</span>
                <span className="cursor-pointer hover:underline border-r border-gray-300 pr-2">Fit (18)</span>
                <span className="cursor-pointer hover:underline border-r border-gray-300 pr-2">Appearance (14)</span>
                <span className="cursor-pointer hover:underline pr-2">Color (14)</span>
             </div>

             <h3 className="text-[18px] font-bold text-gray-900 mb-3">Reviews with images</h3>
             <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8">
               {[1,2,3,4,5].map(i => (
                 <img key={i} src={`https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop`} className="w-[120px] h-[120px] rounded object-cover border border-gray-200 cursor-pointer hover:opacity-90" alt="review"/>
               ))}
             </div>

             <div className="h-[1px] bg-gray-200 w-full my-6"></div>

             <h3 className="text-[18px] font-bold text-gray-900 mb-6">Top reviews from India</h3>
             
             <div className="flex flex-col gap-6">
               <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <img src="https://ui-avatars.com/api/?name=Arun+Kundal&background=random" className="w-8 h-8 rounded-full" />
                    <span className="text-[14px] text-gray-900">Arun kundal</span>
                  </div>
                  <div className="flex items-center gap-2 mb-0.5">
                     <div className="flex text-[#ffa41c] items-center"><Star className="w-3.5 h-3.5 fill-current"/><Star className="w-3.5 h-3.5 fill-current"/><Star className="w-3.5 h-3.5 fill-current"/><Star className="w-3.5 h-3.5 fill-current"/><Star className="w-3.5 h-3.5 fill-current"/></div>
                     <span className="text-[14px] font-bold text-black">Highly recommended</span>
                  </div>
                  <span className="text-[13px] text-[#565959] mb-0.5">Reviewed in India on 14 November 2025</span>
                  <span className="text-[11px] text-[#007185] font-bold mb-2">Verified Purchase</span>
                  <p className="text-[14px] text-gray-800 leading-snug mb-3">
                    I recently bought this men's hoodie and I'm really impressed with the quality. The fabric feels soft, warm and comfortable, making it perfect for casual outings...
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="border border-gray-300 rounded-[8px] px-4 py-1.5 shadow-sm text-[13px] font-medium text-black hover:bg-gray-50">Helpful</button>
                    <span className="text-[13px] text-gray-500 cursor-pointer hover:underline">Report</span>
                  </div>
               </div>
             </div>
             
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
}
