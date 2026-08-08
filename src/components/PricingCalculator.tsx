import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CalculatorIcon, InformationCircleIcon, CheckIcon, TagIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { MessageCircle } from 'lucide-react';
import { ClassType, SessionCount, LocationKey } from '../types';
import { LOCATIONS_DATA, COURSE_RATES, CATEGORY_PROGRAMS } from '../data/aqualuxData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const PricingCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Anak Usia 5+ Th');
  const [classType, setClassType] = useState<ClassType>('privat');
  const [sessions, setSessions] = useState<SessionCount>(8);
  const [locationKey, setLocationKey] = useState<LocationKey>('tychi');

  const selectedLocation = LOCATIONS_DATA[locationKey];
  const rateInfo = COURSE_RATES[classType][sessions];
  const totalHtm = selectedLocation.htm * sessions;
  const grandTotal = rateInfo.price + totalHtm;

  const waUrl = buildWhatsAppUrl(
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
  };

  return (
    <section id="kalkulator" className="py-20 bg-slate-100 text-slate-900 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3">
            <CalculatorIcon className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Kalkulator Estimasi Biaya Transparan</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight">
            Hitung Biaya Les & Tiket Kolam
          </h2>
          
          <p className="mt-3 text-base font-semibold text-slate-800">
            Pilih kategori, tipe kelas, jumlah pertemuan, dan lokasi kolam hotel untuk melihat rincian biaya secara transparan.
          </p>
        </div>

        {/* Main Calculator Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Step 1: Kategori */}
              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider mb-2">
                  1. Pilih Kategori Peserta
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_PROGRAMS.map((prog) => (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => setSelectedCategory(prog.title)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
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
                <label className="block text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider mb-2">
                  2. Pilih Tipe Kelas
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setClassType('privat')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      classType === 'privat'
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-black">Privat (1-on-1)</span>
                      {classType === 'privat' && <CheckIcon className="w-4 h-4 text-blue-700" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700 block">1 Pelatih : 1 Peserta</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClassType('reguler')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      classType === 'reguler'
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-black">Reguler (3-4 Orang)</span>
                      {classType === 'reguler' && <CheckIcon className="w-4 h-4 text-blue-700" />}
                    </div>
                    <span className="text-xs font-bold text-slate-700 block">Kelompok Kecil</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Sesi */}
              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>3. Jumlah Pertemuan</span>
                  {sessions === 8 && (
                    <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                      <SparklesIcon className="w-4 h-4" /> Disarankan! Hemat 200k
                    </span>
                  )}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSessions(4)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      sessions === 4
                        ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black">4x Pertemuan</span>
                      <span className="text-xs font-bold text-slate-700">1x / minggu</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">Paket Dasar Mengapung</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessions(8)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      sessions === 8
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-black ring-2 ring-amber-500/30'
                        : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-amber-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-amber-900">8x Pertemuan</span>
                      <span className="text-xs font-extrabold text-amber-700">2x / minggu</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">Paket Mahir Berenang</span>
                  </button>
                </div>
              </div>

              {/* Step 4: Lokasi */}
              <div>
                <label className="block text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wider mb-2">
                  4. Pilih Lokasi Kolam Hotel
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {Object.values(LOCATIONS_DATA).map((loc) => (
                    <button
                      key={loc.key}
                      type="button"
                      onClick={() => setLocationKey(loc.key)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        locationKey === loc.key
                          ? 'bg-blue-50 border-blue-600 text-blue-950 font-black ring-2 ring-blue-500/20'
                          : 'bg-slate-50 border-slate-300 text-slate-900 hover:border-blue-500'
                      }`}
                    >
                      <span className="font-black text-xs block text-slate-950">{loc.name}</span>
                      <span className="text-xs text-emerald-800 font-extrabold block mt-0.5">
                        HTM Rp {loc.htm.toLocaleString('id-ID')}/sesi
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Column (Electric Cobalt Blue Card Container) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-blue-600 text-white rounded-2xl p-6 shadow-xl text-left">
              
              <div>
                {/* Header Summary */}
                <div className="flex items-center justify-between border-b border-blue-400/60 pb-3.5 mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-100 flex items-center gap-1.5">
                    <TagIcon className="w-4 h-4 text-white" /> Rincian Biaya
                  </span>
                  <span className="text-xs font-extrabold text-blue-950 bg-white px-2.5 py-1 rounded-full shadow-xs">
                    1 Sesi = 1Jm 15Mn
                  </span>
                </div>

                {/* Selected Package Label */}
                <div className="mb-4">
                  <span className="text-xs text-blue-100 font-semibold block">Paket Pilihan:</span>
                  <div className="text-base sm:text-lg font-black text-white font-outfit mt-0.5 leading-snug">
                    {selectedCategory} — {classType === 'privat' ? 'Privat' : 'Reguler'} ({sessions}x)
                  </div>
                </div>

                {/* Calculation Lines */}
                <div className="space-y-3.5 text-xs sm:text-sm mb-6">
                  
                  <div className="flex items-center justify-between text-blue-50 font-semibold">
                    <div>
                      <span className="text-white font-bold">Biaya Kursus Aqualux ({sessions}x)</span>
                      <span className="text-xs text-blue-200 block">@Rp {rateInfo.perSession.toLocaleString('id-ID')} / sesi</span>
                    </div>
                    <span className="font-black text-white text-base">
                      Rp {rateInfo.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-blue-50 font-semibold pt-2.5 border-t border-blue-400/60">
                    <div>
                      <span className="text-white font-bold">Est. HTM {selectedLocation.name}</span>
                      <span className="text-xs text-blue-200 block">
                        {sessions}x Kedatangan @Rp{selectedLocation.htm.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <span className="font-extrabold text-white text-sm">
                      Rp {totalHtm.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {rateInfo.discount && (
                    <div className="bg-amber-400 text-slate-950 p-2.5 rounded-xl text-xs font-black flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1">
                        <SparklesIcon className="w-4 h-4 text-slate-950" /> Diskon Promo:
                      </span>
                      <span>{rateInfo.discount}</span>
                    </div>
                  )}

                  <div className="pt-3.5 border-t border-blue-400/80">
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block">
                      Total Estimasi Pengeluaran:
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-outfit">
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
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWaClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all btn-hover-effect"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Ambil Slot & Konsultasi WA</span>
                </a>

                <p className="text-xs text-blue-100 text-center font-semibold mt-2.5 flex items-center justify-center gap-1">
                  <BoltIcon className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Pesan terisi otomatis sesuai rincian kalkulasi di atas.</span>
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
