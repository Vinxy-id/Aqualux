import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { buildWhatsAppUrlForPhone, sanitizePhone } from '../utils/whatsapp';

export const WhatsAppModal: React.FC = () => {
  const { isWaModalOpen, waModalMessage, closeWaModal, adminContacts } = useAqualuxData();

  if (!isWaModalOpen) return null;

  const phone1 = adminContacts.faqihPhone || '082142698440';
  const phone2 = adminContacts.abedPhone || '08995911927';

  const clean1 = sanitizePhone(phone1);
  const clean2 = sanitizePhone(phone2);

  const formatted1 = clean1.startsWith('62')
    ? `+62 ${clean1.slice(2, 6)}-${clean1.slice(6, 10)}-${clean1.slice(10)}`
    : phone1;

  const formatted2 = clean2.startsWith('62')
    ? `+62 ${clean2.slice(2, 5)}-${clean2.slice(5, 9)}-${clean2.slice(9)}`
    : phone2;

  const handleSelectAdmin = (phone: string) => {
    const url = buildWhatsAppUrlForPhone(phone, waModalMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
    closeWaModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={closeWaModal}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg sm:max-w-xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 z-10 text-slate-900 overflow-hidden"
        >
          {/* Top Decorative Banner Accent */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 absolute top-0 left-0 right-0" />

          {/* Close Button */}
          <button
            type="button"
            onClick={closeWaModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors btn-tactile"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center pt-1 mb-5">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-950 font-outfit tracking-tight">
              Pilih Kontak Admin WhatsApp
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
              Tim pelatih Aqualux siap membantu Anda. Silakan pilih nomor admin di bawah ini:
            </p>
          </div>

          {/* Admin Contact Options - Kanan Kiri (Side by Side) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
            
            {/* Left Card: Coach Faqih */}
            <div
              onClick={() => handleSelectAdmin(phone1)}
              className="bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-500/80 p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-between text-center transition-all cursor-pointer btn-tactile group shadow-sm"
            >
              <div className="flex flex-col items-center min-w-0 w-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md mb-2">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <span className="text-xs sm:text-sm font-black text-slate-950 font-outfit group-hover:text-emerald-900 transition-colors block truncate w-full">
                  Coach Faqih
                </span>

                <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-700 block mt-0.5 truncate w-full">
                  {formatted1}
                </span>

                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight mt-1">
                  Konsultasi & Pendaftaran
                </span>
              </div>

              <div className="w-full mt-3 py-2 px-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors">
                <span>Chat WA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Right Card: Coach Abed */}
            <div
              onClick={() => handleSelectAdmin(phone2)}
              className="bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-500/80 p-3.5 sm:p-4 rounded-2xl flex flex-col items-center justify-between text-center transition-all cursor-pointer btn-tactile group shadow-sm"
            >
              <div className="flex flex-col items-center min-w-0 w-full">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md mb-2">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span className="text-xs sm:text-sm font-black text-slate-950 font-outfit group-hover:text-emerald-900 transition-colors block truncate w-full">
                  Coach Abed
                </span>

                <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-700 block mt-0.5 truncate w-full">
                  {formatted2}
                </span>

                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight mt-1">
                  Konsultasi & Pendaftaran
                </span>
              </div>

              <div className="w-full mt-3 py-2 px-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors">
                <span>Chat WA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="text-center pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400">
              AQUALUX Swimming Course Malang • Respon Cepat & Ramah
            </span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
