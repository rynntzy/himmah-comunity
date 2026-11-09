import React from 'react';
import { Target, BookOpen, Compass, Award } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      icon: BookOpen,
      title: 'Kader Berilmu',
      desc: 'Membekali kader dengan kompetensi teknologi dan wawasan keislaman Ahlussunnah wal Jamaah An-Nahdliyah.'
    },
    {
      icon: Target,
      title: 'Kreatif & Inovatif',
      desc: 'Mendorong daya cipta kader dalam memecahkan masalah nyata melalui karya terapan digital dan rekayasa teknik.'
    },
    {
      icon: Compass,
      title: 'Berdaya Saing',
      desc: 'Mempersiapkan kader mahasiswa teknik yang siap bersaing di kancah nasional maupun global.'
    },
    {
      icon: Award,
      title: 'Khidmat Organisasi',
      desc: 'Meneguhkan komitmen berkhidmat untuk agama, nusa, dan bangsa di bawah naungan NWDI.'
    }
  ];

  return (
    <section id="tentang-section" className="py-12 sm:py-16 bg-white border-y border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-primary text-xs font-bold mb-3 border border-emerald-100">
            Tentang Organisasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Himmah NWDI Kom. Teknik
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Himpunan Mahasiswa Nahdlatul Wathan Diniyah Islamiyah (Himmah NWDI) Komisariat Teknik merupakan wadah pembinaan integritas moral, kepemimpinan, dan profesionalisme teknik bagi para kader.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-[#F8FAF9] border border-slate-100 hover:border-emerald-200 transition-all hover:shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-brand-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
