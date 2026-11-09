import { Router } from 'express';
import ExcelJS from 'exceljs';
import { supabaseAdmin } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';
import { validateRegistration } from '../utils/validation.js';
import { formatRegistration } from './registrations.js';

const router = Router();

// Semua endpoint di bawah ini dilindungi oleh middleware admin
router.use(requireAdmin);

/**
 * GET /api/admin/registrations
 * Ambil seluruh data pendaftar dengan filter & pencarian opsional.
 * Query params: search, kelas, prodi, semester, tahunWapa, page, limit
 */
router.get('/registrations', async (req, res) => {
  try {
    const {
      search,
      kelas,
      prodi,
      semester,
      tahunWapa,
      page = 1,
      limit = 50,
    } = req.query;

    let query = supabaseAdmin
      .from('registrations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Filter: pencarian nama atau no WA
    if (search) {
      query = query.or(`nama.ilike.%${search}%,no_wa.ilike.%${search}%`);
    }

    // Filter: kelas (mengecek array yang mengandung value)
    if (kelas && kelas !== 'Semua Kelas') {
      query = query.contains('kelas', [kelas]);
    }

    // Filter: prodi
    if (prodi && prodi !== 'Semua Prodi') {
      query = query.eq('prodi', prodi);
    }

    // Filter: semester
    if (semester && semester !== 'Semua Semester') {
      const semNum = parseInt(String(semester).replace(/\D/g, ''));
      if (semNum >= 1 && semNum <= 8) {
        query = query.eq('semester', semNum);
      }
    }

    // Filter: tahun WaPA
    if (tahunWapa && tahunWapa !== 'Semua Tahun') {
      query = query.eq('tahun_wapa', Number(tahunWapa));
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const offset = (pageNum - 1) * limitNum;

    query = query.range(offset, offset + limitNum - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase query error:', error.message);
      return res.status(500).json({ success: false, message: 'Gagal mengambil data.' });
    }

    return res.json({
      success: true,
      data: (data || []).map(formatRegistration),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error('Admin registrations error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * GET /api/admin/registrations/stats
 * Statistik jumlah pendaftar per kelas.
 */
router.get('/registrations/stats', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select('kelas');

    if (error) {
      return res.status(500).json({ success: false, message: 'Gagal mengambil statistik.' });
    }

    let total = data.length;
    let web = 0;
    let robotics = 0;
    let design = 0;

    data.forEach((row) => {
      const classList = Array.isArray(row.kelas) ? row.kelas : [];
      if (classList.includes('Pemrograman Web')) web++;
      if (classList.includes('Robotik')) robotics++;
      if (classList.includes('Desain Grafis')) design++;
    });

    return res.json({
      success: true,
      data: { total, web, robotics, design },
    });
  } catch (err) {
    console.error('Stats error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * GET /api/admin/registrations/:id
 * Detail satu pendaftar berdasarkan ID.
 */
router.get('/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: 'Data pendaftar tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      data: formatRegistration(data),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * POST /api/admin/registrations
 * Admin menambahkan data pendaftar secara manual.
 */
router.post('/registrations', async (req, res) => {
  try {
    const { valid, errors } = validateRegistration(req.body);

    if (!valid) {
      return res.status(400).json({ success: false, message: 'Validasi gagal.', errors });
    }

    const { nama, noWa, prodi, semester, tahunWapa, kelas } = req.body;

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .insert({
        nama: nama.trim(),
        no_wa: noWa.trim(),
        prodi,
        semester: Number(semester),
        tahun_wapa: Number(tahunWapa),
        kelas,
      })
      .select()
      .single();

    if (error) {
      console.error('Admin insert error:', error.message);
      return res.status(500).json({ success: false, message: 'Gagal menambahkan data.' });
    }

    return res.status(201).json({
      success: true,
      message: 'Data pendaftar berhasil ditambahkan.',
      data: formatRegistration(data),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * PUT /api/admin/registrations/:id
 * Admin mengubah data pendaftar.
 */
router.put('/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, noWa, prodi, semester, tahunWapa, kelas } = req.body;

    // Cek apakah data ada
    const { data: existing, error: findErr } = await supabaseAdmin
      .from('registrations')
      .select('id')
      .eq('id', id)
      .single();

    if (findErr || !existing) {
      return res.status(404).json({ success: false, message: 'Data pendaftar tidak ditemukan.' });
    }

    // Bangun objek update hanya field yang dikirim
    const updates = {};
    if (nama !== undefined) updates.nama = nama.trim();
    if (noWa !== undefined) updates.no_wa = noWa.trim();
    if (prodi !== undefined) updates.prodi = prodi;
    if (semester !== undefined) updates.semester = Number(semester);
    if (tahunWapa !== undefined) updates.tahun_wapa = Number(tahunWapa);
    if (kelas !== undefined) updates.kelas = kelas;

    const { data, error } = await supabaseAdmin
      .from('registrations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Admin update error:', error.message);
      return res.status(500).json({ success: false, message: 'Gagal mengubah data.' });
    }

    return res.json({
      success: true,
      message: 'Data berhasil diperbarui.',
      data: formatRegistration(data),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * DELETE /api/admin/registrations/:id
 * Admin menghapus data pendaftar.
 */
router.delete('/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('registrations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Admin delete error:', error.message);
      return res.status(500).json({ success: false, message: 'Gagal menghapus data.' });
    }

    return res.json({
      success: true,
      message: 'Data pendaftar berhasil dihapus.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * GET /api/admin/registrations/export/excel
 * Export seluruh data (dengan filter aktif) ke file Excel (.xlsx) menggunakan ExcelJS.
 */
router.get('/registrations/export/excel', async (req, res) => {
  try {
    const { search, kelas, prodi, semester, tahunWapa } = req.query;

    let query = supabaseAdmin
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`nama.ilike.%${search}%,no_wa.ilike.%${search}%`);
    }
    if (kelas && kelas !== 'Semua Kelas') {
      query = query.contains('kelas', [kelas]);
    }
    if (prodi && prodi !== 'Semua Prodi') {
      query = query.eq('prodi', prodi);
    }
    if (semester && semester !== 'Semua Semester') {
      const semNum = parseInt(String(semester).replace(/\D/g, ''));
      if (semNum >= 1 && semNum <= 8) query = query.eq('semester', semNum);
    }
    if (tahunWapa && tahunWapa !== 'Semua Tahun') {
      query = query.eq('tahun_wapa', Number(tahunWapa));
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ success: false, message: 'Gagal mengambil data untuk export.' });
    }

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Himmah NWDI Kom. Teknik';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Data Pendaftar Kader');

    // Header style
    sheet.columns = [
      { header: 'No', key: 'no', width: 6 },
      { header: 'Nama Lengkap', key: 'nama', width: 28 },
      { header: 'No. WhatsApp', key: 'no_wa', width: 18 },
      { header: 'Program Studi', key: 'prodi', width: 22 },
      { header: 'Semester', key: 'semester', width: 10 },
      { header: 'Tahun WaPA', key: 'tahun_wapa', width: 12 },
      { header: 'Kelas Pilihan', key: 'kelas', width: 28 },
      { header: 'Tanggal Daftar', key: 'created_at', width: 22 },
    ];

    // Style header row
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF085F3B' },
    };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

    // Isi data
    (data || []).forEach((row, idx) => {
      sheet.addRow({
        no: idx + 1,
        nama: row.nama,
        no_wa: row.no_wa || '-',
        prodi: row.prodi,
        semester: row.semester,
        tahun_wapa: row.tahun_wapa,
        kelas: Array.isArray(row.kelas) ? row.kelas.join(', ') : row.kelas,
        created_at: new Date(row.created_at).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    });

    // Kirim sebagai file download
    const filename = `Pendaftar_Himmah_NWDI_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error('Excel export error:', err.message);
    return res.status(500).json({ success: false, message: 'Gagal membuat file Excel.' });
  }
});

export default router;
