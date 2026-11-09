import React from 'react';
import { ImagePlus } from 'lucide-react';
import Logo from './Logo';

export default function KaderIllustration({ className = "w-full max-w-[280px] sm:max-w-xs" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center p-6 sm:p-8 h-80 rounded-2xl border-2 border-dashed border-emerald-200/90 bg-emerald-50/50 text-center ${className}`}>
      {/* Background Organic Blur */}
      <div className="w-28 h-28 bg-emerald-200/50 rounded-full blur-xl absolute -z-10"></div>

      {/* Logo Container */}
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center mb-4 transform hover:scale-105 transition-transform">
        <Logo size="md" showText={false} />
      </div>

      <div className="space-y-1.5 max-w-[220px]">
        <div className="flex items-center justify-center gap-1.5 text-brand-primary text-xs font-bold">
          <ImagePlus className="w-4 h-4" />
          <span>Foto / Banner Kader</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Gambar dapat dimasukkan atau diganti melalui Dashboard Admin
        </p>
      </div>

      {/* Identity Badge */}
      <div className="mt-5 px-3 py-1 rounded-full bg-white/90 border border-emerald-100 text-[10px] font-semibold text-brand-800 shadow-2xs">
        Himmah NWDI Kom. Teknik
      </div>
    </div>
  );
}
