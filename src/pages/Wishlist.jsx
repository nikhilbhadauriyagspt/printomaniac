import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, Eye, X, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, openCartDrawer } = useCart();
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

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-slate-900">
        <SEO title="Empty Wishlist | Axel Printing" />
        <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mb-8">
          <Heart size={32} className="text-blue-600/30" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-center">Your wishlist is <span className="text-blue-600">empty</span></h2>
        <p className="text-slate-500 text-sm font-medium mb-10 text-center max-w-xs leading-relaxed">Save your favorite printers here to easily find them later in your collection.</p>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white h-12 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="My Wishlist | Axel Printing" description="Review your saved printers." />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10 mb-12">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none ">
              My <span className="text-blue-600">Wishlist</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Review and manage your saved favorites</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Heart size={14} className="text-blue-600" fill="currentColor" />
            {wishlistCount} Saved items
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col h-full bg-white transition-all duration-500"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Card Container */}
                <div className="relative aspect-[4/5] w-full bg-slate-50 overflow-hidden border border-slate-100 group-hover:border-blue-100 transition-all duration-500 rounded-2xl">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />

                  {/* Hover Actions Overlay (Now only for Add to Cart and View) */}
                  <div className="absolute inset-0 bg-black/5 z-20 flex flex-col items-center justify-center gap-2 p-3 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => handleAddToCart(e, p)}
                      className="w-full h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-[10px] font-bold uppercase tracking-wider"
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </button>
                    <Link 
                      to={`/product/${p.slug}`}
                      className="w-full h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 shadow-md hover:bg-slate-800 transition-all text-[10px] font-bold uppercase tracking-tight"
                    >
                      <Eye size={14} />
                      View
                    </Link>
                  </div>
                </div>

                {/* Details Section - With External Remove Button */}
                <div className="pt-4 px-1 flex justify-between items-start">
                  <div className="space-y-1 flex-1 min-w-0">
                    <Link to={`/product/${p.slug}`} className="block">
                      <h3 className="text-[13px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {p.name}
                      </h3>
                    </Link>
                    <span className="text-base font-black text-slate-900">${p.price}</span>
                  </div>
                  
                  {/* Remove Button - Now outside the card and persistent */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                    className="ml-2 h-8 w-8 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0 border border-slate-100"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
