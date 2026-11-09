/**
 * API Service untuk komunikasi Frontend dengan Backend Express.js
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper get Auth Token
function getAuthHeaders() {
  const token = localStorage.getItem('himmah_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// 1. Pendaftaran Kader (Publik)
export async function submitRegistrationApi(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.warn('Backend API offline, menggunakan fallback lokal:', error.message);
    return { success: false, fallback: true, error: error.message };
  }
}

// 2. Ambil Semua Pendaftar (Admin)
export async function getRegistrationsApi(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/admin/registrations?${query}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('himmah_admin_token');
        localStorage.removeItem('himmah_admin_session');
      }
      throw new Error('Gagal mengambil data dari server');
    }
    return await res.json();
  } catch (error) {
    console.warn('Backend API offline, menggunakan data lokal:', error.message);
    return { success: false, fallback: true };
  }
}

// 3. Tambah Pendaftar Manual (Admin)
export async function createRegistrationApi(data) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, fallback: true };
  }
}

// 4. Update Pendaftar (Admin)
export async function updateRegistrationApi(id, data) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, fallback: true };
  }
}

// 5. Hapus Pendaftar (Admin)
export async function deleteRegistrationApi(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/registrations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (error) {
    return { success: false, fallback: true };
  }
}

// 6. Export Excel Backend (ExcelJS)
export async function downloadExcelApi(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/admin/registrations/export/excel?${query}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal mendownload Excel dari server');

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Pendaftar_Himmah_NWDI_${new Date().toISOString().slice(0, 10)}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    return { success: true };
  } catch (error) {
    console.warn('Backend Excel offline, fallback ke client-side exporter:', error.message);
    return { success: false, fallback: true };
  }
}

// 7. Ambil Pengaturan Website (CMS)
export async function getSettingsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (!res.ok) throw new Error('Gagal mengambil settings');
    return await res.json();
  } catch (error) {
    return { success: false, fallback: true };
  }
}

// 8. Simpan Pengaturan Website (CMS)
export async function updateSettingsApi(settings) {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return await res.json();
  } catch (error) {
    return { success: false, fallback: true };
  }
}

// 9. Login Admin
export async function loginAdminApi(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username: email, password }),
    });
    const result = await res.json();
    if (result.success && result.data?.token) {
      localStorage.setItem('himmah_admin_token', result.data.token);
    }
    return result;
  } catch (error) {
    return { success: false, message: 'Server tidak terjangkau.' };
  }
}
