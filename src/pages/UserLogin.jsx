import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Lock from 'lucide-react/dist/esm/icons/lock';
import Eye from 'lucide-react/dist/esm/icons/eye';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Users from 'lucide-react/dist/esm/icons/users';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      type: 'user',
      identifier: email.trim(),
      email: email.trim(),
      password: password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const userData = data.data || data.user || data;
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
      } else {
        setError(data.message || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Could not connect to the authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-50 font-['Poppins'] text-slate-900 flex items-center justify-center py-20 px-4">
      <SEO title="Sign In | Printo Maniac" />

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-blue-900/5 border border-gray-100">
        {/* Left Side: Brand & Benefits */}
        <div className="relative bg-slate-900 px-8 sm:px-12 py-16 flex flex-col justify-between overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-10 -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-block mb-12">
              <img src="/logo/logo.png" alt="Logo" className="h-12 brightness-0 invert" />
            </Link>

            <h1 className="text-[36px] md:text-[48px]  text-white leading-tight mb-6">
              Welcome <span className="text-blue-400">Back.</span>
            </h1>
            <p className="text-white/60 text-[16px] leading-relaxed max-w-[340px] mb-12">
              Sign in to your account to manage orders and explore our latest printer collection.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <ShieldCheck size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px] ">Secure Authentication</span>
              </div>
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <CheckCircle2 size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px]">Track Your Orders</span>
              </div>
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-blue-800 transition-all">
                  <Users size={20} className="text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-[14px] ">Manage Profile</span>
              </div>
            </div>
          </div>

         
        </div>

        {/* Right Side: Form */}
        <div className="px-8 sm:px-12 py-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10">
              <h2 className="text-[32px] text-slate-900 mb-2">Sign In</h2>
              <p className="text-gray-500 font-medium">Please enter your credentials below.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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

              <div className="space-y-2">
                <label className="text-[12px] uppercase tracking-widest text-gray-400 pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-4 text-[15px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px]  uppercase tracking-widest text-gray-400">
                    Password
                  </label>
                 
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl bg-gray-50 border border-gray-100 pl-12 pr-12 text-[15px] font-medium outline-none focus:border-blue-800 focus:bg-white transition-all"
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

              <button
                disabled={loading}
                className="w-full h-16 rounded-2xl bg-blue-800 text-white  text-[14px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-70 active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-50 text-center">
              <p className="text-[14px] font-bold text-gray-400">
                New to Printo Maniac?
                <Link
                  to="/signup"
                  className="text-blue-800 hover:underline ml-2"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
