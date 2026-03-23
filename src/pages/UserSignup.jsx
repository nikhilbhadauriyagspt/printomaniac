import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Loader2, UserPlus } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta text-slate-900 overflow-x-hidden pt-32 pb-20">
      <SEO title="Join Us | Axel Printing" />
      
      <div className="max-w-[500px] w-full mx-auto relative px-6 z-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Create <span className="text-blue-600">Account</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">Join our community for a better experience.</p>
        </div>

        <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSignup} className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input 
                      required type="text" placeholder="Name" value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input 
                      required type="tel" placeholder="Mobile" value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                  <input 
                    required type="email" placeholder="example@email.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input 
                      required type="password" placeholder="••••••••" value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input 
                      required type="password" placeholder="••••••••" value={formData.password_confirmation}
                      onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                      className="w-full h-12 pl-12 bg-white border border-slate-200 rounded-xl focus:border-blue-600 outline-none text-sm font-medium transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 text-white h-12 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
                {!loading && <UserPlus size={16} />}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-[11px] font-medium text-slate-500">
              Already a member?
              <Link to="/login" className="text-blue-600 font-bold ml-2 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
