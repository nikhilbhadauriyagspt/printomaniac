import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Headphones, Shield } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-blue-600" size={24} />,
    title: "Express Printer Shipping",
    desc: "Direct to your creative workspace",
    delay: 0.1
  },
  {
    icon: <ShieldCheck className="text-blue-600" size={24} />,
    title: "Elite Satisfaction",
    desc: "Quality 30-day trial period",
    delay: 0.2
  },
  {
    icon: <Headphones className="text-blue-600" size={24} />,
    title: "Expert Concierge",
    desc: "Specialized expert hardware support",
    delay: 0.3
  },
  {
    icon: <Shield className="text-blue-600" size={24} />,
    title: "Imperial Security",
    desc: "Private encrypted transactions",
    delay: 0.4
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white py-12 border-b border-slate-50">
      <div className="w-full px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex items-center gap-5 group"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-[15px] font-bold text-slate-900 leading-tight ">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-[13px] font-medium leading-tight">
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
