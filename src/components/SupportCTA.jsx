import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

const steps = [
  {
    number: "1",
    title: "Login Account",
    desc: "Sign in to your account to save your details, manage orders, and enjoy a smooth shopping experience.",
  },
  {
    number: "2",
    title: "Select Product",
    desc: "Browse printer categories and choose the product that matches your home, office, or business needs.",
  },
  {
    number: "3",
    title: "Add to Cart",
    desc: "Add your selected printer or accessories to the cart and review everything before placing the order.",
  },
  {
    number: "4",
    title: "Checkout",
    desc: "Enter your shipping details, complete payment securely, and place your order with confidence.",
  },
];

export default function SupportCTA() {
  return (
    <section className="w-full bg-white py-20 px-4 md:px-10 lg:px-16 border-t border-slate-50">
      <div className="max-w-[1920px] mx-auto">
        {/* --- MINIMALIST HEADER --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-6">
            <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse" />
            <span className="text-blue-700 text-[10px]  uppercase tracking-[0.2em]">Step-by-Step Guide</span>
          </div>
          <h2 className="text-[42px] md:text-[52px] text-slate-950  leading-none tracking-tighter">
            How To <span className="text-blue-700 italic">Buy.</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-6 max-w-lg mx-auto leading-relaxed">
            Follow our streamlined process to get your professional printing hardware delivered to your doorstep.
          </p>
        </div>

        {/* --- CIRCULAR FLOW STEPS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute top-12 left-0 w-full h-px bg-slate-100 hidden lg:block -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Small High-Contrast Circle */}
              <div className="w-20 h-20 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-8 group-hover:border-blue-200 transition-all duration-500 relative">
                <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center text-lg font-black shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                {/* Outer spin ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-100 group-hover:rotate-180 transition-transform duration-700" />
              </div>

              <h3 className="text-[17px]  text-slate-900 mb-3 uppercase tracking-tight">
                {step.title}
              </h3>

              <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- BOTTOM QUICK LINK --- */}
        <div className="mt-20 flex justify-center">
          <Link to="/shop" className="group flex items-center gap-4 text-blue-800 font-black uppercase tracking-widest text-[10px] bg-slate-50 px-8 py-4 rounded-full border border-slate-100 hover:bg-white hover:border-blue-200 transition-all shadow-sm">
            Begin Your Purchase
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}