import React from 'react';
import { PhoneIcon } from '@heroicons/react/24/solid';
import { MapPin } from 'lucide-react';
import { useAqualuxData } from '../context/AqualuxDataContext';

export const StickyMobileBar: React.FC = () => {
  const { openWaModal } = useAqualuxData();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 sm:p-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-2xl">
      <div className="grid grid-cols-12 gap-2 max-w-md mx-auto">
        
        {/* Button 1: Lihat Lokasi */}
        <a
          href="#lokasi"
          className="col-span-4 inline-flex items-center justify-center gap-1.5 py-3 px-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs active:scale-95 transition-all text-center border border-slate-700 min-h-[44px]"
        >
          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Lokasi</span>
        </a>

        {/* Button 2: WhatsApp Direct */}
        <button
          type="button"
          onClick={() => openWaModal()}
          className="col-span-8 inline-flex items-center justify-center gap-2 py-3 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg active:scale-95 transition-all min-h-[44px]"
        >
          <PhoneIcon className="w-4 h-4 text-white shrink-0" />
          <span>Hubungi Admin WA</span>
        </button>

      </div>
    </div>
  );
};
