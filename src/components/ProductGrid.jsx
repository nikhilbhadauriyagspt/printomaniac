import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-12 md:py-16 w-full font-jakarta overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              New <span className="text-blue-600">Arrivals</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">Fresh additions to our elite collection</p>
          </div>
          
          <Link to="/shop" className="group flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors">
            View All <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {products.slice(0, 18).map((p) => (
            <div 
              key={p.id}
              className="group relative flex flex-col h-full bg-white transition-all duration-500"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Card */}
              <div className="relative aspect-[4/5] w-full bg-slate-50 overflow-hidden border border-slate-100 group-hover:border-blue-100 transition-all duration-500">
                <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                
                <img 
                  src={getImagePath(p.images)} 
                  alt={p.name} 
                  className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                />

                {/* Hover Actions Overlay */}
                <AnimatePresence>
                  {hoveredId === p.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/5 z-20 flex flex-col items-center justify-center gap-2 p-3 backdrop-blur-[2px]"
                    >
                      <button 
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-10 bg-blue-600 text-white rounded-full flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-[10px] font-bold uppercase tracking-wider"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                      
                      <div className="flex gap-2 w-full">
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                          className={cn(
                            "flex-1 h-10 rounded-full flex items-center justify-center gap-2 border bg-white shadow-md transition-all text-[9px] font-bold uppercase tracking-tight",
                            isInWishlist(p.id) ? "text-red-500 border-red-100" : "text-slate-600 hover:text-blue-600 border-slate-100"
                          )}
                        >
                          <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                          Wishlist
                        </button>
                        <Link 
                          to={`/product/${p.slug}`}
                          className="flex-1 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center gap-2 shadow-md hover:bg-slate-800 transition-all text-[9px] font-bold uppercase tracking-tight"
                        >
                          <Eye size={12} />
                          View
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Details */}
              <div className="pt-4 px-1 space-y-1">
                <Link to={`/product/${p.slug}`} className="block">
                  <h3 className="text-[12px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-slate-900">${p.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
