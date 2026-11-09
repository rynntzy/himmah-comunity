import React, { useState } from 'react';
import Logo from './Logo';
import { MessageCircle, Menu, X } from 'lucide-react';

export default function Header({ onNavigate, contactConfig = {} }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    whatsappNumber = '6281234567890',
    whatsappText = 'Halo Admin Himmah NWDI Kom. Teknik'
  } = contactConfig;

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'kelas', label: 'Kelas Khusus' },
    { id: 'informasi', label: 'Informasi' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-emerald-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('beranda')} 
          className="cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <Logo size="md" />
        </div>

        {/* Desktop Nav Links (Pill Style) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4F9F5] p-1.5 rounded-full border border-emerald-100/80">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer text-slate-600 hover:text-brand-primary hover:bg-emerald-50/70"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Button: Hubungi Kami (WhatsApp Dinamis) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm shadow-emerald-950/10 transition-all hover:shadow hover:-translate-y-0.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Hubungi Kami</span>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* WhatsApp Direct Icon */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-sm"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
          </a>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2 pb-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 hover:bg-emerald-50 hover:text-brand-primary transition cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
