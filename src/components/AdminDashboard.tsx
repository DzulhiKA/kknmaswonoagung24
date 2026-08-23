import React, { useState, useEffect } from 'react';
import { AppData, Member, Proker, DocumentationPhoto, ProkerCategory, ProkerStatus } from '../types';
import { 
  ShieldCheck, Home, Users, BookOpen, Share2, Image, RefreshCw, Plus, Trash2, Edit3, 
  Save, Check, X, Film, Sparkles, Eye, Instagram, Calendar, LayoutGrid, Search,
  CheckCircle2, Database, Upload, AlertCircle, ArrowUpRight, Filter, GraduationCap, Briefcase
} from 'lucide-react';

interface AdminDashboardProps {
  data: AppData;
  onUpdateData: (newData: AppData) => Promise<void> | void;
  onResetData: () => Promise<void> | void;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onUpdateData,
  onResetData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'members' | 'proker' | 'socials' | 'dokumentasi' | 'mockup'>('members');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Search & Filter queries for CMS tables
  const [memberSearch, setMemberSearch] = useState('');
  const [prokerSearch, setProkerSearch] = useState('');
  const [mockupSearch, setMockupSearch] = useState('');
  const [mockupDivision, setMockupDivision] = useState('Semua');

  // Local editable copies of state
  const [homeForm, setHomeForm] = useState(data.home);
  const [socialsForm, setSocialsForm] = useState(data.socials);
  const [afterMovieForm, setAfterMovieForm] = useState(data.afterMovie);

  // Local state for all mockup profile cards editable fields (supports 15+ members)
  const [mockupMembers, setMockupMembers] = useState<Member[]>(() => data.members);

  // Synchronize state whenever data prop is updated from Supabase or parent
  useEffect(() => {
    setHomeForm(data.home);
    setSocialsForm(data.socials);
    setAfterMovieForm(data.afterMovie);
    setMockupMembers(data.members);
  }, [data]);

  // Member editing modal state
  const [editingMember, setEditingMember] = useState<Partial<Member> | null>(null);

  // Proker editing modal state
  const [editingProker, setEditingProker] = useState<Partial<Proker> | null>(null);

  // Photo editing modal state
  const [editingPhoto, setEditingPhoto] = useState<Partial<DocumentationPhoto> | null>(null);

  const showNotification = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  // Generic Save Handler with Loading Spinner & Supabase Toast
  const executeSave = async (updatedData: AppData, successMessage: string) => {
    setIsSaving(true);
    await onUpdateData(updatedData);
    setIsSaving(false);
    showNotification(successMessage);
  };

  // --- SAVE HOME ---
  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave({ ...data, home: homeForm }, ' Data Beranda berhasil disimpan ke Supabase!');
  };

  // --- SAVE SOCIALS ---
  const handleSaveSocials = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave({ ...data, socials: socialsForm }, ' Tautan Sosial Media berhasil diperbarui!');
  };

  // --- SAVE AFTER MOVIE ---
  const handleSaveAfterMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave({ ...data, afterMovie: afterMovieForm }, ' Video After Movie YouTube berhasil diperbarui!');
  };

  // --- SAVE MOCKUP MEMBERS (ALL 15+ MEMBERS) ---
  const handleSaveMockupMembers = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSave({ ...data, members: mockupMembers }, ` Perubahan Live Mockup Anggota (${mockupMembers.length} Mahasiswa) berhasil tersimpan!`);
  };

  // --- MEMBER CRUD ---
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.role) return;

    let updatedMembers = [...data.members];
    if (editingMember.id) {
      updatedMembers = updatedMembers.map((m) => (m.id === editingMember.id ? (editingMember as Member) : m));
    } else {
      const newMember: Member = {
        id: `mem-${Date.now()}`,
        name: editingMember.name || '',
        role: editingMember.role || '',
        division: editingMember.division || 'Divisi Acara & Program',
        university: editingMember.university || 'Universitas Muhammadiyah',
        major: editingMember.major || 'Informatika',
        avatarUrl: editingMember.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        bio: editingMember.bio || '',
        instagramHandle: editingMember.instagramHandle || '@kkn24.member'
      };
      updatedMembers.push(newMember);
    }

    await executeSave({ ...data, members: updatedMembers }, ' Data Anggota Tim berhasil disimpan!');
    setEditingMember(null);
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus anggota ini dari daftar struktural?')) {
      const updatedMembers = data.members.filter((m) => m.id !== id);
      await executeSave({ ...data, members: updatedMembers }, ' Anggota berhasil dihapus.');
    }
  };

  // --- PROKER CRUD ---
  const handleSaveProker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProker?.title) return;

    let updatedList = [...data.prokerList];
    if (editingProker.id) {
      updatedList = updatedList.map((p) => (p.id === editingProker.id ? (editingProker as Proker) : p));
    } else {
      const newProker: Proker = {
        id: `proker-${Date.now()}`,
        title: editingProker.title || '',
        category: (editingProker.category as ProkerCategory) || 'Utama',
        description: editingProker.description || '',
        outputs: editingProker.outputs || ['Luaran program kegiatan'],
        status: (editingProker.status as ProkerStatus) || 'Rencana',
        pic: editingProker.pic || 'Tim KKN',
        location: editingProker.location || 'Desa Wonoagung',
        targetAudience: editingProker.targetAudience || 'Warga Desa',
        date: editingProker.date || 'Agustus 2026'
      };
      updatedList.push(newProker);
    }

    await executeSave({ ...data, prokerList: updatedList }, ' Data Program Kerja berhasil disimpan!');
    setEditingProker(null);
  };

  const handleDeleteProker = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus Program Kerja ini?')) {
      const updatedList = data.prokerList.filter((p) => p.id !== id);
      await executeSave({ ...data, prokerList: updatedList }, ' Program Kerja berhasil dihapus.');
    }
  };

  // --- PHOTO CRUD ---
  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto?.imageUrl) return;

    let updatedPhotos = [...data.photos];
    if (editingPhoto.id) {
      updatedPhotos = updatedPhotos.map((p) => (p.id === editingPhoto.id ? (editingPhoto as DocumentationPhoto) : p));
    } else {
      const newPhoto: DocumentationPhoto = {
        id: `photo-${Date.now()}`,
        title: editingPhoto.title || 'Foto Kegiatan',
        imageUrl: editingPhoto.imageUrl || 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
        prokerCategory: (editingPhoto.prokerCategory as ProkerCategory) || 'Utama',
        prokerTitle: editingPhoto.prokerTitle || 'Kegiatan KKN MAs',
        date: editingPhoto.date || 'Agustus 2026',
        caption: editingPhoto.caption || ''
      };
      updatedPhotos.push(newPhoto);
    }

    await executeSave({ ...data, photos: updatedPhotos }, ' Foto dokumentasi berhasil ditambahkan!');
    setEditingPhoto(null);
  };

  const handleDeletePhoto = async (id: string) => {
    if (window.confirm('Hapus foto ini dari galeri dokumentasi?')) {
      const updatedPhotos = data.photos.filter((p) => p.id !== id);
      await executeSave({ ...data, photos: updatedPhotos }, ' Foto galeri berhasil dihapus.');
    }
  };

  // File upload to Base64 Data URL helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtered members for Tab 1
  const filteredMembers = data.members.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.division && m.division.toLowerCase().includes(memberSearch.toLowerCase())) ||
      (m.university && m.university.toLowerCase().includes(memberSearch.toLowerCase())) ||
      (m.major && m.major.toLowerCase().includes(memberSearch.toLowerCase()))
  );

  // Filtered members for Tab 6 (Live Mockup)
  const mockupDivisions = ['Semua', ...Array.from(new Set(mockupMembers.map((m) => m.division).filter(Boolean)))];
  const filteredMockupMembers = mockupMembers.filter((m) => {
    const matchesDiv = mockupDivision === 'Semua' || m.division === mockupDivision;
    const matchesSearch =
      m.name.toLowerCase().includes(mockupSearch.toLowerCase()) ||
      m.role.toLowerCase().includes(mockupSearch.toLowerCase()) ||
      (m.division && m.division.toLowerCase().includes(mockupSearch.toLowerCase())) ||
      (m.university && m.university.toLowerCase().includes(mockupSearch.toLowerCase())) ||
      (m.major && m.major.toLowerCase().includes(mockupSearch.toLowerCase())) ||
      (m.instagramHandle && m.instagramHandle.toLowerCase().includes(mockupSearch.toLowerCase()));
    return matchesDiv && matchesSearch;
  });

  // Filtered proker for Search
  const filteredProker = data.prokerList.filter(
    (p) =>
      p.title.toLowerCase().includes(prokerSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(prokerSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(prokerSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans">
      
      {/* Toast Notification Banner */}
      {savedSuccessMsg && (
        <div className="bg-emerald-500 text-slate-950 px-6 py-3 font-extrabold text-xs shadow-xl flex items-center justify-between animate-in slide-in-from-top duration-200 border-b border-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedSuccessMsg}</span>
          </div>
          <button onClick={() => setSavedSuccessMsg('')} className="hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Industry Standard Overview Metric Bar */}
      <div className="bg-slate-950 p-4 sm:p-6 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Total Anggota</div>
              <div className="text-lg font-black text-white">{data.members.length} Mahasiswa</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Program Kerja</div>
              <div className="text-lg font-black text-white">{data.prokerList.length} Proker</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Galeri Foto</div>
              <div className="text-lg font-black text-white">{data.photos.length} Dokumentasi</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase text-slate-400">Database Engine</div>
                <div className="text-xs font-black text-emerald-300">Supabase Cloud</div>
              </div>
            </div>

            <button
              onClick={async () => {
                if (window.confirm('Reset seluruh data website kembali ke data awal KKN MAs Kelompok 24?')) {
                  await onResetData();
                  showNotification(' Data berhasil di-reset ke versi awal.');
                }
              }}
              className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-700 transition-colors"
              title="Reset ke data awal"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main CMS Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Sidebar Nav Tabs */}
        <div className="w-full lg:w-72 bg-slate-950/60 p-3 sm:p-4 border-r border-slate-800/80 flex lg:flex-col overflow-x-auto shrink-0 gap-1.5">
          
          <div className="hidden lg:block px-3 py-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
            Navigasi Modul CMS
          </div>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'members'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>1. Anggota & Tim</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-950/60 text-emerald-300 text-[10px]">
              {data.members.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('proker')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'proker'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>2. Program Kerja</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-950/60 text-emerald-300 text-[10px]">
              {data.prokerList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>3. Beranda & Hero</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'socials'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Share2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>4. Tautan Sosial Media</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('dokumentasi')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'dokumentasi'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Image className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>5. Galeri & Aftermovie</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-950/60 text-emerald-300 text-[10px]">
              {data.photos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('mockup')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-extrabold transition-all text-left whitespace-nowrap ${
              activeTab === 'mockup'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400'
                : 'hover:bg-slate-800/70 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>6. Live Mockup Anggota</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-950/60 text-emerald-300 text-[10px]">
              {data.members.length}
            </span>
          </button>

        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-8 bg-slate-900/60 overflow-y-auto">
          
          {/* TAB 1: MEMBERS MANAGEMENT */}
          {activeTab === 'members' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Manajemen Anggota & Struktural Tim</h3>
                  <p className="text-xs text-slate-400">Kelola nama, divisi, asal perguruan tinggi, foto profil, dan kutipan anggota.</p>
                </div>

                <button
                  onClick={() => setEditingMember({ name: '', role: '', division: 'Divisi Utama', university: 'Perguruan Tinggi Muhammadiyah' })}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tambah Anggota Baru
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari anggota berdasarkan nama, divisi, atau peran..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Member Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <img src={member.avatarUrl} alt={member.name} className="w-14 h-14 rounded-2xl object-cover shrink-0 bg-slate-900 border border-slate-800" referrerPolicy="no-referrer" />
                      <div className="overflow-hidden space-y-0.5">
                        <div className="font-bold text-white text-sm truncate">{member.name}</div>
                        <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 truncate">
                          <span>{member.role}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-300 font-normal">{member.division}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          <span>{member.university}</span> — <span className="text-emerald-300 font-medium">Prodi {member.major || '-'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="p-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded-xl text-xs border border-slate-800"
                        title="Sunting Data Anggota"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="p-2.5 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-xl text-xs border border-slate-800"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROKER MANAGEMENT */}
          {activeTab === 'proker' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Manajemen Program Kerja (Proker)</h3>
                  <p className="text-xs text-slate-400">Kelola proker utama, indikator pencapaian, tanggal pelaksanaan, dan lokasi.</p>
                </div>

                <button
                  onClick={() => setEditingProker({ title: '', category: 'Utama', status: 'Rencana', outputs: [''] })}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" /> Tambah Proker Baru
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari program kerja berdasarkan judul, deskripsi, atau kategori..."
                  value={prokerSearch}
                  onChange={(e) => setProkerSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Proker List */}
              <div className="space-y-3">
                {filteredProker.map((proker) => (
                  <div key={proker.id} className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 text-[10px] font-extrabold rounded-lg border border-emerald-800 uppercase">
                          {proker.category}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-900 text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-800">
                          {proker.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base">{proker.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{proker.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingProker(proker)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-emerald-300 rounded-xl text-xs font-bold border border-slate-800 flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Proker
                      </button>
                      <button
                        onClick={() => handleDeleteProker(proker.id)}
                        className="p-2 bg-slate-900 hover:bg-rose-950 text-rose-400 rounded-xl text-xs border border-slate-800"
                        title="Hapus Proker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOME MANAGEMENT */}
          {activeTab === 'home' && (
            <form onSubmit={handleSaveHome} className="max-w-4xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-white tracking-tight mb-1">Pengaturan Informasi Beranda Utama</h3>
                <p className="text-xs text-slate-400">Kelola judul hero, deskripsi pengantar, visi, misi, dan lokasi pengabdian.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">Judul Hero Utama</label>
                  <input
                    type="text"
                    value={homeForm.heroTitle}
                    onChange={(e) => setHomeForm({ ...homeForm, heroTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">Lokasi Pengabdian</label>
                  <input
                    type="text"
                    value={homeForm.location}
                    onChange={(e) => setHomeForm({ ...homeForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    Periode / Tanggal Kegiatan
                  </label>
                  <input
                    type="text"
                    value={homeForm.period || ''}
                    onChange={(e) => setHomeForm({ ...homeForm, period: e.target.value })}
                    placeholder="e.g. 1 Agustus - 12 September 2026"
                    className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-4 py-2.5 text-xs font-semibold text-emerald-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1.5">Teks Pengantar KKN MAs</label>
                <textarea
                  rows={4}
                  value={homeForm.introText}
                  onChange={(e) => setHomeForm({ ...homeForm, introText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1.5">Visi Kelompok</label>
                <textarea
                  rows={2}
                  value={homeForm.vision}
                  onChange={(e) => setHomeForm({ ...homeForm, vision: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* ── MISI EDITOR ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-300">Misi Kelompok</label>
                  <button
                    type="button"
                    onClick={() => setHomeForm({ ...homeForm, mission: [...(homeForm.mission || []), ''] })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-[11px] font-bold border border-emerald-500/40 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Poin Misi
                  </button>
                </div>
                <div className="space-y-2">
                  {(homeForm.mission || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-emerald-400 w-5 shrink-0 text-center">{idx + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...(homeForm.mission || [])];
                          updated[idx] = e.target.value;
                          setHomeForm({ ...homeForm, mission: updated });
                        }}
                        placeholder={`Poin misi ke-${idx + 1}...`}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (homeForm.mission || []).filter((_, i) => i !== idx);
                          setHomeForm({ ...homeForm, mission: updated });
                        }}
                        className="p-2 bg-slate-950 hover:bg-rose-950 text-rose-400 rounded-xl border border-slate-800 shrink-0 transition-colors"
                        title="Hapus poin misi ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {(!homeForm.mission || homeForm.mission.length === 0) && (
                    <p className="text-xs text-slate-500 italic py-2 text-center">Belum ada poin misi. Klik &quot;Tambah Poin Misi&quot; untuk mulai.</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan ke Supabase...' : 'Simpan Perubahan Beranda'}
              </button>
            </form>
          )}

          {/* TAB 4: SOCIALS MANAGEMENT */}
          {activeTab === 'socials' && (
            <form onSubmit={handleSaveSocials} className="max-w-3xl space-y-5">
              <div>
                <h3 className="text-xl font-black text-white tracking-tight mb-1">Manajemen Tautan Sosial Media</h3>
                <p className="text-xs text-slate-400">Kelola tautan akun Instagram, TikTok, YouTube, email, dan WhatsApp admin.</p>
              </div>

              <div className="space-y-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">URL Instagram</label>
                  <input
                    type="text"
                    value={socialsForm.instagram}
                    onChange={(e) => setSocialsForm({ ...socialsForm, instagram: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">Username Instagram Handle</label>
                  <input
                    type="text"
                    value={socialsForm.instagramHandle}
                    onChange={(e) => setSocialsForm({ ...socialsForm, instagramHandle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">URL TikTok</label>
                  <input
                    type="text"
                    value={socialsForm.tiktok}
                    onChange={(e) => setSocialsForm({ ...socialsForm, tiktok: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">URL YouTube</label>
                  <input
                    type="text"
                    value={socialsForm.youtube}
                    onChange={(e) => setSocialsForm({ ...socialsForm, youtube: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1.5">WhatsApp Admin</label>
                  <input
                    type="text"
                    value={socialsForm.whatsapp}
                    onChange={(e) => setSocialsForm({ ...socialsForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan...' : 'Simpan Tautan Sosial Media'}
              </button>
            </form>
          )}

          {/* TAB 5: DOKUMENTASI & AFTERMOVIE */}
          {activeTab === 'dokumentasi' && (
            <div className="space-y-8 max-w-5xl">
              
              {/* After Movie Manager */}
              <form onSubmit={handleSaveAfterMovie} className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Film className="w-5 h-5 text-emerald-400" />
                    Pengaturan Video After Movie YouTube
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 w-fit">
                    Durasi Aktif: {afterMovieForm.duration || '04:25'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">Judul Video After Movie</label>
                    <input
                      type="text"
                      value={afterMovieForm.title || ''}
                      onChange={(e) => setAfterMovieForm({ ...afterMovieForm, title: e.target.value })}
                      placeholder="e.g. After Movie KKN MAs Kelompok 24"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">Durasi Video (e.g. 04:25 / 10:15)</label>
                    <input
                      type="text"
                      value={afterMovieForm.duration || ''}
                      onChange={(e) => setAfterMovieForm({ ...afterMovieForm, duration: e.target.value })}
                      placeholder="04:25"
                      className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-4 py-2.5 text-xs font-semibold text-emerald-200 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">YouTube Embed URL</label>
                    <input
                      type="text"
                      value={afterMovieForm.youtubeEmbedUrl || ''}
                      onChange={(e) => setAfterMovieForm({ ...afterMovieForm, youtubeEmbedUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">YouTube Watch URL (Tonton di YouTube)</label>
                    <input
                      type="text"
                      value={afterMovieForm.youtubeWatchUrl || ''}
                      onChange={(e) => setAfterMovieForm({ ...afterMovieForm, youtubeWatchUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-300 mb-1">Deskripsi / Catatan Video After Movie</label>
                    <textarea
                      rows={2}
                      value={afterMovieForm.description || ''}
                      onChange={(e) => setAfterMovieForm({ ...afterMovieForm, description: e.target.value })}
                      placeholder="Saksikan kilas balik momen hangat dan kerja keras mahasiswa KKN MAs..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg"
                >
                  <Save className="w-4 h-4" /> {isSaving ? 'Menyimpan...' : 'Perbarui Video After Movie'}
                </button>
              </form>

              {/* Photo Gallery Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Galeri Foto Dokumentasi</h3>
                    <p className="text-xs text-slate-400">Kelola foto kegiatan KKN MAs dan deskripsi caption.</p>
                  </div>

                  <button
                    onClick={() => setEditingPhoto({ title: '', imageUrl: '', prokerCategory: 'Utama', date: 'Agustus 2026' })}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Tambah Foto Galeri
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.photos.map((photo) => (
                    <div key={photo.id} className="bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800/80 flex flex-col justify-between">
                      <div>
                        <div className="aspect-video relative overflow-hidden bg-slate-900">
                          <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-emerald-300 text-[10px] font-bold border border-slate-800">
                            Proker {photo.prokerCategory}
                          </span>
                        </div>
                        <div className="p-3.5 space-y-1">
                          <div className="font-bold text-white text-xs truncate">{photo.title}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-2">{photo.caption}</div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
                        <button
                          onClick={() => setEditingPhoto(photo)}
                          className="px-3 py-1.5 bg-slate-800 text-emerald-300 text-xs font-bold rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="p-1.5 bg-slate-800 text-rose-400 text-xs rounded-lg hover:bg-rose-950"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: MOCKUP KARTU EDITABLE (SEMUA ANGGOTA 15+) */}
          {activeTab === 'mockup' && (
            <div className="space-y-6 max-w-7xl">
              
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/40">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Live Mockup Anggota ({mockupMembers.length} Mahasiswa Aktif)
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Sunting Langsung Prodi & Instagram Anggota
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl">
                    Perubahan langsung pada kartu seluruh anggota tim (15+ anggota) akan tersimpan aman ke database Supabase dan tidak akan terpotong atau hilang.
                  </p>
                </div>

                <button
                  onClick={handleSaveMockupMembers}
                  disabled={isSaving}
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg flex items-center gap-2 transition-all shrink-0 shadow-emerald-950/50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Menyimpan...' : `Simpan Semua Kartu (${mockupMembers.length})`}
                </button>
              </div>

              {/* Filter & Search Bar for Mockup */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                  {mockupDivisions.map((div, idx) => (
                    <button
                      key={`mockup-div-${idx}`}
                      onClick={() => setMockupDivision(div)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        mockupDivision === div
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {div}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, prodi, kampus..."
                    value={mockupSearch}
                    onChange={(e) => setMockupSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* All Members Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMockupMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-slate-950 rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/60 shadow-xl flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="relative mb-3">
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                          <img
                            src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-slate-950/90 text-emerald-300 text-[11px] font-bold rounded-lg text-center backdrop-blur-sm truncate border border-emerald-600/40">
                          {member.role}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm line-clamp-1 mb-0.5">{member.name}</h4>
                      <div className="text-[11px] text-emerald-400 font-semibold mb-1 truncate">{member.division}</div>
                      <div className="text-[10px] text-slate-400 mb-3 truncate">{member.university}</div>

                      {/* EDITABLE PRODI / MAJOR */}
                      <div className="mb-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-extrabold text-emerald-300 uppercase">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-emerald-400" />
                            Program Studi (Prodi)
                          </span>
                          <span className="px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 text-[8px] font-black">EDIT</span>
                        </div>
                        <input
                          type="text"
                          value={member.major || ''}
                          onChange={(e) => {
                            const newMajor = e.target.value;
                            setMockupMembers((prev) =>
                              prev.map((m) => (m.id === member.id ? { ...m, major: newMajor } : m))
                            );
                          }}
                          placeholder="e.g. Informatika"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-200 font-medium focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      {/* EDITABLE INSTAGRAM HANDLE */}
                      <div className="p-2 rounded-xl bg-pink-950/40 border border-pink-500/40 space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-extrabold text-pink-300 uppercase">
                          <span className="flex items-center gap-1">
                            <Instagram className="w-3 h-3 text-pink-400" />
                            Instagram Handle
                          </span>
                          <span className="px-1 py-0.2 rounded bg-pink-500/40 text-pink-200 text-[8px] font-black">EDIT</span>
                        </div>
                        <input
                          type="text"
                          value={member.instagramHandle || ''}
                          onChange={(e) => {
                            const newHandle = e.target.value;
                            setMockupMembers((prev) =>
                              prev.map((m) => (m.id === member.id ? { ...m, instagramHandle: newHandle } : m))
                            );
                          }}
                          placeholder="@username"
                          className="w-full bg-slate-950 border border-pink-500/40 rounded-lg px-2.5 py-1.5 text-xs text-pink-200 font-mono focus:outline-none focus:border-pink-400"
                        />
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {filteredMockupMembers.length === 0 && (
                <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  Tidak ada anggota yang cocok dengan filter pencarian mockup.
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* MEMBER EDIT MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-white text-lg">
                {editingMember.id ? 'Sunting Data Anggota' : 'Tambah Anggota Tim Baru'}
              </h3>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  placeholder="e.g. Fulan Ahmad"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Jabatan / Role</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    placeholder="e.g. Ketua Kelompok / Humas"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Divisi</label>
                  <input
                    type="text"
                    value={editingMember.division || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, division: e.target.value })}
                    placeholder="e.g. Divisi Humas & PDD"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Asal Perguruan Tinggi</label>
                  <input
                    type="text"
                    value={editingMember.university || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, university: e.target.value })}
                    placeholder="e.g. Universitas Muhammadiyah Malang"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">
                    Program Studi (Prodi)
                  </label>
                  <input
                    type="text"
                    value={editingMember.major || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, major: e.target.value })}
                    placeholder="e.g. Teknik Informatika"
                    className="w-full bg-slate-950 border border-emerald-500/50 rounded-xl px-3.5 py-2 text-xs font-semibold text-emerald-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Akun Instagram Handle</label>
                <input
                  type="text"
                  value={editingMember.instagramHandle || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, instagramHandle: e.target.value })}
                  placeholder="e.g. @nama.akun"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">URL Foto Profil Avatar</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingMember.avatarUrl || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, avatarUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1 border border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setEditingMember({ ...editingMember, avatarUrl: url }))}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Tugas / Bio / Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  placeholder="Deskripsi peran dan tugas pengabdian anggota..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow"
                >
                  Simpan Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROKER EDIT MODAL */}
      {editingProker && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-white text-lg">
                {editingProker.id ? 'Sunting Program Kerja' : 'Tambah Program Kerja Baru'}
              </h3>
              <button onClick={() => setEditingProker(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProker} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Judul Program Kerja</label>
                <input
                  type="text"
                  required
                  value={editingProker.title || ''}
                  onChange={(e) => setEditingProker({ ...editingProker, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Kategori Proker</label>
                  <select
                    value={editingProker.category || 'Utama'}
                    onChange={(e) => setEditingProker({ ...editingProker, category: e.target.value as ProkerCategory })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Utama">Utama</option>
                    <option value="Selingan">Selingan</option>
                    <option value="Insidental">Insidental</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">Status Proker</label>
                  <select
                    value={editingProker.status || 'Rencana'}
                    onChange={(e) => setEditingProker({ ...editingProker, status: e.target.value as ProkerStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Berjalan">Berjalan</option>
                    <option value="Rencana">Rencana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={3}
                  value={editingProker.description || ''}
                  onChange={(e) => setEditingProker({ ...editingProker, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProker(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow"
                >
                  Simpan Proker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHOTO EDIT MODAL */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-white text-lg">
                {editingPhoto.id ? 'Sunting Foto Galeri' : 'Tambah Foto Dokumentasi Baru'}
              </h3>
              <button onClick={() => setEditingPhoto(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Judul Foto</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">URL Foto atau File Upload</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingPhoto.imageUrl || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, imageUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1 border border-slate-700">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setEditingPhoto({ ...editingPhoto, imageUrl: url }))}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-300 mb-1">Caption Foto</label>
                <textarea
                  rows={2}
                  value={editingPhoto.caption || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
