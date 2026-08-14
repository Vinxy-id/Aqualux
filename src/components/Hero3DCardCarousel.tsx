import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, ZoomIn, ZoomOut, RotateCcw, X, MessageCircle, ExternalLink } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';

export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  fullImage?: string;
  highlight1Label: string;
  highlight1Val: string;
  highlight2Label: string;
  highlight2Val: string;
  tagColor: string;
  isBrochure?: boolean;
}

const CAROUSEL_CARDS: CardData[] = [
  {
    id: 1,
    title: 'Brosur Price List & Lokasi Resmi',
    subtitle: 'Rincian paket reguler & privat, harga mulai Rp350rb, lokasi hotel Malang, & prestasi pelatih.',
    badge: 'Brosur & Price List',
    image: './brosur-aqualux-1.webp',
    fullImage: './brosur-aqualux-1.webp',
    highlight1Label: 'Paket Kursus:',
    highlight1Val: 'Reguler & Privat',
    highlight2Label: 'Harga Paket:',
    highlight2Val: 'Mulai Rp350.000',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
    isBrochure: true,
  },
  {
    id: 2,
    title: 'Brosur Program Bimbingan',
    subtitle: 'Poster resmi Aqualux: Kelas anak 5+ thn, pelajar, dewasa, hingga persiapan tes TNI/Polri.',
    badge: 'Poster Program Resmi',
    image: './brosur-aqualux-2.webp',
    fullImage: './brosur-aqualux-2.webp',
    highlight1Label: 'Target Peserta:',
    highlight1Val: 'Anak s/d Dewasa',
    highlight2Label: 'Metode Belajar:',
    highlight2Val: 'Aman & Terstruktur',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    isBrochure: true,
  },
  {
    id: 3,
    title: 'Pelatih Berlisensi Finswimming',
    subtitle: 'Didampingi pelatih berpengalaman Finswimming Jatim dengan metode evaluasi berkala.',
    badge: 'Pelatih Berpengalaman',
    image: './images/carousel-coach.webp',
    highlight1Label: 'Kualifikasi:',
    highlight1Val: 'Eks-Atlet Jatim',
    highlight2Label: 'Pendekatan:',
    highlight2Val: 'Sabar & Telaten',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 4,
    title: 'Solusi Anak Takut & Trauma Air',
    subtitle: 'Metode Water Familiarity aman tanpa paksaan. Anak jadi lebih tenang, berani, dan ceria.',
    badge: 'Ramah Anak-Anak',
    image: './images/carousel-kids.webp',
    highlight1Label: 'Peralatan:',
    highlight1Val: 'Gratis Dipinjamkan',
    highlight2Label: 'Adaptasi Air:',
    highlight2Val: '4x Pertemuan',
    tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
  },
  {
    id: 5,
    title: 'Persiapan Tes TNI & POLRI',
    subtitle: 'Bimbingan khusus melatih teknik 4 gaya renang, ketahanan fisik, dan kecepatan target waktu.',
    badge: 'Program Kedinasan',
    image: './images/carousel-tni.webp',
    highlight1Label: 'Fokus Latihan:',
    highlight1Val: 'Ketahanan & Speed',
    highlight2Label: 'Target Lulus:',
    highlight2Val: 'Standar Nilai Tes',
    tagColor: 'bg-purple-100 text-purple-900 border-purple-300',
  },
];

export const Hero3DCardCarousel: React.FC = () => {
  const { openWaModal } = useAqualuxData();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [zoomBrochure, setZoomBrochure] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const touchStartX = useRef<number | null>(null);
  const total = CAROUSEL_CARDS.length;

  // Track responsive viewport width
  useEffect(() => {
    const checkMobile = () => {
      const next = window.innerWidth < 640;
      setIsMobile((prev) => (prev !== next ? next : prev));
    };
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll & reset scale when brochure lightbox modal is open/closed
  useEffect(() => {
    if (zoomBrochure) {
      document.body.style.overflow = 'hidden';
      setZoomScale(1);
    } else {
      document.body.style.overflow = '';
      setZoomScale(1);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomBrochure]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto slide interval
  useEffect(() => {
    if (isPaused || zoomBrochure) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, zoomBrochure, handleNext]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Mouse wheel zoom handler for modal image
  const handleWheelZoom = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoomScale((prev) => Math.min(prev + 0.25, 3));
    } else if (e.deltaY > 0) {
      setZoomScale((prev) => Math.max(prev - 0.25, 1));
    }
  };

  // Double click toggle zoom
  const handleDoubleClickZoom = () => {
    setZoomScale((prev) => (prev > 1 ? 1 : 2));
  };

  // Calculate relative offset for 3D stack arrangement
  const getCardTransform = (index: number) => {
    let diff = index - activeIndex;

    // Normalize diff to [-floor(total/2), floor(total/2)]
    if (diff > Math.floor(total / 2)) {
      diff -= total;
    } else if (diff < -Math.floor(total / 2)) {
      diff += total;
    }

    const xOffset = isMobile ? '14%' : '22%';
    const rotate = isMobile ? 12 : 18;

    // Center card (Active - Native 1:1 crisp rendering with 0 GPU filter blur)
    if (diff === 0) {
      return {
        x: '0%',
        z: 0,
        rotateY: 0,
        scale: 1,
        zIndex: 40,
        opacity: 1,
        filter: 'none',
        cursor: 'default',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate Right card (Pushed back in Z)
    if (diff === 1) {
      return {
        x: xOffset,
        z: -90,
        rotateY: -rotate,
        scale: isMobile ? 0.88 : 0.85,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(80%)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate Left card (Pushed back in Z)
    if (diff === -1) {
      return {
        x: `-${xOffset}`,
        z: -90,
        rotateY: rotate,
        scale: isMobile ? 0.88 : 0.85,
        zIndex: 20,
        opacity: 0.85,
        filter: 'brightness(80%)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Far right card (fade out)
    if (diff > 1) {
      return {
        x: isMobile ? '26%' : '38%',
        z: -180,
        rotateY: -rotate * 1.8,
        scale: 0.72,
        zIndex: 10,
        opacity: 0,
        filter: 'brightness(60%)',
        cursor: 'pointer',
        pointerEvents: 'none' as const,
      };
    }

    // Far left card (fade out)
    return {
      x: isMobile ? '-26%' : '-38%',
      z: -180,
      rotateY: rotate * 1.8,
      scale: 0.72,
      zIndex: 10,
      opacity: 0,
      filter: 'brightness(60%)',
      cursor: 'pointer',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <div 
      className="w-full relative py-2 max-w-md mx-auto lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Stage Container with sufficient vertical height for crisp cards */}
      <div 
        className="relative w-full h-[420px] sm:h-[450px] flex items-center justify-center overflow-visible"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {CAROUSEL_CARDS.map((card, index) => {
          const transform = getCardTransform(index);
          const isCenter = index === activeIndex;

          return (
            <motion.div
              key={card.id}
              onClick={() => {
                if (!isCenter) setActiveIndex(index);
              }}
              animate={{
                x: transform.x,
                z: transform.z,
                rotateY: transform.rotateY,
                scale: transform.scale,
                zIndex: transform.zIndex,
                opacity: transform.opacity,
                filter: transform.filter,
              }}
              transition={{
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                position: 'absolute',
                width: '88%',
                maxWidth: isMobile ? '295px' : '345px',
                transformStyle: 'preserve-3d',
                pointerEvents: transform.pointerEvents,
                WebkitFontSmoothing: 'antialiased',
              }}
              className="select-none"
            >
              <div 
                className={`rounded-3xl p-3.5 sm:p-4 bg-white border ${
                  isCenter 
                    ? 'border-blue-400/90 shadow-2xl shadow-blue-500/25 ring-2 ring-blue-400/30' 
                    : 'border-slate-200/90 shadow-lg'
                } transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Image / Brochure Container */}
                <div 
                  onClick={(e) => {
                    if (card.isBrochure && isCenter) {
                      e.stopPropagation();
                      setZoomBrochure(card.fullImage || card.image);
                    }
                  }}
                  className={`relative h-46 sm:h-56 rounded-2xl overflow-hidden mb-3 border border-slate-200/80 shadow-inner bg-slate-900 group/img ${
                    card.isBrochure && isCenter ? 'cursor-pointer' : ''
                  }`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-full ${
                      card.isBrochure ? 'object-cover object-top' : 'object-cover'
                    } transition-transform duration-700 group-hover:scale-105`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    width="440"
                    height="280"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                  {/* Top Logo & Tag Overlay */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-200 shadow-md">
                      <img src="./aqualux-icon.webp" alt="AQUALUX Logo" className="h-5 sm:h-6 w-auto object-contain" width="24" height="24" />
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold border shadow-xs backdrop-blur-md ${card.tagColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Zoom Badge for Brochure */}
                  {card.isBrochure && (
                    <div className="absolute top-12 right-2.5 bg-blue-950/90 hover:bg-blue-600 text-white backdrop-blur-md px-2 py-1 rounded-lg border border-blue-400/50 text-[10px] font-mono font-bold flex items-center gap-1 shadow-md transition-all">
                      <ZoomIn className="w-3 h-3 text-cyan-300" />
                      <span>Lihat Brosur</span>
                    </div>
                  )}

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="font-extrabold text-xs sm:text-base font-outfit text-white leading-snug drop-shadow-md">
                      {card.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-200 font-medium line-clamp-2 mt-0.5 leading-snug">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Badges */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs">
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] font-semibold block uppercase font-mono tracking-wider">
                      {card.highlight1Label}
                    </span>
                    <span className="font-extrabold text-slate-950 block mt-0.5 text-[11px] sm:text-sm truncate">
                      {card.highlight1Val}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] font-semibold block uppercase font-mono tracking-wider">
                      {card.highlight2Label}
                    </span>
                    <span className="font-extrabold text-blue-700 block mt-0.5 text-[11px] sm:text-sm font-mono truncate">
                      {card.highlight2Val}
                    </span>
                  </div>
                </div>

                {/* Interactive CTA Button when centered */}
                {isCenter && (
                  <div className="mt-2.5">
                    {card.isBrochure ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomBrochure(card.fullImage || card.image);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/25 cursor-pointer"
                      >
                        <ZoomIn className="w-4 h-4 text-cyan-200" />
                        <span>Buka Brosur Lengkap (HD)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openWaModal();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/25 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Daftar / Konsultasi via WhatsApp</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Carousel Navigation & Status Bar */}
      <div className="mt-6 sm:mt-8 flex items-center justify-between px-2 max-w-xs mx-auto relative z-50">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-0.5">
          {CAROUSEL_CARDS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="p-2.5 flex items-center justify-center cursor-pointer min-w-[28px] min-h-[28px]"
            >
              <span
                className={`transition-all duration-300 rounded-full block ${
                  idx === activeIndex
                    ? 'w-6 h-2 bg-blue-600 shadow-sm shadow-blue-500/50'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Auto-slide Pause/Play Toggle & Right Arrow */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Mulai Otomatis' : 'Jeda Otomatis'}
            className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5 text-blue-600" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brochure Zoom Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {zoomBrochure && (
            <motion.div
              key="brochure-lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomBrochure(null)}
              className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6 overflow-hidden"
            >
              <motion.div
                key="brochure-lightbox-content"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl sm:max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
              >
                {/* Modal Header & Zoom Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-1 border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1 bg-white rounded-xl">
                      <img src="./aqualux-icon.webp" alt="Aqualux Logo" className="h-5 sm:h-6 w-auto" width="24" height="24" />
                    </div>
                    <div>
                      <span className="text-white font-extrabold text-sm sm:text-base font-outfit block leading-tight">
                        Brosur Resmi Aqualux
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono block">
                        Malang Swimming Course
                      </span>
                    </div>
                  </div>

                  {/* Zoom Controls & Close Button */}
                  <div className="flex items-center gap-2">
                    {/* Zoom Toolbar */}
                    <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setZoomScale((prev) => Math.max(prev - 0.5, 1))}
                        disabled={zoomScale <= 1}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        title="Zoom Out (-)"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>

                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 select-none min-w-[38px] text-center">
                        {Math.round(zoomScale * 100)}%
                      </span>

                      <button
                        type="button"
                        onClick={() => setZoomScale((prev) => Math.min(prev + 0.5, 3))}
                        disabled={zoomScale >= 3}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                        title="Zoom In (+)"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>

                      {zoomScale > 1 && (
                        <button
                          type="button"
                          onClick={() => setZoomScale(1)}
                          className="p-1.5 rounded-lg text-amber-400 hover:bg-slate-700 transition-colors cursor-pointer"
                          title="Reset Zoom (100%)"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setZoomBrochure(null)}
                      className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Tutup Modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Full Brochure Image Display Area with Interactive Zoom & Pan */}
                <div 
                  onWheel={handleWheelZoom}
                  className="relative rounded-2xl overflow-auto bg-black/80 my-2 p-2 sm:p-4 flex items-start justify-center flex-1 max-h-[68vh] border border-slate-800/80 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={zoomBrochure}
                    alt="Aqualux Brochure Full HD"
                    onDoubleClick={handleDoubleClickZoom}
                    style={{
                      transform: `scale(${zoomScale})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.2s ease-out',
                    }}
                    className={`w-full h-auto object-contain rounded-xl shadow-2xl transition-transform duration-200 ${
                      zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                    }`}
                  />

                  {/* Subtle Hint Overlay at bottom of viewer */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-slate-300 border border-slate-700/80 font-mono shadow-md pointer-events-none text-center max-w-[90%] leading-tight">
                    {zoomScale > 1 ? '🔍 Scroll / Geser untuk melihat rincian detail' : '💡 Double-click / Scroll / Gunakan (+)(-) untuk Zoom'}
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setZoomBrochure(null);
                      openWaModal();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-white" />
                    <span>Daftar / Konsultasi via WhatsApp</span>
                  </button>

                  <a
                    href={zoomBrochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap border border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                    <span>Buka Tab Baru</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
