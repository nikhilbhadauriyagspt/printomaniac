import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, ChevronLeft, Trash2, Package, Plus } from 'lucide-react';
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

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="My Wishlist | Printer Club" description="Review your saved professional printing solutions." />
      
      {/* --- MINIMAL PAGE HEADER --- */}
      <section className="pt-5 pb-16 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Personal Archive</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                My <span className="text-blue-600">Wishlist.</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
               <Heart size={14} className="text-blue-600" fill="currentColor" /> {wishlistCount} Saved Units
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-20 min-h-[60vh]">
        <div className="w-full px-4 md:px-12 lg:px-20">
          
          <AnimatePresence mode="wait">
            {wishlistCount === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 max-w-4xl mx-auto px-8"
              >
                <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Heart size={32} className="text-slate-200" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Your wishlist is empty</h2>
                <p className="text-slate-500 font-bold mb-10 max-w-sm mx-auto">Save your preferred professional units to easily access them later.</p>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-95 group">
                  Browse Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <div className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {wishlist.map((p, index) => (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group/card"
                      >
                        <div className="flex flex-col">
                          
                          {/* Card Container */}
                          <div className="relative w-full aspect-[3/4] bg-white border border-slate-100 flex items-center justify-center p-4 transition-all duration-500 group-hover/card:border-blue-600 group-hover/card:shadow-2xl group-hover/card:shadow-blue-50/50 rounded-2xl">

                            {/* Remove Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 text-slate-400 hover:text-red-500 hover:border-red-100"
                              title="Remove"
                            >
                              <Trash2 size={14} />
                            </button>

                            {/* Image */}
                            <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                              <img
                                src={getImagePath(p.images)} alt={p.name}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                              />
                            </Link>

                            {/* Hover Action Bar */}
                            <div className="absolute inset-x-0 bottom-0 overflow-hidden h-0 group-hover/card:h-11 transition-all duration-300 z-10 rounded-b-2xl">
                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="w-full h-full bg-blue-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[2px] hover:bg-slate-900 transition-colors"
                              >
                                <Plus size={14} /> Add to Cart
                              </button>
                            </div>
                          </div>

                          {/* Info Area */}
                          <Link to={`/product/${p.slug}`} className="mt-4 px-1 text-center">
                            <h3 className="text-[11px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest line-clamp-2 min-h-[30px] leading-relaxed">
                              {p.name}
                            </h3>

                            {/* Price */}
                            <div className="mt-2 text-sm font-black text-slate-900">
                               ${parseFloat(p.price).toLocaleString()}
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div className="mt-24 pt-12 border-t border-slate-50 flex justify-center">
            <Link to="/shop" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-slate-400 hover:text-blue-600 transition-all">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
