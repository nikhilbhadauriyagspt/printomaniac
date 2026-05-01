import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Heart from 'lucide-react/dist/esm/icons/heart';
import RefreshCcw from 'lucide-react/dist/esm/icons/refresh-ccw';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

// left side temporary image
import showcaseBanner from '../assets/bannerr/bannn1.avif';

export default function ProductShowcase({
  products = [],
  arrivals = [],
  loading = false,
}) {
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

  const featuredProducts = products.slice(0, 9);

  const getImagePath = (images) => {
    if (!images) return 'https://via.placeholder.com/400x400?text=Product';

    try {
      const parsed = typeof images === 'string' ? JSON.parse(images) : images;
      const img = Array.isArray(parsed) ? parsed[0] : parsed;
      if (!img) return 'https://via.placeholder.com/400x400?text=Product';
      return img.startsWith('http') ? img : `/${img.replace(/\\/g, '/')}`;
    } catch (e) {
      return typeof images === 'string' && images.startsWith('http')
        ? images
        : `/${String(images).replace(/\\/g, '/')}`;
    }
  };

  const getThumbnailPath = (images) => {
    const original = getImagePath(images);
    if (original.includes('placeholder') || original.startsWith('http')) return original;
    return original.replace(/\.png$/, '-300x300.png');
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <section className="w-full  py-8 md:py-10">
      <div className="max-w-[1950px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-[8px] p-3 md:p-4 lg:p-5">
          <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-5">
            {/* LEFT SIDE BANNER */}
            <div className="relative overflow-hidden rounded-[8px] min-h-[320px] md:min-h-[420px] xl:min-h-full bg-[#d9d9d9]">
              <img
                src={showcaseBanner}
                alt="Showcase Banner"
                width="420"
                height="600"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 " />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                <div>
                 

                  

                  
                </div>

                <div>
                 
                </div>
              </div>
            </div>

            {/* RIGHT SIDE PRODUCTS */}
            <div className="min-w-0">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-[22px] md:text-[28px] font-semibold text-slate-800">
                  Printers
                </h3>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-[16px] text-slate-600 hover:text-slate-900 transition-colors"
                >
                  See All
                  <ArrowRight size={18} />
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[126px] rounded-[8px] bg-white animate-pulse border border-[#e7e7e7]"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {featuredProducts.map((p, i) => (
                    <Link
                      to={`/product/${p.slug}`}
                      key={p.id || i}
                      className="group bg-white border border-[#e6e6e6] rounded-[8px] p-3 md:p-4 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        {/* IMAGE */}
                        <div className="w-[88px] h-[88px] md:w-[96px] md:h-[96px] rounded-[6px] bg-[#f6f6f6] flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={getThumbnailPath(p.images)}
                            onError={(e) => { e.target.onerror = null; e.target.src = getImagePath(p.images); }}
                            alt={p.name}
                            width="96"
                            height="96"
                            loading={i < 3 ? "eager" : "lazy"}
                            fetchPriority={i === 0 ? "high" : "auto"}
                            decoding="async"
                            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-[16px] md:text-[17px] font-medium text-slate-700 leading-snug line-clamp-2 mb-2">
                            {p.name}
                          </h4>

                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className="text-[26px] leading-none font-semibold text-slate-900">
                              ${p.price}
                            </span>

                            {p.original_price && (
                              <span className="text-[16px] text-red-400 line-through">
                                ${p.original_price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-5 text-slate-400 mt-2">
                            <button
                              onClick={(e) => handleAddToCart(e, p)}
                              aria-label="Add to cart"
                              className="hover:text-blue-800 transition-colors w-11 h-11 flex items-center justify-center bg-slate-50 rounded-full"
                            >
                              <ShoppingCart size={18} />
                            </button>

                            <button
                              onClick={(e) => handleToggleWishlist(e, p)}
                              aria-label="Add to wishlist"
                              className={cn(
                                "transition-colors w-11 h-11 flex items-center justify-center bg-slate-50 rounded-full",
                                isInWishlist(p.id) ? "text-red-500" : "hover:text-blue-800"
                              )}
                            >
                              <Heart 
                                size={18} 
                                fill={isInWishlist(p.id) ? "currentColor" : "none"} 
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}