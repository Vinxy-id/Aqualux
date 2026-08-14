import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Globe, Phone, MapPin, ExternalLink, Settings } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { locations, adminContacts } = useAqualuxData();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-16 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          
          {/* Col 1: Brand Info & Official Logo */}
          <motion.div variants={fadeUp} className="lg:col-span-4 space-y-4 text-left">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md">
              <img 
                src="./aqualux-icon.png" 
                alt="AQUALUX Swimming Course" 
                width="48"
                height="48"
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Kursus renang profesional privat & reguler di kota Malang. Membantu anak mulai usia 5 tahun, pelajar, dewasa, hingga persiapan fisik ujian TNI & Polri berenang aman & percaya diri.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/aqualux.swimcourse/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Instagram Aqualux"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                aria-label="Website Aqualux"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Col 2: Navigation Links */}
          <motion.div variants={fadeUp} className="lg:col-span-3 space-y-3 text-left">
            <h2 className="text-xs font-bold text-white font-outfit uppercase tracking-wider">Navigasi Cepat</h2>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#program" className="hover:text-blue-400 transition-colors">Program Kursus</a></li>
              <li><a href="#lokasi" className="hover:text-blue-400 transition-colors">Lokasi Hotel Bimbingan</a></li>
              <li><a href="#keunggulan" className="hover:text-blue-400 transition-colors">Keunggulan Pelatih</a></li>
              <li><a href="#testimoni" className="hover:text-blue-400 transition-colors">Testimoni Alumni</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Pertanyaan Umum (FAQ)</a></li>
              <li><a href="#links" className="hover:text-blue-400 transition-colors flex items-center gap-1"><span className="text-cyan-400 font-bold">●</span> Link in Bio (/links)</a></li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 hover:bg-blue-900 hover:text-white text-[11px] font-extrabold transition-all"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Portal Admin (/admin)</span>
                  </button>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Col 3: Official Contact & Locations */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-4 text-left">
            <h2 className="text-xs font-bold text-white font-outfit uppercase tracking-wider">Kontak & Informasi Lokasi</h2>
            
            {/* WhatsApp Phone Contact */}
            <div className="flex items-start gap-2.5 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 text-xs">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold block">Kontak Admin WhatsApp:</span>
                <span className="text-slate-300 font-semibold block mt-0.5">{adminContacts.faqihPhone} (Faqih)</span>
                <span className="text-slate-300 font-semibold block">{adminContacts.abedPhone} (Abed)</span>
              </div>
            </div>

            {/* 3 Location Pins List */}
            <div className="space-y-2.5 pt-1 text-xs">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Lokasi Kolam Renang Bimbingan:
              </span>

              {Object.values(locations).map((loc) => (
                <div 
                  key={loc.key}
                  className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 group hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start gap-2.5 overflow-hidden">
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                        {loc.name}
                      </h5>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {loc.address ? loc.address.split(',')[0] : 'Kota Malang'} (HTM Rp{loc.htm.toLocaleString('id-ID')})
                      </p>
                    </div>
                  </div>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-600 text-blue-200 hover:text-white font-bold text-[11px] shrink-0 border border-blue-700/50 transition-all"
                    title={`Lihat peta ${loc.name}`}
                  >
                    <span>Peta</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}

            </div>

          </motion.div>

        </motion.div>

        {/* Bottom Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AQUALUX Swimming Course. All rights reserved.</p>
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-slate-300 hover:text-blue-400 transition-colors underline"
            >
              Aqualux Admin Portal (/admin)
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};
