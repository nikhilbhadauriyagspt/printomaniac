import { Link } from 'react-router-dom';
import { Mail, Loader2, MapPin, ShieldCheck, ArrowRight, Phone, Clock } from 'lucide-react';
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
    <footer className="bg-[#002a6b] text-white pt-20 pb-10 font-sans border-t-4 border-[#ffb700]">
      
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/">
              <img src="/logo/MYPRINTERMANNN.png" alt="Printer Brother" className="h-12 w-auto object-contain brightness-0 invert " />
            </Link>
            <p className="text-blue-100/70 text-md font-medium leading-relaxed max-w-sm mt-5">
              Your premier destination for high-performance laser printers, precision document scanners, and high-quality hardware solutions engineered for the modern office.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ffb700]">Collections</h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/shop?category=${cat.slug}`} className="text-blue-100/60 hover:text-[#ffb700] transition-all text-[13px] font-bold">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ffb700]">Support</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Track Orders', path: '/orders' },
                  { name: 'FAQs', path: '/faq' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-blue-100/60 hover:text-[#ffb700] transition-all text-[13px] font-bold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ffb700]">Policies</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Privacy Policy', path: '/privacy-policy' },
                  { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                  { name: 'Return Policy', path: '/return-policy' },
                  { name: 'Shipping Policy', path: '/shipping-policy' },
                  { name: 'Cookie Policy', path: '/cookie-policy' }
                ].map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-blue-100/60 hover:text-[#ffb700] transition-all text-[13px] font-bold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="lg:col-span-3 space-y-10">
            <div className="space-y-4">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#ffb700]">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded py-3.5 px-5 text-sm text-white focus:outline-none focus:border-[#ffb700] transition-all font-bold placeholder:text-blue-100/30"
                />
                <button
                  disabled={loading}
                  className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-[#ffb700] text-[#003b95] rounded transition-all font-black text-[10px] uppercase hover:bg-white active:scale-95 flex items-center justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={18} strokeWidth={3} />}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded bg-white/5 flex items-center justify-center text-[#ffb700] group-hover:bg-[#ffb700] group-hover:text-[#003b95] transition-all"><MapPin size={18} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ffb700]">Location</p>
                  <p className="text-[12px] font-bold text-blue-100/70 leading-tight">11872 Sunrise Valley Dr, Reston, VA 20191, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="h-10 w-10 shrink-0 rounded bg-white/5 flex items-center justify-center text-[#ffb700] group-hover:bg-[#ffb700] group-hover:text-[#003b95] transition-all"><Mail size={18} /></div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ffb700]">Email Us</p>
                  <p className="text-[13px] font-bold text-blue-100/70 leading-tight">info@printerbrother.shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#ffb700]">
              © 2026 Printer Brother | All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
          </div>
        </div>

      </div>
    </footer>
  );
}
