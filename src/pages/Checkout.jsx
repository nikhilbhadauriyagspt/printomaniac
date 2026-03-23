import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  Mail,
  User,
  MapPin,
  CreditCard
} from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderCompleteData] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: user?.email || '',
    first_name: user?.name?.split(' ')[0] || '',
    last_name: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: user?.phone || '',
    payment_method: 'paypal'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate('/shop');
    }
  }, [cart, navigate, orderComplete]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      user_id: user?.id || null,
      total_amount: total,
      items: cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.status === 'success') {
        if (data.paypal_link) {
          window.location.href = data.paypal_link;
        } else {
          setOrderCompleteData(data.data);
          setOrderComplete(true);
          clearCart();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-6 font-jakarta text-slate-900">
        <SEO title="Order Success | Axel Printing" />
        <div className="max-w-[500px] w-full text-center space-y-10">
          <div className="h-24 w-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl border border-green-100">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight">Order confirmed</h1>
            <p className="text-slate-500 font-medium leading-relaxed">Thank you for your purchase. Your order #{orderData?.order_code || orderData?.id} is being prepared for delivery.</p>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <Link to="/orders" className="w-full h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
              Track your order
            </Link>
            <Link to="/" className="w-full h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-bold text-sm hover:bg-slate-100 transition-all">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-24">
      <SEO title="Secure Checkout | Axel Printing" />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-12 border-b border-slate-100">
          <div className="space-y-2 text-left">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
              Checkout
            </h1>
            <p className="text-slate-500 font-medium text-base">Complete your professional hardware order</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              <ShieldCheck size={14} />
              SSL Encrypted Checkout
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: FORM SECTIONS --- */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
                  <Mail size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Contact info</h2>
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                <input 
                  required type="email" name="email" value={formData.email} onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
                  <MapPin size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shipping details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First name</label>
                  <input required type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last name</label>
                  <input required type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Street address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">State</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">ZIP code</label>
                  <input required type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-14 px-5 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all shadow-sm" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-100">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payment method</h2>
              </div>
              <div 
                onClick={() => setFormData({...formData, payment_method: 'paypal'})}
                className={cn(
                  "p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between",
                  formData.payment_method === 'paypal' ? "border-blue-600 bg-blue-50/20 shadow-lg shadow-blue-600/5" : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                )}
              >
                <div className="flex items-center gap-6">
                  <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors", formData.payment_method === 'paypal' ? "border-blue-600" : "border-slate-300")}>
                    {formData.payment_method === 'paypal' && <div className="h-3 w-3 bg-blue-600 rounded-full" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-900">PayPal</p>
                    <p className="text-sm text-slate-500 font-medium">Safe payment via your PayPal account or cards.</p>
                  </div>
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
              </div>
            </div>

          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 space-y-10 sticky top-32 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order summary</h2>
              
              <div className="max-h-[350px] overflow-y-auto pr-4 custom-scrollbar space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="h-20 w-20 bg-white rounded-2xl border border-slate-100 p-3 flex-shrink-0 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <img src={getImagePath(item.images)} className="max-h-full max-w-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-base font-black text-slate-900 flex items-center">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-5 pt-8 border-t border-slate-200">
                <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                  <span>Subtotal amount</span>
                  <span className="text-slate-900 font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                  <span>Shipping & handling</span>
                  <span className="text-green-600 font-bold text-xs">Free of charge</span>
                </div>
                <div className="h-px bg-slate-200 w-full" />
                <div className="flex justify-between items-end">
                  <span className="text-base font-black text-slate-900">Total payable</span>
                  <span className="text-4xl font-black text-blue-600 leading-none tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  disabled={loading}
                  className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : "Complete your purchase"}
                  {!loading && <ArrowRight size={20} />}
                </button>
                <div className="mt-8 flex items-center justify-center gap-3 text-slate-300">
                  <Lock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted and secure checkout</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
