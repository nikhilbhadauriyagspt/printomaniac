import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-white min-h-screen font-jakarta pb-24 text-slate-900">
      
      {/* --- MINIMAL POLICY HEADER --- */}
      {title && (
        <section className="relative pt-32 pb-16 px-4 md:px-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto text-left space-y-8">
            
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span>Legal center</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                {title.split(' ').slice(0, -1).join(' ')} <span className="text-blue-600">{title.split(' ').pop()}</span>
              </h1>
              
              {subtitle && (
                <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white border border-gray-100">
              <Clock size={14} className="text-blue-600" />
              <span className="text-xs font-bold text-slate-400">Last updated: <span className="text-slate-900 font-semibold">{lastUpdated}</span></span>
            </div>
          </div>
        </section>
      )}

      {/* --- POLICY CONTENT --- */}
      <article className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl prose prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:pt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-p:text-slate-600 prose-p:text-base prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-strong:font-bold prose-a:text-blue-600 prose-a:font-bold hover:prose-a:text-blue-700 transition-all"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}
