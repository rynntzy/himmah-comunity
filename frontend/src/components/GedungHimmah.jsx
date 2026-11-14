import React from 'react';

export default function GedungHimmah({ className = "w-full h-full object-cover rounded-3xl shadow-lg" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-tr from-emerald-100 via-teal-50 to-white border border-emerald-100/80 shadow-md ${className}`}>
      {/* Background Soft Glow & Sky */}
      <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBEFE0"/>
            <stop offset="60%" stopColor="#EBF8F2"/>
            <stop offset="100%" stopColor="#FFFFFF"/>
          </linearGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF"/>
            <stop offset="100%" stopColor="#E2E8F0"/>
          </linearGradient>
          <linearGradient id="greenRoofGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B7347"/>
            <stop offset="100%" stopColor="#06482C"/>
          </linearGradient>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B3E28"/>
            <stop offset="100%" stopColor="#021C11"/>
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Sky */}
        <rect width="600" height="400" fill="url(#skyGrad)"/>

        {/* Cloud silhouettes */}
        <path d="M 40,80 Q 70,50 110,70 Q 140,55 170,80 Z" fill="#FFFFFF" opacity="0.6"/>
        <path d="M 450,60 Q 480,35 520,50 Q 550,40 570,60 Z" fill="#FFFFFF" opacity="0.6"/>

        {/* Tiang Bendera */}
        <rect x="298" y="30" width="3" height="150" fill="#94A3B8"/>
        <polygon points="301,35 340,47 301,60" fill="#EF4444"/>
        <polygon points="301,47 340,47 340,60 301,60" fill="#FFFFFF"/>

        {/* Gedung Utama Lantai 2 & 1 */}
        {/* Atap & Lis Hijau Atas */}
        <rect x="110" y="90" width="380" height="14" rx="3" fill="url(#greenRoofGrad)" filter="url(#shadow)"/>
        
        {/* Dinding Putih Lantai 2 */}
        <rect x="125" y="104" width="350" height="96" fill="url(#wallGrad)"/>
        
        {/* Pilar-Pilar Lantai 2 */}
        {[140, 185, 230, 275, 320, 365, 410, 455].map((x, i) => (
          <rect key={i} x={x} y="104" width="8" height="96" fill="#085F3B"/>
        ))}

        {/* Jendela-jendela Kaca Hijau Tua Gelap Lantai 2 */}
        {[155, 200, 245, 290, 335, 380, 425].map((x, i) => (
          <g key={i}>
            <rect x={x} y="118" width="24" height="66" rx="3" fill="url(#glassGrad)"/>
            <rect x={x+2} y="120" width="10" height="30" fill="#0E583A" opacity="0.6"/>
            <rect x={x+2} y="152" width="20" height="2" fill="#085F3B"/>
          </g>
        ))}

        {/* Kanopi Lis Tengah */}
        <rect x="105" y="200" width="390" height="12" rx="2" fill="url(#greenRoofGrad)" filter="url(#shadow)"/>

        {/* Dinding Lantai 1 */}
        <rect x="120" y="212" width="360" height="130" fill="#F8FAFC"/>

        {/* Serambi Lengkungan Khas (Arches) Lantai 1 */}
        <path d="M 135,342 L 135,240 Q 160,215 185,240 L 185,342 Z" fill="#E2E8F0"/>
        <path d="M 140,342 L 140,245 Q 160,225 180,245 L 180,342 Z" fill="url(#glassGrad)"/>

        <path d="M 195,342 L 195,240 Q 220,215 245,240 L 245,342 Z" fill="#E2E8F0"/>
        <path d="M 200,342 L 200,245 Q 220,225 240,245 L 240,342 Z" fill="url(#glassGrad)"/>

        {/* Pintu Gerbang Tengah & Plang Nama Utama */}
        {/* Plang Nama Hijau Persegi Panjang Besar */}
        <rect x="290" y="145" width="180" height="54" rx="8" fill="#085F3B" stroke="#FFFFFF" stroke-width="2.5" filter="url(#shadow)"/>
        
        {/* Logo NWDI kecil di plang */}
        <circle cx="316" cy="172" r="14" fill="#FFFFFF"/>
        <circle cx="316" cy="172" r="12" fill="#0A7046"/>
        <path d="M 310,172 Q 316,168 322,172" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
        <circle cx="316" cy="166" r="1.5" fill="#FFFFFF"/>

        {/* Tulisan Plang */}
        <text x="338" y="167" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="system-ui" letterSpacing="0.5">HIMMAH NWDI</text>
        <text x="348" y="183" fill="#D1FAE5" fontSize="11" fontWeight="600" fontFamily="system-ui" letterSpacing="0.5">KOM. TEKNIK</text>

        {/* Lengkungan Pintu Utama */}
        <path d="M 265,342 L 265,230 Q 300,205 335,230 L 335,342 Z" fill="#064E2E"/>
        <path d="M 272,342 L 272,238 Q 300,218 328,238 L 328,342 Z" fill="#022817"/>
        {/* Garis Kaca Pintu */}
        <line x1="300" y1="220" x2="300" y2="342" stroke="#085F3B" stroke-width="2"/>

        {/* Lengkungan Kanan */}
        <path d="M 355,342 L 355,240 Q 380,215 405,240 L 405,342 Z" fill="#E2E8F0"/>
        <path d="M 360,342 L 360,245 Q 380,225 400,245 L 400,342 Z" fill="url(#glassGrad)"/>

        <path d="M 415,342 L 415,240 Q 440,215 465,240 L 465,342 Z" fill="#E2E8F0"/>
        <path d="M 420,342 L 420,245 Q 440,225 460,245 L 460,342 Z" fill="url(#glassGrad)"/>

        {/* Pohon Cemara Kerucut di Depan Kiri & Kanan */}
        {/* Pohon Kiri */}
        <g>
          <rect x="80" y="310" width="8" height="35" fill="#583112"/>
          <polygon points="84,210 65,270 103,270" fill="#0B5F39"/>
          <polygon points="84,240 60,300 108,300" fill="#0D7245"/>
          <polygon points="84,270 54,330 114,330" fill="#085532"/>
        </g>
        {/* Pohon Rindang Depan */}
        <circle cx="210" cy="325" r="22" fill="#15803D" opacity="0.9"/>
        <circle cx="225" cy="315" r="18" fill="#16A34A" opacity="0.95"/>
        <circle cx="195" cy="320" r="16" fill="#166534" opacity="0.85"/>

        {/* Pohon Kanan */}
        <g>
          <rect x="510" y="300" width="10" height="45" fill="#583112"/>
          <polygon points="515,190 492,260 538,260" fill="#0B5F39"/>
          <polygon points="515,230 486,295 544,295" fill="#0D7245"/>
          <polygon points="515,260 480,335 550,335" fill="#085532"/>
        </g>

        {/* Halaman / Paving Depan Gedung */}
        <rect x="0" y="342" width="600" height="58" fill="#E2E8F0"/>
        <line x1="0" y1="342" x2="600" y2="342" stroke="#CBD5E1" stroke-width="3"/>
        {/* Pola Paving Keramik */}
        {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550].map((x, i) => (
          <line key={i} x1={x} y1="342" x2={x - 20} y2="400" stroke="#CBD5E1" stroke-width="1" opacity="0.6"/>
        ))}
        <line x1="0" y1="370" x2="600" y2="370" stroke="#CBD5E1" stroke-width="1" opacity="0.6"/>
        
        {/* Rerumputan Hijau di Pinggir */}
        <rect x="0" y="385" width="600" height="15" fill="#16A34A" opacity="0.85"/>
      </svg>
    </div>
  );
}
