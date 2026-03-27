import React from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { ProductCardSkeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-slate-50 py-16 md:py-24 w-full border-b border-slate-100 overflow-hidden">
      <div className=" mx-auto px-4 md:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-cyan-500" />
              <span className="text-cyan-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                Customer Choice
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Market <span className="text-slate-400">Favourites</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-600 transition-colors group">
              Browse All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex gap-2">
              <button className="bs-prev h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm group">
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <button className="bs-next h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm group">
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* --- PREMIUM PRODUCT CAROUSEL --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1600: { slidesPerView: 6 },
            }}
            className="!overflow-visible pb-12"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                   <div className="bg-white border border-slate-100 rounded-2xl p-5 h-full">
                      <ProductCardSkeleton />
                   </div>
                </SwiperSlide>
              ))
            ) : (
              products.slice(0, 15).map((p, index) => (
                <SwiperSlide key={p.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-500 group relative"
                  >
                    {/* Image Section */}
                    <div className="relative aspect-square w-full mb-6 flex items-center justify-center overflow-hidden rounded-xl">
                      <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name} 
                        className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                      />
                      
                      {/* Floating Wishlist Button */}
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className={cn(
                          "absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110",
                          isInWishlist(p.id) ? "text-red-500" : "text-slate-400 hover:text-cyan-600"
                        )}
                      >
                        <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>

                      {/* Quick Add Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <button 
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-11 bg-slate-900 text-white flex items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-600 transition-colors shadow-xl"
                          >
                            <ShoppingBag size={16} /> Add to Cart
                          </button>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 flex flex-col">
                    
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] font-black text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-wider line-clamp-2 mb-3 leading-snug">
                          {p.name}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price</span>
                           <span className="text-xl font-black text-slate-900 tracking-tight">${p.price}</span>
                        </div>
                        
                        <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-all">
                           <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>

                
                    
                  </motion.div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
