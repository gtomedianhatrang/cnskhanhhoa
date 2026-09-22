import { useEffect, useState, useRef, useCallback } from 'react'
import { Compass, ShieldCheck, Cpu, TrendingUp } from 'lucide-react'
import { siteData } from '@/data'
import { useQuoteStore } from '@/store'

export function QuoteBanner() {
  const { quotes } = siteData.quoteBanner
  const { setActiveQuoteIndex } = useQuoteStore()
  const N = quotes.length

  // Current active index in quotes (0 to N-1) - NEVER out of bounds
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [targetPosition, setTargetPosition] = useState('-100%')
  const [nextOverride, setNextOverride] = useState<typeof quotes[0] | null>(null)
  const [prevOverride, setPrevOverride] = useState<typeof quotes[0] | null>(null)

  // Drag & Swipe states
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  // Sync active index with store
  useEffect(() => {
    setActiveQuoteIndex(currentIndex)
  }, [currentIndex, setActiveQuoteIndex])

  // Slide Next (to the right slide)
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTargetPosition('-200%')

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % N)
      setIsAnimating(false)
      setTargetPosition('-100%')
    }, 500)
  }, [isAnimating, N])

  // Slide Prev (to the left slide)
  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setTargetPosition('0%')

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + N) % N)
      setIsAnimating(false)
      setTargetPosition('-100%')
    }, 500)
  }, [isAnimating, N])

  // Auto slide every 6 seconds when not hovered or dragging
  useEffect(() => {
    if (isHovered || isDragging || isAnimating) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [isHovered, isDragging, isAnimating, nextSlide])

  // Finish dragging and determine swipe direction
  const handleEndDrag = useCallback(() => {
    if (!isDragging) return
    const threshold = 50
    if (dragOffset < -threshold) {
      // Dragged left -> advance to next slide
      setIsDragging(false)
      setDragOffset(0)
      nextSlide()
    } else if (dragOffset > threshold) {
      // Dragged right -> go to previous slide
      setIsDragging(false)
      setDragOffset(0)
      prevSlide()
    } else {
      // Snap back smoothly
      setIsDragging(false)
      setDragOffset(0)
    }
  }, [isDragging, dragOffset, nextSlide, prevSlide])

  // Global mouse up / mouse move listener while dragging
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX
      setDragOffset(diff)
    }

    const handleGlobalMouseUp = () => {
      handleEndDrag()
    }

    window.addEventListener('mousemove', handleGlobalMouseMove)
    window.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove)
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, startX, handleEndDrag])

  // Mouse Handlers for Desktop Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    setStartX(e.clientX)
    setDragOffset(0)
  }

  // Touch Handlers for Mobile Devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isAnimating) return
    const diff = e.touches[0].clientX - startX
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    handleEndDrag()
  }

  // Click on a navigation dot with directional animation
  const handleDotClick = (targetIdx: number) => {
    if (isAnimating || targetIdx === currentIndex) return
    if (targetIdx > currentIndex) {
      setNextOverride(quotes[targetIdx])
      setIsAnimating(true)
      setTargetPosition('-200%')
      setTimeout(() => {
        setCurrentIndex(targetIdx)
        setNextOverride(null)
        setIsAnimating(false)
        setTargetPosition('-100%')
      }, 500)
    } else {
      setPrevOverride(quotes[targetIdx])
      setIsAnimating(true)
      setTargetPosition('0%')
      setTimeout(() => {
        setCurrentIndex(targetIdx)
        setPrevOverride(null)
        setIsAnimating(false)
        setTargetPosition('-100%')
      }, 500)
    }
  }

  // Render iconic thematic badges inside the white circle
  const renderMediaLogo = (type: string) => {
    switch (type) {
      case 'vision':
        return (
          <div className="flex flex-col items-center justify-center text-blue-600">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2] animate-[spin_12s_linear_infinite]" />
          </div>
        )
      case 'citizen':
        return (
          <div className="flex flex-col items-center justify-center text-teal-600">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
          </div>
        )
      case 'innovation':
        return (
          <div className="flex flex-col items-center justify-center text-indigo-600">
            <Cpu className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
          </div>
        )
      case 'growth':
        return (
          <div className="flex flex-col items-center justify-center text-emerald-600">
            <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.4]" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-blue-600 shadow-md" />
        )
    }
  }

  // Active 3 buffer slides: Prev, Current, Next (Always valid, never out-of-bounds)
  const prevQuote = prevOverride || quotes[(currentIndex - 1 + N) % N]
  const currentQuote = quotes[currentIndex]
  const nextQuote = nextOverride || quotes[(currentIndex + 1) % N]

  // Reusable Slide Content Renderer
  const renderSlideContent = (quote: typeof quotes[0]) => (
    <div className="w-full shrink-0 min-w-full flex items-center justify-center min-h-[160px] md:min-h-[180px]">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14">
        {/* Left Side: Cyan Quote & Source Label */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] inline-block animate-pulse" />
          </div>

          <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-black text-cyan-300 leading-none drop-shadow-[0_0_15px_rgba(103,232,249,0.5)]">
            “
          </span>

          <div className="mt-2">
            <h4 className="font-black text-sm sm:text-base tracking-wider uppercase text-white drop-shadow-md">
              {quote.source}
            </h4>
            <p className="text-[11px] sm:text-xs text-blue-100 font-medium mt-0.5">
              {quote.sourceFull}
            </p>
          </div>
        </div>

        {/* Center: Large White Circular Media Logo Badge */}
        <div className="relative shrink-0 pointer-events-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/95 shadow-[0_15px_35px_rgba(0,0,0,0.35)] ring-8 ring-white/20 flex items-center justify-center transition-transform duration-500 hover:scale-105">
            {renderMediaLogo(quote.logoType)}
          </div>
        </div>

        {/* Right Side: Quote Paragraph */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          <p className="text-lg sm:text-2xl md:text-[26px] lg:text-[28px] font-semibold leading-relaxed tracking-tight text-white drop-shadow-sm">
            {quote.quote}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <section 
      ref={bannerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-gradient-to-r from-blue-950 via-blue-700 to-blue-600 py-16 sm:py-20 md:py-24 text-white select-none cursor-grab active:cursor-grabbing group/banner"
    >
      {/* Topographic Contour Wave Lines across full width */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1440 360" 
          preserveAspectRatio="none"
          fill="none"
        >
          <path 
            d="M-50,60 C300,10 600,140 1000,40 C1250,-20 1400,80 1500,60" 
            stroke="#172554" 
            strokeWidth="2.5" 
          />
          <path 
            d="M-50,140 C200,200 500,40 900,160 C1200,240 1350,120 1500,150" 
            stroke="#172554" 
            strokeWidth="2.5" 
          />
          <path 
            d="M-50,220 C350,160 650,300 1050,190 C1300,110 1420,250 1500,230" 
            stroke="#172554" 
            strokeWidth="2" 
          />
          <path 
            d="M-50,300 C250,340 700,220 1100,320 C1300,370 1450,290 1500,310" 
            stroke="#172554" 
            strokeWidth="2.5" 
          />
        </svg>
      </div>

      {/* Track Container: 3-Slide Buffer (Prev, Current, Next) for 100% Reliable Infinite Loop */}
      <div className="relative z-10 w-full overflow-hidden">
        <div 
          className="flex w-full"
          style={{
            transform: isAnimating
              ? `translateX(${targetPosition})`
              : `translateX(calc(-100% + ${dragOffset}px))`,
            transition: isAnimating
              ? 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'none'
          }}
        >
          {/* Previous Slide */}
          {renderSlideContent(prevQuote)}

          {/* Current Active Slide */}
          {renderSlideContent(currentQuote)}

          {/* Next Slide */}
          {renderSlideContent(nextQuote)}
        </div>
      </div>

      {/* Bottom Carousel Navigation Dots: positioned absolute at bottom so vertical padding is 100% symmetric */}
      <div className="absolute bottom-5 sm:bottom-6 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 pointer-events-auto">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); handleDotClick(idx) }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-7 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/75'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}



