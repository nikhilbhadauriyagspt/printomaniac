import { Link } from 'react-router-dom';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

import { useGlobal } from '../context/GlobalContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useCart();
  const { categories: globalCategories } = useGlobal();

  // Normalize and filter categories for footer
  const categories = globalCategories.flatMap(cat => [cat, ...(cat.children || [])])
    .filter(cat => 
      !cat.name.toLowerCase().includes('laptop') && 
      !cat.slug.toLowerCase().includes('laptop') &&
      !cat.name.toLowerCase().includes('chromebook')
    )
    .filter((v, i, a) => a.findIndex(t => t.slug === v.slug) === i)
    .slice(0, 5);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Track Order', path: '/orders' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }, 
    { name: 'FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-and-conditions' },
    { name: 'Return Policy', path: '/return-policy' },
    { name: 'Shipping Policy', path: '/shipping-policy' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
  ];

  return (
    <footer className="w-full bg-white text-slate-900 pt-24 pb-8 border-t border-slate-100 relative overflow-hidden">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800 opacity-80" />

      <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-20 pb-20">
          
          {/* --- BRAND COLUMN --- */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="inline-block">
              <img 
                src="/logo/logo.png" 
                alt="Logo" 
                width="205" 
                height="56" 
                className="h-14 w-auto object-contain" 
              />
            </Link>
            <div className="space-y-6">
              <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-[300px]">
We help small businesses and home offices get printing right without the usual hassle. Whether it’s everyday documents or important work, you can count on clean, sharp results every time you print.
              </p>
             
            </div>
          </div>

          {/* --- LINKS COLUMNS --- */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-10">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-800 mb-10 flex items-center gap-3">
                <div className="w-6 h-px bg-blue-800" /> Navigation
              </h3>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-900 text-[13px] font-bold uppercase tracking-widest">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-800 mb-10 flex items-center gap-3">
                <div className="w-6 h-px bg-blue-800" /> Categories
              </h3>
              <ul className="space-y-4 min-h-[200px]">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-slate-900 text-[13px] font-bold uppercase tracking-widest">{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- UTILITY / NEWSLETTER COLUMN --- */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-800 mb-10 flex items-center gap-3">
              <div className="w-6 h-px bg-blue-800" /> Newsletter
            </h3>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem]">
              <p className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-6">Join our network</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <label htmlFor="footer-email" className="sr-only">Email address for newsletter</label>
                <input
                  id="footer-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  aria-label="Email address for newsletter"
                  className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl text-[12px] font-bold tracking-widest outline-none focus:border-blue-800"
                />
                <button
                  disabled={loading}
                  aria-label={loading ? "Subscribing..." : "Subscribe Now"}
                  className="w-full h-14 bg-blue-800 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl active:scale-95 transition-transform"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Subscribe Now'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* --- CONTACT STRIP --- */}
        <div className=" border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 py-10">
           <div className="flex items-center gap-5">
              <div className="h-12 w-12 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-2xl text-blue-800"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Us</p>
                <a href="mailto:info@printomaniac.com" className="text-[14px] font-bold text-slate-900">info@printomaniac.com</a>
              </div>
           </div>
           <div className="flex items-center gap-5">
              <div className="flex items-center gap-4 grayscale opacity-80">
                 <img src="/assets/paypal.svg" alt="PayPal" width="60" height="16" className="h-4 w-auto" />
                 <div className="w-px h-6 bg-slate-200" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Encrypted Payments</p>
              </div>
           </div>
        </div>

        {/* --- LEGAL FOOTER --- */}
        <div className="pt-10 border-t border-slate-50 flex flex-col xl:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap justify-center lg:justify-start gap-10">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">© {new Date().getFullYear()} Printo Maniac. All rights reserved. </p>
            {legalLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-[11px] font-bold text-slate-500 uppercase tracking-widest hover:text-blue-700 transition-colors">{link.name}</Link>
            ))}
          </div>
          
         
        </div>
      </div>
    </footer>
  );
}
