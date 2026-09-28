import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { siteData, type SpeakerItem } from '@/data'

export function SpeakersSpotlight() {
  const { speakers } = siteData
  const [activeSpeakerModal, setActiveSpeakerModal] = useState<SpeakerItem | null>(null)

  // Close modal with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeSpeakerModal) {
        setActiveSpeakerModal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSpeakerModal])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeSpeakerModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeSpeakerModal])

  return (
    <section id="speakers" className="w-full bg-slate-50 text-slate-900 select-none scroll-mt-20 lg:scroll-mt-24">
      {/* Mosaic Grid Container matching the exact reference layout with 0 gap and no borders */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 bg-slate-50">
        
        {/* 1. Header Box (Full Width) - Light Mode */}
        <div className="col-span-2 md:col-span-4 lg:col-span-6 bg-white p-8 sm:p-12 lg:p-14 flex flex-col items-center justify-center text-center relative min-h-[220px] sm:min-h-[280px] overflow-hidden group">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-4 sm:w-6 h-[2px] bg-blue-600 rounded-full"></span>
              <span className="text-blue-600 font-bold text-[10px] sm:text-xs tracking-widest uppercase">Speakers</span>
              <span className="w-4 sm:w-6 h-[2px] bg-blue-600 rounded-full"></span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black tracking-tight text-slate-900 leading-tight">
              {speakers.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-4 leading-relaxed max-w-2xl mx-auto">
              {speakers.subtitle}
            </p>
          </div>

          {/* Bottom Accent */}
          <div className="flex items-center justify-center mt-8 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Khám phá</span>
              <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)] animate-pulse" />
            </div>
          </div>
        </div>

        {/* 2. All 15 Speakers Cards Grid - Seamless Touching Photos */}
        {speakers.list.map((speaker) => (
          <div
            key={speaker.id}
            onClick={() => setActiveSpeakerModal(speaker)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] bg-slate-200 overflow-hidden cursor-pointer"
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

      {/* Speaker Video Modal - Slides up from bottom */}
      {activeSpeakerModal && (
        <div 
          onClick={() => setActiveSpeakerModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl mx-4 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveSpeakerModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/60 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Video Container */}
            <div className="w-full aspect-video bg-white">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1" 
                title={`Video phát biểu của ${activeSpeakerModal.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Inline CSS for slide-up animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
