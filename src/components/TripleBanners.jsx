import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Assets
import banner1 from '@/assets/bannerr/trip1.png';

const TripleBanners = () => {
  return (
    <section className="bg-white py-6 md:py-10 w-full border-b border-slate-100">
      <div className=" mx-auto  md:px-10">
        <div className="max-w-full  mx-auto px-4 md:px-8">
          
          {/* Small Left-Aligned Banner */}
          <div className="relative bg-white overflow-hidden group shadow-sm border border-slate-100">
            <Link to="/shop" className="block w-full h-full">
              <img 
                src={banner1} 
                alt="Banner" 
                className="w-full h-auto object-contain transition-transform duration-700 " 
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TripleBanners;
