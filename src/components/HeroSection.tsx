import React from 'react';
import { HomeConfig } from '../types';
import { MapPin, Calendar, Sparkles, Target, ArrowRight, ShieldCheck, CheckCircle2, Award, Users2 } from 'lucide-react';
import { KknLogo } from './KknLogo';

interface HeroSectionProps {
  homeData: HomeConfig;
  onExploreProker: () => void;
  onExploreDokumentasi: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  homeData,
  onExploreProker,
  onExploreDokumentasi,
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-50">
      
      {/* Top Hero Banner with Village Overlay Background */}
      <div className="relative min-h-[520px] lg:min-h-[600px] bg-emerald-950 text-white flex items-center">
        {/* Background image with gradient blend */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay overflow-hidden">
          <img
            src={homeData.heroImageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920'}
            alt="Desa KKN MAs"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Decorative lighting gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent z-1" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            
            {/* Top Tag Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 backdrop-blur-sm shadow-md">
                <KknLogo size="sm" className="w-5 h-5" />
                KKN MAs 2026 • Kelompok 24
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {homeData.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 backdrop-blur-sm">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {homeData.period || '1 Agustus - 12 September 2026'}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {homeData.heroTitle || 'KKN MAs Kelompok 24'}
            </h1>

            {/* Hero Subtitle / Tagline */}
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 leading-relaxed font-normal">
              {homeData.heroTagline || 'Pemberdayaan Masyarakat Berkelanjutan Melalui Inovasi, Edukasi, dan Kolaborasi Desa'}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreProker}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
              >
                Jelajahi Program Kerja
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onExploreDokumentasi}
                className="px-6 py-3.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-600/50 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all hover:text-white"
              >
                Lihat Galeri & After Movie
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Statistics Cards Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {homeData.stats?.totalProker ?? 8}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                Program Kerja
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 pt-4 sm:pt-2">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {homeData.stats?.totalAnggota ?? 14}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                Mahasiswa Lintas PT
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 pt-4 lg:pt-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {homeData.stats?.totalDusun ?? 5}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                Dusun Wilayah Kerja
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 pt-4 lg:pt-2">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {homeData.stats?.targetMasyarakat || '1.200+ Warga'}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                Penerima Manfaat
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Intro & Overview Section: What is KKN MAs & Visi Misi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        
        {/* Explanation Block */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Kuliah Kerja Nyata Muhammadiyah &apos;Aisyiyah
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              {homeData.introTitle || 'Mengenal KKN MAs Kelompok 24'}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {homeData.introText || 'Kuliah Kerja Nyata Muhammadiyah \'Aisyiyah (KKN MAs) merupakan wujud nyata pengabdian mahasiswa dari Perguruan Tinggi Muhammadiyah dan \'Aisyiyah se-Indonesia. Kelompok 24 mengabdi di Desa Sumbersekar dengan mengusung misi pemberdayaan ekonomi masyarakat, kesehatan ibu-anak, serta digitalisasi UMKM.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Kolaborasi Lintas Perguruan Tinggi
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Pemberdayaan Berkelanjutan
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Penguatan Ekonomi Desa
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
                alt="Pengabdian KKN MAs"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs font-medium italic">
                  &ldquo;Mengabdi dengan hati, membangun desa yang berkemajuan.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Visi Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-8 rounded-3xl shadow-md border border-emerald-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Visi Kelompok 24
            </h3>
            <p className="text-emerald-100 text-base leading-relaxed">
              {homeData.vision || 'Mewujudkan Desa Sumbersekar yang mandiri, sehat, berkemajuan, dan berdaya saing melalui sinergi mahasiswa dan masyarakat.'}
            </p>
          </div>

          {/* Misi Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Misi Pengabdian
            </h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              {homeData.mission && homeData.mission.length > 0 ? (
                homeData.mission.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic">Misi akan diisi menyusul melalui Panel Admin.</li>
              )}
            </ul>
          </div>

        </div>

      </div>

    </section>
  );
};
