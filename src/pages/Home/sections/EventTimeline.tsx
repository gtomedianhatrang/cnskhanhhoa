import { useMemo } from 'react'
import {
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
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

const SESSIONS_PER_PAGE = 9  // 3 rows × 3 cols

export function EventTimeline() {
  const { timeline } = siteData
  const {
    selectedDateId,
    currentPage,
    setSelectedDateId,
    setCurrentPage,
  } = useTimelineStore()

  // Flatten all sessions with their date info
  const allSessions = useMemo<FlatSession[]>(() => {
    const list: FlatSession[] = []
    timeline.days.forEach(day => {
      day.sessions.forEach(sess => {
        list.push({
          ...sess,
          dateLabel: day.date,
          dateFull: day.dateFull,
          dayId: day.id,
          dayNumber: day.dayNumber,
          theme: day.theme,
        })
      })
    })
    return list
  }, [timeline.days])

  // Filter by selected day
  const filteredSessions = useMemo(() => {
    if (selectedDateId === 'all') return allSessions
    return allSessions.filter(s => s.dayId === selectedDateId)
  }, [allSessions, selectedDateId])

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filteredSessions.length / SESSIONS_PER_PAGE))
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * SESSIONS_PER_PAGE
    return filteredSessions.slice(start, start + SESSIONS_PER_PAGE)
  }, [filteredSessions, currentPage])

  // Group paginated sessions by day (to render date labels)
  const groupedByDay = useMemo(() => {
    const map = new Map<string, { day: typeof timeline.days[0]; sessions: FlatSession[] }>()
    paginatedSessions.forEach(sess => {
      if (!map.has(sess.dayId)) {
        const day = timeline.days.find(d => d.id === sess.dayId)!
        map.set(sess.dayId, { day, sessions: [] })
      }
      map.get(sess.dayId)!.sessions.push(sess)
    })
    return Array.from(map.values())
  }, [paginatedSessions, timeline.days])

  const handleDayChange = (dayId: string) => {
    setSelectedDateId(dayId)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const el = document.getElementById('timeline')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isConcurrent = (sess: FlatSession) =>
    filteredSessions.filter(s => s.dayId === sess.dayId && s.time === sess.time).length > 1

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

        {/* 2. Day Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full mb-8">
          <button
            onClick={() => handleDayChange('all')}
            className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
              selectedDateId === 'all'
                ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'bg-white text-slate-800 border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <span className={`text-xs font-black uppercase tracking-wider ${selectedDateId === 'all' ? 'text-white' : 'text-blue-600'}`}>
              TẤT CẢ CÁC NGÀY
            </span>
            <span className={`text-[11px] font-medium mt-1 ${selectedDateId === 'all' ? 'text-blue-100' : 'text-slate-400'}`}>
              Toàn bộ {timeline.days.length} ngày
            </span>
          </button>

          {timeline.days.map((day) => {
            const isActive = selectedDateId === day.id
            return (
              <button
                key={day.id}
                onClick={() => handleDayChange(day.id)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                <span className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {day.date}
                </span>
                <span className={`text-[11px] font-medium mt-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {day.dayNumber}
                </span>
              </button>
            )
          })}
        </div>

        {/* 3. Info bar */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs text-slate-500 font-semibold">
            Hiển thị {Math.min((currentPage - 1) * SESSIONS_PER_PAGE + 1, filteredSessions.length)}–{Math.min(currentPage * SESSIONS_PER_PAGE, filteredSessions.length)} / {filteredSessions.length} hoạt động
          </span>
          {totalPages > 1 && (
            <span className="text-xs text-slate-400 font-medium">
              Trang {currentPage}/{totalPages}
            </span>
          )}
        </div>

        {/* 4. Grouped by Day — Old Style: Date on Left, Cards on Right */}
        <div className="w-full space-y-10">
          {groupedByDay.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs">
              <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-800">Không tìm thấy chương trình phù hợp</h4>
              <button
                onClick={() => handleDayChange('all')}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 cursor-pointer transition-all shadow-xs"
              >
                Xem tất cả chương trình
              </button>
            </div>
          ) : (
            groupedByDay.map(({ day, sessions }) => (
              <div
                key={day.id}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-8 border-b border-slate-200/80 last:border-b-0"
              >
                {/* Left Column: Date Info */}
                <div className="md:w-32 shrink-0 pt-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                    {day.dateFull}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight block mt-0.5 leading-tight">
                    {day.date}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-600 block mt-1">
                    {day.dayNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1 leading-snug">
                    {day.theme}
                  </span>
                </div>

                {/* Right: Session Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                  {sessions.map((session, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 p-5 flex flex-col justify-between group relative overflow-hidden"
                    >
                      {/* Hover top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Tag */}
                        <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 bg-slate-100 text-slate-600 border border-slate-200">
                          {session.tag}
                        </span>

                        {/* Title */}
                        <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {session.title}
                        </h4>

                        {/* Time */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-3">
                          <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{session.time}</span>
                          {isConcurrent(session) && (
                            <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                              Song song
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 5. Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-200">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Trước</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
            >
              <span>Sau</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
