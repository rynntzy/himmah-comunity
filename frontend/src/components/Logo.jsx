import React from 'react';

export default function Logo({ size = 'md', variant = 'default', showText = true }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16'
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${sizeClasses[size]} shrink-0 drop-shadow-sm`}>
        <img 
          src="/logo-himmah.svg" 
          alt="Logo Himmah NWDI" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className="leading-tight">
          <div className={`font-bold tracking-tight ${variant === 'white' ? 'text-white' : 'text-slate-900'} ${textClasses[size]}`}>
            Himmah NWDI
          </div>
          <div className={`font-medium ${variant === 'white' ? 'text-emerald-100' : 'text-brand-800'} text-xs tracking-wide`}>
            Kom. Teknik
          </div>
        </div>
      )}
    </div>
  );
}
