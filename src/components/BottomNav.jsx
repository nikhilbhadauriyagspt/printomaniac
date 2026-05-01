import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Home from 'lucide-react/dist/esm/icons/home';
import Search from 'lucide-react/dist/esm/icons/search';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Heart from 'lucide-react/dist/esm/icons/heart';
import User from 'lucide-react/dist/esm/icons/user';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  const { cartCount, openCartDrawer, openSearch } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/shop', icon: ShoppingBag },
    { name: 'Search', type: 'button', onClick: openSearch, icon: Search },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Account', path: '/login', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.08)] font-['Poppins']">
      <div className="flex items-center justify-around h-[70px] px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.type === 'button') {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1.5 w-full active:scale-90 transition-transform"
              >
                <div className="relative text-slate-500">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <span className="text-[10px] font-medium text-slate-500">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1.5 w-full relative group active:scale-90 transition-transform"
            >
              <div className={`relative transition-all duration-300 ${isActive ? 'text-black' : 'text-slate-500'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.name === 'Store' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-[18px] w-[18px] bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow-lg shadow-blue-100">
                    {cartCount}
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="bottomNavActive"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-black rounded-full shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-black' : 'text-slate-600'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
