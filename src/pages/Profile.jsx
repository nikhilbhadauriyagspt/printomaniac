import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { 
  User, 
  Lock, 
  Package, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Loader2,
  Calendar,
  ArrowRight,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
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
      console.error("Error fetching orders:", err);
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
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully", "success");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Password changed successfully", "success");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Security update failed", "error");
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

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="My Account |Printer Club" />
      
      <div className="w-full px-4 md:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10 mb-12">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-none">
              Account <span className="text-blue-600">settings</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Managing your details and order history</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <a href={`mailto:${user.email}`} className="text-[10px] font-medium text-slate-400 hover:text-blue-600 transition-colors">{user.email}</a>
             </div>
             <button onClick={handleLogout} className="h-10 px-5 rounded-lg border border-gray-200 text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center gap-2">
                <LogOut size={14} /> Sign out
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* --- SIDEBAR NAV --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col gap-2">
              {[
                { id: 'profile', label: 'My details', icon: User },
                { id: 'orders', label: 'Order history', icon: Package },
                { id: 'security', label: 'Account security', icon: Lock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-4 rounded-xl text-sm font-bold transition-all border",
                    activeTab === tab.id 
                    ? "bg-blue-500 text-slate-900 border-blue-500 shadow-lg shadow-blue-500/10" 
                    : "bg-white text-slate-500 border-gray-100 hover:border-blue-500 hover:text-blue-600"
                  )}
                >
                  <div className="flex items-center gap-4">
                     <tab.icon size={18} />
                     {tab.label}
                  </div>
                  <ChevronRight size={16} className={cn("transition-transform duration-300", activeTab === tab.id ? "translate-x-0" : "-translate-x-2 opacity-0")} />
                </button>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
               <ShieldCheck className="text-blue-400" size={24} />
               <h4 className="text-lg font-bold leading-tight">Data protection</h4>
               <p className="text-xs text-gray-400 leading-relaxed">Your personal information is encrypted and stored securely. We never share your data with third parties.</p>
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                    <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 border border-gray-100">
                       <User size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Personal details</h2>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full name</label>
                        <input 
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone number</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Default address</label>
                      <textarea 
                        rows="3" value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-5 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all resize-none"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-12 px-10 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Update profile"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2 px-2">
                     <h2 className="text-2xl font-bold tracking-tight">Recent orders</h2>
                     <Link to="/orders" className="text-xs font-bold text-blue-600 hover:underline">View all history</Link>
                  </div>

                  {loading ? (
                    <div className="py-20 flex flex-col items-center">
                       <Loader2 className="animate-spin text-blue-600 mb-4" />
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading orders</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl py-20 text-center">
                      <ShoppingCart size={48} strokeWidth={1} className="text-slate-200 mx-auto mb-6" />
                      <p className="text-sm font-bold text-slate-400">No orders found</p>
                      <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">
                         Start shopping <ArrowRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-100 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                             <h4 className="text-sm font-bold text-slate-900">#{order.order_code || order.id}</h4>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placed on</p>
                             <p className="text-sm font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
                             <p className="text-sm font-bold text-slate-900">${parseFloat(order.total_amount).toLocaleString()}</p>
                          </div>
                          <div className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-bold border w-fit capitalize",
                            order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          )}>
                            {order.status.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                    <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 border border-gray-100">
                       <Lock size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">Security update</h2>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">New password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 transition-colors">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm password</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full h-12 pl-12 px-6 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-12 px-10 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Update password"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
