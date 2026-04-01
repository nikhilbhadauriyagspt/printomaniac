import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, ArrowRight, Star, Plus, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { ProductCardSkeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSellers({ products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) {}
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-16 md:py-24 w-full overflow-hidden border-t border-slate-50">
      <div className="w-full px-4 md:px-8 lg:px-12">

        {/* --- MINIMALIST HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="h-[1px] w-8 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Top Performance</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Best <span className="text-blue-600">Sellers.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 font-bold mt-4 max-w-xl text-xs md:text-sm leading-relaxed"
            >
              Our most popular precision hardware, engineered for excellence.
            </motion.p>
          </div>

          {/* Minimal Navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="bs-prev-premium h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all group">
              <ChevronLeft size={18} />
            </button>
            <button className="bs-next-premium h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-lg shadow-slate-100 group">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- COMPACT TECH SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.bs-prev-premium',
              nextEl: '.bs-next-premium',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 2.8 },
              640: { slidesPerView: 3.5 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 5.8 },
              1280: { slidesPerView: 7.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-4">
                    <div className="w-full aspect-[3/4] bg-slate-50 border border-slate-100" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 20).map((p, index) => (
                <SwiperSlide key={p.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    viewport={{ once: true }}
                    className="group/card"
                  >
                    <Link to={`/product/${p.slug}`} className="flex flex-col">
                      {/* Product Card Container */}
                      <div className="relative w-full aspect-[3/4] bg-white border border-slate-100 flex items-center justify-center p-4 transition-all duration-500 group-hover/card:border-blue-600 group-hover/card:shadow-2xl group-hover/card:shadow-blue-50/50">
                        
                        {/* Wishlist - Minimal */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100",
                            isInWishlist(p.id) ? "text-red-500 opacity-100 border-red-100" : "text-slate-400 hover:text-red-500"
                          )}
                        >
                          <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Image */}
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                        />

                        {/* Quick View Icon */}
                        <div className="absolute top-3 left-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                           <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                              <ExternalLink size={14} />
                           </div>
                        </div>

                        {/* HOVER ACTION BAR - UNIQUE STYLE */}
                        <div className="absolute inset-x-0 bottom-0 overflow-hidden h-0 group-hover/card:h-12 transition-all duration-300 z-10">
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-full bg-blue-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[2px] hover:bg-slate-900 transition-colors"
                          >
                            <Plus size={14} />
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="mt-4 px-1 text-center">
                        <h4 className="text-[11px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest line-clamp-2 min-h-[30px] leading-relaxed">
                          {p.name}
                        </h4>
                        
                        {/* Price Container with Hover Transition */}
                        <div className="mt-2 relative h-6 overflow-hidden">
                           <div className="flex flex-col transition-transform duration-300 group-hover/card:-translate-y-6">
                              <span className="h-6 flex items-center justify-center text-sm font-black text-slate-900">
                                 ${p.price}
                              </span>
                            
                           </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        {/* Centered CTA - Minimalist */}
        {!loading && products.length > 0 && (
          <div className="flex justify-center mt-16">
            <Link
              to="/shop"
              className="group flex items-center gap-3 px-10 py-4 bg-white border-2 border-slate-900 text-slate-900 text-[11px] font-black uppercase tracking-[3px] hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Browse Inventory
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
