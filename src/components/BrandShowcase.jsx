import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=312e81&bold=true`;
  };

  if (brands.length === 0) return null;

  // Duplicate brands for seamless infinite loop
  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-20 bg-white font-urbanist relative overflow-hidden">
      
      <div className="max-w-[1920px] mx-auto relative z-10 px-6 md:px-10">
        
        {/* --- MINIMALIST HEADER --- */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight uppercase">
            Official Partners
          </h2>
          <p className="mt-2 text-slate-400 text-sm font-bold tracking-wide">
            We directly collaborate with global leaders to provide authentic printer and reliable supplies.
          </p>
        </div>

        {/* --- INFINITE SQUARE MARQUEE --- */}
        <div className="relative w-full overflow-hidden py-4 group/marquee">
          <div className="flex animate-marquee-brands whitespace-nowrap gap-6 items-center hover:[animation-play-state:paused]">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="inline-flex shrink-0 group transition-all duration-500"
              >
                {/* Square Quality Node - Increased Size */}
                <div className="h-28 w-48 md:h-36 md:w-64 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-6 md:p-10 transition-all duration-500 group-hover:border-blue-600/20 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-black/5 relative overflow-hidden">
                  <img 
                    src={getBrandLogo(brand)} 
                    alt={brand.name} 
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 scale-110 group-hover:scale-125" 
                  />
                  
                  {/* Subtle Brand Name Overlay on Hover */}
                  <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{brand.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Fade Overlays for cinematic feel */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>

      </div>

      <style>{`
        .animate-marquee-brands {
          animation: marquee-scroll 40s linear infinite;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
