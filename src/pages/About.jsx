import React from 'react';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Zap from 'lucide-react/dist/esm/icons/zap';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import MousePointer2 from 'lucide-react/dist/esm/icons/mouse-pointer-2';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Mail from 'lucide-react/dist/esm/icons/mail';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

// Using consistent assets
import aboutSecondary from '../assets/bannerr/6.avif';
import aboutMain from '../assets/bannerr/col.avif';

const About = () => {
  return (
    <div className="bg-white text-slate-950 overflow-hidden">
      <SEO
        title="About Us | Printomaniac"
        description="Printomaniac makes choosing the right printing products easier with clear, straightforward choices and a smooth interface."
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 bg-slate-50/50">
        <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 rounded-full border border-blue-200/50 mb-6">
                  <div className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse" />
                  <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">About Us</span>
                </div>
                
                <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[0.95] tracking-tighter mb-8">
                  Making printing <br />
                  <span className="text-blue-700 italic">simpler.</span>
                </h1>
                
                <p className="text-slate-600 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10">
                  Printomaniac is built around a simple goal — to make choosing the right printing products easier. 
                  We keep things clear, straightforward, and easy to explore.
                </p>

                <div className="flex flex-wrap gap-6">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-blue-800" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Clear Choices</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-blue-800" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Straight forward Info</span>
                   </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60" />
               <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img src={aboutSecondary} alt="Simple Printing Solutions" className="w-full h-auto" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO & WHY CHOOSE US --- */}
      <section className="py-24 md:py-32 bg-white">
         <div className="max-w-[1820px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="relative group lg:order-2"
               >
                  <div className="absolute inset-0 bg-blue-800/5 rounded-[3rem] translate-x-6 translate-y-6 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700" />
                  <div className="rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl">
                    <img src={aboutMain} alt="Honest and Minimal Approach" className="w-full h-auto" />
                  </div>
               </motion.div>

               <div className="lg:order-1">
                  <div className="mb-16">
                    <h2 className="text-[32px] md:text-[42px]  leading-tight mb-6 tracking-tight">
                      What We <span className="text-blue-700">Do</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                      We keep our approach honest and minimal, focusing on what truly matters to you.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "List products that are useful for everyday needs",
                        "Present information in a clear and easy-to-read format",
                        "Avoid unnecessary complexity and keep things simple"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-800 transition-colors duration-300">
                             <div className="w-1.5 h-1.5 bg-blue-800 rounded-full group-hover:bg-white transition-colors" />
                          </div>
                          <span className="text-slate-600 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-[32px] md:text-[42px]  leading-tight mb-6 tracking-tight">
                      Why People <span className="text-blue-700">Choose Us</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       {[
                         { icon: ShieldCheck, title: "No Confusion", desc: "We provide simple descriptions without any jargon." },
                         { icon: MousePointer2, title: "No Pressure", desc: "Explore at your own pace with total confidence." },
                         { icon: Heart, title: "Calm Experience", desc: "A distraction-free interface for a smooth journey." },
                         { icon: ThumbsUp, title: "Dependable", desc: "Practical solutions designed for everyday use." }
                       ].map((item, i) => (
                         <div key={i} className="space-y-3">
                            <div className="text-blue-800"><item.icon size={24} strokeWidth={1.5} /></div>
                            <h4 className="font-bold text-slate-900 text-[13px] uppercase tracking-widest">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-snug font-medium">{item.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- OUR STORY / ORIGIN --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-[32px] md:text-[42px]  mb-8 tracking-tight">
                Our <span className="text-blue-700 italic">Origin</span>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    We started Printomaniac because we noticed how frustrating it was to find a reliable printer online. It had become a maze of confusing words, complicated descriptions, and options that just didn't last.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    As people who use these tools every day, we realized that nobody needs thousands of confusing choices. They just need a place they can trust for items that actually work. 
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    Our goal was simple: build a store where honesty comes first. A place where a small business owner or a student could find a dependable tool without feeling pressured or overwhelmed.
                  </p>
                  <div className="pt-4 border-l-4 border-blue-800 pl-6">
                    <p className="text-slate-900  italic text-xl">
                      "We don't just ship boxes; we provide the tools that help your ideas come to life on paper."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR APPROACH --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-10 lg:mx-16 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h2 className="text-[36px] md:text-[48px] font-bold mb-12 tracking-tight">
            Our <span className="text-blue-400 italic">Approach</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: LayoutGrid, title: "Clear Choices", desc: "Curated selection to save your time." },
              { icon: Zap, title: "Straight forward", desc: "Honest information without any noise." },
              { icon: MousePointer2, title: "Smooth Experience", desc: "Distraction-free browsing experience." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-blue-400">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-lg  mb-3  tracking-widest text-sm">{item.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-white/5">
            <h3 className="text-2xl md:text-3xl  mb-4 tracking-tight">Who It’s For</h3>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              Printomaniac is designed for individuals and small businesses who want 
              practical and dependable printing solutions for everyday use.
            </p>
          </div>
        </div>
      </section>

      {/* --- GET STARTED CTA --- */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 mb-8">
            <span className="text-blue-700 text-[10px] font-black uppercase tracking-[0.2em]">Ready to explore?</span>
          </div>
          
          <h2 className="text-slate-950 text-[42px] md:text-[56px]  tracking-tighter mb-8">
            Get <span className="text-blue-700 italic">Started.</span>
          </h2>
          
          <p className="text-slate-500 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            You’re welcome to explore our collection and find what works best for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto h-[64px] px-12 bg-blue-800 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/20 active:scale-95"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto h-[64px] px-12 bg-white border-2 border-slate-100 text-slate-950 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:border-blue-800 hover:text-blue-800 transition-all active:scale-95"
            >
              Contact us <Mail size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Internal icon component for the map
const ThumbsUp = ({ size, strokeWidth }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

export default About;
