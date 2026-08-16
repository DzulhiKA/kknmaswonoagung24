export type ProkerCategory = 'Utama' | 'Selingan' | 'Kolaborasi';
export type ProkerStatus = 'Selesai' | 'Berlangsung' | 'Rencana';

export interface HomeConfig {
  heroTitle: string;
  heroTagline: string;
  heroImageUrl: string;
  location: string;
  period: string;
  introTitle: string;
  introText: string;
  vision: string;
  mission: string[];
  stats: {
    totalProker: number;
    totalAnggota: number;
    totalDusun: number;
    targetMasyarakat: string;
  };
}

export interface Member {
  id: string;
  name: string;
  role: string; // e.g. Ketua Kelompok, Sekretaris, Koordinator Acara
  division: string; // e.g. BPH, Divisi Acara, Divisi Humas & PDD, Divisi Logistik, Divisi Kesehatan
  university: string;
  major: string;
  avatarUrl: string;
  bio: string;
  instagramHandle?: string;
  activityDate?: string;
}

export interface Proker {
  id: string;
  title: string;
  category: ProkerCategory;
  description: string;
  outputs: string[]; // Luaran kegiatan
  status: ProkerStatus;
  pic: string; // Penanggung Jawab
  location: string;
  targetAudience: string;
  date: string;
}

export interface SocialLinks {
  instagram: string;
  instagramHandle: string;
  tiktok: string;
  tiktokHandle: string;
  youtube: string;
  youtubeChannel: string;
  email: string;
  whatsapp: string;
}

export interface DocumentationPhoto {
  id: string;
  title: string;
  imageUrl: string;
  prokerCategory: ProkerCategory;
  prokerTitle?: string;
  date: string;
  caption: string;
}

export interface AfterMovieConfig {
  title: string;
  youtubeEmbedUrl: string;
  youtubeWatchUrl: string;
  duration: string;
  description: string;
}

export interface AppData {
  home: HomeConfig;
  members: Member[];
  prokerList: Proker[];
  socials: SocialLinks;
  photos: DocumentationPhoto[];
  afterMovie: AfterMovieConfig;
}
