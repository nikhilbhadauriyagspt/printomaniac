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
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { ProductCardSkeleton } from '@/components/ui/skeleton';

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

          // Unique categories by slug
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
        title="Shop Inventory | Printer Club" 
        description="Browse our high-performance inventory of precision hardware."
      />

      {/* --- MINIMAL PAGE HEADER --- */}
      <section className="pt-24 pb-12 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Explore Collection</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Our <span className="text-blue-600">Inventory.</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
               <Package size={14} /> Showing {products.length} Professional Units
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28 space-y-10">
              
              {/* Search Widget */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[2px] text-slate-900 mb-4">Search</h4>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Reference..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold outline-none focus:bg-white focus:border-blue-600/50 transition-all"
                  />
                </div>
              </div>

              {/* Categories Widget */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[2px] text-slate-900 mb-4">Categories</h4>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold transition-all",
                      !category ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    All Units
                    {!category && <ChevronDown size={14} className="-rotate-90" />}
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-bold transition-all",
                        category === cat.slug ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-50"
                      )}
                    >
                      {cat.name}
                      {category === cat.slug && <ChevronDown size={14} className="-rotate-90" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Widget */}
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[2px] text-slate-900 mb-4">Sort By</h4>
                <div className="relative">
                  <select 
                    value={sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-12 pl-4 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-bold outline-none appearance-none cursor-pointer focus:bg-white focus:border-blue-600/50 transition-all"
                  >
                    <option value="newest">Latest Arrivals</option>
                    <option value="price_low">Price: Low-High</option>
                    <option value="price_high">Price: High-Low</option>
                    <option value="name_asc">Alphabetical</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

            </div>
          </aside>

          {/* --- MAIN PRODUCT AREA --- */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="aspect-[3/4] bg-slate-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <Package size={48} className="mx-auto text-slate-300 mb-6" />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest mb-2">No Matches</h2>
                <p className="text-slate-500 font-bold mb-8">Refine your search parameters.</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                {products.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (index % 5) * 0.03 }}
                    viewport={{ once: true }}
                    className="group/card"
                  >
                    <Link to={`/product/${p.slug}`} className="flex flex-col">
                      
                      {/* Card Container */}
                      <div className="relative w-full aspect-[3/4] bg-white border border-slate-100 flex items-center justify-center p-4 transition-all duration-500 group-hover/card:border-blue-600 group-hover/card:shadow-2xl group-hover/card:shadow-blue-50/50">

                        {/* Wishlist */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          className={cn(
                            "absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100",
                            isInWishlist(p.id) ? "text-red-500 opacity-100 border-red-100" : "text-slate-400 hover:text-red-500"
                          )}
                        >
                          <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Image */}
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/400x400?text=" + p.name;
                          }}
                        />

                        {/* Hover Action Bar */}
                        <div className="absolute inset-x-0 bottom-0 overflow-hidden h-0 group-hover/card:h-11 transition-all duration-300 z-10">
                          <button
                            onClick={(e) => handleAddToCart(e, p)}
                            className="w-full h-full bg-blue-600 text-white flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[2px] hover:bg-slate-900 transition-colors"
                          >
                            <Plus size={14} />
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="mt-4 px-1 text-center">
                        <h3 className="text-[11px] font-bold text-slate-800 group-hover/card:text-blue-600 transition-colors uppercase tracking-widest leading-relaxed line-clamp-2 min-h-[30px]">
                          {p.name}
                        </h3>

                        {/* Price Container with Transition */}
                        <div className="mt-2 relative h-6 overflow-hidden">
                           <div className="flex flex-col transition-transform duration-300 group-hover/card:-translate-y-6">
                              <span className="h-6 flex items-center justify-center text-sm font-black text-slate-900 tracking-tight">
                                 ${p.price}
                              </span>
                              
                           </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
