import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  LayoutGrid,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAllDropdownOpen, setIsAllDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileSearchOpen) {
      setIsSidebarOpen(false);
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    setIsMobileSearchOpen(false);
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const data = await res.json();
        if (data.status === 'success') {
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAllDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') {
          setUser(null);
          return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
      } catch (e) {
        setUser(null);
      }
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
      <header className={cn(
        "w-full z-[100] transition-all duration-300 bg-white sticky top-0 border-b border-slate-100",
        isScrolled ? "shadow-lg py-2" : "py-3 md:py-4"
      )}>
        <div className="w-full mx-auto px-4 md:px-8 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo & Mobile Menu */}
          <div className={cn(
            "flex items-center gap-4 transition-all duration-300",
            isMobileSearchOpen ? "hidden" : "flex"
          )}>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-blue-600 transition-colors"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="shrink-0">
              <img 
                src="/logo/logo.png" 
                alt="Logo" 
                className="h-8 md:h-10 lg:h-11 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Mobile Search Input (Visible only when toggled) */}
          <AnimatePresence mode="wait">
            {isMobileSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex lg:hidden items-center flex-1 gap-2"
              >
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-slate-100 rounded-full px-4 h-11">
                  <Search size={18} className="text-slate-400 shrink-0" />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Search products..." 
                    className="flex-1 bg-transparent px-3 text-[14px] outline-none font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                <button 
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="h-10 w-10 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full"
                >
                  <X size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation & Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-5xl gap-6">
            
            {/* Categories Dropdown */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button 
                onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                className={cn(
                  "flex items-center gap-2 py-2.5 px-4 text-[13px] font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-all",
                  isAllDropdownOpen && "bg-blue-50 text-blue-600"
                )}
              >
                <LayoutGrid size={18} />
                <span>Categories</span>
                <ChevronDown size={14} className={cn("transition-transform duration-200", isAllDropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isAllDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[260px] bg-white shadow-2xl z-[500] border border-slate-100 rounded-xl overflow-hidden mt-2"
                  >
                    <div className="py-2">
                      {categories.map(cat => (
                        <Link 
                          key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsAllDropdownOpen(false)}
                          className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] transition-all group"
                        >
                          {cat.name}
                          <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                      <div className="p-2 border-t border-slate-50 mt-1">
                        <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-blue-600 transition-colors">
                           View All Inventory <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <form onSubmit={handleSearch} className="w-full flex items-center bg-slate-50 rounded-full border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-sm transition-all overflow-hidden h-11">
                <Search size={18} className="ml-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search for printers, ink, or accessories..." 
                  className="flex-1 bg-transparent px-3 py-2 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl overflow-hidden z-[110] border border-slate-100 mt-2"
                  >
                    {isSearching ? (
                      <div className="flex items-center justify-center py-8 gap-3">
                        <Loader2 size={20} className="animate-spin text-blue-600" />
                        <span className="text-sm text-slate-500 font-bold">Searching...</span>
                      </div>
                    ) : suggestions.products.length > 0 ? (
                      <div className="p-2">
                        {suggestions.products.map(p => {
                          const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                          const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                          return (
                            <Link 
                              key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                              className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-all border-b border-slate-50 last:border-0 group"
                            >
                              <div className="h-10 w-10 bg-white rounded border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                                <img src={imageSrc} className="max-h-full max-w-full object-contain p-1 group-hover:scale-110 transition-transform" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[14px] font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                                <p className="text-[12px] font-black text-blue-600">${p.price}</p>
                              </div>
                              <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-sm text-slate-400 font-bold">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Main Nav Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} to={link.path} 
                  className={cn(
                    "py-2 px-3 text-[13px] font-bold rounded-lg transition-all",
                    location.pathname === link.path ? "text-blue-600 bg-blue-50/50" : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className={cn(
            "flex items-center gap-2 md:gap-3",
            isMobileSearchOpen ? "hidden" : "flex"
          )}>
            {/* Search (Mobile Toggle) */}
            <button 
              onClick={() => setIsMobileSearchOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors"
            >
               <Search size={22} />
            </button>

            {/* Account */}
            <Link to={user ? "/profile" : "/login"} className="hidden md:flex items-center justify-center h-10 w-10 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-full transition-all">
               <User size={22} />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden sm:flex items-center justify-center h-10 w-10 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-full transition-all relative">
              <Heart size={22} className={cn(wishlistCount > 0 && "fill-current")} />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button 
               onClick={openCartDrawer} 
               className="flex items-center gap-2 bg-slate-900 text-white hover:bg-blue-600 py-2.5 px-3 md:px-5 rounded-full transition-all shadow-lg shadow-slate-200 active:scale-95 group ml-1"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 h-5 w-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-slate-900 group-hover:border-white transition-colors">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-[13px] font-black uppercase tracking-wider">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl"
            >
              <div className="bg-blue-600 text-white p-6">
                <div className="flex justify-between items-center mb-6">
                   <img src="/logo/logo.png" alt="" className="h-8 brightness-0 invert" />
                   <button onClick={() => setIsSidebarOpen(false)} className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                      <X size={20} />
                   </button>
                </div>
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User size={24} />
                   </div>
                   <div>
                      <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Welcome Guest</p>
                      <h2 className="text-lg font-black tracking-tight">{user ? user.name : 'Sign In / Register'}</h2>
                   </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-2">
                <div className="mb-6">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3 px-4">Menu Navigation</h3>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-700 font-bold transition-all">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-3 px-4">Categories</h3>
                  <div className="grid gap-1">
                    {categories.slice(0, 8).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 text-slate-700 font-bold transition-all group">
                         {cat.name} 
                         <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600" />
                       </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100">
                {user ? (
                   <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 text-red-600 rounded-lg font-black uppercase tracking-widest text-[11px] hover:bg-red-100 transition-all">
                     <LogOut size={18} />
                     Sign Out
                   </button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-lg font-black uppercase tracking-widest text-[11px] hover:bg-slate-900 transition-all shadow-lg shadow-blue-100">
                    <User size={18} />
                    Login Account
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
