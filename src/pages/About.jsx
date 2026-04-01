import React from 'react';
import { ArrowRight, Printer, ShieldCheck, Truck, Headphones, Award, Target, Zap, CheckCircle2, Globe, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

// Assets
import banner6 from "@/assets/bannerr/newban1.jpg";
import banner1 from "@/assets/bannerr/banner7.jpg";

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="About Our Professional Printing Solutions | Printer Club"
        description="Learn about our high standards, quality hardware, and commitment to providing the best printing equipment across the USA."
      />

      {/* --- PROFESSIONAL PAGE HEADER --- */}
      <section className="pt-32 pb-20 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1 text-left">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Established Excellence</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
                Your Strategic <br /> <span className="text-blue-600">Printing Partner.</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-bold leading-relaxed max-w-2xl">
                We bridge the gap between complex printing needs and professional printer. Our focus is providing the reliability your workspace demands.
              </p>
            </div>
            <div className="flex-1 w-full hidden lg:block">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                 className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100"
               >
                  <img src={banner6} alt="Professional Setup" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/10" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED PHILOSOPHY SECTION --- */}
      <section className="py-24 bg-white">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content (Story) */}
            <div className="lg:col-span-7 space-y-10">
               <div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Built on Foundation of <span className="text-blue-600">Reliability.</span></h2>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    In today's fast-paced work environment, printing shouldn't be a hurdle. We started with a clear objective: to simplify the process of acquiring high-quality printers and supplies. We recognized that professionals don't just need a machine; they need a dependable tool that performs consistently under pressure.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                     <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                        <Target className="text-blue-600" size={20} /> Our Mission
                     </h4>
                     <p className="text-slate-500 text-sm font-bold leading-relaxed">
                        To empower every office and home workspace with precision-engineered printing solutions that maximize productivity and minimize downtime.
                     </p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                     <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                        <Award className="text-blue-600" size={20} /> Our Quality
                     </h4>
                     <p className="text-slate-500 text-sm font-bold leading-relaxed">
                        We maintain rigorous standards for our inventory, ensuring every printer and ink unit meets the specific output requirements of our clients.
                     </p>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">How We Operative</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Our operation is streamlined to provide direct access to the industry's best printer. We avoid the clutter of unnecessary features , focusing instead on the core mechanics that matter: print speed, clarity, and hardware durability. By maintaining a curated inventory, we ensure that every product we offer is a high-performance unit.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {[
                        "Selective Printer Sourcing",
                        "100% Reliable Consumables",
                        "Pre-Shipment Quality Verifications",
                        "Dedicated USA-wide Logistics",
                        "Professional Expert Consultations",
                        "Long-term Equipment Support"
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-700">
                           <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Right Sidebar (Specs/Visuals) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
               <div className="relative aspect-[4/4] rounded-[2.5rem] overflow-hidden group shadow-xl">
                  <img src={banner1} alt="Hardware Inventory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <h4 className="text-white text-2xl font-black mb-2">Inventory Excellence</h4>
                     <p className="text-slate-300 text-sm font-bold leading-relaxed">Only the most capable units make it to our final selection list.</p>
                  </div>
               </div>

             
            </div>

          </div>
        </div>
      </section>

      {/* --- INFRASTRUCTURE COMMITMENT --- */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="w-full px-4 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
               <h2 className="text-4xl md:text-4xl font-black tracking-tighter mb-8">A Commitment to your <span className="text-blue-600">Infrastructure.</span></h2>
               <p className="text-slate-500 text-lg md:text-lg font-bold leading-relaxed">
                  We don't just deliver printers; we deliver the foundation of your document workflow. Our logistics and support teams work in tandem to ensure your transition to better printing is seamless.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { icon: <Box />, title: "Secure Logistics", desc: "Every unit is packed with professional care to prevent any mechanical damage during transit." },
                  { icon: <Globe />, title: "USA Operations", desc: "Operating directly within the USA to provide fast shipping and local-standard professional support." },
                  { icon: <Zap />, title: "Direct Accuracy", desc: "We provide detailed specifications for every unit so you know exactly what you are integrating." },
                  { icon: <ShieldCheck />, title: "Hardware Integrity", desc: "No second-hand or refurbished units. Only brand new, high-performance hardware for professionals." }
               ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-6 p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-600 transition-all shadow-sm">
                     <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        {item.icon}
                     </div>
                     <div className="space-y-3">
                        <h4 className="text-lg font-black uppercase tracking-tight">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-bold leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FINAL STATEMENT --- */}
      <section className="py-32 bg-white text-center">
         <div className="w-full px-4 max-w-4xl mx-auto space-y-12">
            <div className="space-y-6">
               <div className="flex justify-center mb-4">
                  <div className="h-1 w-24 bg-blue-600 rounded-full" />
               </div>
               <h2 className="text-4xl md:text-4xl font-black tracking-tighter leading-tight">Your Efficiency, <span className="text-blue-600">Our Priority.</span></h2>
               <p className="text-slate-500 text-lg font-bold leading-relaxed">
                  Join the thousands of professionals who have upgraded their printing infrastructure with our curated hardware and supplies. Experience the difference that precision makes.
               </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
               <Link to="/shop" className="group flex items-center gap-4 px-12 py-5 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200">
                  Explore Inventory
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link to="/contact" className="px-12 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-full text-[11px] font-black uppercase tracking-[3px] hover:bg-slate-900 hover:text-white transition-all shadow-lg">
                  Speak with an Expert
               </Link>
            </div>
         </div>
      </section>

      <div className="h-20" />
    </div>
  );
};

export default About;
