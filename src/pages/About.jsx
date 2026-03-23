import React from 'react';
import { Shield, Zap, Award, Heart, Sparkle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import banner1 from "@/assets/bannerr/banner1.jpg";
import newban2 from "@/assets/bannerr/about2.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden ">
      <SEO 
        title="Our story | Axel Printing"
        description="We provide reliable printing solutions for your daily needs."
      />

      {/* --- COMPACT HERO SECTION --- */}
      <section className="relative py-12 md:py-20 px-4 md:px-6 lg:px-10">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Side - 5 columns */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-600">Our story</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                  Reliable printing <br />
                  <span className="text-blue-600">for your home.</span>
                </h1>

                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                  We believe that good technology should be simple. Our mission is to provide quality printers and supplies that help you work more effectively every single day.
                </p>
              </div>

              <div className="pt-2">
                <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Explore products <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Image Side - 7 columns for bigger width */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img src={banner1} className="w-full h-full object-cover" alt="About" />
                <div className="absolute inset-0 bg-blue-600/5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SIMPLE VALUES --- */}
      <section className="py-12 bg-slate-50 border-y border-slate-100 px-4 md:px-6 lg:px-10">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Quality products", desc: "We only offer printers that are proven to be reliable and durable.", icon: <Shield className="text-blue-600" /> },
              { title: "Simple setup", desc: "Our products are chosen because they are easy to install and use.", icon: <Zap className="text-blue-600" /> },
              { title: "Friendly support", desc: "We are always here to help you find the right solution for your needs.", icon: <Heart className="text-blue-600" /> }
            ].map((pillar, i) => (
              <div key={i} className="flex gap-4 items-start p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                  {React.cloneElement(pillar.icon, { size: 20 })}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUICK SHOWCASE --- */}
      <section className="py-20 px-4 md:px-6 lg:px-10">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-100">
                <img src={newban2} className="w-full h-full object-cover" alt="Showcase" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Focus on <span className="text-blue-600">reliability.</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                We know that your time is valuable. That's why we focus on delivering printer that works consistently, so you can spend less time troubleshooting and more time creating.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Easy installation", "Reliable output", "Friendly help"].map((feat, i) => (
                  <div key={i} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SMALL CTA --- */}
      <section className="py-20 text-center bg-white border-t border-slate-100 px-4 md:px-6 lg:px-10">
        <div className="max-w-[600px] mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase">
            Start your <span className="text-blue-600">journey today</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              to="/shop" 
              className="bg-slate-900 text-white px-10 h-14 flex items-center justify-center rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all hover:bg-blue-600 shadow-xl w-full sm:w-auto"
            >
              Browse catalog
            </Link>
            <Link 
              to="/contact" 
              className="bg-white border border-slate-200 text-slate-900 px-10 h-14 flex items-center justify-center rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all hover:bg-slate-50 w-full sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
