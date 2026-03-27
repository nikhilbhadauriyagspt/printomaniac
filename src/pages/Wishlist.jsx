import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, X, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();

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

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-slate-900">
        <SEO title="Empty Wishlist | My Printer Store" />
        <div className="h-24 w-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-8 shadow-sm">
          <Heart size={36} className="text-slate-300" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center">Your wishlist is <span className="text-slate-400">empty.</span></h2>
        <p className="text-slate-500 text-lg font-medium mb-10 text-center max-w-sm leading-relaxed">Save your favorite printers here to easily find them later. No pressure, just a place for the things you like.</p>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white h-14 px-10 rounded-2xl font-bold text-base hover:bg-cyan-600 transition-all shadow-xl active:scale-95 group">
          Explore our collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="My Wishlist | My Printer Store" description="Review your saved printers." />
      
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-cyan-500" />
              <span className="text-cyan-600 text-sm font-bold">Saved Favorites</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              My <span className="text-slate-400">wishlist.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100 text-sm font-bold text-slate-500">
            <Heart size={16} className="text-cyan-600" fill="currentColor" />
            {wishlistCount} saved printers
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, index) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: (index % 6) * 0.05 }}
                className="group flex flex-col h-full relative"
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full mb-6 flex items-center justify-center overflow-hidden rounded-3xl bg-white border border-slate-100 group-hover:border-cyan-500/30 group-hover:shadow-2xl group-hover:shadow-slate-200/60 transition-all duration-500">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  
                  {/* Remove Wishlist Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="absolute top-4 right-4 z-20 h-10 w-10 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-all duration-300 text-red-400 hover:text-red-500 hover:scale-110"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Quick Add Button */}
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="absolute inset-x-0 bottom-0 z-20 h-14 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-cyan-600"
                  >
                    <ShoppingBag size={16} /> Quick Add
                  </button>
                </div>

                {/* Details Section */}
                <div className="flex-1 flex flex-col px-2">
                  <div className="flex items-center gap-2 mb-2">
                     <div className="h-px w-4 bg-slate-200" />
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Saved Gear</span>
                  </div>
                  
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-black text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-wider line-clamp-2 mb-4 leading-tight">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[14px] font-black text-slate-900 tracking-tight">${p.price}</span>
                       <span className="text-[9px] font-bold text-slate-300 line-through tracking-widest">${(parseFloat(p.price) * 1.2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-24 pt-10 border-t border-slate-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-slate-900 transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue searching for printers
          </Link>
        </div>
      </div>
    </div>
  );
}

