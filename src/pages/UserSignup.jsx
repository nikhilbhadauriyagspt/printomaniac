import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';
import { cn } from '../lib/utils';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed. Check parameters.');
      }
    } catch (err) {
      setError('Network synchronization error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] font-snpro px-6 py-32 relative overflow-hidden text-slate-900">
      <SEO title="Create Account | Printer Brother" />
      
      {/* Decorative Background Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0047ab 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-md w-full relative z-10">
        
        {/* --- HEADER BENTO --- */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-10 h-1 bg-[#0047ab]" />
             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0047ab]">Protocol Entry</span>
             <div className="w-10 h-1 bg-[#0047ab]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-black leading-[0.9] uppercase italic tracking-tighter mb-4">
            Create <br/><span className="text-[#0047ab]">Account.</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest italic">Please enter your details to create your account.</p>
        </div>

        {/* --- FORM BENTO PANEL --- */}
        <div className="bg-white border border-gray-100 p-10 md:p-12 relative overflow-hidden group shadow-2xl shadow-black/5">
          <div className="absolute top-0 left-0 w-full h-1 bg-black group-hover:bg-[#0047ab] transition-colors" />
          
          <form onSubmit={handleSignup} className="space-y-6 relative z-10">
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 text-center italic"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name <span className="text-[#0047ab]">*</span></label>
                <div className="relative group/field">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#0047ab] transition-colors" size={18} />
                  <input 
                    required type="text" placeholder="John Doe" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address <span className="text-[#0047ab]">*</span></label>
                <div className="relative group/field">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#0047ab] transition-colors" size={18} />
                  <input 
                    required type="email" placeholder="john@example.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number <span className="text-[#0047ab]">*</span></label>
                <div className="relative group/field">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#0047ab] transition-colors" size={18} />
                  <input 
                    required type="tel" placeholder="+1 (000) 000-0000" value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Password <span className="text-[#0047ab]">*</span></label>
                <div className="relative group/field">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/field:text-[#0047ab] transition-colors" size={18} />
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-14 pr-14 bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0047ab] outline-none text-sm font-bold transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#0047ab] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-16 bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#0047ab] transition-all flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95 shadow-xl group mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Sign Up Now <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Already have an account?
              <Link to="/login" className="text-[#0047ab] font-black hover:text-black ml-2 uppercase text-[10px] tracking-widest italic transition-colors">Log In Here</Link>
            </p>
          </div>
          

        </div>
      </div>
    </div>
  );
}
