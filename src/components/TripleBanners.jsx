import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Images
import mid1 from '../assets/middle-imges/1.avif';
import mid2 from '../assets/middle-imges/2.avif';
import mid3 from '../assets/middle-imges/3.avif';

const banners = [
  { id: 1, image: mid2 },
  { id: 2, image: mid1 },
  { id: 3, image: mid3 }
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-[1820px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-[300px] md:h-[250px] rounded-[2.5rem] overflow-hidden group"
            >
              <Link to="/shop" className="block w-full h-full">
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  width="600"
                  height="300"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
