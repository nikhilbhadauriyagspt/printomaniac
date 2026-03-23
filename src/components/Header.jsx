import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Loader2,
  ChevronDown,
  PhoneCall,
  MapPin,
  Mail,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
          // Flatten subcategories and filter out non-printer categories if necessary
          const allCats = data.data.flatMap(parent => parent.children || []);
          const printerCats = allCats.filter(cat => {
            const name = cat.name.toLowerCase();
            return !name.includes('laptop') && !name.includes('computer');
          });
          setCategories(printerCats);
        }
      } catch (err) {
        console.error('Category Fetch Error:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [] });
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop'},
    { name: 'Track Order', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header className="w-full z-[100] font-jakarta bg-white border-b border-gray-100 sticky top-0 shadow-sm">
        {/* --- TOP ROW: LOGO, SEARCH, ACTIONS --- */}
        <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/logo/logo.png" alt="Axel Printing" className="h-8 md:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300" />
            </Link>
          </div>

          {/* Center: Search Bar - Hidden on mobile, visible on lg */}
          <div className="hidden lg:flex flex-[2] justify-center relative">
            <div className="w-full max-w-2xl relative">
              <form onSubmit={handleSearch} className="w-full flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600/10 transition-all">
                <input 
                  type="text" 
                  placeholder="Search for printers, accessories..." 
                  className="flex-1 bg-transparent px-5 py-2.5 text-[14px] font-medium text-[#1A1A1A] outline-none placeholder:text-[#B0B0AC]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-blue-700 text-white px-6 py-3 flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <Search size={18} strokeWidth={2} />
                </button>
              </form>

              {/* SUGGESTIONS DROPDOWN */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-full bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden z-[110]"
                  >
                    <div className="p-3 space-y-1">
                      {isSearching ? (
                        <div className="flex items-center justify-center py-8 gap-3">
                          <Loader2 size={18} className="animate-spin text-gray-400" />
                          <span className="text-[12px] text-gray-400 font-medium">Searching...</span>
                        </div>
                      ) : suggestions.products.length > 0 ? (
                        <>
                          {suggestions.products.map(p => {
                            const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                            const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                            return (
                              <Link 
                                key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                                className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-all group"
                              >
                                <div className="h-12 w-12 bg-white rounded-md flex items-center justify-center p-1 border border-gray-100 shrink-0">
                                  <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[13px] font-bold text-[#1A1A1A] line-clamp-1">{p.name}</h4>
                                  <p className="text-[11px] font-semibold text-gray-500">${p.price}</p>
                                </div>
                              </Link>
                            );
                          })}
                          <button onClick={handleSearch} className="w-full py-2.5 mt-2 bg-gray-50 hover:bg-blue-700 hover:text-white rounded-lg text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] transition-all">
                            View All Results
                          </button>
                        </>
                      ) : (
                        <div className="py-8 text-center text-[12px] text-gray-400 font-medium">No results found</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex-1 flex items-center justify-end gap-5 md:gap-8">
            
            {/* Account */}
            <Link to={user ? "/profile" : "/login"} className="hidden sm:flex flex-col items-center gap-0.5 group">
              <div className="relative p-1 transition-transform group-hover:-translate-y-0.5">
                <User size={20} strokeWidth={1.5} className="text-gray-700 group-hover:text-blue-700" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400 group-hover:text-blue-700 transition-colors">
                {user ? "Profile" : "Account"}
              </span>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:flex flex-col items-center gap-0.5 group relative">
              <div className="relative p-1 transition-transform group-hover:-translate-y-0.5">
                <Heart size={20} strokeWidth={1.5} className="text-gray-700 group-hover:text-blue-700" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-700 text-white text-[8px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full border border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400 group-hover:text-blue-700 transition-colors">Wishlist</span>
            </Link>

            {/* Cart */}
            <button onClick={openCartDrawer} className="flex flex-col items-center gap-0.5 group relative">
              <div className="relative p-1 transition-transform group-hover:-translate-y-0.5">
                <ShoppingCart size={20} strokeWidth={1.5} className="text-gray-700 group-hover:text-blue-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-700 text-white text-[8px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full border border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400 group-hover:text-blue-700 transition-colors">My Cart</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-gray-50 rounded-lg text-gray-700">
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* --- SECOND ROW: NAVIGATION --- */}
        <div className="hidden lg:block border-t border-gray-100 bg-white">
          <div className="w-full px-8 py-2.5 flex items-center justify-between">
            <nav className="flex items-center gap-8">
              {/* Category Dropdown */}
              <div 
                className="relative group py-1"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer py-1.5 px-4 bg-blue-700 rounded-lg text-white hover:bg-blue-800 transition-all shadow-md shadow-blue-700/10 mr-4">
                  <Menu size={14} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Shop Categories</span>
                  <ChevronDown size={12} className={cn("ml-1 transition-transform duration-300", isCategoryOpen && "rotate-180")} />
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 rounded-xl overflow-hidden z-[120] py-2"
                    >
                      {categories.length > 0 ? (
                        categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setIsCategoryOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-[12px] font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all group/item"
                          >
                            <span className="flex-1">{cat.name}</span>
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-[11px] text-gray-400">Loading categories...</div>
                      )}
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <Link
                          to="/shop"
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-blue-700 hover:bg-blue-50 transition-all"
                        >
                          View All Collections
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav Links */}
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest transition-all hover:text-blue-700",
                      location.pathname === link.path ? "text-blue-700" : "text-gray-500"
                    )}
                  >
                    {link.name}
                    {link.badge && (
                      <span className={cn("ml-1.5 px-1.5 py-0.5 rounded text-[8px] text-white", link.badgeColor)}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right side info: Email */}
            <div className="flex items-center gap-3 text-gray-500 hover:text-blue-700 transition-colors cursor-pointer">
              <Mail size={14} className="text-blue-700/60" />
              <span className="text-[12px] font-medium tracking-tight">info@axelprinting.shop</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Visible only on mobile */}
      <div className="lg:hidden p-4 bg-white border-b border-gray-100">
        <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="flex-1 bg-transparent px-4 py-2 text-[14px] outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="p-2 text-gray-500">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <img src="/logo/logo.png" alt="Axel Printing" className="h-8 w-auto" />
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    onClick={() => setIsSidebarOpen(false)}
                    className="py-3 text-[15px] font-bold text-gray-800 border-b border-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <Link to="/login" className="flex items-center gap-3 text-gray-700 font-bold" onClick={() => setIsSidebarOpen(false)}>
                  <User size={20} />
                  <span>Account</span>
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 text-gray-700 font-bold" onClick={() => setIsSidebarOpen(false)}>
                  <Heart size={20} />
                  <span>Wishlist</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
