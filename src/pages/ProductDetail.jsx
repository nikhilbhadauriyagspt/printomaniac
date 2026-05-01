import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Truck from 'lucide-react/dist/esm/icons/truck';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import RefreshCcw from 'lucide-react/dist/esm/icons/refresh-ccw';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs)
        ? imgs.map((img) => (img.startsWith('http') ? img : `/${img}`))
        : [];
    } catch (e) {
      return [];
    }
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white font-['Poppins']">
        <Loader2 className="h-10 w-10 animate-spin text-blue-800 mb-4" strokeWidth={1.5} />
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">
          Fetching Product
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center font-['Poppins']">
        <div className="mb-8 w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
          <ShoppingBag size={34} className="text-gray-300" />
        </div>
        <h2 className="text-[32px] font-black text-slate-900 mb-4">Product Not Found</h2>
        <Link
          to="/shop"
          className="inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-800 px-8 text-[13px] font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-blue-100"
        >
          Return to Shop <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage =
    images.length > 0 ? images[activeImage] : 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="bg-[#fcfdfe] min-h-screen pt-28 pb-20">
      <SEO
        title={`${product.name} | US Printer Store`}
        description={product.description?.substring(0, 160)}
      />

      <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16">
        {/* --- MINIMAL BREADCRUMB --- */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-10 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-blue-800 transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0 text-slate-400" />
          <Link to="/shop" className="hover:text-blue-800 transition-colors shrink-0">Catalog</Link>
          <ChevronRight size={12} className="shrink-0 text-slate-400" />
          <span className="text-blue-800 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-square bg-white rounded-[3rem] border border-slate-100 flex items-center justify-center p-12 md:p-20 overflow-hidden group">
              {/* Soft Blue Glow */}
              <div className="absolute inset-0 bg-blue-50/30 rounded-full blur-[80px] scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={mainImage}
                  alt={product.name}
                  className="relative z-10 max-h-full max-w-full object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </AnimatePresence>

              {/* Heart Toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                className={cn(
                  'absolute top-8 right-8 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-sm backdrop-blur-md',
                  isInWishlist(product.id)
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white/80 border-white text-slate-300 hover:text-red-500 hover:bg-white'
                )}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Thumbnails Grid */}
            {images.length > 1 && (
              <div className="flex flex-wrap gap-4 px-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      'w-20 h-20 rounded-2xl border-2 transition-all p-3 bg-white flex items-center justify-center',
                      activeImage === idx
                        ? 'border-blue-800 scale-105 shadow-lg shadow-blue-900/5'
                        : 'border-slate-50 hover:border-blue-200'
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: PRODUCT CONTENT --- */}
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-4">
              <span className="text-blue-800 text-[10px] font-black uppercase tracking-[0.3em] block">Certified Hardware</span>
              <h1 className="text-[34px] md:text-[44px]  text-slate-950 leading-[1.1] tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 pt-2">
                <span className="text-[32px] md:text-[40px] font-black text-slate-950 tracking-tighter">
                  ${parseFloat(product.price).toLocaleString()}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest">In Stock</span>
                </div>
              </div>
            </div>

            {/* Structured Overview */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Technical Overview</h4>
              <p className="text-slate-600 text-[16px] font-medium leading-relaxed">
                {product.description ||
                  'Professional enterprise solution designed for high-volume productivity and seamless integration into your modern office workflow. Every detail is optimized for performance.'}
              </p>
            </div>

            {/* Interactive Controls */}
            <div className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-200 h-16 w-full sm:w-auto">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 hover:text-blue-800 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-14 text-center text-[16px] font-black text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-900 hover:text-blue-800 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-70",
                    isAdded 
                      ? "bg-emerald-600 text-white shadow-emerald-900/20" 
                      : "bg-slate-950 text-white shadow-slate-900/20 hover:bg-blue-800"
                  )}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={20} /> Item Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} /> Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Global Support Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                {[
                  { icon: Truck, label: 'Express Fleet' },
                  { icon: ShieldCheck, label: 'Safe Pay' },
                  { icon: RefreshCcw, label: 'Verified' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-2xl border border-slate-50 bg-white flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 group"
                  >
                    <item.icon size={16} className="text-blue-800" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED HARDWARE --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
              <div>
                <span className="text-blue-800 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Fleet Integration</span>
                <h2 className="text-[34px] md:text-[44px] font-bold text-slate-950 leading-none tracking-tighter">
                  Related <span className="text-blue-700 italic font-light">Picks.</span>
                </h2>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-4 text-slate-400 hover:text-blue-800 transition-all font-bold uppercase tracking-widest text-xs"
              >
                View Full Series 
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-all">
                   <ArrowRight size={18} />
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {relatedProducts.slice(0, 5).map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group flex flex-col"
                >
                  <Link to={`/product/${p.slug}`} className="block">
                    <div className="aspect-square bg-white border border-slate-50 rounded-[2rem] flex items-center justify-center p-6 mb-6 transition-all duration-500 group-hover:border-blue-100 group-hover:shadow-xl group-hover:shadow-blue-900/5 overflow-hidden">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="px-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-2 block">
                        {p.brand_name || 'Premium'}
                      </span>
                      <h4 className="text-slate-800 text-[15px] font-medium leading-tight line-clamp-2 h-10 mb-4 group-hover:text-blue-800 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[20px] font-black text-slate-950 tracking-tighter">
                        ${parseFloat(p.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
