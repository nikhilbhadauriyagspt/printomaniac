import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Using your local asset
import promoImg from "../assets/bannerr/23.avif"; 

export default function Collections() {
  return (
    <section className="w-full bg-white ">
      <div className="max-w-full mx-auto">
        <Link to="/shop" className="block w-full group overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full  overflow-hidden  "
          >
            <img
              src={promoImg}
              alt="Special Offer"
              className="w-full h-full object-cover "
            />
            
            
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
