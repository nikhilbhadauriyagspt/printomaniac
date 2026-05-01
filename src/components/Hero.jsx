import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Smartphone from "lucide-react/dist/esm/icons/smartphone";
import Laptop from "lucide-react/dist/esm/icons/laptop";
import Headphones from "lucide-react/dist/esm/icons/headphones";
import Camera from "lucide-react/dist/esm/icons/camera";
import Tv from "lucide-react/dist/esm/icons/tv";
import Refrigerator from "lucide-react/dist/esm/icons/refrigerator";
import Gamepad2 from "lucide-react/dist/esm/icons/gamepad-2";
import Dumbbell from "lucide-react/dist/esm/icons/dumbbell";
import Bike from "lucide-react/dist/esm/icons/bike";
import Printer from "lucide-react/dist/esm/icons/printer";
import ScanLine from "lucide-react/dist/esm/icons/scan-line";
import Package from "lucide-react/dist/esm/icons/package";
import Wrench from "lucide-react/dist/esm/icons/wrench";

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

const categories = [
  { id: 1, name: "Inkjet Printers", icon: Printer },
  { id: 2, name: "Laser Printers", icon: Laptop },
  { id: 3, name: "All-in-One Printers", icon: ScanLine },
  { id: 4, name: "Photo Printers", icon: Camera },
  { id: 5, name: "Thermal Printers", icon: Package },
  { id: 6, name: "Office Printers", icon: Tv },
  { id: 7, name: "Printer Accessories", icon: Wrench },
  { id: 8, name: "Home Printers", icon: Smartphone },
  { id: 9, name: "Supertank Printers", icon: Headphones },
];

const topSellers = [
  {
    id: 1,
    title: "Canon PIXMA G3010",
    price: "$317.41",
    image: promo1,
  },
  {
    id: 2,
    title: "HP Smart Tank 580",
    price: "$688.45",
    image: promo2,
  },
  {
    id: 3,
    title: "Epson EcoTank L3250",
    price: "$399.00",
    image: promo3,
  },
  {
    id: 4,
    title: "Brother DCP-T420W",
    price: "$289.00",
    image: promo4,
  },
  {
    id: 5,
    title: "Printer Ink Bundle",
    price: "$44.03",
    image: promo1,
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

const Hero = ({ topSellers: dynamicTopSellers = [], categoryList = [] }) => {
  const [current, setCurrent] = useState(0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  const getThumbnailPath = (images) => {
    const original = getImagePath(images);
    if (original.includes('placeholder') || original.startsWith('http')) return original;
    return original.replace(/\.png$/, '-150x150.png');
  };

  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("inkjet")) return Printer;
    if (lowerName.includes("laser")) return Laptop;
    if (lowerName.includes("all-in-one")) return ScanLine;
    if (lowerName.includes("photo")) return Camera;
    if (lowerName.includes("thermal")) return Package;
    if (lowerName.includes("office")) return Tv;
    if (lowerName.includes("accessory")) return Wrench;
    if (lowerName.includes("home")) return Smartphone;
    if (lowerName.includes("supertank")) return Headphones;
    return Printer;
  };

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
    <section className="w-full bg-[#f3f3f5] py-5 lg:py-6">
      <div className="mx-auto max-w-[1950px] px-3 sm:px-4 lg:px-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[295px_minmax(0,1fr)_265px]">
          {/* LEFT CATEGORY */}
          <aside className="hidden xl:block bg-white rounded-sm border border-[#e5e7eb] overflow-hidden h-[526px]">
            <div className="flex flex-col h-full">
              {(categoryList.length > 0 ? categoryList : categories).slice(0, 9).map((item) => {
                const RawIcon = item.icon;
                const Icon = (RawIcon && (typeof RawIcon === 'function' || typeof RawIcon === 'object')) 
                  ? RawIcon 
                  : getIcon(item.name);
                
                return (
                  <Link
                    key={item.id}
                    to={`/shop?category=${item.slug}`}
                    className="flex items-center justify-between px-4 py-[15px] text-left border-b border-[#ededed] hover:bg-[#f8f8f8] transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon size={19} className="text-[#7a7a7a] group-hover:text-blue-800 shrink-0 transition-colors" />
                      <span className="text-[14px] font-medium text-[#5b5b5b] group-hover:text-blue-800 truncate transition-colors uppercase tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight size={14} className="text-[#a1a1aa] group-hover:text-blue-800 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* CENTER HERO */}
          <div className="relative bg-white rounded-sm overflow-hidden h-[320px] sm:h-[420px] lg:h-[526px]">
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
                  width="1200"
                  height="526"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
            ))}

          </div>

          {/* RIGHT TOP SELLERS */}
          <aside className="hidden xl:block bg-white rounded-sm border border-[#e5e7eb] h-[526px] overflow-hidden">
            <div className="h-full px-6 py-6">
              <h3 className="text-[22px] font-semibold text-[#1f2937] mb-4 uppercase tracking-tight">
                Top Sellers
              </h3>

              <div className="space-y-0">
                {(dynamicTopSellers.length > 0 ? dynamicTopSellers : topSellers).map((item, index) => (
                  <Link
                    key={item.id}
                    to={item.slug ? `/product/${item.slug}` : "/shop"}
                    className="grid grid-cols-[28px_1fr_42px] items-center gap-3 py-2 border-b border-[#ededed] last:border-b-0 group"
                  >
                    <div className="text-[22px] leading-none font-light text-[#a3a3a3] group-hover:text-blue-800 transition-colors">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-[13px] font-medium text-[#5b5b5b] group-hover:text-blue-800 transition-colors uppercase tracking-tight">
                        {item.name || item.title}
                      </h4>
                      <p className="text-[15px] leading-none font-bold text-[#111827] mt-0.5">
                        ${item.price}
                      </p>
                    </div>

                    <div className="h-9 w-9 rounded-lg bg-[#f7f7f7] overflow-hidden flex items-center justify-center border border-gray-100 group-hover:border-blue-200 transition-colors">
                      <img
                        src={item.images ? getThumbnailPath(item.images) : item.image}
                        onError={(e) => { e.target.onerror = null; e.target.src = item.images ? getImagePath(item.images) : item.image; }}
                        alt={item.name || item.title}
                        width="36"
                        height="36"
                        loading={index < 3 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                        className="h-full w-full object-contain p-0.5 group-hover:scale-110 transition-transform"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM PROMO CARDS */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {promos.map((item, index) => (
            <Link
              key={item.id}
              to="/shop"
              className="relative h-[220px] overflow-hidden rounded-sm bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                width="450"
                height="280"
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover  ${
                  index === 2 ? "" : ""
                }`}
              />
              <div className="absolute inset-0  pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;