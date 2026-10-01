import { ArrowRight } from 'lucide-react'
import { siteData } from '@/data'

export function LatestReleases() {
  const { releases } = siteData

  return (
    <section id="news" className="w-full py-20 md:py-28 bg-white scroll-mt-20 lg:scroll-mt-24">
      {/* 1. Header Section */}
      <div className="flex flex-col items-start gap-4 max-w-7xl mx-auto mb-16 px-6 sm:px-10 lg:px-12 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            {releases.title}
            {releases.titleHighlight ? (
              <span className="text-blue-600 ml-2">{releases.titleHighlight}</span>
            ) : null}
          </h2>
        </div>
        {releases.subtitle ? (
          <p className="w-full text-slate-500 text-sm sm:text-base text-pretty font-medium leading-relaxed">
            {releases.subtitle}
          </p>
        ) : null}
      </div>

      {/* 2. Alternating Checkerboard Showcase */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="w-full border border-slate-200/90 divide-y divide-slate-200/90 bg-white rounded-3xl overflow-hidden shadow-sm">
        {releases.items.map((item, index) => {
          const isImageFirst = index % 2 === 0

          return (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 md:grid-cols-2 group cursor-pointer overflow-hidden transition-colors w-full text-inherit no-underline"
            >
              {/* Image Column */}
              <div
                className={`relative w-full aspect-video md:aspect-auto md:h-full min-h-[250px] overflow-hidden flex items-center justify-center ${
                  isImageFirst ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Text Column */}
              <div
                className={`p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white ${
                  isImageFirst ? 'md:order-2' : 'md:order-1'
                }`}
              >
                {/* Top Meta: Date & Author */}
                <div className="flex items-center justify-between text-xs font-bold tracking-wider text-slate-400 uppercase">
                  <span>{item.date}</span>
                  <span className="text-blue-600 font-bold">{item.author}</span>
                </div>

                {/* Center: Large Headline & Brief Snippet */}
                <div className="my-6">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-4 line-clamp-3 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>

                {/* Bottom: READ MORE Callout */}
                <div className="pt-4 flex items-center">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-all">
                    <span>ĐỌC THÊM</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </a>
          )
        })}
        </div>
      </div>
    </section>
  )
}
