import React from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Assets
import banner6 from "@/assets/bannerr/banner6.png";

export default function Collections() {
  return (
    <section className="  bg-white">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-[220px] md:h-[400px] overflow-hidden  bg-slate-900"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={banner6}
              alt="Elite Collection"
              className="w-full h-full object-cover "
            />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-900/30 mb-4">
                <Sparkles size={12} className="text-blue-800" />
                <span className="text-[10px] font-black uppercase tracking-[2px] text-white">Exclusive 2026 Series</span>
              </div>
              
              <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">
                High-Performance <span className="text-blue-900 text-3xl md:text-5xl">Inventory.</span>
              </h3>
              <p className="text-slate-100 text-xs md:text-sm font-bold mt-2 max-w-md hidden md:block">
                Precision-engineered for the modern workspace. Experience unmatched speed and clarity.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[2px] hover:bg-blue-600 hover:text-white transition-all active:scale-95 w-fit shrink-0 shadow-xl shadow-slate-900/20"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>

         
        </motion.div>
      </div>
    </section>
  );
}
