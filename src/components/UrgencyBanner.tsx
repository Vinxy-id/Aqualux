import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/solid';
import { MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

export const UrgencyBanner: React.FC = () => {
  const waUrl = buildGeneralWhatsAppUrl("Halo Admin Aqualux, saya mau konsultasi jadwal bimbingan renang.");

  return (
    <section className="py-10 bg-white border-y border-slate-300 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-blue-600 p-6 sm:p-8 rounded-3xl shadow-xl">
          
          {/* Left Content */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900 border border-blue-950 text-white text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              <span>Pendaftaran Kelas Bimbingan</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black text-white font-outfit">
              Konsultasikan Jadwal Sesi Renang Anda Minggu Ini
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
              Kelas privat & reguler tersedia di Hotel Ubud, Tychi, dan Savana Malang dengan jadwal sesi yang fleksibel.
            </p>
          </div>

          {/* Right Action */}
          <div className="shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-md transition-all btn-hover-effect"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Tanya Jadwal via WA</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
