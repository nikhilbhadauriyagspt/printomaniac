import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const [activeId, setActiveId] = useState(null);

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
    <section className="bg-gray-100 py-16 px-4 md:px-10 overflow-hidden font-sans">
      <div className="max-w-[1650px] mx-auto relative">
        
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-[0.15em]">
            CATEGORIES
          </h2>
          <div className="w-20 h-1 bg-[#0047ab] mx-auto mt-4" />
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.cat-prev',
              nextEl: '.cat-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3.5 },
              1280: { slidesPerView: 4.5 },
              1536: { slidesPerView: 5 },
            }}
            className="!pb-4"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link 
                  to={`/shop?category=${item.slug}`}
                  onClick={() => setActiveId(item.id)}
                  className="block"
                >
                  <div className={`bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm transition-all duration-300 relative ${activeId === item.id ? 'ring-0' : ''}`}>
                    
                    {/* Image Area */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-white flex items-center justify-center p-6">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name} 
                        className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>

                    {/* Label Area */}
                    <div className="py-5 text-center border-t border-gray-50 relative bg-white">
                      <span className="text-[11px] font-black text-gray-800 uppercase tracking-widest leading-none block">
                        {item.name}
                      </span>
                      
                      {/* Active Highlight Underline */}
                      {activeId === item.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0047ab]" />
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="cat-prev absolute left-[-20px] top-[40%] -translate-y-1/2 z-20 h-12 w-12 bg-white flex items-center justify-center shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 disabled:hidden rounded-sm">
            <ChevronLeft size={20} strokeWidth={2.5} className="text-gray-600" />
          </button>
          <button className="cat-next absolute right-[-20px] top-[40%] -translate-y-1/2 z-20 h-12 w-12 bg-white flex items-center justify-center shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 disabled:hidden rounded-sm">
            <ChevronRight size={20} strokeWidth={2.5} className="text-gray-600" />
          </button>
        </div>

      </div>
    </section>
  );
}
