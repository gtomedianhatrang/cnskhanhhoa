import { useState } from 'react'
import { siteData } from '@/data'

interface PartnerLogoProps {
  name: string
  img: string
}

function PartnerLogo({ name, img }: PartnerLogoProps) {
  const [hasError, setHasError] = useState(false)

  // Brand-accurate custom vector badges as fail-safe fallback
  const renderBrandBadge = () => {
    switch (name.toLowerCase()) {
      case 'viettel':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200/80 bg-red-50/80 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EE0033]"></span>
            <span className="font-vietnam font-black text-base text-[#EE0033] tracking-tight lowercase">
              viettel
            </span>
          </div>
        )
      case 'vnpt':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200/80 bg-blue-50/80 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0066B3]"></span>
            <span className="font-display font-black text-base text-[#0066B3] tracking-wider uppercase">
              VNPT
            </span>
          </div>
        )
      case 'fpt':
        return (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-orange-200/80 bg-orange-50/60 shadow-xs">
            <div className="flex gap-0.5">
              <span className="w-1.5 h-3.5 bg-[#F37021] skew-x-[-12deg] rounded-xs"></span>
              <span className="w-1.5 h-3.5 bg-[#008D3F] skew-x-[-12deg] rounded-xs"></span>
              <span className="w-1.5 h-3.5 bg-[#0066B2] skew-x-[-12deg] rounded-xs"></span>
            </div>
            <span className="font-display font-black text-base text-slate-800 tracking-wider ml-1">
              FPT
            </span>
          </div>
        )
      case 'mobifone':
        return (
          <div className="flex items-center px-3 py-1.5 rounded-lg border border-blue-200/80 bg-white shadow-xs">
            <span className="font-display font-black text-base text-[#005BAC] tracking-tight">mobi</span>
            <span className="font-display font-black text-base text-[#E30613] tracking-tight">fone</span>
          </div>
        )
      case 'cmc':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-200/80 bg-sky-50/70 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0054A6]"></span>
            <span className="font-display font-black text-base text-[#0054A6] tracking-widest">
              CMC
            </span>
          </div>
        )
      case 'vng':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-200/80 bg-orange-50/80 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
            <span className="font-vietnam font-black text-base text-[#FF6B00] tracking-tight lowercase">
              vng
            </span>
          </div>
        )
      case 'misa':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200/80 bg-blue-50/70 shadow-xs">
            <span className="font-display font-black text-base text-[#0077CC] tracking-wider uppercase">
              MISA
            </span>
            <span className="w-2 h-2 rounded-full bg-[#E53935]"></span>
          </div>
        )
      default:
        return (
          <div className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-xs">
            <span className="font-display font-black text-sm text-slate-800 uppercase tracking-wider">
              {name}
            </span>
          </div>
        )
    }
  }

  if (hasError) {
    return (
      <div className="group relative hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-default">
        {renderBrandBadge()}
      </div>
    )
  }

  return (
    <div className="group relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-32 sm:w-40 flex items-center justify-center">
      <img
        src={img}
        alt={name}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className="max-h-12 sm:max-h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
        loading="lazy"
      />
    </div>
  )
}

export function PartnersSection() {
  const { partners } = siteData

  return (
    <section id="partners" className="w-full py-16 sm:py-20 md:py-24 bg-white border-t border-slate-200/80 scroll-mt-20 lg:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            {partners.title} <span className="text-blue-600">{partners.titleHighlight}</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-500 font-medium mt-3 leading-relaxed">
            {partners.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-col border border-slate-200/90 shadow-sm rounded-2xl overflow-hidden bg-white">
          {partners.tiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={`flex flex-col md:flex-row ${
                index !== partners.tiers.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              {/* Left Column: Title */}
              <div className={`md:w-1/3 flex items-center justify-center p-8 sm:p-12 text-center ${tier.colorClass}`}>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-widest uppercase break-words w-full">
                  {tier.title}
                </h3>
              </div>

              {/* Right Column: Logos */}
              <div className="md:w-2/3 bg-slate-50/50 flex flex-wrap items-center justify-center gap-8 sm:gap-12 p-8 sm:p-12 min-h-[160px]">
                {tier.logos.map((logo, lIdx) => (
                  <PartnerLogo key={lIdx} name={logo.name} img={logo.img} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
