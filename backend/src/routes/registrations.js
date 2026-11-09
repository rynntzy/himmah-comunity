import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { validateRegistration } from '../utils/validation.js';

const router = Router();

/**
 * POST /api/registrations
 * Endpoint publik – kader mendaftar kelas khusus.
 * Mencegah pendaftaran ganda berdasarkan nama + noWa + kelas yang sama.
 */
router.post('/', async (req, res) => {
  try {
    const { valid, errors } = validateRegistration(req.body);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: 'Validasi gagal.',
        errors,
      });
    }

    const { nama, noWa, prodi, semester, tahunWapa, kelas } = req.body;
    const namaClean = nama.trim();
    const noWaClean = noWa.trim();

    // --- Cegah pendaftaran ganda (nama + noWa sama dalam rentang 5 menit) ---
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { data: recentDups } = await supabaseAdmin
      .from('registrations')
      .select('id')
      .eq('nama', namaClean)
      .eq('no_wa', noWaClean)
      .gte('created_at', fiveMinAgo)
      .limit(1);

    if (recentDups && recentDups.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Data Anda sudah terdaftar dalam beberapa menit terakhir. Jika ini bukan kesalahan, silakan tunggu 5 menit.',
      });
    }

    // --- Simpan ke database ---
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .insert({
        nama: namaClean,
        no_wa: noWaClean,
        prodi,
        semester: Number(semester),
        tahun_wapa: Number(tahunWapa),
        kelas,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Gagal menyimpan data pendaftaran.',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil!',
      data: formatRegistration(data),
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
});

/**
 * Format data dari snake_case Supabase ke camelCase untuk frontend.
 */
function formatRegistration(row) {
  return {
    id: row.id,
    nama: row.nama,
    noWa: row.no_wa,
    prodi: row.prodi,
    semester: row.semester,
    tahunWapa: row.tahun_wapa,
    kelas: row.kelas,
    tanggalDaftar: row.created_at,
  };
}

export { formatRegistration };
export default router;
