import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Plus, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  MessageCircle, 
  Eye, 
  Code, 
  Bot, 
  Palette,
  FileText
} from 'lucide-react';

export default function WebsiteCustomizer({ siteConfig, onSaveConfig, onResetConfig, onPreviewWebsite }) {
  const [config, setConfig] = useState(siteConfig);
  const [activeSubTab, setActiveSubTab] = useState('hero'); // hero | classes | kader | contact
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Class Form State
  const [newClass, setNewClass] = useState({
    name: '',
    shortDesc: '',
    type: 'web',
    image: null
  });
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [editingClassIndex, setEditingClassIndex] = useState(null);

  // File Upload Helper (converts to base64 data url)
  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar (maksimal 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleHeroChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const handleFormSectionChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      formSection: { ...prev.formSection, [field]: value }
    }));
  };

  const handleContactChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleSave = () => {
    onSaveConfig(config);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Class Management
  const handleAddClass = () => {
    if (!newClass.name.trim()) return;
    const newClassObj = {
      id: 'class-' + Date.now(),
      name: newClass.name.trim(),
      shortDesc: newClass.shortDesc.trim() || 'Kelas Peminatan Kader',
      type: newClass.type || 'web',
      image: newClass.image
    };

    setConfig(prev => ({
      ...prev,
      classes: [...prev.classes, newClassObj]
    }));

    setNewClass({ name: '', shortDesc: '', type: 'web', image: null });
    setShowAddClassModal(false);
  };

  const handleRemoveClass = (index) => {
    if (config.classes.length <= 1) {
      alert('Minimal harus ada satu komunitas');
      return;
    }
    const updated = config.classes.filter((_, i) => i !== index);
    setConfig(prev => ({ ...prev, classes: updated }));
  };

  const handleUpdateClass = (index, field, value) => {
    const updated = [...config.classes];
    updated[index] = { ...updated[index], [field]: value };
    setConfig(prev => ({ ...prev, classes: updated }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Content Management System (CMS)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Pengaturan Tampilan & Gambar Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola teks, foto banner gedung, foto kader, pilihan kelas, dan kontak yang tampil di halaman pendaftaran.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onPreviewWebsite}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
            title="Lihat Tampilan Website Kader"
          >
            <Eye className="w-4 h-4 text-emerald-600" />
            <span>Pratinjau Website</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold shadow-md shadow-emerald-950/15 transition transform hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-scaleUp">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Perubahan tampilan dan gambar berhasil disimpan! Halaman Kader telah diperbarui secara langsung.</span>
          </div>
          <button 
            onClick={onPreviewWebsite}
            className="underline text-emerald-900 font-bold hover:text-emerald-700 ml-4 shrink-0"
          >
            Lihat Sekarang →
          </button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'hero', label: '1. Banner Hero & Gedung', icon: ImageIcon },
          { id: 'classes', label: '2. Kelola Komunitas', icon: Layers },
          { id: 'kader', label: '3. Foto & Slogan Kader', icon: FileText },
          { id: 'contact', label: '4. Kontak & Sosmed', icon: MessageCircle },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold whitespace-nowrap transition border-b-2 ${
                isActive 
                  ? 'border-brand-primary text-brand-primary bg-white shadow-2xs' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: HERO & FOTO GEDUNG */}
      {/* ========================================================= */}
      {activeSubTab === 'hero' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hero Section & Visual Gedung</h3>
              <p className="text-xs text-slate-500">Sesuaikan judul utama, slogan hero, dan masukkan foto gedung yang diinginkan.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Input Teks Hero */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Badge Info Atas
                </label>
                <input
                  type="text"
                  value={config.hero.badgeText}
                  onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Judul Baris 1 (Hitam)
                  </label>
                  <input
                    type="text"
                    value={config.hero.titlePrefix}
                    onChange={(e) => handleHeroChange('titlePrefix', e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Judul Baris 2 (Hijau Primer)
                  </label>
                  <input
                    type="text"
                    value={config.hero.titleSuffix}
                    onChange={(e) => handleHeroChange('titleSuffix', e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Deskripsi / Tagline Hero
                </label>
                <textarea
                  rows={3}
                  value={config.hero.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Teks Tombol CTA
                </label>
                <input
                  type="text"
                  value={config.hero.ctaText}
                  onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Upload Gambar Gedung */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 bg-slate-50 rounded-3xl border border-slate-200/80">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-800">
                    Gambar Fasad Gedung / Hero
                  </label>
                  {config.hero.heroImage && (
                    <button
                      type="button"
                      onClick={() => handleHeroChange('heroImage', null)}
                      className="text-[11px] text-red-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      Gunakan Vektor Bawaan
                    </button>
                  )}
                </div>

                {/* Preview Box */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs relative flex items-center justify-center">
                  {config.hero.heroImage ? (
                    <img 
                      src={config.hero.heroImage} 
                      alt="Hero Custom Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 text-slate-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                      <p className="text-xs font-semibold text-slate-600">Menggunakan Ilustrasi Gedung NWDI Bawaan</p>
                      <p className="text-[10px] text-slate-400 mt-1">Upload foto asli gedung atau desain custom untuk menggantinya</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Action */}
              <div className="mt-4">
                <label className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-dashed border-emerald-300 hover:border-brand-primary text-brand-primary text-xs font-bold cursor-pointer transition shadow-2xs hover:bg-emerald-50/50">
                  <Upload className="w-4 h-4" />
                  <span>Upload Foto Gedung Baru (.jpg, .png, .webp)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, (url) => handleHeroChange('heroImage', url))}
                  />
                </label>
                <p className="text-[10px] text-slate-400 text-center mt-1.5">
                  Maksimal 5MB. Format gambar optimal: 800x600 piksel atau rasio 4:3.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: KELOLA KOMUNITAS */}
      {/* ========================================================= */}
      {activeSubTab === 'classes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Daftar Pilihan Komunitas</h3>
              <p className="text-xs text-slate-500">Tambah, edit nama, deskripsi, atau upload gambar thumbnail khusus untuk tiap komunitas.</p>
            </div>

            <button
              onClick={() => setShowAddClassModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-50 text-brand-primary hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Kelas Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.classes.map((cls, idx) => (
              <div 
                key={cls.id || idx}
                className="p-5 rounded-3xl bg-slate-50/60 border border-slate-200 flex flex-col justify-between relative group hover:border-emerald-300 transition"
              >
                <div>
                  {/* Action Delete */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-brand-primary uppercase">
                      Kelas #{idx + 1}
                    </span>

                    <button
                      onClick={() => handleRemoveClass(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Hapus Kelas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Class Thumbnail Image or Icon */}
                  <div className="h-32 rounded-2xl bg-white border border-slate-200/80 overflow-hidden mb-3 relative flex items-center justify-center">
                    {cls.image ? (
                      <img src={cls.image} alt={cls.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-primary flex items-center justify-center mx-auto mb-1">
                          {cls.type === 'web' && <Code className="w-5 h-5 text-blue-600" />}
                          {cls.type === 'robotics' && <Bot className="w-5 h-5 text-emerald-600" />}
                          {cls.type === 'design' && <Palette className="w-5 h-5 text-purple-600" />}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">Ikon 3D Bawaan ({cls.type})</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Custom Image for Class */}
                  <label className="block mb-3">
                    <span className="text-[10px] font-bold text-slate-600 mb-1 block">Upload Gambar Thumbnail:</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, (url) => handleUpdateClass(idx, 'image', url))}
                      className="text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-brand-primary hover:file:bg-emerald-100 cursor-pointer"
                    />
                  </label>

                  {/* Input Nama Kelas */}
                  <div className="space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Nama Kelas</label>
                      <input
                        type="text"
                        value={cls.name}
                        onChange={(e) => handleUpdateClass(idx, 'name', e.target.value)}
                        className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                      <textarea
                        rows={2}
                        value={cls.shortDesc}
                        onChange={(e) => handleUpdateClass(idx, 'shortDesc', e.target.value)}
                        className="w-full text-xs text-slate-600 px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Tipe Ikon:</span>
                  <select
                    value={cls.type || 'web'}
                    onChange={(e) => handleUpdateClass(idx, 'type', e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 font-semibold text-slate-700"
                  >
                    <option value="web">Web Dev</option>
                    <option value="robotics">Robotik</option>
                    <option value="design">Desain Grafis</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: FORMULIR & FOTO KADER */}
      {/* ========================================================= */}
      {activeSubTab === 'kader' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Ilustrasi / Foto Kader & Slogan</h3>
              <p className="text-xs text-slate-500">Kustomisasi foto kader pada bagian formulir atau gunakan foto dokumentasi asli.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Slogan Banner Kader
                </label>
                <input
                  type="text"
                  value={config.formSection.slogan}
                  onChange={(e) => handleFormSectionChange('slogan', e.target.value)}
                  placeholder="Contoh: Belajar • Berkarya • Berkhidmat"
                  className="w-full text-xs font-bold text-brand-primary px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Judul Formulir
                </label>
                <input
                  type="text"
                  value={config.formSection.title}
                  onChange={(e) => handleFormSectionChange('title', e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Sub-judul Formulir
                </label>
                <textarea
                  rows={2}
                  value={config.formSection.subtitle}
                  onChange={(e) => handleFormSectionChange('subtitle', e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Upload Foto Kader */}
            <div className="lg:col-span-5 p-5 bg-slate-50 rounded-3xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-800">
                  Visual Kader Samping Form
                </label>
                {config.formSection.kaderImage && (
                  <button
                    type="button"
                    onClick={() => handleFormSectionChange('kaderImage', null)}
                    className="text-[11px] text-red-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3 h-3" />
                    Hapus Gambar / Reset
                  </button>
                )}
              </div>

              <div className="h-56 rounded-2xl bg-white border border-slate-200 overflow-hidden relative flex items-center justify-center mb-3">
                {config.formSection.kaderImage ? (
                  <img 
                    src={config.formSection.kaderImage} 
                    alt="Kader Custom Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-brand-primary flex items-center justify-center mx-auto mb-2 font-bold">
                      NWDI
                    </div>
                    <p className="text-xs font-bold text-slate-700">Belum Ada Gambar Terpilih</p>
                    <p className="text-[10px] text-slate-400 mt-1">Upload foto kader asli atau kegiatan kom. teknik</p>
                  </div>
                )}
              </div>

              <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-dashed border-emerald-300 hover:border-brand-primary text-brand-primary text-xs font-bold cursor-pointer transition shadow-2xs">
                <Upload className="w-4 h-4" />
                <span>Upload Foto Kader Baru (.jpg, .png)</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, (url) => handleFormSectionChange('kaderImage', url))}
                />
              </label>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: KONTAK & MEDIA SOSIAL */}
      {/* ========================================================= */}
      {activeSubTab === 'contact' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Kontak WhatsApp & Media Sosial</h3>
              <p className="text-xs text-slate-500">Nomor admin untuk tombol "Hubungi Kami" dan link akun media sosial resmi.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor WhatsApp Admin (Format 62xxx)
              </label>
              <input
                type="text"
                value={config.contact.whatsappNumber}
                onChange={(e) => handleContactChange('whatsappNumber', e.target.value)}
                placeholder="6281234567890"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pesan Pembuka WhatsApp Otomatis
              </label>
              <input
                type="text"
                value={config.contact.whatsappText}
                onChange={(e) => handleContactChange('whatsappText', e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Link Akun Instagram
              </label>
              <input
                type="url"
                value={config.contact.instagramUrl}
                onChange={(e) => handleContactChange('instagramUrl', e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Link Channel YouTube
              </label>
              <input
                type="url"
                value={config.contact.youtubeUrl}
                onChange={(e) => handleContactChange('youtubeUrl', e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Link Akun Telegram
              </label>
              <input
                type="url"
                value={config.contact.telegramUrl}
                onChange={(e) => handleContactChange('telegramUrl', e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Slogan Footer & Organisasi
              </label>
              <input
                type="text"
                value={config.contact.footerSlogan}
                onChange={(e) => handleContactChange('footerSlogan', e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (confirm('Kembalikan seluruh teks & gambar ke pengaturan standar awal?')) {
                  onResetConfig();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua ke Default</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Tambah Kelas Baru */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tambah Komunitas Baru</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Komunitas</label>
                <input
                  type="text"
                  placeholder="Misal: Kecerdasan Buatan (AI)"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Deskripsi materi yang akan dipelajari..."
                  value={newClass.shortDesc}
                  onChange={(e) => setNewClass({ ...newClass, shortDesc: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tipe Ikon 3D</label>
                <select
                  value={newClass.type}
                  onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <option value="web">Pemrograman Web / Coding</option>
                  <option value="robotics">Robotik & IoT</option>
                  <option value="design">Desain Grafis & Multimedia</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Gambar Thumbnail (Opsional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => setNewClass({ ...newClass, image: url }))}
                  className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-brand-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddClass}
                className="flex-1 py-2.5 rounded-full bg-brand-primary text-xs font-bold text-white hover:bg-brand-dark shadow-sm"
              >
                Simpan Komunitas
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
