import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

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
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Printer Brother | Premium Printers & Hardware" 
        description="Premium destination for professional printers, and essential accessories. Delivering excellence in professional solutions across the USA."
      />
      
      <Hero />
      <Features />
      <ShopByCategory categories={data.categories} />
      
      <BestSellers products={data.all} />
      
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />
       <Collections />
      <CategorySlider 
        title="Office Printers"  
        products={data.printers} 
      />
       
      {/* --- MODERN CONTACT CTA SECTION --- */}
      <section className="py-24 bg-[#f9f9f9] border-t border-gray-100">
        <div className="max-w-[1650px] mx-auto px-6">
          <div className="bg-white border border-gray-200 p-12 md:p-20 text-center relative overflow-hidden group">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#0047ab]" />
            
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight italic">
                  Need help with your <span className="text-[#0047ab]">printing setup?</span>
                </h2>
                <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                  Our experts are ready to provide simple and reliable advice to help you pick the best professional tools for your office environment.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link 
                  to="/contact" 
                  className="bg-black hover:bg-[#0047ab] text-white px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
                >
                  Consult An Expert
                </Link>
                <Link 
                  to="/faq" 
                  className="border border-gray-200 hover:border-black text-gray-900 px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                >
                  Visit Help Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>    </div>
    
  );
  
}
