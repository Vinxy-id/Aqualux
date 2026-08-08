import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink, Ticket, Utensils, Navigation, MessageCircle } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { LocationKey } from '../types';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const LocationsSection: React.FC = () => {
  const { locations } = useAqualuxData();
  const [activeMapKey, setActiveMapKey] = useState<LocationKey>('ubud');
  const activeLocation = locations[activeMapKey] || locations.ubud;
  const waUrl = buildGeneralWhatsAppUrl();

  return (
    <section id="lokasi" className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            Lokasi Kolam Renang Bimbingan
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight">
            Pilihan Kolam Renang Hotel di Malang
          </h2>
          <p className="mt-3 text-sm sm:text-base font-semibold text-slate-800">
            Latihan di kolam renang hotel bintang yang bersih, nyaman, dan terawat. Pilih lokasi yang paling dekat & nyaman untuk Anda.
          </p>
        </div>

        {/* 3 Location Cards Grid - Clean Uniform Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {Object.values(locations).map((loc) => {
            const isMapActive = activeMapKey === loc.key;

            return (
              <motion.div 
                key={loc.key}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-300 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badge */}
                    {loc.badge && (
                      <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                        {loc.key === 'savana' && <Utensils className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{loc.badge}</span>
                      </div>
                    )}

                    {/* Hotel Title */}
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <span className="text-xl sm:text-2xl font-black text-white font-outfit drop-shadow-md block">
                        {loc.name}
                      </span>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                      {loc.description}
                    </p>

                    {/* Specifications Box */}
                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Ticket className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Tiket Masuk:</span>
                        </span>
                        <span className="font-black text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl border border-emerald-300 text-xs sm:text-sm text-right">
                          Rp {loc.htm.toLocaleString('id-ID')} <span className="text-[10px] font-bold text-emerald-700">/sesi</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200/70 pt-2 gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Hari Bimbingan:</span>
                        </span>
                        <span className="font-extrabold text-slate-950 text-right">{loc.days}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200/70 pt-2 gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Jam Sesi:</span>
                        </span>
                        <span className="font-extrabold text-slate-950 text-right">{loc.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 sm:p-6 pt-0 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMapKey(loc.key);
                      const mapElem = document.getElementById('map-preview-container');
                      if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px] ${
                      isMapActive 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20' 
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{isMapActive ? 'Peta Aktif Saat Ini' : 'Tampilkan Peta Live'}</span>
                  </button>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Petunjuk Arah Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Embedded Google Maps Section */}
        <motion.div
          id="map-preview-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-300 shadow-xl text-left"
        >
          {/* Map Header & Tab Selector */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-black uppercase tracking-wider mb-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-700" />
                <span>Peta Interaktif Google Maps</span>
              </div>
              <motion.h3
                key={activeLocation.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-2xl font-black text-slate-950 font-outfit"
              >
                Lokasi: {activeLocation.name}
              </motion.h3>
              {activeLocation.address && (
                <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1 flex items-start sm:items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5 sm:mt-0" />
                  <span>{activeLocation.address}</span>
                </p>
              )}
            </div>

            {/* Location Switcher Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {Object.values(locations).map((loc) => (
                <button
                  key={loc.key}
                  type="button"
                  onClick={() => setActiveMapKey(loc.key)}
                  className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition-all border flex-1 sm:flex-none text-center ${
                    activeMapKey === loc.key
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                      : 'bg-slate-100 text-slate-900 border-slate-300 hover:border-blue-500'
                  }`}
                >
                  {loc.name.replace(' Malang', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Google Map iFrame */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-200">
            {activeLocation.embedMapUrl ? (
              <iframe
                title={`Google Map - ${activeLocation.name}`}
                src={activeLocation.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm">
                Peta Google Maps tidak dapat dimuat
              </div>
            )}
          </div>

          {/* Map Footer Action Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>HTM Kolam: <strong>Rp {activeLocation.htm.toLocaleString('id-ID')} / kedatangan</strong> ({activeLocation.days})</span>
            </div>

            <a
              href={activeLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all w-full sm:w-auto shrink-0 min-h-[44px]"
            >
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Buka Petunjuk Arah di Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </motion.div>

        {/* Transparency Note */}
        <div className="mt-8 p-4 rounded-2xl bg-blue-50 border border-blue-300 text-xs sm:text-sm text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-4 h-4 text-blue-700 shrink-0" />
            <span><strong>Catatan Transparansi:</strong> Biaya les dibayar ke Aqualux. Tiket masuk kolam (HTM) dibayarkan langsung di loket hotel setiap datang latihan.</span>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-extrabold flex items-center gap-1 hover:underline shrink-0">
            <MessageCircle className="w-4 h-4" />
            <span>Tanya Admin WA &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
