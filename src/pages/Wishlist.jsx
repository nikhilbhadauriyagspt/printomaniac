import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChevronLeft, ArrowRight, Plus, ShoppingCart, Zap, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-snpro bg-[#fcfcfc]">
        <SEO title="Empty Wishlist | Printer Brother" />
        <div className="h-24 w-24 bg-white border border-gray-100 flex items-center justify-center mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          <Heart size={40} className="text-gray-200 relative z-10" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic tracking-tighter mb-4">No Saved Units.</h2>
        <p className="text-gray-400 text-sm font-medium mb-12 uppercase tracking-widest text-center">You haven't reserved any premium hardware <br/>for future deployment.</p>
        <Link to="/shop" className="h-16 px-12 bg-black text-white flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl group">
          Browse Inventory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-40 pb-24 font-snpro text-slate-900 overflow-x-hidden">
      <SEO title="Saved Hardware | Printer Brother" description="Review your reserved professional hardware units." />
      
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        
        {/* --- BENTO HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-1 bg-[#0047ab]" />
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Reservation Log</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
              Saved <br />
              <span className="text-[#0047ab]">Selection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1 block">Reserved Units</span>
                <span className="text-3xl font-black text-[#0047ab] italic leading-none">{wishlistCount}</span>
             </div>
          </div>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white border border-gray-100 p-4 transition-all duration-500 flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:border-[#0047ab]/30 h-[420px]"
              >
                {/* Remove: Bento Style */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-4 right-4 z-20 h-9 w-9 bg-white border border-gray-100 flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 active:scale-90 text-gray-300"
                >
                  <Trash2 size={16} />
                </button>

                {/* Image Panel */}
                <div className="relative aspect-square w-full flex items-center justify-center mb-4 px-2 overflow-hidden">
                  <div className="absolute top-0 left-0 z-20">
                    <span className="text-[9px] font-black text-[#0047ab] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full tracking-widest uppercase italic">
                      {p.brand_name || 'Verified Terminal'}
                    </span>
                  </div>
                  <img src={getImagePath(p.images)} alt={p.name} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
                </div>

                {/* Metadata Panel */}
                <div className="space-y-3 mb-4">
                  <Link to={`/product/${p.slug}`} className="block">
                    <h3 className="font-bold text-gray-800 text-[13px] leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#0047ab] transition-colors h-[32px]">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                     <span className="text-[16px] font-black text-gray-900 italic tracking-tighter">${p.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Area */}
                <div className="mt-auto grid grid-cols-4 gap-1.5 relative z-30">
                  <button 
                    onClick={() => addToCart(p)}
                    className="col-span-3 h-10 bg-black border border-black text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] hover:border-[#0047ab] transition-all active:scale-95"
                  >
                    Deploy to Cart
                  </button>
                  <Link 
                    to={`/product/${p.slug}`}
                    className="h-10 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <Link to="/shop" className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all italic">
            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform text-[#0047ab]" />
            Return to Inventory Center
          </Link>
        </div>
      </div>
    </div>
  );
}
