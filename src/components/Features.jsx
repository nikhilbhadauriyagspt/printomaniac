import React from 'react';
import { Truck, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={28} />,
    title: "Swift Logistics",
    desc: "Tracked worldwide delivery",
    color: "blue"
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Ironclad Security",
    desc: "Next-gen payment protection",
    color: "emerald"
  },
  {
    icon: <Zap size={28} />,
    title: "Elite Selection",
    desc: "Curated premium printer",
    color: "amber"
  },
  {
    icon: <Headphones size={28} />,
    title: "Infinite Support",
    desc: "24/7 dedicated assistance",
    color: "rose"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-slate-50/50 py-12 md:py-16 border-y border-slate-100">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex items-center gap-6 p-8 bg-white border border-slate-200/60 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors duration-500 blur-3xl opacity-50" />
              
              <div className="relative shrink-0 flex items-center justify-center">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                  {item.icon}
                </div>
                {/* Accent Dot */}
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform duration-500" />
              </div>

              <div className="relative flex flex-col gap-1">
                <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.1em] group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[12px] font-medium tracking-wide">
                  {item.desc}
                </p>
                <div className="w-8 h-1 bg-slate-100 mt-1 rounded-full group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
