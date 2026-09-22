import { siteData } from '@/data'

export function PartnersSection() {
  const { partners } = siteData

  return (
    <section id="partners" className="w-full py-16 sm:py-20 md:py-24 bg-white border-t border-slate-200/80">
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
        <div className="flex flex-col border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
          {partners.tiers.map((tier, index) => (
            <div 
              key={tier.id} 
              className={`flex flex-col md:flex-row ${
                index !== partners.tiers.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              {/* Left Column: Title (Using our brand colors instead of the image's colors) */}
              <div className={`md:w-1/3 flex items-center justify-center p-8 sm:p-12 text-center ${tier.colorClass}`}>
                <h3 className="font-display text-xl sm:text-2xl font-black tracking-widest uppercase break-words w-full">
                  {tier.title}
                </h3>
              </div>

              {/* Right Column: Logos */}
              <div className="md:w-2/3 bg-slate-50/50 flex flex-wrap items-center justify-center gap-8 sm:gap-12 p-8 sm:p-12 min-h-[160px]">
                {tier.logos.map((logo, lIdx) => (
                  <div key={lIdx} className="group relative grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300 w-32 sm:w-40 flex items-center justify-center">
                    <img 
                      src={logo.img} 
                      alt={logo.name} 
                      className="max-h-12 sm:max-h-16 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
