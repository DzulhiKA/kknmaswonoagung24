-- ========================================================
-- KKN MAS KELOMPOK 24 DESA WONOAGUNG - SUPABASE DATABASE SCHEMA
-- Jalankan skrip ini di SQL Editor pada Dashboard Supabase Anda
-- ========================================================

-- 1. Buat Tabel Utama site_data
CREATE TABLE IF NOT EXISTS public.site_data (
    id TEXT PRIMARY KEY DEFAULT 'kkn_wonoagung_data',
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.site_data ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan Read (Semua Pengunjung Website Bisa Membaca Data Landing Page)
CREATE POLICY "Public Read Access" 
ON public.site_data 
FOR SELECT 
USING (true);

-- 4. Kebijakan Write/Update (Izin Simpan Perubahan Data)
CREATE POLICY "Public Insert Access" 
ON public.site_data 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public Update Access" 
ON public.site_data 
FOR UPDATE 
USING (true);

-- ========================================================
-- INITIAL SEED DATA (DATA AWAL WEBSITE)
-- Insert data default jika tabel masih kosong
-- ========================================================
INSERT INTO public.site_data (id, data)
VALUES (
  'kkn_wonoagung_data',
  '{
    "home": {
      "heroTitle": "Membangun Desa Wonoagung Bersama KKN Mas Kelompok 24",
      "heroSubtitle": "Mengabdi dengan Hati, Menginspirasi dengan Aksi",
      "badgeText": "KKN Mas Kelompok 24 • 2024",
      "description": "Website resmi dokumentasi dan pusat informasi program kerja Kuliah Kerja Nyata (KKN) Mas Kelompok 24 di Desa Wonoagung, Kecamatan Kasembon, Kabupaten Malang.",
      "stats": {
        "prokerCount": 8,
        "memberCount": 14,
        "daysCount": 45,
        "benefitCount": 500
      },
      "heroImageUrl": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920",
      "primaryButtonText": "Lihat Program Kerja",
      "secondaryButtonText": "Galeri Kegiatan"
    },
    "members": [
      {
        "id": "1",
        "name": "Ahmad Rizky Pratama",
        "role": "Ketua Kelompok",
        "major": "Teknik Informatika",
        "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        "quote": "Kepemimpinan adalah tentang melayani dan tumbuh bersama masyarakat.",
        "socials": {
          "instagram": "https://instagram.com",
          "linkedin": "https://linkedin.com"
        }
      },
      {
        "id": "2",
        "name": "Siti Nur Halizah",
        "role": "Wakil Ketua",
        "major": "Administrasi Publik",
        "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        "quote": "Sinergi yang baik menghasilkan dampak yang nyata bagi Desa Wonoagung.",
        "socials": {
          "instagram": "https://instagram.com"
        }
      }
    ],
    "prokerList": [
      {
        "id": "1",
        "title": "Digitalisasi UMKM Keripik & Hasil Tani",
        "category": "Ekonomi & UMKM",
        "description": "Pendampingan pendaftaran NIB, pembuatan kemasan modern, serta pemasaran digital melalui marketplace bagi pelaku UMKM Desa Wonoagung.",
        "status": "Selesai",
        "date": "10 - 20 Agustus 2024",
        "location": "Balai Desa Wonoagung",
        "target": "30 Pelaku UMKM Desa",
        "imageUrl": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        "highlights": [
          "Pembuatan 25 NIB UMKM Gratis",
          "Pelatihan Foto Produk & Branding",
          "Pemasaran di Shopee & Tokopedia"
        ]
      }
    ],
    "socials": {
      "instagram": "https://instagram.com/kknmas.wonoagung24",
      "tiktok": "https://tiktok.com/@kknmas_wonoagung24",
      "youtube": "https://youtube.com/@kknmaswonoagung24",
      "email": "kknmas.wonoagung24@gmail.com",
      "whatsapp": "+6281234567890",
      "address": "Desa Wonoagung, Kecamatan Kasembon, Kabupaten Malang, Jawa Timur",
      "googleMapsUrl": "https://maps.google.com"
    },
    "photos": [
      {
        "id": "1",
        "title": "Pembukaan KKN Mas di Balai Desa",
        "category": "Seremonial",
        "date": "1 Agustus 2024",
        "imageUrl": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
        "caption": "Acara penerimaan dan pembukaan resmi program kerja KKN Mas Kelompok 24 oleh Perangkat Desa Wonoagung."
      }
    ],
    "afterMovie": {
      "title": "Aftermovie KKN Mas Kelompok 24 Desa Wonoagung",
      "description": "Rangkuman perjalanan 45 hari mengabdi, menginspirasi, dan menjalin kebersamaan hangat bersama warga Desa Wonoagung.",
      "youtubeEmbedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;
