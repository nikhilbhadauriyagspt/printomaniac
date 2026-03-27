import React from 'react';
import { Shield, Zap, Heart, ArrowRight, Printer, Mail, Info, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

// Assets
import aboutImg1 from '@/assets/bannerr/about.jpg';
import aboutImg2 from '@/assets/bannerr/about2.jpg';

const About = () => {
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO 
        title="About My Printer Store - Simple and Reliable Printing"
        description="Learn more about My Printer Store, our dedication to quality printers, and how we help you with your daily printing needs."
      />

      {/* --- HERO SECTION: SIMPLE & FRIENDLY --- */}
      <section className="relative pt-20 pb-16 px-4 md:px-10 lg:px-16 border-b border-slate-100 bg-white">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-cyan-500" />
                <span className="text-cyan-600 text-sm font-bold">Reliable Printing Solutions</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Helping you find the <br />
                <span className="text-slate-400">perfect printer.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                We provide easy-to-use printers and quality supplies so you can focus on what matters most. No confusion, just great prints.
              </p>
            </div>
            
            <div className="relative">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img src={aboutImg1} alt="Our Printing Shop" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR STORY --- */}
      <section className="py-20 px-4 md:px-10 lg:px-16 bg-white">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
               <div className="aspect-[5/3] rounded-2xl overflow-hidden shadow-lg">
                  <img src={aboutImg2} alt="Reliable Printers" className="w-full h-full object-cover" />
               </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black text-slate-900">Our simple goal</h2>
                 <div className="h-1 w-16 bg-cyan-500" />
              </div>
              
              <div className="space-y-6 text-slate-600 text-lg font-medium leading-relaxed">
                <p>
                  My Printer Store was started with a simple goal to make it easier for everyone to find the right printing tools without any confusion. We know that choosing a printer can be hard with all the technical words and different options out there. That is why we focus on selecting only the most reliable and easy-to-use models for our shop.
                </p>
                <p>
                  Whether you are printing important documents for your business, school projects for your children, or beautiful photos for your home, we want to make sure you have a machine that works every time you press print. We don't believe in "fancy" gadgets that break easily; we believe in solid printers that provide value for your money.
                </p>
                <p>
                  Our team spends a lot of time testing different brands and models to see which ones are actually the best for daily use. We look at how easy they are to set up, how long the ink lasts, and how well they handle different types of paper. If it doesn't meet our standards for reliability, we don't sell it.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-full border border-slate-100">
                   <CheckCircle2 size={18} className="text-cyan-600" />
                   <span className="text-sm font-bold">Tested for Quality</span>
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-full border border-slate-100">
                   <CheckCircle2 size={18} className="text-cyan-600" />
                   <span className="text-sm font-bold">Easy to Set Up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE PROVIDE: BENTO GRID --- */}
      <section className="py-20 px-4 md:px-10 lg:px-16 bg-slate-50">
        <div className="max-w-full mx-auto space-y-12">
          <div className="text-center space-y-4">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900">How we help you</h2>
             <p className="text-slate-500 font-medium">Simple solutions for your daily printing needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Printer size={24} />, title: "Quality Printers", desc: "High-quality printers chosen for reliable performance and everyday efficiency." },
              { icon: <Shield size={24} />, title: "Real Supplies", desc: "Original ink and toner cartridges that keep your machine running smoothly." },
              { icon: <Zap size={24} />, title: "Simple Setup", desc: "Easy guides and direct help from our team if you need a hand getting started." },
              { icon: <Heart size={24} />, title: "Friendly Support", desc: "We focus on your satisfaction and long-term support for your printer." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-6">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INFO BOXES --- */}
      <section className="py-20 px-4 md:px-10 lg:px-16 bg-white border-b border-slate-100">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-10 bg-slate-900 rounded-3xl text-white">
              <div className="flex items-center gap-3 mb-6">
                 <Info size={20} className="text-cyan-400" />
                 <h3 className="text-xl font-bold">Choosing the right printer</h3>
              </div>
              <div className="space-y-4 text-slate-300 font-medium">
                <p>
                  Most people ask us whether they should get an Inkjet or a Laser printer. We explain it simply: Inkjet printers are usually better if you print a lot of photos or colorful documents at home.
                </p>
                <p>
                  Laser printers are built for speed and large amounts of text. If you have a home office or a small business, a laser printer will save you a lot of time and money.
                </p>
                <p>
                  We also offer "All-in-One" machines. These are perfect if you also need to scan documents or make quick copies.
                </p>
              </div>
            </div>

            <div className="p-10 bg-slate-50 border border-slate-200 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                 <Shield size={20} className="text-cyan-600" />
                 <h3 className="text-xl font-bold text-slate-900">Our promise to you</h3>
              </div>
              <div className="space-y-4 text-slate-600 font-medium">
                <p>
                  We are not just an online store; we are here to help. When you buy from My Printer Store, you get peace of mind knowing you have someone to talk to if things don't go as planned.
                </p>
                <p>
                  Our return policy is straightforward because we trust the quality of our products. If your printer arrives damaged or doesn't work as advertised, we will make it right quickly.
                </p>
                <p>
                  We also care about the environment. That is why we encourage using high-capacity ink tanks that help reduce waste and last a lot longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="py-20 px-4 md:px-10 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Need any help?
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              If you have a question or need help picking a printer, please reach out. We love helping our customers find the right solution.
            </p>
          </div>

        

          <div className="pt-6">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
            >
              Contact Us <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


