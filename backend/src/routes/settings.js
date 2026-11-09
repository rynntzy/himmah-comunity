import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/settings
 * Endpoint publik - mengambil konfigurasi tampilan website (hero, kelas, form, kontak).
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('key, value');

    if (error) {
      console.error('Fetch settings error:', error.message);
      return res.status(500).json({ success: false, message: 'Gagal mengambil konfigurasi website.' });
    }

    const configMap = {};
    (data || []).forEach(row => {
      configMap[row.key] = row.value;
    });

    return res.json({
      success: true,
      data: configMap,
    });
  } catch (err) {
    console.error('Settings route error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

/**
 * PUT /api/settings
 * Endpoint dilindungi admin - memperbarui konfigurasi tampilan website.
 */
router.put('/', requireAdmin, async (req, res) => {
  try {
    const settings = req.body; // { hero, classes, formSection, contact }

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ success: false, message: 'Data konfigurasi tidak valid.' });
    }

    const upsertPromises = Object.entries(settings).map(async ([key, value]) => {
      return supabaseAdmin
        .from('site_settings')
        .upsert(
          { key, value, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );
    });

    const results = await Promise.all(upsertPromises);
    const hasError = results.some(r => r.error);

    if (hasError) {
      return res.status(500).json({ success: false, message: 'Gagal menyimpan sebagian konfigurasi.' });
    }

    return res.json({
      success: true,
      message: 'Konfigurasi website berhasil disimpan.',
      data: settings,
    });
  } catch (err) {
    console.error('Update settings error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
