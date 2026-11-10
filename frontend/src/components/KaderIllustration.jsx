import React from 'react';

export default function KaderIllustration({ className = "w-full max-w-[280px] sm:max-w-xs" }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 sm:p-6 text-center ${className}`}>
      {/* Logo Tanpa Background */}
      <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center transition-transform hover:scale-105 duration-300">
        <img 
          src="/logo-himmah.svg" 
          alt="Logo Himmah NWDI" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-4 space-y-1">
        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Himmah NWDI
        </h4>
        <p className="text-sm font-semibold text-brand-primary">
          Komisariat Teknik
        </p>
      </div>
    </div>
  );
}
