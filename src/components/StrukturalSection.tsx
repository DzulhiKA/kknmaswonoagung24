import React, { useState } from 'react';
import { Member } from '../types';
import { Search, GraduationCap, Instagram, User, X, Briefcase, ChevronRight, Calendar } from 'lucide-react';

interface StrukturalSectionProps {
  members: Member[];
}

export const StrukturalSection: React.FC<StrukturalSectionProps> = ({ members }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMember, setActiveModalMember] = useState<Member | null>(null);

  // Extract unique divisions
  const divisions = ['Semua', ...Array.from(new Set(members.map((m) => m.division)))];

  // Filter members
  const filteredMembers = members.filter((m) => {
    const matchesDiv = selectedDivision === 'Semua' || m.division === selectedDivision;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.major && m.major.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.division.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  return (
    <section id="struktural" className="py-20 bg-slate-100/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Struktur Organisasi Kelompok
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Anggota & Tim KKN MAs Kelompok 24
          </h2>
          <p className="text-slate-600 text-base">
            Mengenal seluruh anggota kelompok dari berbagai perguruan tinggi Muhammadiyah dan &apos;Aisyiyah yang mengabdi di Desa Wonoagung.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Division Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {divisions.map((div, idx) => (
              <button
                key={`div-pill-${div}-${idx}`}
                onClick={() => setSelectedDivision(div)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedDivision === div
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, divisi, PT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

        </div>

        {/* Member Cards Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, idx) => (
              <div
                key={member.id ? `member-${member.id}-${idx}` : `member-card-${idx}`}
                onClick={() => setActiveModalMember(member)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Avatar & Role Badge */}
                  <div className="relative mb-4">
                    <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <img
                        src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                        }}
                      />
                    </div>
                    <span className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-emerald-950/85 text-emerald-200 text-xs font-bold backdrop-blur-sm truncate text-center border border-emerald-700/50">
                      {member.role}
                    </span>
                  </div>

                  {/* Name & Division */}
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {member.name}
                  </h3>
                  
                  <div className="text-xs text-emerald-700 font-semibold mb-2 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{member.division}</span>
                  </div>

                  {/* University */}
                  <div className="text-xs text-slate-500 flex items-start gap-1.5 mb-3">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-700 line-clamp-1">{member.university}</div>
                      <div className="text-[11px] text-slate-400">{member.major}</div>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {member.bio || 'Anggota KKN MAs Kelompok 24.'}
                  </p>

                  {/* Activity Date Badge */}
                  <div className="mb-3 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-600 flex items-center justify-between">
                    <span className="text-slate-400 font-normal">Tanggal Kegiatan:</span>
                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {member.activityDate || '1 Agt - 12 Sep 2026'}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {member.instagramHandle ? (
                    <span className="text-pink-600 font-semibold bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-md border border-pink-200/80 flex items-center gap-1 transition-colors">
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                      {member.instagramHandle}
                    </span>
                  ) : (
                    <span className="text-slate-400">Tim KKN 24</span>
                  )}
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Detail <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Tidak ada anggota yang cocok dengan pencarian.</p>
            <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci atau pilih filter divisi lainnya.</p>
          </div>
        )}

      </div>

      {/* Member Profile Detail Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100">
            
            <div className="relative bg-emerald-950 text-white p-6 pb-12">
              <button
                onClick={() => setActiveModalMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-900/80 text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600/40">
                {activeModalMember.division}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-3">
                {activeModalMember.name}
              </h3>
              <p className="text-emerald-300 text-sm font-semibold mt-1">
                {activeModalMember.role}
              </p>
            </div>

            <div className="p-6 -mt-8 relative z-10 space-y-5">
              
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-slate-100 shrink-0">
                  <img
                    src={activeModalMember.avatarUrl}
                    alt={activeModalMember.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pb-1">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Asal Perguruan Tinggi
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {activeModalMember.university}
                  </div>
                  <div className="text-xs text-slate-600">
                    Prodi {activeModalMember.major}
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tugas & Peran Pengabdian
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeModalMember.bio || 'Anggota KKN MAs Kelompok 24 Desa Wonoagung.'}
                </p>
              </div>

              {activeModalMember.instagramHandle && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">Instagram Resmi:</span>
                  <a
                    href={`https://instagram.com/${activeModalMember.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    {activeModalMember.instagramHandle}
                  </a>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  Tutup Profil
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
