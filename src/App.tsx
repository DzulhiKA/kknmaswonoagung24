'use client';

import React, { useState, useEffect } from 'react';
import { AppData } from './types';
import { INITIAL_APP_DATA } from './data/defaultData';
import { fetchAppDataFromSupabase } from './utils/storage';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StrukturalSection } from './components/StrukturalSection';
import { ProkerSection } from './components/ProkerSection';
import { SosmedSection } from './components/SosmedSection';
import { DokumentasiSection } from './components/DokumentasiSection';
import { Footer } from './components/Footer';

export default function App() {
  const [appData, setAppData] = useState<AppData>(INITIAL_APP_DATA);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // Mencegah konten default (INITIAL_APP_DATA) terlihat sebelum data Supabase tiba
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);

  // Synchronize data from Supabase DB or Local Storage, then subscribe to realtime updates
  useEffect(() => {
    setIsMounted(true);

    const loadData = async () => {
      const dbData = await fetchAppDataFromSupabase();
      setAppData(dbData);
      setIsDataLoading(false); // Data sudah tersedia, sembunyikan loading
    };
    loadData();

    // ============================================================
    // Supabase Realtime Subscription
    // Setiap kali admin menyimpan data, halaman ini otomatis update
    // tanpa perlu refresh browser untuk semua pengunjung.
    // ============================================================
    let realtimeChannel: RealtimeChannel | null = null;

    if (isSupabaseConfigured() && supabase) {
      realtimeChannel = supabase
        .channel('site_data_realtime')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'site_data',
            filter: 'id=eq.kkn_wonoagung_data',
          },
          (payload) => {
            if (payload.new && (payload.new as { data: AppData }).data) {
              const freshData = (payload.new as { data: AppData }).data;
              setAppData(freshData);
              console.log('[Realtime] Data halaman diperbarui dari admin!');
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('[Realtime] Berhasil subscribe ke perubahan site_data.');
          }
        });
    }

    return () => {
      if (realtimeChannel && supabase) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, []);

  // Scroll section listener to highlight active navigation link
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const sections = ['home', 'struktural', 'proker', 'sosmed', 'dokumentasi'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ─── Loading screen ──────────────────────────────────────────────────────────
  // Cegah konten default/placeholder terlihat saat fetch pertama dari Supabase
  // ─────────────────────────────────────────────────────────────────────────────
  if (isDataLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m8.66-10H20M4 12H3m14.66-6.34-.7.7M7.04 17.3l-.7.7m12.02 0-.7-.7M7.04 6.66l-.7-.7"
              />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-30" />
        </div>
        <div className="space-y-2 text-center">
          <div className="h-3 w-48 bg-slate-200 rounded-full animate-pulse mx-auto" />
          <div className="h-2.5 w-32 bg-slate-100 rounded-full animate-pulse mx-auto" />
        </div>
        <p className="text-xs text-slate-400 font-medium">Memuat konten website...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white flex flex-col">
      
      {/* Primary Sticky Header Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* 1. Beranda / Home Section */}
        <HeroSection
          homeData={appData.home}
          onExploreProker={() => scrollToSection('proker')}
          onExploreDokumentasi={() => scrollToSection('dokumentasi')}
        />

        {/* 2. Struktural Section */}
        <StrukturalSection members={appData.members} />

        {/* 3. Program Kerja Section */}
        <ProkerSection prokerList={appData.prokerList} />

        {/* 4. Sosial Media Section */}
        <SosmedSection socials={appData.socials} />

        {/* 5. Dokumentasi Kegiatan Section */}
        <DokumentasiSection
          photos={appData.photos}
          afterMovie={appData.afterMovie}
        />

      </main>

      {/* Footer */}
      <Footer
        homeData={appData.home}
        socials={appData.socials}
      />

    </div>
  );
}
