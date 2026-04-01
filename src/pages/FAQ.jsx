import React, { useState } from 'react';
import SEO from '@/components/SEO';
import { ChevronDown, ArrowRight, MessageSquare, ShieldCheck, Truck, RotateCcw, Info, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: <ShieldCheck size={20} />,
    questions: [
      { q: "How do I place an order for a professional unit?", a: "To place an order, select your desired model from our inventory and add it to your cart. Follow the secure checkout process to provide your shipping and payment information." },     
      { q: "Is a professional account required to shop?", a: "No, we offer a guest checkout option. However, creating an account allows you to track your order history and manage your professional preferences more efficiently." },
      { q: "How can I verify my order status?", a: "Upon completing your purchase, an order confirmation will be sent immediately. You can also use the 'Track Order' feature available in the main navigation." },
      { q: "What payment methods are supported?", a: "We accept all major credit cards and PayPal. All transactions are processed through encrypted, secure gateways to ensure data integrity." }
    ]
  },
  {
    category: "Shipping & Logistics",
    icon: <Truck size={20} />,
    questions: [
      { q: "What are your delivery locations?", a: "We provide nationwide shipping across the United States, serving both residential and commercial professional workspaces." },
      { q: "What is the estimated delivery timeframe?", a: "Standard delivery typically takes between 3 to 7 business days. You will receive a precise tracking reference once your unit is dispatched." },
      { q: "How can I track my hardware shipment?", a: "A tracking number will be provided via email as soon as your order leaves our facility. You can monitor the real-time progress through our logistics partner's portal." }
    ]
  },
  {
    category: "Hardware Specifications",
    icon: <Info size={20} />,
    questions: [
      { q: "Are all units original and new?", a: "Yes, we exclusively provide brand-new, authentic printing hardware in original manufacturer packaging with all factory seals intact." },
      { q: "Is there a warranty provided with the units?", a: "All hardware includes a full manufacturer's warranty, ensuring you have access to official support and repairs if required." },
      { q: "Are original consumables available?", a: "We maintain a comprehensive inventory of original ink and toner cartridges for all models we carry to ensure optimal performance." }
    ]
  },
  {
    category: "Returns & Support",
    icon: <RotateCcw size={20} />,
    questions: [
      { q: "What is your professional return policy?", a: "Unused products in their original, unopened packaging may be returned within 14 days of delivery for a full refund." },
      { q: "What if the unit arrives with mechanical issues?", a: "In the unlikely event of shipping damage or mechanical issues, please report it immediately. We will arrange for a priority replacement." }
    ]
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(f => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900">
      <SEO 
        title="FAQ | Printer Club" 
        description="Find professional answers to common questions about our printing solutions."
      />

      {/* --- MINIMAL PAGE HEADER --- */}
      <section className="pt-32 pb-16 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Knowledge Base</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Common <span className="text-blue-600">Queries.</span>
              </h1>
            </div>
            <p className="text-slate-500 font-bold text-sm max-w-sm">
              Quick answers to professional inquiries regarding our hardware and logistics.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full px-4 md:px-12 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: CATEGORY NAV */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="flex flex-col gap-1">
              <h4 className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-4 px-4">Support Areas</h4>
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                  className={cn(
                    "w-full text-left px-6 py-4 rounded-2xl text-[13px] font-black transition-all flex items-center gap-4 group",
                    activeCategory === f.category 
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" 
                      : "bg-white text-slate-500 hover:bg-slate-50"
                  )}
                >
                  <span className={cn(
                    "shrink-0",
                    activeCategory === f.category ? "text-white" : "text-blue-600 group-hover:scale-110 transition-transform"
                  )}>
                    {f.icon}
                  </span>
                  {f.category}
                </button>
              ))}
            </div>

            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -mr-8 -mt-8" />
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-blue-500">
                     <MessageSquare size={20} />
                     <span className="text-[10px] font-black uppercase tracking-[2px]">Direct Help</span>
                  </div>
                  <h4 className="text-lg font-black">Need Specific Data?</h4>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                    Our technical specialists are ready to provide detailed specs for your workspace.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-white hover:text-blue-500 transition-colors group/link">
                    Connect Now <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          </aside>

          {/* RIGHT: ACCORDION PANEL */}
          <main className="lg:col-span-8">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                {currentCategoryData?.icon}
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{activeCategory}</h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "bg-white rounded-[2rem] transition-all duration-500 overflow-hidden border",
                      activeIdx === i ? "border-blue-600 shadow-2xl shadow-blue-500/5" : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between p-8 text-left group"
                    >
                      <span className={cn(
                        "text-[15px] font-bold transition-colors leading-relaxed pr-8",
                        activeIdx === i ? "text-blue-600" : "text-slate-800"
                      )}>
                        {faq.q}
                      </span>
                      <div className={cn(
                        "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0",
                        activeIdx === i ? "bg-blue-600 text-white border-blue-600 rotate-180" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-white group-hover:border-blue-600 group-hover:text-blue-600"
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
                          <div className="px-8 pb-8 pt-0">
                            <div className="h-px w-full bg-slate-50 mb-6" />
                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-3xl">
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
          </main>

        </div>
      </div>

      {/* --- MINIMAL CTA --- */}
      <section className="py-24 text-center border-t border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Still have questions?</h2>
          <p className="text-slate-500 font-bold">Our support team is ready to provide the professional assistance you require.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              Contact Support
            </Link>
            <Link 
              to="/shop" 
              className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[2px] hover:bg-slate-900 hover:text-white transition-all active:scale-95"
            >
              Browse Units
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
