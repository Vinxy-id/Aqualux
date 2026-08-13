import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle2, Users, UserCheck } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const PricingSection: React.FC = () => {
  const { courseRates, openWaModal } = useAqualuxData();

  const packages = [
    {
      id: 'reguler-4',
      type: 'REGULER',
      typeLabel: 'Kelas Reguler (3-4 Anak)',
      sessions: '4x',
      sessionLabel: 'pertemuan',
      price: courseRates.reguler[4].price,
      perSession: courseRates.reguler[4].perSession,
      iconType: 'group',
      waMessage: 'Halo Admin Aqualux, saya tertarik pendaftaran Paket Reguler 4x Pertemuan. Boleh minta info slot jadwal?'
    },
    {
      id: 'reguler-8',
      type: 'REGULER',
      typeLabel: 'Kelas Reguler (3-4 Anak)',
      sessions: '8x',
      sessionLabel: 'pertemuan',
      price: courseRates.reguler[8].price,
      perSession: courseRates.reguler[8].perSession,
      discount: courseRates.reguler[8].discount || 'Hemat & Terjangkau',
      iconType: 'group',
      waMessage: 'Halo Admin Aqualux, saya tertarik pendaftaran Paket Reguler 8x Pertemuan. Boleh minta info slot jadwal?'
    },
    {
      id: 'privat-4',
      type: 'PRIVAT',
      typeLabel: 'Kelas Privat (1-on-1)',
      sessions: '4x',
      sessionLabel: 'pertemuan',
      price: courseRates.privat[4].price,
      perSession: courseRates.privat[4].perSession,
      iconType: 'private',
      waMessage: 'Halo Admin Aqualux, saya tertarik pendaftaran Paket Privat 1-on-1 (4x Pertemuan). Boleh minta info slot jadwal?'
    },
    {
      id: 'privat-8',
      type: 'PRIVAT',
      typeLabel: 'Kelas Privat (1-on-1)',
      sessions: '8x',
      sessionLabel: 'pertemuan',
      price: courseRates.privat[8].price,
      perSession: courseRates.privat[8].perSession,
      discount: courseRates.privat[8].discount || 'Hemat & Terjangkau',
      iconType: 'private',
      waMessage: 'Halo Admin Aqualux, saya tertarik pendaftaran Paket Privat 1-on-1 (8x Pertemuan). Boleh minta info slot jadwal?'
    }
  ];

  return (
    <section id="harga" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-cyan-ambient w-[450px] h-[450px] top-1/4 left-1/2 -translate-x-1/2" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            PRICE LIST (PAKET)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Daftar Paket Harga Les Renang
          </h2>
          <p className="mt-3 text-base font-medium text-slate-700">
            Pilihan paket bimbingan privat 1-on-1 & reguler kelompok kecil.
          </p>
        </motion.div>

        {/* Main Blue Banner Container Card */}
        <motion.div
          variants={fadeUp}
          className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-[2.5rem] p-5 sm:p-8 lg:p-10 shadow-2xl border border-blue-400/40 text-white"
        >
          {/* Top Pill Badge */}
          <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-20">
            <div className="px-6 py-2.5 rounded-full bg-white text-blue-950 border-2 border-blue-200 text-xs sm:text-sm font-black font-outfit uppercase tracking-widest shadow-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <span>PRICE LIST (PAKET)</span>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-4">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => openWaModal(pkg.waMessage)}
                className="relative bg-white text-slate-900 rounded-3xl p-5 sm:p-6 flex flex-col justify-between items-center text-center shadow-xl border-2 border-dashed border-blue-300 hover:border-blue-600 cursor-pointer group btn-tactile transition-all"
              >
                {/* Optional Discount Badge */}
                {pkg.discount && (
                  <div className="absolute -top-3 right-3 bg-amber-400 text-slate-950 font-mono font-black text-[11px] uppercase px-3 py-1 rounded-full shadow-md border border-slate-950">
                    {pkg.discount}
                  </div>
                )}

                {/* Top Circular Swimmer Avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-blue-100 to-sky-200 border-2 border-blue-300 shadow-md flex items-center justify-center mb-3 relative overflow-hidden group-hover:scale-110 transition-transform">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full" />
                  {pkg.iconType === 'group' ? (
                    <Users className="w-7 h-7 text-blue-700 relative z-10" />
                  ) : (
                    <UserCheck className="w-7 h-7 text-blue-700 relative z-10" />
                  )}
                </div>

                {/* Content */}
                <div className="w-full">
                  <h3 className="text-2xl sm:text-3xl font-black font-outfit text-blue-950 tracking-tight leading-none mb-1.5">
                    {pkg.type}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 block mb-4 bg-slate-100 py-1 px-2.5 rounded-lg border border-slate-200">
                    {pkg.typeLabel}
                  </span>

                  {/* Sessions Display */}
                  <div className="flex items-baseline justify-center gap-1.5 mb-3">
                    <span className="text-3xl sm:text-4xl font-black font-sans text-slate-950">
                      {pkg.sessions}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {pkg.sessionLabel}
                    </span>
                  </div>

                  {/* Dashed Separator */}
                  <div className="w-full border-t border-slate-200 my-3" />

                  {/* Price */}
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl font-black font-outfit text-blue-700 block tracking-tight">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-blue-50/90 px-3 py-1 rounded-md border border-blue-200 inline-block mt-2">
                      (@Rp {pkg.perSession.toLocaleString('id-ID')} / sesi)
                    </span>
                  </div>
                </div>

                {/* Action Hover Prompt */}
                <div className="w-full mt-5 pt-3 border-t border-slate-100">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-blue-600 group-hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Pilih Paket WA</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm font-bold text-white border-t border-blue-400/40 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <span className="text-white font-bold leading-normal">Note: Harga paket di atas <strong className="text-amber-300 font-black">belum termasuk tiket masuk kolam renang (HTM)</strong>.</span>
            </div>

            <button
              type="button"
              onClick={() => openWaModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition-all btn-tactile shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Konsultasi Paket via WhatsApp</span>
            </button>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
};
