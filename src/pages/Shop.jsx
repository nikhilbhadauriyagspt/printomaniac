import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import X from 'lucide-react/dist/esm/icons/x';
import Package from 'lucide-react/dist/esm/icons/package';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Filter from 'lucide-react/dist/esm/icons/filter';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Eye from 'lucide-react/dist/esm/icons/eye';
import SlidersHorizontal from 'lucide-react/dist/esm/icons/sliders-horizontal';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import Search from 'lucide-react/dist/esm/icons/search';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

import { useGlobal } from '../context/GlobalContext';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const { categories: globalCategories, products: globalProducts, loading: globalLoading } = useGlobal();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    openCartDrawer();
  };

  // Normalize and filter categories for sidebar
  const categories = globalCategories.flatMap(parent => [parent, ...(parent.children || [])])
    .filter(cat => 
      !cat.name.toLowerCase().includes('laptop') && 
      !cat.slug.toLowerCase().includes('laptop')
    )
    .filter((v, i, a) => a.findIndex(t => t.slug === v.slug) === i);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }

    // Optimization: Use global products if available and no search is active
    if (!globalLoading && globalProducts.length > 0 && !search) {
       let filtered = globalProducts.filter(p => !p.name.toLowerCase().includes('laptop'));
       
       if (category) {
         filtered = filtered.filter(p => {
           // Check multiple possible locations for category info
           const pSlug = p.category_slug || '';
           const pId = p.category_id || '';
           const pCats = p.categories || [];
           
           return pSlug === category || 
                  pId == category || 
                  pCats.some(c => c.slug === category || c.id == category);
         });
       }
       
       // If we found products, set them. If not, maybe the global list is insufficient, 
       // so we proceed to the fetch block below.
       if (filtered.length > 0 || !category) {
         // Sort
         if (sort === 'price_low') filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
         if (sort === 'price_high') filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
         if (sort === 'name_asc') filtered.sort((a, b) => a.name.localeCompare(b.name));
         if (sort === 'newest') filtered.reverse();
         
         setProducts(filtered);
         setLoading(false);
         return; // Skip fetch
       }
    }

    // Fetch from API if optimization skipped or yielded no results for a category
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(
            (p) => !p.name.toLowerCase().includes('laptop')
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, navigate, globalLoading, globalProducts, category, sort, search]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    setSearchParams(newParams);
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/400x400?text=Product';
  };

  const getThumbnailPath = (images) => {
    const original = getImagePath(images);
    if (original.includes('placeholder') || original.startsWith('http')) return original;
    return original.replace(/\.png$/, '-300x300.png');
  };

  const activeCategoryName =
    category ? categories.find((c) => c.slug === category)?.name || 'Collection' : 'All Products';

  const sortOptions = [
    { val: 'newest', label: 'Newest First' },
    { val: 'price_low', label: 'Price: Low-High' },
    { val: 'price_high', label: 'Price: High-Low' },
    { val: 'name_asc', label: 'Alphabetical' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Shop Printers & Supplies | US Printer Store"
        description="Browse our wide selection of high-quality printers and accessories. Find the perfect printing solutions for your home or office needs."
      />

      {/* --- SIMPLE HEADER --- */}
      <section className="bg-slate-50/50 pt-10 pb-8 border-b border-slate-100">
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                <Link to="/" className="hover:text-blue-700 transition-colors">Home</Link>
                <ChevronRight size={10} />
                <span className="text-blue-700">Shop</span>
              </div>
              <h1 className="text-[28px] md:text-[34px] font-semibold text-slate-800 tracking-tight">
                {activeCategoryName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
               <span className="text-[12px] font-bold text-slate-600">{products.length} Items</span>
               <div className="h-4 w-px bg-slate-200"></div>
               <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="sr-only">Sort products by</label>
                  <SlidersHorizontal size={14} className="text-slate-400" />
                  <select 
                    id="sort-select"
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="bg-transparent text-[12px] font-medium text-slate-600 outline-none cursor-pointer"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.val} value={opt.val}>{opt.label}</option>
                    ))}
                  </select>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- SIMPLE SIDEBAR --- */}
          <aside className="hidden lg:block w-[240px] shrink-0 border-r border-slate-50 pr-8">
            <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">Categories</h2>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => updateFilter('category', '')}
                className={cn(
                  'text-left text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all',
                  !category ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-50'
                )}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={cn(
                    'text-left text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all',
                    category === cat.slug ? 'bg-blue-50 text-blue-800' : 'text-slate-500 hover:bg-slate-50'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* --- SMALL CARD GRID --- */}
          <main className="flex-1">
            <div className="lg:hidden mb-6">
               <button
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="w-full flex items-center justify-center gap-2 h-12 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700"
               >
                 <Filter size={16} /> Filter Results
               </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-56 bg-slate-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
                {products.map((p, index) => (
                  <div key={p.id} className="group flex flex-col">
                    <Link to={`/product/${p.slug}`} className="block relative">
                      {/* Even more compact Image */}
                      <div className="aspect-square bg-white rounded-xl flex items-center justify-center p-8 border border-blue-50/30 transition-colors group-hover:border-blue-100/50">
                        <img
                          src={getThumbnailPath(p.images)}
                          onError={(e) => { e.target.onerror = null; e.target.src = getImagePath(p.images); }}
                          alt={p.name}
                          width="200"
                          height="200"
                          loading={index < 5 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          decoding="async"
                          className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Wishlist Button (Minimalist) */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        aria-label={isInWishlist(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                        className={cn(
                          "absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                          isInWishlist(p.id) ? "text-red-500 bg-white shadow-sm" : "text-slate-300 hover:text-red-500"
                        )}
                      >
                        <Heart size={12} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                      </button>
                    </Link>

                    <div className="mt-3 px-0.5 text-center sm:text-left">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] font-medium text-slate-700 leading-tight line-clamp-2 h-8 group-hover:text-blue-800 transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                         <span className="text-[15px] font-bold text-slate-900">${p.price}</span>
                         <button 
                           onClick={(e) => handleAddToCart(e, p)}
                           className="text-[10px] font-bold text-blue-800 uppercase tracking-tighter hover:text-blue-800"
                         >
                           + Add to Cart
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- SIMPLE MOBILE FILTER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[500] bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white z-[510] rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <span className="text-[16px] font-bold text-slate-800">Filter By</span>
                <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Close filters"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.slug)}
                      className={cn(
                        'w-full text-left h-12 px-6 rounded-xl transition-all text-[14px] font-medium',
                        category === cat.slug ? 'bg-blue-50 text-blue-800' : 'text-slate-500'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
