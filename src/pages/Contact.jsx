import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, CheckCircle2, Loader2, ArrowRight, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-snpro text-slate-900 overflow-x-hidden">
      <SEO 
        title="Contact Us | Printer Brother" 
        description="Get in touch with Printer Brother for help with your equipment or deployment. Our team is here to assist you."
      />
      
      {/* --- BENTO HERO SECTION --- */}
      <section className="pt-12 pb-16 px-6 md:px-10 border-b border-gray-100 bg-white">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-1 bg-[#0047ab]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Support Center</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
                Initiate <br />
                <span className="text-[#0047ab]">Contact.</span>
              </h1>
            </div>
            <div className="lg:text-right pb-2">
              <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed max-w-md lg:ml-auto">
                Connect with our deployment specialists for expert guidance, operational support, and order assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT: GRID --- */}
      <div className="max-w-[1650px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- CONTACT INFO BENTO BLOCKS --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-10 bg-white border border-gray-100 flex flex-col justify-between h-56 group hover:border-[#0047ab]/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <MessageSquare size={100} className="text-[#0047ab]" />
              </div>
              <div className="h-12 w-12 bg-gray-50 border border-gray-100 text-[#0047ab] flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0047ab] group-hover:text-white relative z-10">
                <Mail size={20} />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">General inquiry</p>
                <h4 className="text-xl font-black text-black tracking-tight">info@printerbrother.shop</h4>
              </div>
            </div>

            <div className="p-10 bg-white border border-gray-100 flex flex-col justify-between h-56 group hover:border-[#0047ab]/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <MapPin size={100} className="text-[#0047ab]" />
              </div>
              <div className="h-12 w-12 bg-gray-50 border border-gray-100 text-[#0047ab] flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0047ab] group-hover:text-white relative z-10">
                <MapPin size={20} />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Deployment HQ</p>
                <h4 className="text-lg font-black text-black leading-tight tracking-tight">11872 Sunrise Valley Dr, <br/> Reston, VA 20191, USA</h4>
              </div>
            </div>
            

          </div>

          {/* --- CONTACT FORM BLOCK --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-100 p-8 md:p-16 relative overflow-hidden">
              {/* Form Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
                  <div className="h-20 w-20 bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter mb-4">Transmission Sent.</h2>
                  <p className="text-gray-500 text-base font-medium mb-10 max-w-sm mx-auto">Your inquiry has been securely logged. Our specialists will respond within 24 hours.</p>
                  <button onClick={() => setStatus(null)} className="px-12 py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">Initiate New Request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="space-y-2 mb-4">
                     <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter">Submit Ticket</h3>
                     <p className="text-xs font-bold text-gray-400">Complete the form below to connect with our support infrastructure.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-[#0047ab]">*</span></label>
                      <input 
                        required type="text" placeholder="John Doe" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-[#0047ab]">*</span></label>
                      <input 
                        required type="email" placeholder="john@example.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Department <span className="text-[#0047ab]">*</span></label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-14 px-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all appearance-none cursor-pointer pr-12"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Inquiries</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0047ab] pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message Payload <span className="text-[#0047ab]">*</span></label>
                    <textarea 
                      required rows="6" placeholder="Detail your operational requirements..." value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button 
                      disabled={loading}
                      className="w-full md:w-auto h-16 px-12 bg-black text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all disabled:opacity-50 active:scale-95 shadow-xl"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>Transmit Request <ArrowRight size={20} strokeWidth={3} /></>
                      )}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-4">Transmission failed. Please verify network and try again.</p>}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
