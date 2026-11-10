export default function InfoSection({ onRegisterClick }) {
  const steps = [
    {
      num: '01',
      title: 'Pilih Komunitas Peminatan',
      desc: 'Tentukan satu atau lebih komunitas: Pemrograman Web, Robotik, atau Desain Grafis sesuai minatmu.'
    },
    {
      num: '02',
      title: 'Isi Formulir Online',
      desc: 'Lengkapi data identitas kader, Program Studi, Semester aktif, dan Tahun pelaksanaan WaPA.'
    },
    {
      num: '03',
      title: 'Konfirmasi WhatsApp',
      desc: 'Setelah terdaftar, bergabung ke grup koordinasi komunitas kader melalui kontak admin.'
    },
    {
      num: '04',
      title: 'Mulai Pembelajaran',
      desc: 'Ikuti sesi pelatihan intensif mingguan bersama mentor berpengalaman dari pengurus teknik.'
    }
  ];

  return (
    <section id="informasi-section" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-primary text-xs font-bold mb-3 border border-emerald-100">
            Alur & Jadwal
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Informasi Pendaftaran Komunitas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Ikuti 4 langkah mudah berikut untuk bergabung dalam program pembinaan kader teknik.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative p-6 rounded-3xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="text-3xl font-black text-emerald-600/20 group-hover:text-brand-primary transition-colors mb-3">
                {step.num}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Info Banner Box */}
        <div className="bg-gradient-to-r from-brand-primary to-emerald-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold">
              Siap Mengembangkan Potensimu?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Program komunitas ini gratis dan diprioritaskan bagi seluruh kader aktif Himmah NWDI Komisariat Teknik. Kuota terbatas untuk efektivitas pendampingan praktek.
            </p>
          </div>

          <button
            onClick={onRegisterClick}
            className="shrink-0 px-6 py-3 rounded-full bg-white text-brand-primary font-bold text-sm shadow-md hover:bg-emerald-50 transition transform hover:scale-105"
          >
            Daftar Sekarang
          </button>
        </div>

      </div>
    </section>
  );
}
