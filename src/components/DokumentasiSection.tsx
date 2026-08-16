import React, { useState } from 'react';
import { DocumentationPhoto, AfterMovieConfig, ProkerCategory } from '../types';
import { Image, Film, Play, ZoomIn, X, Calendar, Tag, ExternalLink, Filter, Sparkles } from 'lucide-react';

interface DokumentasiSectionProps {
  photos: DocumentationPhoto[];
  afterMovie: AfterMovieConfig;
}

export const DokumentasiSection: React.FC<DokumentasiSectionProps> = ({
  photos,
  afterMovie,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProkerCategory | 'Semua'>('Semua');
  const [activePhotoModal, setActivePhotoModal] = useState<DocumentationPhoto | null>(null);

  const categories: (ProkerCategory | 'Semua')[] = ['Semua', 'Utama', 'Selingan', 'Kolaborasi'];

  const filteredPhotos = photos.filter((photo) => {
    return selectedCategory === 'Semua' || photo.prokerCategory === selectedCategory;
  });

  // Convert standard watch URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    if (url.includes('youtube.com/embed/')) return url;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <section id="dokumentasi" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Image className="w-3.5 h-3.5" />
            Galeri & Rekapitulasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dokumentasi Kegiatan KKN MAs 24
          </h2>
          <p className="text-slate-600 text-base">
            Arsip visual rekaman momen kebersamaan, pelaksanaan program kerja, dan After Movie pengabdian masyarakat.
          </p>
        </div>

        {/* --- PART 1: AFTER MOVIE SECTION --- */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-600/50">
              <Film className="w-4 h-4 text-emerald-400" />
              After Movie Sinematik
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {afterMovie.title || 'After Movie KKN MAs Kelompok 24'}
            </h3>

            <div className="flex items-center gap-3 text-xs text-emerald-300 font-medium">
              <span className="px-2.5 py-1 bg-emerald-900 rounded-md border border-emerald-700/60">
                Durasi: {afterMovie.duration || '04:25'}
              </span>
              <span>• Desa Sumbersekar</span>
            </div>

            <p className="text-emerald-100 text-sm leading-relaxed whitespace-pre-line">
              {afterMovie.description || 'Saksikan kilas balik momen hangat dan kerja keras mahasiswa KKN MAs Kelompok 24 bersama masyarakat desa.'}
            </p>

            {afterMovie.youtubeWatchUrl && (
              <a
                href={afterMovie.youtubeWatchUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Tonton di YouTube
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* YouTube Video Player Embed Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-emerald-800 shadow-2xl">
              <iframe
                src={getEmbedUrl(afterMovie.youtubeEmbedUrl)}
                title={afterMovie.title || 'After Movie KKN MAs 24'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

        </div>

        {/* --- PART 2: PHOTO GALLERY SECTION --- */}
        <div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Galeri Foto Kegiatan
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Dikategorikan berdasarkan jenis program kerja (Utama, Selingan, & Kolaborasi).
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat === 'Semua' ? 'Semua Foto' : `Proker ${cat}`}
                </button>
              ))}
            </div>
          </div>

          {/* Photos Masonry/Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoModal(photo)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-3 rounded-full bg-white/90 text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow">
                          <ZoomIn className="w-4 h-4 text-emerald-600" /> Perbesar
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-200 text-[11px] font-bold backdrop-blur-sm border border-emerald-700/50">
                        Proker {photo.prokerCategory}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>

                  {/* Footer Date */}
                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {photo.date}
                    </span>
                    <span className="font-semibold text-emerald-700 truncate max-w-[140px]">
                      {photo.prokerTitle || 'Kegiatan KKN'}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">Belum ada foto dalam kategori ini.</p>
              <p className="text-xs text-slate-400 mt-1">Anda dapat menambahkan foto baru melalui Dashboard Admin.</p>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Modal View */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800">
            
            <div className="relative aspect-16/9 bg-black overflow-hidden flex items-center justify-center">
              <img
                src={activePhotoModal.imageUrl}
                alt={activePhotoModal.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActivePhotoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Proker {activePhotoModal.prokerCategory}
                </span>
                <span className="text-xs text-slate-400">
                  {activePhotoModal.date}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {activePhotoModal.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {activePhotoModal.caption}
              </p>

              {activePhotoModal.prokerTitle && (
                <div className="pt-2 text-xs text-emerald-400 font-medium">
                  Program Kerja: {activePhotoModal.prokerTitle}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
