import React from 'react';
import { SocialLinks } from '../types';
import { Instagram, Youtube, Share2, ExternalLink, Mail, Phone, MessageSquare, Flame } from 'lucide-react';

interface SosmedSectionProps {
  socials: SocialLinks;
}

export const SosmedSection: React.FC<SosmedSectionProps> = ({ socials }) => {
  return (
    <section id="sosmed" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            Media Komunikasi Resmi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hubungkan Diri dengan KKN MAs 24
          </h2>
          <p className="text-slate-300 text-base">
            Ikuti perjalanan harian, siaran tunda kegiatan, dan rekaman momentum pengabdian kami di berbagai platform sosial media.
          </p>
        </div>

        {/* Social Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Instagram */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-850 p-8 rounded-3xl border border-slate-700/80 shadow-xl hover:border-pink-500/50 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <Instagram className="w-7 h-7 text-pink-400" />
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold">
                  Instagram
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                {socials.instagramHandle || '@kknmas.kelompok24'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Dokumentasi foto kegiatan harian, sorotan proker, infografis edukasi desa, serta cerita instastory real-time.
              </p>
            </div>

            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Kunjungi Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: TikTok */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-850 p-8 rounded-3xl border border-slate-700/80 shadow-xl hover:border-cyan-500/50 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-pink-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <div className="font-black text-lg text-cyan-400">TT</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                  TikTok
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                {socials.tiktokHandle || '@kknmas.kelompok24'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Konten video pendek seru, vlog dibalik layar posko, interaksi hangat dengan warga desa, dan tren kreatif KKN.
              </p>
            </div>

            <a
              href={socials.tiktok}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Kunjungi TikTok
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: YouTube */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-850 p-8 rounded-3xl border border-slate-700/80 shadow-xl hover:border-red-500/50 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <Youtube className="w-7 h-7 text-red-500" />
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                  YouTube Channel
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                {socials.youtubeChannel || 'KKN MAs Kelompok 24 Official'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Saluran resmi After Movie sinematik, video dokumenter profil desa, serta rekaman kegiatan panggung festival desa.
              </p>
            </div>

            <a
              href={socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Subscribe YouTube
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Direct Contact Bar */}
        <div className="bg-emerald-950 p-8 rounded-3xl border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Ingin Berkolaborasi atau Mengirim Pesan?
            </h4>
            <p className="text-xs text-emerald-200">
              Pengurus dan anggota KKN MAs Kelompok 24 siap merespons pertanyaan mitra maupun warga.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${socials.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Admin
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              Kirim Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
