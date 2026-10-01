import { useState, useEffect, useRef } from 'react'
import { siteData } from '@/data'
import { Cpu } from 'lucide-react'
// --- STATIC COUNTER ---
function StatCounter({ valueStr }: { valueStr: string; inView?: boolean }) {
  return <span>{valueStr}</span>
}

export function HistoricalHighlights() {
  const { highlights } = siteData
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="highlights"
      className="w-full py-20 md:py-28 scroll-mt-20 lg:scroll-mt-24 transition-colors duration-700 relative overflow-hidden bg-slate-50 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">

        {/* HEADER */}
        <div className={`mb-20 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-[2.5rem] md:text-[4rem] font-black text-slate-900 tracking-tighter leading-none mb-6">
            {highlights.title} <span className="text-blue-600">{highlights.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
            {highlights.subtitle}
          </p>
        </div>

        {/* COMBINED STYLE: Minimalist Metrics (Top) + Glassmorphism Cards (Bottom) */}
        <div>
          {/* Top: Minimalist Metrics Grid (From Style 3) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
            {highlights.metrics.map((metric: any, idx: number) => (
              <div
                key={idx}
                className={`border-l-2 border-slate-200 pl-6 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className={`text-4xl md:text-5xl font-light tracking-tighter mb-2 ${metric.color || 'text-slate-900'}`}>
                  <StatCounter valueStr={metric.value} inView={inView} />
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200 mb-16"></div>

          {/* Bottom: Glassmorphism Cards (From Style 1) */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Col: Robot Card & Features */}
            <div className={`lg:w-1/2 flex flex-col gap-8 transition-all duration-1000 ease-out delay-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-10 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <Cpu className="w-12 h-12 mb-6 text-cyan-300" />
                <h3 className="text-3xl sm:text-4xl font-black uppercase mb-2 relative z-10">{highlights.cards.anniversaryTitle}</h3>
                <p className="text-blue-200 text-base sm:text-lg uppercase tracking-widest font-bold relative z-10">{highlights.cards.anniversaryDesc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-slate-900 mb-2 notranslate" translate="no">
                    <StatCounter valueStr={highlights.cards.buyersValue} inView={inView} />
                  </div>
                  <h4 className="text-sm font-bold text-blue-600 mb-1">{highlights.cards.buyersBadge}</h4>
                  <p className="text-xs text-slate-500">{highlights.cards.buyersLabel}</p>
                </div>
                <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col justify-center text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl font-black text-slate-900 mb-2">
                    <StatCounter valueStr={highlights.cards.globalReachValue} inView={inView} />
                  </div>
                  <h4 className="text-sm font-bold text-indigo-600 mb-1">{highlights.cards.globalReachBadge}</h4>
                  <p className="text-xs text-slate-500">{highlights.cards.globalReachLabel}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Progress Bars */}
            <div className={`lg:w-1/2 bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-slate-100 flex flex-col transition-all duration-1000 ease-out delay-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{highlights.demographics.badge}</h4>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-8 sm:mb-10">{highlights.demographics.title}</h3>

              <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8">
                {highlights.demographics.items.map((item: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-sm font-bold text-slate-700 mb-2 sm:mb-3 gap-1 sm:gap-0">
                      <span>{item.label}</span>
                      <span className="text-slate-900 font-black">{item.percent}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: inView ? item.percent : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
