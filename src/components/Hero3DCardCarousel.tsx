import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';

export interface CardData {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  highlight1Label: string;
  highlight1Val: string;
  highlight2Label: string;
  highlight2Val: string;
  tagColor: string;
}

const CAROUSEL_CARDS: CardData[] = [
  {
    id: 1,
    title: 'AQUALUX Swimming Course',
    subtitle: 'Bimbingan privat 1-on-1 ramah anak & dewasa dengan evaluasi perkembangan berkala.',
    badge: 'Pelatih Berpengalaman',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    highlight1Label: 'Pilihan Kelas:',
    highlight1Val: 'Privat & Reguler',
    highlight2Label: 'Durasi 1 Sesi:',
    highlight2Val: '1 Jam 15 Menit',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
  },
  {
    id: 2,
    title: 'Pelatih Berlisensi & Sabar',
    subtitle: 'Didampingi eks-atlet & pelatih berpengalaman Finswimming Jatim dengan metode terstruktur.',
    badge: 'Finswimming Jatim',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    highlight1Label: 'Metode Belajar:',
    highlight1Val: 'Bertahap & Ramah',
    highlight2Label: 'Progres Latihan:',
    highlight2Val: 'Evaluasi Berkala',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 3,
    title: '3 Kolam Renang Hotel Malang',
    subtitle: 'Lokasi latihan eksklusif & nyaman di Hotel Savana, Hotel Tychi, dan Hotel Gajahmada.',
    badge: 'Lokasi Strategis',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    highlight1Label: 'Fasilitas Kolam:',
    highlight1Val: 'Bersih & Nyaman',
    highlight2Label: 'Akses Pendamping:',
    highlight2Val: 'Free Tribun/Resto',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
  {
    id: 4,
    title: 'Solusi Anak Takut & Trauma Air',
    subtitle: 'Metode Water Familiarity aman tanpa paksaan. Anak jadi lebih tenang, berani, dan ceria.',
    badge: 'Ramah Anak 5+ Thn',
    image: 'https://images.unsplash.com/photo-1560090995-01c3288b99d8?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?auto=format&fit=crop&w=800&q=80',
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
  const touchStartX = useRef<number | null>(null);
  const total = CAROUSEL_CARDS.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

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

  // Calculate relative offset for 3D stack arrangement
  const getCardTransform = (index: number) => {
    let diff = index - activeIndex;

    // Normalize diff to [-floor(total/2), floor(total/2)]
    if (diff > Math.floor(total / 2)) {
      diff -= total;
    } else if (diff < -Math.floor(total / 2)) {
      diff += total;
    }

    // Center card (Active - Pushed 140px forward in Z so side cards NEVER slice through it)
    if (diff === 0) {
      return {
        x: '0%',
        z: 140,
        rotateY: 0,
        scale: 1,
        zIndex: 40,
        opacity: 1,
        filter: 'brightness(100%)',
        cursor: 'default',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate Right card (Behind center card in Z space)
    if (diff === 1) {
      return {
        x: '24%',
        z: 0,
        rotateY: -18,
        scale: 0.86,
        zIndex: 20,
        opacity: 0.88,
        filter: 'brightness(80%)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Immediate Left card (Behind center card in Z space)
    if (diff === -1) {
      return {
        x: '-24%',
        z: 0,
        rotateY: 18,
        scale: 0.86,
        zIndex: 20,
        opacity: 0.88,
        filter: 'brightness(80%)',
        cursor: 'pointer',
        pointerEvents: 'auto' as const,
      };
    }

    // Far right card (fade out & pushed far back)
    if (diff > 1) {
      return {
        x: '40%',
        z: -140,
        rotateY: -32,
        scale: 0.72,
        zIndex: 10,
        opacity: 0,
        filter: 'brightness(60%)',
        cursor: 'pointer',
        pointerEvents: 'none' as const,
      };
    }

    // Far left card (fade out & pushed far back)
    return {
      x: '-40%',
      z: -140,
      rotateY: 32,
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
      className="w-full relative py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Stage Container */}
      <div 
        className="relative w-full h-[370px] sm:h-[410px] flex items-center justify-center overflow-visible"
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
                duration: 0.55,
                ease: [0.25, 1, 0.5, 1],
              }}
              style={{
                position: 'absolute',
                width: '92%',
                maxWidth: '350px',
                transformStyle: 'preserve-3d',
                pointerEvents: transform.pointerEvents,
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
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-3 border border-slate-200/80 shadow-inner bg-slate-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Logo & Tag Overlay */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-200 shadow-md">
                      <img src="./aqualux-logo.png" alt="AQUALUX Logo" className="h-5 sm:h-6 w-auto object-contain" />
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold border shadow-xs backdrop-blur-md ${card.tagColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <h3 className="font-extrabold text-sm sm:text-base font-outfit text-white leading-snug drop-shadow-md">
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-200 font-medium line-clamp-2 mt-0.5 leading-snug">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] font-semibold block uppercase font-mono tracking-wider">
                      {card.highlight1Label}
                    </span>
                    <span className="font-extrabold text-slate-950 block mt-0.5 text-xs sm:text-sm truncate">
                      {card.highlight1Val}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] font-semibold block uppercase font-mono tracking-wider">
                      {card.highlight2Label}
                    </span>
                    <span className="font-extrabold text-blue-700 block mt-0.5 text-xs sm:text-sm font-mono truncate">
                      {card.highlight2Val}
                    </span>
                  </div>
                </div>

                {/* Interactive CTA when centered */}
                {isCenter && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWaModal();
                    }}
                    className="mt-2.5 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/25 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Konsultasi Program Ini</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Carousel Navigation & Status Bar */}
      <div className="mt-1 flex items-center justify-between px-2 max-w-xs mx-auto">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-2 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {CAROUSEL_CARDS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 h-2 bg-blue-600 shadow-sm shadow-blue-500/50'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-slide Pause/Play Toggle & Right Arrow */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Mulai Otomatis' : 'Jeda Otomatis'}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5 text-blue-600" />}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="p-2 rounded-full bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
