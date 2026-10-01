import React from 'react'
import { siteData } from '@/data'

// Prevent "AI" from being translated to "WHO" in Vietnamese
const protectAI = (text: string) => {
  if (!text) return text
  const parts = text.split('AI')
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="notranslate">AI</span>}
    </React.Fragment>
  ))
}

const svgIcons = [
  (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  )
]

export function IntroSection() {
  const { statement } = siteData

  return (
    <section id="about" className={`relative py-20 md:py-28 overflow-hidden bg-white text-slate-900 border-b border-slate-100 scroll-mt-20 lg:scroll-mt-24`}>
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-8">
        
        {/* ======================================================== */}
        {/* Intro Section Content */}
        {/* ======================================================== */}
        <div>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold leading-tight tracking-tight mb-8 text-transparent bg-clip-text bg-linear-to-r from-blue-700 via-blue-500 to-cyan-500">
              {statement.eventName}
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
              {statement.textBefore} <span className="font-black text-blue-600 drop-shadow-sm">{statement.sessionsHighlight}</span> {statement.textMiddle} <span className="font-bold text-slate-900">{statement.textAfter}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative">
            {/* Glowing orb in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            {statement.pillars.map((p: any, index: number) => (
              <div key={p.number} className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-row gap-4 sm:gap-6 items-center overflow-hidden">
                {/* Big background number */}
                <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-slate-50 group-hover:text-blue-50 transition-colors duration-500 select-none z-0">
                  {p.number}
                </div>
                
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl sm:rounded-[1.25rem] flex items-center justify-center text-white shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                  {React.cloneElement(svgIcons[index], { className: 'w-8 h-8 sm:w-10 sm:h-10' })}
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                    {protectAI(p.title)}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {protectAI(p.desc.split('—')[1] || p.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Trailer Window */}
        <div className="mt-20 w-full relative z-10">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900">
            <div className="relative aspect-video">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/yVdRwxtYSww?autoplay=1&mute=1&rel=0" 
                title="Trailer Ngày Hội Công Nghệ Số"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
        </div>

      </div>
    </section>
  )
}
