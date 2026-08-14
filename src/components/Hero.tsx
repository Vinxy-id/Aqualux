import React from 'react';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { Hero3DCardCarousel } from './Hero3DCardCarousel';

export const Hero: React.FC = () => {
  const { openWaModal } = useAqualuxData();

  return (
    <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow & Mesh */}
      <div className="glow-cyan-ambient w-[600px] h-[600px] -top-35 -left-20" />
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-1/2 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column - High Contrast Text & CTA */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-2xl sm:rounded-full bg-blue-950 border border-blue-900 text-white text-xs sm:text-sm font-bold shadow-md max-w-full text-left">
              <TrophyIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs tracking-wider leading-snug whitespace-normal text-amber-200 font-bold">
                PELATIH RENANG BERLISENSI MALANG
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-outfit leading-[1.12] text-balance">
              Dari Takut Air Menjadi{' '}
              <span className="text-sky-500 font-black block sm:inline mt-1 sm:mt-0 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                Percaya Diri Berenang
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-semibold max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Program les renang privat 1-on-1 & reguler di kota Malang. Membantu anak mulai usia 5 tahun, pelajar, dewasa, hingga persiapan tes TNI, Polri dan kedinasan dengan metode yang aman, terstruktur, dan ramah.
            </p>

            {/* Stat & Feature Boxes - High Contrast for Light & Dark Mode */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1 max-w-2xl mx-auto lg:mx-0">
              {[
                { value: '1-on-1', label: 'Kelas Privat' },
                { value: '3–4 Anak', label: 'Kelas Reguler' },
                { value: '3 Hotel', label: 'Lokasi Malang' },
                { value: 'Bertahap', label: 'Metode Belajar' },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="bg-white border-2 border-blue-200/80 shadow-md p-3 sm:p-3.5 rounded-2xl text-center lg:text-left min-w-0"
                >
                  <span className="text-base sm:text-lg lg:text-xl font-black text-sky-400 font-mono block truncate leading-tight drop-shadow-xs">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 block mt-1 truncate">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => openWaModal()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all btn-hover-effect btn-tactile min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 text-white fill-white" />
                <span>Daftar Kursus via WhatsApp</span>
              </button>

              <a
                href="#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 shadow-md transition-all btn-hover-effect btn-tactile min-h-[48px]"
              >
                <span>Lihat Kategori Program</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>

          {/* Right Column - 3D Card Stack Carousel */}
          <div className="lg:col-span-5 w-full overflow-visible">
            <Hero3DCardCarousel />
          </div>

        </div>
      </div>
    </section>
  );
};
