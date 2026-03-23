import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Loader2, Truck, ChevronLeft, Search, ShoppingBag } from 'lucide-react';
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
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your item is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Your item will arrive today.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered to you.' }
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

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white 
       pb-20 font-jakarta px-6 flex flex-col items-center justify-center text-slate-900">
        <SEO title="Track Order | Axel Printing" />
        <div className="max-w-[450px] w-full">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl font-black text-slate-900 ">
              Track your <span className="text-blue-600">Order</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Enter your email to find your recent order details.</p>
          </div>
          
          <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
            <form onSubmit={handleGuestSearch} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Order Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <Search size={18} />
                  </div>
                  <input 
                    type="email" required placeholder="example@email.com" value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white h-12 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Find Order <ArrowRight size={16} />
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <Link to="/login" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Sign in for full history</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="Order History | Axel Printing" />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10 mb-12">
          <div className="space-y-2 text-left">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
              My <span className="text-blue-600">Orders</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Managing your recent purchases and tracking</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <ShoppingBag size={14} className="text-blue-600" />
            {orders.length} Total Orders
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-6" strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-2xl border border-slate-100 max-w-2xl mx-auto">
            <Package size={48} strokeWidth={1} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">No orders found</h2>
            <Link to="/shop" className="inline-flex items-center gap-3 bg-blue-600 text-white h-12 px-8 rounded-xl mt-8 text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Browse Catalog <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group hover:border-blue-100 transition-all duration-500"
              >
                {/* Meta Header */}
                <div className="p-6 md:p-8 border-b border-slate-50 flex flex-wrap items-center justify-between gap-6 bg-slate-50/50">
                  <div className="flex flex-wrap items-center gap-8 md:gap-16">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Ref</p>
                      <h3 className="text-sm font-bold text-slate-900 uppercase">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Placed On</p>
                      <p className="text-sm font-bold text-slate-900">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Amount</p>
                      <p className="text-lg font-black text-slate-900">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                    order.status === 'delivered' ? "bg-green-50 text-green-600 border-green-100" : "bg-blue-50 text-blue-600 border-blue-100"
                  )}>
                    {order.status.replace('_', ' ')}
                  </div>
                </div>

                {/* Items & Track */}
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-10 items-center">
                  <div className="flex-1 w-full space-y-6">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item">
                        <div className="h-16 w-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-3 shrink-0">
                          <img src={getImagePath(item.images)} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-tight truncate">{item.product_name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity} • ${parseFloat(item.price).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="w-full lg:w-auto h-12 px-10 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
                  >
                    Track Status <Truck size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- TRACKING MODAL --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-lg bg-white z-[1001] shadow-2xl rounded-2xl p-8 md:p-12 font-jakarta border border-slate-100 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <div className="space-y-1">
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Real-time update</span>
                     <h2 className="text-2xl font-black text-slate-900 leading-none uppercase">Order <span className="text-blue-600">Journey</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-8 w-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-all"><X size={18} /></button>
                </div>
                
                <div className="space-y-8 relative px-2">
                  <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-6 group/step">
                        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all duration-500 border-2", isCompleted ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-200 border-slate-100')}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1">
                          <h4 className={cn("text-[11px] font-black uppercase tracking-widest transition-colors duration-500", isCompleted ? 'text-slate-900' : 'text-slate-300')}>{step.label}</h4>
                          <p className={cn("text-[10px] font-medium mt-1 leading-relaxed transition-colors duration-500", isCompleted ? 'text-slate-500' : 'text-slate-200')}>{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-10 h-12 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Close</button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
