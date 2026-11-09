import React from 'react';

export default function ClassCardVisual({ type }) {
  if (type === 'web') {
    return (
      <div className="w-24 h-20 sm:w-28 sm:h-24 flex items-center justify-center">
        {/* 3D Stylized Laptop */}
        <svg viewBox="0 0 140 110" className="w-full h-full drop-shadow-md">
          {/* Laptop Screen */}
          <rect x="22" y="12" width="96" height="66" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
          {/* Display Area */}
          <rect x="27" y="17" width="86" height="56" rx="3" fill="#0F172A"/>
          {/* Code Window Header */}
          <circle cx="35" cy="24" r="2.5" fill="#EF4444"/>
          <circle cx="43" cy="24" r="2.5" fill="#F59E0B"/>
          <circle cx="51" cy="24" r="2.5" fill="#10B981"/>
          {/* Code Glowing Center </> */}
          <text x="70" y="54" fill="#38BDF8" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            &lt;/&gt;
          </text>
          {/* Laptop Base (Keyboard & Trackpad) */}
          <path d="M 10,78 L 130,78 L 122,96 L 18,96 Z" fill="#94A3B8"/>
          <path d="M 12,80 L 128,80 L 120,94 L 20,94 Z" fill="#CBD5E1"/>
          {/* Notch / Trackpad */}
          <rect x="58" y="82" width="24" height="7" rx="1.5" fill="#94A3B8"/>
        </svg>
      </div>
    );
  }

  if (type === 'robotics') {
    return (
      <div className="w-24 h-20 sm:w-28 sm:h-24 flex items-center justify-center">
        {/* 3D Stylized Robot Rover */}
        <svg viewBox="0 0 140 110" className="w-full h-full drop-shadow-md">
          {/* Antena */}
          <line x1="70" y1="18" x2="70" y2="30" stroke="#64748B" stroke-width="3"/>
          <circle cx="70" cy="16" r="4.5" fill="#10B981"/>

          {/* Roda Kiri & Kanan */}
          <rect x="20" y="62" width="18" height="34" rx="5" fill="#334155"/>
          <rect x="102" y="62" width="18" height="34" rx="5" fill="#334155"/>
          {/* Velg Roda */}
          <circle cx="29" cy="79" r="6" fill="#94A3B8"/>
          <circle cx="111" cy="79" r="6" fill="#94A3B8"/>

          {/* Body Robot */}
          <rect x="36" y="50" width="68" height="36" rx="8" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2"/>
          {/* Garis Aksen Hijau */}
          <rect x="42" y="72" width="56" height="5" rx="2" fill="#10B981"/>

          {/* Kepala Robot */}
          <rect x="44" y="28" width="52" height="32" rx="7" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
          {/* Layar Mata Kaca Hitam */}
          <rect x="50" y="34" width="40" height="16" rx="5" fill="#0F172A"/>
          {/* Mata LED Biru Bercahaya */}
          <ellipse cx="61" cy="42" rx="5" ry="4" fill="#38BDF8"/>
          <ellipse cx="79" cy="42" rx="5" ry="4" fill="#38BDF8"/>
        </svg>
      </div>
    );
  }

  // Desain Grafis
  return (
    <div className="w-24 h-20 sm:w-28 sm:h-24 flex items-center justify-center">
      {/* 3D Stylized Drawing Tablet & Stylus & Color Swatches */}
      <svg viewBox="0 0 140 110" className="w-full h-full drop-shadow-md">
        {/* Tablet Pen Drawing Board */}
        <rect x="24" y="22" width="76" height="64" rx="7" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
        {/* Screen Drawing Active Area */}
        <rect x="30" y="28" width="52" height="52" rx="4" fill="#0F172A"/>
        {/* Color Palette Dots on screen */}
        <circle cx="40" cy="40" r="4.5" fill="#EF4444"/>
        <circle cx="56" cy="40" r="4.5" fill="#3B82F6"/>
        <circle cx="72" cy="40" r="4.5" fill="#10B981"/>
        <circle cx="40" cy="56" r="4.5" fill="#F59E0B"/>
        <circle cx="56" cy="56" r="4.5" fill="#8B5CF6"/>
        <circle cx="72" cy="56" r="4.5" fill="#EC4899"/>
        
        {/* Express Keys on tablet */}
        <circle cx="91" cy="38" r="3" fill="#64748B"/>
        <circle cx="91" cy="50" r="3" fill="#64748B"/>
        <circle cx="91" cy="62" r="3" fill="#64748B"/>

        {/* Stylus Pen miring */}
        <g transform="translate(85, 30) rotate(35)">
          <path d="M 0,0 L 8,0 L 6,55 L 4,68 L 2,55 Z" fill="#334155"/>
          <rect x="0" y="10" width="8" height="4" fill="#10B981"/>
          <circle cx="4" cy="68" r="1.5" fill="#F8FAFC"/>
        </g>
      </svg>
    </div>
  );
}
