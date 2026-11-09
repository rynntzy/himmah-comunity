import React, { useState } from 'react';
import Logo from './Logo';
import { Lock, User, Eye, EyeOff, LogIn, ArrowLeft, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { loginAdminApi } from '../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanUsername = username.trim();
    const cleanPassword = password;

    try {
      // 1. Verifikasi kredensial ke backend API untuk mendapatkan token JWT asli
      const res = await loginAdminApi(cleanUsername, cleanPassword);
      if (res && res.success && res.data?.token) {
        localStorage.setItem('himmah_admin_session', JSON.stringify(res.data?.admin || { username: cleanUsername }));
        setLoading(false);
        onLoginSuccess(res.data.token, res.data.admin);
        return;
      }

      // 2. Fallback darurat offline HANYA jika server backend tidak terjangkau (offline)
      if (res && res.message === 'Server tidak terjangkau.' && cleanUsername === 'Zainultampan' && cleanPassword === 'Rajinmenabung123') {
        const fallbackToken = 'offline-token-' + Date.now();
        localStorage.setItem('himmah_admin_token', fallbackToken);
        localStorage.setItem('himmah_admin_session', JSON.stringify({
          username: 'Zainultampan',
          role: 'Superadmin (Mode Offline)'
        }));
        setLoading(false);
        onLoginSuccess(fallbackToken, { username: 'Zainultampan' });
        return;
      }

      // Jika gagal
      setLoading(false);
      setErrorMsg(res?.message || 'Username atau password yang Anda masukkan salah!');
    } catch (err) {
      setLoading(false);
      setErrorMsg('Terjadi kesalahan saat memproses login. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#06482C]/90 via-[#0B6B43] to-[#04331E] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Glow & Shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-scaleUp">
        
        {/* Card Container */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-2xl border border-emerald-100">
          
          {/* Header Brand & Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex justify-center mb-3">
              <Logo size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Login Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Masukkan kredensial khusus admin untuk mengelola data pendaftar dan website.
            </p>
          </div>

          {/* Alert Error */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Masukkan username admin"
                  className="w-full pl-10 pr-3.5 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary transition"
                />
              </div>
            </div>

            {/* Field Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Masukkan password admin"
                  className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-brand-primary hover:bg-brand-dark active:scale-[0.99] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Masuk ke Dashboard</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Footer Back Link */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-primary transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Pendaftaran Kader</span>
            </button>
          </div>

        </div>

        {/* Security Note */}
        <p className="text-center text-[11px] text-emerald-100/70 mt-4">
          Panel Administrasi Terbatas • Himmah NWDI Kom. Teknik
        </p>

      </div>
    </div>
  );
}
