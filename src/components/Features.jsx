import React from 'react';
import { Globe, ShieldCheck, Box, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Globe size={24} />,
    title: "Global Shipping",
    desc: "Reliable worldwide delivery"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Checkout",
    desc: "100% protected payments"
  },
  {
    icon: <Box size={24} />,
    title: "Elite Inventory",
    desc: "Premium quality printing"
  },
  {
    icon: <RefreshCcw size={24} />,
    title: "Easy Returns",
    desc: "Hassle-free 30-day policy"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-6 md:py-10 border-y border-slate-50">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-center gap-5 p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="shrink-0 h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                {item.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
