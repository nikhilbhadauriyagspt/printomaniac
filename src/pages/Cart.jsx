import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ChevronLeft, ShieldCheck, ShoppingCart, Box, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-snpro bg-[#fcfcfc]">
        <SEO title="Empty Cart | Printer Brother" />
        <div className="h-24 w-24 bg-white border border-gray-100 flex items-center justify-center mb-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          <ShoppingCart size={40} className="text-gray-200 relative z-10" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic tracking-tighter mb-4">Inventory Empty.</h2>
        <p className="text-gray-400 text-sm font-medium mb-12 uppercase tracking-widest text-center">No professional hardware units <br/>selected for deployment.</p>
        <Link to="/shop" className="h-16 px-12 bg-black text-white flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl group">
          Browse Store <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-40 pb-24 font-snpro text-slate-900 overflow-x-hidden">
      <SEO title="Review Cart | Printer Brother" description="Review your selected professional hardware before deployment." />
      
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        
        {/* --- BENTO HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-1 bg-[#0047ab]" />
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Operational Log</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
              Review <br />
              <span className="text-[#0047ab]">Selection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1 block">Active Units</span>
                <span className="text-3xl font-black text-[#0047ab] italic leading-none">{cartCount}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- CART ITEMS: BENTO LIST --- */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 flex flex-col sm:flex-row items-center overflow-hidden group hover:border-[#0047ab]/30 transition-all duration-500 relative p-2"
                >
                  <div className="h-48 w-full sm:w-48 bg-gray-50 flex items-center justify-center p-8 shrink-0 transition-colors group-hover:bg-white overflow-hidden">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 p-8 flex flex-col justify-between h-full w-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-[#0047ab] uppercase tracking-[0.2em] italic">{item.brand_name || 'Verified Hardware'}</span>
                        <Link to={`/product/${item.slug}`}>
                           <h3 className="text-lg font-black text-black uppercase tracking-tight leading-tight line-clamp-1 group-hover:text-[#0047ab] transition-colors">{item.name}</h3>
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 bg-gray-50 text-gray-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all active:scale-90 border border-gray-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                      <div className="h-12 bg-gray-50 px-1.5 flex items-center border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 flex items-center justify-center bg-white border border-gray-100 text-black hover:text-[#0047ab] transition-all active:scale-90"><Minus size={14} strokeWidth={4} /></button>
                        <span className="text-sm font-black w-12 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 flex items-center justify-center bg-white border border-gray-100 text-black hover:text-[#0047ab] transition-all active:scale-90"><Plus size={14} strokeWidth={4} /></button>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block italic">Unit Value</span>
                         <span className="text-2xl font-black text-black italic tracking-tighter leading-none">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#0047ab] hover:text-black transition-all pt-12 group italic">
              <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              Continue Selection Process
            </Link>
          </div>

          {/* --- SUMMARY SIDEBAR: BENTO PANEL --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-10 sticky top-32 space-y-12 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-[#0047ab] transition-colors" />
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <Zap size={14} className="text-[#0047ab]" fill="#0047ab" />
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black italic">Operational Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Subtotal</span>
                    <span className="text-sm font-black text-black">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Logistics</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic border border-emerald-100 bg-emerald-50 px-2 py-0.5">Complimentary</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 italic">Consolidated Value</span>
                  <span className="text-5xl font-black text-black italic tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    className="w-full h-16 bg-black text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all shadow-2xl shadow-black/10 active:scale-95 group"
                  >
                    Initiate Checkout
                    <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-3 py-5 bg-gray-50 border border-gray-100 transition-colors hover:bg-white group/verified">
                    <ShieldCheck size={20} className="text-[#0047ab] group-hover/verified:scale-110 transition-transform" strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 italic">Encrypted Secure Portal</span>
                  </div>
                </div>
              </div>

              {/* Branding element */}
              <div className="pt-4 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                 <div className="text-black italic font-black text-xl tracking-tighter">PayPal</div>
                 <div className="w-px h-6 bg-gray-200" />
                 <div className="text-black font-black text-[10px] uppercase tracking-[0.3em]">Direct Pay</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
