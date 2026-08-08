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
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { isSafeExternalUrl } from '../utils/urlSafety';

interface LinkBioPageProps {
  onBackToLanding: () => void;
  onOpenAdmin: () => void;
}

export const LinkBioPage: React.FC<LinkBioPageProps> = ({ onBackToLanding, onOpenAdmin }) => {
  const { adminContacts, linkBioProfile, linkBioItems } = useAqualuxData();
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}${window.location.pathname}#links`;

  const cleanPhone1 = adminContacts.faqihPhone.replace(/\D/g, '');
  const formattedPhone1 = cleanPhone1.startsWith('0') ? '62' + cleanPhone1.slice(1) : cleanPhone1;
  const waAdmin1Url = `https://wa.me/${formattedPhone1}?text=${encodeURIComponent('Halo Admin 1 Aqualux (Coach Faqih), saya ingin berkonsultasi mengenai les renang.')}`;

  const cleanPhone2 = adminContacts.abedPhone.replace(/\D/g, '');
  const formattedPhone2 = cleanPhone2.startsWith('0') ? '62' + cleanPhone2.slice(1) : cleanPhone2;
  const waAdmin2Url = `https://wa.me/${formattedPhone2}?text=${encodeURIComponent('Halo Admin 2 Aqualux (Coach Abed), saya ingin menanyakan jadwal ketersediaan sesi.')}`;

  const handleShare = async () => {
    const shareData = {
      title: 'AQUALUX Swimming Course Malang - Link in Bio',
      text: linkBioProfile.bioText,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-amber-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-rose-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-slate-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  const activeItems = linkBioItems.filter(item => item.enabled);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden flex flex-col items-center py-6 px-4 selection:bg-blue-600 selection:text-white">
      
      {/* Background Glow Overlay */}
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-30" />

      {/* Main Container Card */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[92vh] relative z-10">
        
        {/* Top Header Bar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBackToLanding}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all btn-tactile"
              title="Kembali ke Web"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              AQUALUX BIO LINK
            </span>

            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all btn-tactile relative"
              title="Bagikan Tautan"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 bg-emerald-950 border border-emerald-800 text-emerald-300 px-4 py-2 rounded-xl text-xs font-mono font-bold text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link bio berhasil disalin ke clipboard!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border-2 border-blue-500/40 mx-auto overflow-hidden">
                <img 
                  src="./aqualux-logo.png" 
                  alt="AQUALUX Swimming Course" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1 border-2 border-slate-950">
                <CheckBadgeIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white font-outfit tracking-tight flex items-center justify-center gap-1.5">
              <span>Aqualux Private Swim</span>
              <CheckBadgeIcon className="w-5 h-5 text-blue-500 shrink-0" />
            </h1>

            <p className="text-xs font-mono text-blue-400 font-bold mt-1">{linkBioProfile.handle}</p>

            <p className="text-xs sm:text-sm font-medium text-slate-300 max-w-xs mx-auto mt-2 leading-relaxed">
              {linkBioProfile.bioText}
            </p>

            {/* Social Shortcut Icons */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <a
                href={waAdmin1Url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all btn-tactile shadow-sm"
                title="WhatsApp Admin 1"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {linkBioProfile.instagramUrl && (
                <a
                  href={linkBioProfile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all btn-tactile shadow-sm"
                  title="Instagram Aqualux"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={onBackToLanding}
                className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all btn-tactile shadow-sm"
                title="Website Resmi"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dynamic Link Items List */}
          <div className="space-y-3.5 mb-8">
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
                <div className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/60 p-4 rounded-2xl flex items-center justify-between gap-3 transition-all duration-200 card-clean-hover cursor-pointer btn-tactile shadow-lg group">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/40">
                      {renderIcon(item.iconName)}
                    </div>
                    <div className="text-left truncate">
                      <span className="text-sm font-black text-white font-outfit block truncate group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="text-[11px] font-semibold text-slate-400 block truncate mt-0.5">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-mono font-bold bg-slate-950 text-slate-400 border border-slate-800 px-2.5 py-1 rounded-full shrink-0 uppercase tracking-wider group-hover:text-blue-400 group-hover:border-blue-500/40">
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

        {/* Footer Branding */}
        <div className="text-center pt-6 border-t border-slate-900/80 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>AQUALUX Swimming Course Malang © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};
