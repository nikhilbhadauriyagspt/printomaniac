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
  History,
  ExternalLink,
  CreditCard,
  Box,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

// Helper component for product images in orders
function ProductImage({ item, getImagePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const existingImage = item.images || item.image || item.product_images || item.product_image || item.product?.images || item.product?.image;
    if (existingImage) {
      setImageUrl(getImagePath(existingImage));
      return;
    }

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
      className="w-full h-full object-contain p-2" 
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
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'We have received your unit request.' },
    { key: 'processing', label: 'System Check', icon: Package, desc: 'Your hardware is undergoing final quality verification.' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Unit has been dispatched via professional courier.' },
    { key: 'out_for_delivery', label: 'Local Delivery', icon: MapPin, desc: 'Hardware is arriving at your workspace today.' },
    { key: 'delivered', label: 'Success', icon: CheckCircle2, desc: 'Hardware integration complete.' }
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

  // --- GUEST TRACKING VIEW ---
  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
        <SEO title="Track Shipment | Printer Club" />
        
        <section className="pt-5 pb-16 border-b border-slate-50 bg-slate-50/30">
          <div className="w-full px-4 md:px-12 lg:px-20 text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="h-[1px] w-8 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Logistic Portal</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-6">
              Track <span className="text-blue-600">Shipment.</span>
            </h1>
            <p className="text-slate-500 font-bold text-sm max-w-xl mx-auto md:mx-0 leading-relaxed">
              Access real-time protocol updates and delivery status for your professional units.
            </p>
          </div>
        </section>

        <section className="py-20 flex items-center justify-center">
          <div className="w-full px-4 max-w-[550px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-blue-500/5"
            >
              <form onSubmit={handleGuestSearch} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[2px] ml-1">Reference Email</label>
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                      type="email" required placeholder="name@company.com" value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full h-14 pl-12 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-sm font-bold transition-all"
                    />
                  </div>
                </div>
                
                <button className="w-full h-14 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3">
                  Find Units <ArrowRight size={16} />
                </button>
              </form>
              
              <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                <Link to="/login" className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[2px] flex items-center justify-center gap-2 group">
                  Sign in for full archive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // --- ORDER HISTORY VIEW ---
  return (
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Unit Archive | Printer Club" />
      
      <section className="pt-32 pb-16 border-b border-slate-50 bg-slate-50/30">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-3">
                <div className="h-[1px] w-8 bg-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[3px] text-blue-600">Unit Archive</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                Purchase <span className="text-blue-600">History.</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
               <History size={14} /> {orders.length} Units Logged
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 min-h-screen">
        <div className="w-full px-4 md:px-12 lg:px-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">Synchronizing Archives</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 max-w-4xl mx-auto px-8">
              <Package size={48} className="mx-auto text-slate-200 mb-8" />
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Archive Data</h2>
              <p className="text-slate-500 font-bold mb-10">Your professional unit log is currently empty.</p>
              <Link to="/shop" className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 group">
                Explore Inventory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="space-y-10 max-w-[1400px] mx-auto">
              {orders.map((order, orderIdx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: orderIdx * 0.05 }}
                  key={order.id} 
                  className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 group"
                >
                  {/* Order Header */}
                  <div className="px-8 md:px-12 py-8 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-8 group-hover:bg-white transition-colors">
                    <div className="flex flex-wrap gap-8 lg:gap-16">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">Protocol ID</p>
                        <h3 className="text-[13px] font-black text-slate-900">#{order.order_code || order.id}</h3>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">Logged Date</p>
                        <p className="text-[13px] font-bold text-slate-700">
                          {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">Valuation</p>
                        <p className="text-lg font-black text-slate-900 tracking-tight">${parseFloat(order.total_amount).toLocaleString()}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">Protocol Status</p>
                        <div className={cn(
                          "inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                        )}>
                          {order.status.replace('_', ' ')}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="h-12 px-8 bg-slate-900 text-white rounded-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[2px] hover:bg-blue-600 transition-all shadow-lg active:scale-95"
                    >
                      Track Unit <Truck size={16} />
                    </button>
                  </div>

                  {/* Order Content */}
                  <div className="px-8 md:px-12 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                      <div className="lg:col-span-7 space-y-6">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-6 group/item">
                            <div className="h-20 w-20 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0 group-hover/item:border-blue-600 transition-all overflow-hidden">
                              <ProductImage item={item} getImagePath={getImagePath} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-wide line-clamp-1 mb-1">{item.product_name}</h4>
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                                 <div className="h-1 w-1 rounded-full bg-slate-200" />
                                 <span className="text-sm font-black text-blue-600 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                              </div>
                            </div>
                            <Link to={`/product/${item.product_slug}`} className="h-10 w-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-blue-600 hover:border-blue-600 transition-all">
                               <ExternalLink size={16} />
                            </Link>
                          </div>
                        ))}
                      </div>
                      
                      <div className="lg:col-span-5 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                         <div className="flex items-center justify-between mb-8">
                            <h5 className="text-[10px] font-black uppercase tracking-[2px] text-slate-900">Logistic Journey</h5>
                            <span className="text-[8px] font-black uppercase tracking-widest text-blue-600 bg-white px-3 py-1 rounded-full border border-blue-50">Live Protocol</span>
                         </div>
                         
                         <div className="relative pt-1">
                            <div className="absolute left-[9px] top-3 bottom-3 w-[1px] bg-slate-200" />
                            <div 
                              className="absolute left-[9px] top-3 w-[1px] bg-blue-600 transition-all duration-1000" 
                              style={{ height: `${(getStatusIndex(order.status) / (statusMap.length - 1)) * 100}%` }}
                            />

                            <div className="space-y-8 relative">
                              {statusMap.slice(0, getStatusIndex(order.status) + 1).map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-6">
                                   <div className="h-5 w-5 rounded-full bg-blue-600 border-[3px] border-white shadow-lg z-10 mt-0.5 shrink-0" />
                                   <div className="flex-1">
                                      <h6 className="text-[11px] font-black uppercase text-slate-900 leading-none">{step.label}</h6>
                                      <p className="text-[10px] font-bold text-slate-400 mt-1">{step.desc}</p>
                                   </div>
                                </div>
                              ))}
                              {statusMap.slice(getStatusIndex(order.status) + 1).map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start gap-6 opacity-30">
                                   <div className="h-5 w-5 rounded-full bg-slate-300 border-[3px] border-white z-10 mt-0.5 shrink-0" />
                                   <div className="flex-1">
                                      <h6 className="text-[11px] font-black uppercase text-slate-400 leading-none">{step.label}</h6>
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
        </div>
      </section>

      {/* --- ELITE TRACKING MODAL --- */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[1000]" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }} exit={{ opacity: 0, scale: 0.9, y: '-45%', x: '-50%' }} 
              className="fixed top-1/2 left-1/2 w-full max-w-lg bg-white z-[1001] shadow-2xl rounded-[2.5rem] p-8 md:p-12 border border-slate-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-24 -mt-24" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="space-y-2">
                   <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Active Protocol</span>
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Shipment Status</h2>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-900 hover:bg-slate-900 hover:text-white transition-all"><X size={20} /></button>
              </div>
              
              <div className="space-y-10 relative px-2 mb-10">
                <div className="absolute left-[31px] top-4 bottom-4 w-px bg-slate-100" />
                {statusMap.map((step, idx) => {
                  const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="relative flex gap-8 items-center">
                      <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700 border", 
                        isCompleted ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-200 border-slate-100'
                      )}>
                        <Icon size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn("text-xs font-black uppercase tracking-widest transition-colors duration-500", isCompleted ? 'text-slate-900' : 'text-slate-300')}>{step.label}</h4>
                        {isCompleted && (
                          <p className="text-[10px] font-bold mt-1 text-slate-500 leading-relaxed">{step.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 relative z-10">
                 <button onClick={() => setSelectedOrder(null)} className="flex-1 h-14 bg-slate-900 text-white rounded-full font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-600 transition-all shadow-xl">Close Log</button>
                 <button className="h-14 w-14 flex items-center justify-center bg-slate-50 text-slate-900 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><ShieldCheck size={20} /></button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="pb-24 pt-12 flex justify-center border-t border-slate-50 bg-slate-50/30">
        <Link to="/shop" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-slate-400 hover:text-blue-600 transition-all">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return to Inventory
        </Link>
      </div>
    </div>
  );
}
