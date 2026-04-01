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
  CheckCircle,
  ShoppingBag,
  Info,
  ArrowRight
} from 'lucide-react';
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
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          
          let fetchUrl = `${API_BASE_URL}/products?limit=10`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

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
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white font-jakarta">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-6" strokeWidth={1.5} />
        <p className="text-xs font-bold text-gray-400">Loading details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white font-jakarta text-slate-900">
        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100">
           <ShoppingBag size={32} className="text-gray-200" />
        </div>
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <Link to="/shop" className="inline-flex items-center gap-3 bg-slate-900 text-white h-12 px-8 rounded-lg font-bold text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-95">
          Return to shop
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title={`${product.name} |Printer Club`} description={product.description?.substring(0, 160)} />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-10 overflow-hidden">
          <Link to="/" className="hover:text-blue-600 transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-blue-600 transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-slate-900 truncate font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- LEFT: GALLERY --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-10 md:p-16 overflow-hidden border border-gray-100 group transition-all duration-500 hover:border-blue-100 shadow-sm">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={mainImage} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 z-20">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "h-12 w-12 rounded-full transition-all duration-300 flex items-center justify-center active:scale-90 shadow-lg border border-gray-100",
                    isInWishlist(product.id) ? "bg-red-500 text-white border-red-500 shadow-red-500/20" : "bg-white text-slate-400 hover:text-red-500"
                  )}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {images.map((img, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-20 w-20 md:h-24 md:w-24 shrink-0 border-2 transition-all duration-300 flex items-center justify-center p-3 bg-white rounded-xl overflow-hidden shadow-sm",
                      activeImage === idx ? "border-blue-600 shadow-md" : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="lg:col-span-7 space-y-8 lg:pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Product details</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">${parseFloat(product.price).toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-lg font-medium text-slate-300 line-through">${parseFloat(product.sale_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center gap-2 text-slate-900">
                  <Info size={16} className="text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-widest">Description</h4>
               </div>
               <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                 {product.description || "A high-performance printer solution engineered for professional creative environments. Delivering consistent precision and absolute reliability."}
               </p>
            </div>

            <div className="space-y-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                {/* Minimal Counter */}
                <div className="h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between px-2 w-full sm:w-[150px]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white transition-all"><Minus size={14} /></button>
                  <span className="text-sm font-bold text-slate-900">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center rounded-lg bg-white text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white transition-all"><Plus size={14} /></button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 h-14 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isAdded ? <CheckCircle size={18} /> : <ShoppingBag size={18} />}
                  {isAdded ? "Added to cart" : "Add to cart"}
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 py-2">
                {[
                  { icon: <Truck size={18} />, label: "Fast shipping" },
                  { icon: <ShieldCheck size={18} />, label: "Safe payment" },
                  { icon: <RefreshCcw size={18} />, label: "Easy returns" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center group">
                    <div className="text-gray-300 group-hover:text-blue-600 transition-colors duration-300">{item.icon}</div>
                    <span className="text-[10px] font-bold text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Related products</h2>
              <Link to="/shop" className="group flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
              {relatedProducts.slice(0, 6).map((p) => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col h-full hover:border-blue-500 transition-all duration-300 group">
                  <div className="relative aspect-square w-full mb-4 flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
                    <Link to={`/product/${p.slug}`} className="absolute inset-0 z-10" />
                    <img src={getImagePath(p.images)} className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{p.name}</h3>
                    </Link>
                    <span className="text-base font-bold text-slate-900 mt-auto">${parseFloat(p.price).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
