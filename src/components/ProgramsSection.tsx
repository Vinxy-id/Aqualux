import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldAlert, Check, MessageCircle, ArrowRight, Flame } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

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
              Pilih program bimbingan berdasarkan usia atau persiapan khusus ujian fisik yang Anda perlukan.
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
          
          {/* KOTAK 1: Program Bimbingan Usia (Anak, Pelajar, Dewasa) */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-blue-400 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 mb-6">
                <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-blue-100 bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-300/40 shadow-sm inline-flex items-center gap-1.5 max-w-full">
                  ANAK 5+ • PELAJAR • DEWASA
                </span>

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 text-white border border-white/20 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform ml-auto sm:ml-0">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-outfit text-white mb-3 tracking-tight leading-snug">
                Program Bimbingan Usia
              </h3>

              <p className="text-sm font-semibold text-blue-100 leading-relaxed mb-6">
                Bimbingan renang privat 1-on-1 & reguler disesuaikan dengan tingkatan usia, karakter, dan target belajar masing-masing peserta.
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Anak Pemula (Usia 5+ tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Anak 5+ Thn</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Pelajar & Remaja (12-18 tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Pelajar (12-18)</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Dewasa & Umum (19+ tahun). Mohon info jadwal pelatih.")}
                  className="w-full py-3 px-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all btn-tactile text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 fill-slate-950" />
                  <span>Dewasa (19+)</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* KOTAK 2: Persiapan Tes TNI / Polri (TANDA KHUSUS KEDINASAN) */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-5 sm:p-8 flex flex-col justify-between border-2 border-amber-400 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white shadow-2xl shadow-amber-500/10 hover:shadow-amber-500/25 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 mb-6">
                <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-3.5 py-1.5 rounded-full border border-amber-200 shadow-md inline-flex items-center gap-1.5 max-w-full">
                  <Flame className="w-3.5 h-3.5 fill-slate-950 shrink-0" />
                  <span>PROGRAM KHUSUS • TNI / POLRI</span>
                </span>

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform ml-auto sm:ml-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-outfit text-white mb-3 tracking-tight leading-snug">
                Persiapan Tes TNI / Polri & Kedinasan
              </h3>

              <p className="text-sm font-semibold text-blue-100 leading-relaxed mb-6">
                Bimbingan intensif target waktu renang 50 meter gaya dada dan ketahanan fisik untuk persiapan seleksi ketangkasan renang kedinasan.
              </p>

              {/* Checklist Features */}
              <ul className="space-y-3.5 border-t border-amber-400/30 pt-5 mb-8">
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                  </div>
                  <span>Drill Teknik Gaya Dada dan Gaya Crawl Khusus Ujian</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                  </div>
                  <span>Latihan Kecepatan 25 meter dan 50 Meter</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                  </div>
                  <span>Simulasi Tes & Time Trial Berkala</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                  </div>
                  <span>Tips Penghematan Tenaga & Pernapasan</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-bold text-white">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                  </div>
                  <span>Tips berenang gaya dada dan gaya bebas yang baik dan benar</span>
                </li>
              </ul>
            </div>

            {/* CTA Button Kedinasan (Special Amber Accent) */}
            <div className="border-t border-amber-400/30 pt-5">
              <button
                type="button"
                onClick={() => openWaModal("Halo Admin Aqualux, saya berminat mendaftar Program Persiapan Tes Renang TNI/Polri/Kedinasan. Mohon info jadwal pelatih.")}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl hover:shadow-amber-400/30 transition-all btn-tactile"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
                <span>Daftar Persiapan Tes Kedinasan via WA</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </button>
            </div>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
};
