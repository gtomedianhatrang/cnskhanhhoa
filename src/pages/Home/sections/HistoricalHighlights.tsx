import { useState, useEffect, useRef } from 'react'
import { siteData } from '@/data'

// Animated Number Counter Hook using requestAnimationFrame with cubic ease-out
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
      
      // Cubic ease-out: 1 - (1 - progress)^3
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

function StatCounter({ 
  valueStr, 
  inView 
}: { 
  valueStr: string
  inView: boolean 
}) {
  // Parse numbers and suffixes (e.g., "160K+", "3800+", "30%")
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

export function HistoricalHighlights() {
  const { highlights } = siteData
  
  // Intersection Observer to trigger entrance and counting animations
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="highlights" 
      className="w-full py-20 md:py-28 bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/90 border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header with Fade-Up */}
      <div 
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900">
          {highlights.title}
        </h2>
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-slate-500 mt-2">
          {highlights.subtitle}
        </p>
      </div>

      {/* 4 Big Numbers Metrics Grid with Staggered Entrance & Counting Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14">
        {highlights.metrics.map((metric, idx) => (
          <div 
            key={idx} 
            style={{ transitionDelay: `${idx * 150}ms` }}
            className={`text-center py-4 transition-all duration-700 ease-out ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight ${metric.color}`}>
              <StatCounter valueStr={metric.value} inView={inView} />
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 mt-3">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bento Grid Visual Cards with Staggered Slide-Up Entrance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:h-[530px]">
        
        {/* Column 1: Key Demographic (Full Height Tall Card - Royal Blue) */}
        <div 
          style={{ transitionDelay: '300ms' }}
          className={`rounded-[32px] bg-blue-600 text-white p-6 sm:p-7 shadow-xl flex flex-col justify-between min-h-[480px] lg:min-h-0 lg:h-full transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div>
            {/* Top Embedded Photo of Attendees */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shadow-inner mb-5">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600" 
                alt="Conference Attendees"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
              Cơ Cấu Đối Tượng
            </h3>
            <p className="text-[11px] font-bold text-blue-100 uppercase tracking-wider mt-1">
              Thành Phần Tham Dự
            </p>
          </div>

          {/* Demographic Progress Bars with Animated Fill */}
          <div className="space-y-4 pt-4 border-t border-white/15">
            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                <span>Doanh nghiệp & Chuyên gia</span>
                <span className="font-extrabold text-cyan-300">65%</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-cyan-300 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: inView ? '65%' : '0%' }} 
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                <span>Lãnh đạo & Cấp Quản lý</span>
                <span className="font-extrabold text-cyan-300">35%</span>
              </div>
              <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-cyan-300 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: inView ? '35%' : '0%' }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: 5 YEARS Milestone Photo (Full Height Tall Photo Card) */}
        <div 
          style={{ transitionDelay: '450ms' }}
          className={`relative rounded-[32px] overflow-hidden shadow-xl group bg-slate-950 min-h-[480px] lg:min-h-0 lg:h-full flex flex-col justify-end p-7 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <img 
            src="/speaker-stage.jpg" 
            alt="5 Years Milestone" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
          />
          {/* Subtle Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center pb-3">
            <div className="text-3xl sm:text-4xl font-black text-white tracking-wider leading-none drop-shadow-md">
              5 NĂM
            </div>
            <p className="text-xs font-bold text-slate-200 mt-2 uppercase tracking-widest drop-shadow-sm">
              Định hình công nghệ số Châu Á
            </p>
          </div>
        </div>

        {/* Column 3: Stacked 2 Cards (Top: Photo, Bottom: 30% White Card) */}
        <div 
          style={{ transitionDelay: '600ms' }}
          className={`flex flex-col gap-5 min-h-[480px] lg:min-h-0 lg:h-full transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Top Card: Live Sports / Interactive Demo Photo */}
          <div className="rounded-[28px] overflow-hidden shadow-xl relative group flex-1 min-h-[220px] lg:min-h-0 bg-slate-900">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600" 
              alt="Interactive Expo Demonstration"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Card: 30% International Exhibitors White Card with Counting Animation */}
          <div className="rounded-[28px] bg-white border border-slate-200/90 p-7 shadow-xl flex-1 min-h-[220px] lg:min-h-0 flex flex-col justify-center">
            <div className="text-5xl lg:text-6xl font-black text-blue-600 tracking-tight">
              <StatCounter valueStr="30%" inView={inView} />
            </div>
            <h4 className="text-lg lg:text-xl font-black text-slate-900 leading-tight mt-3">
              Đơn Vị Quốc Tế
            </h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
              Doanh Nghiệp & Đoàn Đại Biểu Toàn Cầu
            </p>
          </div>
        </div>

        {/* Column 4: Stacked 2 Cards (Top: 80% Gauge Card in Brand Blue, Bottom: Robot Photo) */}
        <div 
          style={{ transitionDelay: '750ms' }}
          className={`flex flex-col gap-5 min-h-[480px] lg:min-h-0 lg:h-full transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Top Card: 80% Professional Buyers Gauge Card - Royal Blue */}
          <div className="rounded-[28px] bg-blue-600 text-white p-7 shadow-xl flex-1 min-h-[220px] lg:min-h-0 flex flex-col justify-between">
            {/* Animated Circular Gauge */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-300 transition-all duration-1000 ease-out"
                  strokeDasharray={inView ? "80, 100" : "0, 100"}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black text-white">
                <StatCounter valueStr="80%" inView={inView} />
              </span>
            </div>

            {/* Text Label */}
            <div>
              <h4 className="text-xl font-black text-white leading-tight">
                Chuyên Nghiệp
              </h4>
              <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mt-0.5">
                Người Mua & Đối Tác Doanh Nghiệp
              </p>
            </div>
          </div>

          {/* Bottom Card: Robotics & Machinery Exhibition Photo */}
          <div className="rounded-[28px] overflow-hidden shadow-xl relative group flex-1 min-h-[220px] lg:min-h-0 bg-slate-900">
            <img 
              src="/hero-light-bg.jpg" 
              alt="Robotics Showcase"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
