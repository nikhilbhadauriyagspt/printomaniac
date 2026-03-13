import { Truck, RefreshCcw, ShieldCheck, Headset } from 'lucide-react';

const features = [
  {
    icon: <Truck size={32} strokeWidth={1.5} />,
    title: "FREE SHIPPING",
    desc: "On all orders above $500 across USA",
  },
  {
    icon: <RefreshCcw size={32} strokeWidth={1.5} />,
    title: "30-DAY RETURNS",
    desc: "Hassle-free money back guarantee",
  },
  {
    icon: <ShieldCheck size={32} strokeWidth={1.5} />,
    title: "OFFICIAL WARRANTY",
    desc: "100% genuine products with warranty",
  },
  {
    icon: <Headset size={32} strokeWidth={1.5} />,
    title: "EXPERT SUPPORT",
    desc: "24/7 Dedicated help for your office",
  }
];

export default function Features() {
  return (
    <section className="bg-white py-12 border-b border-gray-100 font-sans">
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-6 group"
            >
              {/* Icon Circle */}
              <div className="shrink-0 h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-[#0047ab] group-hover:bg-[#0047ab] group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                {item.icon}
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest leading-none">
                  {item.title}
                </h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
