import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, Box, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Zap, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'Operational request logged.' },
    { key: 'processing', label: 'Preparing', icon: Package, desc: 'Hardware units being calibrated.' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Deployment in progress.' },
    { key: 'out_for_delivery', label: 'Local Deployment', icon: MapPin, desc: 'System near destination.' },
    { key: 'delivered', label: 'Deployed', icon: CheckCircle2, desc: 'Installation successful.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] pt-40 pb-20 font-snpro px-6 flex flex-col items-center justify-center text-slate-900">
        <SEO title="Track Order | Printer Brother" />
        <div className="max-w-md w-full text-center">
          <div className="h-24 w-24 bg-white border border-gray-100 flex items-center justify-center mx-auto mb-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#0047ab]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            <Package size={40} className="text-gray-200 relative z-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase italic tracking-tighter mb-4">Track Order.</h1>
          <p className="text-gray-400 text-sm font-medium mb-12 uppercase tracking-widest leading-relaxed">Login to view full history or enter <br/>guest email credentials below.</p>
          
          <form onSubmit={handleGuestSearch} className="space-y-6 bg-white p-10 border border-gray-100 relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#0047ab]" />
            <div className="space-y-3 text-left">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Credentials <span className="text-[#0047ab]">*</span></label>
               <input 
                 type="email" required placeholder="john@example.com" value={guestEmail}
                 onChange={(e) => setGuestEmail(e.target.value)}
                 className="w-full h-14 px-5 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
               />
            </div>
            <button className="w-full h-16 bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl">
              Initiate Search
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-gray-100">
            <Link to="/login" className="text-[#0047ab] font-black text-[10px] uppercase tracking-[0.3em] italic hover:text-black transition-all">Sign in for full history log</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-40 pb-24 font-snpro text-slate-900 overflow-x-hidden">
      <SEO title="Order History | Printer Brother" />
      
      <div className="max-w-[1650px] mx-auto px-6 md:px-10">
        
        {/* --- BENTO HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-gray-100 pb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-1 bg-[#0047ab]" />
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Deployment Logs</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase italic tracking-tighter leading-[0.9]">
              Order <br />
              <span className="text-[#0047ab]">History.</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1 block">Registered Records</span>
                <span className="text-3xl font-black text-[#0047ab] italic leading-none">{orders.length}</span>
             </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-10 w-10 text-[#0047ab] mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 italic">Accessing Archives...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white border border-gray-100 p-16 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <FileText size={150} className="text-black" />
            </div>
            <Package size={48} className="text-gray-200 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-black uppercase italic tracking-tighter mb-4">No records found.</h3>
            <p className="text-gray-400 text-sm font-medium mb-10 max-w-sm mx-auto uppercase tracking-widest">No active or historical deployments registered to this profile.</p>
            <Link to="/shop" className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl inline-flex items-center gap-4">
              Access Inventory <ArrowRight size={18} strokeWidth={3} />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-gray-100 overflow-hidden group hover:border-[#0047ab]/30 transition-all duration-500 shadow-xl shadow-black/5 p-1"
              >
                {/* Order Meta Header */}
                <div className="p-8 border border-gray-50 flex flex-wrap items-center justify-between gap-8 bg-[#fcfcfc]">
                  <div className="flex items-center gap-12">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Deployment ID</p>
                      <h3 className="text-base font-black text-black uppercase tracking-tight">#{order.order_code || order.id}</h3>
                    </div>
                    <div className="h-10 w-px bg-gray-200 hidden sm:block" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Logged Timeline</p>
                      <p className="text-sm font-black text-black italic">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 ml-auto">
                    <div className={cn(
                      "px-5 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border bg-white shadow-sm italic",
                      order.status === 'completed' || order.status === 'delivered' ? "text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "text-amber-600 border-amber-100" :
                      "text-[#0047ab] border-blue-100"
                    )}>
                      <div className={cn("h-2 w-2 rounded-full", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500 animate-pulse" :
                        order.status === 'pending' ? "bg-amber-500 animate-pulse" : "bg-[#0047ab] animate-pulse"
                      )} />
                      {order.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Stock Value</p>
                      <p className="text-3xl font-black text-black tracking-tighter italic leading-none">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items & Shipping */}
                <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 space-y-10">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group/item">
                        <div className="h-24 w-24 bg-gray-50 border border-gray-100 flex items-center justify-center p-5 shrink-0 transition-all group-hover/item:border-[#0047ab]/30 group-hover/item:bg-white overflow-hidden">
                          <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover/item:scale-110" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-black text-black uppercase tracking-tight truncate mb-2">{item.product_name}</h4>
                          <div className="flex items-center gap-4">
                             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">Unit Qty: {item.quantity}</p>
                             <div className="h-1 w-1 rounded-full bg-gray-200" />
                             <p className="text-[11px] font-black text-black uppercase tracking-widest">${parseFloat(item.price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="lg:w-[400px] space-y-10 lg:border-l lg:border-gray-100 lg:pl-16">
                    <div className="space-y-4">
                       <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#0047ab]" />
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Deployment Destination</p>
                       </div>
                       <div className="bg-gray-50/50 p-6 border border-gray-100 group-hover:bg-white transition-colors">
                          <p className="text-sm font-bold text-black leading-relaxed uppercase tracking-tight italic">
                             {order.address}<br/>
                             {order.city}, {order.zipCode}<br/>
                             <span className="text-[10px] text-[#0047ab] font-black mt-2 inline-block">SECURE TERMINAL</span>
                          </p>
                       </div>
                    </div>
                    
                    <button onClick={() => setSelectedOrder(order)} className="w-full h-16 bg-black text-white flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all active:scale-95 shadow-xl group">
                      Synchronize Status
                      <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl p-12 font-snpro border-t-4 border-[#0047ab]">
                <div className="flex items-center justify-between mb-12">
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <Zap size={14} className="text-[#0047ab]" fill="#0047ab" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0047ab]">Live Telemetry</span>
                     </div>
                     <h2 className="text-3xl font-black text-black uppercase italic tracking-tighter">Tracking Log</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all active:scale-90 border border-gray-100"><X size={24} strokeWidth={3} /></button>
                </div>
                
                <div className="space-y-12 relative px-4">
                  <div className="absolute left-[35px] top-4 bottom-4 w-[2px] bg-gray-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-10">
                        <div className={cn("h-10 w-10 flex items-center justify-center z-10 transition-all duration-700 border-2", isCompleted ? 'bg-[#0047ab] text-white border-[#0047ab] shadow-xl shadow-[#0047ab]/20' : 'bg-white text-gray-200 border-gray-100')}>
                          <Icon size={18} strokeWidth={isCompleted ? 3 : 2} />
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className={cn("text-[14px] font-black uppercase tracking-[0.1em] italic", isCompleted ? 'text-black' : 'text-gray-300')}>{step.label}</h4>
                          <p className={cn("text-[11px] font-bold mt-1 leading-relaxed", isCompleted ? 'text-gray-500' : 'text-gray-300')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                   <button onClick={() => setSelectedOrder(null)} className="w-full py-4 bg-gray-50 text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all italic">Terminate Session</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
