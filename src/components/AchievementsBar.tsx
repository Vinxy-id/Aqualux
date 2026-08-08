import React from 'react';
import { TrophyIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { COACH_ACHIEVEMENTS } from '../data/aqualuxData';

export const AchievementsBar: React.FC = () => {
  // Duplicate array 3 times for seamless infinite looping
  const repeatedAchievements = [...COACH_ACHIEVEMENTS, ...COACH_ACHIEVEMENTS, ...COACH_ACHIEVEMENTS];

  return (
    <div className="bg-white border-y border-slate-300 py-5 text-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs">
              <TrophyIcon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-950 font-outfit">Prestasi Resmi Pelatih Aqualux</h2>
              <p className="text-xs font-semibold text-slate-700">Medali Kejuaraan Renang Finswimming Jawa Timur</p>
            </div>
          </div>

          <div className="text-xs text-blue-900 font-extrabold bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-300 flex items-center gap-2 shrink-0">
            <CheckBadgeIcon className="w-4 h-4 text-blue-700" />
            <span>Standar Pelatihan Kejuaraan Daerah & Nasional</span>
          </div>
        </div>

      </div>

      {/* Infinite Scrolling Ticker (Motion Marquee) */}
      <div className="relative w-full overflow-hidden py-1">
        {/* Left & Right Smooth Gradient Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="animate-marquee-smooth flex items-center gap-4 px-4">
          {repeatedAchievements.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 hover:bg-blue-50 p-3.5 rounded-2xl border border-slate-300 flex items-center gap-3 shadow-xs min-w-[240px] shrink-0 transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <TrophyIcon className="w-4.5 h-4.5 text-amber-600" />
              </div>
              
              <div className="overflow-hidden text-left">
                <span className="text-[10px] font-extrabold text-blue-800 block leading-tight">{item.year}</span>
                <h3 className="text-xs font-black text-slate-950 truncate">{item.title}</h3>
                <p className="text-[11px] font-semibold text-slate-700 truncate">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
