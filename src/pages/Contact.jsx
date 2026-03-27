import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, CheckCircle2, Loader2, ArrowRight, ChevronDown, Send, Globe, MessageCircle, Clock } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General question',
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
        setFormData({ name: '', email: '', phone: '', subject: 'General question', message: '' });
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="Contact Us | My Printer Store" 
        description="Connect with My Printer Store. Our friendly team is here to help you."
      />
      
      {/* --- HEADER --- */}
      <section className="pt-20 pb-16 px-4 md:px-10 lg:px-16 border-b border-slate-100 bg-white">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-cyan-500" />
                <span className="text-cyan-600 text-sm font-bold">Friendly Support</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                How can we <br />
                <span className="text-slate-400">help you today?</span>
              </h1>
            </div>
            <p className="text-slate-500 text-lg font-medium max-w-md">
              Our team is here to listen and help you find exactly what you're looking for. Reach out to us for any questions about our printers.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <section className="py-20 px-4 md:px-10 lg:px-16">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT: INFO CARDS */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
                <h3 className="text-2xl font-black text-slate-900">Get in touch</h3>
                
                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 group hover:border-cyan-500 transition-all">
                    <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">Email us</p>
                      <p className="text-sm font-bold text-slate-900 break-all">info@myprinterstore.shop</p>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 group hover:border-cyan-500 transition-all">
                    <div className="h-10 w-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">Our location</p>
                      <p className="text-sm font-bold text-slate-900">1401 N Loop W, Houston, TX 77008, USA</p>
                    </div>
                  </div>
                </div>
              </div>

             
            </div>

            {/* RIGHT: CONTACT FORM */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="h-20 w-20 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <CheckCircle2 size={36} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-900 mb-3">Message received</h2>
                      <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg">Thank you for reaching out. We'll get back to you shortly.</p>
                      <button 
                        onClick={() => setStatus(null)} 
                        className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-sm transition-all hover:bg-cyan-600 shadow-lg"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 ml-1">Your name</label>
                          <input 
                            required type="text" placeholder="John Doe" value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 ml-1">Email address</label>
                          <input 
                            required type="email" placeholder="john@example.com" value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 ml-1">Phone number (optional)</label>
                          <input 
                            type="tel" placeholder="+1 (555) 000-0000" value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 ml-1">Subject</label>
                          <div className="relative">
                            <select 
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                              className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-bold transition-all appearance-none cursor-pointer"
                            >
                              <option>General question</option>
                              <option>Product support</option>
                              <option>Order help</option>
                              <option>Other</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 ml-1">Your message</label>
                        <textarea 
                          required rows="4" placeholder="How can we help you today?" value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-xl focus:border-cyan-600 focus:bg-white outline-none text-sm font-bold transition-all resize-none min-h-[150px] placeholder:text-slate-300"
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button 
                          disabled={loading}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 text-white h-14 px-12 rounded-xl font-bold text-sm transition-all hover:bg-cyan-600 shadow-lg active:scale-95 disabled:opacity-50 group"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : "Send message"}
                          {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                        </button>
                      </div>
                      {status === 'error' && <p className="text-red-600 text-sm font-bold mt-4">Failed to send message. Please try again.</p>}
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

