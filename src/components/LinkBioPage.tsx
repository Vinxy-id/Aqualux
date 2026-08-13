import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  MessageCircle, 
  Calculator, 
  MapPin, 
  GraduationCap, 
  Lock, 
  Share2, 
  Check, 
  Instagram, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { isSafeExternalUrl } from '../utils/urlSafety';

interface LinkBioPageProps {
  onBackToLanding: () => void;
  onOpenAdmin: () => void;
}

export const LinkBioPage: React.FC<LinkBioPageProps> = ({ onBackToLanding }) => {
  const { adminContacts, linkBioProfile, linkBioItems } = useAqualuxData();
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}#links`;

  const cleanPhone1 = adminContacts.faqihPhone.replace(/\D/g, '');
  const formattedPhone1 = cleanPhone1.startsWith('0') ? '62' + cleanPhone1.slice(1) : cleanPhone1;
  const waAdmin1Url = `https://wa.me/${formattedPhone1}?text=${encodeURIComponent('Halo Coach Faqih Aqualux, saya ingin berkonsultasi mengenai les renang.')}`;

  const cleanPhone2 = adminContacts.abedPhone.replace(/\D/g, '');
  const formattedPhone2 = cleanPhone2.startsWith('0') ? '62' + cleanPhone2.slice(1) : cleanPhone2;
  const waAdmin2Url = `https://wa.me/${formattedPhone2}?text=${encodeURIComponent('Halo Coach Abed Aqualux, saya ingin menanyakan jadwal ketersediaan sesi.')}`;

  const handleShare = async () => {
    const shareData = {
      title: 'AQUALUX Swimming Course Malang - Link in Bio',
      text: linkBioProfile.bioText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fail silently
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-[#0264c8]" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 text-emerald-600" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-600" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-rose-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#0264c8]" />;
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'Lock': return <Lock className="w-5 h-5 text-slate-500" />;
      default: return <Sparkles className="w-5 h-5 text-[#0264c8]" />;
    }
  };

  const getBadgeStyle = (badge: string) => {
    const upper = badge.toUpperCase();
    if (upper === 'WHATSAPP') return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold';
    if (upper === 'INSTAGRAM') return 'bg-pink-100 text-pink-800 border-pink-300 font-extrabold';
    if (upper === 'WEBSITE') return 'bg-blue-100 text-blue-800 border-blue-300 font-extrabold';
    return 'bg-slate-100 text-slate-700 border-slate-300 font-extrabold';
  };

  const activeItems = linkBioItems.filter(item => item.enabled);

  return (
    <div 
      className="min-h-screen text-slate-100 font-sans relative overflow-x-hidden flex flex-col items-center py-6 px-4 selection:bg-cyan-500 selection:text-slate-950"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(255, 255, 255, 0.16) 1px, transparent 1px),
          linear-gradient(to right, rgba(255, 255, 255, 0.16) 1px, transparent 1px),
          linear-gradient(to bottom, #04091e 0%, #0a1b42 35%, #0f3468 70%, #175496 100%)
        `,
        backgroundSize: '36px 36px, 36px 36px, 100% 100%',
      }}
    >
      
      {/* Background Ambient Glows */}
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none" />
      <div className="glow-cyan-ambient w-[400px] h-[400px] bottom-10 right-10 opacity-20 pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[92vh] relative z-10">
        
        {/* Top Header Bar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBackToLanding}
              className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-slate-800 hover:text-[#0264c8] hover:bg-blue-50 transition-all cursor-pointer active:scale-95"
              title="Kembali ke Web Utama"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-mono font-black text-[#0264c8] uppercase tracking-widest bg-white px-3.5 py-1 rounded-full border-2 border-blue-300 shadow-md">
              AQUALUX OFFICIAL LINK
            </span>

            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-slate-800 hover:text-[#0264c8] hover:bg-blue-50 transition-all cursor-pointer active:scale-95 relative"
              title="Bagikan Tautan"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold text-center flex items-center justify-center gap-2 shadow-xl"
              >
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Link bio berhasil disalin ke clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Header (High Contrast on Navy Grid) */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-2xl border-4 border-[#0264c8] mx-auto overflow-hidden">
                <img 
                  src="./aqualux-logo.png" 
                  alt="AQUALUX Swimming Course" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-[#0264c8] rounded-full p-1 border-2 border-white shadow-md">
                <CheckBadgeIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-outfit tracking-tight flex items-center justify-center gap-1.5 drop-shadow-md">
              <span>{linkBioProfile.title || 'Aqualux Swimming Course'}</span>
              <CheckBadgeIcon className="w-5.5 h-5.5 text-cyan-400 shrink-0" />
            </h1>

            <p className="text-xs font-mono text-cyan-300 font-black mt-1 tracking-wide">{linkBioProfile.handle}</p>

            <p className="text-xs sm:text-sm font-semibold text-slate-100 max-w-xs sm:max-w-sm mx-auto mt-2 leading-relaxed whitespace-pre-line drop-shadow-sm">
              {linkBioProfile.bioText}
            </p>

            {/* Social Shortcut Icons (High Contrast White Buttons) */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <a
                href={waAdmin1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer active:scale-95"
                title="WhatsApp Coach Faqih"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href={waAdmin2Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer active:scale-95"
                title="WhatsApp Coach Abed"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {linkBioProfile.instagramUrl && (
                <a
                  href={linkBioProfile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all cursor-pointer active:scale-95"
                  title="Instagram Aqualux"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={onBackToLanding}
                className="w-11 h-11 rounded-2xl bg-white border-2 border-blue-200 shadow-xl flex items-center justify-center text-[#0264c8] hover:bg-[#0264c8] hover:text-white transition-all cursor-pointer active:scale-95"
                title="Website Resmi"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Royal Ocean Blue Banner Container (Matching Brosur Container Boxes) */}
          <div className="bg-[#0264c8] rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-blue-300 relative mb-6">
            
            {/* Header Pill Badge */}
            <div className="bg-white text-[#0264c8] px-4 py-1 rounded-full font-mono font-black text-xs border border-blue-200 shadow-md uppercase tracking-wider mx-auto w-fit mb-4 block text-center">
              LINK UTAMA AQUALUX
            </div>

            {/* High-Contrast Pure White Inner Cards inside Royal Blue Container */}
            <div className="space-y-3">
              {activeItems.map((item) => {
                let targetUrl = item.url;
                let isSpecialAction = false;
                let handleCustomClick: (() => void) | undefined = undefined;

                if (item.url === '/') {
                  handleCustomClick = onBackToLanding;
                  isSpecialAction = true;
                } else if (item.url === 'wa_admin1') {
                  targetUrl = waAdmin1Url;
                } else if (item.url === 'wa_admin2') {
                  targetUrl = waAdmin2Url;
                } else if (item.url.startsWith('#')) {
                  handleCustomClick = () => {
                    onBackToLanding();
                    setTimeout(() => {
                      const targetId = item.url.replace('#', '');
                      const el = document.getElementById(targetId);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  };
                  isSpecialAction = true;
                }

                const CardContent = (
                  <div className="bg-white hover:bg-sky-50 border-2 border-blue-200/90 hover:border-blue-500 p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl group active:scale-[0.99]">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 group-hover:bg-[#0264c8] group-hover:text-white transition-colors">
                        {renderIcon(item.iconName)}
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <span className="text-sm sm:text-base font-black text-slate-950 font-outfit block whitespace-normal break-normal break-keep group-hover:text-[#0264c8] transition-colors leading-snug">
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <span className="text-xs font-semibold text-slate-600 block whitespace-normal break-normal mt-0.5 leading-relaxed">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-mono font-bold border px-2.5 py-1 rounded-full shrink-0 uppercase tracking-wider ${getBadgeStyle(item.badge)}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                );

                if (isSpecialAction && handleCustomClick) {
                  return (
                    <div key={item.id} onClick={handleCustomClick}>
                      {CardContent}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={isSafeExternalUrl(targetUrl) ? targetUrl : '#'}
                    target={targetUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {CardContent}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Branding */}
        <div className="text-center pt-2 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200 drop-shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AQUALUX Swimming Course Malang © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};
