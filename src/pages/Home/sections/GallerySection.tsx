import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { siteData } from '@/data'
import type { GalleryItem } from '@/data/types'

export function GallerySection() {
  const { gallery } = siteData
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const items = gallery.items
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const initialDisplayCount = 8
  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount)

  const openLightbox = (item: GalleryItem) => {
    const idx = items.findIndex((i) => i.id === item.id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const nextLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % items.length)
    }
  }, [lightboxIndex, items.length])

  const prevLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + items.length) % items.length)
    }
  }, [lightboxIndex, items.length])

  // Automatically center the active thumbnail in the horizontal strip
  useEffect(() => {
    if (lightboxIndex === null) return
    const activeThumb = thumbnailRefs.current[lightboxIndex]
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [lightboxIndex])

  // Handle keyboard shortcuts (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, nextLightbox, prevLightbox])

  const currentLightboxItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <section id="gallery" className="w-full py-20 md:py-28 bg-linear-to-b from-slate-50/90 via-blue-50/25 to-slate-100/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* 1. Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
          {gallery.title} <span className="text-blue-600">{gallery.titleHighlight}</span>
        </h2>

        <p className="text-xs sm:text-base text-slate-500 font-medium mt-3 leading-relaxed">
          {gallery.subtitle}
        </p>
      </div>

      {/* 2. Photo Gallery Grid - Auto-aligned, Balanced 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/80 transition-all duration-300 cursor-pointer aspect-16/10"
          >
            {/* Photo Image - Full image presentation without aggressive zooming */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              loading="lazy"
            />

            {/* Cinematic Dark Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
              {/* Top Right Zoom Icon */}
              <div className="self-end">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-1 font-normal">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>

        {/* View More Button */}
        {items.length > initialDisplayCount && (
          <div className="mt-10 sm:mt-14 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm cursor-pointer"
            >
              {showAll ? 'Thu gọn' : 'Xem thêm hình ảnh'}
            </button>
          </div>
        )}
      </div>

      {/* 3. Fullscreen Lightbox Preview Modal with Bottom Thumbnails Strip */}
      {currentLightboxItem && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 select-none"
        >
          {/* Close Button (Absolute Top Right) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50"
          >
            <button
              onClick={closeLightbox}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 cursor-pointer shrink-0 shadow-lg"
              aria-label="Đóng xem ảnh"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center Stage: Full Uncropped Image (100% full view, no zoom, no clipping) */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden w-full max-w-7xl mx-auto px-2 sm:px-16"
          >
            {/* Previous Arrow Button */}
            <button
              onClick={prevLightbox}
              className="absolute left-1 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/25 cursor-pointer shadow-2xl hover:scale-105"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Main Image: object-contain guarantees full picture visibility */}
            <div className="relative max-h-[75vh] max-w-full flex items-center justify-center">
              <img
                key={currentLightboxItem.id}
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl animate-in fade-in duration-300"
              />
            </div>

            {/* Next Arrow Button */}
            <button
              onClick={nextLightbox}
              className="absolute right-1 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/25 cursor-pointer shadow-2xl hover:scale-105"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Stage: Centered Active Thumbnail Strip */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-full z-10 pb-1 sm:pb-2"
          >
            <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto py-3 px-[40vw] sm:px-[45vw] scrollbar-none scroll-smooth">
              {items.map((thumb, tIdx) => {
                const isActive = tIdx === lightboxIndex
                return (
                  <button
                    key={thumb.id}
                    ref={(el) => { thumbnailRefs.current[tIdx] = el; }}
                    onClick={() => setLightboxIndex(tIdx)}
                    className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                      isActive
                        ? 'w-20 h-14 sm:w-24 sm:h-16 border-blue-500 opacity-100 brightness-100 scale-105 z-10'
                        : 'w-18 h-12 sm:w-20 sm:h-14 border-transparent opacity-30 brightness-75 hover:opacity-70 hover:brightness-100'
                    }`}
                    aria-label={`Xem ảnh ${tIdx + 1}`}
                  >
                    <img 
                      src={thumb.image} 
                      alt={thumb.title} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
