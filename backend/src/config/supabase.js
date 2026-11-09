import { createClient } from '@supabase/supabase-js';
import config from './env.js';

// Pastikan fallback aman jika environment variable belum diisi
const safeUrl = config.supabase.url || 'https://placeholder-project.supabase.co';
const safeAnonKey = config.supabase.anonKey || 'placeholder-anon-key';
const safeServiceKey = config.supabase.serviceRoleKey || 'placeholder-service-key';

// Client publik (anon key)
export const supabase = createClient(safeUrl, safeAnonKey);

// Client admin (service role key) – HANYA digunakan di sisi backend
export const supabaseAdmin = createClient(safeUrl, safeServiceKey);
