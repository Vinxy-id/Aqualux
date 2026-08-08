import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, HeartHandshake, FileSpreadsheet } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-blue-700" />,
      title: 'Pelatih Berprestasi & Bersertifikat',
      description: 'Diajar langsung oleh pelatih peraih medali Popda & Kejurnas Finswimming Jatim. Memiliki sertifikat dan metode latih profesional.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      title: 'Fokus Teknik & Keselamatan Utama',
      description: 'Keamanan murid adalah nomor 1. Pendekatan ramah tanpa kekerasan/paksaan. Sangat direkomendasikan untuk anak pemula & orang yang trauma air.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-blue-700" />,
      title: 'Program Bertahap & Terstruktur',
      description: 'Kurikulum belajar terukur mulai dari Water Orientation (pengenalan air), mengapung mandiri, pernapasan, hingga penguasaan gaya renang penuh.'
    },
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-indigo-700" />,
      title: 'Evaluasi Perkembangan Berkala',
      description: 'Coach memberikan evaluasi kemajuan peserta di setiap akhir sesi, memastikan target belajar (seperti waktu tes renang) tercapai tepat waktu.'
    }
  ];

  return (
    <section id="keunggulan" className="py-20 bg-slate-100 text-slate-900 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight">
            4 Pilar Keunggulan AQUALUX Swimming Course
          </h2>
          <p className="mt-3 text-base font-semibold text-slate-800">
            Membangun keterampilan, keselamatan air, dan kepercayaan diri peserta secara berkelanjutan.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {pillars.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-3xl border border-slate-300 shadow-sm card-clean-hover text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-950 font-outfit mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
