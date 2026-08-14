import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink, Ticket, Utensils, Navigation } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { LocationKey } from '../types';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const LocationsSection: React.FC = () => {
  const { locations } = useAqualuxData();
  const [activeMapKey, setActiveMapKey] = useState<LocationKey>('ubud');
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const activeLocation = locations[activeMapKey] || locations.ubud;
  const waUrl = buildGeneralWhatsAppUrl();

  // Defer Google Maps iframe rendering until section is near viewport to save 435KB JS & 555ms TBT
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    const elem = document.getElementById('map-preview-container');
    if (elem) observer.observe(elem);
    return () => observer.disconnect();
  }, []);

  /** Only allow Google Maps HTTPS embeds in the iframe. */
  const isValidMapEmbedUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return (
        parsed.protocol === 'https:' &&
        (parsed.hostname === 'maps.google.com' ||
          parsed.hostname === 'www.google.com' ||
          parsed.hostname.endsWith('.google.com'))
      );
    } catch {
      return false;
    }
  };

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="glow-cyan-ambient w-[450px] h-[450px] top-1/4 right-5" />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300">
            LOKASI KOLAM RENANG
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Pilihan Kolam Renang Hotel di Malang
          </h2>
          <p className="mt-3 text-sm sm:text-base font-medium text-slate-700">
            Latihan di kolam renang hotel bintang yang bersih, nyaman, dan terawat. Pilih lokasi yang paling dekat & nyaman untuk Anda.
          </p>
        </motion.div>

        {/* 3 Location Cards Grid */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {Object.values(locations).map((loc) => {
            const isMapActive = activeMapKey === loc.key;

            return (
              <motion.div 
                key={loc.key}
                variants={fadeUp}
                className="card-clean-elevated rounded-3xl overflow-hidden flex flex-col justify-between text-left group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      width="450"
                      height="208"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    {/* Top Badge */}
                    {loc.badge && (
                      <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1.5 border border-white/20">
                        {loc.key === 'savana' && <Utensils className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{loc.badge}</span>
                      </div>
                    )}

                    {/* Hotel Title */}
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <h3 className="text-xl sm:text-2xl font-black text-white font-outfit drop-shadow-md block">
                        {loc.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                      {loc.description}
                    </p>

                    {/* Specifications Box */}
                    <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Ticket className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Tiket Masuk:</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl border border-emerald-300 text-xs sm:text-sm text-right">
                          Rp {loc.htm.toLocaleString('id-ID')} <span className="text-[10px] text-emerald-700">/sesi</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-2 gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Hari Bimbingan:</span>
                        </span>
                        <span className="font-semibold text-slate-950 text-right">{loc.days}</span>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-200 pt-2 gap-2">
                        <span className="text-slate-700 font-bold flex items-center gap-1.5 shrink-0">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Jam Sesi:</span>
                        </span>
                        <span className="font-mono font-semibold text-slate-950 text-right">{loc.hours}</span>
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
                      setMapLoaded(true);
                      const mapElem = document.getElementById('map-preview-container');
                      if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px] btn-tactile ${
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
                    aria-label={`Petunjuk Arah Google Maps ke ${loc.name}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Petunjuk Arah {loc.name} di Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Embedded Google Maps Section */}
        <motion.div variants={fadeUp} id="map-preview-container" className="card-clean-elevated rounded-3xl p-5 sm:p-8 text-left">
          
          {/* Map Header & Tab Selector */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-950 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-700" />
                <span>PETA INTERAKTIF GOOGLE MAPS</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-slate-950 font-outfit">
                Lokasi: {activeLocation.name}
              </h3>
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
                  onClick={() => {
                    setActiveMapKey(loc.key);
                    setMapLoaded(true);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition-all border flex-1 sm:flex-none text-center btn-tactile ${
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

          {/* Embedded Map iFrame */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-200">
            {mapLoaded && activeLocation.embedMapUrl && isValidMapEmbedUrl(activeLocation.embedMapUrl) ? (
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
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-100">
                <MapPin className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                <span className="font-extrabold text-sm text-slate-900 mb-3">
                  Peta Google Maps - {activeLocation.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMapLoaded(true)}
                  className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all btn-tactile"
                >
                  Tampilkan Peta Live Google Maps
                </button>
              </div>
            )}
          </div>

          {/* Map Footer Bar */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>HTM Kolam: <strong className="font-mono">Rp {activeLocation.htm.toLocaleString('id-ID')} / kedatangan</strong> ({activeLocation.days})</span>
            </div>

            <a
              href={activeLocation.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka Petunjuk Arah ${activeLocation.name} di Google Maps App`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all w-full sm:w-auto shrink-0 min-h-[44px] btn-tactile"
            >
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Buka Petunjuk Arah di Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </motion.div>

      </motion.div>
    </section>
  );
};
