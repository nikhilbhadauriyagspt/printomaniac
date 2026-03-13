import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1650px] mx-auto px-4 md:px-10">

        {/* Professional Web Ad Style Banner */}
        <div className="relative bg-[#003b95] overflow-hidden flex flex-col md:flex-row items-stretch border border-blue-800/20">

          {/* Content Side */}
          <div className="flex-1 p-6 md:p-10 flex flex-col justify-center space-y-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-block bg-[#ffb700] text-[#003b95] px-3 py-0.5 text-[9px] font-black tracking-[0.1em]">
                Exclusive Offer
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight italic tracking-tighter">
                Premium Office <br /> <span className="text-[#ffb700]">Hardware.</span>
              </h2>
              <p className="text-blue-100/70 text-sm font-medium leading-relaxed max-w-lg">
                Maximize your productivity with our latest enterprise-grade printing solutions. Built for high-volume environments that demand absolute precision and reliability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10">
              {["Industrial Grade", "Sharp Results", "Next-Day Delivery"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#ffb700] shrink-0" />
                  <span className="text-[10px] font-black text-white tracking-[0.1em]">{text}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link to="/shop" className="inline-flex items-center gap-3 bg-[#ffb700] text-[#003b95] h-12 px-8 text-[10px] font-black tracking-[0.1em] active:scale-95">
                Shop the Series <ArrowRight size={16} strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-[450px] lg:w-[600px] relative min-h-[300px] md:min-h-full">
            <img
              src={printerCat}
              alt="Professional Collection"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
            />
            {/* Gradient blend to match the Blue theme */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#003b95] via-[#003b95]/40 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
