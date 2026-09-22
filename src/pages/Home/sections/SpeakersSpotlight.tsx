import { useState } from 'react'
import { X, Calendar, MapPin, Share2 } from 'lucide-react'
import { siteData, type SpeakerItem } from '@/data'

export function SpeakersSpotlight() {
  const { speakers } = siteData
  const [activeSpeakerModal, setActiveSpeakerModal] = useState<SpeakerItem | null>(null)

  return (
    <section id="speakers" className="w-full bg-[#121212] text-white select-none">
      {/* Mosaic Grid Container matching the exact reference layout with 0 gap and no borders */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 bg-[#121212]">
        
        {/* 1. Header Box (Spans 3 Columns on Desktop, 2 on Tablet, 2 on Mobile) */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3 bg-[#18181b] p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative min-h-[220px] sm:min-h-[280px]">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black tracking-wider uppercase text-white leading-tight">
              {speakers.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium mt-3">
              {speakers.subtitle}
            </p>
          </div>

          {/* Bottom Accent Decorator Dot */}
          <div className="flex items-center justify-end mt-6">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)] animate-pulse" />
          </div>
        </div>

        {/* 2. All 15 Speakers Cards Grid - Seamless Touching Photos */}
        {speakers.list.map((speaker) => (
          <div
            key={speaker.id}
            onClick={() => setActiveSpeakerModal(speaker)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] bg-slate-900 overflow-hidden cursor-pointer"
          >
            {/* Speaker Stage Photo with smooth zoom and NO border */}
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Bottom Dark Vignette Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Speaker Name & Role Overlay Pinned at Bottom */}
            <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end pointer-events-none">
              <h3 className="font-sans text-xs sm:text-sm md:text-base font-black text-white tracking-wide leading-tight drop-shadow-md">
                {speaker.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300 font-normal leading-snug mt-1 line-clamp-2 drop-shadow-sm">
                {speaker.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Speaker Detail Modal Dialog */}
      {activeSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden text-white">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveSpeakerModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
              {/* Photo Column */}
              <div className="sm:col-span-5 relative aspect-square sm:aspect-auto sm:h-full bg-black">
                <img
                  src={activeSpeakerModal.image}
                  alt={activeSpeakerModal.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>

              {/* Details Column */}
              <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                    {activeSpeakerModal.category}
                  </span>

                  <h3 className="text-2xl font-extrabold text-white">
                    {activeSpeakerModal.name}
                  </h3>
                  <p className="text-sm font-semibold text-blue-400 mt-1">
                    {activeSpeakerModal.role}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeSpeakerModal.company}
                  </p>

                  <div className="mt-5 p-4 rounded-2xl bg-zinc-800/80 border border-zinc-700">
                    <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest block mb-1">
                      CHỦ ĐỀ CHIA SẺ & PHÁT BIỂU
                    </span>
                    <p className="text-sm font-medium text-slate-100 italic leading-relaxed">
                      "{activeSpeakerModal.topic}"
                    </p>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      <span>Thời gian: <strong className="text-white">{activeSpeakerModal.time}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                      <span>Địa điểm: <strong className="text-white">{activeSpeakerModal.hall}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <button
                    onClick={() => alert(`Đã lưu phiên của ${activeSpeakerModal.name} vào lịch của bạn!`)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Lưu Vào Lịch Cá Nhân
                  </button>
                  <button
                    onClick={() => alert('Đã sao chép liên kết hồ sơ!')}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
