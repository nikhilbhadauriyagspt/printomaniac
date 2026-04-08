import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, ShieldCheck, ArrowRight, Phone, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 5);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Orders', path: '/orders' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="bg-white text-slate-900 pt-12 md:pt-16 pb-12 font-jakarta border-t border-slate-100 overflow-hidden relative">
      <div className="w-full px-4 md:px-8 lg:px-12">
        
        {/* --- SLIM & MINIMAL NEWSLETTER BAR --- */}
        <div className="mb-16 border-y border-slate-50 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-1.5 text-center lg:text-left">
              <span className="text-blue-600 text-[9px] font-black uppercase tracking-[4px]">Elevate Your Printing</span>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 ">Subscribe for Exclusive printer Insights.</h3>
              <p className="text-slate-400 text-[11px] font-bold">Join our elite list of professionals and receive the latest updates.</p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
              <div className="relative flex-1">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3.5 text-sm font-bold outline-none focus:bg-white focus:border-blue-600 transition-all placeholder:text-slate-300"
                />
              </div>
              <button
                disabled={loading}
                className="px-8 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-[2px] active:scale-95 shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Join Now"}
              </button>
            </form>
          </div>
        </div>

        {/* --- MAIN LINKS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
              <img src="/logo/logo.png" alt="Logo" className="h-14 w-auto" />
            </Link>
            <p className="text-slate-500 text-[13px] font-bold leading-relaxed max-w-sm">
              The United States' premier source for professional-grade printing solutions. Precision-engineered for excellence.
            </p>
            
            <div className="pt-2 space-y-4">
               <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-[12px] font-black text-slate-700 uppercase  leading-tight">
                    2300 Lakeland Dr, Flowood, MS 39232, United States
                  </span>
               </div>
               <div className="flex items-center gap-3">
                  <Mail size={18} className="text-blue-600 shrink-0" />
                  <a href="mailto:info@luxprinters.shop" className="text-[15px] font-black text-slate-700  hover:text-blue-600 transition-colors">
                    info@luxprinters.shop
                  </a>
               </div>
               
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-slate-400 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 hover:text-blue-600 text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group">
                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-slate-400 mb-8">Expertise</h4>
            <div className="grid gap-4">
              {categories.map((cat) => (
                <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="text-slate-600 hover:text-blue-600 text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group">
                   <div className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-blue-600 transition-colors" />
                   {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal/Support Column */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[4px] text-slate-400 mb-8">Commitment</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-600 hover:text-blue-600 text-[10px] font-black uppercase tracking-[2px] transition-all flex items-center gap-2 group">
                    <ShieldCheck size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[4px]">
            © 2026 Lux Printers. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
            <div className="flex items-center gap-2">
               <ShieldCheck size={16} className="text-blue-600" />
               <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">SSL Secured</span>
            </div>
          </div>
        </div>

        {/* --- GLOBAL DISCLAIMER --- */}
        <div className="mt-12 text-center">
           <p className="text-slate-600 text-[8px] font-black uppercase tracking-[3px] leading-loose max-w-4xl mx-auto">
             Disclaimer: For informational purposes only. No software installation or distribution.
           </p>
        </div>
      </div>
    </footer>
  );
}
