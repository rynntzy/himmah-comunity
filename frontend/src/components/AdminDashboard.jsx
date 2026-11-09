import React, { useState, useMemo } from 'react';
import Logo from './Logo';
import { 
  Home, 
  Users, 
  Sliders, 
  LogOut, 
  Code, 
  Bot, 
  Palette, 
  Search, 
  FileSpreadsheet, 
  Eye, 
  Trash2, 
  Edit, 
  Plus, 
  ChevronDown, 
  Filter, 
  X, 
  Menu,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Phone,
  MessageCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';
import WebsiteCustomizer from './WebsiteCustomizer';
import { downloadExcelApi } from '../services/api';

const PRODI_LIST = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Teknik Elektro',
  'Teknik Mesin',
  'Teknik Sipil',
  'Teknik Lingkungan'
];

export default function AdminDashboard({ 
  registrations = [], 
  onAddRegistration,
  onUpdateRegistration,
  onDeleteRegistration, 
  siteConfig,
  onSaveSiteConfig,
  onResetSiteConfig,
  onBackToPortal,
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | data | cms
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States
  const [filterKelas, setFilterKelas] = useState('Semua Kelas');
  const [filterProdi, setFilterProdi] = useState('Semua Prodi');
  const [filterSemester, setFilterSemester] = useState('Semua Semester');
  const [filterTahun, setFilterTahun] = useState('Semua Tahun');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals
  const [detailModalItem, setDetailModalItem] = useState(null);
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Form State for Create / Edit
  const [formInput, setFormInput] = useState({
    nama: '',
    noWa: '',
    prodi: 'Teknik Informatika',
    semester: 1,
    tahunWapa: 2024,
    kelas: ['Pemrograman Web']
  });

  // Filter Logic (Search by Nama or No. WA)
  const filteredData = useMemo(() => {
    return registrations.filter(item => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchNama = item.nama && item.nama.toLowerCase().includes(query);
        const matchWa = item.noWa && item.noWa.includes(query);
        if (!matchNama && !matchWa) return false;
      }
      if (filterKelas !== 'Semua Kelas') {
        const itemClasses = Array.isArray(item.kelas) ? item.kelas : [item.kelas];
        if (!itemClasses.includes(filterKelas)) return false;
      }
      if (filterProdi !== 'Semua Prodi' && item.prodi !== filterProdi) {
        return false;
      }
      if (filterSemester !== 'Semua Semester') {
        const semNum = parseInt(filterSemester.replace(/\D/g, ''));
        if (item.semester !== semNum) return false;
      }
      if (filterTahun !== 'Semua Tahun' && item.tahunWapa.toString() !== filterTahun) {
        return false;
      }
      return true;
    });
  }, [registrations, searchQuery, filterKelas, filterProdi, filterSemester, filterTahun]);

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = registrations.length;
    let webCount = 0;
    let robotCount = 0;
    let designCount = 0;

    registrations.forEach(r => {
      const cls = Array.isArray(r.kelas) ? r.kelas : [r.kelas];
      if (cls.includes('Pemrograman Web')) webCount++;
      if (cls.includes('Robotik')) robotCount++;
      if (cls.includes('Desain Grafis')) designCount++;
    });

    return {
      total,
      web: webCount,
      robotics: robotCount,
      design: designCount
    };
  }, [registrations]);

  // Pagination Calculation
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  // Export to Excel with No. WA (Server ExcelJS with Client fallback)
  const handleExportExcel = async () => {
    try {
      // Coba download via Backend Express API (ExcelJS)
      const res = await downloadExcelApi({
        search: searchQuery,
        kelas: filterKelas,
        prodi: filterProdi,
        semester: filterSemester,
        tahunWapa: filterTahun,
      });

      if (res && res.success) {
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
        return;
      }

      // Fallback ke Client-side generator jika backend offline
      const exportRows = filteredData.map((item, index) => ({
        'No': index + 1,
        'Nama Lengkap': item.nama,
        'No. WhatsApp': item.noWa || '-',
        'Program Studi': item.prodi,
        'Semester': item.semester,
        'Tahun WaPA': item.tahunWapa,
        'Kelas Pilihan': Array.isArray(item.kelas) ? item.kelas.join(', ') : item.kelas,
        'Tanggal Daftar': new Date(item.tanggalDaftar).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Kader');
      
      worksheet['!cols'] = [
        { wch: 5 }, { wch: 25 }, { wch: 18 }, { wch: 20 }, { wch: 10 }, { wch: 12 }, { wch: 25 }, { wch: 20 }
      ];

      XLSX.writeFile(workbook, `Pendaftar_Himmah_NWDI_${new Date().toISOString().slice(0, 10)}.xlsx`);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error('Export error', e);
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setFormInput({
      nama: '',
      noWa: '',
      prodi: 'Teknik Informatika',
      semester: 1,
      tahunWapa: 2024,
      kelas: ['Pemrograman Web']
    });
    setCreateModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (item) => {
    setEditModalItem(item);
    setFormInput({
      nama: item.nama,
      noWa: item.noWa || '',
      prodi: item.prodi,
      semester: item.semester,
      tahunWapa: item.tahunWapa,
      kelas: Array.isArray(item.kelas) ? [...item.kelas] : [item.kelas]
    });
  };

  // Submit Create
  const handleSaveCreate = (e) => {
    e.preventDefault();
    if (!formInput.nama.trim()) {
      alert('Nama wajib diisi');
      return;
    }
    if (!formInput.noWa.trim()) {
      alert('Nomor WhatsApp wajib diisi');
      return;
    }
    if (formInput.kelas.length === 0) {
      alert('Pilih minimal satu kelas');
      return;
    }

    const newItem = {
      id: Date.now(),
      nama: formInput.nama.trim(),
      noWa: formInput.noWa.trim(),
      prodi: formInput.prodi,
      semester: Number(formInput.semester),
      tahunWapa: Number(formInput.tahunWapa),
      kelas: formInput.kelas,
      tanggalDaftar: new Date().toISOString()
    };

    onAddRegistration(newItem);
    setCreateModalOpen(false);
  };

  // Submit Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formInput.nama.trim() || !editModalItem) return;
    if (!formInput.noWa.trim()) {
      alert('Nomor WhatsApp wajib diisi');
      return;
    }
    if (formInput.kelas.length === 0) {
      alert('Pilih minimal satu kelas');
      return;
    }

    const updatedItem = {
      ...editModalItem,
      nama: formInput.nama.trim(),
      noWa: formInput.noWa.trim(),
      prodi: formInput.prodi,
      semester: Number(formInput.semester),
      tahunWapa: Number(formInput.tahunWapa),
      kelas: formInput.kelas
    };

    onUpdateRegistration(updatedItem);
    setEditModalItem(null);
  };

  const toggleFormClass = (clsName) => {
    if (formInput.kelas.includes(clsName)) {
      if (formInput.kelas.length > 1) {
        setFormInput(prev => ({
          ...prev,
          kelas: prev.kelas.filter(k => k !== clsName)
        }));
      }
    } else {
      setFormInput(prev => ({
        ...prev,
        kelas: [...prev.kelas, clsName]
      }));
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const getWaLink = (phone, name = '') => {
    if (!phone) return '#';
    let clean = phone.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    }
    return `https://wa.me/${clean}?text=${encodeURIComponent(`Halo ${name}, kami dari panitia Kelas Khusus Himmah NWDI Kom. Teknik.`)}`;
  };

  const renderClassBadge = (kelas) => {
    const list = Array.isArray(kelas) ? kelas : [kelas];
    return (
      <div className="flex flex-wrap gap-1">
        {list.map(k => {
          if (k === 'Pemrograman Web') {
            return (
              <span key={k} className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Web
              </span>
            );
          }
          if (k === 'Robotik') {
            return (
              <span key={k} className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Robotik
              </span>
            );
          }
          return (
            <span key={k} className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Desain
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col lg:flex-row font-sans">
      
      {/* ============================================================== */}
      {/* SIDEBAR DESKTOP */}
      {/* ============================================================== */}
      <aside className="hidden lg:flex w-64 bg-[#06482C] text-white flex-col justify-between shrink-0 shadow-xl relative z-20">
        <div>
          <div className="p-6 border-b border-emerald-800/60">
            <Logo size="md" variant="white" />
          </div>

          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500/90 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('data')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeTab === 'data'
                  ? 'bg-emerald-500/90 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Data Pendaftar (CRUD)</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeTab === 'cms'
                  ? 'bg-emerald-500/90 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white'
              }`}
            >
              <Sliders className="w-5 h-5" />
              <span>Kelola Tampilan (CMS)</span>
            </button>

            <button
              onClick={onLogout || onBackToPortal}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-emerald-100/70 hover:bg-red-500/20 hover:text-red-200 transition cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Keluar / Logout</span>
            </button>
          </nav>
        </div>

        <div className="p-5 border-t border-emerald-800/60 relative overflow-hidden bg-gradient-to-t from-emerald-950/60 to-transparent">
          <p className="text-xs text-emerald-100/90 font-medium italic leading-relaxed">
            "{siteConfig.contact.footerSlogan || 'Bersama Membangun Kader yang Berilmu dan Berakhlaq Mulia'}"
          </p>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        
        {/* Top Navbar Header */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                Dashboard Admin
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Himmah NWDI Kom. Teknik
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-brand-primary bg-emerald-50 hover:bg-emerald-100 transition border border-emerald-200 cursor-pointer"
            >
              <span>Halaman Kader</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-400">
                Z
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800">Zainul (Admin)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* JIKA TAB CMS DIPILIH */}
          {activeTab === 'cms' ? (
            <WebsiteCustomizer 
              siteConfig={siteConfig}
              onSaveConfig={onSaveSiteConfig}
              onResetConfig={onResetSiteConfig}
              onPreviewWebsite={onBackToPortal}
            />
          ) : (
            /* TAMPILAN DASHBOARD & TAB DATA */
            <>
              {/* 4 KARTU STATISTIK */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
                <div className="bg-gradient-to-br from-[#ECFDF5] to-[#E6F8F0] p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-600/15 text-emerald-700 flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stats.total}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">Total Pendaftar</div>
                    <div className="mt-2 text-[11px] font-bold text-emerald-600">↑ +12%</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#EFF6FF] to-[#EBF3FF] p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600/15 text-blue-700 flex items-center justify-center">
                    <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stats.web}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5 truncate">Pemrograman Web</div>
                    <div className="mt-2 text-[11px] font-bold text-emerald-600">↑ +8%</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/60 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-100 shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-600/15 text-amber-700 flex items-center justify-center">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stats.robotics}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">Robotik</div>
                    <div className="mt-2 text-[11px] font-bold text-emerald-600">↑ +10%</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]/70 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-2xs">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-purple-600/15 text-purple-700 flex items-center justify-center">
                    <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stats.design}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5 truncate">Desain Grafis</div>
                    <div className="mt-2 text-[11px] font-bold text-emerald-600">↑ +14%</div>
                  </div>
                </div>
              </div>

              {/* SECTION DATA PENDAFTAR & CRUD BAR */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                
                {/* Header Bar dengan Tombol Tambah Pendaftar */}
                <div className="p-4 sm:p-6 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Manajemen Data Pendaftar Kader
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleOpenCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-xs transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Pendaftar</span>
                      </button>

                      <button
                        onClick={handleExportExcel}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-brand-primary text-xs font-bold transition cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>Export Excel</span>
                      </button>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                    <div className="lg:col-span-3">
                      <select
                        value={filterKelas}
                        onChange={(e) => { setFilterKelas(e.target.value); setCurrentPage(1); }}
                        className="w-full text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Semua Kelas">Semua Kelas</option>
                        {siteConfig.classes.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-3">
                      <select
                        value={filterProdi}
                        onChange={(e) => { setFilterProdi(e.target.value); setCurrentPage(1); }}
                        className="w-full text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Semua Prodi">Semua Prodi</option>
                        {PRODI_LIST.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <select
                        value={filterSemester}
                        onChange={(e) => { setFilterSemester(e.target.value); setCurrentPage(1); }}
                        className="w-full text-xs font-semibold text-slate-700 bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Semua Semester">Semua Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                          <option key={s} value={`Semester ${s}`}>Semester {s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Search by Name or WA */}
                    <div className="lg:col-span-4">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                          placeholder="Cari nama atau No. WA kader..."
                          className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-2.5 my-auto text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {exportSuccess && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>File Excel berhasil diunduh!</span>
                    </div>
                  )}
                </div>

                {/* Table Responsive dengan Kolom No. WhatsApp */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-[#EBF3ED]/60 text-slate-700 font-bold border-b border-slate-200/80 uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="py-3 px-3 w-10 text-center">No</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-3">No. WhatsApp</th>
                        <th className="py-3 px-3">Prodi</th>
                        <th className="py-3 px-2 text-center">Sem.</th>
                        <th className="py-3 px-2 text-center">WaPA</th>
                        <th className="py-3 px-3">Kelas Pilihan</th>
                        <th className="py-3 px-3">Tanggal Daftar</th>
                        <th className="py-3 px-4 text-center w-28">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedData.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="py-12 text-center text-slate-400">
                            Tidak ada data kader yang cocok dengan pencarian/filter.
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((item, index) => {
                          const absoluteIndex = (currentPage - 1) * pageSize + index + 1;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-3 text-center font-medium text-slate-500">
                                {absoluteIndex}
                              </td>
                              <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                                {item.nama}
                              </td>
                              {/* Kolom No. WhatsApp dengan tautan langsung */}
                              <td className="py-3.5 px-3">
                                <a 
                                  href={getWaLink(item.noWa, item.nama)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-brand-primary font-semibold text-[11px] border border-emerald-200/80 transition group"
                                  title="Chat WhatsApp Kader"
                                >
                                  <Phone className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
                                  <span>{item.noWa || '-'}</span>
                                </a>
                              </td>
                              <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                                {item.prodi}
                              </td>
                              <td className="py-3.5 px-2 text-center text-slate-700 font-semibold">
                                {item.semester}
                              </td>
                              <td className="py-3.5 px-2 text-center text-slate-600">
                                {item.tahunWapa}
                              </td>
                              <td className="py-3.5 px-3">
                                {renderClassBadge(item.kelas)}
                              </td>
                              <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                                {formatDate(item.tanggalDaftar)}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  {/* View Detail Button */}
                                  <button
                                    onClick={() => setDetailModalItem(item)}
                                    className="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 flex items-center justify-center transition cursor-pointer"
                                    title="Lihat Detail"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  {/* Edit Button */}
                                  <button
                                    onClick={() => handleOpenEditModal(item)}
                                    className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center justify-center transition cursor-pointer"
                                    title="Edit Data"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  {/* Delete Button */}
                                  <button
                                    onClick={() => setDeleteModalItem(item)}
                                    className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition cursor-pointer"
                                    title="Hapus Data"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500">
                    Menampilkan <span className="font-semibold text-slate-800">
                      {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
                      {Math.min(currentPage * pageSize, filteredData.length)}
                    </span> dari <span className="font-semibold text-slate-800">{filteredData.length}</span> data
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                          currentPage === page
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* MOBILE BOTTOM NAVIGATION */}
      {/* ============================================================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/90 py-2 px-4 flex items-center justify-around z-40 shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'dashboard' ? 'text-brand-primary font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'data' ? 'text-brand-primary font-bold' : 'text-slate-500'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Data (CRUD)</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`flex flex-col items-center gap-1 ${
            activeTab === 'cms' ? 'text-brand-primary font-bold' : 'text-slate-500'
          }`}
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px]">Tampilan</span>
        </button>

        <button
          onClick={onLogout || onBackToPortal}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px]">Logout</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* MODAL CREATE / TAMBAH PENDAFTAR DENGAN NO. WA */}
      {/* ============================================================== */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-primary" />
                Tambah Pendaftar Kader Manual
              </h3>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap kader"
                    value={formInput.nama}
                    onChange={(e) => setFormInput({ ...formInput, nama: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">No. WhatsApp (WA)</label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={formInput.noWa}
                    onChange={(e) => setFormInput({ ...formInput, noWa: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Program Studi</label>
                  <select
                    value={formInput.prodi}
                    onChange={(e) => setFormInput({ ...formInput, prodi: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    {PRODI_LIST.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
                  <select
                    value={formInput.semester}
                    onChange={(e) => setFormInput({ ...formInput, semester: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tahun WaPA</label>
                <select
                  value={formInput.tahunWapa}
                  onChange={(e) => setFormInput({ ...formInput, tahunWapa: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilihan Kelas Khusus</label>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.classes.map(c => {
                    const isChecked = formInput.kelas.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleFormClass(c.name)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition cursor-pointer ${
                          isChecked 
                            ? 'bg-emerald-100 border-emerald-300 text-brand-primary' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked ? `✓ ${c.name}` : `+ ${c.name}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL EDIT PENDAFTAR (UPDATE) DENGAN NO. WA */}
      {/* ============================================================== */}
      {editModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-600" />
                Edit Data Kader (Update)
              </h3>
              <button 
                onClick={() => setEditModalItem(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formInput.nama}
                    onChange={(e) => setFormInput({ ...formInput, nama: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">No. WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formInput.noWa}
                    onChange={(e) => setFormInput({ ...formInput, noWa: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Program Studi</label>
                  <select
                    value={formInput.prodi}
                    onChange={(e) => setFormInput({ ...formInput, prodi: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    {PRODI_LIST.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Semester</label>
                  <select
                    value={formInput.semester}
                    onChange={(e) => setFormInput({ ...formInput, semester: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tahun WaPA</label>
                <select
                  value={formInput.tahunWapa}
                  onChange={(e) => setFormInput({ ...formInput, tahunWapa: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                >
                  {['2026', '2025', '2024', '2023', '2022', '2021', '2020'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Pilihan Kelas Khusus</label>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.classes.map(c => {
                    const isChecked = formInput.kelas.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => toggleFormClass(c.name)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition cursor-pointer ${
                          isChecked 
                            ? 'bg-blue-100 border-blue-300 text-blue-700' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {isChecked ? `✓ ${c.name}` : `+ ${c.name}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL LIHAT DETAIL (READ) DENGAN NO. WA & ACTION CHAT */}
      {/* ============================================================== */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Detail Data Kader
              </h3>
              <button 
                onClick={() => setDetailModalItem(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-brand-primary flex items-center justify-center font-bold text-base">
                    {detailModalItem.nama.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{detailModalItem.nama}</div>
                    <div className="text-slate-500 text-xs">Pendaftar Kelas Khusus</div>
                  </div>
                </div>

                {detailModalItem.noWa && (
                  <a
                    href={getWaLink(detailModalItem.noWa, detailModalItem.nama)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
                    title="Chat WhatsApp Kader"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-0.5">No. WhatsApp</span>
                  <a 
                    href={getWaLink(detailModalItem.noWa, detailModalItem.nama)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{detailModalItem.noWa || '-'}</span>
                  </a>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Program Studi</span>
                  <span className="font-semibold text-slate-800">{detailModalItem.prodi}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Semester</span>
                  <span className="font-semibold text-slate-800">Semester {detailModalItem.semester}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Tahun WaPA</span>
                  <span className="font-semibold text-slate-800">{detailModalItem.tahunWapa}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[11px] text-slate-400 block mb-1">Waktu Pendaftaran</span>
                <span className="font-semibold text-slate-800 text-[11px]">{formatDate(detailModalItem.tanggalDaftar)}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[11px] text-slate-400 block mb-1">Kelas yang Diikuti</span>
                {renderClassBadge(detailModalItem.kelas)}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={getWaLink(detailModalItem.noWa, detailModalItem.nama)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi via WA</span>
              </a>
              <button
                onClick={() => setDetailModalItem(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL HAPUS DATA (DELETE) */}
      {/* ============================================================== */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-red-100 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Hapus Data Pendaftar?
            </h4>
            <p className="text-xs text-slate-500 mb-5">
              Apakah Anda yakin ingin menghapus data atas nama <span className="font-bold text-slate-800">"{deleteModalItem.nama}"</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteModalItem(null)}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onDeleteRegistration(deleteModalItem.id);
                  setDeleteModalItem(null);
                }}
                className="flex-1 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
