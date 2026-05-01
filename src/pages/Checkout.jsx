import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Lock from 'lucide-react/dist/esm/icons/lock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Mail from 'lucide-react/dist/esm/icons/mail';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Package from 'lucide-react/dist/esm/icons/package';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Wallet from 'lucide-react/dist/esm/icons/wallet';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Truck from 'lucide-react/dist/esm/icons/truck';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'paypal',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: cartTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'printomaniac.com',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id || data.data?.order_code || data.data?.id);
        setStep(3);
        clearCart();
      } else {
        alert(data.message || 'Error placing order.');
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    } else if (formData.paymentMethod === 'cod') {
      await handleOrderSuccess();
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith('http') ? img : `/${img}`;
      }
    } catch (e) {}
    return 'https://via.placeholder.com/100x100?text=Product';
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <ShoppingBag size={34} className="text-gray-300" />
          </div>
          <h2 className="text-[28px] font-black text-slate-900 mb-4">Your bag is empty</h2>
          <p className="text-gray-500 mb-10 text-[15px]">
            Please add some printers or supplies before checking out.
          </p>
          <Link
            to="/shop"
            className="inline-flex h-16 w-full items-center justify-center rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4 text-slate-900">
        <SEO title="Order Confirmed | Printo Maniac" />
        <div className="max-w-xl w-full bg-white rounded-[3rem] border border-gray-100 p-12 text-center shadow-2xl shadow-blue-900/5">
          <div className="w-24 h-24 bg-blue-800 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-100">
            <CheckCircle2 size={42} />
          </div>

          <h1 className="text-[36px] md:text-[42px] font-black text-slate-900 mb-4 leading-tight">
            Order Confirmed!
          </h1>

          <p className="text-gray-500 leading-relaxed text-[16px] max-w-md mx-auto mb-10">
            Thank you for choosing Printo Maniac. Your order <span className="text-slate-900 font-bold">#{orderId}</span> is being processed. 
            We've sent a confirmation to <span className="text-slate-900 font-bold">{formData.email}</span>.
          </p>

          <div className="space-y-4">
            <Link
              to="/orders"
              className="w-full h-16 rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
            >
              Track Order Status <ArrowRight size={18} />
            </Link>

            <Link
              to="/"
              className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-[14px] uppercase tracking-widest flex items-center justify-center hover:bg-blue-800 transition-all"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 pt-32 pb-20">
      <SEO title="Secure Checkout | Printo Maniac" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Header / Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">
              <Link to="/cart" className="hover:text-blue-800 transition-colors">Bag</Link>
              <ChevronRight size={12} />
              <span className={cn(step === 1 ? "text-blue-800" : "text-slate-900")}>Shipping</span>
              <ChevronRight size={12} />
              <span className={cn(step === 2 ? "text-blue-800" : "text-gray-400")}>Payment</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-black text-slate-900 leading-none">
              {step === 1 ? "Secure Checkout" : "Final Payment"}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100">
             <Lock size={16} className="text-blue-800" />
             <span className="text-[12px] font-black text-gray-500 uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8 bg-gray-50 rounded-[3rem] p-8 md:p-12 lg:p-16 border border-gray-100">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                          <Mail size={18} />
                       </div>
                       <h3 className="text-[24px] font-black text-slate-900">Contact Details</h3>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                          <MapPin size={18} />
                       </div>
                       <h3 className="text-[24px] font-black text-slate-900">Shipping Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                          Last Name
                        </label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                        Street Address
                      </label>
                      <input
                        required
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                          City / State
                        </label>
                        <input
                          required
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                          Zip / Postal Code
                        </label>
                        <input
                          required
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-black uppercase tracking-widest text-gray-400 pl-2">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-16 rounded-2xl bg-white border border-gray-100 px-6 text-[15px] font-medium focus:border-blue-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-16 rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
                  >
                    Continue to Payment <ArrowRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center">
                          <CreditCard size={18} />
                       </div>
                       <h3 className="text-[24px] font-black text-slate-900">Payment Method</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          id: 'paypal',
                          label: 'PayPal / Credit Card',
                          icon: CreditCard,
                          desc: 'Secure payment via PayPal account or bank cards.',
                        },
                        {
                          id: 'cod',
                          label: 'Cash on Delivery',
                          icon: Wallet,
                          desc: 'Pay safely with cash when your package arrives.',
                        },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: method.id })
                          }
                          className={cn(
                            'p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center justify-between group',
                            formData.paymentMethod === method.id
                              ? 'border-blue-800 bg-white shadow-xl shadow-blue-900/5'
                              : 'border-white bg-white/50 hover:border-blue-200'
                          )}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={cn(
                                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                                formData.paymentMethod === method.id
                                  ? 'border-blue-800'
                                  : 'border-gray-200 group-hover:border-blue-300'
                              )}
                            >
                              {formData.paymentMethod === method.id && (
                                <div className="w-3 h-3 rounded-full bg-blue-800" />
                              )}
                            </div>

                            <div>
                              <p className="text-[16px] font-black text-slate-900 leading-none mb-1">
                                {method.label}
                              </p>
                              <p className="text-[13px] font-bold text-gray-400">
                                {method.desc}
                              </p>
                            </div>
                          </div>

                          <method.icon
                            size={24}
                            className={cn(
                              formData.paymentMethod === method.id
                                ? 'text-blue-800'
                                : 'text-gray-300'
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {formData.paymentMethod === 'paypal' ? (
                      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                        <PayPalScriptProvider options={{
                          "client-id": "Aa7mAnBKh44YCdokTrFjIP1wIB6mVVjrN8z-NZc_G2VLYJle_Xz9pMdOO7DRXx7zYT7Gh0dzbJUY9DDm",
                          currency: "USD",
                          intent: "capture"
                        }}>
                          <PayPalButtons
                            style={{ layout: 'vertical', shape: 'pill', label: 'pay' }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: { value: cartTotal.toString() },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then((details) => {
                                handleOrderSuccess(details);
                              });
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-blue-800 text-white font-black text-[14px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95"
                      >
                        {loading ? 'Processing...' : 'Complete Order'}
                        {!loading && <CheckCircle2 size={20} />}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full text-center text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-800 transition-colors py-4"
                    >
                      <ChevronLeft size={16} className="inline mr-2" />
                      Back to Information
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <h3 className="text-[20px] font-black text-slate-900 mb-8">Order Summary</h3>

              <div className="max-h-[350px] overflow-y-auto pr-2 space-y-6 mb-8 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={getImagePath(item.images)}
                        className="max-h-[85%] max-w-[85%] object-contain"
                        alt=""
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-slate-800 line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>

                    <p className="text-[15px] font-black text-slate-900">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${(cartTotal || 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>

                <div className="flex justify-between items-end pt-4">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-800 block mb-1">
                      Grand Total
                    </span>
                    <span className="text-[32px] font-black text-slate-900 leading-none">
                      ${(cartTotal || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <ShieldCheck size={18} className="text-blue-400" />
                     <span className="text-[11px] font-black uppercase tracking-widest">PCI Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Truck size={18} className="text-blue-400" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Tracked Delivery</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Package size={18} className="text-blue-400" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Genuine Assurance</span>
                  </div>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
