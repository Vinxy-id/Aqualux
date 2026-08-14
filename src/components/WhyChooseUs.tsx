import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, HeartHandshake, FileSpreadsheet, Trophy, Medal, Star, CheckCircle2, TrendingUp } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const WhyChooseUs: React.FC = () => {
  const coachAchievements = [
    {
      title: 'Pelatih Renang',
      subtitle: 'REKAM JEJAK ATLET & PELATIH BERPENGALAMAN',
      description: 'Pelatih berlatar belakang atlet renang dengan penguasaan teknik dasar dan gaya renang yang benar.',
      icon: <Trophy className="w-6 h-6 text-amber-500" />,
      badge: 'PELATIH RENANG',
      footer: 'Latar Belakang Atlet & Pelatih'
    },
    {
      title: 'Program Latihan',
      subtitle: 'BERLISENSI & PROGRAM LATIHAN BERTAHAP',
      description: 'Menggunakan metode latihan yang terstruktur, menyesuaikan ritme belajar peserta, serta mengutamakan keselamatan selama di kolam.',
      icon: <Medal className="w-6 h-6 text-blue-600" />,
      badge: 'METODE LATIHAN TERSTRUKTUR',
      footer: 'Metode Latihan Ramah, Aman & Bertahap'
    },
    {
      title: 'Evaluasi Progres Latihan',
      subtitle: 'EVALUASI KEMAMPUAN GAYA BERENANG',
      description: 'Setiap perkembangan teknik mengapung, pernapasan, hingga gaya renang peserta selalu dievaluasi secara bertahap dan terukur.',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      badge: 'PROGRES TERUKUR',
      footer: 'Evaluasi Berkala'
    },
    {
      title: 'Pendekatan Sabar & Ramah',
      subtitle: 'UNTUK ANAK MULAI USIA 5 TAHUN, REMAJA, DEWASA & PERSIAPAN TNI/POLRI/KEDINASAN',
      description: 'Melatih peserta pemula dari anak-anak hingga dewasa secara bertahap agar merasa tenang dan percaya diri di dalam air.',
      icon: <Star className="w-6 h-6 text-indigo-600" />,
      badge: 'ANAK & DEWASA',
      footer: 'Bimbingan Individual'
    }
  ];

  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-blue-700" />,
      title: 'Pelatih Berpengalaman',
      description: 'Diajar oleh pelatih berlisensi yang memiliki rekam jejak atlet dan pemahaman teknik renang yang baik.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'Keselamatan & Kenyamanan',
      description: 'Keamanan peserta adalah fokus utama. Pendekatan ramah tanpa paksaan untuk anak dan pemula.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-blue-700" />,
      title: 'Program Latihan Bertahap',
      description: 'Program latihan dari pengenalan air hingga penguasaan teknik gaya renang yang benar.'
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-indigo-700" />,
      title: 'Evaluasi Kemajuan Sesi',
      description: 'Coach memberikan catatan perkembangan secara berkala agar target latihan terpantau perkembangannya.'
    }
  ];

  return (
    <section id="keunggulan" className="py-20 bg-slate-100 text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Glow Ambient */}
      <div className="glow-cyan-ambient w-[400px] h-[400px] top-1/4 right-5" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-200 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            PROFIL & METODE PELATIH
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Pengalaman & Metode Pelatih Aqualux
          </h2>
          <p className="mt-3 text-base font-medium text-slate-700">
            Latihan dibimbing oleh pelatih berlatar belakang atlet renang dengan program latihan yang terstruktur, sabar, ramah dan aman.
          </p>
        </motion.div>

        {/* Coach Achievements Highlight Grid */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
          {coachAchievements.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUp}
              className="card-clean-elevated p-6 sm:p-7 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-950 text-white px-3 py-1 rounded-full border border-slate-800 tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-950 font-outfit mb-1 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{item.footer}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4 Pillars Summary Grid */}
        <motion.div variants={fadeUp} className="card-clean-elevated p-6 sm:p-8 rounded-3xl text-left">
          <h3 className="text-xl font-black text-slate-950 font-outfit mb-6 text-center">
            4 Prinsip Latihan Aqualux
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center mb-3">
                  {item.icon}
                </div>

                <h4 className="text-sm font-black text-slate-950 font-outfit mb-1.5 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs font-medium text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
