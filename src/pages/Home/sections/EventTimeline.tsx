import { useMemo } from 'react'
import {
  Clock,
  MapPin,
  CalendarDays,
} from 'lucide-react'
import { siteData } from '@/data'
import { useTimelineStore } from '@/store'
import type { TimelineSession } from '@/data/types'

interface FlatSession extends TimelineSession {
  dateLabel: string
  dateFull: string
  dayId: string
  dayNumber: string
  theme: string
}

export function EventTimeline() {
  const { timeline } = siteData
  const {
    selectedDateId,
    setSelectedDateId,
  } = useTimelineStore()

  // Ensure active day defaults to first day instead of 'all'
  const activeDayId = selectedDateId === 'all' ? timeline.days[0].id : selectedDateId
  const currentDayIndex = timeline.days.findIndex(d => d.id === activeDayId)
  const activeDay = timeline.days[currentDayIndex]

  const handleDayChange = (dayId: string) => {
    setSelectedDateId(dayId)
    const timelineEl = document.getElementById('timeline')
    if (timelineEl) {
      timelineEl.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const isConcurrent = (sess: TimelineSession) =>
    activeDay.sessions.filter(s => s.time === sess.time).length > 1

  return (
    <section id="timeline" className="w-full py-20 md:py-28 bg-slate-50/60 scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* 1. Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-snug">
            {timeline.title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mt-3 max-w-2xl mx-auto leading-relaxed">
            {timeline.subtitle}
          </p>
        </div>

        {/* 2. Day Tabs (Page Indicators) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full mb-12">
          {timeline.days.map((day, idx) => {
            const isActive = activeDayId === day.id
            return (
              <button
                key={day.id}
                onClick={() => handleDayChange(day.id)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                  {day.dayNumber}
                </span>
                <span className={`text-xs sm:text-sm font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {day.date}
                </span>
                <span className={`text-[11px] font-medium mt-1 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {day.theme}
                </span>
              </button>
            )
          })}
        </div>

        {/* 3. Session Cards Grid for the Selected Page (Day) */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-4">
            
            {/* Left Column: Date Info */}
            <div className="md:w-56 shrink-0 pt-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                {activeDay.dateFull}
              </span>
              <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block mt-1 leading-tight whitespace-nowrap">
                {activeDay.date}
              </span>
              <span className="text-xs font-bold text-blue-600 block mt-2">
                {activeDay.dayNumber}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1.5 leading-relaxed">
                {activeDay.theme}
              </span>
            </div>

            {/* Right: Session Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 flex-1 w-full">
              {activeDay.sessions.map((session, sIdx) => (
                <div
                  key={sIdx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 bg-slate-100 text-slate-600 border border-slate-200">
                      {session.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {session.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-4">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{session.time}</span>
                      {isConcurrent(session) && (
                        <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                          Song song
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{session.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Pagination Controls */}
        <div className="mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-0 border-t border-slate-200/80 pt-8">
          <button
            onClick={() => handleDayChange(timeline.days[currentDayIndex - 1].id)}
            disabled={currentDayIndex === 0}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              currentDayIndex === 0 
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm cursor-pointer'
            }`}
          >
            ← Ngày trước đó
          </button>
          
          <span className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest text-center">
            {activeDay.dayNumber} • {activeDay.date}
          </span>
          
          <button
            onClick={() => handleDayChange(timeline.days[currentDayIndex + 1].id)}
            disabled={currentDayIndex === timeline.days.length - 1}
            className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              currentDayIndex === timeline.days.length - 1 
                ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                : 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg cursor-pointer'
            }`}
          >
            Ngày tiếp theo →
          </button>
        </div>

      </div>
    </section>
  )
}
