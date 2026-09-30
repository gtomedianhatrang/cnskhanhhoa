import { siteData } from '@/data'

// Placeholder slot for partners not yet announced
function PartnerLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-32 sm:w-40 h-16 sm:h-20 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/60">
      <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 tracking-widest uppercase">Sắp công bố</span>
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
                  <PartnerLogo key={lIdx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
