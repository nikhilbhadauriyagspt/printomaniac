import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ArrowRight, ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const faqs = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on Printer Brother?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },     
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },   
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on Printer Brother secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }      
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & Availability",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We specialize in a wide range of premium printing solutions, including printers and accessories from various trusted brands." },
      { q: "How can I choose the right printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." },
      { q: "Can I compare products before buying?", a: "Yes. Use our Compare feature to check specs, features, and pricing side by side." }
    ]
  },
  {
    category: "Warranty & Support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for HP products?", a: "You can contact HP Support directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my printer arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." },
      { q: "How do I contact customer support?", a: "You can reach us via email, chat, or our contact form. Support is available 7 days a week." }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7–14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after inspection." },
      { q: "What products are eligible for return?", a: "Products must be unused, in original condition, and returned with complete accessories and packaging." },
      { q: "What if my item is defective or missing parts?", a: "Report the issue within 48 hours, and we will arrange a replacement or resolve the issue immediately." }
    ]
  },
  {
    category: "Account & Profile",
    questions: [
      { q: "How do I create an account?", a: "Click Sign Up, enter your details, and verify your email." },
      { q: "I forgot my password — what should I do?", a: "Use the Forgot Password option to reset it instantly via email." },
      { q: "How can I update my profile details?", a: "Go to My Account → Profile Info to edit your name, address, phone number, etc." },
      { q: "Can I view my past orders?", a: "Yes. All previous orders are listed in your Order History." }
    ]
  },
  {
    category: "Printer & Ink",
    questions: [
      { q: "How do I choose the right printer?", a: "Consider your usage — home, office, photos, or bulk printing — and our team can recommend the best match." },
      { q: "Do you sell original HP ink and toner?", a: "Yes. We sell 100% original HP ink and toner, plus compatible options for other brands." },
      { q: "Why is my printer showing “Offline”?", a: "This usually indicates a driver issue or Wi-Fi interruption. Our support team can fix this quickly." },
      { q: "How do I improve print quality?", a: "Try cleaning printheads, using genuine supplies, adjusting paper settings, or contacting support." }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      { q: "Is my payment information secure?", a: "Yes. All payments are encrypted and processed through secure, trusted gateways." },
      { q: "Why was my payment declined?", a: "This could be due to bank restrictions, incorrect details, or insufficient balance. Try again or check with your bank." },
      { q: "Do you store my billing information?", a: "No. Sensitive information is never stored — it’s processed securely by our payment partners." },
      { q: "Can I get a tax/GST invoice?", a: "Yes. You can download your invoice directly from the My Orders section." }
    ]
  },
  {
    category: "Business Orders",
    questions: [
      { q: "Do you offer corporate or bulk discounts?", a: "Yes. Contact us for custom pricing on large orders." },
      { q: "Can businesses request custom quotes?", a: "Absolutely. Our team provides quotes for offices, institutions, and resellers." },
      { q: "Do you offer managed printing or device solutions?", a: "Yes. We support businesses with printer fleet management and bulk supply programs." }
    ]
  },
  {
    category: "General Info",
    questions: [
      { q: "Are all products brand new and sealed?", a: "Yes. Every product is brand new, sealed, and delivered with full warranty." },
      { q: "Do you offer customer support on weekends?", a: "Yes. Our support team is available 7 days a week." },
      { q: "How can I contact Printer Brother?", a: "You can reach us through email, live chat, or the contact form on our website." },
      { q: "Do you offer discount codes or promotions?", a: "Yes. Keep an eye on our homepage banners and newsletter for active offers." }
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
    <div className="bg-[#fcfcfc] min-h-screen font-snpro text-slate-900 overflow-x-hidden">
      <SEO 
        title="FAQ | Printer Brother" 
        description="Find answers to common questions about ordering, shipping, and returns at Printer Brother."
      />

      {/* --- BENTO HERO SECTION --- */}
      <section className="pt-12 pb-16 px-6 md:px-10 border-b border-gray-100 bg-white">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-1 bg-[#0047ab]" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Knowledge Base</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
                Help <br />
                <span className="text-[#0047ab]">Center.</span>
              </h1>
            </div>
            <div className="lg:text-right pb-2">
              <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed max-w-md lg:ml-auto">
                Everything you need to know about our hardware, deployment processes, and how we help you scale your office infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT: GRID --- */}
      <div className="max-w-[1650px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- CATEGORY NAVIGATION (SIDEBAR) --- */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar sticky top-[100px]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 hidden lg:block">Categories</h4>
            {faqs.map((f) => (
              <button
                key={f.category}
                onClick={() => { setActiveCategory(f.category); setActiveIdx(null); }}
                className={cn(
                  "px-6 py-4 text-xs font-bold transition-all whitespace-nowrap text-left flex items-center justify-between group border-l-2",
                  activeCategory === f.category 
                    ? "bg-blue-50/50 text-[#0047ab] border-[#0047ab]" 
                    : "text-gray-500 hover:text-black hover:bg-gray-50 border-transparent"
                )}
              >
                <span className="uppercase tracking-widest">{f.category}</span>
                <ArrowRight size={14} className={cn("transition-transform duration-300", activeCategory === f.category ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
              </button>
            ))}
          </div>

          {/* --- ACCORDION PANEL --- */}
          <div className="lg:col-span-8 space-y-4">
             <div className="mb-8">
                <h3 className="text-2xl font-black text-black uppercase italic tracking-tighter">{activeCategory}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Frequently Asked Questions</p>
             </div>

            {filteredFaqs.map((faq, i) => (
              <div 
                key={i}
                className={cn(
                  "border bg-white transition-all duration-500 overflow-hidden relative group",
                  activeIdx === i ? "border-[#0047ab]/30 shadow-lg shadow-[#0047ab]/5" : "border-gray-100 hover:border-gray-200"
                )}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left z-10 relative"
                >
                  <span className={cn(
                    "text-sm md:text-base font-black transition-colors leading-tight uppercase tracking-tight",
                    activeIdx === i ? "text-[#0047ab]" : "text-black group-hover:text-[#0047ab]"
                  )}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    "h-8 w-8 flex items-center justify-center transition-all duration-500 shrink-0 ml-6",
                    activeIdx === i ? "text-[#0047ab] rotate-180" : "text-gray-300 group-hover:text-[#0047ab]"
                  )}>
                    <ChevronDown size={20} strokeWidth={3} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 relative z-10">
                        <div className="h-px w-10 bg-[#0047ab] mb-6" />
                        <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-3xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* --- CONTACT CTA: BENTO STYLE --- */}
      <section className="pb-24 px-6 md:px-10">
         <div className="max-w-[1650px] mx-auto">
            <div className="bg-black p-12 md:p-24 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 1px, transparent 1px)', size: '20px 20px' }} />
               
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <HelpCircle size={150} className="text-white" />
               </div>

               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <div className="space-y-4">
                     <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight">
                       Still require <br /> 
                       <span className="text-[#0047ab]">Assistance?</span>
                     </h2>
                     <p className="text-gray-400 text-base font-medium max-w-xl mx-auto">
                       Our specialized support team is available 7 days a week to provide expert guidance and infrastructure advice.
                     </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link to="/contact" className="bg-[#0047ab] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95 shadow-2xl shadow-[#0047ab]/20">
                      Consult An Expert
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
