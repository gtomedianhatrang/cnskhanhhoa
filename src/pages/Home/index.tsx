import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import {
  HeroBanner,
  StatementSection,
  QuoteBanner,
  HistoricalHighlights,
  EventTimeline,
  SpeakersSpotlight,
  GallerySection,
  LatestReleases,
  PartnersSection,
} from './sections'
import { Footer } from '@/components/Footer'

export function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    // Scroll listener for back to top button
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">

      {/* === Floating Back to Top Button === */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
          showBackToTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-12 invisible pointer-events-none'
        }`}
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Main Page Content */}
      <main className="relative bg-white">
        {/* Statement / Mission Editorial Intro */}
        <StatementSection />

        {/* Historical Highlights (160K+ Stats & Bento Cards Gallery) */}
        <HistoricalHighlights />

        {/* Featured Quote Gradient Wave Ribbon (Visual Transition Divider) */}
        <QuoteBanner />

        {/* 4-Day Event Timeline & Detailed Sessions */}
        <EventTimeline />

        {/* Speakers Spotlight (Stage Mosaic Grid) */}
        <SpeakersSpotlight />

        {/* Latest Releases & Press Articles */}
        <LatestReleases />

        {/* Photo Gallery / Media Showcase */}
        <GallerySection />

        {/* Partners Section */}
        <PartnersSection />

        {/* Branded Blue Footer with Contact & Supported Entities */}
        <Footer />
      </main>
    </div>
  )
}

export default HomePage

