import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import config from '../config/env.js';

const router = Router();

// Kredensial khusus admin yang ditentukan
const ADMIN_USERNAME = 'Zainultampan';
const ADMIN_PASSWORD = 'Rajinmenabung123';

/**
 * POST /api/auth/login
 * Login admin menggunakan Username/Email & Password.
 * Mendukung kredensial khusus "Zainultampan" & "Rajinmenabung123" serta Supabase Auth.
 */
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const identifier = (username || email || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi.',
      });
    }

    // 1. Cek Kredensial Khusus Utama
    if (identifier === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        {
          userId: 'admin-zainul-01',
          username: ADMIN_USERNAME,
          role: 'superadmin',
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      return res.json({
        success: true,
        message: 'Login berhasil! Selamat datang Admin Zainul.',
        data: {
          token,
          admin: {
            id: 'admin-zainul-01',
            username: ADMIN_USERNAME,
            role: 'superadmin',
          },
        },
      });
    }

    // 2. Cek via Supabase Auth jika format email
    if (identifier.includes('@')) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });

      if (!error && data?.user) {
        const token = jwt.sign(
          {
            userId: data.user.id,
            email: data.user.email,
          },
          config.jwt.secret,
          { expiresIn: config.jwt.expiresIn }
        );

        return res.json({
          success: true,
          message: 'Login berhasil via Supabase Auth.',
          data: {
            token,
            admin: {
              id: data.user.id,
              email: data.user.email,
            },
          },
        });
      }
    }

    // Jika tidak cocok
    return res.status(401).json({
      success: false,
      message: 'Username atau password salah! Periksa kembali data login Anda.',
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat proses login.',
    });
  }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
  return res.json({
    success: true,
    message: 'Logout berhasil.',
  });
});

/**
 * GET /api/auth/me
 */
router.get('/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Tidak terautentikasi.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    return res.json({
      success: true,
      data: decoded,
    });
  } catch {
    return res.status(401).json({ success: false, message: 'Token tidak valid.' });
  }
});

export default router;
