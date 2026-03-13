import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Filter, 
  Heart,
  X,
  Loader2,
  Check,
  Plus,
  Box,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
  LayoutGrid,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
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
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const availableBrands = brands.filter(b => {
    const brandName = b.name.toLowerCase().trim();
    const computerBrands = ['acer', 'asus', 'dell', 'lenovo'];
    if (computerBrands.includes(brandName)) return false;
    return products.some(p => 
      p.brand_id === b.id || 
      p.brand_name?.toLowerCase().trim() === brandName
    );
  });

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
    <div className="bg-[#fcfcfc] min-h-screen font-snpro text-slate-900">
      <SEO 
        title="Hardware Store | Printer Brother" 
        description="Browse our selection of professional printing solutions and industrial hardware."
      />
      
      {/* --- HERO HEADER: BENTO STYLE --- */}
      <section className="bg-white border-b border-gray-100 pt-12 pb-16 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-1 bg-[#0047ab]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Professional Inventory</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tight italic leading-[0.9]">
                Hardware <br />
                <span className="text-[#0047ab]">Solutions.</span>
              </h1>
              <p className="text-gray-500 text-sm md:text-lg font-medium max-w-xl leading-relaxed">
                Precision engineering for modern workspace deployment. Browse our verified catalog of high-performance printing terminals.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 space-y-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#0047ab]/5 -mr-12 -mt-12 rounded-full transition-all group-hover:scale-150 duration-700" />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Advanced Search</h4>
               <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search systems..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-white border border-gray-200 text-sm font-bold focus:outline-none focus:border-[#0047ab] transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FILTER BAR: MODERN MINIMAL --- */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] z-40 px-6 md:px-10">
         <div className="max-w-[1650px] mx-auto flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black"
               >
                 <SlidersHorizontal size={16} /> Filters
               </button>
               
               <div className="hidden lg:flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                     <LayoutGrid size={14} /> Total Units: <span className="text-black">{products.length}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-gray-400">Sort By:</span>
               <select 
                  value={sort} 
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="h-10 px-4 bg-gray-50 border border-gray-100 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#0047ab] cursor-pointer transition-all"
               >
                  <option value="newest">Recent</option>
                  <option value="price_low">Price: Low</option>
                  <option value="price_high">Price: High</option>
                  <option value="name_asc">Alphabetical</option>
               </select>
            </div>
         </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <section className="py-12 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* --- SIDEBAR: DESKTOP --- */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-12">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-[#0047ab]" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-black italic">Collections</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => updateFilter('category', '')}
                    className={cn(
                      "w-full text-left px-4 py-3 text-[12px] font-bold transition-all border-l-2",
                      !category 
                        ? "text-[#0047ab] border-[#0047ab] bg-blue-50/30" 
                        : "text-gray-400 border-transparent hover:text-black hover:bg-gray-50"
                    )}
                  >
                    View All
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-[12px] font-bold transition-all border-l-2",
                        category === cat.slug 
                          ? "text-[#0047ab] border-[#0047ab] bg-blue-50/30" 
                          : "text-gray-400 border-transparent hover:text-black hover:bg-gray-50"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[2px] bg-[#0047ab]" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-black italic">Manufacturers</h4>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {availableBrands.map(b => (
                    <button 
                      key={b.id} 
                      onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-[12px] font-bold transition-all border-l-2",
                        brand === b.name 
                          ? "text-[#0047ab] border-[#0047ab] bg-blue-50/30" 
                          : "text-gray-400 border-transparent hover:text-black hover:bg-gray-50"
                      )}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {(category || brand || search) && (
                <button 
                  onClick={() => navigate('/shop')}
                  className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <X size={14} /> Clear Selection
                </button>
              )}

              {/* Promo Bento Block */}
              <div className="bg-[#0047ab] p-6 text-white space-y-4 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-20">
                    <Zap size={40} fill="white" />
                 </div>
                 <h5 className="text-[10px] font-black uppercase tracking-widest italic">Member Perk</h5>
                 <p className="text-xs font-bold leading-relaxed opacity-80">Free enterprise installation on all high-volume laser units this month.</p>
                 <Link to="/contact" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest border-b border-white/20 pb-0.5 hover:border-white transition-all">
                    Learn More <ArrowUpRight size={10} />
                 </Link>
              </div>
            </aside>

            {/* --- PRODUCT GRID --- */}
            <div className="flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-48">
                  <Loader2 className="animate-spin h-10 w-10 text-[#0047ab] mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 italic">Accessing Stock...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-gray-100 p-12">
                  <Box size={40} className="text-gray-200 mb-6" />
                  <h2 className="text-2xl font-black text-black uppercase italic tracking-tight">No match found.</h2>
                  <p className="text-gray-400 text-sm font-medium mt-3 mb-10 max-w-xs mx-auto">Our current inventory does not match your specific search criteria.</p>
                  <button onClick={() => navigate('/shop')} className="bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-[#0047ab] transition-all">Reset All Parameters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="relative bg-white border border-gray-100 p-4 transition-all duration-500 flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:border-[#0047ab]/30 h-[420px]"
                    >
                      {/* Image Panel */}
                      <div className="relative aspect-square w-full flex items-center justify-center mb-4 px-2 overflow-hidden">
                        <img 
                          src={getImagePath(p.images)} 
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                          alt={p.name} 
                        />
                      </div>

                      {/* Info Panel */}
                      <div className="space-y-3 mb-4">
                        <Link to={`/product/${p.slug}`} className="block">
                          <h3 className="font-bold text-gray-800 text-[13px] leading-tight line-clamp-2 uppercase tracking-tight group-hover:text-[#0047ab] transition-colors h-[32px]">
                            {p.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between">
                           <span className="text-[16px] font-black text-gray-900">${p.price}</span>
                           <span className="text-[9px] font-black text-[#0047ab] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Details <ArrowRight size={10} className="inline ml-1" /></span>
                        </div>
                      </div>

                      {/* Actions Panel */}
                      <div className="mt-auto grid grid-cols-4 gap-1.5 relative z-30">
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                          disabled={addedItems[p.id]}
                          className={cn(
                            "col-span-3 h-10 border text-[9px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95",
                            addedItems[p.id] 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "bg-black border-black text-white hover:bg-[#0047ab] hover:border-[#0047ab]"
                          )}
                        >
                          {addedItems[p.id] ? <Check size={16} className="mx-auto" /> : "Add to Cart"}
                        </button>
                        
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                          className={cn(
                            "h-10 border border-gray-100 flex items-center justify-center transition-all duration-300 active:scale-95",
                            isInWishlist(p.id) ? "text-red-500 border-red-100 bg-red-50" : "text-gray-400 hover:bg-gray-50 hover:text-red-500"
                          )}
                        >
                          <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-[110] lg:hidden flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-black uppercase italic tracking-tighter">Refine Stock.</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="h-10 w-10 flex items-center justify-center border border-gray-100">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar pr-4">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Collections</h4>
                  <div className="flex flex-col gap-1">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { updateFilter('category', cat.slug); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-xs font-bold transition-all", category === cat.slug ? "bg-blue-50 text-[#0047ab] border-l-2 border-[#0047ab]" : "text-gray-500")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Manufacturers</h4>
                  <div className="flex flex-col gap-1">
                    {availableBrands.map(b => (
                      <button 
                        key={b.id} 
                        onClick={() => { updateFilter('brand', b.name); setIsMobileFilterOpen(false); }}
                        className={cn("w-full text-left px-4 py-3 text-xs font-bold transition-all", brand === b.name ? "bg-blue-50 text-[#0047ab] border-l-2 border-[#0047ab]" : "text-gray-500")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { navigate('/shop'); setIsMobileFilterOpen(false); }}
                className="w-full py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest mt-8"
              >
                Reset All Refinement
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
