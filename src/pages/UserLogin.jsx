import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

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
      user_email: email.trim(),
      guest_email: email.trim(),
      username: email.trim(),
      password: password
    };

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Sign In |Printer Club" />

      {/* --- PAGE HEADER --- */}
      <section className="pt-14 pb-12 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tight">
              Sign <span className="text-blue-600">In</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-6 max-w-2xl leading-relaxed">
              Access your professional account to manage orders and explore elite printing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* --- LOGIN FORM SECTION --- */}
      <section>
        <div className="w-full px-4 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[500px] bg-white p-8 md:p-16 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50"
          >
            <form onSubmit={handleLogin} className="space-y-8">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-900 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="email"
                    placeholder="example@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-black text-slate-900">Password</label>
                  <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-14 pr-14 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mt-10"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : (
                  <>
                    Sign In Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 font-bold">
                New toPrinter Club?{' '}
                <Link to="/signup" className="text-blue-600 font-black hover:text-blue-700 transition-colors">Create Account</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
