import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
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

  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-jakarta border-t border-slate-100 overflow-hidden">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- TOP NEWSLETTER BANNER --- */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
                <Sparkles size={12} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[2px] text-blue-400">Join our Elite Circle</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Get exclusive <span className="text-blue-500">printing insights</span> and professional updates.
              </h3>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/10 rounded-full pl-12 pr-4 py-4 text-white text-xs font-bold outline-none focus:bg-white/20 focus:border-blue-500/50 transition-all placeholder:text-slate-500"
                />
              </div>
              <button
                disabled={loading}
                className="h-12 px-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all font-black text-[11px] uppercase tracking-[2px] shadow-xl shadow-blue-900/20 shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* --- MAIN LINKS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Address */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <img src="/logo/logo.png" alt="Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed ">
              Your premier destination for high-performance printing solutions. Precision-engineered for excellence across the USA.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MapPin size={18} />
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">2300 Lakeland Dr, Flowood, MS 39232, United States</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Mail size={18} />
                </div>
                <a href="mailto:info@printerclub.shop" className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">info@printerclub.shop</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'Shop', 'Track Order', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-500 hover:text-blue-600 text-[11px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <div className="h-[1px] w-0 bg-blue-600 group-hover:w-3 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Categories</h4>
            <ul className="flex flex-col gap-4">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 text-[11px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 group truncate block">
                    <div className="h-[1px] w-0 bg-blue-600 group-hover:w-3 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[3px] text-blue-600 mb-8">Support</h4>
            <ul className="flex flex-col gap-4">
              {['Privacy Policy', 'Terms of Service', 'Return Policy', 'Shipping Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-slate-500 hover:text-blue-600 text-[11px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    <div className="h-[1px] w-0 bg-blue-600 group-hover:w-3 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
             <p className="text-[10px] text-slate-800 font-bold uppercase tracking-widest opacity-60">
                © 2026 Printer Club. All rights reserved. 
             </p>
          </div>
          
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 hover:opacity-100 transition-all cursor-pointer" />
           
           
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[3px] leading-relaxed max-w-4xl mx-auto ">
            Disclaimer: For informational purposes only. No software installation or distribution. 
          </p>
        </div>
      </div>
    </footer>
  );
}
