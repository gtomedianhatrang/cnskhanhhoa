import { ArrowRight } from 'lucide-react'
import { siteData } from '@/data'

export function LatestReleases() {
  const { releases } = siteData

  return (
    <section id="news" className="w-full py-20 md:py-28 bg-white">
      {/* 1. Header Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-10 border-b border-slate-200/80 pb-6">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-slate-900">
          {releases.title}
          {releases.titleHighlight ? (
            <span className="text-blue-600"> {releases.titleHighlight}</span>
          ) : null}
        </h2>
        {releases.subtitle ? (
          <p className="text-sm text-slate-500 mt-2">{releases.subtitle}</p>
        ) : null}
      </div>

      {/* 2. Alternating Checkerboard Showcase (Full-Width Links to Press Sources) */}
      <div className="w-full border-y border-slate-200/90 divide-y divide-slate-200/90 bg-white">
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
                className={`relative w-full aspect-[16/10] md:aspect-auto md:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] overflow-hidden bg-slate-100 ${
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
                className={`p-8 sm:p-12 md:p-14 lg:p-16 xl:p-20 flex flex-col justify-between bg-white ${
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
    </section>
  )
}
