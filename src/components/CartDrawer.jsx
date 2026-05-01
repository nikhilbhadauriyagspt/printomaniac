import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import X from 'lucide-react/dist/esm/icons/x';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Truck from 'lucide-react/dist/esm/icons/truck';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

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

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[510] flex flex-col font-['Poppins'] shadow-2xl"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 className="text-[20px] font-black text-slate-900 leading-none">Your Cart</h3>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </p>
                </div>
              </div>

              <button
                onClick={closeCartDrawer}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-200" />
                  </div>
                  <h4 className="text-[20px] font-bold text-slate-900 mb-2">Cart is empty</h4>
                  <p className="text-gray-400 text-[14px] mb-8 max-w-[240px]">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate('/shop');
                    }}
                    className="h-14 px-8 rounded-2xl bg-blue-800 text-white text-[13px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="group flex gap-5 pb-6 border-b border-gray-50 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-[85%] max-w-[85%] object-contain transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-800 transition-colors">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-[15px] font-black text-slate-900 mb-4">
                          ${parsePrice(item.price).toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center bg-gray-50 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-900 disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={10} />
                            </button>

                            <span className="w-8 text-center text-[13px] font-black">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-900"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="text-[14px] font-black text-blue-800">
                            ${(parsePrice(item.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-8 border-t border-gray-50 bg-gray-50/30">
                {/* Totals */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-slate-900">
                      ${(cartTotal || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-emerald-600">Free</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div>
                       <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-800 block mb-1">
                        Total Amount
                      </span>
                      <span className="text-[32px] font-black text-slate-900 leading-none">
                        ${(cartTotal || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full h-16 rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
                  >
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-[13px] uppercase tracking-widest flex items-center justify-center hover:bg-blue-800 transition-all"
                  >
                    View Full Cart
                  </Link>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <ShieldCheck size={14} className="text-blue-800" /> Secure
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <Truck size={14} className="text-blue-800" /> Fast Delivery
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
