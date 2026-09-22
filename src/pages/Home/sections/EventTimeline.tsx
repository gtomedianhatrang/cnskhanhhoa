import { useMemo } from 'react'
import { 
  Clock, 
  MapPin, 
  User, 
  Layers, 
  ChevronLeft 
} from 'lucide-react'
import { siteData } from '@/data'
import { useTimelineStore } from '@/store'
import type { TimelineSession } from '@/data/types'

interface GroupedBlock {
  dateKey: string
  dateLabel: string
  period: 'AM' | 'PM' | 'NIGHT'
  sessions: (TimelineSession & { dateLabel: string; dayId: string })[]
}

export function EventTimeline() {
  const { timeline } = siteData
  const {
    selectedDateId,
    currentPage,
    setSelectedDateId,
    setCurrentPage
  } = useTimelineStore()

  // Flatten all sessions with their date info
  const allFlattenedSessions = useMemo(() => {
    const list: (TimelineSession & { dateLabel: string; dayId: string })[] = []
    timeline.days.forEach(day => {
      day.sessions.forEach(sess => {
        list.push({
          ...sess,
          dateLabel: day.date,
          dayId: day.id
        })
      })
    })
    return list
  }, [timeline.days])

  // Filter sessions based on Date
  const filteredSessions = useMemo(() => {
    return allFlattenedSessions.filter(sess => {
      if (selectedDateId !== 'all' && sess.dayId !== selectedDateId) {
        return false
      }
      return true
    })
  }, [allFlattenedSessions, selectedDateId])

  // Group filtered sessions by Date and Period (AM, PM, NIGHT)
  const groupedBlocks = useMemo(() => {
    const map = new Map<string, GroupedBlock>()

    filteredSessions.forEach(sess => {
      const period = sess.period || 'AM'
      const key = `${sess.dateLabel}_${period}`

      if (!map.has(key)) {
        map.set(key, {
          dateKey: sess.dayId,
          dateLabel: sess.dateLabel,
          period,
          sessions: []
        })
      }
      map.get(key)!.sessions.push(sess)
    })

    return Array.from(map.values())
  }, [filteredSessions])

  // Pagination (6 blocks per page)
  const itemsPerPage = 6
  const totalPages = Math.max(1, Math.ceil(groupedBlocks.length / itemsPerPage))
  const paginatedBlocks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return groupedBlocks.slice(start, start + itemsPerPage)
  }, [groupedBlocks, currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    const timelineElement = document.getElementById('timeline')
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="timeline" className="w-full py-20 md:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* 1. Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight">
          {timeline.title}
          {timeline.titleHighlight ? (
            <span className="text-blue-600"> {timeline.titleHighlight}</span>
          ) : null}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mt-3 max-w-2xl mx-auto leading-relaxed">
          {timeline.subtitle}
        </p>
      </div>

      {/* 2. Date Tabs Bar (All dates, May 26, May 27, May 28, May 29) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full mb-8">
        {/* Button All Dates */}
        <button
          onClick={() => setSelectedDateId('all')}
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
            Toàn bộ 4 ngày
          </span>
        </button>

        {/* Buttons for each specific day */}
        {timeline.days.map((day) => {
          const isActive = selectedDateId === day.id
          return (
            <button
              key={day.id}
              onClick={() => setSelectedDateId(day.id)}
              className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white text-slate-800 border-slate-200/90 hover:border-blue-300 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {day.date}
                </span>
              </div>
              <span className={`text-[11px] font-medium mt-1 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                {day.dayNumber}
              </span>
            </button>
          )
        })}
      </div>

      {/* 3. Program Blocks Banner (AM · PM · NIGHT) */}
      <div className="w-full mb-8 space-y-3">
        <div className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white shadow-md shadow-blue-700/20 text-center font-display text-sm sm:text-base font-extrabold uppercase tracking-widest flex items-center justify-center gap-3">
          <Clock className="w-4 h-4 text-cyan-300" />
          <span>KHUNG GIỜ CHƯƠNG TRÌNH · SÁNG (AM) · CHIỀU (PM) · TỐI (NIGHT)</span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <span>Hiển thị {filteredSessions.length} chương trình hoạt động</span>
          <span className="hidden sm:inline">Phân loại theo ngày & khung thời gian thực tế</span>
        </div>
      </div>

      {/* 4. Grouped Schedule Content (Date + Period on Left, Card Grid on Right) */}
      <div className="w-full space-y-10">
        {paginatedBlocks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">Không tìm thấy chương trình phù hợp</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Vui lòng thử chọn ngày khác hoặc xóa bộ lọc tìm kiếm.
            </p>
            <button
              onClick={() => setSelectedDateId('all')}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 cursor-pointer transition-all shadow-xs"
            >
              Xem tất cả chương trình
            </button>
          </div>
        ) : (
          paginatedBlocks.map((block, bIdx) => (
            <div 
              key={bIdx}
              className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-8 border-b border-slate-200/80 last:border-b-0"
            >
              {/* Left Column: Date & Time Period Badge (AM / PM / NIGHT) */}
              <div className="md:w-28 shrink-0 text-left pt-1">
                <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider block">
                  {block.dateLabel}
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block mt-0.5">
                  {block.period}
                </span>
              </div>

              {/* Right Grid: 2 or 3 responsive session cards in Light Theme */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 w-full">
                {block.sessions.map((session, sIdx) => {
                  const isConcurrent = block.sessions.filter(s => s.time === session.time).length > 1

                  return (
                    <div
                      key={sIdx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 p-5 flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div>
                        {/* 1. Hoạt động / Làm gì */}
                        <h4 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {session.title}
                        </h4>

                        {/* 2. Khung giờ / Mấy giờ + Tag song song nếu trùng mốc giờ */}
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-600 font-semibold mt-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{session.time}</span>
                          </div>
                          {isConcurrent && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                              Phiên song song
                            </span>
                          )}
                        </div>

                        {/* 3. Do ai / Người trình bày */}
                        {session.speaker && (
                          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium mt-2">
                            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{session.speaker}</span>
                          </div>
                        )}
                      </div>

                      {/* 4. Địa điểm tại đâu */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="line-clamp-1">{session.location}</span>
                      </div>

                      {/* Subtle hover accent top edge line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Pagination Controls (Previous, 1, 2, Next) */}
      {totalPages > 1 && (
        <div className="w-full flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200">
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
            <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      )}

      </div>
    </section>
  )
}
