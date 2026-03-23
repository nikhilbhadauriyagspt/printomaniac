import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
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
          {/* Softer Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[1000]"
          />

          {/* Boutique Style Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[1001] flex flex-col font-jakarta shadow-[-20px_0_80px_rgba(0,0,0,0.05)]"
          >
            {/* Minimal Header */}
            <div className="px-8 pt-10 pb-6 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your cart</h2>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-blue-600" />
                  <p className="text-xs font-medium text-slate-400">{cartCount} items selected</p>
                </div>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-8 relative"
                    >
                      {/* Product Image */}
                      <div className="h-32 w-32 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 p-6 overflow-hidden border border-slate-100 transition-all duration-500 group-hover:bg-white group-hover:shadow-lg group-hover:border-blue-100">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col py-1">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                              <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{item.name}</h3>
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.id)} 
                              className="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0"
                            >
                              <X size={18} strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="text-[11px] font-bold text-blue-600/60">Elite Series Hardware</p>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center border border-slate-100 rounded-xl h-10 px-1 bg-slate-50/50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Minus size={12} /></button>
                            <span className="text-sm font-black w-8 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><Plus size={12} /></button>
                          </div>
                          <span className="text-lg font-black text-slate-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                  <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100/50">
                    <ShoppingBag size={40} strokeWidth={1} className="text-blue-600/40" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-900">Your bag is empty</h3>
                    <p className="text-sm font-medium text-slate-400 max-w-[200px] mx-auto leading-relaxed">Discover our collection of high-performance printers.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center gap-3 bg-slate-900 text-white h-14 px-10 rounded-2xl font-bold text-sm transition-all shadow-xl hover:bg-blue-600 active:scale-95"
                  >
                    Browse products
                  </Link>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-8 space-y-8 bg-white border-t border-slate-100 shadow-[0_-20px_60px_rgba(0,0,0,0.03)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm font-medium text-slate-400 px-1">
                    <span>Subtotal</span>
                    <span className="text-slate-900 font-bold">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium text-slate-400 px-1">
                    <span>Shipping</span>
                    <span className="text-blue-600 font-bold">Calculated at checkout</span>
                  </div>
                  <div className="pt-4 flex items-end justify-between border-t border-slate-50">
                    <span className="text-sm font-black text-slate-900">Total amount</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
                  >
                    Proceed to checkout
                    <ArrowRight size={20} />
                  </Link>
                  
                  <div className="flex items-center justify-center gap-2 text-slate-300">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Safe & secure checkout</span>
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
