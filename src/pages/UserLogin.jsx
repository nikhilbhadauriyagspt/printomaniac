import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, UserCircle } from 'lucide-react';
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
      user_email: email.trim(),
      guest_email: email.trim(),
      username: email.trim(),
      password: password
    };

    console.log("LOGIN PAYLOAD:", payload);

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
      console.log("LOGIN RESPONSE:", data);

      if (data.status === 'success') {
        alert("Login successful!");
        const userData = data.data || data.user || data;
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
      } else {
        setError(data.message || 'User not found. Try signing up with a new email.');
      }
    } catch (err) {
      console.error("Login connection error:", err);
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-jakarta px-4 py-12 ">
      <SEO title="Sign in | My Printer Store" />

      <div className="w-full max-w-[450px] bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
        
       
        <div className="p-8 md:p-12">
            <div className="text-center mb-10">
               
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
                <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <AnimatePresence>
                  {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-3"
                      >
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                          {error}
                      </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-900 ml-1">Email address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-600 transition-colors" size={18} />
                        <input
                            required
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[13px] font-bold text-slate-900">Password</label>
                        <Link to="#" className="text-[11px] font-bold text-cyan-600 hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-600 transition-colors" size={18} />
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 transition-all text-sm font-medium"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all disabled:opacity-70 shadow-xl shadow-slate-900/10 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                            Sign in
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
                <p className="text-sm text-gray-500 font-medium">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-cyan-600 font-bold hover:underline">Create account</Link>
                </p>
               
               
            </div>
        </div>
      </div>
    </div>
  );
}
