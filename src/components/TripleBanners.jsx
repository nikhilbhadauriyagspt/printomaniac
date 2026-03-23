import React from 'react';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Assets
import banner1 from '@/assets/bannerr/banner4.jpg';
import banner2 from '@/assets/bannerr/banner5.jpg';
import banner3 from '@/assets/bannerr/banner6.jpg';

const TripleBanners = () => {
  const banners = [
    {
      title: "Business Elite",
      highlight: "Laser Precision",
      image: banner1,
      link: "/shop?category=laser-printers",
      bg: "bg-blue-600"
    },
    {
      title: "Creative Studio",
      highlight: "Inkjet Brilliance",
      image: banner2,
      link: "/shop?category=inkjet-printers",
      bg: "bg-slate-900"
    },
    {
      title: "Modern Office",
      highlight: "Smart Wireless",
      image: banner3,
      link: "/shop",
      bg: "bg-blue-800"
    }
  ];

  return (
    <section className="bg-white py-10 font-jakarta overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto lg:h-[320px]">
          {banners.map((banner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-[250px] lg:h-full overflow-hidden group shadow-sm"
            >
              <Link to={banner.link} className="block w-full h-full">
                {/* Background Image */}
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-start z-10">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-3 px-2 py-1 border border-blue-400/30 rounded-md backdrop-blur-sm">
                    {banner.highlight}
                  </span>
                  <h3 className="text-white text-2xl lg:text-3xl font-black leading-tight mb-4 max-w-[200px]">
                    {banner.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Explore Now <MoveRight size={16} className="transition-transform group-hover:translate-x-2" />
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

export default TripleBanners;
