import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Trash2, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white z-[1001] flex flex-col font-jakarta shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-12 pb-6 border-b border-slate-50 relative">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-600">
                   <Zap size={14} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-[3px]">Active Protocol</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                  Unit <span className="text-blue-600">Cart.</span>
                </h2>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
                  {cartCount} units in selection
                </p>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="absolute top-10 right-8 h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-8 bg-white custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-5 p-4 rounded-[1.5rem] border border-slate-100 hover:border-blue-600 transition-all duration-300"
                    >
                      <div className="h-20 w-20 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 p-2 overflow-hidden border border-slate-50 group-hover:bg-white transition-colors">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start gap-2">
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[13px] font-bold text-slate-800 hover:text-blue-600 transition-colors uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h3>
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-slate-300 hover:text-red-500 transition-all p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-slate-100 rounded-lg h-8 px-1 bg-slate-50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={10} /></button>
                            <span className="text-[11px] font-black w-6 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={10} /></button>
                          </div>
                          <span className="text-sm font-black text-slate-900 tracking-tight">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                    <ShoppingBag size={24} className="text-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">CART IS EMPTY</h3>
                    <p className="text-slate-400 text-xs font-bold max-w-[200px] mx-auto leading-relaxed uppercase tracking-widest">No units found in active selection.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center gap-3 bg-slate-900 text-white h-12 px-10 rounded-full font-black text-[10px] uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                  >
                    Explore Inventory
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 relative z-10">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Valuation subtotal</span>
                    <span className="text-slate-900">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Logistics handling</span>
                    <span className="text-blue-600">Calculated</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[3px] mb-1 block">Total Investment</span>
                    <span className="text-4xl font-black text-blue-600 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-blue-600 text-white rounded-full font-black text-[11px] uppercase tracking-[3px] flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:bg-slate-900 transition-all active:scale-95 group"
                  >
                    Proceed to checkout
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck size={14} className="text-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-[3px]">Encrypted Transmission</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
