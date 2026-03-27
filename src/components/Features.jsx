import React from 'react';
import { Truck, ShieldCheck, Headphones, Printer } from 'lucide-react';

const features = [
  {
    icon: <Truck className="text-cyan-600" size={32} strokeWidth={1.5} />,
    title: "Fast Shipping",
    desc: "On all printer orders"
  },
  {
    icon: <ShieldCheck className="text-cyan-600" size={32} strokeWidth={1.5} />,
    title: "30-Day Returns",
    desc: "Hassle-free guarantee"
  },
  {
    icon: <Headphones className="text-cyan-600" size={32} strokeWidth={1.5} />,
    title: "24/7 Support",
    desc: "Expert help anytime"
  },
  {
    icon: <Printer className="text-cyan-600" size={32} strokeWidth={1.5} />,
    title: "Quality Prints",
    desc: "Crisp and clear output"
  }
];

export default function Features() {
  return (
    <section className="w-full bg-white   border-b border-gray-100  ">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-4  justify-center group">
              <div className="  transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs font-medium mt-0.5">
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
