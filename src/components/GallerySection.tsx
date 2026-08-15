import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Film, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ZoomIn, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';
import { GalleryCategory, GalleryItem } from '../types';
import { MediaLightboxModal } from './MediaLightboxModal';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/motion';

/** Inline Video Card Component with Hover & Tap Playback */
const InlineVideoCard: React.FC<{
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
}> = ({ item, onOpenLightbox }) => {
  const { openWaModal } = useAqualuxData();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Play video inline
  const playVideo = async () => {
    setHasInteracted(true);
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Fallback for strict browser autoplay
        console.log('Autoplay deferred', err);
      }
    }
  };

  // Pause video inline
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause on card tap
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  // Toggle mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      className="card-clean-elevated rounded-3xl overflow-hidden flex flex-col justify-between group transition-all duration-300 border border-slate-200/90 hover:border-blue-300 hover:shadow-xl"
    >
      <div>
        {/* Media Container with Inline Video */}
        <div 
          className="relative h-64 sm:h-72 overflow-hidden bg-slate-950 cursor-pointer select-none"
          onClick={togglePlay}
        >
          {/* HTML5 Native Inline Video */}
          <video
            ref={videoRef}
            src={item.mediaUrl}
            poster={item.thumbnailUrl}
            loop
            muted={isMuted}
            playsInline
            preload={hasInteracted ? 'auto' : 'metadata'}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity duration-300 pointer-events-none ${
            isPlaying ? 'opacity-40' : 'opacity-80'
          }`} />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <span className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPlaying ? 'Memutar' : 'Video Sesi'}</span>
              {isPlaying && (
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              )}
            </span>

            {item.locationBadge && (
              <span className="bg-blue-950/85 backdrop-blur-md text-blue-100 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full border border-blue-300/40 shadow-xs flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-300" />
                <span>{item.locationBadge}</span>
              </span>
            )}
          </div>

          {/* Center Play/Pause Overlay Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-14 h-14 rounded-full bg-blue-600/90 backdrop-blur-xs text-white flex items-center justify-center shadow-xl border-2 border-white/90 group-hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Controls Bar (Inside Video Box) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-auto">
            {/* Sound Mute/Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
              className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-white border border-white/20 shadow-xs transition-transform hover:scale-105 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Duration / Fullscreen Button */}
            <div className="flex items-center gap-1.5">
              {item.videoDuration && (
                <span className="bg-slate-950/90 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-400/40">
                  {item.videoDuration}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(item);
                }}
                title="Perbesar Tampilan"
                className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-white border border-white/20 shadow-xs transition-transform hover:scale-105 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-slate-200" />
              </button>
            </div>
          </div>

          {/* Bottom Scrub Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden z-20">
            <div 
              className="h-full bg-blue-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card Text Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-black text-slate-950 font-outfit mb-1.5 leading-snug group-hover:text-blue-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer Quick Action */}
      <div className="px-5 sm:px-6 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 pt-3.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
          {isPlaying ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-700">Sedang Diputar</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-blue-600 fill-blue-600" />
              <span>Hover / Tap untuk putar</span>
            </>
          )}
        </span>

        <button
          type="button"
          onClick={() => openWaModal(`Halo Admin Aqualux, saya tertarik dengan bimbingan di video "${item.title}". Boleh minta info jadwal?`)}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-700" />
          <span>Tanya Sesi</span>
        </button>
      </div>
    </motion.div>
  );
};

/** Photo Item Card Component */
const PhotoCard: React.FC<{
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
}> = ({ item, onOpenLightbox }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpenLightbox(item)}
      className="card-clean-elevated rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300 border border-slate-200/90 hover:border-blue-300 hover:shadow-xl"
    >
      <div>
        {/* Media Thumbnail Container */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-950">
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
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>Foto HD</span>
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
            <div className="w-12 h-12 rounded-full bg-slate-950/70 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-white/40 opacity-0 group-hover:opacity-100">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Card Text Content */}
        <div className="p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-black text-slate-950 font-outfit mb-1.5 leading-snug group-hover:text-blue-700 transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="px-5 sm:px-6 pb-5 pt-0">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
          <Camera className="w-3.5 h-3.5 text-blue-600" />
          <span>Lihat Foto Dokumentasi</span>
        </span>
      </div>
    </motion.div>
  );
};

export const GallerySection: React.FC = () => {
  const { galleryItems } = useAqualuxData();
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  // Focus only on the 3 authentic video footages
  const videoItems = galleryItems.filter(item => item.type === 'video').slice(0, 3);

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
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3.5 py-1.5 rounded-full mb-3 inline-block border border-blue-300 shadow-xs">
            DOKUMENTASI FOOTAGE ASLI
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-outfit tracking-tight text-balance">
            Rekaman Langsung Sesi Latihan Aqualux
          </h2>
          <p className="mt-3 text-sm sm:text-base font-medium text-slate-700">
            Cuplikan video asli keceriaan, proses belajar meluncur, dan suasana tenang kolam renang hotel di Malang. Arahkan mouse atau sentuh video untuk memutar langsung.
          </p>
        </motion.div>

        {/* Gallery Cards Grid with Direct Inline Video Playback (3 Columns) */}
        <motion.div variants={staggerContainer(0.12)} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
          {videoItems.map((item) => (
            <InlineVideoCard
              key={item.id}
              item={item}
              onOpenLightbox={(selected) => setSelectedMedia(selected)}
            />
          ))}
        </motion.div>

        {/* Optional Media Lightbox Viewer Modal for Fullscreen Expand */}
        <MediaLightboxModal
          item={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      </motion.div>
    </section>
  );
};

