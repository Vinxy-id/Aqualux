import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle, User } from 'lucide-react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { TESTIMONIALS_DATA } from '../data/aqualuxData';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const TestimonialsSection: React.FC = () => {
  const { openWaModal } = useAqualuxData();

  return (
    <section id="testimoni" className="py-20 bg-white text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-cyan-ambient w-[450px] h-[450px] top-1/3 left-10" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            TESTIMONI & BUKTI HASIL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Pengalaman Orang Tua & Peserta Kursus
          </h2>
          <p className="mt-3 text-base font-medium text-slate-700">
            Kisah nyata perkembangan peserta dari takut air hingga menguasai gaya renang dan lolos seleksi fisik.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="card-clean-elevated p-6 rounded-3xl flex flex-col justify-between text-left relative"
            >
              <Quote className="w-8 h-8 text-blue-200 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Outcome Badge */}
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-mono font-bold px-3 py-1 rounded-full mb-4">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{item.outcomeBadge}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Generic User Avatar Icon Badge */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 shrink-0 shadow-xs">
                  <User className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-950 font-outfit">{item.name}</h3>
                  <span className="text-xs font-bold text-slate-600 block">{item.role}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* CTA Box */}
        <motion.div variants={fadeUp} className="mt-12 bg-blue-50 p-6 sm:p-8 rounded-3xl border border-blue-300 shadow-md text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-black text-slate-950 font-outfit">Ingin Konsultasikan Target Belajar Anda?</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">Tanyakan ketersediaan jadwal pelatih untuk sesi minggu ini.</p>
          </div>

          <button
            type="button"
            onClick={() => openWaModal()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shrink-0 shadow-md btn-hover-effect btn-tactile"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya Jadwal WA</span>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
};
