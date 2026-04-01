import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Plus, ExternalLink, Zap } from "lucide-react";
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
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden border-t border-slate-50">
      <div className="w-full px-4 md:px-8 lg:px-12">

        {/* --- LEFT-ALIGNED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[2px] mb-4"
            >
              <Zap size={12} className="fill-current" />
              Latest in Inventory
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none"
            >
              New <span className="text-blue-600">Arrivals.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-bold mt-4 max-w-xl text-sm md:text-base leading-relaxed"
            >
              Discover our freshest selection of precision-engineered printers and professional hardware.
            </motion.p>
          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-slate-400 hover:text-blue-600 transition-colors group"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- COMPACT TECH GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-slate-50 border border-slate-100 aspect-[3/4]"
              >
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            products.slice(0, 18).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index % 6) * 0.03 }}
                viewport={{ once: true }}
                className="group/card"
              >
                <Link to={`/product/${p.slug}`} className="flex flex-col">
                  
                  {/* Card Container */}
                  <div className="relative w-full aspect-[3/4] bg-white border border-slate-100 flex items-center justify-center p-4 transition-all duration-500 group-hover/card:border-blue-600 group-hover/card:shadow-2xl group-hover/card:shadow-blue-50/50">

                    

                    {/* Wishlist */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className={cn(
                        "absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100",
                        isInWishlist(p.id) ? "text-red-500 opacity-100 border-red-100" : "text-slate-400 hover:text-red-500"
                      )}
                    >
                      <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Image */}
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                      }}
                    />

                    {/* Hover Action Bar */}
                    <div className="absolute inset-x-0 bottom-0 overflow-hidden h-0 group-hover/card:h-11 transition-all duration-300 z-10">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="w-full h-full bg-blue-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[2px] hover:bg-slate-900 transition-colors"
                      >
                        <Plus size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="mt-4 px-1 text-center">
                    <h3 className="text-[11px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest leading-relaxed line-clamp-2 min-h-[30px]">
                      {p.name}
                    </h3>

                    {/* Price Container with Transition */}
                    <div className="mt-2 relative h-6 overflow-hidden">
                       <div className="flex flex-col transition-transform duration-300 group-hover/card:-translate-y-6">
                          <span className="h-6 flex items-center justify-center text-sm font-black text-slate-900 tracking-tight">
                             ${p.price}
                          </span>
                        
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile View All Button */}
        {!loading && products.length > 0 && (
          <div className="flex md:hidden justify-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
            >
              Explore All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
