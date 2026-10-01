import { Header } from '@/components/Header'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUIStore } from '@/store'

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false)

  const currentLang = useUIStore((state) => state.currentLang)
  const isEnglish = currentLang === 'EN'

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const scrollToStatement = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="home"
      className="
        relative
        w-full
        overflow-hidden
        bg-slate-950
        text-white
        select-none
        lg:h-screen
      "
    >
      {/* ================= BACKGROUND ================= */}
      <img
        src="/herobanner.png"
        alt={
          isEnglish
            ? 'Khanh Hoa Digital Technology Festival 2026'
            : 'Ngày Hội Công Nghệ Số Khánh Hòa 2026'
        }
        className="
          block
          w-full
          h-auto
          lg:absolute
          lg:inset-0
          lg:h-full
          lg:object-cover
          lg:object-center
        "
      />

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
        {/* ================= HERO CONTENT (Removed) ================= */}
        <div className="flex-1" />

        {/* ================= SCROLL INDICATOR ================= */}
        <div
          className="
            relative
            z-20
            hidden
            w-full
            justify-center
            pb-8
            md:flex
          "
        >
          <button
            type="button"
            onClick={scrollToStatement}
            aria-label={
              isEnglish
                ? 'Scroll to content'
                : 'Cuộn xuống nội dung'
            }
            className="
              pointer-events-auto
              group
              flex
              cursor-pointer
              flex-col
              items-center
              gap-1.5
              text-white/40
              transition-all
              duration-300
              hover:text-cyan-300
            "
          >
            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                group-hover:tracking-[0.3em]
              "
            >
              {isEnglish ? 'Explore' : 'Khám Phá'}
            </span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}