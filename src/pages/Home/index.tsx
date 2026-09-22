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
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
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

