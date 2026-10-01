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
    <section id="speakers" className="w-full bg-slate-100 text-slate-900 select-none scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-6 sm:py-10">
      {/* Mosaic Grid Container */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-1 bg-slate-100">
        
        {/* 1. Header Box (Full Width) */}
        <div className="col-span-2 md:col-span-4 lg:col-span-4 py-16 flex flex-col justify-center text-center relative overflow-hidden group">
          {/* Watermark Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[120px] md:text-[160px] font-black text-slate-200/50 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
            {speakers.watermark}
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {speakers.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium mt-4 leading-relaxed max-w-2xl mx-auto">
              {speakers.subtitle}
            </p>
          </div>
        </div>

        {/* 2. Placeholder Speaker Cards */}
        {speakers.list.map((_, index) => (
          <div
            key={index}
            className="group relative aspect-[3/4] sm:aspect-[4/5] bg-slate-200 overflow-hidden"
          >
            {/* Placeholder background with subtle pattern */}
            <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 flex flex-col items-center justify-center gap-3 p-4">
              {/* Avatar placeholder icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-400/40 flex items-center justify-center border-2 border-dashed border-slate-400">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>

              {/* Slot number */}
              <div className="text-center">
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Diễn giả #{index + 1}</p>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-500 mt-1">Sắp công bố</p>
              </div>

              {/* Dashed border overlay */}
              <div className="absolute inset-3 border-2 border-dashed border-slate-300/70 rounded pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
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
