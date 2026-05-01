import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Truck from 'lucide-react/dist/esm/icons/truck';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[$,]/g, '')) || 0;
    }
    return parseFloat(price) || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 font-['Poppins'] text-slate-900">
      <SEO title="Shopping Cart | Printo Maniac" />

      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-800 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h1 className="text-[24px] font-black text-slate-900 leading-none mb-1">Shopping Cart</h1>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                   {cart.length} Product{cart.length !== 1 ? 's' : ''} in Bag
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
               <div className="hidden sm:flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-blue-800" /> Secure Shopping
               </div>
               <Link to="/shop" className="text-[13px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                <ChevronLeft size={16} /> Add More Items
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-4 sm:p-8">
            {cart.length === 0 ? (
              <div className="py-32 text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <ShoppingBag size={40} className="text-gray-200" />
                </div>
                <h2 className="text-[28px] font-black text-slate-900 mb-4">Your bag is empty</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-10 text-[16px]">
                  Looks like you haven't added any printers or accessories to your cart yet.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 h-16 px-12 bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  Explore Collections <ArrowRight size={20} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Cart Items */}
                <div className="lg:col-span-8 space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-white border border-gray-100 rounded-[2rem] p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:border-blue-800/30 transition-all duration-300"
                    >
                      {/* Image Area */}
                      <div className="w-full sm:w-32 h-32 rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center justify-center shrink-0">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      {/* Info Area */}
                      <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                           {item.brand_name || 'Premium Selection'}
                        </p>
                        <h3 className="text-[16px] sm:text-[18px] font-bold text-slate-900 line-clamp-2 group-hover:text-blue-800 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[15px] font-black text-slate-900">
                          ${parsePrice(item.price).toLocaleString()}
                        </p>
                      </div>

                      {/* Action Area */}
                      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-900 disabled:opacity-30 active:scale-95"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-[14px] font-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-900 active:scale-95"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Subtotal</p>
                          <p className="text-[18px] font-black text-blue-800">
                            ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Order Summary */}
                <div className="lg:col-span-4">
                  <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-8 sticky top-28 border border-gray-100 shadow-sm">
                    <div>
                      <h3 className="text-[20px] font-black text-slate-900 mb-6">Order Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-[14px] font-bold text-gray-400 uppercase tracking-widest">
                          <span>Subtotal</span>
                          <span className="text-slate-900">${(cartTotal || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[14px] font-bold text-gray-400 uppercase tracking-widest">
                          <span>Shipping</span>
                          <span className="text-emerald-600">Free</span>
                        </div>
                        <div className="flex justify-between text-[14px] font-bold text-gray-400 uppercase tracking-widest">
                          <span>Estimated Tax</span>
                          <span className="text-slate-900">$0.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-800 block mb-1">
                            Final Total
                          </span>
                          <span className="text-[36px] font-black text-slate-900 leading-none">
                            ${(cartTotal || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full h-16 bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 mb-4"
                      >
                        Checkout Now <ArrowRight size={20} />
                      </button>
                      
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                           <ShieldCheck size={16} className="text-blue-800" /> Secure Payments
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                           <Truck size={16} className="text-blue-800" /> Free Standard Delivery
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
