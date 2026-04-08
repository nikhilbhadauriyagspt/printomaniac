import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Plus, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Skeleton } from './ui/skeleton';

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
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-12 md:py-24 w-full overflow-hidden border-y border-slate-100 relative">
      <div className="w-full px-4 md:px-8 lg:px-12">

        {/* --- CENTERED PURE WHITE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-20 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-4 shadow-sm"
          >
            <Zap size={12} className="text-blue-600 fill-current" />
            Latest in Inventory
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-slate-900  leading-none mb-4"
          >
            New <span className="text-blue-600">Arrivals.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-bold text-xs md:text-sm leading-relaxed max-w-xl"
          >
            Experience the cutting edge of printing technology with our freshest precision-engineered printer.
          </motion.p>
        </div>

        {/* --- SEAMLESS PRODUCT GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-square rounded-[2rem] bg-white border-none shadow-sm" />
                <Skeleton className="h-4 w-2/3 mx-auto bg-white" />
              </div>
            ))
          ) : (
            products.slice(0, 18).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.03 }}
                viewport={{ once: true }}
                className="group/card"
              >
                <Link to={`/product/${p.slug}`} className="flex flex-col">
                  
                  {/* Seamless Card Design */}
                  <div className="relative w-full aspect-square bg-white rounded-[2rem] flex items-center justify-center p-6 transition-all duration-500 group-hover/card:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover/card:-translate-y-2 overflow-hidden">
                    
                    {/* Wishlist Button (Seamless White) */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className={cn(
                        "absolute top-4 right-4 z-20 h-9 w-9 rounded-xl bg-white border border-slate-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 hover:scale-105 active:scale-90",
                        isInWishlist(p.id) ? "text-red-500 border-red-50 opacity-100 shadow-sm" : "text-slate-300 hover:text-red-500 hover:shadow-md"
                      )}
                    >
                      <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Image - Seamless with BG */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 group-hover/card:scale-105">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain transition-all duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                        }}
                      />
                    </div>

                    {/* Floating Action Overlay */}
                    <div className="absolute inset-x-4 bottom-4 flex gap-1.5 translate-y-16 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-400 ease-out z-20">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="flex-1 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                      <div className="h-10 w-10 bg-white text-slate-700 border border-slate-50 rounded-xl flex items-center justify-center hover:text-blue-600 transition-all shadow-md">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="mt-5 px-1 flex flex-col items-center">
                    <h3 className="text-[11px] md:text-[12px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-all duration-300 uppercase tracking-widest text-center line-clamp-2 leading-relaxed w-full min-h-[32px] mb-2">
                      {p.name}
                    </h3>

                    <div className="flex items-center gap-2">
                       <span className="text-sm font-black text-slate-900 ">
                          ${p.price}
                       </span>
                    </div>

                    <div className="mt-3 h-[1px] w-4 bg-slate-50 group-hover/card:w-12 group-hover/card:bg-blue-600 transition-all duration-500 rounded-full" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom Action CTA */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-20">
            <Link
              to="/shop"
              className="group relative flex items-center gap-4 px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[3px] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-200 active:scale-95"
            >
              Browse Full Inventory
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
