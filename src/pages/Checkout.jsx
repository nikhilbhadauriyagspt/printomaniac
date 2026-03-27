import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package,
  Phone,
  Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
 
  const user = JSON.parse(localStorage.getItem('user') || 'null');
 
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'paypal', 
  });
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
 
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
         
          if (data && data.address) {
            const addr = data.address;
            setFormData(prev => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.suburb || '',
              zipCode: addr.postcode || '',
              address: `${addr.road || ''} ${addr.neighbourhood || addr.suburb || ''}`.trim() || data.display_name.split(',')[0]
            }));
          }
        } catch (err) { }
      });
    }
  }, []);
 
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotal = total;
 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'axelprinting.shop',
      };
 
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
 
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);
        setStep(3);
        clearCart();
      } else {
        alert(data.message || 'Error placing order.');
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (step === 1) {
        window.scrollTo(0, 0);
        setStep(2);
    }
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/100x100?text=Product";
  };
 
  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-jakarta">
        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center max-w-md">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-sm font-medium leading-relaxed">Please add some items to your cart before proceeding to checkout.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-3 rounded-lg font-bold text-xs hover:bg-cyan-600 transition-all active:scale-95 shadow-lg">
                Return to Shop
            </Link>
        </div>
      </div>
    );
  }
 
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20 px-6 font-jakarta text-slate-900">
        <SEO title="Order Confirmed | My Printer Store" />
        <div className="max-w-[500px] w-full text-center space-y-10">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-24 w-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-xl">
            <CheckCircle2 size={48} />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight leading-none">Order confirmed!</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
                Thank you for your purchase. Your order ID is <span className="font-bold text-slate-900">#{orderId}</span>.
                We've sent a confirmation email to <span className="font-bold text-slate-900">{formData.email}</span>.
            </p>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <Link to="/orders" className="w-full h-16 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg hover:bg-cyan-600 transition-all">
              Track my order
            </Link>
            <Link to="/" className="w-full h-16 bg-gray-50 text-slate-900 rounded-xl flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-all">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-24 px-4 md:px-10">
      <SEO title="Secure Checkout | My Printer Store" />
      
      <div className="w-full px-0 md:px-4">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-12 border-b border-gray-100">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3 mb-2">
                {[1, 2].map((s) => (
                    <div key={s} className={cn("h-2 w-8 rounded-full transition-all duration-500", step >= s ? "bg-cyan-500" : "bg-gray-100")} />
                ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
              {step === 1 ? 'Shipping details' : 'Payment method'}
            </h1>
            <p className="text-slate-500 font-medium text-base">Step {step} of 2 — Secure checkout</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-100 text-xs font-bold">
              <ShieldCheck size={16} /> SSL Encrypted Connection
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: STEP CONTENT --- */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-slate-900 border border-gray-100"><Mail size={20} /></div>
                      <h2 className="text-2xl font-bold">Contact info</h2>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-slate-900 border border-gray-100"><MapPin size={20} /></div>
                      <h2 className="text-2xl font-bold">Shipping details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First name</label>
                        <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last name</label>
                        <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Street address</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">City</label>
                        <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Zip code</label>
                        <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-medium transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone number</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-cyan-600 outline-none text-sm font-medium transition-all" />
                    </div>
                  </div>
                  <button type="submit" className="w-full h-16 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl hover:bg-cyan-600 transition-all flex items-center justify-center gap-3">
                    Continue to payment <ArrowRight size={20} />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-slate-900 border border-gray-100"><CreditCard size={20} /></div>
                      <h2 className="text-2xl font-bold">Payment method</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { id: 'paypal', label: 'PayPal / Card', icon: CreditCard, desc: 'Pay securely with your PayPal account or credit card.' },
                            { id: 'cod', label: 'Cash on delivery', icon: Wallet, desc: 'Pay with cash when your printer arrives at your doorstep.' }
                        ].map((method) => (
                            <div 
                                key={method.id} onClick={() => setFormData({...formData, paymentMethod: method.id})}
                                className={cn(
                                    "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                                    formData.paymentMethod === method.id ? "border-cyan-600 bg-cyan-50/10 shadow-lg shadow-cyan-600/5" : "border-gray-100 bg-white hover:border-gray-200"
                                )}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors", formData.paymentMethod === method.id ? "border-cyan-600" : "border-gray-300")}>
                                        {formData.paymentMethod === method.id && <div className="h-3 w-3 bg-cyan-600 rounded-full" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-base font-bold text-slate-900">{method.label}</p>
                                        <p className="text-xs text-slate-500 font-medium">{method.desc}</p>
                                    </div>
                                </div>
                                <method.icon size={24} className={cn("transition-colors", formData.paymentMethod === method.id ? "text-cyan-600" : "text-gray-300")} />
                            </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-4 space-y-6 flex flex-col items-center">
                    {formData.paymentMethod === 'paypal' ? (
                        <div className="relative z-10 w-full max-w-md mx-auto">
                            <PayPalButtons 
                                style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: { value: total.toString() }
                                        }]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        handleOrderSuccess(details);
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        <button type="submit" disabled={loading} className="w-full max-w-md h-16 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-xl hover:bg-cyan-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]">
                            {loading ? <Loader2 size={20} className="animate-spin" /> : "Complete order"}
                            {!loading && <CheckCircle2 size={20} />}
                        </button>
                    )}
                    
                    <button type="button" onClick={() => setStep(1)} className="w-full h-12 text-slate-400 font-bold text-xs flex items-center justify-center gap-3 hover:text-slate-900 transition-all">
                        <ChevronLeft size={16} /> Change shipping info
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT: SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 space-y-8 sticky top-32 shadow-sm">
              <h2 className="text-2xl font-bold">Order summary</h2>
              <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-5">
                    <div className="h-16 w-16 bg-white rounded-xl border border-gray-100 p-2 shrink-0 flex items-center justify-center shadow-sm">
                      <img src={getImagePath(item.images)} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold flex items-center">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Shipping</span>
                  <span className="text-cyan-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="h-px bg-gray-200 w-full" />
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-slate-900">Grand total</span>
                  <span className="text-4xl font-bold text-cyan-600 leading-none tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-300">
                <Lock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure checkout</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
