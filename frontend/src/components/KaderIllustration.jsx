import React from 'react';

export default function KaderIllustration({ className = "w-full max-w-sm" }) {
  return (
    <div className={`relative flex flex-col items-center justify-end ${className}`}>
      {/* Background Organic Green Blobs */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-tr from-brand-100 to-emerald-200/60 rounded-full blur-2xl transform -translate-y-4"></div>
        <div className="absolute bottom-0 w-full h-44 bg-brand-50/80 rounded-3xl"></div>
      </div>

      {/* Slogan Text: Belajar • Berkarya • Berkhidmat */}
      <div className="absolute top-4 right-1 sm:right-3 bg-white/95 backdrop-blur-sm border border-emerald-200 shadow-sm px-3.5 py-1.5 rounded-2xl transform rotate-3 z-20">
        <span className="text-xs sm:text-sm font-extrabold text-brand-primary tracking-wide">
          Belajar • Berkarya • Berkhidmat
        </span>
      </div>

      {/* SVG Ilustrasi Kader Pria */}
      <svg 
        viewBox="0 0 320 380" 
        className="w-full h-auto drop-shadow-md z-10" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDDFBA"/>
            <stop offset="100%" stopColor="#E0AB76"/>
          </linearGradient>
          <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2F35"/>
            <stop offset="100%" stopColor="#111827"/>
          </linearGradient>
          <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B6B43"/>
            <stop offset="100%" stopColor="#06482C"/>
          </linearGradient>
          <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B"/>
            <stop offset="100%" stopColor="#0F172A"/>
          </linearGradient>
        </defs>

        {/* Leher & Jakun */}
        <path d="M 145,145 L 145,185 L 175,185 L 175,145 Z" fill="#E2AC7B"/>
        <path d="M 148,160 Q 160,172 172,160 L 172,185 L 148,185 Z" fill="#D39864" opacity="0.3"/>

        {/* Kepala & Wajah */}
        <path d="M 125,95 Q 120,135 140,158 Q 160,175 180,158 Q 200,135 195,95 Q 160,80 125,95 Z" fill="url(#skin)"/>
        
        {/* Telinga */}
        <ellipse cx="123" cy="118" rx="8" ry="12" fill="#E8B583"/>
        <ellipse cx="197" cy="118" rx="8" ry="12" fill="#E8B583"/>

        {/* Rambut Modern Rapih */}
        <path d="M 118,92 Q 130,55 160,55 Q 195,55 202,88 Q 190,75 160,75 Q 130,75 118,92 Z" fill="url(#hair)"/>
        <path d="M 125,85 Q 155,70 185,82 Q 192,86 195,98 Q 185,88 170,88 Q 140,88 128,102 Z" fill="url(#hair)"/>
        <path d="M 118,92 L 124,115 L 128,95 Z" fill="url(#hair)"/>
        <path d="M 202,92 L 196,115 L 192,95 Z" fill="url(#hair)"/>

        {/* Alis & Mata Ramah Bersemangat */}
        {/* Alis */}
        <path d="M 136,104 Q 147,100 155,103" stroke="#1F2937" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 166,103 Q 174,100 185,104" stroke="#1F2937" stroke-width="3" stroke-linecap="round" fill="none"/>
        {/* Mata */}
        <ellipse cx="146" cy="113" rx="4" ry="4.5" fill="#1F2937"/>
        <circle cx="147.5" cy="111.5" r="1.5" fill="#FFFFFF"/>
        <ellipse cx="174" cy="113" rx="4" ry="4.5" fill="#1F2937"/>
        <circle cx="175.5" cy="111.5" r="1.5" fill="#FFFFFF"/>
        {/* Hidung */}
        <path d="M 160,113 L 157,126 L 163,126" stroke="#D39864" stroke-width="2" stroke-linecap="round" fill="none"/>
        {/* Senyum Ramah */}
        <path d="M 148,135 Q 160,147 172,135" stroke="#9A3412" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 152,136 Q 160,143 168,136" fill="#FFFFFF"/>

        {/* Kemeja Hijau Himmah NWDI */}
        {/* Pundak & Tubuh */}
        <path d="M 145,182 L 80,215 L 60,370 L 260,370 L 240,215 L 175,182 Z" fill="url(#shirt)"/>

        {/* Kerah Kemeja */}
        <polygon points="146,182 125,208 152,212 160,192" fill="#0D7F50"/>
        <polygon points="174,182 195,208 168,212 160,192" fill="#0A7046"/>

        {/* Garis Kancing Kemeja */}
        <line x1="160" y1="212" x2="160" y2="370" stroke="#053F24" stroke-width="2.5"/>
        <circle cx="160" cy="235" r="3.5" fill="#FFFFFF"/>
        <circle cx="160" cy="270" r="3.5" fill="#FFFFFF"/>
        <circle cx="160" cy="305" r="3.5" fill="#FFFFFF"/>
        <circle cx="160" cy="340" r="3.5" fill="#FFFFFF"/>

        {/* Saku Dada & Logo Mini NWDI */}
        <rect x="180" y="240" width="28" height="32" rx="3" fill="#085533" stroke="#053F24" stroke-width="1.5"/>
        <circle cx="194" cy="256" r="8" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="194" cy="256" r="6" fill="#0A7046"/>
        <polygon points="194,252 196,255 198,255 196,257 197,259 194,258 191,259 192,257 190,255 192,255" fill="#FFFFFF"/>

        {/* Tali Ransel Hitam di Bahu Kanan */}
        <path d="M 98,210 L 88,320 L 75,320 L 88,210 Z" fill="url(#strap)"/>
        <rect x="80" y="270" width="14" height="18" rx="2" fill="#475569"/>

        {/* Lengan Kiri & Kepalan Tangan Semangat */}
        <path d="M 230,225 Q 265,245 255,295 L 235,310 Q 240,265 215,245 Z" fill="url(#shirt)"/>
        {/* Tangan Mengepal */}
        <g transform="translate(242, 280)">
          {/* Lengan bawah */}
          <path d="M 0,15 L 12,-10 L 25,-4 L 14,20 Z" fill="url(#skin)"/>
          {/* Kepalan */}
          <circle cx="18" cy="-14" r="14" fill="#E8B583"/>
          <ellipse cx="14" cy="-12" rx="4" ry="7" fill="#D39864" transform="rotate(-20 14 -12)"/>
          <ellipse cx="20" cy="-15" rx="4" ry="7" fill="#D39864" transform="rotate(-10 20 -15)"/>
          <ellipse cx="26" cy="-14" rx="3.5" ry="6" fill="#D39864"/>
          {/* Ibu jari mengepal */}
          <path d="M 8,-8 Q 16,-6 20,-10" stroke="#B87B4C" stroke-width="2" fill="none" stroke-linecap="round"/>
        </g>
      </svg>
    </div>
  );
}
