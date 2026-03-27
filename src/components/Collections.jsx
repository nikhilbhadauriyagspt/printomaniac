import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import banner10 from "@/assets/bannerr/newban1.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-12 w-full border-b border-gray-100">
      <div className="w-full px-4 md:px-10">
        
        <div className="relative h-auto md:h-[400px] overflow-hidden flex flex-col md:flex-row border border-gray-200">
          
          {/* Left Side: Content with solid background */}
          <div className="w-full md:w-[45%] bg-[#0a0a0b] p-8 md:p-16 flex flex-col justify-center items-start space-y-5 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500 text-center">best Series of 2026</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white ">
                High Performance <span className="text-cyan-700">Printers</span>
              </h2>

              <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-sm">
Experience top-quality output with our advanced range, perfect for crisp documents and daily performance              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all active:scale-95"
                >
                  Explore Now <ArrowRight size={16} />
                </Link>
              </div>
          </div>

          {/* Right Side: Image with perfect fit */}
          <div className="w-full md:w-[55%] relative h-[250px] md:h-full bg-slate-100">
            <img
              src={banner10}
              alt="Flagship Collection"
              className="w-full h-full object-cover md:object-center"
            />
            {/* Subtle transition between sides */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent hidden md:block" />
          </div>

        </div>

      </div>
    </section>
  );
}
