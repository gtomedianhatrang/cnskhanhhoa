import React, { useState, useEffect, useRef } from 'react'
import { siteData } from '@/data'

// --- COUNTER HOOK ---
function useCountUp(target: number, inView: boolean, duration: number = 1600) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * target))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, target, duration])

  return count
}

function StatCounter({ valueStr, inView }: { valueStr: string; inView: boolean }) {
  const match = valueStr.match(/^(\d+)(.*)$/)
  const targetNum = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const count = useCountUp(targetNum, inView)

  return (
    <span>
      {inView ? count.toLocaleString() : 0}
      {suffix}
    </span>
  )
}

// --- MAIN WRAPPER COMPONENT (Using Variant 2 Layout) ---
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
      className="w-full py-20 md:py-28 scroll-mt-20 lg:scroll-mt-24 transition-colors duration-700 relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/90 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4 leading-tight">
              {highlights.title}
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">
              Những con số biết nói minh chứng cho sự bứt phá của hệ sinh thái công nghệ số Khánh Hòa
            </p>
          </div>
          <div className="mt-6 md:mt-0 px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-bold uppercase tracking-widest text-sm border border-blue-100">
            Khám Phá Hành Trình
          </div>
        </div>

        {/* Modern Horizontal Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/50 rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
          {highlights.metrics.map((metric: any, idx: number) => (
            <div key={idx} className="bg-white p-8 md:p-10 text-center hover:bg-slate-50 transition-colors">
              <div className={`text-4xl md:text-5xl font-black tracking-tight mb-2 ${metric.color}`}>
                <StatCounter valueStr={metric.value} inView={inView} />
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* 2 Big Staggered Cards */}
        <div className={`flex flex-col lg:flex-row gap-6 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="w-full lg:w-1/2 rounded-[2rem] bg-blue-600 text-white p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-center">
             <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
             <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 relative z-10 leading-tight">{highlights.cards.anniversaryTitle}</h3>
             <p className="text-blue-200 text-lg uppercase tracking-widest font-bold mb-10 relative z-10">{highlights.cards.anniversaryDesc}</p>
             <div className="space-y-6 relative z-10">
              {highlights.demographics.items.map((item: any, idx: number) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-bold text-white mb-2">
                    <span>{item.label}</span>
                    <span>{item.percent}</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-900/40 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: inView ? item.percent : '0%' }} />
                  </div>
                </div>
              ))}
             </div>
          </div>

          <div className="w-full lg:w-1/2 rounded-[2rem] bg-slate-100 p-10 md:p-14 flex flex-col justify-center gap-10">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-black text-blue-600 shadow-xl border-4 border-slate-50 flex-shrink-0">
                 <StatCounter valueStr={highlights.cards.buyersValue} inView={inView} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-2 uppercase">{highlights.cards.buyersBadge}</h4>
                <p className="text-slate-500 font-medium">{highlights.cards.buyersLabel}</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-200"></div>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-full bg-slate-900 flex items-center justify-center text-4xl font-black text-white shadow-xl border-4 border-slate-50 flex-shrink-0">
                 <StatCounter valueStr={highlights.cards.globalReachValue} inView={inView} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 mb-2 uppercase">{highlights.cards.globalReachBadge}</h4>
                <p className="text-slate-500 font-medium">{highlights.cards.globalReachLabel}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
