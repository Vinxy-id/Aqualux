import React from 'react';
import { motion } from 'framer-motion';
import { Users, Check, MessageCircle, ArrowRight, Flame } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

// Custom Officer Icon (Polisi / TNI Cap & Uniform Icon matching user reference)
const OfficerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
    {/* Officer Hat Peak */}
    <path d="M256 16c-70.6 0-134.4 24.8-176 64l-24 56c40 32 112 48 200 48s160-16 200-48l-24-56c-41.6-39.2-105.4-64-176-64z"/>
    <circle cx="256" cy="72" r="18" fill="#fff" />
    {/* Visor Arc */}
    <path d="M72 160c40 32 112 48 184 48s144-16 184-48c-32 32-104 48-184 48S104 192 72 160z" opacity="0.9" />
    {/* Face & Head Contour */}
    <path d="M152 208v40c0 57.4 46.6 104 104 104s104-46.6 104-104v-40c-32 24-72 32-104 32s-72-8-104-32z"/>
    {/* Uniform & Shoulders */}
    <path d="M48 480c0-64 56-112 120-128l88 104 88-104c64 16 120 64 120 128v16H48v-16z"/>
    {/* Chest Star Badge */}
    <polygon points="384,400 394,420 416,423 400,439 404,461 384,450 364,461 368,439 352,423 374,420" fill="#fff" />
  </svg>
);

export const ProgramsSection: React.FC = () => {
  const { openWaModal } = useAqualuxData();

  return (
    <section id="program" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 text-slate-900 border-t border-slate-200 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-1/3 left-10" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Section Header */}
        <motion.div 
          variants={fadeUp}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 text-left"
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300 shadow-xs">
              PROGRAM KURSUS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
              Program Renang Sesuai Kebutuhan
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-slate-700 max-w-xl">
              Pilih program latihan berdasarkan usia atau persiapan khusus ujian fisik yang Anda perlukan.
            </p>
          </div>

          <button 
            type="button"
            onClick={() => openWaModal()}
            className="inline-flex items-center gap-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 rounded-full shadow-md transition-all shrink-0 min-h-[44px] btn-tactile"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Konsultasi Program via WA</span>
          </button>
        </motion.div>

        {/* 2 Main Program Cards Grid */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          
          {/* KOTAK 1: Program Latihan Usia (Anak, Pelajar, Dewasa) */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-blue-400 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-blue-100 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-300/40 shadow-sm">
                    ANAK 5+ THN
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-blue-100 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-300/40 shadow-sm">
                    PELAJAR
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-blue-100 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-300/40 shadow-sm">
                    DEWASA 19+
                  </span>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-outfit text-white mb-3 tracking-tight leading-snug">
                Program Latihan Usia
              </h3>

              <p className="text-sm font-semibold text-blue-100 leading-relaxed mb-6">
                Program latihan renang privat 1-on-1 & reguler disesuaikan dengan tingkatan usia, karakter, dan target belajar masing-masing peserta.
              </p>

              {/* Checklist Features */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-blue-500/40 pt-5 mb-8">
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Water Orientation & Pengenalan Air</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Teknik Meluncur & Mengapung Mandiri</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Pernapasan & Dasar Gaya Dada/Bebas</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Pelatih Sabar & Berlisensi</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Evaluasi setelah latihan</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Privasi Terjaga di Kolam Hotel</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Mengatasi Trauma & Cemas Air</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Jadwal Sesi Sangat Fleksibel</span>
                </li>
              </ul>
            </div>

            {/* Pilihan Button Usia / Jenjang Mengarah ke WA */}
            <div className="border-t border-blue-500/40 pt-5">
              <span className="text-xs font-black text-blue-200 block mb-3 uppercase tracking-wider font-mono">
                PILIH KATEGORI USIA UNTUK DAFTAR VIA WA:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Anak (Mulai Usia 5 Tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Anak Mulai Usia 5 Tahun</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Pelajar & Remaja (12-18 tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Pelajar (12-18)</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Dewasa (Mulai Usia 19 Tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Dewasa Mulai Usia 19 Tahun</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* KOTAK 2: Persiapan Tes TNI / Polri & Kedinasan */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-blue-400 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-6">
                <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-blue-100 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-300/40 shadow-sm inline-flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span>PROGRAM KHUSUS • TNI / POLRI</span>
                </span>

                <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <OfficerIcon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-outfit text-white mb-3 tracking-tight leading-snug">
                Persiapan Tes TNI / Polri & Kedinasan
              </h3>

              <p className="text-sm font-semibold text-blue-100 leading-relaxed mb-6">
                Latihan intensif target waktu renang 25 & 50 meter gaya dada & gaya crawl serta ketahanan fisik untuk persiapan seleksi ketangkasan renang kedinasan.
              </p>

              {/* Checklist Features */}
              <ul className="space-y-3.5 border-t border-blue-500/40 pt-5 mb-8">
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Drill Teknik Gaya Dada dan Gaya Crawl Khusus Ujian</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Latihan Kecepatan 25 meter & 50 Meter gaya dada & gaya crawl</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Simulasi Tes & Time Trial Berkala</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Tips Penghematan Tenaga & Pernapasan</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                  </div>
                  <span>Tips berenang gaya dada dan gaya bebas yang baik dan benar</span>
                </li>
              </ul>
            </div>

            {/* CTA Button Kedinasan (Harmonized Emerald Green Accent) */}
            <div className="border-t border-blue-500/40 pt-5">
              <button
                type="button"
                onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Persiapan Tes Renang TNI/Polri/Kedinasan. Mohon info jadwal pelatih.")}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all btn-tactile"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
                <span>Daftar Persiapan Tes TNI / Polri dan Kedinasan via WA</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </button>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};
