import React, { useState } from 'react';
import { User, Phone, GraduationCap, Calendar, Clock, Edit3, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import KaderIllustration from './KaderIllustration';
import confetti from 'canvas-confetti';

const PRODI_OPTIONS = [
  'Teknik Informatika',
  'Teknik Komputer',
  'Teknik Lingkungan',
  'Sistem Informasi'
];

const SEMESTER_OPTIONS = [
  'Semester 1',
  'Semester 2',
  'Semester 3',
  'Semester 4',
  'Semester 5',
  'Semester 6',
  'Semester 7',
  'Semester 8'
];

const TAHUN_WAPA_OPTIONS = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
];

export default function RegistrationForm({ 
  formConfig = {}, 
  classList = [], 
  selectedClasses, 
  setSelectedClasses, 
  onRegistrationSuccess 
}) {
  const {
    title = 'Formulir Pendaftaran',
    subtitle = 'Isi data diri Anda untuk mendaftar komunitas yang dipilih.',
    slogan = 'Belajar • Berkarya • Berkhidmat',
    kaderImage = null
  } = formConfig;

  const [formData, setFormData] = useState({
    nama: '',
    noWa: '',
    prodi: '',
    semester: '',
    tahunWapa: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const availableClassNames = classList.map(c => c.name);

  const toggleClass = (className) => {
    if (selectedClasses.includes(className)) {
      if (selectedClasses.length > 1) {
        setSelectedClasses(selectedClasses.filter(c => c !== className));
      } else {
        setSelectedClasses([]);
      }
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
    if (errors.kelas) {
      setErrors(prev => ({ ...prev, kelas: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi';
    } else if (formData.nama.trim().length < 3) {
      newErrors.nama = 'Nama terlalu pendek (minimal 3 karakter)';
    }

    // Validasi No. WA
    const cleanWa = formData.noWa.replace(/\D/g, '');
    if (!formData.noWa.trim()) {
      newErrors.noWa = 'Nomor WhatsApp wajib diisi';
    } else if (cleanWa.length < 10 || cleanWa.length > 14) {
      newErrors.noWa = 'Nomor WhatsApp tidak valid (10-14 digit)';
    }

    if (!formData.prodi) {
      newErrors.prodi = 'Silakan pilih program studi';
    }

    if (!formData.semester) {
      newErrors.semester = 'Silakan pilih semester';
    }

    if (!formData.tahunWapa) {
      newErrors.tahunWapa = 'Silakan pilih tahun WaPA';
    }

    if (selectedClasses.length === 0) {
      newErrors.kelas = 'Pilih minimal satu komunitas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, general: '' }));

    const newEntry = {
      nama: formData.nama.trim(),
      noWa: formData.noWa.trim(),
      prodi: formData.prodi,
      semester: parseInt(formData.semester.replace(/\D/g, '')) || 1,
      tahunWapa: parseInt(formData.tahunWapa) || 2024,
      kelas: selectedClasses,
      tanggalDaftar: new Date().toISOString(),
    };

    try {
      const res = await onRegistrationSuccess(newEntry);
      setIsSubmitting(false);

      if (res && res.success === false) {
        setErrors(prev => ({ ...prev, general: res.message || 'Pendaftaran gagal diproses oleh server.' }));
        return;
      }

      setRegisteredData(res?.data || newEntry);
      setSuccessModalOpen(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#085F3B', '#10B981', '#34D399', '#FBBF24']
        });
      } catch (err) {
        // fallback
      }

      setFormData({
        nama: '',
        noWa: '',
        prodi: '',
        semester: '',
        tahunWapa: '',
      });
    } catch (err) {
      setIsSubmitting(false);
      setErrors(prev => ({ ...prev, general: 'Terjadi kesalahan sistem saat mengirim data.' }));
    }
  };

  return (
    <section id="daftar-section" className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Bagian Kiri: Ilustrasi / Foto Kader */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#EAF6ED] via-[#F3FAF5] to-white p-6 sm:p-10 flex flex-col justify-center items-center text-center relative border-b lg:border-b-0 lg:border-r border-emerald-100/80 min-h-[380px]">
              
              {/* Slogan Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-emerald-200 shadow-sm px-3.5 py-1.5 rounded-2xl transform rotate-2 z-20">
                <span className="text-xs sm:text-sm font-extrabold text-brand-primary tracking-wide">
                  {slogan}
                </span>
              </div>

              {kaderImage ? (
                <div className="w-full max-w-[280px] sm:max-w-xs h-80 rounded-2xl overflow-hidden border border-emerald-200 shadow-md relative">
                  <img src={kaderImage} alt="Kader Himmah NWDI" className="w-full h-full object-cover" />
                </div>
              ) : (
                <KaderIllustration className="w-full max-w-[280px] sm:max-w-xs mx-auto" />
              )}
            </div>

            {/* Bagian Kanan: Formulir Pendaftaran */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
              
              <div className="flex items-start gap-3.5 mb-6 sm:mb-8">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100/80 text-brand-primary flex items-center justify-center shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errors.general && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errors.general}</span>
                  </div>
                )}
                
                {/* 2 Kolom: Nama Lengkap & Nomor WhatsApp (No. WA) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Masukkan nama lengkap"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition focus:outline-none focus:ring-2 ${
                          errors.nama ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-brand-primary focus:ring-emerald-100'
                        }`}
                      />
                    </div>
                    {errors.nama && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.nama}</span>
                      </p>
                    )}
                  </div>

                  {/* Nomor WhatsApp (No. WA) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      No. WhatsApp (WA)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 text-emerald-600" />
                      </div>
                      <input
                        type="tel"
                        name="noWa"
                        value={formData.noWa}
                        onChange={handleChange}
                        placeholder="Contoh: 081234567890"
                        className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition focus:outline-none focus:ring-2 ${
                          errors.noWa ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-brand-primary focus:ring-emerald-100'
                        }`}
                      />
                    </div>
                    {errors.noWa && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.noWa}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* 2 Kolom: Program Studi & Semester */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Prodi */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Program Studi (Prodi)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <select
                        name="prodi"
                        value={formData.prodi}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-8 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition focus:outline-none focus:ring-2 appearance-none ${
                          errors.prodi ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-brand-primary focus:ring-emerald-100'
                        }`}
                      >
                        <option value="">Pilih Prodi</option>
                        {PRODI_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                    {errors.prodi && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.prodi}</span>
                      </p>
                    )}
                  </div>

                  {/* Semester */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Semester
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-8 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition focus:outline-none focus:ring-2 appearance-none ${
                          errors.semester ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-brand-primary focus:ring-emerald-100'
                        }`}
                      >
                        <option value="">Pilih Semester</option>
                        {SEMESTER_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                    {errors.semester && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.semester}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Tahun WaPA */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Tahun WaPA
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <select
                      name="tahunWapa"
                      value={formData.tahunWapa}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-8 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white transition focus:outline-none focus:ring-2 appearance-none ${
                        errors.tahunWapa ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:border-brand-primary focus:ring-emerald-100'
                      }`}
                    >
                      <option value="">Pilih Tahun WaPA</option>
                      {TAHUN_WAPA_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                  </div>
                  {errors.tahunWapa && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.tahunWapa}</span>
                    </p>
                  )}
                </div>

                {/* Field Kelas Pilihan Dinamis */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                      Komunitas Pilihan
                    </label>
                    <span className="text-[11px] text-slate-400">
                      (Bisa memilih 1 atau lebih)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedClasses.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">Belum ada komunitas yang dipilih</span>
                      ) : (
                        selectedClasses.map((cls) => (
                          <span 
                            key={cls}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-brand-primary text-xs font-semibold shadow-xs"
                          >
                            <span>{cls}</span>
                            <button
                              type="button"
                              onClick={() => toggleClass(cls)}
                              className="w-4 h-4 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-[10px]"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      {availableClassNames.map((cls) => {
                        const isChosen = selectedClasses.includes(cls);
                        return (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => toggleClass(cls)}
                            className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                              isChosen
                                ? 'bg-emerald-100 text-brand-900 border-emerald-300 font-semibold'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {isChosen ? `✓ ${cls}` : `+ ${cls}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {errors.kelas && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.kelas}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-full shadow-lg shadow-emerald-950/15 hover:shadow-emerald-950/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Memproses Pendaftaran...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Daftar Sekarang</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>

      </div>

      {/* Modal Sukses Pendaftaran */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 text-center relative animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Pendaftaran Berhasil!
            </h4>
            <p className="text-sm text-slate-600 mb-6">
              Selamat, data Anda telah berhasil tersimpan dalam sistem pendaftaran komunitas kader Himmah NWDI Kom. Teknik.
            </p>

            {registeredData && (
              <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs sm:text-sm space-y-2 mb-6 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama:</span>
                  <span className="font-semibold text-slate-800">{registeredData.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. WhatsApp:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {registeredData.noWa}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Prodi:</span>
                  <span className="font-semibold text-slate-800">{registeredData.prodi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Semester / WaPA:</span>
                  <span className="font-semibold text-slate-800">Sem. {registeredData.semester} / {registeredData.tahunWapa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Komunitas:</span>
                  <span className="font-semibold text-brand-primary">{registeredData.kelas.join(', ')}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setSuccessModalOpen(false)}
              className="w-full py-3 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-dark transition shadow-md"
            >
              Tutup & Selesai
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
