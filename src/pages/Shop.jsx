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
  Eye,
  Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [hoveredId, setHoveredId] = useState(null);
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
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
    
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          setBrands(d.data);
        }
      });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
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
  }, [searchParams, pathCategory, pathBrand, navigate]);

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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden pt-20">
      <SEO 
        title="Shop Collections | Axel Printing" 
        description="Browse our curated selection of high-performance printers and professional printer."
      />

      {/* --- CLEAN HEADER --- */}
      <section className="py-12 px-4 md:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Product <span className="text-blue-600">Gallery</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Showing {products.length} elite printing solutions</p>
          </div>
          
          {/* Quick Filters Pill (Horizontal Scrollable) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar max-w-full md:max-w-xl">
            <button 
              onClick={() => updateFilter('category', '')}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border",
                !category ? "bg-slate-900 text-white border-slate-900 shadow-lg" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              )}
            >
              All Pieces
            </button>
            {categories.slice(0, 5).map(cat => (
              <button 
                key={cat.id} 
                onClick={() => updateFilter('category', cat.slug)}
                className={cn(
                  "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 border",
                  category === cat.slug ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- STICKY TOOLBAR --- */}
      <div className="sticky top-20 z-40 px-4 md:px-6 lg:px-10 pb-6 pointer-events-none">
        <div className="max-w-full mx-auto pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/20 rounded-2xl px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            
            {/* Search */}
            <div className="flex items-center flex-1 min-w-[200px]">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-full focus-within:border-blue-600/30 transition-all">
                <Search size={14} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="bg-transparent text-[11px] font-bold tracking-widest outline-none w-full placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden h-10 px-4 flex items-center justify-center gap-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-100"
              >
                <SlidersHorizontal size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
              </button>

              <div className="relative group hidden sm:block">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 hover:border-blue-600/20 transition-all cursor-pointer">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort:</span>
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="bg-transparent text-[10px] font-bold uppercase tracking-widest cursor-pointer outline-none appearance-none"
                  >
                    <option value="newest">Latest</option>
                    <option value="price_low">Price: Low</option>
                    <option value="price_high">Price: High</option>
                    <option value="name_asc">Name: A-Z</option>
                  </select>
                  <ChevronDown size={12} className="text-slate-400" />
                </div>
              </div>

              <div className="h-10 w-10 hidden xl:flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg">
                <Grid size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      <section className="px-4 md:px-6 lg:px-10 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-6" strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border border-slate-100">
            <Package size={48} strokeWidth={1} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">No products found</h2>
            <button 
              onClick={() => navigate('/shop')} 
              className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
            {products.map((p) => (
              <div 
                key={p.id}
                className="group relative flex flex-col h-full bg-white transition-all duration-500"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[4/5] w-full bg-slate-50 overflow-hidden border border-slate-100 group-hover:border-blue-100 transition-all duration-500">
                  <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={getImagePath(p.images)} 
                    alt={p.name} 
                    className="w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + p.name; }}
                  />
                  <AnimatePresence>
                    {hoveredId === p.id && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/5 z-20 flex flex-col items-center justify-center gap-2 p-3 backdrop-blur-[2px]"
                      >
                        <button 
                          onClick={(e) => handleAddToCart(e, p)}
                          className="w-full h-10 bg-blue-600 text-white rounded-full flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-[10px] font-bold uppercase tracking-wider"
                        >
                          <ShoppingBag size={14} />
                          Add to Cart
                        </button>
                        <div className="flex gap-2 w-full">
                          <button 
                            onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                            className={cn(
                              "flex-1 h-10 rounded-full flex items-center justify-center gap-2 border bg-white shadow-md transition-all text-[9px] font-bold uppercase tracking-tight",
                              isInWishlist(p.id) ? "text-red-500 border-red-100" : "text-slate-600 hover:text-blue-600 border-slate-100"
                            )}
                          >
                            <Heart size={12} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                            Wishlist
                          </button>
                          <Link 
                            to={`/product/${p.slug}`}
                            className="flex-1 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center gap-2 shadow-md hover:bg-slate-800 transition-all text-[9px] font-bold uppercase tracking-tight"
                          >
                            <Eye size={12} />
                            View
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="pt-4 px-1 space-y-1">
                  <Link to={`/product/${p.slug}`} className="block">
                    <h3 className="text-[12px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                      {p.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">${p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[110] lg:hidden flex flex-col p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-50">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-8 w-8 rounded-full bg-slate-50 text-slate-900 flex items-center justify-center"><X size={18} /></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Categories</h4>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => { updateFilter('category', ''); setIsMobileFilterOpen(false); }}
                      className={cn("w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all", !category ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600")}
                    >
                      All Pieces
                    </button>
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all", category === cat.slug ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-600")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
