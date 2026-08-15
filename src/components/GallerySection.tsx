import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Film, Play, ZoomIn, MapPin, Sparkles } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { GalleryCategory, GalleryItem } from '../types';
import { MediaLightboxModal } from './MediaLightboxModal';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

export const GallerySection: React.FC = () => {
  const { galleryItems } = useAqualuxData();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('semua');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const categories: { key: GalleryCategory; label: string }[] = [
    { key: 'semua', label: 'Semua Media' },
    { key: 'anak', label: 'Anak & Pemula' },
    { key: 'teknik', label: 'Teknik Renang' },
    { key: 'kedinasan', label: 'Persiapan TNI/Polri' },
    { key: 'suasana', label: 'Suasana Kolam' },
  ];

  const filteredItems = activeCategory === 'semua'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="galeri" className="py-16 sm:py-24 bg-gradient-to-b from-slate-100 via-white to-blue-50/40 text-slate-900 border-t border-slate-300 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="glow-cyan-ambient w-[500px] h-[500px] top-1/3 left-5" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300 shadow-xs">
            DOKUMENTASI & VIDEO SUASANA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Dokumentasi Nyata Sesi Latihan Aqualux
          </h2>
          <p className="mt-3 text-sm sm:text-base font-medium text-slate-700">
            Rekaman langsung keceriaan dan perkembangan peserta renang anak-anak, remaja, dewasa, hingga persiapan fisik tes TNI/Polri di kolam hotel Malang.
          </p>
        </motion.div>

        {/* Parent Reassurance Trust Banner */}
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200/90 flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700">
            <span className="font-extrabold text-blue-950 block sm:inline mr-1.5">Kenyamanan Bagi Orang Tua:</span>
            <span>Kolam hotel memiliki area tribun & kursi santai di tepi kolam. Ayah & Bunda dapat duduk tenang mengawasi langsung putra-putri saat sesi bimbingan berlangsung.</span>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-extrabold transition-all border shadow-xs cursor-pointer btn-tactile ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-blue-400 hover:text-blue-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Cards Grid */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedMedia(item)}
              className="card-clean-elevated rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Media Thumbnail Container */}
                <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-950">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width="440"
                    height="280"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                      {item.type === 'video' ? (
                        <>
                          <Film className="w-3.5 h-3.5 text-amber-400" />
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Foto</span>
                        </>
                      )}
                    </span>

                    {item.locationBadge && (
                      <span className="bg-blue-950/80 backdrop-blur-md text-blue-100 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-blue-300/40 shadow-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-300" />
                        <span>{item.locationBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Center Action Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {item.type === 'video' ? (
                      <div className="w-13 h-13 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border-2 border-white/80">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-950/70 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-white/40 opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Duration Badge for Video */}
                  {item.videoDuration && (
                    <div className="absolute bottom-3 right-3 bg-slate-950/90 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-amber-400/40">
                      {item.videoDuration}
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-black text-slate-950 font-outfit mb-1.5 leading-snug group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.type === 'video' ? 'Tonton Video Dokumen' : 'Lihat Foto HD'}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Media Lightbox Viewer Modal */}
        <MediaLightboxModal
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      </motion.div>
    </section>
  );
};
