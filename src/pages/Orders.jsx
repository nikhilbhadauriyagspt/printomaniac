import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Loader2, 
  Truck, 
  ChevronLeft, 
  Search, 
  ShoppingBag,
  History,
  ExternalLink,
  Calendar,
  CreditCard,
  Box,
  ChevronRight,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

// Helper component for product images in orders
function ProductImage({ item, getImagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // If item already has images/image, use it
    const existingImage = item.images || item.image || item.product_images || item.product_image || item.product?.images || item.product?.image;
    if (existingImage) {
      setImageUrl(getImagePath(existingImage));
      return;
    }

    // Otherwise, fetch the product by slug or id to get its image
    const identifier = item.product_slug || item.slug;
    if (identifier) {
      fetch(`${API_BASE_URL}/products/${identifier}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data.images) {
            setImageUrl(getImagePath(data.data.images));
          }
        })
        .catch(() => {});
    }
  }, [item, getImagePath]);

  return (
    <img 
      src={imageUrl || "https://via.placeholder.com/400x400?text=Product"} 
      className="max-w-full max-h-full object-contain mix-blend-multiply" 
      alt="" 
      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Product"; }}
    />
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order received', icon: Clock, desc: 'We have received your order.' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your item is being prepared.' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Your order is on the way.' },
    { key: 'out_for_delivery', label: 'Out for delivery', icon: MapPin, desc: 'Your item will arrive today.' },
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
    if (!images) return "https://via.placeholder.com/400x400?text=Product";
    try {
      if (typeof images === 'string') {
        if (images.startsWith('[') || images.startsWith('{')) {
          const imgs = JSON.parse(images);
          if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
        }
        return `/${images}`;
      }
      if (Array.isArray(images) && images.length > 0) return `/${images[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=Product";
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden">
        <SEO title="Track Order | My Printer Store" />
        
        {/* --- PREMIUM TRACKING HEADER --- */}
        <section className="pt-32 pb-20 px-4 md:px-10 lg:px-16 bg-white relative overflow-hidden border-b border-slate-100">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-10" />
          
          <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-cyan-500" />
                <span className="text-cyan-600 text-[11px] font-black uppercase tracking-[0.4em]">Order Protocol</span>
                <div className="h-px w-12 bg-cyan-500" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Track Your <span className="text-slate-400">Inventory</span>
              </h1>
              <p className="text-slate-500 text-sm font-bold tracking-widest max-w-xl mx-auto uppercase">
                Access real-time status updates for your professional printing Printer.
              </p>
            </div>

            <div className="w-full max-w-[500px] bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <form onSubmit={handleGuestSearch} className="space-y-8 relative z-10 text-left">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Registration Email</label>
                  <div className="relative">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-500 transition-colors">
                      <Search size={20} strokeWidth={2.5} />
                    </div>
                    <input 
                      type="email" required placeholder="IDENTIFYING EMAIL..." value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
                
                <button className="w-full h-14 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-cyan-600 shadow-xl shadow-slate-900/10 active:scale-[0.98]">
                  Find Shipment <ArrowRight size={18} />
                </button>
              </form>
              
              <div className="mt-10 pt-8 border-t border-slate-100 text-center relative z-10">
                <Link to="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-cyan-600 transition-colors flex items-center justify-center gap-2 group">
                  Sign in for full history <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Order History | My Printer Store" />
      
      {/* --- ELITE PAGE HEADER --- */}
      <section className="pt-32 pb-16 px-4 md:px-10 lg:px-16 border-b border-slate-100 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-10" />
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-cyan-500" />
              <span className="text-cyan-600 text-[11px] font-black uppercase tracking-[0.4em]">Client History</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none ">
              Purchase <span className="text-slate-400">Archives</span>
            </h1>
            <p className="text-slate-500 text-sm font-bold tracking-widest max-w-xl uppercase">
              Managing your professional printing inventory and real-time shipment logistics.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-6 py-3 rounded-xl border border-slate-100 self-start lg:self-end">
                <History size={14} className="text-cyan-600" /> {orders.length} Shipments Processed
             </div>
          </div>
        </div>
      </section>

      {/* --- ORDER LOG SYSTEM --- */}
      <section className="px-4 md:px-10 lg:px-16 py-16 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative h-20 w-20 flex items-center justify-center">
               <Loader2 className="animate-spin h-full w-full text-cyan-500" strokeWidth={1} />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Box size={24} className="text-slate-200" />
               </div>
            </div>
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Syncing Logs</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-40 bg-slate-50 rounded-[3rem] border border-slate-100 max-w-4xl mx-auto">
            <div className="h-24 w-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-slate-200/50 border border-slate-100">
               <Package size={40} strokeWidth={1.5} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-900 mb-4">No Inventory History</h2>
            <p className="text-slate-500 text-sm font-bold tracking-widest mb-10 uppercase">Your professional Printer archive is currently empty.</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-cyan-600 shadow-2xl shadow-slate-900/10 active:scale-95"
            >
              Explore Catalog <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order, orderIdx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: orderIdx * 0.1 }}
                key={order.id} 
                className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-cyan-500/20 transition-all duration-700 group"
              >
                {/* Modern Meta Header */}
                <div className="px-8 md:px-12 py-10 border-b border-slate-100 flex flex-wrap items-center justify-between gap-10 bg-slate-50/30 group-hover:bg-white transition-colors">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-20">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-cyan-500" /> Identifier
                      </p>
                      <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">#{order.order_code || order.id}</h3>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-cyan-500" /> Logged On
                      </p>
                      <p className="text-[13px] font-black text-slate-900 uppercase tracking-widest">
                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-cyan-500" /> Valuation
                      </p>
                      <p className="text-[15px] font-black text-slate-900 tracking-tight">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-cyan-500" /> Status
                      </p>
                      <div className={cn(
                        "inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                        order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-cyan-50 text-cyan-600 border-cyan-100"
                      )}>
                        {order.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10"
                  >
                    Track Shipment <Truck size={18} />
                  </button>
                </div>

                {/* Items Visualization */}
                <div className="px-8 md:px-12 py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-8 group/item">
                          <div className="h-20 w-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-4 shrink-0 group-hover/item:border-cyan-500/30 group-hover/item:bg-white transition-all shadow-sm overflow-hidden">
                            <ProductImage item={item} getImagePath={getImagePath} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest line-clamp-1 mb-2">{item.product_name}</h4>
                            <div className="flex items-center gap-4">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                               <div className="h-1 w-1 rounded-full bg-slate-200" />
                               <span className="text-[13px] font-black text-cyan-600 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                            </div>
                          </div>
                          <Link to={`/product/${item.product_slug}`} className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-cyan-600 hover:border-cyan-500 transition-all">
                             <ExternalLink size={16} />
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    {/* Visual Progress Map */}
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                       <div className="flex items-center justify-between mb-8">
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Logistic Journey</h5>
                          <span className="text-[9px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-lg">Live Protocol</span>
                       </div>
                       
                       <div className="relative pt-2 px-2">
                          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-slate-200" />
                          
                          {/* Progress Line */}
                          <div 
                            className="absolute left-[7px] top-4 w-[2px] bg-cyan-500 transition-all duration-1000" 
                            style={{ height: `${(getStatusIndex(order.status) / (statusMap.length - 1)) * 100}%` }}
                          />

                          <div className="space-y-8 relative">
                            {statusMap.slice(0, getStatusIndex(order.status) + 1).map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-6">
                                 <div className="h-4 w-4 rounded-full bg-cyan-500 border-4 border-white shadow-[0_0_0_1px_rgba(6,182,212,0.2)] z-10 mt-1" />
                                 <div className="flex-1">
                                    <h6 className="text-[11px] font-black uppercase tracking-wider text-slate-900">{step.label}</h6>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{step.desc}</p>
                                 </div>
                              </div>
                            ))}
                            {statusMap.slice(getStatusIndex(order.status) + 1).map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-6 opacity-40">
                                 <div className="h-4 w-4 rounded-full bg-slate-300 border-4 border-white z-10 mt-1" />
                                 <div className="flex-1">
                                    <h6 className="text-[11px] font-black uppercase tracking-wider text-slate-400">{step.label}</h6>
                                 </div>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- ELITE TRACKING MODAL --- */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[1000]" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} 
                animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} 
                exit={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} 
                className="fixed top-1/2 left-1/2 w-full max-w-xl bg-white z-[1001] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] rounded-[3rem] p-10 md:p-14 font-jakarta border border-slate-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
                
                <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="space-y-3">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600">Active Sync</span>
                     </div>
                     <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Shipment <span className="text-slate-400">Status</span></h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-12 w-12 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><X size={20} /></button>
                </div>
                
                <div className="space-y-10 relative px-2 mb-12">
                  <div className="absolute left-[27px] top-6 bottom-6 w-px bg-slate-100" />
                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="relative flex gap-8 group/step">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 border-2", 
                          isCompleted ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-white text-slate-200 border-slate-100'
                        )}>
                          <Icon size={24} strokeWidth={isCompleted ? 2 : 1.5} />
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className={cn("text-[13px] font-black uppercase tracking-widest transition-colors duration-500", isCompleted ? 'text-slate-900' : 'text-slate-300')}>{step.label}</h4>
                          {isCompleted && (
                            <p className="text-[10px] font-bold mt-2 leading-relaxed tracking-wider text-slate-500 uppercase">{step.desc}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4 relative z-10">
                   <button onClick={() => setSelectedOrder(null)} className="flex-1 h-14 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10">Synchronized</button>
                   <button className="h-14 w-14 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><CreditCard size={20} /></button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-24 pt-10 border-t border-slate-100 flex justify-center">
          <Link to="/shop" className="group inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-cyan-600 transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Return to Inventory
          </Link>
        </div>
      </section>
    </div>
  );
}
