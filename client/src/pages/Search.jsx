import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          const mappedData = data.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category ? p.category.name : 'General',
            rating: p.rating || 4.2,
            count: p.numReviews || 0,
            price: p.price,
            image: p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
          }));
          setResults(mappedData);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="bg-white min-h-screen py-6 px-4 font-sans border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 pb-2 border-b border-gray-200">
           <h1 className="text-xl font-bold">Results for "<span className="text-[#c45500]">{query}</span>"</h1>
           <p className="text-sm text-gray-600 mt-1">Showing {results.length} results based on your search</p>
        </div>

        {loading ? (
          <div className="text-center py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-[#ffa41c] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">Try checking your spelling or use more general terms</p>
            <Link to="/" className="inline-block mt-6 text-[#007185] hover:text-[#c45500] hover:underline">
              Return to Home Page
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {results.map(product => (
              <div key={product.id} className="flex flex-col sm:flex-row gap-6 border border-gray-200 rounded p-4 hover:shadow-md transition-shadow">
                <div className="w-full sm:w-48 h-48 shrink-0 bg-[#f7f7f7] rounded flex items-center justify-center border border-gray-100">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm p-2" />
                </div>
                
                <div className="flex-1 flex flex-col justify-start">
                  <Link to={`/product/${product.id}`} className="text-[18px] font-medium text-[#007185] hover:text-[#c45500] hover:underline line-clamp-2 leading-tight mb-2 transition-colors">
                    {product.name}
                  </Link>
                  
                  <div className="flex items-center text-sm mb-2 text-[#007185]">
                     <span className="flex items-center text-[#ffa41c] mr-2">
                       {product.rating} <Star className="w-3.5 h-3.5 fill-[#ffa41c] ml-1 mt-0.5" />
                     </span>
                     <span className="hover:underline cursor-pointer">{product.count} reviews</span>
                  </div>
                  
                  <div className="flex items-start text-2xl font-medium text-gray-900 mb-2">
                     <span className="text-xs pt-1 mr-[1px]">₹</span>{product.price}
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-2">FREE Delivery over ₹499. Fulfilled by Amazon.</div>
                  
                  <p className="text-sm text-gray-700 font-bold mb-4">Category: <span className="font-normal">{product.category}</span></p>
                  
                  <div className="mt-auto">
                     <Link to={`/product/${product.id}`}>
                       <button className="bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f2c200] text-black border border-[#fcd200] rounded-full px-5 py-1.5 text-sm shadow-sm transition-colors font-medium">
                         View Product
                       </button>
                     </Link>
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
