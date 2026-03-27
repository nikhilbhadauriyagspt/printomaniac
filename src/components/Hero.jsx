import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

// Assets
import banner1 from '@/assets/bannerr/banner6.png'; 
import banner2 from '@/assets/bannerr/newban2.png';
import banner3 from '@/assets/bannerr/banner4.jpg';


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const mainSlides = [
    { 
      id: 1, 
      image: banner2, 
      link: "/shop",
      tag: "Enterprise Solutions",
      title: "Pro-Series Laser Printers",
    },
    { 
      id: 2, 
      image: banner1, 
      link: "/shop",
      tag: "Best for Office",
      title: "Efficient Workgroup Models",
    }
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
  }, [mainSlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + mainSlides.length) % mainSlides.length);
  }, [mainSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 35 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 35 },
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto px-4 md:px-8 pb-6 md:pb-30 pt-15">
        <div className="h-[500px] md:h-[600px] lg:h-[600px] grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* --- LEFT SIDE: LARGE SLIDER (3/4 Width) --- */}
          <div className="lg:col-span-3 relative overflow-hidden bg-slate-100 group shadow-lg shadow-slate-200/50">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Link to={mainSlides[currentSlide].link} className="relative block w-full h-full">
                  <img
                    src={mainSlides[currentSlide].image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-[10s] ease-linear "
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 hidden md:block" />
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 bottom-10 flex justify-between ml-280 items-end px-8 md:px-16 lg:px-20 z-20">
               
               
               <div className="flex gap-3">
                  <button
                    onClick={(e) => { e.preventDefault(); prevSlide(); }}
                    className="h-12 w-12 flex items-center justify-center bg-black/30 hover:bg-white text-white hover:text-slate-900 transition-all duration-300 backdrop-blur-md border border-white/10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); nextSlide(); }}
                    className="h-12 w-12 flex items-center justify-center bg-black/30 hover:bg-white text-white hover:text-slate-900 transition-all duration-300 backdrop-blur-md border border-white/10"
                  >
                    <ChevronRight size={24} />
                  </button>
               </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: SMALLER STATIC BANNER (1/4 Width) --- */}
          <div className="hidden lg:flex flex-col gap-4 md:gap-6 lg:col-span-1">
             <div className="flex-1 relative bg-slate-900 overflow-hidden group shadow-lg shadow-slate-200/50">
                <Link to="/shop" className="block w-full h-full relative group">
                   <img 
                     src={banner3} 
                     alt="Accessories" 
                     className="w-full h-full object-cover  duration-1000"
                   />
                   <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent">
                      <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                        <div className="h-px w-4 bg-cyan-400" /> Supplies
                      </span>
                      <h3 className="text-white text-2xl font-black mb-4 leading-tight">Ink & Toner Cartridges</h3>
                      <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                         Browse Store <ArrowRight size={14} />
                      </div>
                   </div>
                </Link>
               
             </div>

             <div className="bg-slate-700 p-8 relative overflow-hidden group shadow-lg shadow-slate-200/50 min-h-[180px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <h4 className="text-white text-xl font-black mb-2 relative z-10">Need Assistance?</h4>
                <p className="text-slate-100  text-sm mb-6 relative z-10 leading-relaxed">Our experts are ready to help you choose the right printer.</p>
                <Link to="/contact" className="text-cyan-500 text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors relative z-10">
                   Get Support <ArrowRight size={14} />
                </Link>
             </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Hero;
