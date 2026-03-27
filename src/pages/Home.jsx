import Hero from "@/components/Hero";
import TopShowcase from "@/components/TopShowcase";
import SEO from "@/components/SEO";
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
        title="My Printer Store | Quality Printers & Printer"
        description="Your trusted source for high-quality printers and printing printer. Delivering excellence across the USA."
      />

      <Hero />

      {/* --- PREMIUM FEATURES SECTION --- */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className=" mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-5 group p-4 hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100">
              <div className="h-14 w-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wider mb-1">Global Shipping</h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">Fast & reliable delivery to your doorstep worldwide.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 group p-4 hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100">
              <div className="h-14 w-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <Shield size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wider mb-1">Secure Checkout</h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">100% protected payments with industry-standard.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 group p-4 hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100">
              <div className="h-14 w-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <Layers size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wider mb-1">Elite Inventory</h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">A curated collection of high-performance printing .</p>
              </div>
            </div>

            <div className="flex items-center gap-5 group p-4 hover:bg-slate-50 transition-colors duration-300 border border-transparent hover:border-slate-100">
              <div className="h-14 w-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <RefreshCw size={28} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-slate-900 uppercase tracking-wider mb-1">Easy Returns</h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">Hassle-free 30-day return policy for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShopByCategory categories={data.categories} loading={data.loading} />
      <BestSellers products={data.all} loading={data.loading} />
      <TripleBanners />
      
     
      <ProductGrid products={data.mixedArrivals.slice(0, 18)} loading={data.loading} />
       <Collections />
      <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
        loading={data.loading}
      />
       
  </div>
  );
}
