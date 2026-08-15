import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, MessageCircle, MapPin, Calendar, Film, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';
import { useAqualuxData } from '../context/AqualuxDataContext';

interface MediaLightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({ item, onClose }) => {
  const { openWaModal } = useAqualuxData();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const isVideo = item.type === 'video';

  return typeof document !== 'undefined'
    ? createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
            {/* Backdrop click to close */}
            <div className="fixed inset-0" onClick={onClose} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col my-auto text-left"
            >
              {/* Modal Top Toolbar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                    {isVideo ? <Film className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block truncate">
                      {isVideo ? 'Dokumentasi Video Sesi' : 'Dokumentasi Foto Sesi'}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white font-outfit truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0 btn-tactile cursor-pointer"
                  aria-label="Tutup Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Media Player Container */}
              <div className="relative w-full bg-black flex items-center justify-center min-h-[250px] max-h-[60vh] overflow-hidden">
                {isVideo ? (
                  item.mediaUrl.includes('youtube.com') || item.mediaUrl.includes('youtu.be') ? (
                    <iframe
                      src={item.mediaUrl}
                      title={item.title}
                      className="w-full h-80 sm:h-96 border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={item.mediaUrl}
                      poster={item.thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      className="w-full max-h-[58vh] object-contain rounded-lg shadow-inner bg-black"
                    />
                  )
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full max-h-[55vh] object-contain"
                  />
                )}
              </div>

              {/* Modal Body & Description */}
              <div className="p-5 sm:p-6 space-y-4 bg-slate-900">
                <div className="flex flex-wrap items-center gap-2">
                  {item.locationBadge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{item.locationBadge}</span>
                    </span>
                  )}
                  {item.videoDuration && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-mono font-bold border border-slate-700">
                      <Play className="w-3.5 h-3.5 fill-amber-300" />
                      <span>Durasi: {item.videoDuration}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Dokumentasi Sesi Aqualux Malang</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openWaModal(`Halo Admin Aqualux, saya melihat dokumentasi "${item.title}". Saya berminat konsultasi info jadwal.`);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all btn-tactile cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Tanya Sesi Latihan via WA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )
    : null;
};
