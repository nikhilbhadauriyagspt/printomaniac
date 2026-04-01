import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, Trash2, ChevronLeft, ShieldCheck, Zap } from 'lucide-react';
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
    return "https://via.placeholder.com/200x200?text=Product";
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
        <SEO title="Empty Archive | Inktrix Printers" />
        
        <section className="pt-32 pb-16 border-b border-slate-50 bg-slate-50/30">
          <div className="w-full px-4 md:px-12 lg:px-20 text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="h-[1px] w-8 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Inventory Status</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
              Cart is <span className="text-blue-600">Empty.</span>
            </h1>
          </div>
        </section>

        <section className="py-20 flex items-center justify-center min-h-[50vh]">
          <div className="text-center max-w-xl mx-auto px-8">
            <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
              <ShoppingBag size={32} className="text-slate-200" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">No units selected</h2>
            <p className="text-slate-500 font-bold mb-10 leading-relaxed">Browse our high-performance inventory to find the ideal hardware for your professional workspace.</p>
            <Link to="/shop" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 group">
              Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Unit Cart | Inktrix Printers" />
      
      {/* --- MINIMAL PAGE HEADER --- */}
      <section className="pt-32 pb-16 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Unit Selection</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Your <span className="text-blue-600">Cart.</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
               <ShoppingBag size={14} /> {cartCount} Units Pending
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 min-h-screen">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* --- ITEMS LIST --- */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="group flex flex-col md:flex-row gap-8 items-center p-6 bg-white rounded-[2.5rem] border border-slate-100 hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5"
                  >
                    <div className="h-32 w-32 bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 shrink-0 group-hover:bg-white transition-colors overflow-hidden">
                      <img 
                        src={getImagePath(item.images)} 
                        alt={item.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col w-full">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <Link to={`/product/${item.slug}`}>
                            <h3 className="text-[15px] font-black text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-wide leading-tight line-clamp-1">{item.name}</h3>
                          </Link>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ref: #{item.id.toString().slice(-6)}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="h-10 w-10 rounded-xl bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between mt-8 gap-4">
                        <div className="flex items-center border border-slate-100 rounded-xl h-12 px-1 bg-slate-50">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={14} /></button>
                          <span className="text-sm font-black w-10 text-center text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={14} /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-widest">Unit Valuation</p>
                          <span className="text-xl font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="pt-8 flex justify-center">
                <Link to="/shop" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-slate-400 hover:text-blue-600 transition-all">
                  <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Update Inventory Selection
                </Link>
              </div>
            </div>

            {/* --- SUMMARY CARD --- */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-10 sticky top-32 overflow-hidden relative shadow-2xl shadow-slate-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="space-y-2 relative z-10">
                  <div className="flex items-center gap-2 text-blue-500">
                     <Zap size={16} fill="currentColor" />
                     <span className="text-[10px] font-black uppercase tracking-[3px]">Valuation Protocol</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight uppercase">Summary</h2>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Hardware Subtotal</span>
                    <span className="text-white text-sm">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Logistics handling</span>
                    <span className="text-blue-500 text-sm">Included</span>
                  </div>
                  <div className="h-px bg-white/5 w-full" />
                  <div className="pt-2">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-[4px] mb-2 block">Total Investment</span>
                    <p className="text-5xl font-black text-blue-500 leading-none tracking-tighter">${total.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 relative z-10 space-y-6">
                  <Link 
                    to="/checkout"
                    className="w-full h-16 bg-blue-600 text-white rounded-full font-black text-[11px] uppercase tracking-[3px] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 group"
                  >
                    Proceed to Protocol
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-[3px]">Encrypted Transmission</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
