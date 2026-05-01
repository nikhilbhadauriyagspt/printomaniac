import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

// Banner and promo images
import promo1 from "../assets/bannerr/exp1.avif";
import promo2 from "../assets/bannerr/exp2.avif";
import promo3 from "../assets/bannerr/exp3.avif";
import promo4 from "../assets/bannerr/exp4.avif";

// Local banner images (using public paths for LCP optimization)
const banner1 = "/assets/bannerr/21.avif";
const banner2 = "/assets/bannerr/22.avif";

const slides = [
  {
    id: 1,
    image: banner1,
    alt: "Printer Banner 1",
    title: "High-Quality Printers for Every Need",
    price: "Starting at $199",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    image: banner2,
    alt: "Printer Banner 2",
    title: "Smarter Printing for Home & Office",
    price: "From $249",
    buttonText: "Shop Now",
  },
];

const promos = [
  {
    id: 1,
    title: "Home Printers",
    price: "from $199",
    image: promo1,
  },
  {
    id: 2,
    title: "Inkjet Printers",
    price: "from $249",
    image: promo2,
  },
  {
    id: 3,
    title: "Office Printers",
    price: "from $499",
    image: promo3,
  },
  {
    id: 4,
    title: "Printer Accessories",
    price: "from $39",
    image: promo4,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="w-full bg-[#f3f3f5] pb-5">
      <div className="mx-auto max-w-[2560px]">
        <div className="relative bg-white overflow-hidden w-full aspect-[1920/850] sm:aspect-[1920/850] min-h-[200px] sm:min-h-[300px] lg:min-h-0">
          {slides.map((slide, idx) => (
            <Link
              key={slide.id}
              to="/shop"
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                width="1920"
                height="850"
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx < 2 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain sm:object-cover"
              />
              
              {/* Optional Overlay for better text readability if added later */}
              <div className="absolute inset-0 bg-black/5" />
            </Link>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.preventDefault(); prevSlide(); }}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/80 text-slate-900 hover:bg-white transition-all shadow-lg hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); nextSlide(); }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-4 rounded-full bg-white/80 text-slate-900 hover:bg-white transition-all shadow-lg hidden md:block"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); setCurrent(idx); }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  idx === current ? "bg-blue-800 w-6 sm:w-10" : "bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM PROMO CARDS */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-3 sm:px-4 lg:px-5">
          {promos.map((item) => (
            <Link
              key={item.id}
              to="/shop"
              className="relative h-[140px] sm:h-[180px] lg:h-[150px] xl:h-[170px] 2xl:h-[220px] overflow-hidden rounded-sm bg-white group"
            >
              <img
                src={item.image}
                alt={item.title}
                width="450"
                height="280"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;