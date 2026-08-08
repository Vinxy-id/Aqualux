import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/aqualuxData';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const waUrl = buildGeneralWhatsAppUrl("Halo Admin Aqualux, saya punya pertanyaan lain seputar kursus renang.");

  return (
    <section id="faq" className="py-20 bg-slate-100 text-slate-900 border-t border-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            Pertanyaan Umum (FAQ)
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-base font-semibold text-slate-800">
            Informasi lengkap seputar sistem pembayaran tiket, jadwal, dan garansi bimbingan.
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          className="space-y-3 text-left"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-2xl overflow-hidden border border-slate-300 shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-slate-950 font-outfit text-sm sm:text-base hover:text-blue-700 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-700 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-700' : ''
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-900 leading-relaxed overflow-hidden"
                    >
                      <div className="border-t border-slate-200 pt-3">
                        <p className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-slate-900 font-medium">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <div className="mt-10 text-center p-5 rounded-2xl bg-white border border-slate-300 shadow-sm">
          <p className="text-xs sm:text-sm font-semibold text-slate-800 mb-2">Punya pertanyaan lain yang belum tercantum?</p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-700 font-extrabold text-xs sm:text-sm hover:underline"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanyakan Langsung ke Admin via WhatsApp &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
