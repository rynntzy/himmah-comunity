import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ClassSelectionSection from './components/ClassSelectionSection';
import RegistrationForm from './components/RegistrationForm';
import AboutSection from './components/AboutSection';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { getSeededData } from './data/initialData';
import { getSavedSiteConfig, saveSiteConfig, DEFAULT_SITE_CONFIG } from './data/siteConfig';
import { 
  submitRegistrationApi, 
  getRegistrationsApi, 
  createRegistrationApi, 
  updateRegistrationApi, 
  deleteRegistrationApi, 
  getSettingsApi, 
  updateSettingsApi 
} from './services/api';

export default function App() {
  // Routing State based on window.location.pathname
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('himmah_admin_token');
  });

  const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
  const [registrations, setRegistrations] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState(['Pemrograman Web']);

  // Listen to popstate event (browser back/forward & pushState)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setIsAuthenticated(!!localStorage.getItem('himmah_admin_token'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load Seeded / Saved Data & Site Configuration
  useEffect(() => {
    const localConfig = getSavedSiteConfig();
    setSiteConfig(localConfig);
    if (localConfig.classes && localConfig.classes.length > 0) {
      setSelectedClasses([localConfig.classes[0].name]);
    }

    async function syncBackendSettings() {
      const res = await getSettingsApi();
      if (res.success && res.data && Object.keys(res.data).length > 0) {
        setSiteConfig(prev => ({ ...prev, ...res.data }));
      }
    }
    syncBackendSettings();

    // Jika admin sudah memiliki token, muat data langsung dari database Supabase
    if (isAuthenticated) {
      getRegistrationsApi({ limit: 1000 }).then(res => {
        if (res.success && Array.isArray(res.data)) {
          setRegistrations(res.data);
        }
      });
    } else {
      const localData = getSeededData();
      setRegistrations(localData);
    }
  }, []);

  // Sinkronisasi data database saat status login admin aktif
  useEffect(() => {
    if (isAuthenticated) {
      getRegistrationsApi({ limit: 1000 }).then(res => {
        if (res.success && Array.isArray(res.data)) {
          setRegistrations(res.data);
        }
      });
    }
  }, [isAuthenticated]);

  // Handler Pendaftaran Baru dari Halaman Kader (CREATE via User)
  const handleRegistrationSuccess = async (newEntry) => {
    const apiRes = await submitRegistrationApi(newEntry);
    if (apiRes && apiRes.success && apiRes.data) {
      setRegistrations(prev => [apiRes.data, ...prev.filter(r => r.id !== newEntry.id)]);
      return { success: true, data: apiRes.data };
    } else if (apiRes && !apiRes.fallback && !apiRes.success) {
      return { success: false, message: apiRes.message || 'Pendaftaran gagal.' };
    } else {
      // Fallback lokal jika server offline
      const updated = [newEntry, ...registrations];
      setRegistrations(updated);
      localStorage.setItem('himmah_nwdi_registrations', JSON.stringify(updated));
      return { success: true, offline: true, data: newEntry };
    }
  };

  // Handler Tambah Pendaftar Manual dari Admin (CREATE via Admin)
  const handleAddRegistration = async (newItem) => {
    const apiRes = await createRegistrationApi(newItem);
    if (apiRes && apiRes.success && apiRes.data) {
      setRegistrations(prev => [apiRes.data, ...prev]);
      return { success: true, data: apiRes.data };
    } else {
      const updated = [newItem, ...registrations];
      setRegistrations(updated);
      localStorage.setItem('himmah_nwdi_registrations', JSON.stringify(updated));
      return { success: false, message: apiRes?.message };
    }
  };

  // Handler Update Pendaftar dari Admin (UPDATE)
  const handleUpdateRegistration = async (updatedItem) => {
    const apiRes = await updateRegistrationApi(updatedItem.id, updatedItem);
    if (apiRes && apiRes.success && apiRes.data) {
      setRegistrations(prev => prev.map(r => r.id === updatedItem.id ? apiRes.data : r));
    } else {
      const updated = registrations.map(r => r.id === updatedItem.id ? updatedItem : r);
      setRegistrations(updated);
      localStorage.setItem('himmah_nwdi_registrations', JSON.stringify(updated));
    }
  };

  // Handler Hapus Data di Dashboard Admin (DELETE)
  const handleDeleteRegistration = async (id) => {
    await deleteRegistrationApi(id);
    setRegistrations(prev => prev.filter(r => r.id !== id));
    const saved = localStorage.getItem('himmah_nwdi_registrations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        localStorage.setItem('himmah_nwdi_registrations', JSON.stringify(parsed.filter(r => r.id !== id)));
      } catch (e) {}
    }
  };

  // Handler Pengaturan Tampilan Website (CMS)
  const handleSaveSiteConfig = async (newConfig) => {
    setSiteConfig(newConfig);
    saveSiteConfig(newConfig);

    await updateSettingsApi(newConfig);
  };

  const handleResetSiteConfig = async () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    saveSiteConfig(DEFAULT_SITE_CONFIG);

    await updateSettingsApi(DEFAULT_SITE_CONFIG);
  };

  // Handler Auth Login & Logout
  const handleLoginSuccess = (token, adminData) => {
    setIsAuthenticated(true);
    navigateTo('/admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('himmah_admin_token');
    localStorage.removeItem('himmah_admin_session');
    setIsAuthenticated(false);
    navigateTo('/admin');
  };

  // Handler Pemilihan Kelas dari Kartu Pilihan
  const handleSelectClass = (className) => {
    setSelectedClasses(prev => {
      if (prev.includes(className)) {
        return prev;
      }
      return [className];
    });

    const formEl = document.getElementById('daftar-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler Navigasi Menu Header Publik
  const handleNavigate = (sectionId) => {
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'tentang') {
      document.getElementById('tentang-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'kelas') {
      document.getElementById('kelas-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'informasi') {
      document.getElementById('informasi-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRegister = () => {
    document.getElementById('daftar-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // =========================================================================
  // ROUTING VIEW
  // =========================================================================
  const isAdminPath = currentPath.startsWith('/admin') || currentPath.startsWith('/login');

  if (isAdminPath) {
    if (!isAuthenticated) {
      // Form Login Admin Khusus
      return (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => navigateTo('/')}
        />
      );
    }

    // Dashboard Admin jika terotentikasi
    return (
      <AdminDashboard 
        registrations={registrations}
        onAddRegistration={handleAddRegistration}
        onUpdateRegistration={handleUpdateRegistration}
        onDeleteRegistration={handleDeleteRegistration}
        siteConfig={siteConfig}
        onSaveSiteConfig={handleSaveSiteConfig}
        onResetSiteConfig={handleResetSiteConfig}
        onBackToPortal={() => navigateTo('/')}
        onLogout={handleLogout}
      />
    );
  }

  // Halaman Utama Kader (Frontend Publik tanpa tombol Admin)
  return (
    <div className="min-h-screen bg-[#F6FAF7] text-slate-800 flex flex-col font-sans">
      {/* Header Navbar Publik */}
      <Header 
        onNavigate={handleNavigate}
        contactConfig={siteConfig.contact}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection 
          heroConfig={siteConfig.hero}
          onRegisterClick={scrollToRegister} 
        />

        {/* Pilihan Komunitas */}
        <ClassSelectionSection 
          classes={siteConfig.classes}
          selectedClasses={selectedClasses}
          onSelectClass={handleSelectClass}
        />

        {/* Formulir Pendaftaran */}
        <RegistrationForm 
          formConfig={siteConfig.formSection}
          classList={siteConfig.classes}
          selectedClasses={selectedClasses}
          setSelectedClasses={setSelectedClasses}
          onRegistrationSuccess={handleRegistrationSuccess}
        />

        {/* Section Informasi Alur Pendaftaran */}
        <InfoSection onRegisterClick={scrollToRegister} />

        {/* Section Tentang Organisasi */}
        <AboutSection />
      </main>

      {/* Footer Hijau Gelombang */}
      <Footer contactConfig={siteConfig.contact} />
    </div>
  );
}
