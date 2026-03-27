import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, MoveRight, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

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
            .slice(0, 6);
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
    <footer className="bg-white text-slate-900 pt-20 pb-10 font-jakarta border-t border-slate-100">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-slate-100">
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group transition-transform hover:scale-105">
              <img src="/logo/logo.png" alt="My Printer Store" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-md">
              Reliable printers and essential supplies for your daily needs. Quality printer and expert support directly to your doorstep.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col md:flex-row items-start md:items-center justify-end gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-600" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Stay updated</h3>
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Join our community for the latest news.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-0 w-full md:w-auto group">
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 md:w-72 bg-slate-50 border border-slate-200 rounded-l-xl px-6 py-4 text-[11px] font-black uppercase tracking-widest outline-none focus:border-cyan-500/50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button
                disabled={loading}
                className="h-[52px] px-8 bg-slate-900 text-white rounded-r-xl flex items-center justify-center hover:bg-cyan-600 transition-all shrink-0 shadow-lg shadow-slate-200 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <MoveRight size={20} />}
              </button>
            </form>
          </div>
        </div>

        {/* --- LINKS SECTION: BENTO STYLE --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <h4 className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.25em]">Address</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                   <MapPin size={16} />
                </div>
                <p className="text-[13px] font-bold text-slate-500 leading-relaxed group-hover:text-slate-900 transition-colors">1401 N Loop W, Houston, TX 77008, USA</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500">
                   <Mail size={16} />
                </div>
                <p className="text-[13px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors">info@myprinterstore.shop</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.25em]">Printers</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-cyan-600 transition-all text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 group">
                    <div className="h-px w-0 bg-cyan-600 group-hover:w-3 transition-all duration-300" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.25em]">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About us', path: '/about' },
                { name: 'Contact us', path: '/contact' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Track order', path: '/orders' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-cyan-600 transition-all text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 group">
                    <div className="h-px w-0 bg-cyan-600 group-hover:w-3 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black text-cyan-600 uppercase tracking-[0.25em]">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy policy', path: '/privacy-policy' },
                { name: 'Terms & conditions', path: '/terms-and-conditions' },
                { name: 'Return policy', path: '/return-policy' },
                { name: 'Shipping policy', path: '/shipping-policy' },
                { name: 'Cookie policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-cyan-600 transition-all text-[13px] font-bold uppercase tracking-wider flex items-center gap-2 group">
                    <div className="h-px w-0 bg-cyan-600 group-hover:w-3 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- FOOTER BOTTOM: TRUST & LEGAL --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-100">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">
              © 2026 My Printer Store. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
               <Shield size={14} className="text-cyan-600" /> Encrypted Transaction
            </div>
          </div>
        </div>

        {/* --- DISCLAIMER: MINIMAL --- */}
        <div className="mt-12 text-center max-w-2xl mx-auto border-t border-slate-100 pt-8">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
            Disclaimer: For informational purposes only. No software installation or distribution.
          </p>
        </div>
      </div>
    </footer>
  );
}


