import React from 'react';
import Logo from './Logo';
import { Youtube, Instagram, Send } from 'lucide-react';

export default function Footer({ contactConfig = {} }) {
  const {
    footerSlogan = 'Bersama Membangun Kader yang Berilmu dan Berakhlaq Mulia',
    instagramUrl = 'https://instagram.com',
    youtubeUrl = 'https://youtube.com',
    telegramUrl = 'https://t.me'
  } = contactConfig;

  return (
    <footer className="relative bg-[#06482C] text-white overflow-hidden mt-12">
      {/* Decorative Wave Sesuai Gambar Referensi */}
      <div className="w-full overflow-hidden leading-none">
        <svg 
          viewBox="0 0 1200 60" 
          preserveAspectRatio="none" 
          className="relative block w-full h-8 text-[#F6FAF7] fill-current"
        >
          <path d="M0,0 C300,50 900,0 1200,45 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo Putih */}
          <div className="flex items-center justify-center md:justify-start">
            <Logo size="md" variant="white" />
          </div>

          {/* Slogan Dinamis Tengah */}
          <div className="text-xs sm:text-sm text-emerald-100 font-medium italic max-w-md">
            "{footerSlogan}"
          </div>

          {/* Icon Sosial Media Dinamis */}
          <div className="flex items-center gap-3">
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

        {/* Garis batas tipis & Copyright */}
        <div className="mt-6 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/70 gap-2">
          <p>© {new Date().getFullYear()} Himmah NWDI Kom. Teknik. Hak Cipta Dilindungi.</p>
          <p>Sistem Pendaftaran Kelas Khusus Kader</p>
        </div>
      </div>
    </footer>
  );
}
