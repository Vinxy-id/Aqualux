import React, { useState, useEffect } from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { useAqualuxData } from '../context/AqualuxDataContext';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { openWaModal } = useAqualuxData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white border-b ${
      scrolled 
        ? 'border-slate-300 py-2.5 shadow-md' 
        : 'border-slate-200 py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Logo Brand + Text Title */}
          <a href="#" className="flex items-center gap-2.5 group text-left">
            <img 
              src="./aqualux-logo.png" 
              alt="AQUALUX Private Swim" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl font-outfit text-slate-950 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                AQUALUX
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-blue-700 tracking-wider uppercase leading-tight mt-0.5">
                Private Swim
              </span>
            </div>
          </a>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-800">
            <a href="#program" className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all">Program Kursus</a>
            <a href="#lokasi" className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all">Lokasi & HTM</a>
            <a href="#keunggulan" className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all">Keunggulan Pelatih</a>
            <a href="#testimoni" className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all">Testimoni Alumni</a>
            <a href="#faq" className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all">FAQ</a>
          </nav>

          {/* Desktop CTA WhatsApp */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openWaModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all btn-hover-effect btn-tactile"
            >
              <PhoneIcon className="w-4 h-4 text-white" />
              <span>Chat Admin WA</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-300 px-4 py-5 space-y-3 text-slate-900 text-sm font-bold">
          <a href="#program" onClick={() => setMobileMenuOpen(false)} className="block py-2">Program Kursus</a>
          <a href="#lokasi" onClick={() => setMobileMenuOpen(false)} className="block py-2">Lokasi Hotel & HTM</a>
          <a href="#keunggulan" onClick={() => setMobileMenuOpen(false)} className="block py-2">Keunggulan Pelatih</a>
          <a href="#testimoni" onClick={() => setMobileMenuOpen(false)} className="block py-2">Testimoni Alumni</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2">FAQ</a>
          <a href="#links" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-blue-700">● Link in Bio (/links)</a>

          {onOpenAdmin && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left py-2 text-blue-700 font-extrabold block border-t border-slate-100 pt-3"
            >
              ⚙️ Portal Admin Aqualux (/admin)
            </button>
          )}
          
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openWaModal();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md mt-2"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>Hubungi Admin WA (Faqih / Abed)</span>
          </button>
        </div>
      )}
    </header>
  );
};
