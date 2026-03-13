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
  ShoppingCart
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
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
  }, [user]);

  const fetchOrders = async () => {
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
        showToast("Profile updated successfully!", "success");
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
        showToast("Password changed successfully!", "success");
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
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pt-40 pb-24 font-urbanist overflow-hidden">
      <SEO title="Account Dashboard | Printer Brother" />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500" />
            <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em]">Account Hub</span>
            <div className="h-[1px] w-12 bg-amber-500" />
          </div>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase inline-block relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500">
                My Dashboard
              </span>
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[1px] bg-slate-100 -z-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- NAVIGATION SIDEBAR --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[3rem] text-center relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center">
                   <div className="h-24 w-24 bg-indigo-950 flex items-center justify-center text-white text-4xl font-black shadow-2xl rounded-[2rem] mb-8 uppercase tracking-tighter">
                     {user.name.charAt(0)}
                   </div>
                   <h2 className="text-2xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-2">{user.name}</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1.5 p-2 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                {[
                  { id: 'profile', label: 'My Details', icon: User },
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'security', label: 'Security', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 group",
                      activeTab === tab.id 
                      ? "bg-white text-indigo-600 shadow-xl shadow-indigo-500/5 border border-indigo-50" 
                      : "text-slate-400 hover:text-indigo-950 hover:bg-white/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                       <tab.icon size={16} className={activeTab === tab.id ? "text-indigo-600" : ""} />
                       {tab.label}
                    </div>
                    <ChevronRight size={14} className={cn("transition-all duration-500", activeTab === tab.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-slate-100 px-2 pb-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all duration-500 group"
                  >
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- CONTENT HUB --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-indigo-500/5"
                >
                  <div className="flex items-end justify-between mb-16 border-b border-slate-100 pb-10">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Settings</p>
                      <h3 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter">My Details.</h3>
                    </div>
                    <User size={32} className="text-slate-200" />
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Full Name</label>
                        <input 
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm font-bold transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-3 text-left">
                        <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Phone Number</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm font-bold transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-3 text-left">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Delivery Address</label>
                      <textarea 
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none text-sm font-bold transition-all resize-none shadow-sm"
                      ></textarea>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUpdating}
                      className="h-16 px-14 bg-indigo-950 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-amber-500 hover:text-indigo-950 transition-all shadow-xl shadow-indigo-950/10 disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Save Changes"}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-indigo-950 text-white rounded-[3rem] p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-10 group shadow-2xl shadow-indigo-950/20">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Package size={120} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                         <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">Timeline</h4>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none mb-4">Orders.</h3>
                      <p className="text-indigo-200/60 text-[11px] font-bold uppercase tracking-widest">{orders.length} items purchased total</p>
                    </div>
                    <Link to="/shop" className="h-14 px-10 bg-amber-500 text-indigo-950 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all relative z-10 shadow-xl shadow-amber-500/20 active:scale-95">
                      New Order <ArrowRight size={16} className="ml-3" />
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {orders.length === 0 ? (
                      <div className="bg-slate-50 border border-slate-100 rounded-[3rem] py-32 text-center">
                        <ShoppingCart size={64} strokeWidth={1} className="text-slate-200 mx-auto mb-8" />
                        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em]">No order records found.</p>
                      </div>
                    ) : (
                      orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden group hover:border-indigo-600 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/5">
                          <div className="p-10 flex items-center justify-between border-b border-slate-50 bg-slate-50/30">
                            <div className="flex items-center gap-8 text-left">
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">ID</p>
                                  <h4 className="text-xl font-black text-indigo-950 uppercase tracking-tighter">#{order.order_code || order.id}</h4>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-2xl font-black text-indigo-950 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                               <span className={cn(
                                 "mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all",
                                 order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                               )}>
                                 <div className={cn("h-1 w-1 rounded-full animate-pulse", order.status === 'delivered' ? "bg-emerald-500" : "bg-indigo-500")} />
                                 {order.status}
                               </span>
                            </div>
                          </div>
                          <div className="p-8 flex items-center justify-between bg-white">
                             <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-indigo-600" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                             </div>
                             <Link to="/orders" className="flex items-center gap-3 text-[10px] font-black text-indigo-950 uppercase tracking-widest hover:text-indigo-600 transition-all group">
                               Full View <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                             </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-indigo-500/5"
                >
                  <div className="flex items-end justify-between mb-16 border-b border-slate-100 pb-10">
                    <div>
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-3">Security</p>
                      <h3 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter">Account Access.</h3>
                    </div>
                    <Lock size={32} className="text-slate-200" />
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3 text-left">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">New Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-16 pl-16 pr-16 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm font-bold transition-all shadow-sm"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600">
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3 text-left">
                      <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-2">Confirm Password</label>
                      <div className="relative group">
                        <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} strokeWidth={2} />
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full h-16 pl-16 px-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-600 outline-none text-sm font-bold transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUpdating}
                      className="h-16 px-14 bg-red-500 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-indigo-950 transition-all shadow-xl shadow-red-500/20 disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Update Password"}
                    </motion.button>
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
