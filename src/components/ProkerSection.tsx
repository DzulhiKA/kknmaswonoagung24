import React, { useState } from 'react';
import { Proker, ProkerCategory } from '../types';
import { BookOpen, CheckCircle, Clock, Calendar, MapPin, User, Target, ChevronRight, X, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface ProkerSectionProps {
  prokerList: Proker[];
}

export const ProkerSection: React.FC<ProkerSectionProps> = ({ prokerList }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProkerCategory | 'Semua'>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [activeProkerModal, setActiveProkerModal] = useState<Proker | null>(null);

  const categories: (ProkerCategory | 'Semua')[] = ['Semua', 'Utama', 'Selingan', 'Kolaborasi'];

  const filteredProker = prokerList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Semua' || item.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const getCategoryBadgeClass = (category: ProkerCategory) => {
    switch (category) {
      case 'Utama':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Selingan':
        return 'bg-teal-100 text-teal-800 border-teal-300';
      case 'Kolaborasi':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-600 text-white';
      case 'Berlangsung':
        return 'bg-blue-600 text-white';
      case 'Rencana':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  return (
    <section id="proker" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            Program Kerja Pengabdian
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Kerja KKN MAs Kelompok 24
          </h2>
          <p className="text-slate-600 text-base">
            Dirancang secara terstruktur mencakup Program Kerja Utama, Program Kerja Selingan, dan Program Kerja Kolaborasi Masyarakat untuk manfaat nyata Desa Wonoagung.
          </p>
        </div>

        {/* Category Description Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div 
            onClick={() => setSelectedCategory('Utama')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedCategory === 'Utama'
                ? 'bg-emerald-950 text-white border-emerald-700 shadow-lg scale-102'
                : 'bg-emerald-50/60 hover:bg-emerald-50 text-slate-800 border-emerald-200/80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                selectedCategory === 'Utama' ? 'bg-emerald-500 text-emerald-950' : 'bg-emerald-200 text-emerald-900'
              }`}>
                Kategori 1
              </span>
              <Sparkles className={`w-5 h-5 ${selectedCategory === 'Utama' ? 'text-emerald-400' : 'text-emerald-600'}`} />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${selectedCategory === 'Utama' ? 'text-white' : 'text-emerald-950'}`}>
              Program Kerja Utama
            </h3>
            <p className={`text-xs leading-relaxed ${selectedCategory === 'Utama' ? 'text-emerald-200' : 'text-slate-600'}`}>
              Fokus pada isu strategis seperti digitalisasi UMKM desa, pencegahan stunting balita, serta pengolahan sampah mandiri.
            </p>
          </div>

          <div 
            onClick={() => setSelectedCategory('Selingan')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedCategory === 'Selingan'
                ? 'bg-teal-950 text-white border-teal-700 shadow-lg scale-102'
                : 'bg-teal-50/60 hover:bg-teal-50 text-slate-800 border-teal-200/80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                selectedCategory === 'Selingan' ? 'bg-teal-400 text-teal-950' : 'bg-teal-200 text-teal-900'
              }`}>
                Kategori 2
              </span>
              <BookOpen className={`w-5 h-5 ${selectedCategory === 'Selingan' ? 'text-teal-400' : 'text-teal-600'}`} />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${selectedCategory === 'Selingan' ? 'text-white' : 'text-teal-950'}`}>
              Program Kerja Selingan
            </h3>
            <p className={`text-xs leading-relaxed ${selectedCategory === 'Selingan' ? 'text-teal-200' : 'text-slate-600'}`}>
              Bimbingan belajar anak Rumah Cerdas, pengajaran TPA/TPQ, senam sehat lansia, dan lomba edukatif santri cilik.
            </p>
          </div>

          <div 
            onClick={() => setSelectedCategory('Kolaborasi')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${
              selectedCategory === 'Kolaborasi'
                ? 'bg-slate-900 text-white border-slate-700 shadow-lg scale-102'
                : 'bg-amber-50/60 hover:bg-amber-50 text-slate-800 border-amber-200/80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                selectedCategory === 'Kolaborasi' ? 'bg-amber-400 text-amber-950' : 'bg-amber-200 text-amber-900'
              }`}>
                Kategori 3
              </span>
              <User className={`w-5 h-5 ${selectedCategory === 'Kolaborasi' ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${selectedCategory === 'Kolaborasi' ? 'text-white' : 'text-slate-900'}`}>
              Kolaborasi Masyarakat
            </h3>
            <p className={`text-xs leading-relaxed ${selectedCategory === 'Kolaborasi' ? 'text-slate-300' : 'text-slate-600'}`}>
              Sinergi gotong royong dengan Karang Taruna, panggung seni festival desa, aksi penghijauan, serta administrasi desa.
            </p>
          </div>

        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Kategori:
            </span>
            {categories.map((cat, idx) => (
              <button
                key={`cat-pill-${cat}-${idx}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat === 'Semua' ? 'Semua Proker' : `Proker ${cat}`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <option value="Semua">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Berlangsung">Berlangsung</option>
              <option value="Rencana">Rencana</option>
            </select>
          </div>

        </div>

        {/* Proker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProker.map((proker, idx) => (
            <div
              key={proker.id ? `proker-${proker.id}-${idx}` : `proker-card-${idx}`}
              onClick={() => setActiveProkerModal(proker)}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeClass(proker.category)}`}>
                    Proker {proker.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${getStatusBadgeClass(proker.status)}`}>
                    {proker.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                  {proker.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {proker.description}
                </p>

                {/* Info Metadata */}
                <div className="space-y-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">PIC: <strong>{proker.pic}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{proker.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{proker.date}</span>
                  </div>
                </div>
              </div>

              {/* Output Preview & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {proker.outputs?.length || 0} Luaran Kegiatan
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
                  Detail Luaran <ChevronRight className="w-4 h-4" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal for Luaran Kegiatan */}
      {activeProkerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            
            <div className="bg-emerald-950 text-white p-6 relative">
              <button
                onClick={() => setActiveProkerModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-900/80 text-emerald-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${getCategoryBadgeClass(activeProkerModal.category)}`}>
                  Proker {activeProkerModal.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadgeClass(activeProkerModal.status)}`}>
                  {activeProkerModal.status}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-snug">
                {activeProkerModal.title}
              </h3>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Penjelasan Program
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {activeProkerModal.description}
                </p>
              </div>

              {/* Output / Luaran List */}
              <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
                <h4 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Luaran (Outputs) Kegiatan:
                </h4>
                <ul className="space-y-2">
                  {activeProkerModal.outputs && activeProkerModal.outputs.length > 0 ? (
                    activeProkerModal.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900 font-medium">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-slate-500 italic">Belum ada luaran terdaftar.</li>
                  )}
                </ul>
              </div>

              {/* Metadata Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-400 font-semibold block">Penanggung Jawab (PIC):</span>
                  <span className="font-bold text-slate-800">{activeProkerModal.pic}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Sasaran Peserta:</span>
                  <span className="font-bold text-slate-800">{activeProkerModal.targetAudience}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Lokasi Pelaksanaan:</span>
                  <span className="font-bold text-slate-800">{activeProkerModal.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Jadwal / Periode:</span>
                  <span className="font-bold text-slate-800">{activeProkerModal.date}</span>
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveProkerModal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Tutup Detail
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
