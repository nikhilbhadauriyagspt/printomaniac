import React from 'react';
import { motion } from 'framer-motion';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Truck from 'lucide-react/dist/esm/icons/truck';
import LifeBuoy from 'lucide-react/dist/esm/icons/life-buoy';
import Zap from 'lucide-react/dist/esm/icons/zap';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { Link } from 'react-router-dom';

// Using your local asset
import aboutBanner from '../assets/bannerr/6.avif';

const features = [
  {
    icon: CheckCircle2,
    title: 'Genuine Quality',
    desc: 'Original items that you can actually rely on.',
  },
  {
    icon: Truck,
    title: 'Safe Shipping',
    desc: 'Carefully packed and delivered to your doorstep.',
  },
  {
    icon: Zap,
    title: 'Zero Stress',
    desc: 'Simple setups so you can start right away.',
  },
  {
    icon: LifeBuoy,
    title: 'Real Help',
    desc: 'We’re here to help whenever you have a question.',
  },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-10 lg:px-16 overflow-hidden relative">
      {/* --- EXTREME UNIQUE BACKGROUND ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <svg className="absolute -top-24 -left-24 w-96 h-96 opacity-10 text-blue-800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,73.1,41.9C64.8,54.7,53.8,65.8,40.6,73.1C27.4,80.4,12,83.8,-2.6,88.3C-17.2,92.8,-31,98.3,-43.6,93.4C-56.2,88.5,-67.6,73.2,-75.7,58.3C-83.8,43.4,-88.6,28.9,-90.4,14.2C-92.2,-0.5,-91,-15.4,-85.4,-28.9C-79.8,-42.4,-69.8,-54.5,-57.4,-62.7C-45,-70.9,-30.2,-75.2,-15.5,-77.9C-0.8,-80.6,14.6,-81.7,29.1,-79.9C43.6,-78.1,57.2,-73.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <div className="absolute top-1/2 -right-64 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-40" />
      </div>
      
      {/* Floating Geometric Shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-[10%] w-20 h-20 border-[12px] border-blue-50 rounded-full hidden xl:block"
      />
      <motion.div 
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-[5%] w-16 h-16 bg-blue-800/5 rounded-3xl rotate-12 hidden xl:block"
      />

      <div className="max-w-[1820px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT: UNIQUE IMAGE COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            {/* Background Accent Square */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-900 rounded-3xl -z-10" />
            
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-800/10 rounded-[3rem] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src={aboutBanner}
                  alt="Elite Technology"
                  width="800"
                  height="600"
                  decoding="async"
                  className="w-full h-auto block hover:scale-110 transition-transform duration-1000"
                />
              </div>
              
            
            </div>
          </motion.div>

          {/* RIGHT: CLEAN CONTENT */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
             
              <h2 className="text-[40px] md:text-[54px] text-slate-950 leading-[1.1] mb-8 tracking-tighter">
                Better printing, <br />
                <span className="text-blue-900 relative">
                  made easy.
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h2>

              <p className="text-slate-600 text-[16px] md:text-[18px] leading-relaxed mb-12">
                We believe that getting things on paper shouldn't be a headache. 
                Whether it's for your home office or a small project, we're here 
                to make sure you have a reliable tool that just works, without the 
                confusing talk or complicated steps.
              </p>
            </motion.div>

            {/* Premium Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="text-blue-900 group-hover:scale-110 transition-transform">
                      <Icon size={30} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-[14px] text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap items-center gap-10"
            >
              <Link
                to="/about"
                className="group flex items-center gap-4 text-blue-900 font-black uppercase tracking-widest text-xs"
              >
                Find out more about us
                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center group-hover:translate-x-2 transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
              
            
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
