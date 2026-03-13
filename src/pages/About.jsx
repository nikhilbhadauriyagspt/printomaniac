import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Heart, Star, Globe, Target, TrendingUp, CheckCircle2, Award, Users2, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
import aboutHero from "@/assets/bannerr/about.jpg";
import sideBanner from "@/assets/bannerr/banner4.jpg";

const About = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-snpro text-slate-900 overflow-x-hidden">
      <SEO 
        title="About Our Mission | Printer Brother"
        description="Learn about the philosophy and engineering behind Printer Brother hardware solutions and our commitment to office excellence."
      />

      {/* --- BENTO HERO SECTION --- */}
      <section className="pt-12 pb-24 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Main Text Block */}
            <div className="lg:col-span-7 bg-white border border-gray-100 p-10 md:p-16 flex flex-col justify-center space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#0047ab]" />
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-1 bg-[#0047ab]" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Our Profile</span>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
                    Engineering <br />
                    <span className="text-[#0047ab]">The Future.</span>
                  </h1>
               </div>
               <p className="text-gray-500 text-sm md:text-xl font-medium leading-relaxed max-w-2xl">
                 We are a specialized hardware partner focused on bridging the gap between high-performance technology and seamless office deployment.
               </p>
               <div className="pt-4">
                 <Link to="/shop" className="inline-flex items-center gap-4 bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">
                    View Catalog <ArrowRight size={18} strokeWidth={3} />
                 </Link>
               </div>
            </div>

            {/* Visual Block */}
            <div className="lg:col-span-5 relative h-[400px] lg:h-auto overflow-hidden group border border-gray-100">
               <img src={aboutHero} alt="Office Hardware" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
               <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Standard Reference</p>
                  <p className="text-xl font-black italic uppercase">Verified Excellence.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY: BENTO GRID --- */}
      <section className="py-24 bg-white border-y border-gray-100 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="mb-20 space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-[#0047ab]" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Our Philosophy</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter">
                Professional <span className="text-[#0047ab]">Foundations.</span>
              </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Globe size={28} />, 
                title: "Global Sourcing", 
                desc: "Direct partnerships with manufacturer laboratories to ensure 100% genuine hardware and terminal supplies.",
                accent: "bg-blue-50"
              },
              { 
                icon: <ShieldCheck size={28} />, 
                title: "Internal Audit", 
                desc: "Every unit undergoes a rigorous 48-point verification process before it enters our active inventory catalog.",
                accent: "bg-gray-50"
              },
              { 
                icon: <Zap size={28} />, 
                title: "Rapid Deployment", 
                desc: "Optimized logistics network designed for next-day professional office hardware deployment across the region.",
                accent: "bg-[#0047ab]/5"
              }
            ].map((item, i) => (
              <div key={i} className={cn("p-10 border border-gray-100 space-y-6 group hover:border-[#0047ab]/30 transition-all duration-500", item.accent)}>
                <div className="h-14 w-14 bg-white border border-gray-100 flex items-center justify-center text-[#0047ab] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-black uppercase italic tracking-tight">{item.title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTEGRATED STATS SECTION --- */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-[1650px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative h-[500px] overflow-hidden group border border-gray-100">
               <img src={sideBanner} alt="Precision hardware" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
            </div>

            <div className="space-y-12">
               <div className="space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-tight">
                    Beyond <br /> 
                    <span className="text-[#0047ab]">Conventional Support.</span>
                  </h3>
                  <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                    We believe that professional hardware shouldn't come with complicated support. Our team consists of trained specialists ready to provide clear, actionable advice.
                  </p>
               </div>

               <div className="pt-4">
                  <Link to="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">
                    Connect With Us <ArrowRight size={16} strokeWidth={3} />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA: FINAL IMPACT --- */}
      <section className="pb-24 px-6 md:px-10">
         <div className="max-w-[1650px] mx-auto">
            <div className="bg-black p-12 md:p-24 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 1px, transparent 1px)', size: '20px 20px' }} />
               
               <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Ready to scale <br /> 
                    <span className="text-[#0047ab]">Your infrastructure?</span>
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <Link to="/shop" className="bg-[#0047ab] text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95 shadow-2xl shadow-[#0047ab]/20">
                      Explore Inventory
                    </Link>
                    <Link to="/contact" className="border border-white/20 text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:border-[#0047ab] hover:text-[#0047ab] transition-all active:scale-95">
                      Consult An Expert
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
