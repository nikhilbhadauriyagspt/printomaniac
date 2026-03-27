import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  X,
  Loader2,
  SlidersHorizontal,
  Package,
  Heart,
  ChevronDown,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="Shop Collections | My Printer Store" 
        description="Browse our curated selection of high-performance printers and professional printer."
      />

      {/* --- PREMIUM PAGE HEADER --- */}
      <section className="pt-20 pb-12 px-4 md:px-10 lg:px-16 border-b border-slate-100 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-cyan-500" />
              <span className="text-cyan-600 text-[11px] font-black uppercase tracking-[0.4em]">Professional Inventory</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none ">
              Elite <span className="text-slate-400">Collections</span>
            </h1>
            <p className="text-slate-500 text-sm font-bold  tracking-widest max-w-xl">
              Precision-engineered printing solutions curated for enterprise and professional environments.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                <Package size={14} /> {products.length} Solutions available
             </div>
             <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar max-w-full">
                <button 
                  onClick={() => updateFilter('category', '')}
                  className={cn(
                    "h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border",
                    !category ? "bg-slate-900 text-white border-slate-900 " : "bg-white text-slate-400 border-slate-100 hover:border-cyan-500 hover:text-cyan-600"
                  )}
                >
                  All Gear
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id} 
                    onClick={() => updateFilter('category', cat.slug)}
                    className={cn(
                      "h-12 px-8 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ",
                      category === cat.slug ? "bg-cyan-500 text-slate-900" : "bg-white text-slate-400 border-slate-100 hover:border-cyan-500 hover:text-cyan-600"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* --- NAVIGATION & SEARCH TOOLBAR --- */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-10 lg:px-16 py-4 shadow-sm shadow-slate-100/50">
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Elite Search Box */}
          <div className="flex-1 min-w-[280px]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-cyan-500 transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                placeholder="SEARCH PREMIUM MODELS..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-12 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Controls Cluster */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden h-12 px-6 flex items-center justify-center gap-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-100 font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl h-12 px-5 hover:bg-white hover:border-cyan-500/50 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-3 border-r border-slate-200 pr-3">Sort</span>
              <select 
                value={sort} 
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-transparent text-[11px] font-black uppercase tracking-widest cursor-pointer outline-none appearance-none pr-8"
              >
                <option value="newest">Latest arrivals</option>
                <option value="price_low">Price: low to high</option>
                <option value="price_high">Price: high to low</option>
                <option value="name_asc">Alphabetical</option>
              </select>
              <div className="absolute right-4 pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID SYSTEM --- */}
      <section className="px-4 md:px-10 lg:px-16 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative h-20 w-20 flex items-center justify-center">
               <Loader2 className="animate-spin h-full w-full text-cyan-500" strokeWidth={1} />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Package size={24} className="text-slate-200" />
               </div>
            </div>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Syncing Inventory</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40 bg-slate-50 rounded-3xl border border-slate-100 max-w-4xl mx-auto">
            <div className="h-20 w-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-slate-200/50">
               <Package size={32} strokeWidth={1.5} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 mb-4">No matching Printer</h2>
            <p className="text-slate-500 text-sm font-medium mb-10">Adjust your search parameters to find the perfect solution.</p>
            <button 
              onClick={() => navigate('/shop')} 
              className="bg-slate-900 text-white px-12 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-cyan-500 shadow-2xl shadow-slate-900/10 active:scale-95"
            >
              Reset Protocol
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
            {products.map((p, index) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 6) * 0.05 }}
                viewport={{ once: true }}
                className="group flex flex-col h-full relative"
              >
                {/* Elite Product Card */}
                <div className="relative aspect-square w-full mb-6 flex items-center justify-center overflow-hidden rounded-3xl bg-white border border-slate-100 group-hover:border-cyan-500/30 group-hover:shadow-2xl group-hover:shadow-slate-200/60 transition-all duration-500">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="max-h-[75%] max-w-[75%] object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  
                  {/* Floating Action: Wishlist */}
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                    className={cn(
                      "absolute top-4 right-4 z-20 h-10 w-10 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-all duration-300 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:scale-110",
                      isInWishlist(p.id) ? "text-red-500" : "text-slate-300 hover:text-cyan-600"
                    )}
                  >
                    <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>

                  {/* High-Impact Quick Add */}
                  <button 
                    onClick={(e) => handleAddToCart(e, p)}
                    className="absolute inset-x-0 bottom-0 z-20 h-14 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-cyan-600"
                  >
                    <ShoppingBag size={16} /> Quick Add
                  </button>
                </div>

                {/* Details Typography */}
                <div className="flex-1 flex flex-col px-2">
                 
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-black text-slate-800 group-hover:text-cyan-600 transition-colors uppercase tracking-wider line-clamp-2 mb-4 leading-tight">
                      {p.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[14px] font-black text-slate-900 tracking-tight">${p.price}</span>
                       <span className="text-[9px] font-bold text-slate-300 line-through tracking-widest">${(parseFloat(p.price) * 1.2).toFixed(2)}</span>
                    </div>
                    
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-all">
                       <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* --- ELITE MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[110] lg:hidden flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-900 text-white p-8 pb-10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex justify-between items-center relative z-10">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Printer Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X size={20} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 pt-10">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                       <div className="h-px w-4 bg-slate-200" /> Technology Groups
                    </h4>
                    <div className="grid gap-3">
                      <button 
                        onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                        className={cn(
                          "w-full text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all border", 
                          !category ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" : "bg-slate-50 text-slate-600 border-transparent hover:bg-white hover:border-slate-200"
                        )}
                      >
                        All Printer
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.id} 
                          onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                          className={cn(
                            "w-full text-left px-6 py-4 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all border", 
                            category === cat.slug ? "bg-cyan-500 text-slate-900 border-cyan-500 shadow-lg shadow-cyan-100" : "bg-slate-50 text-slate-600 border-transparent hover:bg-white hover:border-slate-200"
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100">
                  <button 
                    onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                    className="w-full h-14 bg-slate-100 text-slate-900 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Clear All Filters
                  </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

