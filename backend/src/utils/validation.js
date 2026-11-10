/**
 * Validasi input pendaftaran kader.
 * Mengembalikan objek { valid: boolean, errors: string[] }
 */
export function validateRegistration(body) {
  const errors = [];

  // Nama lengkap
  if (!body.nama || typeof body.nama !== 'string' || body.nama.trim().length < 3) {
    errors.push('Nama lengkap wajib diisi (minimal 3 karakter).');
  }

  // No. WhatsApp
  if (!body.noWa || typeof body.noWa !== 'string') {
    errors.push('Nomor WhatsApp wajib diisi.');
  } else {
    const cleanWa = body.noWa.replace(/\D/g, '');
    if (cleanWa.length < 10 || cleanWa.length > 14) {
      errors.push('Nomor WhatsApp tidak valid (10-14 digit angka).');
    }
  }

  // Program Studi
  const validProdi = [
    'Teknik Informatika',
    'Sistem Informasi',
    'Teknik Elektro',
    'Teknik Mesin',
    'Teknik Sipil',
    'Teknik Lingkungan',
  ];
  if (!body.prodi || !validProdi.includes(body.prodi)) {
    errors.push(`Program Studi harus salah satu dari: ${validProdi.join(', ')}.`);
  }

  // Semester
  const semester = Number(body.semester);
  if (!semester || semester < 1 || semester > 8 || !Number.isInteger(semester)) {
    errors.push('Semester harus angka bulat antara 1-8.');
  }

  // Tahun WaPA
  const tahunWapa = Number(body.tahunWapa);
  if (!tahunWapa || tahunWapa < 2018 || tahunWapa > 2030) {
    errors.push('Tahun WaPA harus angka antara 2018-2030.');
  }

  // Kelas / Komunitas pilihan
  const validKelas = ['Pemrograman Web', 'Robotik', 'Desain Grafis'];
  if (!body.kelas || !Array.isArray(body.kelas) || body.kelas.length === 0) {
    errors.push('Pilih minimal satu komunitas.');
  } else {
    const invalidKelas = body.kelas.filter((k) => !validKelas.includes(k));
    if (invalidKelas.length > 0) {
      errors.push(`Komunitas tidak valid: ${invalidKelas.join(', ')}.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
