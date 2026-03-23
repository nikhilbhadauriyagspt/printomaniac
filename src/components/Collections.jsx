import { MoveRight, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner7 from "@/assets/bannerr/banner7.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-8 md:py-12 font-jakarta overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-10">
        
        <div className="relative h-auto md:h-[380px] overflow-hidden flex flex-col md:flex-row shadow-lg">
          
          {/* Left Side: Content with solid background */}
          <div className="w-full md:w-[45%] bg-[#001f3f] p-8 md:p-12 flex flex-col justify-center items-start space-y-5 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-600/20 border border-blue-400/30">
                <Sparkles size={10} className="text-blue-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">Elite Series</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black leading-tight text-white ">
                Premium <span className="text-blue-500">Printing</span> <br /> 
                Hardware
              </h2>

              <p className="text-slate-300 text-[13px] md:text-sm font-medium leading-relaxed max-w-xs">
                Unlock next-level output with our flagship collection. Engineered for precision and professional durability.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 h-10 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                  Explore Now <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image with perfect fit */}
          <div className="w-full md:w-[55%] relative h-[250px] md:h-full bg-slate-100">
            <img
              src={banner7}
              alt="Flagship Collection"
              className="w-full h-full object-cover md:object-right transition-transform duration-[10000ms] hover:scale-105"
            />
            {/* Subtle transition between sides */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#001f3f] to-transparent hidden md:block" />
          </div>

        </div>

      </div>
    </section>
  );
}
