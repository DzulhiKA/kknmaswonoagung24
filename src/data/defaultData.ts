import { AppData } from '../types';

export const INITIAL_APP_DATA: AppData = {
  home: {
    heroTitle: 'KKN MAs Kelompok 24',
    heroTagline: 'Pemberdayaan Masyarakat Berkelanjutan Melalui Inovasi, Edukasi, dan Kolaborasi Desa',
    heroImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920',
    location: 'Desa Wonoagung, Kasembon, Kabupaten Malang',
    period: '1 Agustus - 12 September 2026',
    introTitle: 'Mengenal KKN Muhammadiyah \'Aisyiyah (KKN MAs)',
    introText: 'Kuliah Kerja Nyata Muhammadiyah \'Aisyiyah (KKN MAs) merupakan program pengabdian masyarakat lintas perguruan tinggi Muhammadiyah dan \'Aisyiyah se-Indonesia. Kelompok 24 hadir di Desa Wonoagung untuk mendampingi warga dalam penguatan potensi lokal, digitalisasi UMKM, pola hidup sehat bebas stunting, serta pelestarian lingkungan desa.',
    vision: 'Mewujudkan Desa Wonoagung yang mandiri, sehat, berkemajuan, dan berdaya saing melalui sinergi mahasiswa dan masyarakat.',
    mission: [
      'Mendorong optimalisasi potensi ekonomi lokal dan UMKM Desa Wonoagung.',
      'Meningkatkan derajat kesehatan ibu dan anak melalui gerakan pencegahan stunting.',
      'Mengembangkan ruang literasi digital dan bimbingan belajar untuk anak-anak desa.',
      'Mempererat silaturahmi serta kebudayaan gotong royong warga melalui kegiatan kolaboratif.'
    ],
    stats: {
      totalProker: 8,
      totalAnggota: 14,
      totalDusun: 5,
      targetMasyarakat: '1.200+ Warga'
    }
  },
  members: [
    {
      id: 'mem-1',
      name: 'Oktafiyan Hilal Akmal',
      role: 'Ketua Kelompok',
      division: 'Badan Pengurus Harian (BPH)',
      university: 'Universitas Muhammadiyah Surabaya',
      major: 'Teknik',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'Memimpin sinergi tim, koordinasi dengan kepala desa dan mitra lokal untuk keberlanjutan seluruh program pengabdian.',
      instagramHandle: '@oktafiyan.hilal',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-2',
      name: 'Alifah Nur Azizah',
      role: 'Sekertaris',
      division: 'Badan Pengurus Harian (BPH)',
      university: 'Universitas Muhammadiyah Gombong',
      major: 'Kesehatan',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Mengelola persuratan, notulensi rapat, serta administrasi KKN MAs Kelompok 24.',
      instagramHandle: '@alifah.nurazizah',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-3',
      name: 'Baiq Lutfia Safhira',
      role: 'Sekretaris',
      division: 'Badan Pengurus Harian (BPH)',
      university: 'Universitas Muhammadiyah Mataram',
      major: 'Hukum',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      bio: 'Bertanggung jawab atas penyusunan berkas resmi, pelaporan proposal, dan LPJ KKN MAs Kelompok 24.',
      instagramHandle: '@baiqlutfia',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-4',
      name: 'Deskia Adelia',
      role: 'Bendahara',
      division: 'Badan Pengurus Harian (BPH)',
      university: 'Universitas Muhammadiyah Bone',
      major: 'Ekonomi & Bisnis',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      bio: 'Mengelola anggaran kegiatan, transparansi keuangan, dan alokasi dana pendampingan program kerja.',
      instagramHandle: '@deskia.adelia',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-5',
      name: 'Selva Dea Vinata',
      role: 'Acara',
      division: 'Divisi Acara & Program',
      university: 'Universitas Muhammadiyah Surakarta',
      major: 'Pendidikan',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      bio: 'Merancang rundown, alur pelaksanaan sosialisasi, bimbel, dan panggung malam puncak festival desa.',
      instagramHandle: '@selvadea',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-6',
      name: 'Muhammad Adistya Nurfauzian',
      role: 'Acara',
      division: 'Divisi Acara & Program',
      university: 'Universitas Muhammadiyah Bandung',
      major: 'Komunikasi',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      bio: 'Koordinasi acara lapangan, bimbingan belajar anak-anak desa, dan festival kemasyarakatan.',
      instagramHandle: '@adistya.nurfauzian',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-7',
      name: 'Fikri Ardhan Putra Pratama',
      role: 'Humas',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Universitas Muhammadiyah Malang',
      major: 'Informatika',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      bio: 'Menghubungkan tim KKN dengan pihak desa, mengelola publikasi program kerja, dan media informasi.',
      instagramHandle: '@fikriardhan01',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-8',
      name: 'Azzahra Cantika',
      role: 'Humas',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Universitas Muhammadiyah Pekajangan Pekalongan',
      major: 'Ilmu Komunikasi',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'Pendampingan sosialisasi masyarakat, komunikasi dengan tokoh warga, dan pembuatan konten humas.',
      instagramHandle: '@azzahracantika',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-9',
      name: 'Shava Kaisha',
      role: 'Humas',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Universitas Muhammadiyah Malang',
      major: 'Psikologi',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
      bio: 'Menjaga keharmonisan hubungan kemasyarakatan dan pengelolaan publikasi kegiatan KKN.',
      instagramHandle: '@shavakaisha',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-10',
      name: 'Rizky Yulistyo',
      role: 'PDD',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Universitas Ahmad Dahlan',
      major: 'Desain Komunikasi Visual',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
      bio: 'Dokumentasi foto/video, pembuatan After Movie, desain poster, serta identitas visual kegiatan KKN MAs 24.',
      instagramHandle: '@rizky.yulistyo',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-11',
      name: 'Naila Kamilah',
      role: 'PDD',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Universitas Muhammadiyah Bone',
      major: 'Komunikasi & Publikasi',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Dokumentasi kegiatan lapangan, publikasi media, dan pengerjaan konten visual KKN.',
      instagramHandle: '@naila.kamilah',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-12',
      name: 'Hayatun Kamilah',
      role: 'PDD',
      division: 'Divisi Humas, Publikasi & Dokumentasi',
      university: 'Politeknik Aisyiyah Pontianak',
      major: 'Desain & Publikasi',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      bio: 'Dokumentasi serta pubdok kegiatan harian dan desain publikasi program kerja KKN MAs.',
      instagramHandle: '@hayatun.kamilah',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-13',
      name: 'Reja Pratama Ramadhanti',
      role: 'Perlengkapan',
      division: 'Divisi Logistik & Perlengkapan',
      university: 'Universitas Muhammadiyah Kuningan',
      major: 'Teknik',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'Menyiapkan sarana prasarana, logistik perlengkapan posko, dan kebutuhan alat program kerja.',
      instagramHandle: '@reja.pratama',
      activityDate: '1 Agt - 12 Sep 2026'
    },
    {
      id: 'mem-14',
      name: 'Lidya Hartika',
      role: 'Perlengkapan',
      division: 'Divisi Logistik & Perlengkapan',
      university: 'Universitas Muhammadiyah Bone',
      major: 'Logistik & Operasional',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      bio: 'Pengelolaan inventarisasi perlengkapan, operasional posko, dan persiapan teknis acara.',
      instagramHandle: '@lidya.hartika',
      activityDate: '1 Agt - 12 Sep 2026'
    }
  ],
  prokerList: [
    {
      id: 'proker-1',
      title: 'Digitalisasi UMKM & Pelatihan Branding Produk Desa',
      category: 'Utama',
      description: 'Pendampingan pembuatan Google Maps Business, pendaftaran QRIS, branding kemasan, dan foto produk gratis bagi 25 pelaku UMKM keripik dan olahan susu di Desa Wonoagung.',
      outputs: [
        '25 akun UMKM terverifikasi di Google Maps',
        'Buku katalog digital produk Desa Wonoagung',
        'Kemasan produk berstandar dengan stiker label modern'
      ],
      status: 'Berlangsung',
      pic: 'Anisa Rahmawati & Bagus Setiawan',
      location: 'Balai Desa Wonoagung',
      targetAudience: 'Pelaku UMKM lokal',
      date: '10 - 20 Agustus 2026'
    },
    {
      id: 'proker-2',
      title: 'Gerakan Cegah Stunting: Demo Masak PMT Balita Nutrisi Tinggi',
      category: 'Utama',
      description: 'Penyuluhan gizi seimbang untuk ibu hamil dan ibu balita, disertai praktik membuat Makanan Pendamping ASI (PMT) kaya protein berbasis bahan lokal seperti kelor dan ikan lele.',
      outputs: [
        'Modul resep sehat cegah stunting berbasis olahan lokal',
        'Paket bahan PMT sehat bagi 40 ibu balita',
        'Pemeriksaan berat dan tinggi badan balita gratis'
      ],
      status: 'Selesai',
      pic: 'Fitriani Ningsih',
      location: 'Posyandu Dusun Krajan',
      targetAudience: 'Ibu Hamil & Ibu Balita',
      date: '5 Agustus 2026'
    },
    {
      id: 'proker-3',
      title: 'Pemberdayaan Bank Sampah & Pengolahan Compost Organik',
      category: 'Utama',
      description: 'Edukasi pemilahan sampah organik dan anorganik dari rumah tangga, serta pembuatan komposter sederhana memanfaatkan ember bekas untuk pupuk tanaman pekarangan.',
      outputs: [
        '15 unit komposter rumah tangga yang beroperasional',
        'Sistem pencatatan tabungan sampah desa',
        'Panduan infografis pemilahan sampah mandiri'
      ],
      status: 'Rencana',
      pic: 'Muhammad Farhan',
      location: 'Dusun Semanding',
      targetAudience: 'Ibu-Ibu PKK & Kader Lingkungan',
      date: '25 Agustus 2026'
    },
    {
      id: 'proker-4',
      title: 'Bimbingan Belajar "Rumah Cerdas KKN 24" & Literasi Digital',
      category: 'Selingan',
      description: 'Program bimbingan belajar gratis untuk anak SD-SMP mencakup Matematika, Bahasa Inggris dasar, dan penggunaan internet sehat serta edukasi cegah cyberbullying.',
      outputs: [
        'Modul pembelajaran interaktif anak',
        'Sudut baca mini posko KKN dengan 150+ buku donasi',
        'Peningkatan minat belajar dan keterampilan komputer dasar'
      ],
      status: 'Berlangsung',
      pic: 'Dewi Lestari & Ahmad Rizky',
      location: 'Posko KKN MAs Kelompok 24',
      targetAudience: 'Anak-Anak SD & SMP Desa',
      date: 'Setiap Senin, Rabu, Jumat'
    },
    {
      id: 'proker-5',
      title: 'Senam Sehat Ceria & Pemeriksaan Kesehatan Gratis',
      category: 'Selingan',
      description: 'Kegiatan senam bersama warga setiap akhir pekan dilanjutkan dengan cek tekanan darah, gula darah, dan asam urat bagi lansia secara cuma-cuma.',
      outputs: [
        'Terperiksanya kesehatan 80+ warga lansia',
        'Peningkatan kesadaran pola hidup aktif warga desa'
      ],
      status: 'Berlangsung',
      pic: 'Fitriani Ningsih & Diki Chandra',
      location: 'Lapang Serbaguna Desa',
      targetAudience: 'Masyarakat Umum & Lansia',
      date: 'Setiap Minggu Pagi'
    },
    {
      id: 'proker-6',
      title: 'Pendampingan TPA / TPQ & Lomba Santri Cilik',
      category: 'Selingan',
      description: 'Membantu mengajar mengaji, tajwid, dan adab harian di masjid desa, diakhiri dengan lomba azan, mewarnai kaligrafi, dan hafalan surah pendek.',
      outputs: [
        '60+ santri cilik terlatih tajwid dan hafalan',
        'Penyerahan hadiah piala & perlengkapan sekolah santri'
      ],
      status: 'Selesai',
      pic: 'Siti Nurhaliza',
      location: 'Masjid Al-Ikhlas Sumbersekar',
      targetAudience: 'Santri TPQ Masjid Desa',
      date: '8 - 14 Agustus 2026'
    },
    {
      id: 'proker-7',
      title: 'Festival Desa & Pameran Karya UMKM (Malam Puncak)',
      category: 'Kolaborasi',
      description: 'Malam panggung seni budaya gotong royong, pentas tari tradisional anak-anak, pameran produk hasil pendampingan UMKM, dan pembagian piala lomba HUT RI.',
      outputs: [
        'Pentas budaya rakyat yang melibatkan 300+ penonton',
        'Stand pameran produk UMKM lokal beromset meningkat',
        'Penyerahan cinderamata kenang-kenangan untuk desa'
      ],
      status: 'Rencana',
      pic: 'Seluruh Anggota KKN & Karang Taruna',
      location: 'Halaman Gedung Olahraga Desa',
      targetAudience: 'Seluruh Warga Desa Wonoagung',
      date: '1 September 2026'
    },
    {
      id: 'proker-8',
      title: 'Gotong Royong Kebersihan Lingkungan & Penghijauan Desa',
      category: 'Kolaborasi',
      description: 'Aksi bersih desa bersama perangkat desa, Karang Taruna, dan warga setempat, disertai penanaman 100 bibit pohon buah di area fasilitas umum.',
      outputs: [
        '100 bibit tanaman buah terpasang di area publik desa',
        'Kebersihan saluran air menjelang musim hujan'
      ],
      status: 'Selesai',
      pic: 'Diki Chandra & Karang Taruna',
      location: 'Jalan Utama & Fasilitas Desa',
      targetAudience: 'Warga Desa & Pemuda Karang Taruna',
      date: '12 Agustus 2026'
    },
    {
      id: 'proker-9',
      title: 'Pelatihan Administrasi Digital & Surat Desa',
      category: 'Kolaborasi',
      description: 'Sesi berbagi dengan perangkat desa mengenai optimalisasi Microsoft Excel untuk rekapitulasi kependudukan dan pembuatan templat surat otomatis.',
      outputs: [
        'Templat digital administrasi pelayanan desa',
        'Perangkat desa terampil mengelola database kependudukan'
      ],
      status: 'Selesai',
      pic: 'Rian Hidayat & Siti Nurhaliza',
      location: 'Kantor Balai Desa',
      targetAudience: 'Perangkat & Staf Kantor Desa',
      date: '15 Agustus 2026'
    }
  ],
  socials: {
    instagram: 'https://instagram.com/kknmas.kelompok24',
    instagramHandle: '@kknmas.kelompok24',
    tiktok: 'https://tiktok.com/@kknmas.kelompok24',
    tiktokHandle: '@kknmas.kelompok24',
    youtube: 'https://youtube.com/@kknmas24official',
    youtubeChannel: 'KKN MAs Kelompok 24 Official',
    email: 'kknmas.kelompok24@gmail.com',
    whatsapp: '6281234567890'
  },
  photos: [
    {
      id: 'photo-1',
      title: 'Sosialisasi Pencegahan Stunting',
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Utama',
      prokerTitle: 'Gerakan Cegah Stunting: Demo Masak PMT Balita',
      date: '5 Agustus 2026',
      caption: 'Kader posyandu dan ibu-ibu balita antusias menyimak pemaparan menu makanan bergizi berbasis pangan lokal.'
    },
    {
      id: 'photo-2',
      title: 'Pelatihan Foto Produk UMKM Desa',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Utama',
      prokerTitle: 'Digitalisasi UMKM & Pelatihan Branding',
      date: '11 Agustus 2026',
      caption: 'Proses pendampingan foto katalog produk makanan ringan UMKM Desa Wonoagung mengggunakan mini studio lipat.'
    },
    {
      id: 'photo-3',
      title: 'Suasana Rumah Cerdas Bimbingan Belajar',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Selingan',
      prokerTitle: 'Bimbingan Belajar "Rumah Cerdas KKN 24"',
      date: '8 Agustus 2026',
      caption: 'Anak-anak sekolah dasar belajar Matematika dan Bahasa Inggris secara interaktif bersama mahasiswa KKN.'
    },
    {
      id: 'photo-4',
      title: 'Senam Sehat Bersama Lansia',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Selingan',
      prokerTitle: 'Senam Sehat Ceria & Cek Kesehatan',
      date: '10 Agustus 2026',
      caption: 'Kecerian warga saat mengikuti senam kebugaran jasmani di lapangan balai desa pada hari Minggu pagi.'
    },
    {
      id: 'photo-5',
      title: 'Aksi Bersih Lingkungan & Penghijauan',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Kolaborasi',
      prokerTitle: 'Gotong Royong Kebersihan Lingkungan',
      date: '12 Agustus 2026',
      caption: 'Sinergi tim KKN bersama Karang Taruna melakukan penanaman bibit buah di area hijau fasilitas umum.'
    },
    {
      id: 'photo-6',
      title: 'Mengajar Mengaji di TPQ Masjid',
      imageUrl: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Selingan',
      prokerTitle: 'Pendampingan TPA / TPQ',
      date: '13 Agustus 2026',
      caption: 'Mahasiswa KKN mendampingi santri cilik dalam melancarkan tajwid dan hafalan surah-surah pendek.'
    },
    {
      id: 'photo-7',
      title: 'Pendaftaran QRIS dan Merchant UMKM',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67d268d09e?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Utama',
      prokerTitle: 'Digitalisasi UMKM & Pelatihan Branding',
      date: '14 Agustus 2026',
      caption: 'Pendampingan pendaftaran pembayaran nontunai QRIS bagi toko kelontong dan pembuat olahan susu.'
    },
    {
      id: 'photo-8',
      title: 'Rapat Koordinasi Bersama Kepala Desa',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
      prokerCategory: 'Kolaborasi',
      prokerTitle: 'Pelatihan Administrasi Digital Desa',
      date: '3 Agustus 2026',
      caption: 'Sesi penerimaan resmi dan diskusi rencana strategi pelaksanaan program kerja KKN MAs bersama jajaran perangkat desa.'
    }
  ],
  afterMovie: {
    title: 'After Movie KKN MAs Kelompok 24 - Jejak Pengabdian Desa Wonoagung',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Default playable video placeholder
    youtubeWatchUrl: 'https://www.youtube.com/watch?dQw4w9WgXcQ',
    duration: '04:25',
    description: 'Video dokumentasi sinematik rekapitulasi seluruh momentum hangat, senyuman warga, kerja keras program kerja, dan kebersamaan mahasiswa KKN MAs Kelompok 24 selama mengabdi di Desa Wonoagung.'
  }
};
