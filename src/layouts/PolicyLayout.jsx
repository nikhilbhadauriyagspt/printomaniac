import React from 'react';
import { motion } from 'framer-motion';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Clock from 'lucide-react/dist/esm/icons/clock';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white font-['Poppins'] pb-24 ">
      
      {/* --- MINIMAL POLICY HEADER --- */}
      {title && (
        <section className="relative pt-10 pb-16 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto text-center space-y-8 flex flex-col items-center">
            
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span>Legal Center</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl italic text-blue-800 tracking-tight leading-tight">
                {title}
              </h1>
              
              {subtitle && (
                <p className=" text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-none bg-white border border-gray-100">
              <Clock size={14} className="text-blue-800" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last updated: <span className="text-gray-900">{lastUpdated}</span></span>
            </div>
          </div>
        </section>
      )}

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl prose prose-slate prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-xl prose-h2:pt-10 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-h2:uppercase prose-h2:tracking-wider prose-p:text-gray-500 prose-p:text-[15px] prose-p:leading-relaxed prose-li:text-gray-500 prose-strong:text-gray-900 prose-strong:font-bold prose-a:text-blue-800 prose-a:font-bold hover:prose-a:underline transition-all"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
