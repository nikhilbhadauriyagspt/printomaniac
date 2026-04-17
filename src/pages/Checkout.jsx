import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  CheckCircle2,
  Package,
  Phone,
  Wallet,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from '@paypal/react-paypal-js';
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
        source: 'myprinterhero.shop',
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
      <div className="min-h-screen bg-[#fbf8f5] flex flex-col items-center justify-center px-6 font-['Poppins']">
        <div className="text-center max-w-md rounded-[30px] border border-dashed border-[#e7ddd4] bg-white px-8 py-14">
          <div className="w-16 h-16 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center mx-auto mb-6">
            <Package size={30} />
          </div>
          <h2 className="text-[28px] font-semibold text-[#241812] mb-3">Your Cart is Empty</h2>
          <p className="text-[#6b5d54] mb-8 text-[14px] leading-7">
            Add products to your cart before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex h-12 items-center px-7 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#fbf8f5] flex items-center justify-center py-16 px-6 font-['Poppins'] text-[#111111]">
        <SEO title="Order Confirmed | MyPrinterHero" />
        <div className="max-w-xl w-full text-center rounded-[32px] border border-[#e8dfd6] bg-white px-8 py-14 shadow-[0_16px_50px_rgba(0,0,0,0.05)]">
          <div className="w-20 h-20 rounded-full bg-[#7a4320] text-white flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={38} />
          </div>

          <h1 className="text-[32px] md:text-[40px] font-semibold text-[#241812] mb-4">
            Order Confirmed
          </h1>

          <p className="text-[#6b5d54] leading-8 text-[15px] max-w-md mx-auto">
            Thank you for your purchase. Your order ID is{' '}
            <span className="font-semibold text-[#241812]">#{orderId}</span>. A confirmation
            has been sent to{' '}
            <span className="font-semibold text-[#241812]">{formData.email}</span>.
          </p>

          <div className="pt-6 mt-8 flex flex-col gap-4">
            <Link
              to="/orders"
              className="w-full h-[48px] rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center hover:bg-[#643619] transition-all"
            >
              Track My Order
            </Link>

            <Link
              to="/"
              className="w-full h-[48px] rounded-xl border border-[#7a4320] text-[#7a4320] text-[13px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center hover:bg-[#7a4320] hover:text-white transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 bg-[#fbf8f5] font-['Poppins'] text-[#111111]">
      <SEO title="Secure Checkout | MyPrinterHero" />

      {/* Header */}
      <section className="bg-[#f4eeea] border-b border-[#e8dfd6]">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10 py-14 md:py-18 lg:py-20 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className={cn('h-1.5 w-14 rounded-full', step >= 1 ? 'bg-[#7a4320]' : 'bg-[#ded2c8]')} />
            <div className={cn('h-1.5 w-14 rounded-full', step >= 2 ? 'bg-[#7a4320]' : 'bg-[#ded2c8]')} />
          </div>

          <h1 className="text-[34px] md:text-[48px] lg:text-[58px] font-semibold text-[#241812] leading-[1.02] mb-4">
            Secure Checkout
          </h1>

          <p className="max-w-[760px] mx-auto text-[#6b5d54] text-[14px] md:text-[16px] leading-8">
            Complete your order in two simple steps with secure payment and reliable delivery.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-14 lg:py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8 lg:px-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8 lg:gap-10">
            {/* Left */}
            <div className="rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-[#eee4db] pb-4">
                        <Mail size={18} className="text-[#7a4320]" />
                        <h3 className="text-[22px] md:text-[26px] font-semibold text-[#241812]">
                          Contact Information
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-[#eee4db] pb-4">
                        <MapPin size={18} className="text-[#7a4320]" />
                        <h3 className="text-[22px] md:text-[26px] font-semibold text-[#241812]">
                          Shipping Address
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                            First Name
                          </label>
                          <input
                            required
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                            Last Name
                          </label>
                          <input
                            required
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                          Street Address
                        </label>
                        <input
                          required
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                            City / Region
                          </label>
                          <input
                            required
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                            Zip / Postal Code
                          </label>
                          <input
                            required
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] px-5 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-14 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3"
                    >
                      Continue to Payment <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-[#eee4db] pb-4">
                        <CreditCard size={18} className="text-[#7a4320]" />
                        <h3 className="text-[22px] md:text-[26px] font-semibold text-[#241812]">
                          Payment Method
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {[
                          {
                            id: 'paypal',
                            label: 'PayPal / Credit Card',
                            icon: CreditCard,
                            desc: 'Secure payment via PayPal or cards.',
                          },
                          {
                            id: 'cod',
                            label: 'Cash on Delivery',
                            icon: Wallet,
                            desc: 'Pay when your order arrives.',
                          },
                        ].map((method) => (
                          <div
                            key={method.id}
                            onClick={() =>
                              setFormData({ ...formData, paymentMethod: method.id })
                            }
                            className={cn(
                              'p-5 rounded-[22px] border transition-all cursor-pointer flex items-center justify-between',
                              formData.paymentMethod === method.id
                                ? 'border-[#7a4320] bg-[#f8f2ec]'
                                : 'border-[#e7ddd4] bg-white hover:border-[#d8c8bb]'
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                                  formData.paymentMethod === method.id
                                    ? 'border-[#7a4320]'
                                    : 'border-[#cdbfb2]'
                                )}
                              >
                                {formData.paymentMethod === method.id && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#7a4320]" />
                                )}
                              </div>

                              <div>
                                <p className="text-[14px] font-semibold text-[#241812]">
                                  {method.label}
                                </p>
                                <p className="text-[12px] text-[#8b7768] mt-1">
                                  {method.desc}
                                </p>
                              </div>
                            </div>

                            <method.icon
                              size={20}
                              className={cn(
                                formData.paymentMethod === method.id
                                  ? 'text-[#7a4320]'
                                  : 'text-[#c7b8ab]'
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-5 pt-2">
                      {formData.paymentMethod === 'paypal' ? (
                        <div className="relative z-10 rounded-[22px] border border-[#e7ddd4] bg-white p-4">
                          <PayPalButtons
                            style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
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
                        </div>
                      ) : (
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-14 rounded-xl bg-[#7a4320] text-white text-[13px] font-semibold uppercase tracking-[0.08em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : 'Complete Order'}
                          {!loading && <CheckCircle2 size={16} />}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8b7768] hover:text-[#241812] transition-colors"
                      >
                        <ChevronLeft size={15} className="inline mr-2" />
                        Back to Shipping
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right */}
            <div className="xl:sticky xl:top-28 h-fit rounded-[30px] border border-[#e8dfd6] bg-white p-6 md:p-7">
              <h3 className="text-[24px] md:text-[28px] font-semibold text-[#241812] mb-6">
                Order Summary
              </h3>

              <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#fcfaf7] border border-[#eadfd6] p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={getImagePath(item.images)}
                        className="max-h-full max-w-full object-contain"
                        alt=""
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-medium text-[#241812] line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-[12px] text-[#8b7768] mt-1">Qty: {item.quantity}</p>
                    </div>

                    <p className="text-[14px] font-semibold text-[#241812]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-[#eee4db]">
                <div className="flex justify-between text-[14px] text-[#6b5d54]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#241812]">
                    ${(cartTotal || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[14px] text-[#6b5d54]">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold">Free</span>
                </div>

                <div className="flex justify-between items-end pt-2 border-t border-[#eee4db]">
                  <span className="text-[13px] uppercase tracking-[0.14em] text-[#8c7769]">
                    Total
                  </span>
                  <span className="text-[30px] font-semibold text-[#241812] leading-none">
                    ${(cartTotal || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[#8b7768]">
                <Lock size={14} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Secured Encryption
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}