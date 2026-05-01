import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SEO from "@/components/SEO";
import API_BASE_URL from "../config";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Zap from "lucide-react/dist/esm/icons/zap";
import Mail from "lucide-react/dist/esm/icons/mail";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { cn } from "../lib/utils";

// Lazy load below-the-fold components
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ShopByCategory = lazy(() => import("@/components/ShopByCategory"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const TripleBanners = lazy(() => import("@/components/TripleBanners"));
const SupportCTA = lazy(() => import("@/components/SupportCTA"));
const TrendingProducts = lazy(() => import("@/components/TrendingProducts"));
const Collections = lazy(() => import("@/components/Collections"));

// Optimized Section Loaders with realistic heights to prevent CLS
const SectionLoader = ({ height = "h-96" }) => (
  <div className={cn("w-full flex items-center justify-center bg-slate-50/30", height)}>
    <div className="w-6 h-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const { categories: globalCategories, products: globalProducts, brands: globalBrands, loading: globalLoading } = useGlobal();
  const [processedData, setProcessedData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    brands: []
  });

  useEffect(() => {
    if (!globalLoading && globalProducts.length > 0) {
      const allowedBrands = ["canon", "epson", "hp", "lexmark"];
      const filteredBrands = globalBrands.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
      
      const allFiltered = globalProducts.filter(p => 
        !p.name.toLowerCase().includes('laptop') && 
        !p.name.toLowerCase().includes('macbook') && 
        !p.name.toLowerCase().includes('notebook') &&
        !p.name.toLowerCase().includes('chromebook') &&
        !p.brand_name?.toLowerCase().includes('brother') &&
        !p.brand_name?.toLowerCase().includes('xerox')
      );
      
      const printers = allFiltered.filter(p => 
        p.name.toLowerCase().includes('printer') || 
        p.name.toLowerCase().includes('laserjet') || 
        p.name.toLowerCase().includes('pixma')
      );
      const accessories = allFiltered.filter(p => 
        p.name.toLowerCase().includes('ink') || 
        p.name.toLowerCase().includes('toner') ||
        p.name.toLowerCase().includes('cable') ||
        p.name.toLowerCase().includes('adapter')
      );

      const shuffled = [...allFiltered].sort(() => 0.5 - Math.random());

      setProcessedData({
        all: allFiltered.slice(0, 18),
        printers,
        accessories,
        mixedArrivals: shuffled.slice(0, 18),
        brands: filteredBrands
      });
    }
  }, [globalLoading, globalProducts, globalBrands]);

  return (
    <div className="bg-white font-jakarta overflow-x-hidden text-slate-900">
      <SEO 
        title="Printo Maniac | Quality Printers & Accessories"
        description="Your trusted source for high-quality printers and professional printing solutions. We provide expert consulting and reliable nationwide delivery across the USA."
      />

      <Hero 
        topSellers={processedData.all.slice(0, 7)} 
        categoryList={globalCategories.flatMap(c => c.children || []).slice(0, 9)} 
      />
      <Features />

      <Suspense fallback={<SectionLoader height="h-[600px]" />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader height="h-[500px]" />}>
        <ShopByCategory categories={globalCategories} loading={globalLoading} />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[300px]" />}>
        <TripleBanners />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[800px]" />}>
        <ProductShowcase 
          products={processedData.all} 
          arrivals={processedData.mixedArrivals} 
          loading={globalLoading} 
        />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[500px]" />}>
        <SupportCTA />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[800px]" />}>
        <TrendingProducts 
          products={processedData.all} 
          loading={globalLoading} 
        />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[400px]" />}>
        <Collections/>
      </Suspense>

      {/* --- HELP & SUPPORT CTA --- */}
      <section className="w-full bg-white py-20 px-4 md:px-10 lg:px-16 border-t border-slate-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-8">
            <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse" />
            <span className="text-blue-700 text-[10px]  uppercase tracking-[0.2em]">Customer Assistance</span>
          </div>
          
          <h2 className="text-[38px] md:text-[48px] text-slate-950  leading-none  mb-6">
            Need Expert <span className="text-blue-700 italic">Guidance?</span>
          </h2>
          
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Our team of printing specialists is ready to help you choose the right hardware for your specific business requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto h-[60px] px-10 bg-slate-950 text-white rounded-2xl  uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95"
            >
              Contact us <Mail size={18} />
            </Link>
            
            <Link 
              to="/faq" 
              className="w-full sm:w-auto h-[60px] px-10 bg-white border-2 border-slate-100 text-slate-950 rounded-2xl  uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:border-blue-800 hover:text-blue-800 transition-all active:scale-95"
            >
              View FAQs <ChevronRight size={18} />
            </Link>
          </div>

         
        </div>
      </section>
       
  </div>
  );
}
