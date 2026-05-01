import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Mail from 'lucide-react/dist/esm/icons/mail';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Clock3 from 'lucide-react/dist/esm/icons/clock-3';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
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
    <div className="bg-[#fcfdfe] text-slate-950 overflow-hidden">
      <SEO
        title="Contact Us | Printo Maniac Support"
        description="Connect with our professional support team for detailed printer inquiries and order assistance. We are here to help you find the perfect printing solution."
      />

      {/* --- REFINED HERO --- */}
      <section className="relative pt-32 pb-20 lg:pt-20 lg:pb-28 bg-white border-b border-slate-50">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-8">
              <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse" />
              <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">contact</span>
            </div>
            <h1 className="text-[48px] md:text-[60px] lg:text-[60px]  leading-none tracking-tighter mb-8">
              We’re Here to <span className="text-blue-700 italic font-light">Help.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
              Got a question about a printer? Need help with an order? 
              Our team is ready to provide the answers you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className=" bg-white">
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-4 space-y-12">
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
              >
                <h2 className="text-[32px] md:text-[42px] font-bold leading-tight mb-6">Get in Touch</h2>
                <p className="text-slate-500 text-[16px] leading-relaxed">
                  We value clear communication and fast responses. Reach out through any of these 
                  channels and we'll get back to you as soon as possible.
                </p>
              </motion.div>

              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email Support", desc: "info@printomaniac.com", link: "mailto:info@printomaniac.com" },
                  { icon: MapPin, title: "Our Office", desc: "4352 13th Ave S, Fargo, ND 58103, USA", link: "#" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-800 group-hover:text-white transition-all shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.title}</p>
                      {item.link !== "#" ? (
                        <a href={item.link} className="text-[16px] font-bold text-slate-900 hover:text-blue-800 transition-colors">
                          {item.desc}
                        </a>
                      ) : (
                        <p className="text-[16px] font-bold text-slate-900 leading-snug">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#f8fafc] rounded-[3rem] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-sm"
              >
                <div className="mb-12">
                  <h3 className="text-[28px] md:text-[36px] font-bold text-slate-950 mb-4 tracking-tight">Send a Message</h3>
                  <p className="text-slate-500 font-medium">Fill out the form below and our team will be in touch shortly.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-[2.5rem] border border-blue-50 text-center py-20 px-8 shadow-xl shadow-blue-900/5"
                    >
                      <div className="w-20 h-20 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h4 className="text-[32px] font-black text-slate-900 mb-4 tracking-tight">Message Sent!</h4>
                      <p className="text-slate-500 max-w-md mx-auto mb-10 text-[15px] font-medium leading-relaxed">
                        Thank you for reaching out. We have received your message and will respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="h-14 px-10 bg-blue-800 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-2">
                            Full Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-slate-200 px-6 text-[14px] font-medium text-slate-900 focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-2">
                            Email Address
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-slate-200 px-6 text-[14px] font-medium text-slate-900 focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-2">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="Your phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full h-14 rounded-2xl bg-white border border-slate-200 px-6 text-[14px] font-medium text-slate-900 focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-2">
                            Subject
                          </label>
                          <div className="relative">
                            <select
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="w-full h-14 rounded-2xl bg-white border border-slate-200 px-6 text-[14px] font-medium text-slate-900 focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 outline-none transition-all appearance-none cursor-pointer"
                            >
                              <option>General Inquiry</option>
                              <option>Product Question</option>
                              <option>Order Support</option>
                              <option>Technical Help</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 pl-2">
                          Your Message
                        </label>
                        <textarea
                          required
                          rows="6"
                          placeholder="How can we help you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-2xl bg-white border border-slate-200 p-6 text-[14px] font-medium text-slate-900 focus:border-blue-800 focus:ring-4 focus:ring-blue-800/10 outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="pt-6">
                        <button
                          disabled={loading}
                          className="w-full md:w-auto h-16 px-12 bg-slate-950 text-white font-black text-[12px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-70 active:scale-95"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={20} className="animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              Send Message <ArrowRight size={18} />
                            </>
                          )}
                        </button>

                        {status === 'error' && (
                          <p className="text-red-500 text-[13px] font-bold mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            Something went wrong. Please try again.
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
