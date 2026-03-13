import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingCart, Zap, Box } from 'lucide-react';
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-[#fcfcfc] z-[1001] flex flex-col font-snpro border-l border-gray-100 shadow-2xl"
          >
            {/* Header: Bento Style */}
            <div className="p-8 bg-white border-b border-gray-100 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-6 h-[2px] bg-[#0047ab]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047ab]">Deployment Cart</span>
                </div>
                <h2 className="text-2xl font-black text-black uppercase italic tracking-tighter">My Selection<span className="text-[#0047ab]">.</span></h2>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all active:scale-90 border border-transparent hover:border-gray-100"
              >
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            {/* Content: Bento List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={item.id} 
                      className="group flex gap-5 p-5 bg-white border border-gray-100 relative overflow-hidden hover:border-[#0047ab]/30 transition-all duration-500"
                    >
                      <div className="h-24 w-24 bg-gray-50 flex items-center justify-center flex-shrink-0 p-4 border border-gray-50 group-hover:bg-white transition-colors">
                        <img 
                          src={getImagePath(item.images)} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] font-black text-[#0047ab] uppercase tracking-[0.2em] italic">{item.brand_name || 'Verified Terminal'}</span>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><Trash2 size={14} /></button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[13px] font-black text-black uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-[#0047ab] transition-colors">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="h-10 bg-gray-50 flex items-center border border-gray-100 overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-10 w-10 flex items-center justify-center text-black hover:bg-white hover:text-[#0047ab] transition-all"><Minus size={12} strokeWidth={4} /></button>
                            <span className="text-[12px] font-black w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-10 w-10 flex items-center justify-center text-black hover:bg-white hover:text-[#0047ab] transition-all"><Plus size={12} strokeWidth={4} /></button>
                          </div>
                          <span className="text-[15px] font-black text-black italic tracking-tighter">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-8">
                  <div className="h-24 w-24 bg-gray-50 border border-gray-100 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    <ShoppingCart size={32} className="text-gray-200 relative z-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter">Inventory Empty.</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">No professional hardware units <br/>selected for deployment.</p>
                  </div>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-black text-white flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl"
                  >
                    Access Store
                  </Link>
                </div>
              )}
            </div>

            {/* Footer: Bento Total */}
            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-gray-100 space-y-6">
                <div className="flex items-end justify-between px-2">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Stock Value</span>
                     <span className="text-4xl font-black text-black italic tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <div className="flex items-center gap-2 mb-1">
                        <Box size={12} className="text-[#0047ab]" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Terminal Count</span>
                     </div>
                     <span className="text-2xl font-black text-[#0047ab] leading-none italic">{cartCount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-black text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-2xl shadow-[#0047ab]/10 group"
                  >
                    Initiate Checkout
                    <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-12 border border-gray-100 text-gray-500 hover:text-black hover:border-gray-300 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 italic"
                  >
                    View Operational Log
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
