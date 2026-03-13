import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

import banner2 from '@/assets/bannerr/2.png';
import banner3 from '@/assets/bannerr/3.png';
import banner4 from '@/assets/bannerr/4.png';

const slides = [
  {
    id: 2,
    title: "", // No content for banner 2
    subtitle: "",
    image: banner2,
    tag: "",
    link: "/shop",
    hasContent: false
  },
  {
    id: 3,
    title: "ECO-TANK EFFICIENCY",
    subtitle: "Maximize productivity while minimizing waste. Ultra-low cost per page with high-capacity integrated ink tanks.",
    image: banner3,
    tag: "Smart Saving",
    link: "/shop",
    hasContent: true
  },
  {
    id: 4,
    title: "ENTERPRISE LASER FORCE",
    subtitle: "Uncompromising speed and professional precision. Designed for high-volume environments that demand the sharpest text.",
    image: banner4,
    tag: "Business Elite",
    link: "/shop",
    hasContent: true
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full bg-white mt-[60px] pb-10">
      <div className="w-full mx-auto">
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[3/1] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {slides[current].hasContent ? (
                <>
                  <img 
                    src={slides[current].image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center">
                    <div className="px-8 md:px-16 w-full lg:w-2/3">
                      <div className="space-y-2 md:space-y-4 text-white">
                        <div className="inline-block bg-[#ffb700] text-[#003b95] px-3 py-0.5 text-[9px] font-black uppercase tracking-[0.2em]">
                          {slides[current].tag}
                        </div>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tighter">
                          {slides[current].title}
                        </h2>
                        <p className="text-white text-xs md:text-base font-medium max-w-md leading-relaxed opacity-90 hidden md:block">
                          {slides[current].subtitle}
                        </p>
                        <div className="pt-2">
                          <Link 
                            to={slides[current].link} 
                            className="inline-flex items-center gap-2 bg-[#ffb700] hover:bg-white text-black px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95"
                          >
                            Shop Now <ArrowRight size={14} strokeWidth={3} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link to={slides[current].link} className="block w-full h-full">
                  <img 
                    src={slides[current].image} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Manual Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/20 hover:bg-[#ffb700] text-white hover:text-[#003b95] flex items-center justify-center transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/20 hover:bg-[#ffb700] text-white hover:text-[#003b95] flex items-center justify-center transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1 transition-all duration-300 ${current === idx ? "w-8 bg-[#ffb700]" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
