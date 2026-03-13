import { motion } from "framer-motion";
import { Heart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="px-6 md:px-10 py-24 bg-white font-sans relative">
      <div className="max-w-[1650px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-[0.15em]">
            New Arrivals
          </h2>
          <div className="w-20 h-1 bg-[#0047ab] mx-auto mt-4" />
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
          {products.slice(0, 40).map((p, idx) => (
            <div 
              key={p.id}
              className="relative bg-white border border-gray-100 p-4 transition-all duration-500 flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:border-[#0047ab]/30 h-full"
            >
              {/* Image Area */}
              <div className="relative aspect-square w-full flex items-center justify-center mb-4 px-2 overflow-hidden">
                <img 
                  src={getImagePath(p.images)} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                  alt={p.name} 
                />
              </div>

              {/* Metadata */}
              <div className="space-y-2 mb-4">
                <Link to={`/product/${p.slug}`} className="block">
                  <h3 className="font-bold text-gray-800 text-[13px] leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#0047ab] transition-colors h-[32px]">
                    {p.name}
                  </h3>
                </Link>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-[15px] font-black text-gray-900">${p.price}</span>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-auto grid grid-cols-3 gap-1.5 relative z-30">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                  disabled={addedItems[p.id]}
                  className={cn(
                    "col-span-2 h-9 border text-[9px] font-black uppercase tracking-widest transition-all duration-300 active:scale-90",
                    addedItems[p.id] 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "bg-white border-gray-200 text-gray-800 hover:bg-[#0047ab] hover:text-white hover:border-[#0047ab]"
                  )}
                >
                  {addedItems[p.id] ? <Check size={14} className="mx-auto" /> : "Add To Cart"}
                </button>
                
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "h-9 border border-gray-200 flex items-center justify-center transition-all duration-300 active:scale-90",
                    isInWishlist(p.id) ? "text-red-500 border-red-100 bg-red-50" : "text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100"
                  )}
                >
                  <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 bg-black text-white px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95"
          >
            View All Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
