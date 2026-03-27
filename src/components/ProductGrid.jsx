import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ProductCardSkeleton } from './ui/skeleton';

export default function ProductGrid({ products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

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
    <section className="bg-white py-16 md:py-24 w-full border-b border-slate-100 overflow-hidden">
      <div className=" mx-auto px-4 md:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-cyan-500" />
              <span className="text-cyan-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                Just Landed
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              New <span className="text-slate-400">Arrivals</span>
            </h2>
          </div>
          
          <Link to="/shop" className="group flex items-center gap-3 text-sm font-bold text-slate-900 hover:text-cyan-600 transition-all">
            <span className="uppercase tracking-widest">Explore Full Collection</span>
            <div className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300">
               <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        {/* --- PREMIUM PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
          {loading ? (
             Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
             ))
          ) : (
            products.slice(0, 18).map((p, index) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full relative"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full mb-5 flex items-center justify-center overflow-hidden  rounded-2xl group-hover:shadow-2xl group-hover:shadow-slate-200/60 transition-all duration-500">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  
                 

                  {/* Minimal Wishlist Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-3 right-3 z-20 h-9 w-9 rounded-xl bg-white shadow-lg flex items-center justify-center transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:scale-110",
                      isInWishlist(p.id) ? "text-red-500" : "text-slate-400 hover:text-cyan-600"
                    )}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>

                  {/* Quick Add Bottom Bar */}
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="absolute inset-x-0 bottom-0 z-20 py-3 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-cyan-600"
                  >
                    <ShoppingBag size={14} /> Quick Add
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col px-1">
                  

                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-black text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-wider line-clamp-2 mb-3 leading-snug">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto flex items-baseline gap-2">
                    <span className="text-lg font-black text-slate-900 tracking-tight">${p.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 line-through">${(parseFloat(p.price) * 1.2).toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
