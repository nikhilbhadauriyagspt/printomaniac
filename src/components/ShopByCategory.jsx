import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
  const filteredCategories = categories.filter(cat => {
    const name = cat.name.toLowerCase();
    const slug = cat.slug.toLowerCase();
    return !name.includes('laptop') && 
           !slug.includes('laptop') && 
           !name.includes('computer') && 
           !name.includes('pc') &&
           !name.includes('chromebook') &&
           !name.includes('notebook');
  });

  const subcategories = filteredCategories
    .flatMap(parent => parent.children || [])
    .filter(sub => {
      const name = sub.name.toLowerCase();
      const slug = sub.slug.toLowerCase();
      return !name.includes('laptop') && 
             !slug.includes('laptop') && 
             !name.includes('computer') && 
             !name.includes('pc');
    });

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return "https://via.placeholder.com/400x400?text=Category";
  };

  return (
    <section className="bg-white py-16 md:py-20 w-full overflow-hidden border-t border-slate-50">
      <div className="w-full px-4 md:px-8">
        
        {/* --- LEFT-ALIGNED HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="flex-1 text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[2px] mb-4"
            >
              <LayoutGrid size={12} className="fill-current" />
              Explore Collections
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none"
            >
              Shop by <span className="text-blue-600">Category.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 font-bold mt-4 max-w-xl text-xs md:text-sm leading-relaxed"
            >
              Browse our high-end inventory of precision-engineered printers and professional-grade supplies.
            </motion.p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="cat-prev-premium h-11 w-11 flex items-center justify-center rounded-full bg-slate-50 text-slate-900 border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95 group">
              <ChevronLeft size={20} />
            </button>
            <button className="cat-next-premium h-11 w-11 flex items-center justify-center rounded-full bg-slate-900 text-white border border-slate-900 hover:bg-blue-600 hover:border-blue-600 transition-all shadow-md shadow-slate-200 active:scale-95 group">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- MODERN MINIMALIST CATEGORY SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={12}
            slidesPerView={3.2}
            navigation={{
              prevEl: '.cat-prev-premium',
              nextEl: '.cat-next-premium',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: { slidesPerView: 4.2 },
              640: { slidesPerView: 5.2 },
              768: { slidesPerView: 6.2 },
              1024: { slidesPerView: 8.2 },
              1280: { slidesPerView: 10.2 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col items-center gap-3">
                    <Skeleton className="w-full aspect-square rounded-full bg-slate-100" />
                    <Skeleton className="h-3 w-16 bg-slate-100" />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    viewport={{ once: true }}
                    className="group/card"
                  >
                    <Link 
                      to={`/shop?category=${item.slug}`}
                      className="flex flex-col items-center"
                    >
                      {/* Circular Image Container */}
                      <div className="relative w-full aspect-square rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/card:border-blue-600 group-hover/card:bg-white group-hover/card:shadow-xl group-hover/card:shadow-blue-100 group-hover/card:-translate-y-1">
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover/card:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                        
                        {/* Decorative Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-blue-600 scale-0 group-hover/card:scale-105 opacity-0 group-hover/card:opacity-20 transition-all duration-500" />
                      </div>

                      {/* Minimal Label */}
                      <div className="mt-4 text-center">
                        <h4 className="text-[10px] md:text-[11px] font-black text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest leading-tight">
                          {item.name}
                        </h4>
                        <div className="h-0.5 w-0 mx-auto bg-blue-600 group-hover/card:w-4 transition-all duration-300 mt-1" />
                      </div>
                    </Link>
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
