import React from 'react';
import { HomeConfig, SocialLinks } from '../types';
import { MapPin, Calendar, Heart, Shield, Instagram, Youtube, ExternalLink, Mail, Phone } from 'lucide-react';
import { KknLogo } from './KknLogo';
import Link from 'next/link';

interface FooterProps {
  homeData: HomeConfig;
  socials: SocialLinks;
}

export const Footer: React.FC<FooterProps> = ({
  homeData,
  socials,
}) => {
  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Info KKN */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <KknLogo size="md" />
              <span className="font-extrabold text-xl text-white tracking-tight">
                KKN MAs Kelompok 24
              </span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              Program Kuliah Kerja Nyata Muhammadiyah &apos;Aisyiyah untuk pengabdian masyarakat di Desa Wonoagung berkelanjutan, kesehatan, dan pengembangan ekonomi warga desa.
            </p>
            <div className="space-y-2 text-xs text-emerald-300/90 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{homeData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{homeData.period}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Tautan Pintar */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-b border-emerald-800 pb-2">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-300/80">
              <li>
                <a href="#home" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> Beranda Utama
                </a>
              </li>
              <li>
                <a href="#struktural" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> Struktural Kelompok
                </a>
              </li>
              <li>
                <a href="#proker" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> Program Kerja (Proker)
                </a>
              </li>
              <li>
                <a href="#sosmed" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> Media Sosial Resmi
                </a>
              </li>
              <li>
                <a href="#dokumentasi" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-emerald-500">›</span> Galeri & After Movie
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak & Sosial Media */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-b border-emerald-800 pb-2">
              Kontak & Media Sosial
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-300/90 hover:text-white transition-colors group"
              >
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                <span>{socials.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a
                href={socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-300/90 hover:text-white transition-colors group"
              >
                <div className="w-4 h-4 flex items-center justify-center font-black text-xs text-cyan-400 group-hover:scale-110 transition-transform">
                  TT
                </div>
                <span>{socials.tiktokHandle}</span>
                <ExternalLink className="w-3 h-3 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href={socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-300/90 hover:text-white transition-colors group"
              >
                <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span>{socials.youtubeChannel}</span>
                <ExternalLink className="w-3 h-3 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="pt-2 border-t border-emerald-900/80 space-y-1.5 text-xs text-emerald-400/90">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{socials.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>+{socials.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Admin Panel Access Link */}
          <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Portal Admin CMS
              </div>
              <p className="text-xs text-emerald-300/80 mb-4 leading-relaxed">
                Halaman khusus pengurus KKN MAs Kelompok 24 untuk mengelola data website dan galeri dokumentasi.
              </p>
            </div>
            <Link
              href="/admin"
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs border border-emerald-600/50 flex items-center justify-center gap-2 transition-all"
            >
              Buka Halaman Admin CMS
            </Link>
          </div>

        </div>

        {/* Bottom Copyright & Credit Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>© 2026 KKN MAs Kelompok 24 Desa Wonoagung. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1 text-emerald-300/90">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>oleh Tim KKN MAs Kelompok 24</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
