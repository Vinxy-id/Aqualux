import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CalculatorIcon, CheckIcon, TagIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { MessageCircle } from 'lucide-react';
import { ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES, CATEGORY_PROGRAMS } from '../data/aqualuxData';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { buildWhatsAppMessageText } from '../utils/whatsapp';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const PricingCalculator: React.FC = () => {
  const { openWaModal } = useAqualuxData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Anak Mulai Usia 5 Tahun');
  const [classType, setClassType] = useState<ClassType>('privat');
  const [sessions, setSessions] = useState<SessionCount>(8);
  const [locationKey, setLocationKey] = useState<LocationKey>('tychi');

  const selectedLocation = LOCATIONS_DATA[locationKey];
  const rateInfo = COURSE_RATES[classType][sessions];
  const totalHtm = selectedLocation.htm * sessions;
  const grandTotal = rateInfo.price + totalHtm;

  const calculatedMsg = buildWhatsAppMessageText(
    selectedCategory,
    classType,
    sessions,
    locationKey
  );

  const handleWaClick = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // Ignore
    }
    openWaModal(calculatedMsg);
  };

  return (
    <section id="kalkulator" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-1/4 right-5" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3">
            <CalculatorIcon className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Kalkulator Estimasi Biaya Transparan</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Hitung Biaya Les & Tiket Kolam
          </h2>
          
          <p className="mt-3 text-base font-medium text-slate-700">
            Pilih kategori, tipe kelas, jumlah pertemuan, dan lokasi kolam hotel untuk melihat rincian biaya secara transparan.
          </p>
        </motion.div>

        {/* Main Calculator Container */}
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto card-clean-elevated rounded-3xl p-6 sm:p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Step 1: Kategori */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">
                  1. PILIH KATEGORI PESERTA
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_PROGRAMS.map((prog) => (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => setSelectedCategory(prog.title)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all border btn-tactile ${
                        selectedCategory === prog.title
                          ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                          : 'bg-slate-50 text-slate-900 border-slate-300 hover:border-blue-500 hover:text-blue-700'
                      }`}
                    >
                      {prog.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Tipe Kelas */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">
                  2. PILIH TIPE KELAS
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClassType('privat')}
                    className={`p-3.5 rounded-2xl border text-left transition-all btn-tactile ${
                      classType === 'privat'
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-black font-outfit">Privat (1-on-1)</span>
                      {classType === 'privat' && <CheckIcon className="w-4 h-4 text-blue-700" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700 block">1 Pelatih : 1 Peserta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClassType('reguler')}
                    className={`p-3.5 rounded-2xl border text-left transition-all btn-tactile ${
                      classType === 'reguler'
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-black font-outfit">Reguler (3-4 Orang)</span>
                      {classType === 'reguler' && <CheckIcon className="w-4 h-4 text-blue-700" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700 block">1 Pelatih : 3–4 Peserta (Min 3, Max 4 Anak)</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Sesi */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>3. JUMLAH PERTEMUAN</span>
                  {sessions === 8 && (
                    <span className="text-xs font-mono font-bold text-amber-600 flex items-center gap-1">
                      <SparklesIcon className="w-4 h-4" /> DISARANKAN! HEMAT 200K
                    </span>
                  )}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessions(4)}
                    className={`p-3.5 rounded-2xl border text-left transition-all btn-tactile ${
                      sessions === 4
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black font-outfit">4x Pertemuan</span>
                      <span className="text-xs font-mono text-slate-600">1x/minggu</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">Paket Dasar Mengapung</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessions(8)}
                    className={`p-3.5 rounded-2xl border text-left transition-all btn-tactile ${
                      sessions === 8
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-black ring-2 ring-amber-500/30'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-amber-900 font-outfit">8x Pertemuan</span>
                      <span className="text-xs font-mono font-bold text-amber-700">2x/minggu</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">Paket Mahir Berenang</span>
                  </button>
                </div>
              </div>

              {/* Step 4: Lokasi */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-2">
                  4. PILIH LOKASI KOLAM HOTEL
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {Object.values(LOCATIONS_DATA).map((loc) => (
                    <button
                      key={loc.key}
                      type="button"
                      onClick={() => setLocationKey(loc.key)}
                      className={`p-3 rounded-xl border text-left transition-all btn-tactile ${
                        locationKey === loc.key
                          ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                          : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                      }`}
                    >
                      <span className="font-bold text-xs block text-slate-950">{loc.name}</span>
                      <span className="font-mono text-xs text-emerald-800 font-bold block mt-0.5">
                        HTM Rp {loc.htm.toLocaleString('id-ID')}/sesi
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-blue-600 text-white rounded-2xl p-6 shadow-xl text-left">
              
              <div>
                {/* Header Summary */}
                <div className="flex items-center justify-between border-b border-blue-400/60 pb-3.5 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-100 flex items-center gap-1.5 font-bold">
                    <TagIcon className="w-4 h-4 text-white" /> RINCIAN BIAYA
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-950 bg-white px-2.5 py-1 rounded-full shadow-xs">
                    1 SESI = 75 MNT
                  </span>
                </div>

                {/* Selected Package Label */}
                <div className="mb-4">
                  <span className="text-xs text-blue-100 font-medium block">Paket Pilihan:</span>
                  <div className="text-base sm:text-lg font-black text-white font-outfit mt-0.5 leading-snug">
                    {selectedCategory} — {classType === 'privat' ? 'Privat' : 'Reguler'} ({sessions}x)
                  </div>
                </div>

                {/* Calculation Lines */}
                <div className="space-y-3.5 text-xs sm:text-sm mb-6">
                  
                  <div className="flex items-center justify-between text-blue-50 font-medium">
                    <div>
                      <span className="text-white font-bold">Biaya Kursus Aqualux ({sessions}x)</span>
                      <span className="font-mono text-xs text-blue-200 block">@Rp {rateInfo.perSession.toLocaleString('id-ID')} / sesi</span>
                    </div>
                    <span className="font-mono font-bold text-white text-base">
                      Rp {rateInfo.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-blue-50 font-medium pt-2.5 border-t border-blue-400/60">
                    <div>
                      <span className="text-white font-bold">Est. HTM {selectedLocation.name}</span>
                      <span className="font-mono text-xs text-blue-200 block">
                        {sessions}x Kedatangan @Rp{selectedLocation.htm.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-white text-sm">
                      Rp {totalHtm.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {rateInfo.discount && (
                    <div className="bg-amber-400 text-slate-950 p-2.5 rounded-xl text-xs font-black flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1 font-mono">
                        <SparklesIcon className="w-4 h-4 text-slate-950" /> DISKON PROMO:
                      </span>
                      <span className="font-mono">{rateInfo.discount}</span>
                    </div>
                  )}

                  <div className="pt-3.5 border-t border-blue-400/80">
                    <span className="text-xs font-mono font-bold text-blue-100 uppercase tracking-wider block">
                      TOTAL ESTIMASI PENGELUARAN:
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        Rp {grandTotal.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Note Box */}
                <div className="p-3.5 rounded-xl bg-blue-700/80 border border-blue-400/50 text-xs text-blue-50 leading-relaxed font-medium">
                  <span className="text-white font-black block mb-0.5">Ketentuan Pembayaran:</span>
                  Biaya les Rp {rateInfo.price.toLocaleString('id-ID')} dibayar ke Aqualux. Tiket kolam Rp {selectedLocation.htm.toLocaleString('id-ID')}/sesi dibayar langsung di loket hotel per kedatangan.
                </div>
              </div>

              {/* Action Button CTA */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleWaClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all btn-hover-effect btn-tactile"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Ambil Slot & Konsultasi WA</span>
                </button>

                <p className="text-xs text-blue-100 text-center font-medium mt-2.5 flex items-center justify-center gap-1">
                  <BoltIcon className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Pesan terisi otomatis sesuai rincian kalkulasi di atas.</span>
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>
    </section>
  );
};
