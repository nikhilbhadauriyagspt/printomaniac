import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Heart, 
  ChevronDown, 
  X,
  LogOut,
  ChevronRight,
  Loader2,
  LayoutGrid,
  Menu, 
  Printer, 
  ShieldCheck, 
  ArrowRight,
  ShoppingCart,
  Zap,
  PackageCheck,
  Phone,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, cart, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const categoryMenuRef = useRef(null);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  // Suggestions Logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=8`);
          const pData = await pRes.json();
          if (pData.status === 'success') {
            setSuggestions({ products: pData.data || [], categories: [] });
          } else {
            setSuggestions({ products: [], categories: [] });
          }
        } catch (err) { 
          console.error('Search Error:', err); 
          setSuggestions({ products: [], categories: [] });
        } finally { 
          setIsSearching(false); 
        }
      } else {
        setSuggestions({ products: [], categories: [] });
        setIsSearching(false);
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
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setCategories(data.data.filter(cat => !cat.name.toLowerCase().includes('laptop')));
        }
      });
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
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-sans shadow-xl">
        
        {/* --- LAYER 1: PREMIUM TOP BAR --- */}
        <div className="bg-[#002a6b] border-b border-blue-800/50 py-2.5 px-4 md:px-10 hidden lg:block">
          <div className="max-w-[1920px] mx-auto flex justify-between items-center text-[14px] font-medium text-blue-100/80 ">
            
            {/* Left Side: Contact Info */}
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Mail size={13} className="text-blue-400" /> info@printerbrother.shop</span>
            </div>

            {/* Right Side: Quick Links */}
            <div className="flex items-center gap-6">
              <Link to={user ? "/profile" : "/login"} className="flex items-center gap-2 hover:text-white transition-colors border-r border-blue-800 pr-6">
                <User size={13} />
                <span>{user ? user.name : 'Sign In / Register'}</span>
              </Link>
              <Link to="/wishlist" className="flex items-center gap-2 hover:text-white transition-colors border-r border-blue-800 pr-6">
                <Heart size={13} />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link to="/checkout" className="flex items-center gap-2 hover:text-white transition-colors border-r border-blue-800 pr-6">
                <PackageCheck size={13} />
                <span>Checkout</span>
              </Link>
              <Link to="/faq" className="hover:text-white transition-colors">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* --- LAYER 2: MAIN HEADER (BRAND & SEARCH) --- */}
        <div className="bg-[#003b95] py-5 px-4 md:px-10">
          <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-10">
            
            {/* Logo Area */}
            <Link to="/" className="shrink-0 transition-transform hover:scale-105 duration-300">
              <img src="/logo/MYPRINTERMANNN.png" alt="Printer Brother" className="h-10 md:h-12 w-auto object-contain brightness-0 invert" />
            </Link>

            {/* Center Search Bar Terminal */}
            <div className="hidden lg:flex flex-1 max-w-4xl" ref={searchRef}>
              <form 
                onSubmit={handleSearch} 
                className="flex w-full h-[46px] bg-white rounded-md relative border-2 border-white focus-within:border-[#ffb700] transition-all"
              >
               

                {/* Input Area */}
                <input 
                  type="text" 
                  placeholder="Browse printers and accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  className="flex-1 px-6 text-[13px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-400 placeholder:font-normal"
                />

                {/* Search Button (Yellow) */}
                <button type="submit" className="bg-[#ffb700] hover:bg-[#e6a600] text-gray-900 px-8 flex items-center justify-center transition-all rounded-r-[3px]">
                  <Search size={20} strokeWidth={3} />
                </button>

                {/* Suggestions Overlay */}
                <AnimatePresence>
                  {searchQuery.trim().length > 0 && (isSearching || (suggestions.products && suggestions.products.length >= 0)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      className="absolute top-full left-[-2px] right-[-2px] mt-2 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-lg border border-gray-100 overflow-hidden z-[200]"
                    >
                      <div className="p-2">
                        {isSearching ? (
                          <div className="p-10 text-center">
                            <Loader2 size={24} className="animate-spin mx-auto text-blue-600 mb-2" />
                            <p className="text-[10px] font-black uppercase text-gray-400">Searching Inventory...</p>
                          </div>
                        ) : suggestions.products && suggestions.products.length > 0 ? (
                          <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                            {suggestions.products.map(p => {
                              const firstImage = p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : '';
                              const imageSrc = firstImage && !firstImage.startsWith('/') && !firstImage.startsWith('http') ? `/${firstImage}` : firstImage;
                              return (
                                <Link 
                                  key={p.id} 
                                  to={`/product/${p.slug}`} 
                                  onClick={() => setSearchQuery('')} 
                                  className="flex items-center gap-5 p-3.5 hover:bg-blue-50 group rounded-lg transition-all"
                                >
                                  <div className="h-12 w-12 bg-gray-50 p-1 flex items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                                    <img src={imageSrc} className="max-h-full max-w-full object-contain" alt="" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-black text-gray-900 uppercase truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                                    <p className="text-[11px] font-bold text-blue-600">${p.price}</p>
                                  </div>
                                  <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="p-10 text-center text-gray-400">
                            <p className="text-[11px] font-black uppercase tracking-widest">No products found for "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>


            {/* Right Side: Cart Summary */}
            <div className="flex items-center gap-4">
              <button 
                onClick={openCartDrawer}
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-all p-2 pr-6 rounded-md group border border-white/5"
              >
                <div className="h-10 w-10 bg-[#ffb700] rounded flex items-center justify-center text-gray-900 relative">
                  <ShoppingCart size={20} strokeWidth={3} />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-[#003b95]">{cartCount}</span>}
                </div>
                <div className="flex flex-col items-start leading-none text-white">
                  <span className="text-[10px] font-bold uppercase opacity-60 mb-1 group-hover:opacity-100">Shopping Cart</span>
                  <span className="text-[14px] font-black tracking-tight">${cartTotal}</span>
                </div>
              </button>

              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden h-10 w-10 flex items-center justify-center text-white bg-white/10 rounded-md"><Menu size={24} /></button>
            </div>
          </div>
        </div>

        {/* --- LAYER 3: NAVIGATION BAR --- */}
        <div className="bg-[#0047ab] px-4 md:px-10 h-[50px] hidden lg:block">
          <div className="max-w-[1920px] mx-auto flex items-center h-full relative">
            
            {/* Category Button (Yellow Accent) */}
            <div className="h-full relative z-10" ref={categoryMenuRef}>
              <button 
                onMouseEnter={() => setActiveDropdown('categories')}
                className="h-full bg-[#ffb700] hover:bg-[#e6a600] px-8 flex items-center gap-4 text-gray-900 text-[12px] font-black uppercase tracking-wider transition-all"
              >
                <LayoutGrid size={18} strokeWidth={3} />
                Browse All Departments
                <ChevronDown size={14} strokeWidth={3} />
              </button>

              {/* Mega Dropdown Placeholder */}
              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 w-[1000px] bg-white text-gray-900 shadow-2xl rounded-b-xl border-t-4 border-[#ffb700] grid grid-cols-4 overflow-hidden z-[120]"
                  >
                    {/* Left Side: Categories */}
                    <div className="col-span-3 grid grid-cols-3 p-8 gap-8 border-r border-gray-100">
                      {categories.slice(0, 6).map(cat => (
                        <div key={cat.id} className="space-y-4">
                          <Link to={`/shop?category=${cat.slug}`} onClick={() => setActiveDropdown(null)} className="text-[13px] font-black uppercase text-blue-700 hover:text-black transition-colors block border-b-2 border-gray-50 pb-2">{cat.name}</Link>
                          <div className="flex flex-col gap-2">
                            {cat.children?.map(sub => (
                              <Link key={sub.id} to={`/shop?category=${sub.slug}`} onClick={() => setActiveDropdown(null)} className="text-[15px] font-bold text-gray-500 hover:text-blue-600 flex items-center gap-2"><ChevronRight size={10} /> {sub.name}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Side: High-Impact Promo Section */}
                    <div className="col-span-1 relative bg-gray-900 flex flex-col justify-end overflow-hidden">
                      {/* Background Image with Overlay */}
                      <img 
                        src="/category/laser-printers.jpg" 
                        alt="Promo" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003b95] via-transparent to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="relative p-8 z-10">
                        <div className="bg-[#ffb700] w-12 h-1 mb-4" />
                        <h4 className="text-white text-xl font-black uppercase italic leading-tight mb-2 tracking-tighter">
                          Pro <br /> <span className="text-[#ffb700]">Collection</span>
                        </h4>
                        <p className="text-blue-100 text-[11px] font-medium mb-6 leading-relaxed opacity-80">
                          Upgrade your workspace with our enterprise-grade printing terminals.
                        </p>
                        <Link 
                          to="/shop" 
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center gap-2 bg-[#ffb700] hover:bg-white text-[#003b95] px-6 py-3 rounded-md text-[11px] font-black uppercase tracking-widest transition-all shadow-lg"
                        >
                          Shop Now
                          <ArrowRight size={14} strokeWidth={3} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Menu - Centered */}
            <nav className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 h-full pointer-events-auto">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} to={link.path} 
                    className={cn(
                      "px-6 h-full flex items-center text-[11px] font-black uppercase tracking-[0.15em] text-white hover:bg-white/10 transition-all relative group",
                      location.pathname === link.path && "text-[#ffb700]"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[60px] lg:h-[156px]"></div>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 h-full w-[320px] bg-white z-[210] flex flex-col shadow-2xl border-r-4 border-[#003b95]">
              <div className="p-6 bg-[#003b95] flex justify-between items-center text-white">
                <span className="text-xl font-black italic">MENU</span>
                <button onClick={() => setIsSidebarOpen(false)} className="h-10 w-10 flex items-center justify-center bg-white/10 rounded-md"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Navigation</p>
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg text-[12px] font-black uppercase text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-100">
                      {link.name} <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User Tools</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"><User size={20} className="mb-2 text-blue-600" /><span className="text-[10px] font-black uppercase">Account</span></Link>
                    <Link to="/wishlist" onClick={() => setIsSidebarOpen(false)} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100"><Heart size={20} className="mb-2 text-red-500" /><span className="text-[10px] font-black uppercase">Wishlist</span></Link>
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
