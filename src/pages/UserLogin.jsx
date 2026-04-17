import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
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
    <div className="min-h-screen  bg-[#fbf8f5] font-['Poppins'] text-[#111111] flex items-center justify-center pt-40">
      <SEO title="Sign In | MyPrinterHero" />

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-[#e8dfd6] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.05)]">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="relative bg-[#f4eeea] px-6 sm:px-10 md:px-12 lg:px-14 py-12 md:py-14 flex flex-col justify-center"
        >
          <div className="max-w-[460px]">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo/logo.png" alt="MyPrinterHero" className="h-10 md:h-12 object-contain" />
            </Link>

            <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-4">
              Member Access
            </span>

            <h1 className="text-[34px] md:text-[46px] lg:text-[52px] font-semibold text-[#241812] leading-[1.02] mb-5">
              Welcome
              <br />
              Back
            </h1>

            <p className="text-[#6b5d54] text-[15px] md:text-[16px] leading-8 mb-8">
              Sign in to manage your orders, track shipments, and access your account details
              with ease.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-[20px] border border-[#e8ddd4] bg-white/70 p-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#241812] mb-1">
                    Secure Sign In
                  </h3>
                  <p className="text-[14px] leading-6 text-[#6b5d54]">
                    Your account access is protected through a secure login process.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[20px] border border-[#e8ddd4] bg-white/70 p-4">
                <div className="w-10 h-10 rounded-full bg-[#f8f2ec] text-[#7a4320] flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#241812] mb-1">
                    Easy Account Access
                  </h3>
                  <p className="text-[14px] leading-6 text-[#6b5d54]">
                    Review your profile, past orders, and account preferences in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="px-6 sm:px-10 md:px-12 lg:px-14 py-12 md:py-14 flex items-center"
        >
          <div className="w-full max-w-[480px] mx-auto">
            <div className="mb-8 text-center lg:text-left">
              <span className="inline-block text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#8b7768] mb-3">
                Sign In
              </span>

              <h2 className="text-[28px] md:text-[36px] font-semibold text-[#241812] leading-tight mb-3">
                Access Your
                <br className="hidden sm:block" />
                Account
              </h2>

              <p className="text-[#6b5d54] text-[14px] md:text-[15px] leading-7">
                Enter your email and password to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-[14px] font-medium"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                    size={18}
                  />
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-4 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b7768]">
                    Password
                  </label>

                  <Link
                    to="/contact"
                    className="text-[11px] font-semibold text-[#7a4320] hover:underline uppercase tracking-[0.14em]"
                  >
                    Forgot?
                  </Link>
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3a49a] group-focus-within:text-[#7a4320] transition-colors"
                    size={18}
                  />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 rounded-xl bg-[#fcfaf7] border border-[#e7ddd4] pl-12 pr-12 text-sm font-medium focus:border-[#7a4320] focus:bg-white outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b3a49a] hover:text-[#241812] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full h-14 rounded-xl bg-[#7a4320] text-white font-semibold text-[13px] uppercase tracking-[0.12em] hover:bg-[#643619] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#eee4db] text-center lg:text-left">
              <p className="text-[14px] font-medium text-[#6b5d54]">
                New to MyPrinterHero?
                <Link
                  to="/signup"
                  className="text-[#7a4320] font-semibold hover:underline ml-2"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}