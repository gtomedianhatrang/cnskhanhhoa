import React, { useState } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { siteData } from '@/data'
import type { TimelineDay, TimelineSession } from '@/data/types'

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
  // Initially collapsed
  const [expandedDay, setExpandedDay] = useState<string | null>(null)

  const toggleDay = (dayId: string) => {
    setExpandedDay(prev => prev === dayId ? null : dayId)
  }

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

        <div className="flex w-full flex-col gap-6 lg:gap-8">
          {timeline.days.map((day: TimelineDay) => {
            const isExpanded = expandedDay === day.id;

            return (
              <div key={day.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button
                  onClick={() => toggleDay(day.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <h3 className="rounded-lg bg-blue-50 px-4 py-2.5 text-base font-black uppercase text-blue-700 sm:text-lg">
                      {day.sublabel || `${day.dayNumber} - ${day.dateFull || day.date}`}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600">
                      {protectAI(day.theme)}
                    </p>
                  </div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>

                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-100">
                      <ol className="ml-1.5 border-l border-slate-200 mt-2">
                        {day.sessions.map((session: TimelineSession, sessionIndex: number) => (
                          <li
                            key={`${day.id}-${session.time}-${sessionIndex}`}
                            className="relative grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-x-3 py-5 pl-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-x-5 sm:pl-7 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-x-7"
                          >
                            <span aria-hidden="true" className="absolute -left-1.5 top-7 h-3 w-3 rounded-full border-2 border-slate-50 bg-blue-500" />
                            <span className="whitespace-nowrap text-sm font-black tabular-nums leading-7 text-blue-600 sm:text-lg">
                              {session.time}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-base font-semibold leading-7 text-slate-900 lg:text-lg">
                                {protectAI(session.title)}
                              </h4>
                              <div className="mt-2 flex items-start gap-1.5 text-sm font-medium leading-6 text-slate-500">
                                <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose-500" />
                                <span>{session.location}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
