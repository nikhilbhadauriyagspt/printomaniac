import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

// Assets
import png1 from '@/assets/bannerr/png-1.png';
import png2 from '@/assets/bannerr/png-2.png';
import png3 from '@/assets/bannerr/png-3.png';
import banner2 from '@/assets/bannerr/newban2.jpg';
import banner3 from '@/assets/bannerr/newban3.jpg';
import banner4 from '@/assets/bannerr/banner10.jpg';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Printing",
      subtitle: "Elite Series 2026",
      desc: "Experience next-generation precision with our flagship digital printers. Engineered for high-volume output with uncompromising detail and vibrant color accuracy.",
      image: png1,
      bg: "bg-gradient-to-br from-blue-200 via-blue-50 to-blue-500"
    },
    {
      id: 2,
      title: "High-Speed Laser",
      subtitle: "Professional Quality",
      desc: "Redefining efficiency for the modern high-end workspace. Our laser technology delivers crisp text and professional graphics at industry-leading speeds.",
      image: png2,
      bg: "bg-gradient-to-br from-blue-200 via-blue-50 to-blue-500"
    },
    {
      id: 3,
      title: "Ultimate Inkjet",
      subtitle: "Vivid Color Tech",
      desc: "Where heritage meets the future of printer in every print. Perfect for photographers and designers who demand the widest color gamut and deepest blacks.",
      image: png3,
      bg: "bg-gradient-to-br from-blue-200 via-white to-blue-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="w-full h-[75vh] bg-white mt-10 px-4 md:px-6 lg:px-10 pb-6">
      <div className="flex flex-col lg:flex-row gap-4 h-full font-jakarta">
        
        {/* Main Large Banner (Left) - Slider with Color BG */}
        <div className="w-full lg:w-2/3 h-full relative overflow-hidden group shadow-sm border border-blue-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 ${slides[currentSlide].bg} flex items-center px-8 md:px-16`}
            >
              {/* Text Side (Left) */}
              <div className="w-1/2 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-blue-600 font-extrabold text-[10px] uppercase tracking-[0.4em] mb-4 block">
                    {slides[currentSlide].subtitle}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-slate-600 text-base md:text-lg font-medium mb-8 max-w-sm hidden md:block leading-relaxed">
                    {slides[currentSlide].desc}
                  </p>
                  <Link 
                    to="/shop" 
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-600/20"
                  >
                    Shop Collection <MoveRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* PNG Side (Right) - Slide in from Right Animation */}
              <div className="w-1/2 h-full relative flex items-center justify-center">
                <motion.div
                  key={`img-${currentSlide}`}
                  initial={{ opacity: 0, x: 100, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                  }}
                  className="relative z-10 w-full h-full flex items-center justify-center"
                >
                  <img
                    src={slides[currentSlide].image}
                    alt="Product"
                    className="max-h-[80%] max-w-full object-contain drop-shadow-[0_20px_50px_rgba(37,99,235,0.2)]"
                  />
                </motion.div>
                
                {/* Decorative background element */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-400/10 rounded-full blur-[100px] -z-10" 
                />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-12 flex gap-3 z-20">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className="group py-2"
              >
                <div className={`h-1 rounded-full transition-all duration-700 ${currentSlide === i ? 'w-12 bg-blue-600' : 'w-4 bg-blue-600/20 group-hover:bg-blue-600/40'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Side Banners (Right) - Ads Style */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 h-full">
          {[
            { img: banner2, tag: "New Arrival", title: "Smart Office Wireless Printers", delay: 0.2 },
            { img: banner3, tag: "Pro Choice", title: "High-Volume Precision Inks", delay: 0.3 },
            { img: banner4, tag: "Sale", title: "Exclusive 20% Off On Hardware", delay: 0.4 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="relative flex-1 overflow-hidden group shadow-sm"
            >
              <Link to="/shop" className="block w-full h-full">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Darker left-aligned gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-center items-start z-10">
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 px-2 py-0.5 border border-blue-400/30 rounded-sm">
                    {item.tag}
                  </span>
                  <h3 className="text-white text-lg font-extrabold leading-tight mb-3 max-w-[180px]">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Shop Now <MoveRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
