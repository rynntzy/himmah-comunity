# PROJECT: HIMMAH NWDI KOM. TEKNIK

Buat website pendaftaran kelas khusus kader dengan nama **Himmah NWDI Kom. Teknik**.

## 1. Teknologi
- Frontend: React.js + Vite
- Styling: Tailwind CSS
- Backend: Node.js + Express.js
- Database: Supabase (PostgreSQL)
- Export Excel: ExcelJS

## 2. Halaman Utama (Kader)
Buat website dengan pendekatan **Mobile First**, responsif untuk HP, tablet, dan desktop.

Fitur:
- Header dengan identitas Himmah NWDI Kom. Teknik.
- Hero section dengan gambar dan deskripsi organisasi.
- Tampilkan tiga pilihan kelas dalam bentuk kartu:
  1. Pemrograman Web
  2. Robotik
  3. Desain Grafis
- Formulir pendaftaran berisi:
  - Nama lengkap
  - Program studi (Prodi)
  - Semester
  - Tahun WaPA
  - Pilihan kelas
- Tombol Daftar Sekarang.
- Validasi formulir dan notifikasi pendaftaran berhasil.

Kader boleh memilih satu kelas atau lebih.

## 3. Dashboard Admin
Buat halaman admin dengan fitur:
- Login admin.
- Statistik total pendaftar.
- Statistik pendaftar setiap kelas.
- Tabel seluruh data kader.
- Pencarian berdasarkan nama.
- Filter berdasarkan kelas, prodi, semester, dan tahun WaPA.
- Melihat detail dan menghapus data.
- Export data ke Excel (.xlsx).
- Logout.

Dashboard harus responsif dan nyaman digunakan melalui HP.

## 4. Database dan Keamanan
- Simpan seluruh data pendaftaran ke Supabase.
- Gunakan Supabase Auth untuk autentikasi admin.
- Gunakan Express API untuk komunikasi frontend dengan database.
- Terapkan validasi input.
- Lindungi seluruh endpoint admin.
- Jangan pernah mengekspos service role key atau kredensial rahasia ke frontend.
- Cegah pendaftaran ganda yang tidak disengaja.

## 5. Desain UI/UX
Gunakan referensi desain yang sudah diberikan.

Karakter desain:
- Warna utama hijau dan putih.
- Modern, minimalis, profesional, dan elegan.
- Tampilan bersih dengan card, rounded corners, dan typography yang jelas.
- Navigasi sederhana.
- Mobile First.
- Dashboard admin memiliki sidebar pada desktop dan navigasi yang sesuai untuk mobile.

## 6. Ketentuan Pengerjaan
- Buat struktur folder project yang rapi.
- Pisahkan frontend dan backend.
- Gunakan komponen React yang reusable.
- Jangan menggunakan data dummy sebagai pengganti database ketika integrasi sudah dilakukan.
- Buat file .env.example.
- Jangan mengubah atau menghapus fitur yang sudah berhasil tanpa alasan.
- Pastikan seluruh tombol dan fitur benar-benar berfungsi.

**Mulai dengan membangun frontend dan struktur project terlebih dahulu. Lanjutkan integrasi backend, database, dan dashboard admin secara bertahap. Uji setiap fitur sebelum melanjutkan ke tahap berikutnya.**