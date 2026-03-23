import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track Order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the Printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & Help",
    questions: [
      { q: "How can I contact you?", a: "You can send us an email or use the form on our Contact page. We're here to help every day." },
      { q: "When are you open?", a: "Our website is always open! Our team answers messages throughout the day, usually within 24 hours." },
      { q: "Can you help me find the right ink?", a: "Of course! Just tell us the name of your printer and we'll show you exactly what ink you need." }
    ]
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.find(f => f.category === activeCategory)?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden ">
      <SEO 
        title="FAQ | Axel Printing" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-16 px-4 md:px-6 lg:px-10 border-b border-slate-50">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Help center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Common <span className="text-blue-600">questions</span>
          </h1>
          <p className="text-base text-slate-500 font-medium max-w-lg mx-auto">
            Find quick answers to common questions about our products, shipping, and more.
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* --- CATEGORY NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Categories</h4>
              <div className="flex flex-col gap-2">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left px-6 py-4 rounded-xl text-sm font-bold transition-all border",
                      activeCategory === f.category 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                        : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                    )}
                  >
                    {f.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
               <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-blue-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Need more help?</span>
               </div>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 If you can't find your answer here, our team is always ready to help you directly.
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700">
                 Contact us <ArrowRight size={14} />
               </Link>
            </div>
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "bg-white rounded-2xl transition-all duration-300 overflow-hidden border border-slate-100",
                      activeIdx === i ? "shadow-xl shadow-slate-200/40 border-blue-100" : "hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-6 text-left group"
                    >
                      <span className={cn(
                        "text-base md:text-lg font-bold transition-colors leading-snug pr-8",
                        activeIdx === i ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                      )}>
                        {faq.q}
                      </span>
                      <div className={cn(
                        "h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center transition-all duration-300 shrink-0",
                        activeIdx === i ? "bg-blue-600 text-white rotate-180" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                      )}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIdx === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-8 pt-2">
                            <div className="h-px w-full bg-slate-50 mb-6" />
                            <p className="text-slate-500 text-base font-medium leading-relaxed max-w-2xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <section className="py-24 text-center bg-white border-t border-slate-50 px-4 md:px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">
            Still need <span className="text-blue-600">clarity?</span>
          </h2>
          <div className="flex justify-center">
            <Link 
              to="/contact" 
              className="bg-blue-600 text-white px-10 h-14 flex items-center justify-center rounded-xl font-bold text-sm transition-all hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-95"
            >
              Speak with our team <ArrowRight size={18} className="ml-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
