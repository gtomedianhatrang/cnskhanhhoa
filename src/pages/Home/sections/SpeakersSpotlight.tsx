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

      {/* Speaker Video Modal - Slides up from bottom */}
      {activeSpeakerModal && (
        <div 
          onClick={() => setActiveSpeakerModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl mx-4 bg-black rounded-2xl overflow-hidden"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveSpeakerModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Video Container */}
            <div className="w-full aspect-video bg-black">
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
