import { Header } from '@/components/Header'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToStatement = () => {
    const nextSection = document.getElementById('statement')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTimeline = () => {
    const timelineSec = document.getElementById('timeline')
    if (timelineSec) {
      timelineSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col text-white overflow-hidden select-none"
    >
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0">
        <img
          src="/herobanner.png"
          alt="Ngày Hội Công Nghệ Số Khánh Hòa"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle gradient overlay - ensures image is bright and clearly visible while maintaining contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/15 via-transparent to-slate-950/15" />
      </div>

      {/* === Animated Decorative Orbs === */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top-right cyan orb */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)',
            animation: 'heroOrbFloat 12s ease-in-out infinite',
          }}
        />
        {/* Bottom-left blue orb */}
        <div
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)',
            animation: 'heroOrbFloat 15s ease-in-out infinite reverse',
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(56,189,248,0.4) 0%, transparent 60%)',
            animation: 'heroOrbPulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* === Header === */}
      <Header />

      {/* === Main Hero Content === */}
      <div className="relative z-20 flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">

          {/* 1. CÔNG NGHỆ SỐ - Xuất hiện hiện dần mượt mà tại chỗ */}
          <div
            className={`transition-opacity duration-1000 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1 className="font-vietnam text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold uppercase text-white tracking-normal leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
              CÔNG NGHỆ SỐ
            </h1>
          </div>

          {/* 2. TỈNH KHÁNH HÒA - Phía dưới, xuất hiện hiện dần */}
          <div
            className={`transition-opacity duration-1000 delay-300 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="font-vietnam text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white mt-2 sm:mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              TỈNH KHÁNH HÒA
            </p>
          </div>

          {/* 3. Dòng Thời gian & Địa điểm - Xuất hiện từng chữ từ dưới lên uốn lượn như ngọn sóng */}
          <div className="mt-10 sm:mt-14 text-xs sm:text-sm md:text-base font-semibold uppercase text-slate-100 tracking-wider sm:tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex flex-wrap items-center justify-center">
            {(() => {
              const fullText = '20 – 21 THÁNG 12, 2025 • CUNG VĂN HÓA THIẾU NHI, TP. NHA TRANG'
              const words = fullText.split(' ')
              let cumulativeIndex = 0

              return words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.35em]">
                  {word.split('').map((char, cIdx) => {
                    const charDelay = 650 + cumulativeIndex * 22
                    cumulativeIndex++

                    return (
                      <span
                        key={cIdx}
                        className={`inline-block ${char === '•' ? 'text-cyan-400 font-bold' : ''}`}
                        style={{
                          opacity: 0,
                          animation: isVisible
                            ? `heroWaveRise 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) ${charDelay}ms both`
                            : 'none',
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              ))
            })()}
          </div>

        </div>
      </div>

      {/* === Bottom Scroll Indicator === */}
      <div className="relative z-20 w-full pb-8 flex justify-center">
        <button
          onClick={scrollToStatement}
          className="group flex flex-col items-center gap-1.5 text-white/40 hover:text-cyan-300 transition-all duration-300 cursor-pointer"
          aria-label="Cuộn xuống nội dung"
        >
          <span className="text-[10px] uppercase font-medium tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
            Khám Phá
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* === Inline Keyframe Animations === */}
      <style>{`
        @keyframes heroWaveRise {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          65% {
            opacity: 1;
            transform: translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroOrbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes heroOrbPulse {
          0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </section>
  )
}
