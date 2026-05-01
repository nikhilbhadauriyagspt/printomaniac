import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import User from 'lucide-react/dist/esm/icons/user';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Package from 'lucide-react/dist/esm/icons/package';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Eye from 'lucide-react/dist/esm/icons/eye';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Settings from 'lucide-react/dist/esm/icons/settings';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored || stored === 'undefined') return null;
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser());
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast('Profile updated successfully', 'success');
      }
    } catch (err) {
      showToast('Update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();

    if (securityForm.password !== securityForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        showToast('Password changed successfully', 'success');
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast('Security update failed', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Account Info', icon: User },
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 font-['Poppins'] text-slate-900">
      <SEO title="My Account | MyPrinterHero" />

      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-800 text-white flex items-center justify-center shadow-lg shadow-blue-100">
                <LayoutGrid size={24} />
              </div>
              <div>
                <h1 className="text-[24px] font-black text-slate-900 leading-none mb-1">My Dashboard</h1>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  Welcome back, {user.name?.split(' ')[0]}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button
                onClick={handleLogout}
                className="h-12 px-6 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2 active:scale-95"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-3 border-r border-gray-50 p-6 space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[14px] font-bold transition-all border',
                    activeTab === tab.id
                      ? 'bg-blue-800 text-white border-blue-800 shadow-lg shadow-blue-100'
                      : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200 hover:text-slate-900'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon size={18} />
                    {tab.label}
                  </div>
                  <ChevronRight size={16} className={cn(activeTab === tab.id ? 'opacity-100' : 'opacity-0')} />
                </button>
              ))}

              <div className="mt-10 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-blue-800 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" />
                 <ShieldCheck className="text-blue-400 mb-4 relative z-10" size={24} />
                 <h4 className="text-[16px] font-black mb-2 relative z-10">Data Safety</h4>
                 <p className="text-[12px] text-white/50 leading-relaxed relative z-10">
                   Your details are encrypted and stored with bank-grade security.
                 </p>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 p-8 md:p-12">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                          <User size={20} />
                       </div>
                       <h2 className="text-[24px] font-black text-slate-900">Personal Details</h2>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-8 max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                            Full Name
                          </label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors" size={18} />
                            <input
                              required
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-800 focus:bg-white outline-none text-[15px] font-medium transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                            Phone Number
                          </label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors" size={18} />
                            <input
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-800 focus:bg-white outline-none text-[15px] font-medium transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                          Email Address
                        </label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                          <input
                            value={user.email || ''}
                            disabled
                            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-100 border border-gray-100 text-gray-400 outline-none text-[15px] font-medium cursor-not-allowed"
                          />
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 pl-1">Email cannot be changed once verified.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                          Saved Address
                        </label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-5 text-gray-400 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <textarea
                            rows="3"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-800 focus:bg-white outline-none text-[15px] font-medium transition-all resize-none"
                            placeholder="Enter your shipping address"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isUpdating}
                        className="h-16 px-10 rounded-2xl bg-blue-800 text-white font-black text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-100"
                      >
                        {isUpdating ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                      </button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                             <Package size={20} />
                          </div>
                          <h2 className="text-[24px] font-black text-slate-900">Recent Orders</h2>
                       </div>
                       <Link to="/orders" className="text-[12px] font-black text-blue-800 uppercase tracking-widest hover:underline">
                         Full History
                       </Link>
                    </div>

                    {loading ? (
                      <div className="py-20 text-center">
                        <Loader2 className="animate-spin text-blue-800 mx-auto mb-4" />
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Fetching orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-20 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100">
                        <ShoppingBag size={48} className="text-gray-200 mx-auto mb-6" />
                        <p className="text-[18px] font-bold text-slate-900 mb-8">No orders found</p>
                        <Link to="/shop" className="h-14 px-8 bg-blue-800 text-white font-black text-[13px] uppercase tracking-widest rounded-2xl inline-flex items-center gap-2 hover:bg-blue-700 transition-all">
                           Explore Shop <ArrowRight size={16} />
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 4).map((order) => (
                          <div key={order.id} className="group bg-white border border-gray-100 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-800/30 transition-all duration-300">
                            <div className="flex items-center gap-5 w-full md:w-auto">
                               <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-white transition-colors">
                                  <span className="text-[14px] font-black text-slate-900">#{order.id}</span>
                               </div>
                               <div>
                                  <p className="text-[14px] font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString()}</p>
                                  <div className={cn(
                                    'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border inline-block mt-1',
                                    order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-800 border-blue-100'
                                  )}>
                                    {order.status}
                                  </div>
                               </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto">
                               <p className="text-[18px] font-black text-slate-900">${parseFloat(order.total_amount || 0).toLocaleString()}</p>
                               <Link to="/orders" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-800 hover:border-blue-800 transition-all">
                                  <ChevronRight size={18} />
                               </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
                          <Lock size={20} />
                       </div>
                       <h2 className="text-[24px] font-black text-slate-900">Security Update</h2>
                    </div>

                    <form onSubmit={handleSecurityUpdate} className="space-y-8 max-w-xl">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                          New Password
                        </label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.password}
                            onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                            className="w-full h-14 pl-12 pr-12 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-800 focus:bg-white outline-none text-[15px] font-medium transition-all"
                            placeholder="Min. 8 characters"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-900 transition-colors"
                          >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-1">
                          Confirm New Password
                        </label>
                        <div className="relative group">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors" size={18} />
                          <input
                            type={showPass ? 'text' : 'password'}
                            required
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-blue-800 focus:bg-white outline-none text-[15px] font-medium transition-all"
                          />
                        </div>
                      </div>

                      <button
                        disabled={isUpdating}
                        className="h-16 px-10 rounded-2xl bg-blue-800 text-white font-black text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-100"
                      >
                        {isUpdating ? <Loader2 className="animate-spin" /> : 'Update Password'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
