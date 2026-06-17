'use client';

import { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, LogIn, ArrowRight, Activity, User } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setStatus({ loading: false, error: '', success: false });
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setStatus({ ...status, error: 'Please fill in all required fields' });
      return;
    }

    setStatus({ loading: true, error: '', success: false });

    try {
      const endpoint = isLogin 
        ? 'http://localhost:5500/api/v1/auth/sign-in'
        : 'http://localhost:5500/api/v1/auth/sign-up';

      // If logging in, we only need email and password
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(endpoint, payload);
      
      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      setStatus({ loading: false, error: '', success: true });
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Authentication failed';
      setStatus({ loading: false, error: errorMessage, success: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none transition-all duration-1000" style={{ transform: isLogin ? 'translate(0, 0)' : 'translate(20%, 20%)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none transition-all duration-1000" style={{ transform: isLogin ? 'translate(0, 0)' : 'translate(-20%, -20%)' }} />
      
      <div className="relative z-10 w-full max-w-md p-4 sm:p-8">
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative group">
          
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="text-center mb-10 transition-all duration-500 transform" key={isLogin ? 'login' : 'signup'}>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Activity className="text-cyan-400" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-zinc-400 text-sm mt-2 font-medium tracking-wide">
              {isLogin ? 'Enter your credentials to continue' : 'Join us to access your dashboard'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`space-y-6 overflow-hidden transition-all duration-500 ease-in-out ${isLogin ? 'max-h-0 opacity-0 mb-0' : 'max-h-[100px] opacity-100'}`}>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within/input:text-cyan-400 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 placeholder:text-zinc-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within/input:text-cyan-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 placeholder:text-zinc-600"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Password</label>
                {isLogin && <a href="#" className="text-xs font-medium text-cyan-400/80 hover:text-cyan-400 transition-colors">Forgot?</a>}
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within/input:text-cyan-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 placeholder:text-zinc-600"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="h-4 flex items-center justify-center">
              {status.error && <p className="text-red-400 text-xs font-semibold tracking-wider animate-in fade-in slide-in-from-bottom-2">{status.error}</p>}
              {status.success && <p className="text-green-400 text-xs font-semibold tracking-wider animate-in fade-in slide-in-from-bottom-2">{isLogin ? 'Authentication successful!' : 'Account created successfully!'}</p>}
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className={`w-full relative overflow-hidden rounded-xl bg-white text-black font-semibold text-sm py-4 flex items-center justify-center gap-2 group hover:bg-zinc-200 transition-all duration-300 cursor-pointer ${status.loading ? 'opacity-80' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
              {status.loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-zinc-500 text-xs">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleMode} 
                className="text-white hover:text-cyan-400 font-medium transition-colors cursor-pointer bg-transparent border-none p-0 inline"
              >
                {isLogin ? 'Create one now' : 'Sign in here'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
