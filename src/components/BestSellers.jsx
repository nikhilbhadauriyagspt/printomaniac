import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Check, Plus, ArrowLeftRight, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="px-6 md:px-10 py-24 bg-[#f9f9f9] font-sans relative overflow-hidden">
      
      <div className="max-w-[1650px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-[0.15em]">
            Market Favorites
          </h2>
          <div className="w-20 h-1 bg-[#0047ab] mx-auto mt-4" />
        </div>

        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.2}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev', nextEl: '.bs-next' }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!overflow-visible !pb-4"
          >
            {products.slice(0, 12).map((p, idx) => (
                <SwiperSlide key={p.id}>
                  <div 
                    className="relative bg-white border border-gray-100 p-6 transition-all duration-500 flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-[#0047ab]/30 h-full"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square w-full flex items-center justify-center mb-8 px-4 overflow-hidden">
                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                        alt={p.name} 
                      />
                    </div>

                    {/* Metadata */}
                    <div className="space-y-3 mb-8">
                      <Link to={`/product/${p.slug}`} className="block">
                        <h3 className="font-bold text-gray-800 text-[14px] leading-tight line-clamp-1 uppercase tracking-tight group-hover:text-[#0047ab] transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-baseline gap-3">
                        <span className="text-base font-black text-gray-900">${p.price}</span>
                        {idx % 3 === 0 && (
                          <span className="text-[12px] font-medium text-gray-400 line-through">
                            ${(parseFloat(p.price) * 1.2).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-auto grid grid-cols-3 gap-2 relative z-30">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        disabled={addedItems[p.id]}
                        className={cn(
                          "col-span-2 h-10 border text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-90",
                          addedItems[p.id] 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : idx === 0 
                              ? "bg-[#0047ab] border-[#0047ab] text-white hover:bg-black hover:border-black" 
                              : "bg-white border-gray-200 text-gray-800 hover:bg-[#0047ab] hover:text-white hover:border-[#0047ab]"
                        )}
                      >
                        {addedItems[p.id] ? <Check size={16} className="mx-auto" /> : "Add To Cart"}
                      </button>
                      
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className={cn(
                          "h-10 border border-gray-200 flex items-center justify-center transition-all duration-300 active:scale-90",
                          isInWishlist(p.id) ? "text-red-500 border-red-100 bg-red-50" : "text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100"
                        )}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="bs-prev absolute left-[-20px] top-[45%] -translate-y-1/2 z-20 h-12 w-12 bg-white flex items-center justify-center shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 disabled:hidden rounded-sm active:scale-90">
            <ChevronLeft size={20} strokeWidth={2.5} className="text-gray-600" />
          </button>
          <button className="bs-next absolute right-[-20px] top-[45%] -translate-y-1/2 z-20 h-12 w-12 bg-white flex items-center justify-center shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 disabled:hidden rounded-sm active:scale-90">
            <ChevronRight size={20} strokeWidth={2.5} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
