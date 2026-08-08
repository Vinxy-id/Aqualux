import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { MessageCircle, ArrowRight, Activity, Thermometer, Users } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { fadeUp, staggerContainer } from '../utils/motion';

export const Hero: React.FC = () => {
  const waUrl = buildGeneralWhatsAppUrl();

  return (
    <section className="pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glow & Mesh */}
      <div className="glow-cyan-ambient w-[600px] h-[600px] -top-35 -left-20" />
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-1/2 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column - High Contrast Text & CTA */}
          <motion.div
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="visible"
          >
            {/* Top Pill Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-950 border border-blue-900 text-white text-xs sm:text-sm font-bold shadow-md max-w-full"
            >
              <TrophyIcon className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate sm:whitespace-normal font-mono text-xs tracking-wider">PELATIH BERPENGALAMAN FINSWIMMING JATIM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 font-outfit leading-[1.12] text-balance"
            >
              Dari Takut Air Menjadi{' '}
              <span className="text-blue-600 block sm:inline mt-1 sm:mt-0 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Percaya Diri Berenang
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Program les renang privat 1-on-1 & reguler di Malang. Membantu anak 5+, pelajar, dewasa, hingga persiapan tes TNI/Polri dengan metode yang aman, terstruktur, dan ramah.
            </motion.p>

            {/* Stat & Feature Boxes - Tabular Figures */}
            <motion.div
              variants={staggerContainer(0.1)}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-1 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { value: '1-on-1', label: 'Metode Privat' },
                { value: '3 Hotel', label: 'Lokasi Malang' },
                { value: 'Bertahap', label: 'Metode Belajar' },
              ].map((stat) => (
                <motion.div
                  key={stat.value}
                  variants={fadeUp}
                  className="card-clean-elevated p-3 sm:p-4 rounded-2xl text-center lg:text-left min-w-0"
                >
                  <span className="text-base sm:text-xl lg:text-2xl font-black text-blue-700 font-mono block truncate leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 block mt-1 truncate">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeUp}
              className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all btn-hover-effect btn-tactile min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Daftar Kursus via WhatsApp</span>
              </a>

              <a
                href="#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all btn-hover-effect btn-tactile min-h-[48px]"
              >
                <span>Lihat Kategori Program</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column - Elevated Showcase Card */}
          <motion.div
            className="lg:col-span-5 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          >
            <div className="card-clean-elevated rounded-3xl p-4 sm:p-5 relative">
              
              {/* Main Image Frame */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-3.5 border border-slate-200 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80"
                  alt="AQUALUX Swimming Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-90" />
                
                {/* Official Logo Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-slate-200 shadow-md">
                  <img src="./aqualux-logo.png" alt="AQUALUX Logo" className="h-7 sm:h-9 w-auto object-contain" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-slate-200 text-xs shadow-md">
                  <div className="flex items-center justify-between text-slate-900 font-extrabold mb-1">
                    <span className="text-blue-700 font-outfit text-xs sm:text-sm">AQUALUX Private Swim</span>
                    <span className="bg-blue-100 text-blue-900 border border-blue-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                      Pelatih Berpengalaman
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-800">
                    Bimbingan ramah anak & dewasa dengan evaluasi perkembangan berkala.
                  </p>
                </div>
              </div>

              {/* Bottom Feature Badges */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 text-xs text-left">
                <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-600 text-[11px] font-semibold block uppercase font-mono">Pilihan Kelas:</span>
                  <span className="font-extrabold text-slate-950 block mt-0.5 text-xs sm:text-sm">Privat & Reguler</span>
                </div>

                <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-600 text-[11px] font-semibold block uppercase font-mono">Durasi 1 Sesi:</span>
                  <span className="font-extrabold text-blue-700 block mt-0.5 text-xs sm:text-sm font-mono">1 Jam 15 Menit</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
