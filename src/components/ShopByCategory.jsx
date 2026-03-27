import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [], loading = false }) {
  // Flatten and filter categories for a clean printer-focused list
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
    <section className="bg-white py-16 md:py-24 w-full border-b border-slate-100 overflow-hidden">
      <div className=" mx-auto px-4 md:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-cyan-500" />
              <span className="text-cyan-600 text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                Elite Selection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Shop By <span className="text-slate-400">Category</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-600 transition-colors group">
              View All Inventory <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex gap-2">
              <button className="cat-prev h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm">
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <button className="cat-next h-12 w-12 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm">
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* --- PREMIUM CATEGORY SLIDER --- */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
              1280: { slidesPerView: 5.5 },
              1600: { slidesPerView: 6.5 },
            }}
            className="!overflow-visible"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col gap-6">
                    <Skeleton className="w-full aspect-[4/5] bg-slate-100/50 rounded-none" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4 bg-slate-100/50 rounded-none" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              subcategories.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      to={`/shop?category=${item.slug}`}
                      className="flex flex-col gap-6 group"
                    >
                      {/* Modern Card Image */}
                      <div className="relative w-full aspect-[4/5] bg-slate-50 overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-slate-200 transition-all duration-500 border border-slate-100">
                        <img 
                          src={getImagePath(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                        />
                        
                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500" />
                        
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-slate-900/80 to-transparent">
                           <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                              Shop Now <ArrowRight size={12} />
                           </div>
                        </div>
                      </div>

                      {/* Label with Refined Typography */}
                      <div className="space-y-1">
                        <h4 className="text-[14px] font-black text-slate-900 group-hover:text-cyan-600 transition-colors uppercase tracking-wider line-clamp-1">
                          {item.name}
                        </h4>
                       
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
