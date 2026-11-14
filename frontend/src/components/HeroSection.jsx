import React from 'react';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import GedungHimmah from './GedungHimmah';

export default function HeroSection({ heroConfig, onRegisterClick }) {
  const {
    titlePrefix = 'Himmah NWDI',
    titleSuffix = 'Kom. Teknik',
    subtitle = 'Bersama Mencetak Kader Unggul, Kreatif, dan Berdaya Saing di Era Digital',
    badgeText = 'Penerimaan Komunitas Kader 2025/2026',
    ctaText = 'Daftar Komunitas',
    heroImage = null
  } = heroConfig || {};

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -z-10 -translate-x-20 -translate-y-20"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl -z-10 translate-x-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Kolom Kiri: Teks & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Badge kecil */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 text-brand-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{badgeText}</span>
            </div>

            {/* Judul Utama */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {titlePrefix}
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-brand-primary tracking-tight leading-[1.15]">
                {titleSuffix}
              </h2>
            </div>

            {/* Sub-judul */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {subtitle}
            </p>

            {/* Tombol CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-primary hover:bg-brand-dark text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-lg shadow-emerald-950/15 hover:shadow-emerald-950/25 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-emerald-200 transition-transform group-hover:scale-110" />
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Visual Gedung / Custom Image */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <div className="aspect-[4/3] w-full">
                {heroImage ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-emerald-100 shadow-xl group">
                    <img 
                      src={heroImage} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <GedungHimmah className="w-full h-full object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300" />
                )}
              </div>

              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-brand-100 rounded-full -z-10 opacity-70 blur-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
