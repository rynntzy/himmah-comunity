import jwt from 'jsonwebtoken';
import config from '../config/env.js';
import { supabaseAdmin } from '../config/supabase.js';

/**
 * Middleware autentikasi admin.
 * Menerima token Bearer JWT di header Authorization.
 */
export async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token autentikasi tidak ditemukan.',
      });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kedaluwarsa. Silakan login ulang.',
      });
    }

    // Jika admin khusus Zainul
    if (decoded.username === 'Zainultampan' || decoded.userId === 'admin-zainul-01') {
      req.admin = {
        id: 'admin-zainul-01',
        username: 'Zainultampan',
        role: 'superadmin',
      };
      return next();
    }

    // Cek user di Supabase jika ada userId
    if (decoded.userId) {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(decoded.userId);
      if (userData?.user) {
        req.admin = {
          id: userData.user.id,
          email: userData.user.email,
        };
        return next();
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Akun admin tidak ditemukan atau sudah dinonaktifkan.',
    });
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada proses autentikasi.',
    });
  }
}
