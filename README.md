<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a1b21336-cde8-4851-87a6-1f7f872cde5e

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Jalankan aplikasi untuk akses lokal:
   `npm run dev`

## Akses dari perangkat lain

### 1. Di jaringan lokal
- Jalankan `npm run dev`
- Buka alamat yang muncul, misalnya `http://192.168.x.x:3000`
- Perangkat lain di jaringan yang sama bisa membuka alamat tersebut

### 2. Mode produksi
- Jalankan `npm run build`
- Jalankan `npm run start`
- Aplikasi akan tersedia di `http://0.0.0.0:3000`

### 3. Agar bisa diakses dari mana saja (internet)
- Deploy ke layanan seperti Vercel, Netlify, Render, atau VPS
- Pastikan port yang dipakai terbuka dan domain mengarah ke server Anda
