-- ====================================================================
-- SCHEMA DATABASE SUPABASE (POSTGRESQL)
-- PROJECT: HIMMAH NWDI KOM. TEKNIK
-- ====================================================================

-- 1. Enable UUID Extension jika diperlukan
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABEL PENDAFTARAN KADER (registrations)
CREATE TABLE IF NOT EXISTS public.registrations (
    id BIGSERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    no_wa VARCHAR(20) NOT NULL,
    prodi VARCHAR(100) NOT NULL,
    semester SMALLINT NOT NULL CHECK (semester >= 1 AND semester <= 8),
    tahun_wapa INT NOT NULL CHECK (tahun_wapa >= 2015 AND tahun_wapa <= 2035),
    kelas TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing untuk mempercepat pencarian dan filter pendaftar
CREATE INDEX IF NOT EXISTS idx_registrations_nama ON public.registrations (nama);
CREATE INDEX IF NOT EXISTS idx_registrations_no_wa ON public.registrations (no_wa);
CREATE INDEX IF NOT EXISTS idx_registrations_prodi ON public.registrations (prodi);
CREATE INDEX IF NOT EXISTS idx_registrations_semester ON public.registrations (semester);
CREATE INDEX IF NOT EXISTS idx_registrations_tahun_wapa ON public.registrations (tahun_wapa);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- Trigger auto update updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_timestamp_registrations ON public.registrations;
CREATE TRIGGER set_timestamp_registrations
BEFORE UPDATE ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 3. TABEL PENGATURAN TAMPILAN WEBSITE CMS (site_settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS set_timestamp_site_settings ON public.site_settings;
CREATE TRIGGER set_timestamp_site_settings
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 4. ROW LEVEL SECURITY (RLS) & POLICIES
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policy Registrations: Publik dapat INSERT pendaftaran baru
DROP POLICY IF EXISTS "Public can insert registration" ON public.registrations;
CREATE POLICY "Public can insert registration"
ON public.registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy Registrations: Hanya authenticated admin / service_role yang dapat SELECT, UPDATE, DELETE
DROP POLICY IF EXISTS "Authenticated users can select registrations" ON public.registrations;
CREATE POLICY "Authenticated users can select registrations"
ON public.registrations
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can update registrations" ON public.registrations;
CREATE POLICY "Authenticated users can update registrations"
ON public.registrations
FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete registrations" ON public.registrations;
CREATE POLICY "Authenticated users can delete registrations"
ON public.registrations
FOR DELETE
TO authenticated
USING (true);

-- Policy Settings: Publik dapat SELECT pengaturan tampilan
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings"
ON public.site_settings
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy Settings: Hanya authenticated admin yang dapat UPDATE / INSERT
DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON public.site_settings;
CREATE POLICY "Authenticated users can manage site settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
