import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  ShoppingBag,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
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
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;
          else if (brand) fetchUrl += `&brand=${brand}`;

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
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
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-snpro">
        <Loader2 className="animate-spin h-10 w-10 text-[#0047ab] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 italic">Accessing Hardware Terminal...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white font-snpro">
        <div className="h-24 w-24 bg-gray-50 border border-gray-100 flex items-center justify-center mb-10 group relative overflow-hidden">
           <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
           <ShoppingCart size={32} className="text-gray-200 relative z-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic tracking-tight mb-4">Unit Not Found.</h2>
        <p className="text-gray-400 text-sm font-medium mb-12 max-w-sm">The requested hardware ID is either offline or no longer available in our active inventory.</p>
        <Link to="/shop" className="bg-black text-white px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">Return to Inventory</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-40 pb-24 font-snpro text-slate-900 overflow-x-hidden">
      <SEO title={`${product.name} | Printer Brother`} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-16 italic">
          <Link to="/" className="hover:text-[#0047ab] transition-colors">Home</Link>
          <ChevronRight size={10} strokeWidth={4} className="text-[#0047ab]" />
          <Link to="/shop" className="hover:text-[#0047ab] transition-colors">Inventory</Link>
          <ChevronRight size={10} strokeWidth={4} className="text-[#0047ab]" />
          <span className="text-black truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* --- LEFT: GALLERY BENTO --- */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square bg-white border border-gray-100 flex items-center justify-center p-12 overflow-hidden group">
              {/* Grid Background Effect */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 1px, transparent 1px)', size: '20px 20px' }} />
              
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 border transition-all duration-500 flex items-center justify-center active:scale-90",
                    isInWishlist(product.id) ? "bg-red-500 border-red-500 text-white" : "bg-white border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 shadow-sm"
                  )}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={isInWishlist(product.id) ? 0 : 2} />
                </button>
                <button className="h-12 w-12 bg-white border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all shadow-sm flex items-center justify-center active:scale-90">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Tag */}
              <div className="absolute bottom-6 left-6 z-20">
                 <div className="bg-[#0047ab] text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest italic">
                    {product.brand_name || 'Verified Terminal'}
                 </div>
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-square border transition-all duration-500 flex items-center justify-center p-3 bg-white group",
                      activeImage === idx ? "border-[#0047ab] scale-95" : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: TECHNICAL SPECIFICATIONS --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-1 bg-[#0047ab]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">System Profile</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-black leading-[1] uppercase italic tracking-tighter">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 pt-4">
                <span className="text-5xl font-black text-black tracking-tighter italic">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-xl font-bold text-gray-300 line-through tracking-tighter">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Description Block */}
            <div className="bg-white border border-gray-100 p-8 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <Info size={80} className="text-black" />
               </div>
               <div className="flex items-center gap-2">
                  <Zap size={14} className="text-[#0047ab]" fill="#0047ab" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Performance Overview</h4>
               </div>
               <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed relative z-10">
                 {product.description || "Enterprise-grade professional printing terminal designed for high-precision output and seamless network integration. Engineered for durability in demanding workplace environments."}
               </p>
            </div>

            {/* Actions Panel */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 h-14 bg-gray-50 border border-gray-100 flex items-center justify-between px-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 text-black hover:bg-gray-100 transition-all active:scale-90"><Minus size={14} strokeWidth={3} /></button>
                  <span className="text-lg font-black">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center bg-white border border-gray-100 text-black hover:bg-gray-100 transition-all active:scale-90"><Plus size={14} strokeWidth={3} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "col-span-2 h-14 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 shadow-xl",
                    isAdded ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-[#0047ab]"
                  )}
                >
                  {isAdded ? <CheckCircle size={18} strokeWidth={3} /> : <ShoppingBag size={18} strokeWidth={3} />}
                  {isAdded ? "System Added" : "Add to Cart"}
                </button>
              </div>

              {/* Technical Trust Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <Truck size={16} />, label: "Express" },
                  { icon: <ShieldCheck size={16} />, label: "Insured" },
                  { icon: <RefreshCcw size={16} />, label: "Verified" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-2 py-6 bg-white border border-gray-100 group hover:border-[#0047ab]/30 transition-all duration-500">
                    <div className="text-[#0047ab] group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 italic">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED HARDWARE: CONSISTENT GRID --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-40">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-1 bg-[#0047ab]" />
                   <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Recommendations</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-black leading-tight uppercase italic tracking-tighter">
                  Related <span className="text-[#0047ab]">Systems.</span>
                </h2>
              </div>
              <Link to="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#0047ab] hover:text-black transition-all">
                Browse Entire Catalog <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts.slice(0, 5).map((p) => (
                <div 
                  key={p.id}
                  className="relative bg-white border border-gray-100 p-4 transition-all duration-500 flex flex-col group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:border-[#0047ab]/30 h-[420px]"
                >
                  {/* Image Area */}
                  <div className="relative aspect-square w-full flex items-center justify-center mb-4 px-2 overflow-hidden">
                    <img 
                      src={getImagePath(p.images)} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                      alt={p.name} 
                    />
                  </div>

                  {/* Metadata */}
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

                  {/* Action Area */}
                  <div className="mt-auto relative z-30">
                    <Link 
                      to={`/product/${p.slug}`}
                      className="w-full h-10 bg-white border border-gray-200 flex items-center justify-center text-[9px] font-black uppercase tracking-widest hover:bg-black hover:border-black hover:text-white transition-all active:scale-95"
                    >
                      View Terminal
                    </Link>
                  </div>

                  <Link to={`/product/${p.slug}`} className="absolute top-0 left-0 w-full h-[80%] z-0" onClick={() => window.scrollTo(0, 0)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
