import React from 'react'
import {
  Clock,
  MapPin,
} from 'lucide-react'
import { siteData } from '@/data'
import { useTimelineStore } from '@/store'
import type { TimelineSession } from '@/data/types'

// Prevent "AI" from being translated incorrectly
const protectAI = (text: string) => {
  if (!text) return text

  const parts = text.split('AI')

  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="notranslate">AI</span>
      )}
    </React.Fragment>
  ))
}

export function EventTimeline() {
  const { timeline } = siteData

  const {
    selectedDateId,
    setSelectedDateId,
  } = useTimelineStore()

  // Nếu store đang là "all", mặc định hiển thị ngày đầu tiên
  const activeDayId =
    selectedDateId === 'all'
      ? timeline.days[0].id
      : selectedDateId

  const currentDayIndex = timeline.days.findIndex(
    (day) => day.id === activeDayId
  )

  // Fallback về ngày đầu nếu ID trong store không tồn tại
  const safeCurrentDayIndex =
    currentDayIndex >= 0 ? currentDayIndex : 0

  const activeDay =
    timeline.days[safeCurrentDayIndex]

  const handleDayChange = (
    dayId: string,
    shouldScroll = false
  ) => {
    setSelectedDateId(dayId)

    if (shouldScroll) {
      document.getElementById('timeline')?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }

  const isConcurrent = (session: TimelineSession) => {
    return (
      activeDay.sessions.filter(
        (item) => item.time === session.time
      ).length > 1
    )
  }

  const isFirstDay = safeCurrentDayIndex === 0

  const isLastDay =
    safeCurrentDayIndex === timeline.days.length - 1

  const handlePreviousDay = () => {
    if (isFirstDay) return

    const previousDay =
      timeline.days[safeCurrentDayIndex - 1]

    handleDayChange(previousDay.id, true)
  }

  const handleNextDay = () => {
    if (isLastDay) return

    const nextDay =
      timeline.days[safeCurrentDayIndex + 1]

    handleDayChange(nextDay.id, true)
  }

  return (
    <section
      id="timeline"
      className="
        w-full
        scroll-mt-20
        bg-slate-50/60
        py-20

        md:py-28

        lg:scroll-mt-24
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-6

          sm:px-10

          lg:px-12
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-6">
            <div className="h-px flex-1 bg-slate-200" />

            <h2
              className="
                px-4
                text-center
                text-3xl
                font-bold
                uppercase
                tracking-widest
                text-slate-900

                md:text-4xl
              "
            >
              {timeline.title}
            </h2>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p
            className="
              mx-auto
              max-w-2xl
              text-center
              font-medium
              text-slate-500
            "
          >
            {timeline.subtitle}
          </p>
        </div>

        {/* =================================================
            DAY TABS
        ================================================= */}
        <div
          className="
            mb-12
            grid
            w-full
            grid-cols-2
            gap-2.5

            sm:gap-4

            md:grid-cols-4
          "
        >
          {timeline.days.map((day) => {
            const isActive =
              activeDayId === day.id

            return (
              <button
                key={day.id}
                type="button"
                onClick={() =>
                  handleDayChange(day.id)
                }
                className={`
                  flex
                  cursor-pointer
                  flex-col
                  justify-between

                  rounded-2xl
                  border

                  p-3
                  text-left

                  transition-all
                  duration-300

                  sm:p-4

                  ${isActive
                    ? `
                        scale-[1.02]
                        border-blue-600
                        bg-gradient-to-r
                        from-blue-600
                        via-blue-500
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-blue-500/25
                      `
                    : `
                        border-slate-200/90
                        bg-white
                        text-slate-800
                        shadow-sm

                        hover:border-blue-300
                        hover:bg-slate-50
                      `
                  }
                `}
              >
                {/* Day number */}
                <span
                  className={`
                    mb-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest

                    ${isActive
                      ? 'text-blue-200'
                      : 'text-slate-400'
                    }
                  `}
                >
                  {day.dayNumber}
                </span>

                {/* Date */}
                <span
                  className={`
                    text-xs
                    font-black
                    uppercase
                    tracking-wider

                    sm:text-sm

                    ${isActive
                      ? 'text-white'
                      : 'text-slate-900'
                    }
                  `}
                >
                  {day.date}
                </span>

                {/* Theme */}
                <span
                  className={`
                    mt-1
                    text-[11px]
                    font-medium

                    ${isActive
                      ? 'text-blue-100'
                      : 'text-slate-500'
                    }
                  `}
                >
                  {protectAI(day.theme)}
                </span>
              </button>
            )
          })}
        </div>

        {/* =================================================
            ACTIVE DAY CONTENT
        ================================================= */}
        <div className="w-full">
          <div
            className="
              flex
              flex-col
              items-start
              gap-4
              py-4

              xl:flex-row
              xl:gap-8
            "
          >
            {/* =============================================
                LEFT - DATE INFO
            ============================================= */}
            <div
              className="
                mb-2
                w-full
                shrink-0

                border-b
                border-slate-200

                pb-4
                pt-1

                xl:mb-0
                xl:w-56
                xl:border-b-0
                xl:pb-0
              "
            >
              <span
                className="
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-slate-400
                "
              >
                {activeDay.dateFull}
              </span>

              <span
                className="
                  mt-1
                  block
                  whitespace-nowrap

                  font-display
                  text-2xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-slate-900

                  sm:text-3xl
                "
              >
                {activeDay.date}
              </span>

              <span
                className="
                  mt-2
                  block
                  text-xs
                  font-bold
                  text-blue-600
                "
              >
                {activeDay.dayNumber}
              </span>

              <span
                className="
                  mt-1.5
                  block
                  text-[11px]
                  font-medium
                  leading-relaxed
                  text-slate-500
                "
              >
                {protectAI(activeDay.theme)}
              </span>
            </div>

            {/* =============================================
                RIGHT - SESSION CARDS
            ============================================= */}
            <div
              className="
                grid
                w-full
                flex-1
                grid-cols-1
                gap-4

                sm:gap-5

                md:grid-cols-2

                lg:grid-cols-3
              "
            >
              {activeDay.sessions.map(
                (session, sessionIndex) => {
                  const concurrent =
                    isConcurrent(session)

                  return (
                    <div
                      key={`${activeDay.id}-${session.time}-${sessionIndex}`}
                      className="
                        group
                        relative

                        flex
                        flex-col
                        justify-between

                        overflow-hidden
                        rounded-2xl

                        border
                        border-slate-200/90

                        bg-white

                        p-5

                        shadow-sm

                        transition-all
                        duration-300

                        hover:border-blue-400/80
                        hover:shadow-xl

                        sm:p-6
                      "
                    >
                      {/* Top accent */}
                      <div
                        className="
                          absolute
                          left-0
                          right-0
                          top-0

                          h-1

                          bg-gradient-to-r
                          from-blue-600
                          via-cyan-400
                          to-blue-500

                          opacity-0

                          transition-opacity
                          duration-300

                          group-hover:opacity-100
                        "
                      />

                      <div>
                        {/* Tag */}
                        <span
                          className="
                            mb-3
                            inline-block

                            rounded-full

                            border
                            border-slate-200

                            bg-slate-100

                            px-2.5
                            py-1

                            text-[10px]
                            font-black
                            uppercase
                            tracking-widest
                            text-slate-600
                          "
                        >
                          {protectAI(session.tag)}
                        </span>

                        {/* Title */}
                        <h4
                          className="
                            text-sm
                            font-black
                            leading-snug
                            text-slate-900

                            transition-colors

                            group-hover:text-blue-600

                            sm:text-base
                          "
                        >
                          {protectAI(session.title)}
                        </h4>

                        {/* Time */}
                        <div
                          className="
                            mt-4
                            flex
                            items-center
                            gap-2

                            text-xs
                            font-semibold
                            text-slate-500
                          "
                        >
                          <Clock
                            className="
                              h-4
                              w-4
                              shrink-0
                              text-blue-500
                            "
                          />

                          <span>
                            {session.time}
                          </span>

                          {concurrent && (
                            <span
                              className="
                                ml-1
                                shrink-0

                                rounded-full

                                border
                                border-amber-200/80

                                bg-amber-50

                                px-2
                                py-0.5

                                text-[10px]
                                font-bold
                                text-amber-700
                              "
                            >
                              Song song
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div
                        className="
                          mt-5
                          flex
                          items-start
                          gap-1.5

                          border-t
                          border-slate-100

                          pt-4

                          text-xs
                          font-medium
                          text-slate-500
                        "
                      >
                        <MapPin
                          className="
                            mt-0.5
                            h-4
                            w-4
                            shrink-0
                            text-rose-500
                          "
                        />

                        <span className="leading-relaxed">
                          {session.location}
                        </span>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}
        <div
          className="
            mt-12
            grid
            grid-cols-2
            gap-3

            border-t
            border-slate-200/80

            pt-6

            sm:flex
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-0
            sm:pt-8
          "
        >
          {/* Current day */}
          <span
            className="
              col-span-2
              mb-3
              text-center

              text-[11px]
              font-black
              uppercase
              tracking-widest
              text-slate-500

              sm:order-2
              sm:mb-0
              sm:text-sm
            "
          >
            {activeDay.dayNumber}
            {' • '}
            {activeDay.date}
          </span>

          {/* Previous */}
          <button
            type="button"
            onClick={handlePreviousDay}
            disabled={isFirstDay}
            className={`
              flex
              items-center
              justify-center
              gap-1.5

              rounded-xl

              px-1
              py-2.5

              text-xs
              font-bold

              transition-all

              sm:order-1
              sm:gap-2
              sm:px-6
              sm:py-3
              sm:text-sm

              ${isFirstDay
                ? `
                    cursor-not-allowed
                    bg-slate-100
                    text-slate-400
                    opacity-50
                  `
                : `
                    cursor-pointer
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    shadow-sm

                    hover:bg-slate-50
                    hover:text-blue-600
                  `
              }
            `}
          >
            <span className="shrink-0">
              ←
            </span>

            <span className="truncate">
              Ngày trước đó
            </span>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={handleNextDay}
            disabled={isLastDay}
            className={`
              flex
              items-center
              justify-center
              gap-1.5

              rounded-xl

              px-1
              py-2.5

              text-xs
              font-bold

              transition-all

              sm:order-3
              sm:gap-2
              sm:px-6
              sm:py-3
              sm:text-sm

              ${isLastDay
                ? `
                    cursor-not-allowed
                    bg-slate-100
                    text-slate-400
                    opacity-50
                  `
                : `
                    cursor-pointer
                    bg-blue-600
                    text-white
                    shadow-md

                    hover:bg-blue-700
                    hover:shadow-lg
                  `
              }
            `}
          >
            <span className="truncate">
              Ngày tiếp theo
            </span>

            <span className="shrink-0">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}