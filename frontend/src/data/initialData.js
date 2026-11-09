export const INITIAL_REGISTRATIONS = [
  {
    id: 1,
    nama: 'Ahmad Rizki',
    noWa: '081234567801',
    prodi: 'Teknik Informatika',
    semester: 5,
    tahunWapa: 2024,
    kelas: ['Pemrograman Web'],
    tanggalDaftar: '2025-10-28T14:30:00.000Z'
  },
  {
    id: 2,
    nama: 'Siti Nurhaliza',
    noWa: '082198765402',
    prodi: 'Sistem Informasi',
    semester: 3,
    tahunWapa: 2024,
    kelas: ['Robotik'],
    tanggalDaftar: '2025-10-28T14:20:00.000Z'
  },
  {
    id: 3,
    nama: 'Muhammad Fajar',
    noWa: '085234567803',
    prodi: 'Teknik Elektro',
    semester: 7,
    tahunWapa: 2024,
    kelas: ['Desain Grafis'],
    tanggalDaftar: '2025-10-28T13:50:00.000Z'
  },
  {
    id: 4,
    nama: 'Nurul Hidayah',
    noWa: '087765432104',
    prodi: 'Teknik Informatika',
    semester: 5,
    tahunWapa: 2024,
    kelas: ['Pemrograman Web'],
    tanggalDaftar: '2025-10-28T13:45:00.000Z'
  },
  {
    id: 5,
    nama: 'Hasan Basri',
    noWa: '081398765405',
    prodi: 'Teknik Mesin',
    semester: 1,
    tahunWapa: 2025,
    kelas: ['Robotik'],
    tanggalDaftar: '2025-10-28T13:30:00.000Z'
  },
  {
    id: 6,
    nama: 'Aisyah Putri',
    noWa: '085312345606',
    prodi: 'Sistem Informasi',
    semester: 3,
    tahunWapa: 2024,
    kelas: ['Desain Grafis'],
    tanggalDaftar: '2025-10-28T13:20:00.000Z'
  },
  {
    id: 7,
    nama: 'M. Iqbal',
    noWa: '082234567807',
    prodi: 'Teknik Informatika',
    semester: 7,
    tahunWapa: 2024,
    kelas: ['Pemrograman Web'],
    tanggalDaftar: '2025-10-28T12:55:00.000Z'
  },
  {
    id: 8,
    nama: 'Fatimah Zahra',
    noWa: '087812345608',
    prodi: 'Teknik Elektro',
    semester: 5,
    tahunWapa: 2024,
    kelas: ['Robotik'],
    tanggalDaftar: '2025-10-28T12:40:00.000Z'
  },
  {
    id: 9,
    nama: 'Budi Santoso',
    noWa: '081987654309',
    prodi: 'Teknik Sipil',
    semester: 3,
    tahunWapa: 2023,
    kelas: ['Desain Grafis'],
    tanggalDaftar: '2025-10-28T11:30:00.000Z'
  },
  {
    id: 10,
    nama: 'Rian Maulana',
    noWa: '085712345610',
    prodi: 'Teknik Informatika',
    semester: 5,
    tahunWapa: 2024,
    kelas: ['Pemrograman Web', 'Robotik'],
    tanggalDaftar: '2025-10-28T11:15:00.000Z'
  },
  {
    id: 11,
    nama: 'Zainal Abidin',
    noWa: '082345678911',
    prodi: 'Teknik Mesin',
    semester: 3,
    tahunWapa: 2024,
    kelas: ['Robotik'],
    tanggalDaftar: '2025-10-28T10:45:00.000Z'
  },
  {
    id: 12,
    nama: 'Dewi Lestari',
    noWa: '081298765412',
    prodi: 'Sistem Informasi',
    semester: 1,
    tahunWapa: 2025,
    kelas: ['Desain Grafis'],
    tanggalDaftar: '2025-10-28T09:20:00.000Z'
  }
];

// Helper untuk mengambil data awal fallback jika backend offline
export function getSeededData() {
  const saved = localStorage.getItem('himmah_nwdi_registrations');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item, idx) => ({
          ...item,
          noWa: item.noWa || `0812${String(10000000 + (item.id || idx)).slice(1)}`
        }));
      }
    } catch (e) {
      // ignore
    }
  }

  return INITIAL_REGISTRATIONS;
}
