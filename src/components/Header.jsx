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
  Mail,
  Smartphone,
  LayoutGrid,
  MapPin,
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close dropdown when clicking outside
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
      let url = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== 'All') {
        const cat = categories.find(c => c.name === selectedCategory);
        if (cat) url += `&category=${cat.slug}`;
      }
      navigate(url);
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
        "w-full z-[100] transition-all duration-300 ease-in-out font-sans top-0",
        isScrolled ? "shadow-lg" : ""
      )}>
        {/* --- MAIN NAVIGATION --- */}
        <div className={cn(
          "px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4 md:gap-10 transition-all duration-300 border-b border-slate-100",
          isScrolled ? "bg-white/95 backdrop-blur-xl py-2 md:py-2.5" : "bg-white"
        )}>
          {/* Logo Section */}
          <Link to="/" className="flex items-center shrink-0 group">
            <img 
              src="/logo/logo.png" 
              alt="Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl relative group">
            <form onSubmit={handleSearch} className="w-full flex items-center bg-slate-100 rounded-full overflow-hidden h-11 focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:bg-white transition-all border border-slate-200">
              <div className="relative">
                <select 
                  className="bg-transparent text-slate-700 text-[13px] h-full pl-5 pr-2 outline-none cursor-pointer font-semibold"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="h-4 w-px bg-slate-300 mx-2" />
              
              <input 
                type="text" 
                placeholder="Search premium printers & accessories..." 
                className="flex-1 bg-transparent px-4 py-2 text-[14px] text-slate-900 outline-none placeholder:text-slate-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full h-9 w-9 m-1 flex items-center justify-center transition-all shadow-sm shadow-cyan-200">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </form>

            {/* SEARCH SUGGESTIONS */}
            <AnimatePresence>
              {searchQuery.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl overflow-hidden z-[110] border border-slate-100 mt-2 p-2"
                >
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8 gap-3">
                      <Loader2 size={20} className="animate-spin text-cyan-500" />
                      <span className="text-sm text-slate-500 font-medium">Looking for excellence...</span>
                    </div>
                  ) : suggestions.products.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.products.map(p => {
                        const rawImg = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                        const imageSrc = rawImg && !rawImg.startsWith('http') && !rawImg.startsWith('/') ? `/${rawImg}` : rawImg;
                        return (
                          <Link 
                            key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                            className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all border-b border-slate-50 last:border-0 group"
                          >
                            <div className="h-12 w-12 bg-white rounded-lg border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                              <img src={imageSrc} className="max-h-full max-w-full object-contain p-1 group-hover:scale-110 transition-transform" alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[14px] font-semibold text-slate-800 line-clamp-1 group-hover:text-cyan-600 transition-colors">{p.name}</h4>
                              <p className="text-[12px] font-bold text-cyan-600">${p.price}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm text-slate-400 font-medium">No results found for your search</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* User Account */}
            <Link to={user ? "/profile" : "/login"} className="hidden sm:flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-full transition-all group">
               <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-all border border-slate-200">
                  <User size={20} />
               </div>
               <div className="hidden xl:block">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Account</p>
                  <p className="text-[13px] font-bold text-slate-800 leading-none">
                    {user?.name ? user.name.split(' ')[0] : 'Sign In'}
                  </p>
               </div>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex items-center justify-center h-10 w-10 bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-full transition-all relative group border border-slate-200">
              <Heart size={20} className={cn(wishlistCount > 0 && "fill-current")} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={openCartDrawer} className="flex items-center justify-center h-10 w-10 bg-slate-900 text-white hover:bg-cyan-600 rounded-full transition-all relative shadow-md shadow-slate-200 group border border-slate-800">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:bg-slate-900 transition-colors">
                {cartCount}
              </span>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden flex items-center justify-center h-10 w-10 bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-full transition-all">
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* --- SECONDARY NAVIGATION: CATEGORIES & LINKS --- */}
        {!isScrolled && (
          <div className="bg-slate-50 border-b border-slate-200/60 px-4 md:px-8 py-0 flex items-center gap-1 relative">
              <div className="relative group/cat" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsAllDropdownOpen(!isAllDropdownOpen)}
                    onMouseEnter={() => setIsAllDropdownOpen(true)}
                    className={cn(
                      "flex items-center gap-2 py-3.5 px-4 text-[13px] font-bold transition-all border-x border-transparent whitespace-nowrap",
                      isAllDropdownOpen ? "bg-white border-slate-200 text-cyan-600" : "text-slate-700 hover:text-cyan-600 hover:bg-white"
                    )}
                  >
                    <LayoutGrid size={18} className={cn(isAllDropdownOpen ? "text-cyan-600" : "text-slate-400")} />
                    All Categories
                    <ChevronDown size={14} className={cn("transition-transform duration-200", isAllDropdownOpen && "rotate-180")} />
                  </button>

                  {/* --- CATEGORY DROPDOWN --- */}
                  <AnimatePresence>
                      {isAllDropdownOpen && (
                          <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              onMouseLeave={() => setIsAllDropdownOpen(false)}
                              className="absolute top-full left-0 w-[280px] bg-white text-slate-900 shadow-2xl rounded-b-2xl overflow-hidden z-[500] border border-slate-200"
                          >
                              <div className="bg-slate-50/50 px-5 py-4 border-b border-slate-100">
                                  <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-slate-400">Shop Printers</h3>
                              </div>
                              <div className="max-h-[400px] overflow-y-auto py-2 px-2 custom-scrollbar">
                                  {categories.map(cat => (
                                      <Link 
                                          key={cat.id} 
                                          to={`/shop?category=${cat.slug}`} 
                                          onClick={() => setIsAllDropdownOpen(false)}
                                          className="flex items-center justify-between px-3 py-2.5 hover:bg-cyan-50 rounded-xl hover:text-cyan-700 transition-all text-[14px] font-semibold group"
                                      >
                                          {cat.name}
                                          <ChevronRight size={14} className="text-slate-300 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                                      </Link>
                                  ))}
                                  <div className="mt-2 pt-2 border-t border-slate-100 px-2">
                                      <Link to="/shop" onClick={() => setIsAllDropdownOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-cyan-600 transition-colors mb-2">
                                        View All Inventory <ArrowRight size={16} />
                                      </Link>
                                  </div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>
              
              <div className="flex items-center h-full overflow-x-auto no-scrollbar">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={cn(
                      "py-3.5 px-4 text-[13px] font-semibold transition-all whitespace-nowrap relative group",
                      location.pathname === link.path ? "text-cyan-600" : "text-slate-600 hover:text-cyan-600"
                    )}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full mx-4" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center rounded-full mx-4" />
                  </Link>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-2 ml-auto pr-8">
                <Mail size={16} className="text-cyan-500" />
                <span className="text-[13px] font-bold text-slate-800">info@myprinterstore.shop</span>
              </div>
          </div>
        )}
      </header>

      {/* --- MOBILE SEARCH BAR (Visible only on mobile) --- */}
      <div className="lg:hidden bg-white px-4 pb-4 pt-2 border-b border-slate-100">
          <form onSubmit={handleSearch} className="w-full flex items-center bg-slate-100 rounded-full overflow-hidden h-10 border border-slate-200">
            <input 
              type="text" 
              placeholder="Search..." 
              className="flex-1 bg-transparent px-4 py-2 text-[14px] text-slate-900 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-slate-900 text-white p-2 rounded-full m-1">
              <Search size={16} />
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
              className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[210] flex flex-col shadow-2xl text-slate-900"
            >
              <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="flex justify-between items-start mb-6 relative z-10">
                   <div className="h-12 w-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                      <User size={24} className="text-cyan-400" />
                   </div>
                   <button onClick={() => setIsSidebarOpen(false)} className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <X size={20} />
                   </button>
                </div>
                <div className="relative z-10">
                   <h2 className="text-xl font-bold">Hello, {user ? user.name.split(' ')[0] : 'Guest'}</h2>
                   <p className="text-slate-400 text-xs mt-1 font-medium tracking-wider uppercase">Welcome to My Printer Store</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                <div className="mb-8">
                  <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-2">Main Navigation</h3>
                  <div className="grid gap-1">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all text-slate-700 font-semibold group">
                        <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-cyan-500 transition-colors" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 px-2">Top Categories</h3>
                  <div className="grid gap-1">
                    {categories.slice(0, 8).map(cat => (
                       <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-cyan-50 text-slate-700 font-semibold transition-all group">
                         {cat.name} 
                         <ChevronRight size={14} className="text-slate-300 group-hover:text-cyan-500 transition-all" />
                       </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="grid gap-1">
                    <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold">
                      <User size={18} className="text-slate-400" />
                      Your Profile
                    </Link>
                    {user ? (
                        <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-semibold w-full text-left">
                          <LogOut size={18} />
                          Sign Out
                        </button>
                    ) : (
                      <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 text-cyan-600 font-semibold">
                        <User size={18} />
                        Sign In / Register
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
