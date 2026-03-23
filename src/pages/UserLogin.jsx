import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, UserCircle } from 'lucide-react';
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
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="Sign In | Axel Printing" />
      
      <div className="max-w-[450px] w-full mx-auto relative px-6 z-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">Please enter your details to sign in to your account.</p>
        </div>

        <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <UserCircle size={18} />
                  </div>
                  <input 
                    required type="email" placeholder="example@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[10px] font-bold text-blue-600 hover:text-blue-700">Forgot?</Link>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-12 pr-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white h-12 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-[11px] font-medium text-slate-500">
              New to Axel Printing?
              <Link to="/signup" className="text-blue-600 font-bold ml-2 hover:underline">Join now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
