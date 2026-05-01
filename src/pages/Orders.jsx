import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import Package from 'lucide-react/dist/esm/icons/package';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import X from 'lucide-react/dist/esm/icons/x';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Clock from 'lucide-react/dist/esm/icons/clock';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Truck from 'lucide-react/dist/esm/icons/truck';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackEmail, setTrackEmail] = useState('');
  const [isTrackLoading, setIsTrackLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleQuickTrack = async (e) => {
    e.preventDefault();
    if (!trackEmail) return;
    setIsTrackLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders?email=${trackEmail}`);
      const data = await res.json();
      if (data.status === 'success' && data.data.length > 0) {
        setOrders(data.data);
      } else {
        setError('No orders found for this email address.');
        setOrders([]);
      }
    } catch {
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setIsTrackLoading(false);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/orders?user_id=${user?.id}`);
      const data = await res.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setError(data.message || 'No orders found.');
      }
    } catch {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchOrders();
    else setLoading(false);
  }, []);

  const getStatus = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'Delivered';
    if (s === 'processing') return 'Processing';
    if (s === 'shipped') return 'Shipped';
    return 'Pending';
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (s === 'processing') return 'bg-amber-50 text-amber-600 border-amber-100';
    if (s === 'shipped') return 'bg-blue-50 text-blue-800 border-blue-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return <CheckCircle2 size={12} />;
    if (s === 'shipped') return <Truck size={12} />;
    return <Clock size={12} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 font-['Poppins'] text-slate-900">
      <SEO title="Order History | Printo Maniac" />

      <div className="max-w-[1200px] mx-auto px-4 mb-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-[32px] md:text-[42px] font-black leading-tight mb-4 tracking-tight">
              Track Your <span className="text-blue-400 italic">Order.</span>
            </h2>
            <p className="text-slate-400 text-[15px] font-medium mb-10 leading-relaxed">
              Enter your Order ID and the email address used during checkout to get real-time updates on your delivery status.
            </p>

            <form onSubmit={handleQuickTrack} className="flex flex-col sm:flex-row gap-4">
              <input
                required
                type="email"
                placeholder="Enter your registered email address"
                value={trackEmail}
                onChange={(e) => setTrackEmail(e.target.value)}
                className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl px-6 text-[13px] font-bold tracking-widest outline-none focus:border-blue-400 transition-all placeholder:text-slate-600"
              />
              <button
                disabled={isTrackLoading}
                className="h-14 px-10 bg-blue-800 text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isTrackLoading ? 'Searching...' : 'Find My Orders'}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Inside Container */}
          <div className="px-8 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                <Package size={24} />
              </div>
              <div>
                <h1 className="text-[24px] font-black text-slate-900 leading-none mb-1">Order History</h1>
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{orders.length} Orders Found</p>
              </div>
            </div>
            {!loading && orders.length > 0 && (
              <Link to="/shop" className="text-[13px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Shop More <ArrowRight size={16} />
              </Link>
            )}
          </div>

          {/* Orders List */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <div className="h-4 w-32 bg-gray-100 mx-auto rounded mb-4" />
                <div className="h-10 w-64 bg-gray-50 mx-auto rounded-xl" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-32 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h2 className="text-[20px] font-bold text-slate-900 mb-2">No orders yet</h2>
                <p className="text-gray-400 text-[14px] mb-10">You haven't placed any orders with us yet.</p>
                <Link to="/shop" className="px-10 h-14 bg-blue-800 text-white font-black text-[13px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  Start Shopping <ArrowRight size={18} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="group bg-white border border-gray-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-800/30 hover:bg-gray-50/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-14 h-14 rounded-2xl bg-gray-50 flex flex-col items-center justify-center shrink-0 border border-gray-100 group-hover:bg-white transition-colors">
                        <span className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">Order</span>
                        <span className="text-[16px] font-black text-slate-900 leading-none">#{order.id}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-[15px]">
                          {new Date(order.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </h3>
                        <div className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full border',
                          getStatusColor(order.status)
                        )}>
                          {getStatusIcon(order.status)}
                          {getStatus(order.status)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-right md:text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Amount Paid</p>
                        <p className="text-[20px] font-black text-slate-900">
                          ${parseFloat(order.total_amount).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="h-12 px-6 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Help Footer */}
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 text-gray-400">
               <HelpCircle size={16} />
               <span className="text-[13px] font-bold">Need help with an order?</span>
             </div>
             <Link to="/contact" className="text-[13px] font-black text-slate-900 hover:text-blue-800 transition-colors uppercase tracking-widest">
               Contact Support
             </Link>
          </div>
        </div>
      </div>

      {/* Modern Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[500]"
              onClick={() => setSelectedOrder(null)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] max-w-lg rounded-[3rem] shadow-2xl z-[510] overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                <div>
                  <h2 className="text-[20px] font-black text-slate-900">Order # {selectedOrder.id}</h2>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Transaction Summary</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-slate-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-[13px] font-bold text-gray-500 uppercase tracking-widest">Status</span>
                  <span className={cn(
                    'px-4 py-1.5 text-[11px] font-black uppercase tracking-widest rounded-full border',
                    getStatusColor(selectedOrder.status)
                  )}>
                    {getStatus(selectedOrder.status)}
                  </span>
                </div>

                <div>
                  <h3 className="text-[12px] font-black uppercase tracking-widest text-gray-400 mb-4 pl-1">Purchased Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((i, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl">
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold text-slate-900 truncate">{i.product_name}</p>
                          <p className="text-[12px] text-gray-500">Quantity: {i.quantity}</p>
                        </div>
                        <div className="pl-4 text-right">
                          <p className="text-[14px] font-black text-slate-900">${(parseFloat(i.price) * i.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[16px] font-black text-slate-900">Grand Total</span>
                  <span className="text-[24px] font-black text-blue-800">${parseFloat(selectedOrder.total_amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-blue-800 transition-all"
                >
                  Close Summary
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
