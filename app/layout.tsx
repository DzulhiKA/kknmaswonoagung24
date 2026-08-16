import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KKN Mas Kelompok 24 - Desa Wonoagung',
  description: 'Website Resmi Program KKN Mas Kelompok 24 Desa Wonoagung. Media informasi kegiatan, struktural tim, program kerja, dan galeri dokumentasi.',
  keywords: ['KKN Mas', 'Kelompok 24', 'Wonoagung', 'Kuliah Kerja Nyata'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="antialiased font-sans bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
