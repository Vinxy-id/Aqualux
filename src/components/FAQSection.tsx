import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/aqualuxData';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

const DEFAULT_VISIBLE_INDICES = [0, 1, 2, 4, 6, 10]; // 1-indexed points: 1, 2, 3, 5, 7, 11

export const FAQSection: React.FC = () => {
  const { openWaModal } = useAqualuxData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const renderFormattedAnswer = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-extrabold text-slate-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const visibleItems = FAQ_DATA.map((item, originalIndex) => ({ item, originalIndex })).filter(
    ({ originalIndex }) => showAllFaq || DEFAULT_VISIBLE_INDICES.includes(originalIndex)
  );

  return (
    <section id="faq" className="py-20 bg-slate-100 text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-cyan-ambient w-[400px] h-[400px] top-1/4 right-5" />

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-200 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            PERTANYAAN UMUM (FAQ)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-base font-medium text-slate-700">
            Informasi lengkap seputar sistem pembayaran tiket, jadwal, dan garansi bimbingan.
          </p>
        </motion.div>

        {/* Accordion List with Smooth Layout & Height Motion */}
        <motion.div layout className="space-y-3.5 text-left">
          <AnimatePresence initial={false}>
            {visibleItems.map(({ item, originalIndex }) => {
              const isOpen = openIndex === originalIndex;

              return (
                <motion.div
                  key={originalIndex}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="card-clean-elevated rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(originalIndex)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-slate-950 font-outfit text-sm sm:text-base hover:text-blue-700 transition-colors btn-tactile"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-700 shrink-0" />
                      <span>{item.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-900 leading-relaxed border-t border-slate-200 pt-3">
                          <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                            {renderFormattedAnswer(item.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less Toggle Button */}
        {!showAllFaq ? (
          <motion.div variants={fadeUp} className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAllFaq(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-blue-700 font-extrabold text-xs sm:text-sm shadow-sm transition-all btn-tactile"
            >
              <span>Lihat Selengkapnya FAQ ({FAQ_DATA.length - DEFAULT_VISIBLE_INDICES.length} Pertanyaan Lainnya)</span>
              <ChevronDown className="w-4 h-4 text-blue-700" />
            </button>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp} className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowAllFaq(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-extrabold text-xs sm:text-sm shadow-sm transition-all btn-tactile"
            >
              <span>Tampilkan Lebih Sedikit</span>
              <ChevronDown className="w-4 h-4 text-slate-700 rotate-180" />
            </button>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div variants={fadeUp} className="mt-10 text-center p-5 rounded-2xl card-clean-elevated flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-800">Punya pertanyaan lain yang belum tercantum?</p>
          <button
            type="button"
            onClick={() => openWaModal("Halo Admin Aqualux, saya punya pertanyaan lain seputar kursus renang.")}
            className="inline-flex items-center gap-2 text-blue-700 font-extrabold text-xs sm:text-sm hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanyakan Langsung ke Admin via WhatsApp &rarr;</span>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};
