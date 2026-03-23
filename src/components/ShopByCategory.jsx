import React from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
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
    <section className="bg-white py-12 md:py-16 w-full overflow-hidden font-jakarta">
      <div className="w-full px-4 md:px-6 lg:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Shop by <span className="text-blue-600">Category</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">Explore our wide range of printing solutions</p>
          </div>
          
          <div className="flex gap-2">
            <button className="cat-prev h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm">
              <ChevronLeft size={18} />
            </button>
            <button className="cat-next h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-20 shadow-sm">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* --- COMPACT CARDS CAROUSEL --- */}
        <div className="relative group/carousel">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 4.2 },
              1024: { slidesPerView: 5.2 },
              1280: { slidesPerView: 6.2 },
            }}
            className="!overflow-visible"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  className="block group"
                >
                  <div className="flex flex-col gap-4">
                    {/* Compact Card Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-blue-100 transition-colors duration-300">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300" />
                      
                      {/* Go Icon */}
                      <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-blue-600">
                        <MoveRight size={14} />
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 px-2">
                        {item.name}
                      </h4>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
