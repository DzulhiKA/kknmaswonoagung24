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

  // Synchronize data from Supabase DB or Local Storage, then subscribe to realtime updates
  useEffect(() => {
    setIsMounted(true);

    const loadData = async () => {
      const dbData = await fetchAppDataFromSupabase();
      setAppData(dbData);
    };
    loadData();

    // ============================================================
    // Supabase Realtime Subscription
    // Dengarkan perubahan pada tabel site_data.
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
            event: 'UPDATE',       // Dengarkan event UPDATE pada tabel
            schema: 'public',
            table: 'site_data',
            filter: 'id=eq.kkn_wonoagung_data',  // Hanya untuk row data kita
          },
          (payload) => {
            // Payload berisi data terbaru dari DB
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

    // Cleanup: hapus subscription saat komponen unmount
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
