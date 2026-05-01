import React from 'react';
import Truck from 'lucide-react/dist/esm/icons/truck';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Truck size={28} />,
    title: 'Free Shipping',
    desc: 'On all printer and accessory orders',
    color: 'blue',
  },
  {
    icon: <RotateCcw size={28} />,
    title: 'Easy Returns',
    desc: 'Simple 7-day return process',
    color: 'indigo',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Secure Payment',
    desc: 'Protected checkout for every purchase',
    color: 'sky',
  },
  {
    icon: <Headphones size={28} />,
    title: 'Expert Support',
    desc: 'Helpful printer assistance anytime',
    color: 'emerald',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-blue-900 h-[80px] flex items-center justify-center">
      <div className="w-full px-4 md:px-10 flex flex-row items-center justify-between gap-2 md:gap-8 max-w-[1820px]">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 md:gap-4 text-white"
          >
            <div className="text-blue-300 shrink-0 scale-75 md:scale-100">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <h3 className="text-[11px] md:text-[13px]  leading-none tracking-tight uppercase whitespace-nowrap">
                {item.title}
              </h3>
              <p className="text-[9px] md:text-[10px] text-white/70 font-medium uppercase  mt-1 hidden lg:block">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
