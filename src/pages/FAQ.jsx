import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageCircle, HelpCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & buying",
    questions: [
      { q: "How do I buy a printer?", a: "It's easy! Just pick the printer you like, add it to your cart, and follow the steps at checkout to pay." },     
      { q: "Do I need an account to shop?", a: "No, you can check out as a guest. But having an account helps you see your order history later." },
      { q: "Where can I see my order?", a: "We'll send you an email as soon as you buy something. You can also check 'Track order' at the top of the page." },
      { q: "Can I change my mind after buying?", a: "If we haven't sent your printer yet, we can change or cancel your order. Just message us as soon as possible!" },
      { q: "What ways can I pay?", a: "We take all major bank cards and PayPal. Everything is kept safe and private." }
    ]
  },
  {
    category: "Shipping & delivery",
    questions: [
      { q: "Where do you deliver?", a: "We deliver to all homes and offices across the country." },
      { q: "How long will it take to get my printer?", a: "Most orders arrive in 3 to 7 days. We'll let you know exactly when it's on its way." },
      { q: "How much is the delivery fee?", a: "The fee depends on where you live and how heavy the printer is. You'll see the total before you pay." },
      { q: "How do I know where my package is?", a: "We'll email you a tracking number. You can use this to see where your printer is at any time." },
      { q: "What if I'm not home when it arrives?", a: "The delivery person will usually leave a note or try again the next day." }
    ]
  },
  {
    category: "About the printers",
    questions: [
      { q: "Are the printers brand new?", a: "Yes, 100%. We only sell brand new, original printers in their original boxes." },
      { q: "Will I get a warranty?", a: "Yes, all printers come with a full warranty, so you're always protected." },
      { q: "Do you help with setting it up?", a: "Yes! If you find it hard to get your printer working, just reach out. We can guide you through it." },
      { q: "Do you sell ink and toner too?", a: "Yes, we have all the original ink and toner you'll need to keep printing." },
      { q: "How do I know which printer is best for me?", a: "Just think about what you print most. For letters and documents, a laser printer is great. For photos, go with inkjet. Still not sure? Ask us!" }
    ]
  },
  {
    category: "Returns & refunds",
    questions: [
      { q: "Can I return a printer?", a: "Yes, if the printer is still in its box and hasn't been used, you can return it within 14 days." },
      { q: "How do I get my money back?", a: "Once we get the printer back and check it, we'll send your money back to your card within a few days." },
      { q: "What if the printer is broken?", a: "If there's any problem when it arrives, let us know right away. We will fix it or send you a new one." }
    ]
  },
  {
    category: "Support & help",
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="FAQ | My Printer Store" 
        description="Find simple answers to your questions about printers, delivery, and support."
      />

      {/* --- HEADER --- */}
      <section className="pt-20 pb-16 px-4 md:px-10 lg:px-16 border-b border-slate-100 bg-white">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-cyan-500" />
                <span className="text-cyan-600 text-sm font-bold">Help Center</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Common <br />
                <span className="text-slate-400">questions.</span>
              </h1>
            </div>
            <p className="text-slate-500 text-lg font-medium max-w-md">
              Find quick and simple answers to common questions about our printers, shipping, and more.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-full mx-auto px-4 md:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: CATEGORY NAV */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-6">
              <h3 className="text-2xl font-black text-slate-900">Categories</h3>
              <div className="flex flex-col gap-2">
                {faqs.map((f) => (
                  <button
                    key={f.category}
                    onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                    className={cn(
                      "w-full text-left px-6 py-4 rounded-xl text-[15px] font-bold transition-all border",
                      activeCategory === f.category 
                        ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
                        : "bg-white text-slate-500 border-slate-200/60 hover:border-cyan-500 hover:text-slate-900"
                    )}
                  >
                    {f.category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white space-y-6 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="flex items-center gap-3 relative z-10 text-cyan-400">
                  <MessageCircle size={20} />
                  <h4 className="text-lg font-bold">Need more help?</h4>
               </div>
               <p className="text-slate-400 text-sm font-medium leading-relaxed relative z-10">
                 If you can't find your answer here, our friendly team is always ready to help you directly.
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors relative z-10">
                 Send us a message <ArrowRight size={16} />
               </Link>
            </div>
          </div>

          {/* RIGHT: ACCORDION PANEL */}
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
                      "bg-white rounded-2xl transition-all duration-300 overflow-hidden border",
                      activeIdx === i ? "shadow-xl shadow-slate-200/40 border-cyan-500/50" : "border-slate-200/60 hover:border-cyan-500"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                    >
                      <span className={cn(
                        "text-lg font-bold transition-colors leading-snug pr-8",
                        activeIdx === i ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                      )}>
                        {faq.q}
                      </span>
                      <div className={cn(
                        "h-10 w-10 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0",
                        activeIdx === i ? "bg-cyan-500 text-slate-900 border-cyan-500 rotate-180 shadow-lg shadow-cyan-500/20" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 group-hover:border-cyan-100"
                      )}>
                        <ChevronDown size={18} />
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
                          <div className="px-8 pb-8 pt-2">
                            <div className="h-px w-full bg-slate-100 mb-6" />
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-3xl">
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

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 text-center bg-white border-t border-slate-100 px-4 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Still have <br />
            <span className="text-slate-400">questions?</span>
          </h2>
          <div className="flex justify-center">
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white px-12 h-16 flex items-center justify-center rounded-2xl font-bold text-base transition-all hover:bg-cyan-600 shadow-2xl shadow-slate-900/10 active:scale-95 group"
            >
              Talk to us directly <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

