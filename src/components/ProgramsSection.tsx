import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, GraduationCap, UserCheck, ShieldAlert, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { CATEGORY_PROGRAMS } from '../data/aqualuxData';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const ProgramsSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('anak');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Baby': return <Baby className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      default: return <Baby className="w-6 h-6" />;
    }
  };

  return (
    <section id="program" className="py-16 sm:py-20 bg-slate-100 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14 text-left">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
              Our Swimming Services
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight">
              Program Renang Tersegmentasi
            </h2>
            <p className="mt-2 text-sm sm:text-base font-semibold text-slate-800 max-w-xl">
              Pilih kategori usia dan target belajar yang sesuai dengan kebutuhan Anda atau putra-putri Anda.
            </p>
          </div>

          <a 
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-full shadow-md transition-all shrink-0 min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya Jadwal via WA</span>
          </a>
        </div>

        {/* Numbered Category Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {CATEGORY_PROGRAMS.map((prog, index) => {
            const isSelected = activeId === prog.id;
            const numberFormatted = `0${index + 1}`;
            const programWaUrl = buildGeneralWhatsAppUrl(`Halo Admin Aqualux, saya berminat mendaftar program ${prog.title}. Mohon info jadwal pelatih.`);

            return (
              <motion.div
                key={prog.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                onClick={() => setActiveId(prog.id)}
                className={`rounded-3xl p-5 sm:p-6 transition-all duration-200 border cursor-pointer flex flex-col justify-between relative text-left ${
                  isSelected 
                    ? 'border-blue-700 bg-blue-600 text-white shadow-xl scale-[1.01]' 
                    : 'bg-white border-slate-300 text-slate-900 hover:border-blue-500 shadow-sm'
                }`}
              >
                {/* Numbered Header (01, 02, 03, 04) */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className={`text-2xl sm:text-3xl font-black font-outfit ${
                    isSelected ? 'text-white/50' : 'text-slate-400'
                  }`}>
                    {numberFormatted}
                  </span>

                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {getIcon(prog.iconName)}
                  </div>
                </div>

                <div>
                  <span className={`text-xs font-extrabold uppercase tracking-wider block mb-1 ${
                    isSelected ? 'text-blue-100' : 'text-blue-700'
                  }`}>
                    {prog.target}
                  </span>

                  <h3 className={`text-lg sm:text-xl font-black font-outfit mb-2 ${
                    isSelected ? 'text-white' : 'text-slate-950'
                  }`}>
                    {prog.title}
                  </h3>

                  <p className={`text-xs leading-relaxed font-medium mb-5 ${
                    isSelected ? 'text-blue-50' : 'text-slate-800'
                  }`}>
                    {prog.description}
                  </p>

                  {/* Checklist */}
                  <ul className={`space-y-2 border-t pt-4 mb-6 ${
                    isSelected ? 'border-blue-400/40' : 'border-slate-200'
                  }`}>
                    {prog.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-bold">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isSelected ? 'text-emerald-300' : 'text-emerald-600'
                        }`} />
                        <span className={isSelected ? 'text-white' : 'text-slate-900'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <a
                  href={programWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full font-extrabold text-xs transition-all min-h-[44px] ${
                    isSelected
                      ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 shadow-md'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pilih & Chat WA Admin</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
