import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';
 
export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
          password: formData.password
        })
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
    <div className="bg-white min-h-screen font-jakarta text-slate-900 overflow-x-hidden">
      <SEO title="Create Your Account |Printer Club" />

      {/* --- PAGE HEADER --- */}
      <section className="pt-14 pb-12 bg-white border-b border-slate-50">
        <div className="w-full px-4 md:px-12 lg:px-20">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tight">
              Create <span className="text-blue-600">Account</span>
            </h1>
            <div className="h-1.5 w-24 bg-blue-600 mt-5 rounded-full" />
            <p className="text-slate-500 text-lg font-bold mt-6 max-w-2xl leading-relaxed">
              Join our professional community and experience elite printing benefits and dedicated support.
            </p>
          </div>
        </div>
      </section>

      {/* --- SIGNUP FORM SECTION --- */}
      <section >
        <div className="w-full px-4 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[550px] bg-white p-8 md:p-16 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/50"
          >
            <form onSubmit={handleSignup} className="space-y-8">
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
                <label className="text-sm font-black text-slate-900 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-900 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    required
                    type="email"
                    placeholder="example@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none text-base font-bold transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1 py-2">
                <input
                  type="checkbox"
                  id="showPass"
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer transition-all"
                />
                <label htmlFor="showPass" className="text-sm font-bold text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">Show Passwords</label>
              </div>

              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 mt-6"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 font-bold">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-black hover:text-blue-700 transition-colors">Sign In</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
