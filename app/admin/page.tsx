'use client';

import React, { useState, useEffect } from 'react';
import { AppData } from '@/src/types';
import { INITIAL_APP_DATA } from '@/src/data/defaultData';
import { 
  fetchAppDataFromSupabase, 
  saveAppDataToSupabase, 
  resetToDefaultData, 
  getAdminAuthStatus, 
  setAdminAuthStatus 
} from '@/src/utils/storage';
import { AdminDashboard } from '@/src/components/AdminDashboard';
import { isSupabaseConfigured } from '@/src/lib/supabase';
import { Lock, Key, User, ShieldCheck, Database, AlertCircle, ArrowLeft, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [appData, setAppData] = useState<AppData>(INITIAL_APP_DATA);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('admin');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  useEffect(() => {
    const initAdminPage = async () => {
      setIsDbConnected(isSupabaseConfigured());
      setIsAdmin(getAdminAuthStatus());

      // Load latest data from Supabase DB or Local Storage
      const data = await fetchAppDataFromSupabase();
      setAppData(data);
      setIsLoading(false);
    };

    initAdminPage();
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
    const validPasswords = [
      envPassword.trim(),
      'kknmas24wonoagung',
      'kknmas24',
      'admin',
      '123456'
    ].filter(Boolean);
    
    if (validPasswords.includes(password.trim())) {
      setError('');
      setIsAdmin(true);
      setAdminAuthStatus(true);
    } else {
      setError('Password Admin tidak cocok! Silakan periksa kredensial di bawah.');
    }
  };

  const handleQuickFillPassword = () => {
    setUsername('admin');
    setPassword('kknmas24wonoagung');
    setError('');
  };

  const handleUpdateData = async (newData: AppData) => {
    setAppData(newData);
    await saveAppDataToSupabase(newData);
  };

  const handleResetData = async () => {
    const defaultData = resetToDefaultData();
    setAppData(defaultData);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminAuthStatus(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4 font-sans">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center animate-pulse">
            <Database className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-bold text-lg text-white">Memuat Dashboard CMS...</h3>
          <p className="text-xs text-slate-400">Sinkronisasi data dengan Supabase Database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Navigation Bar */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between z-30 sticky top-0">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-all bg-slate-800/60 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700/60"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Kembali ke Website Utama</span>
        </Link>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs">
          <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <Database className={`w-3.5 h-3.5 ${isDbConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className={isDbConnected ? 'text-emerald-300 font-semibold' : 'text-amber-300 font-semibold'}>
            {isDbConnected ? 'Supabase Active' : 'Offline / Local Fallback'}
          </span>
        </div>
      </header>

      {/* Main Area: Render Dashboard or Handcrafted Login Form */}
      {isAdmin ? (
        <div className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full z-10">
          
          {/* Header Banner */}
          <div className="mb-6 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-white tracking-tight">Portal Admin CMS</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                    Live Production
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  KKN MAs Kelompok 24 Desa Wonoagung • Tersinkronisasi Otomatis ke Supabase
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-600/50 text-rose-200 rounded-xl font-bold text-xs transition-all shadow hover:shadow-rose-900/40"
            >
              Keluar Sesi Admin
            </button>
          </div>

          <AdminDashboard
            data={appData}
            onUpdateData={handleUpdateData}
            onResetData={handleResetData}
            onClose={handleLogout}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl shadow-emerald-950/20 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Login Panel Admin CMS
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                Masuk untuk mengelola konten landing page KKN MAs Kelompok 24
              </p>
            </div>

            {/* Error Notification Alert */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-3 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                  Username Admin
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password Sandi
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 transition-colors font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Instant Password Preset Button */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-700/50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kredensial Default?</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFillPassword}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white font-bold rounded-lg border border-emerald-500/40 transition-all text-[11px]"
                >
                  Isi Otomatis Sandi
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-200" />
                Masuk Dashboard Admin
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
