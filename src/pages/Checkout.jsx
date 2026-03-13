import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Box, CheckCircle2, Loader2, ShoppingCart, Zap, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-snpro bg-[#fcfcfc]">
        <SEO title="Empty Checkout | Printer Brother" />
        <div className="h-24 w-24 bg-white border border-gray-100 flex items-center justify-center mb-10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
             <ShoppingCart size={40} className="text-gray-200 relative z-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic tracking-tighter mb-4">Inventory Empty.</h2>
        <p className="text-gray-400 text-sm font-medium mb-12 uppercase tracking-widest text-center">Please add professional hardware units <br/>before initiating deployment.</p>
        <Link to="/shop" className="h-16 px-12 bg-black text-white flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl group">
          Return to shop <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-snpro bg-[#fcfcfc] text-center">
        <SEO title="Order Confirmed | Printer Brother" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative mb-10">
          <div className="h-24 w-24 bg-white text-emerald-500 flex items-center justify-center shadow-xl border border-emerald-100 relative z-10 mx-auto overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-50/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <CheckCircle2 size={40} className="relative z-10" strokeWidth={3} />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-black text-black leading-[0.9] uppercase italic tracking-tighter mb-6">Order <br/><span className="text-[#0047ab]">Confirmed.</span></h1>
        <p className="text-gray-400 font-bold text-xs mb-12 uppercase tracking-widest italic">Your hardware deployment is being prepared in our logs.</p>
        
        <div className="bg-white p-10 border border-gray-100 mb-12 max-w-sm w-full relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
          <p className="text-[10px] font-black text-[#0047ab] uppercase tracking-[0.2em] mb-3 italic">Deployment Reference</p>
          <p className="text-3xl font-black text-black uppercase italic tracking-tighter">#{orderId || 'PROCESS'}</p>
        </div>

        <Link to="/" className="h-16 px-16 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-2xl shadow-[#0047ab]/10">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-40 pb-24 font-snpro text-slate-900 overflow-x-hidden">
      <SEO title="Secure Checkout | Printer Brother" />
      <div className="max-w-[1650px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* --- BENTO HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16 border-b border-gray-100 pb-12">
          <div className="flex flex-col items-start space-y-6">
            <Link to="/cart" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all group italic">
              <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform text-[#0047ab]" />
              Return to Selection
            </Link>
            <h1 className="text-4xl md:text-6xl font-black leading-[0.9] uppercase italic tracking-tighter">
              Secure <br /><span className="text-[#0047ab]">Checkout.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 border border-gray-100">
            <div className={cn("flex items-center gap-3 px-6 py-3 transition-all duration-500", step >= 1 ? "bg-[#0047ab] text-white" : "bg-gray-50 text-gray-300 border border-gray-100")}>
               <span className="text-sm font-black italic">01</span>
               <span className="text-[10px] font-black uppercase tracking-widest italic">Logistics</span>
            </div>
            <div className="h-px w-8 bg-gray-100" />
            <div className={cn("flex items-center gap-3 px-6 py-3 transition-all duration-500", step >= 2 ? "bg-[#0047ab] text-white" : "bg-gray-50 text-gray-300 border border-gray-100")}>
               <span className="text-sm font-black italic">02</span>
               <span className="text-[10px] font-black uppercase tracking-widest italic">Settlement</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-16">
                  {/* Section 1: Email */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-1 bg-[#0047ab]" />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black italic flex items-center gap-3">
                         <Mail size={16} strokeWidth={3} /> Information Terminal
                      </h3>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Credentials <span className="text-[#0047ab]">*</span></label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>

                  {/* Section 2: Address */}
                  <div className="space-y-10 pt-16 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-1 bg-[#0047ab]" />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black italic flex items-center gap-3">
                         <MapPin size={16} strokeWidth={3} /> Deployment Destination
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">First name <span className="text-[#0047ab]">*</span></label>
                         <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Last name <span className="text-[#0047ab]">*</span></label>
                         <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Street Address <span className="text-[#0047ab]">*</span></label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Complete Operational Address" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">City <span className="text-[#0047ab]">*</span></label>
                         <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Zip Code <span className="text-[#0047ab]">*</span></label>
                         <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Terminal <span className="text-[#0047ab]">*</span></label>
                       <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-14 px-5 bg-white border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-16">
                  <div className="space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-1 bg-[#0047ab]" />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black italic flex items-center gap-3">
                         <CreditCard size={16} strokeWidth={3} /> Settlement Method
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-10 border border-gray-100 bg-white cursor-pointer transition-all duration-500 flex flex-col justify-between h-56 group relative overflow-hidden",
                          formData.paymentMethod === 'cod' ? "border-[#0047ab]/50 shadow-xl shadow-[#0047ab]/5" : "hover:border-gray-300"
                        )}
                      >
                        {formData.paymentMethod === 'cod' && <div className="absolute top-0 right-0 w-2 h-full bg-[#0047ab]" />}
                        <div className="flex items-center justify-between">
                          <div className={cn("h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-[#0047ab]" : "border-gray-200")}>
                            {formData.paymentMethod === 'cod' && <div className="h-4 w-4 rounded-full bg-[#0047ab]" />}
                          </div>
                          <Truck size={36} className={cn("transition-colors", formData.paymentMethod === 'cod' ? "text-[#0047ab]" : "text-gray-200")} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-black text-black uppercase italic tracking-tight leading-none">Cash On Delivery</h4>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Manual settlement upon arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-10 border border-gray-100 bg-white cursor-pointer transition-all duration-500 flex flex-col justify-between h-56 group relative overflow-hidden",
                          formData.paymentMethod === 'paypal' ? "border-[#0047ab]/50 shadow-xl shadow-[#0047ab]/5" : "hover:border-gray-300"
                        )}
                      >
                        {formData.paymentMethod === 'paypal' && <div className="absolute top-0 right-0 w-2 h-full bg-[#0047ab]" />}
                        <div className="flex items-center justify-between">
                          <div className={cn("h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-[#0047ab]" : "border-gray-200")}>
                            {formData.paymentMethod === 'paypal' && <div className="h-4 w-4 rounded-full bg-[#0047ab]" />}
                          </div>
                          <div className={cn("italic font-black text-2xl tracking-tighter transition-colors", formData.paymentMethod === 'paypal' ? "text-[#0047ab]" : "text-gray-200")}>PayPal</div>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-black text-black uppercase italic tracking-tight leading-none">Instant Secure Pay</h4>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Digital gateway verification</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-10 pt-10">
                          <div className="p-10 bg-black text-white relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 1px, transparent 1px)', size: '15px 15px' }} />
                            <ShieldCheck className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity" size={140} />
                            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab] italic">Secure Portal Active</p>
                              <div className="h-px w-20 bg-gray-800" />
                              <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.1em]">
                                <Lock size={16} className="text-[#0047ab]" strokeWidth={3} /> 256-BIT ENCRYPTION VERIFIED
                              </div>
                            </div>
                          </div>
                          <div className="max-w-md mx-auto relative z-10">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "rect", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `Printer Brother - ${cartCount} Units Deployment` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Deployment synchronization failed."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-16 flex flex-col items-center gap-8 border-t border-gray-100 mt-16">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="h-20 px-24 bg-black text-white hover:bg-[#0047ab] flex items-center justify-center gap-6 text-[12px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-black/10 disabled:opacity-50 active:scale-95 group w-full md:w-auto"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      {step === 1 ? 'Next Phase: Settlement' : 'Finalize Deployment'}
                      <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 italic">
                   <ChevronLeft size={16} strokeWidth={3} className="text-[#0047ab]" /> Return to Logistics Log
                </button>
              )}
            </div>
          </div>

          {/* --- SUMMARY SIDEBAR: BENTO PANEL --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 p-10 sticky top-32 group">
              <div className="flex items-center gap-3 mb-12">
                 <div className="w-8 h-[2px] bg-[#0047ab]" />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-black italic">Manifest</h3>
              </div>
              
              <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-5 group/item">
                    <div className="h-20 w-20 bg-gray-50 flex items-center justify-center p-4 shrink-0 border border-gray-50 group-hover/item:border-[#0047ab]/30 group-hover/item:bg-white transition-all">
                      <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h4 className="text-[13px] font-black text-black uppercase tracking-tight leading-tight truncate mb-2">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-bold text-gray-400 uppercase italic">Unit Qty: {item.quantity}</p>
                         <p className="text-sm font-black text-black italic">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-5 border-t border-gray-100 pt-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Base Subtotal</span>
                  <span className="text-sm font-black text-black italic">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Logistics Fee</span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic border border-emerald-100 bg-emerald-50 px-2 py-0.5">Complimentary</span>
                </div>
                <div className="flex flex-col pt-10 border-t border-gray-100 mt-6 relative overflow-hidden group/total">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047ab] mb-2 italic">Final Operational Value</span>
                  <span className="text-5xl font-black text-black tracking-tighter italic leading-none">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default border-t border-gray-50 pt-8">
                 <div className="flex items-center gap-8">
                    <div className="text-black italic font-black text-2xl tracking-tighter">PayPal</div>
                    <div className="w-px h-6 bg-gray-200" />
                    <div className="text-black font-black text-[10px] uppercase tracking-[0.3em]">Verified</div>
                 </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
