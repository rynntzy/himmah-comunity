import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Muat .env dari folder backend atau fallback ke root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback default

// Helper untuk membersihkan format SUPABASE_URL jika pengguna memasukkan endpoint REST (/rest/v1/)
function cleanSupabaseUrl(url) {
  if (!url) return 'https://xyzcompany.supabase.co';
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  supabase: {
    url: cleanSupabaseUrl(process.env.SUPABASE_URL),
    anonKey: (process.env.SUPABASE_ANON_KEY || 'dummy_anon_key').trim(),
    serviceRoleKey: (process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_service_role_key').trim(),
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'default-dev-secret-change-in-production',
    expiresIn: '24h',
  },

  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5174',
};

// Validasi konfigurasi wajib saat startup
export function validateConfig() {
  const isConfigured = 
    config.supabase.url && 
    !config.supabase.url.includes('xyzcompany.supabase.co') &&
    config.supabase.anonKey &&
    !config.supabase.anonKey.includes('dummy_anon_key');

  if (!isConfigured) {
    console.warn(`\n⚠️  [PERINGATAN SUPABASE] Kredensial Supabase nyata belum diatur di backend/.env.`);
    console.warn(`   Silakan buat project di https://supabase.com dan isi:`);
    console.warn(`   - SUPABASE_URL`);
    console.warn(`   - SUPABASE_ANON_KEY`);
    console.warn(`   - SUPABASE_SERVICE_ROLE_KEY`);
    console.warn(`   Server backend tetap aktif dan API siap menerima koneksi.\n`);
  }
}

export default config;
