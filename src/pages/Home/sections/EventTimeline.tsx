import React from 'react'
import { Clock, MapPin } from 'lucide-react'
import { siteData } from '@/data'
import type { TimelineSession } from '@/data/types'

// Prevent "AI" from being translated incorrectly
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

export function EventTimeline() {
  const { timeline } = siteData

  return (
    <section id="timeline" className="w-full scroll-mt-20 bg-slate-50/60 py-20 md:py-28 lg:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        
        {/* HEADER */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-6">
            <div className="h-px flex-1 bg-slate-200" />
            <h2 className="px-4 text-center text-3xl font-bold uppercase tracking-widest text-slate-900 md:text-4xl">
              {timeline.title}
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <p className="mx-auto max-w-2xl text-center font-medium text-slate-500">
            {timeline.subtitle}
          </p>
        </div>

        {/* ALL DAYS CONTENT */}
        <div className="w-full flex flex-col gap-12 lg:gap-16">
          {timeline.days.map((day: any) => (
            <div key={day.id} className="flex flex-col items-start gap-4 xl:flex-row xl:gap-8">
              
              {/* LEFT - DATE INFO */}
              <div className="mb-4 w-full shrink-0 border-b border-slate-200 pb-4 pt-1 xl:mb-0 xl:w-64 xl:border-b-0 xl:border-r xl:pr-6 xl:pb-0">
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {day.dateFull}
                </span>
                <span className="mt-1 block whitespace-nowrap font-display text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {day.date}
                </span>
                <span className="mt-2 block text-xs font-bold text-blue-600">
                  {day.dayNumber}
                </span>
                <span className="mt-1.5 block text-sm font-medium leading-relaxed text-slate-500">
                  {protectAI(day.theme)}
                </span>
              </div>

              {/* RIGHT - SESSION CARDS */}
              <div className="grid w-full flex-1 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {day.sessions.map((session: TimelineSession, sessionIndex: number) => (
                  <div
                    key={`${day.id}-${session.time}-${sessionIndex}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-400/80 hover:shadow-xl sm:p-6"
                  >
                    {/* Top accent */}
                    <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div>
                      {/* Tag */}
                      <span className="mb-3 inline-block rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-600">
                        {protectAI(session.tag)}
                      </span>

                      {/* Title */}
                      <h4 className="text-sm font-black leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
                        {protectAI(session.title)}
                      </h4>

                      {/* Time */}
                      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <Clock className="h-4 w-4 shrink-0 text-blue-500" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mt-5 flex items-start gap-1.5 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <span className="leading-relaxed">{session.location}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}