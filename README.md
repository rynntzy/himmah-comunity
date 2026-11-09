# HIMMAH NWDI KOM. TEKNIK - SISTEM PENDAFTARAN KELAS KHUSUS KADER

Aplikasi web modern berbasis **Mobile First** untuk pendaftaran kelas khusus kader dan manajemen data organisasi Himmah NWDI Komisariat Teknik.

---

## 1. Arsitektur & Teknologi

- **Frontend:** React.js 18 + Vite + Tailwind CSS + Lucide Icons + Canvas Confetti
- **Backend:** Node.js + Express.js (ES Module) + Helmet + CORS + Rate Limiter
- **Database:** Supabase (PostgreSQL) + Row Level Security (RLS)
- **Autentikasi:** Supabase Auth + JWT Session
- **Export Data:** ExcelJS (.xlsx) dengan styling warna identitas Himmah NWDI

---

## 2. Struktur Proyek

```text
choises-kader/
├── prd.md                      # Product Requirement Document
├── README.md                   # Dokumentasi instalasi & arsitektur
├── .env.example                # Template konfigurasi environment root
├── backend/                    # Server Express.js
│   ├── .env.example
│   ├── package.json
│   ├── schema.sql              # Skema SQL tabel PostgreSQL & RLS Supabase
│   └── src/
│       ├── server.js           # Entrypoint Express server
│       ├── config/
│       │   ├── env.js          # Manajemen environment variables
│       │   └── supabase.js     # Client Supabase (Anon & Service Role)
│       ├── middleware/
│       │   └── auth.js         # Verifikasi JWT & proteksi endpoint admin
│       ├── routes/
│       │   ├── auth.js         # Endpoint login & auth admin
│       │   ├── registrations.js# Endpoint publik pendaftaran kader
│       │   ├── admin.js        # Endpoint CRUD admin & Export Excel (ExcelJS)
│       │   └── settings.js     # Endpoint CMS pengaturan tampilan
│       └── utils/
│           └── validation.js   # Validasi data pendaftaran
└── frontend/                   # Client React.js
    ├── .env.example
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx             # State orchestration
        ├── services/
        │   └── api.js          # API Client komunikasi ke backend
        ├── data/
        │   ├── initialData.js  # Data seed awal
        │   └── siteConfig.js   # Pengaturan default CMS
        └── components/
            ├── Header.jsx
            ├── HeroSection.jsx
            ├── ClassSelectionSection.jsx
            ├── RegistrationForm.jsx
            ├── AdminDashboard.jsx
            ├── WebsiteCustomizer.jsx
            └── ...
```

---

## 3. Langkah Menjalankan Proyek

### A. Menjalankan Frontend
```bash
cd frontend
npm install
npm run dev
```
Akses di browser: `http://localhost:5174/`

### B. Menjalankan Backend
```bash
cd backend
npm install
npm run dev # atau: node src/server.js
```
API Server aktif di: `http://localhost:5000`

---

## 4. Setup Database Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka menu **SQL Editor**, buka file `backend/schema.sql`, salin seluruh kodenya dan klik **Run**.
3. Buka **Project Settings** -> **API**, salin:
   - `Project URL` -> masukkan ke `SUPABASE_URL` di `backend/.env`
   - `anon public key` -> masukkan ke `SUPABASE_ANON_KEY` di `backend/.env`
   - `service_role secret` -> masukkan ke `SUPABASE_SERVICE_ROLE_KEY` di `backend/.env`
4. Untuk login admin, buat user admin di **Authentication** -> **Users** pada dashboard Supabase.

---

## 5. Fitur Utama

1. **Halaman Kader (Mobile-First):**
   - Hero banner dengan identitas visual NWDI Kom. Teknik.
   - Pilihan kelas khusus (*Pemrograman Web, Robotik, Desain Grafis*).
   - Formulir pendaftaran lengkap dengan validasi **Nama, No. WhatsApp, Prodi, Semester, Tahun WaPA, dan Kelas Pilihan**.
   - Animasi confetti & modal konfirmasi sukses pendaftaran.
2. **Dashboard Admin:**
   - 4 Card statistik pendaftar dengan persentase pertumbuhan.
   - **CRUD Data Kader Penuh:** Tambah kader manual, edit data kader, lihat detail profil lengkap, dan hapus pendaftar.
   - **Tautan WhatsApp Langsung:** Chat kader sekali klik melalui tautan `wa.me`.
   - **Pencarian & Multi-Filter:** Filter berdasarkan Kelas, Prodi, Semester, dan Tahun WaPA serta pencarian nama / no WA.
   - **Export Excel (.xlsx):** Download file spreadsheet menggunakan library **ExcelJS** di sisi server (dengan fallback client).
3. **Content Management System (CMS):**
   - Admin dapat mengunggah foto gedung/sekretariat baru.
   - Admin dapat menambah/mengedit kelas dan mengunggah gambar thumbnail kelas.
   - Admin dapat mengunggah foto kader/dokumentasi kegiatan dan mengubah slogan organisasi.
   - Mengatur kontak WhatsApp dan tautan media sosial resmi.
