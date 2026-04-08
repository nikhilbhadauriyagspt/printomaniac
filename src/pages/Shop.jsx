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
  ArrowRight,
  Plus,
  LayoutGrid,
  Zap,
  Eye,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { category: pathCategory } = useParams();
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
          const all = d.data.flatMap(parent => [
            parent,
            ...(parent.children || [])
          ]);
          
          const filtered = all.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('macbook') &&
            !cat.name.toLowerCase().includes('notebook') &&
            !cat.name.toLowerCase().includes('pc') &&
            !cat.name.toLowerCase().includes('computer') &&
            !cat.name.toLowerCase().includes('chromebook')
          );

          const unique = Array.from(new Map(filtered.map(item => [item.slug, item])).values());
          setCategories(unique);
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
    setSearchParams(newParams);
    if(isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="Shop Inventory | Lux Printers" 
        description="Browse our high-performance inventory of precision printer."
      />

      {/* --- PURE WHITE HEADER --- */}
      <section className="pt-28 md:pt-32 pb-12 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[9px] font-black uppercase tracking-[3px] mb-4"
            >
              <Zap size={12} className="text-blue-600 fill-current" />
              Full Collection
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900  leading-none mb-6">
              Our <span className="text-blue-600">Inventory.</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest">
               Displaying {products.length} Professional Units
            </p>
          </div>
        </div>
      </section>

      {/* --- MOBILE FILTER TOGGLE --- */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4 px-4">
         <button 
           onClick={() => setIsMobileFilterOpen(true)}
           className="w-full h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-[0.98] transition-transform"
         >
            <Filter size={16} />
            Filter & Sort
         </button>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-12">
              
              {/* Search */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-900 mb-6 flex items-center gap-2">
                   Search <div className="h-1 flex-1 bg-slate-50 rounded-full" />
                </h4>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Product name..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl text-[13px] font-bold outline-none focus:border-blue-600 focus:shadow-xl focus:shadow-blue-500/5 transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-900 mb-6 flex items-center gap-2">
                   Categories <div className="h-1 flex-1 bg-slate-50 rounded-full" />
                </h4>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "flex items-center justify-between px-5 py-4 rounded-2xl text-[12px] font-bold transition-all border",
                      !category ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20" : "bg-white border-slate-50 text-slate-500 hover:border-blue-100 hover:text-blue-600"
                    )}
                  >
                    <span>All Collections</span>
                    {!category ? <ChevronRight size={14} /> : <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />}
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "flex items-center justify-between px-5 py-4 rounded-2xl text-[12px] font-bold transition-all border",
                        category === cat.slug ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20" : "bg-white border-slate-50 text-slate-500 hover:border-blue-100 hover:text-blue-600"
                      )}
                    >
                      <span className="truncate pr-2">{cat.name}</span>
                      {category === cat.slug ? <ChevronRight size={14} /> : <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-900 mb-6 flex items-center gap-2">
                   Sort By <div className="h-1 flex-1 bg-slate-50 rounded-full" />
                </h4>
                <div className="relative">
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-14 pl-5 pr-12 bg-white border border-slate-100 rounded-2xl text-[12px] font-bold outline-none appearance-none cursor-pointer focus:border-blue-600 transition-all"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Alphabetical</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

            </div>
          </aside>

          {/* --- MAIN PRODUCT AREA --- */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <Skeleton className="w-full aspect-square rounded-[2rem] bg-white border-none shadow-sm" />
                    <Skeleton className="h-4 w-2/3 mx-auto bg-white" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100">
                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-slate-300">
                   <Package size={40} />
                </div>
                <h2 className="text-2xl font-black text-slate-900  mb-3">No Matches Found</h2>
                <p className="text-slate-400 font-bold text-sm mb-10 max-w-xs mx-auto">We couldn't find any units matching your current search parameters.</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                >
                  Reset Inventory
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 4) * 0.03 }}
                    viewport={{ once: true }}
                    className="group/card"
                  >
                    <Link to={`/product/${p.slug}`} className="flex flex-col">
                      
                      {/* Seamless Card Design */}
                      <div className="relative w-full aspect-square bg-white rounded-[2rem] flex items-center justify-center p-6 transition-all duration-500 group-hover/card:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover/card:-translate-y-2 overflow-hidden">
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-4 right-4 z-20 h-9 w-9 rounded-xl bg-white border border-slate-50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 hover:scale-105 active:scale-90",
                            isInWishlist(p.id) ? "text-red-500 border-red-50 opacity-100 shadow-sm" : "text-slate-300 hover:text-red-500 hover:shadow-md"
                          )}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Image */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-500 group-hover/card:scale-105">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain transition-all duration-500"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                            }}
                          />
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-x-4 bottom-4 flex gap-1.5 translate-y-16 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-400 ease-out z-20">
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="flex-1 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg"
                          >
                            <ShoppingBag size={14} />
                            Add to Cart
                          </button>
                          <div className="h-10 w-10 bg-white text-slate-700 border border-slate-100 rounded-xl flex items-center justify-center hover:text-blue-600 transition-all shadow-md">
                            <Eye size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="mt-5 px-1 flex flex-col items-center">
                        <h3 className="text-[11px] md:text-[12px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-all duration-300 uppercase tracking-widest text-center line-clamp-2 leading-relaxed w-full min-h-[32px] mb-2">
                          {p.name}
                        </h3>

                        <div className="flex items-center gap-2">
                           <span className="text-sm font-black text-slate-900 ">
                              ${p.price}
                           </span>
                        </div>

                        <div className="mt-3 h-[1px] w-4 bg-slate-50 group-hover/card:w-12 group-hover/card:bg-blue-600 transition-all duration-500 rounded-full" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>

      {/* --- MOBILE FILTER SIDEBAR OVERLAY --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[110] lg:hidden flex flex-col shadow-2xl"
            >
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                  <h3 className="text-sm font-black uppercase tracking-[2px]">Filter & Sort</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                     <X size={20} />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-10">
                  {/* Search Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4">Search Inventory</h4>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" 
                        placeholder="Product name..."
                        value={search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none"
                      />
                    </div>
                  </div>

                  {/* Categories Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4">Select Category</h4>
                    <div className="grid gap-2">
                      <button 
                        onClick={() => updateFilter('category', '')}
                        className={cn(
                          "flex items-center justify-between px-5 py-4 rounded-2xl text-[12px] font-bold transition-all border",
                          !category ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white border-slate-100 text-slate-500"
                        )}
                      >
                        All Collections
                        {!category && <ChevronRight size={14} />}
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.id} 
                          onClick={() => updateFilter('category', cat.slug)}
                          className={cn(
                            "flex items-center justify-between px-5 py-4 rounded-2xl text-[12px] font-bold transition-all border",
                            category === cat.slug ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white border-slate-100 text-slate-500"
                          )}
                        >
                          <span className="truncate pr-2">{cat.name}</span>
                          {category === cat.slug && <ChevronRight size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Mobile */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-4">Sort Display</h4>
                    <div className="grid gap-2">
                       {['newest', 'price_low', 'price_high', 'name_asc'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateFilter('sort', s)}
                            className={cn(
                              "px-5 py-4 rounded-2xl text-[12px] font-bold text-left border transition-all",
                              sort === s ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100 text-slate-500"
                            )}
                          >
                             {s === 'newest' ? 'Latest Arrivals' : s === 'price_low' ? 'Price: Low to High' : s === 'price_high' ? 'Price: High to Low' : 'Alphabetical'}
                          </button>
                       ))}
                    </div>
                  </div>
               </div>

               <div className="p-6 border-t border-slate-100">
                  <button onClick={() => setIsMobileFilterOpen(false)} className="w-full h-14 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[3px] shadow-xl">
                     Apply Changes
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
