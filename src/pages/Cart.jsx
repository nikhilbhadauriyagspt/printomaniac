import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-jakarta bg-white text-slate-900">
        <SEO title="Empty Cart | My Printer Store" />
        <div className="h-24 w-24 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center mb-8 shadow-sm">
          <ShoppingBag size={36} className="text-slate-300" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center">Your cart is <span className="text-slate-400">empty.</span></h2>
        <p className="text-slate-500 text-lg font-medium mb-10 text-center max-w-sm leading-relaxed">It looks like you haven't added anything yet. Take your time and explore our range of printers.</p>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white h-14 px-10 rounded-2xl font-bold text-base hover:bg-cyan-600 transition-all shadow-xl active:scale-95 group">
          Start shopping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-24">
      <SEO title="Shopping Cart | My Printer Store" />
      
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-cyan-500" />
              <span className="text-cyan-600 text-sm font-bold">Shopping Selection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Your <span className="text-slate-400">cart.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100 text-sm font-bold text-slate-500">
            <ShieldCheck size={18} className="text-cyan-600" />
            Secure checkout ready
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- ITEMS LIST --- */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id} 
                  className="group flex flex-col md:flex-row gap-8 items-center p-8 rounded-3xl border border-slate-100 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 bg-white"
                >
                  <div className="h-32 w-32 bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 flex-shrink-0 relative overflow-hidden group-hover:bg-white transition-colors">
                    <img 
                      src={getImagePath(item.images)} 
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col h-full w-full">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-1">
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="text-lg font-black text-slate-800 hover:text-cyan-600 transition-colors leading-tight line-clamp-2">{item.name}</h3>
                        </Link>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Printer Unit</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="h-10 w-10 rounded-xl bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center shrink-0 border border-transparent"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                      <div className="flex items-center border border-slate-100 rounded-xl h-12 px-1 bg-slate-50/50">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={14} /></button>
                        <span className="text-base font-black w-10 text-center text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={14} /></button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tight">${item.price.toLocaleString()} each</p>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-10">
              <Link to="/shop" className="group inline-flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-slate-900 transition-all">
                <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                Return to collection
              </Link>
            </div>
          </div>

          {/* --- SUMMARY CARD --- */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white space-y-10 sticky top-32 shadow-2xl shadow-slate-900/20 overflow-hidden relative border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="space-y-4 relative z-10">
                <h2 className="text-3xl font-black tracking-tight uppercase">Summary</h2>
                <div className="h-1 w-12 bg-cyan-500 rounded-full" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-cyan-400">Included</span>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div className="pt-4 flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Estimated Total</span>
                  <p className="text-5xl font-black text-cyan-400 leading-none tracking-tighter">${total.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <Link 
                  to="/checkout"
                  className="w-full h-16 bg-cyan-500 text-slate-900 rounded-2xl font-black text-sm hover:bg-white transition-all shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-4 group/btn"
                >
                  Proceed to checkout
                  <ArrowRight size={20} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

