import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, Sparkles, MoveRight } from 'lucide-react';
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
    <footer className="bg-white text-slate-900 pt-12 pb-8 font-jakarta border-t border-slate-100">
      <div className="w-full px-4 md:px-6 lg:px-10">
        
        {/* --- COMPACT TOP SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-10 border-b border-slate-50">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block transition-transform hover:scale-105 duration-300">
              <img src="/logo/logo.png" alt="Axel Printing" className="h-15 w-auto object-contain" />
            </Link>
            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
              We provide reliable printers and essential supplies for your daily needs. 
              Our focus is on delivering quality products and friendly support 
              directly to your doorstep, making your experience simple and easy.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col md:flex-row items-center justify-end gap-6 md:gap-12">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles size={14} className="text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Stay Updated</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">Join our community for the latest news.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-60 bg-slate-50 border border-slate-100 rounded-full px-5 py-3 text-xs outline-none focus:border-blue-600 transition-all"
              />
              <button
                disabled={loading}
                className="h-10 w-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 shrink-0"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <MoveRight size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Address</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[13px] font-medium text-slate-600 leading-relaxed">2404 Irving Blvd, Dallas, TX 75207, United States</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-blue-600 shrink-0" />
                <p className="text-[13px] font-medium text-slate-600">info@axelprinting.shop</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Hardware</h4>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 hover:text-blue-600 transition-all text-[13px] font-medium flex items-center gap-2 group">
                    <div className="h-px w-0 bg-blue-600 group-hover:w-2 transition-all" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Company</h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Track Orders', path: '/orders' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-all text-[13px] font-medium flex items-center gap-2 group">
                    <div className="h-px w-0 bg-blue-600 group-hover:w-2 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Legal</h4>
            <ul className="grid grid-cols-1 gap-2">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-600 transition-all text-[13px] font-medium flex items-center gap-2 group">
                    <div className="h-px w-0 bg-blue-600 group-hover:w-2 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-50">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            © 2026 Axel Printing. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6 transition-all">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>

          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
Disclaimer - For Informational only. No software installation or distribution.          </p>
        </div>
      </div>
    </footer>
  );
}
