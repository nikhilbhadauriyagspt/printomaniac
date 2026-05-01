import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import Search from 'lucide-react/dist/esm/icons/search';
import User from 'lucide-react/dist/esm/icons/user';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import Mail from 'lucide-react/dist/esm/icons/mail';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

import { useGlobal } from '../context/GlobalContext';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const { categories: globalCategories, products: globalProducts } = useGlobal();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Normalize categories
  const categories = globalCategories.flatMap(parent => parent.children || [])
    .filter(cat => !cat.name.toLowerCase().includes('laptop'));

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = () => {
      if (searchQuery.trim().length > 1 && globalProducts.length > 0) {
        setIsSearching(true);
        const filtered = globalProducts
          .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, 5);
        setSuggestions({ products: filtered });
        setIsSearching(false);
      } else {
        setSuggestions({ products: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, globalProducts]);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined') {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.role !== 'admin' ? parsed : null);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      navigate(`/shop?${params.toString()}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setSuggestions({ products: [] });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasMegaMenu: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const topHeaderHeight = 110;
  const totalHeaderHeight = topHeaderHeight;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[140] bg-white/95 backdrop-blur-xl border-b border-blue-50 shadow-sm">
        {/* Tier 1: Minimal Top Utility Bar */}
        <div className="w-full bg-slate-900 text-white/80 py-2 border-b border-white/5">
          <div className="max-w-[1820px] mx-auto px-6 md:px-10 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-6">
              <span className="text-blue-400">Welcome to Printo Maniac Store</span>
              <span className="hidden lg:inline-block h-3 w-px bg-white/20" />
              <span className="hidden lg:inline text-white/60">Quality Printers & Genuine Supplies</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:info@printomaniac.com" className="hover:text-white transition-colors lowercase font-medium tracking-normal">info@printomaniac.com</a>
              <Link to="/orders" className="hover:text-blue-400 transition-colors">Track Order</Link>
            </div>
          </div>
        </div>

        {/* Tier 2: Unified Main Header (Nav, Search, Actions) */}
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 py-3 flex items-center justify-between gap-6 md:gap-10">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 text-slate-600 hover:text-blue-800 transition"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="relative group">
              <img
                src="/logo/logo.png"
                alt="Logo"
                width="161"
                height="44"
                fetchPriority="high"
                loading="eager"
                className="h-8 md:h-10 lg:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Integrated Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group/nav"
                onMouseEnter={() => link.hasMegaMenu && setActiveMegaMenu('shop')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-all flex items-center gap-1.5",
                    location.pathname === link.path 
                      ? "text-blue-800 bg-blue-50/50" 
                      : "text-slate-600 hover:text-blue-800 hover:bg-blue-50/30"
                  )}
                >
                  {link.name}
                  {link.hasMegaMenu && <ChevronDown size={12} className={cn("transition-transform duration-300", activeMegaMenu === 'shop' && "rotate-180")} />}
                </Link>

                {/* Integrated Mega Menu */}
                <AnimatePresence>
                  {activeMegaMenu === 'shop' && link.hasMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute left-0 top-full pt-4 w-screen max-w-[900px] z-[250]"
                    >
                      <div className="bg-white rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-blue-50 p-10 flex gap-10 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-800" />
                        <div className="flex-1 relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-blue-800 text-white rounded-2xl flex items-center justify-center">
                              <LayoutGrid size={20} />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-slate-900 leading-none">Catalog Browser</h2>
                              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Select Category</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                            {categories.slice(0, 10).map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/shop?category=${cat.slug}`}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group/item flex items-center justify-between py-1.5 border-b border-transparent hover:border-blue-50 transition-all"
                              >
                                <span className="text-[13px] font-medium text-slate-600 group-hover/item:text-blue-800 transition-colors">{cat.name}</span>
                                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-blue-500" />
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="w-[280px] bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group/cta">
                          <h2 className="text-2xl font-black text-white leading-tight mb-4 relative z-10">Verified<br/>Hardware.</h2>
                          <Link to="/shop" onClick={() => setActiveMegaMenu(null)} className="flex items-center justify-center gap-3 w-full py-4 bg-white text-blue-800 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl relative z-10">
                            Explore All <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Minimal Search Bar (Compact Pill) */}
          <div className="hidden lg:flex flex-1 max-w-[350px] relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative flex items-center bg-slate-100/50 border border-blue-100/50 rounded-2xl px-5 py-2 transition-all focus-within:bg-white focus-within:border-blue-400 focus-within:shadow-[0_0_20px_rgba(59,130,246,0.04)]">
                <Search size={16} className="text-blue-400" />
                <label htmlFor="search-input" className="sr-only">Search products</label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex-1 bg-transparent px-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-400 font-medium"
                />
                {isSearching && <Loader2 size={14} className="animate-spin text-blue-500" />}
              </div>
            </form>

            {/* Compact Suggestions */}
            <AnimatePresence>
              {isSearchOpen && searchQuery.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-3 w-full bg-white border border-blue-50 shadow-2xl rounded-2xl overflow-hidden z-[220] p-2"
                >
                  {suggestions.products.length > 0 ? (
                    <div className="space-y-0.5">
                      {suggestions.products.map((p) => {
                        let imageSrc = '';
                        try {
                          imageSrc = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                        } catch { imageSrc = ''; }
                        return (
                          <Link
                            key={p.id}
                            to={`/product/${p.slug}`}
                            onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                            className="flex items-center gap-4 p-2 hover:bg-blue-50/50 rounded-xl transition-all group"
                          >
                            <div className="h-10 w-10 bg-white border border-blue-50 rounded-lg flex items-center justify-center p-1">
                              {imageSrc && (
                                <img 
                                  src={imageSrc.replace(/\.png$/, '-150x150.png')} 
                                  onError={(e) => { e.target.onerror = null; e.target.src = imageSrc; }}
                                  alt={p.name} 
                                  width="40"
                                  height="40"
                                  className="max-h-full max-w-full object-contain" 
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[11px] font-semibold text-slate-800 truncate group-hover:text-blue-800 transition-colors">{p.name}</h3>
                              <p className="text-blue-800 font-bold text-[11px]">${p.price}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    !isSearching && <div className="p-4 text-center text-slate-400 font-medium text-[10px] italic">No results found.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
              className="lg:hidden p-2 text-slate-500 hover:text-blue-800"
            >
              <Search size={22} />
            </button>

            {/* Account */}
            <div className="relative group hidden sm:block">
              <button onClick={() => navigate(user ? '/profile' : '/login')} className="flex flex-col items-center gap-0.5 group">
                <div className="w-10 h-10 rounded-full border border-blue-50 bg-white flex items-center justify-center text-slate-500 group-hover:text-blue-800 group-hover:border-blue-200 transition-all shadow-sm">
                  <User size={18} strokeWidth={1.8} />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-800 transition-colors">{user ? 'Account' : 'Login'}</span>
              </button>
              <div className="absolute top-full right-0 mt-3 w-60 bg-white border border-blue-50 shadow-2xl rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[200]">
                {user ? (
                  <div className="space-y-3">
                    <div className="pb-2 border-b border-blue-50">
                      <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mb-0.5">Welcome back</p>
                      <p className="text-[13px] font-bold text-slate-900 truncate">{user.name}</p>
                    </div>
                    <div className="space-y-0.5">
                      <Link to="/profile" className="flex items-center gap-2.5 p-2 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition">
                        <LayoutGrid size={14} /> My Dashboard
                      </Link>
                      <Link to="/orders" className="flex items-center gap-2.5 p-2 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition">
                        <ShoppingBag size={14} /> Order History
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 p-2 text-[11px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition mt-1 border-t border-blue-50 pt-2">
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-none mb-4">Member Portal</h3>
                    <Link to="/login" className="block w-full py-2.5 bg-blue-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-800/20">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="flex flex-col items-center gap-0.5 group relative">
              <div className="w-10 h-10 rounded-full border border-blue-50 bg-white flex items-center justify-center text-slate-500 group-hover:text-blue-800 group-hover:border-blue-200 transition-all shadow-sm">
                <Heart size={18} strokeWidth={1.8} className={cn(wishlistCount > 0 && "fill-blue-500 text-blue-500")} />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-800 transition-colors">Saved</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-800 text-white text-[8px] font-black h-4.5 min-w-[18px] flex items-center justify-center rounded-full border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={openCartDrawer} className="flex flex-col items-center gap-0.5 group relative">
              <div className="w-10 h-10 rounded-full border border-blue-50 bg-white flex items-center justify-center text-slate-500 group-hover:text-blue-800 group-hover:border-blue-200 transition-all shadow-sm">
                <ShoppingBag size={18} strokeWidth={1.8} />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-800 transition-colors">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-800 text-white text-[8px] font-black h-4.5 min-w-[18px] flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: `${totalHeaderHeight}px` }} />

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-black/50"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[210] flex flex-col border-r border-[#e5e5e5]"
            >
              <div className="p-5 border-b border-[#ececec] flex justify-between items-center">
                <img src="/logo/logo.png" alt="Logo" width="140" height="38" className="h-10 object-contain" />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-[#222] hover:bg-[#f5f5f5] transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto space-y-8">
                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.08em]">
                    Menu
                  </p>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-xl text-[15px] transition',
                          location.pathname === link.path
                            ? 'bg-[#f4faf4] text-blue-800 font-semibold'
                            : 'text-[#333] hover:bg-[#f7f7f7]'
                        )}
                      >
                        {link.name}
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-gray-500 mb-3 uppercase tracking-[0.08em]">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] text-[#333] hover:bg-[#f7f7f7] transition"
                      >
                        {cat.name}
                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#ececec]">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full py-3 rounded-xl bg-blue-800 text-white text-center font-semibold"
                  >
                    Sign In
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
