import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const TopShowcase = ({ products = [] }) => {
  // Take products for the slider
  const featured = products.slice(0, 15);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <section className="bg-white py-10 w-full border-b border-gray-100">
      <div className="w-full relative group px-4 md:px-10">
        
        {/* Navigation Arrows */}
        <button className="ts-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <ChevronLeft size={24} />
        </button>
        <button className="ts-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight size={24} />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.ts-prev',
            nextEl: '.ts-next',
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            1024: { slidesPerView: 1.8 },
            1280: { slidesPerView: 2.2 },
            1600: { slidesPerView: 2.5 },
          }}
          className="w-full"
        >
          {featured.map((p) => (
            <SwiperSlide key={p.id}>
              <Link 
                to={`/product/${p.slug}`}
                className="bg-gray-50 p-5 border border-gray-100 shadow-sm hover:border-blue-500 hover:bg-white transition-all flex items-center gap-6 rounded-xl group h-[180px]"
              >
                {/* Landscape Image Section (Left) */}
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg bg-white p-3 flex items-center justify-center shrink-0 shadow-sm">
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                
                {/* Details Section (Right) */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] md:text-[14px] font-bold text-slate-800 line-clamp-2 uppercase tracking-tight leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                        {p.name}
                    </h3>
                    <p className="text-xl font-black text-slate-900 mb-3">${p.price}</p>
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600 group-hover:translate-x-1 transition-transform">
                        Details <ArrowRight size={12} />
                    </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopShowcase;
