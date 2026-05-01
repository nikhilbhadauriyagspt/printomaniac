import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

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
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 font-['Poppins']">
      <SEO title="Wishlist | Printomaniac" />

      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-800 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                <Heart size={24} className="fill-current" />
              </div>
              <div>
                <h1 className="text-[24px] font-black text-slate-900 leading-none mb-1">My Wishlist</h1>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{wishlistCount} Saved Items</p>
              </div>
            </div>
            <Link to="/shop" className="text-[13px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Items Section */}
          <div className="p-2 sm:p-4">
            <AnimatePresence mode="wait">
              {wishlistCount === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" />
                  <h2 className="text-[20px] font-bold text-slate-900 mb-2">No saved items</h2>
                  <p className="text-gray-400 text-[14px]">Your wishlist is currently empty.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlist.map((p) => (
                    <div key={p.id} className="group bg-white border border-gray-100 rounded-3xl p-4 flex flex-col hover:border-blue-800 transition-all duration-300">
                      <div className="relative aspect-square flex items-center justify-center mb-4  rounded-2xl overflow-hidden">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-[80%] max-w-[80%] object-contain transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm flex items-center justify-center transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex-grow space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.brand_name || 'Printer'}</p>
                        <h4 className="text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-800 transition-colors">{p.name}</h4>
                        <p className="text-[16px] font-black text-slate-900">${parseFloat(p.price).toLocaleString()}</p>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="mt-4 w-full h-10 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
