import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../../components/common/Button';
import ForgotPasswordModal from './ForgotPasswordModal';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Server,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const LoginPage = ({ onSwitchToRegister }) => {
  const { login, isLoading } = useAuth();
  const { addToast } = useNotification();

  const [email, setEmail] = useState('alexandra.vance@nexora.io');
  const [password, setPassword] = useState('Nexora#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both your corporate email and password.');
      return;
    }

    try {
      const res = await login(email, password);
      addToast({
        title: 'Authentication Successful',
        message: res.notice || 'Welcome back to NEXORA Intelligence Platform',
        type: 'success'
      });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('alexandra.vance@nexora.io');
    setPassword('Nexora#2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-brand-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple-600 to-brand-blue-500 p-0.5 shadow-glow-purple mb-3">
            <div className="w-full h-full bg-navy-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-purple-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            NEXORA <span className="text-brand-purple-400 font-medium">AI</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Intelligent Business Analytics & Executive Telemetry
          </p>
        </div>

        {/* Card Box */}
        <div className="glass-card bg-navy-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-white tracking-tight">Sign In to Workspace</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Access real-time forecasting, AI assistant, and telemetry
            </p>
          </div>

          {/* Quick Demo Helper Banner */}
          <div className="mb-5 p-3 rounded-xl bg-brand-purple-950/40 border border-brand-purple-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-brand-purple-300">
              <Server className="w-4 h-4 shrink-0 text-brand-purple-400" />
              <span>Demo Access Ready</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-brand-purple-300 hover:text-white underline"
            >
              Autofill Credentials
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="alexandra.vance@nexora.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-navy-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-[11px] text-brand-purple-400 hover:text-brand-purple-300 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-navy-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple-500 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-navy-950 border-slate-700 text-brand-purple-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" /> 256-bit AES
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              Sign In to Platform
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an enterprise workspace?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-brand-purple-400 hover:text-brand-purple-300 font-semibold transition-colors"
            >
              Request Access
            </button>
          </div>
        </div>

        {/* Security Disclaimers */}
        <div className="mt-6 text-center text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <span>Spring Security 6.x JWT</span>
          <span>•</span>
          <span>TLS 1.3 Certified</span>
          <span>•</span>
          <span>SOC2 Type II</span>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
