import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Lock from 'lucide-react/dist/esm/icons/lock';
import User from 'lucide-react/dist/esm/icons/user';
import Eye from 'lucide-react/dist/esm/icons/eye';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import Phone from 'lucide-react/dist/esm/icons/phone';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-50 font-['Poppins'] text-slate-900 flex items-center justify-center py-20 px-4">
      <SEO title="Create Account | Printo Maniac" />

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-blue-900/5 border border-gray-100">
        {/* Left Side: Benefits */}
        <div className="relative bg-slate-900 px-8 sm:px-12 py-16 flex flex-col justify-between overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-10 -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-12">
              <img src="/logo/logo.png" alt="Logo" className="h-12 brightness-0 invert" />
            </Link>

            <h1 className="text-[36px] md:text-[48px]  text-white leading-tight mb-6">
              Start Your <span className="text-blue-400">Journey.</span>
            </h1>
            <p className="text-white/60 text-[16px] leading-relaxed max-w-[340px] mb-12">
              Join Printo Maniac today for a faster checkout experience and exclusive member deals.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <ShieldCheck size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px] ">Fast & Secure Signup</span>
              </div>
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <ShoppingBag size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px] ">Exclusive Printer Deals</span>
              </div>
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <CheckCircle2 size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px] ">Easy Order History</span>
              </div>
            </div>
          </div>

         
        </div>

        {/* Right Side: Form */}
        <div className="px-8 sm:px-12 py-16 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-[32px]  text-slate-900 mb-2">Create Account</h2>
              <p className="text-gray-500 font-medium">Please fill in your details to join us.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-[13px] font-bold flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px]  uppercase tracking-widest text-gray-400 pl-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-13 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-4 text-[14px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px]  uppercase tracking-widest text-gray-400 pl-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-13 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-4 text-[14px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px]  uppercase tracking-widest text-gray-400 pl-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-13 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-4 text-[14px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px]  uppercase tracking-widest text-gray-400 pl-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-13 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-12 text-[14px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-900 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px]  uppercase tracking-widest text-gray-400 pl-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="w-full h-13 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-4 text-[14px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-blue-800 text-white font-medium text-[14px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70 active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Create Account <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-50 text-center">
              <p className="text-[14px] font-bold text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-800 hover:underline ml-2"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
