import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import TripleBanners from "@/components/TripleBanners";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import bannerImg from "../assets/bannerr/banner6.jpg";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-jakarta overflow-x-hidden text-slate-900">
      <SEO 
        title="Axel Printing | Quality Printers & Hardware"
        description="Your trusted source for high-quality printers and printing hardware. Delivering excellence across the USA."
      />

      <Hero />
      <Features />

      <ShopByCategory categories={data.categories} />
      <TripleBanners />
      <BestSellers products={data.all} />
      <Collections />
      <ProductGrid products={data.mixedArrivals.slice(0, 18)} />
      
      <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
      />
       
     {/* --- COMPACT MINIMAL CONTACT CTA --- */}
      <section className="py-16 bg-white font-jakarta">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="relative rounded-2xl p-8 md:p-12 text-center bg-slate-50 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="text-left space-y-2 max-w-md">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-600">
                Support Excellence
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Need expert guidance?
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Our friendly team is always here to help you with any questions or advice you need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to="/contact"
                className="bg-blue-600 text-white px-8 h-12 flex items-center justify-center rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-blue-700 shadow-md shadow-blue-600/20 whitespace-nowrap"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="bg-white border border-slate-200 text-slate-700 px-8 h-12 flex items-center justify-center rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap"
              >
                View FAQ
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
