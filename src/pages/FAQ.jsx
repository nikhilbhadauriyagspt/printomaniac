import React, { useState } from 'react';
import SEO from '@/components/SEO';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Truck from 'lucide-react/dist/esm/icons/truck';
import Info from 'lucide-react/dist/esm/icons/info';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import Search from 'lucide-react/dist/esm/icons/search';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: 'Orders & Purchasing',
    icon: ShieldCheck,
    questions: [
      {
        q: 'How do I place an order for a printer?',
        a: 'To place an order, select your preferred printer, add it to your cart, and complete checkout with your shipping and payment details.',
      },
      {
        q: 'Is an account required to shop?',
        a: 'No, you can place an order as a guest. Creating an account simply makes it easier to manage future orders and preferences.',
      },
      {
        q: 'How can I check my order status?',
        a: 'After placing your order, you will receive confirmation details. You can also use the order tracking option available on the website.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We accept major payment methods through secure checkout so your transactions remain protected and dependable.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: Truck,
    questions: [
      {
        q: 'Where do you ship to?',
        a: 'We currently offer shipping across the United States for both residential and business locations.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery usually takes around 3 to 7 business days depending on your location and order details.',
      },
      {
        q: 'How can I track my shipment?',
        a: 'Once your order is dispatched, tracking details are shared so you can follow the shipment status.',
      },
    ],
  },
  {
    category: 'Printer Information',
    icon: Info,
    questions: [
      {
        q: 'Are all printers original and new?',
        a: 'Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.',
      },
      {
        q: 'Is there a warranty provided?',
        a: 'Most printers include manufacturer warranty coverage. Warranty details may vary depending on the specific product model.',
      },
      {
        q: 'Are original ink and toner available?',
        a: 'Yes, we also offer printing supplies for many of the models available in our catalog.',
      },
    ],
  },
  {
    category: 'Returns & Support',
    icon: RotateCcw,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.',
      },
      {
        q: 'What if the machine arrives with issues?',
        a: 'If your order arrives damaged or has a problem, please contact support as soon as possible so we can guide you through the next steps.',
      },
    ],
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find((f) => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-[#fcfdfe] text-slate-950 overflow-hidden">
      <SEO
        title="FAQ | Printo Maniac Support"
        description="Find instant answers to common questions about orders, shipping, and printer setups. Explore our FAQ to make your experience smoother."
      />

      {/* --- REFINED HERO --- */}
      <section className="relative pt-32 pb-20 lg:pt-20 lg:pb-28 bg-white border-b border-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-8">
              <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse" />
              <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">FAQ</span>
            </div>
            <h1 className="text-[48px] md:text-[60px] lg:text-[60px]  leading-none tracking-tighter mb-8">
              Common <span className="text-blue-700 italic font-light">Questions.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
              Find instant answers about orders, shipping, and printer setups. 
              We've organized everything to make your experience smoother.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <section className=" bg-white">
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sidebar: Categories */}
            <aside className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-800 mb-8 flex items-center gap-3">
                  <div className="w-8 h-px bg-blue-800" /> Topic Groups
                </h3>
                <div className="flex flex-col gap-2">
                  {faqs.map((f) => (
                    <button
                      key={f.category}
                      onClick={() => {
                        setActiveCategory(f.category);
                        setActiveIdx(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between gap-4 rounded-2xl px-6 py-4 text-left border transition-all duration-300',
                        activeCategory === f.category
                          ? 'bg-blue-800 border-blue-800 text-white shadow-xl shadow-blue-900/10'
                          : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-950'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-10 h-10 rounded-xl flex items-center justify-center',
                          activeCategory === f.category ? 'bg-white/20' : 'bg-blue-50 text-blue-800'
                        )}>
                          <f.icon size={20} />
                        </div>
                        <span className="text-[14px] font-bold uppercase tracking-tight">{f.category}</span>
                      </div>
                      {activeCategory === f.category && <ArrowRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Still Unsure Box */}
              <div className="bg-slate-900 p-10 rounded-[3rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity" />
                 <h4 className="text-white text-2xl font-black mb-4 relative z-10 leading-tight tracking-tight italic">Still Unsure?</h4>
                 <p className="text-slate-400 text-[14px] leading-relaxed mb-8 relative z-10">If you couldn't find your answer here, our team is happy to help you personally.</p>
                 <Link to="/contact" className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-800 group-hover:text-white transition-all relative z-10 shadow-xl">
                    <ArrowRight size={20} />
                 </Link>
              </div>
            </aside>

            {/* Accordion Area */}
            <main className="lg:col-span-8">
              <div className="mb-12">
                <span className="text-blue-800 text-[11px] font-black uppercase tracking-[0.3em] mb-4 block">Viewing Category</span>
                <h2 className="text-[32px] md:text-[42px] font-bold text-slate-950 tracking-tighter uppercase italic">
                  {activeCategory}
                </h2>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "rounded-[2.5rem] border transition-all duration-500",
                      activeIdx === i ? "border-blue-200 bg-blue-50/20" : "border-slate-100 bg-white"
                    )}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between gap-6 px-10 py-8 text-left"
                    >
                      <span className={cn(
                        "text-[16px] md:text-[18px] font-bold leading-tight pr-6 transition-colors",
                        activeIdx === i ? "text-blue-700" : "text-slate-950"
                      )}>
                        {faq.q}
                      </span>

                      <div className={cn(
                        "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                        activeIdx === i ? "bg-blue-800 text-white rotate-180" : "bg-slate-50 text-slate-400"
                      )}>
                        {activeIdx === i ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {activeIdx === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-10 pb-10">
                            <div className="h-px w-10 bg-blue-100 mb-8" />
                            <p className="text-[15px] md:text-[16px] text-slate-500 font-medium leading-relaxed max-w-3xl">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16 text-center">
          <h2 className="text-slate-950 text-[32px] md:text-[48px] font-bold tracking-tight mb-8 leading-none">
            Need More <span className="text-blue-700 italic font-light">Assistance?</span>
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Our professional support team is available round the clock to help you with 
            your printer setups and order inquiries.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="w-full sm:w-auto h-[60px] px-10 bg-slate-950 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-blue-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Message Support <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="text-slate-900 font-bold uppercase tracking-widest text-[11px] hover:text-blue-800 transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
