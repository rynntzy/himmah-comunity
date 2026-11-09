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

// Helper to seed to reach 127 records with valid noWa
export function getSeededData() {
  const saved = localStorage.getItem('himmah_nwdi_registrations');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Pastikan field noWa ada pada data lama
        return parsed.map((item, idx) => ({
          ...item,
          noWa: item.noWa || `0812${String(10000000 + (item.id || idx)).slice(1)}`
        }));
      }
    } catch (e) {
      // ignore
    }
  }

  const prodis = ['Teknik Informatika', 'Sistem Informasi', 'Teknik Elektro', 'Teknik Mesin', 'Teknik Sipil'];
  const firstNames = ['Rizki', 'Farhan', 'Bayu', 'Dimas', 'Aditya', 'Galih', 'Yusuf', 'Ilham', 'Fikri', 'Hafiz', 'Nadia', 'Salma', 'Putri', 'Zahra', 'Rina', 'Mega', 'Sari', 'Indah', 'Fitri', 'Tiara'];
  const lastNames = ['Saputra', 'Ramadhan', 'Hidayat', 'Kurniawan', 'Pratama', 'Nugroho', 'Wibowo', 'Firmansyah', 'Santoso', 'Utomo', 'Wijaya', 'Siregar', 'Lestari', 'Rahmawati', 'Anggraini', 'Kusuma'];

  const extended = [...INITIAL_REGISTRATIONS];
  let currId = 13;

  const needed = [
    { name: 'Pemrograman Web', target: 48 - 4 },
    { name: 'Robotik', target: 37 - 4 },
    { name: 'Desain Grafis', target: 42 - 4 }
  ];

  needed.forEach(group => {
    for (let i = 0; i < group.target; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const prodi = prodis[Math.floor(Math.random() * prodis.length)];
      const sem = Math.floor(Math.random() * 8) + 1;
      const wapa = [2021, 2022, 2023, 2024, 2025][Math.floor(Math.random() * 5)];
      
      const day = Math.floor(Math.random() * 25) + 1;
      const hour = Math.floor(Math.random() * 12) + 8;
      const min = Math.floor(Math.random() * 60);
      const randomPhone = `08${[12, 13, 21, 52, 77, 81][Math.floor(Math.random() * 6)]}${Math.floor(1000000 + Math.random() * 9000000)}`;

      extended.push({
        id: currId++,
        nama: `${fn} ${ln}`,
        noWa: randomPhone,
        prodi,
        semester: sem,
        tahunWapa: wapa,
        kelas: [group.name],
        tanggalDaftar: `2025-10-${day < 10 ? '0' + day : day}T${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:00.000Z`
      });
    }
  });

  localStorage.setItem('himmah_nwdi_registrations', JSON.stringify(extended));
  return extended;
}
