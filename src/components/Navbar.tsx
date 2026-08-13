import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Tag, 
  MapPin, 
  Award, 
  MessageSquareQuote, 
  HelpCircle, 
  Link as LinkIcon, 
  Settings, 
  MessageCircle, 
  ChevronRight,
  X,
  Menu
} from 'lucide-react';
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

  const navLinks = [
    { href: '#program', label: 'Program Kursus', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { href: '#harga', label: 'Paket Harga', icon: Tag, color: 'text-emerald-600 bg-emerald-50' },
    { href: '#lokasi', label: 'Lokasi & HTM', icon: MapPin, color: 'text-cyan-600 bg-cyan-50' },
    { href: '#keunggulan', label: 'Keunggulan Pelatih', icon: Award, color: 'text-amber-600 bg-amber-50' },
    { href: '#testimoni', label: 'Testimoni Alumni', icon: MessageSquareQuote, color: 'text-purple-600 bg-purple-50' },
    { href: '#faq', label: 'FAQ (Pertanyaan Umum)', icon: HelpCircle, color: 'text-teal-600 bg-teal-50' },
  ];

  // Instant single-tap navigation scroll handler
  const handleNavClick = (e: React.SyntheticEvent, href: string) => {
    e.preventDefault();
    
    // Instantly close mobile drawer
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Special route for LinkBio
    if (targetId === 'links' || targetId === 'bio') {
      window.history.pushState({}, '', 'links');
      window.dispatchEvent(new Event('hashchange'));
      window.scrollTo(0, 0);
      return;
    }

    // Smooth scroll to section after closing menu
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 40);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b ${
        scrolled 
          ? 'border-slate-300 py-2.5 shadow-md' 
          : 'border-slate-200 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Official Full Logo Brand Image (Icon + Text Combined) */}
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center group text-left cursor-pointer"
            >
              <img 
                src="./aqualux-logo.webp" 
                alt="AQUALUX Swimming Course" 
                width="160"
                height="54"
                className="h-12 sm:h-15 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>

            {/* Desktop Nav Pills */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-800">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-700 hover:shadow-xs transition-all cursor-pointer"
                >
                  {item.label.split(' ')[0]} {item.label.split(' ')[1] || ''}
                </a>
              ))}
            </nav>

            {/* Desktop CTA WhatsApp */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => openWaModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all btn-hover-effect btn-tactile cursor-pointer"
              >
                <PhoneIcon className="w-4 h-4 text-white" />
                <span>Chat Admin WA</span>
              </button>
            </div>

            {/* Android / Mobile Hamburger Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 font-bold flex items-center justify-center transition-colors hover:bg-slate-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-6 h-6 text-slate-900" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-6 h-6 text-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>

        {/* Android / Mobile Drawer Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white border-t border-slate-200 shadow-2xl"
            >
              <div className="px-4 py-4 space-y-2 text-slate-900 max-h-[80vh] overflow-y-auto">
                
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-3 pt-1 pb-1">
                  NAVIGASI UTAMA AQUALUX
                </span>

                {/* Instant Single-Tap Nav Buttons */}
                {navLinks.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.href}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.025 }}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-slate-200/80 transition-all text-xs font-extrabold text-slate-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center shrink-0 shadow-xs`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </motion.button>
                  );
                })}

                <div className="pt-2 space-y-2 border-t border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-3 pt-1">
                    HALAMAN & PORTAL
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleNavClick(e, '#links')}
                    className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 transition-all text-xs font-extrabold text-blue-900 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <LinkIcon className="w-4.5 h-4.5" />
                      </div>
                      <span>Link in Bio (/links)</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </button>

                  {onOpenAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full text-left flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 transition-all text-xs font-extrabold text-slate-900 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Settings className="w-4.5 h-4.5" />
                        </div>
                        <span>Portal Admin Aqualux (/admin)</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  )}
                </div>

                {/* Primary WhatsApp Mobile Button */}
                <div className="pt-3 pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openWaModal();
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                    <span>Hubungi Admin WA (Faqih / Abed)</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay when mobile menu is open */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};
