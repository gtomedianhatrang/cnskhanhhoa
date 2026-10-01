import { siteData } from '@/data'

export function TechShowcaseSection() {
  const { techShowcase } = siteData

  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-slate-900">

        {/* Header - Elegant Layout */}
        <div className="relative mb-12 font-sans">
          <div className="flex flex-col gap-6">
            <div className="relative">
              <h2 className="text-[clamp(1.25rem,4.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight">
                {techShowcase.title} {techShowcase.titleHighlight}
              </h2>
            </div>
            <div className="min-w-0">
              <p className="text-lg font-medium leading-relaxed">
                {techShowcase.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap Layout */}
        <div className="relative w-full mx-auto px-6 sm:px-8 lg:px-10">

          {/* Continuous Snake Line (Desktop Only) - Circuit Board Style */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-blue-300 -translate-x-1/2 z-0"></div>

          <div className="flex flex-col space-y-16 md:space-y-32">
            {techShowcase.items.map((item: any, idx: number) => {
              const isEven = idx % 2 !== 0; // 0 is odd in UI layout (left), 1 is even (right)

              return (
                <div key={item.id} className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-stretch gap-8 md:gap-16 lg:gap-32 w-full">
                  {/* Center Dot (Glowing Circuit Node) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 z-40"></div>


                  {/* LEFT HALF */}
                  <div className={`min-w-0 w-full flex items-stretch ${isEven ? 'order-2' : 'order-1'} md:order-none`}>
                    {isEven ? (
                      // Image is on the left
                      <>
                        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white  z-20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </div>
                      </>
                    ) : (
                      // Content is on the left
                      <>
                        <div className="py-6 lg:py-8 w-full h-full flex items-center relative group z-20">
                          <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-200 absolute -top-4 md:-top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10 w-full">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-4">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block absolute left-1/2 top-1/2 h-[2px] w-8 lg:w-16 -translate-x-full bg-blue-300 z-10">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -ml-1 z-20"></div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT HALF */}
                  <div className={`min-w-0 w-full flex items-stretch ${isEven ? 'order-1' : 'order-2'} md:order-none`}>
                    {isEven ? (
                      // Content is on the right
                      <>
                        <div className="hidden md:block absolute left-1/2 top-1/2 h-[2px] w-8 lg:w-16 bg-blue-300 z-10">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -mr-1 z-20"></div>
                        </div>
                        <div className="py-6 lg:py-8 w-full h-full flex items-center relative group z-20">
                          <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-200 absolute -top-4 md:-top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10 w-full">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-4">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Image is on the right
                      <>
                        <div className="relative w-full aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white  z-20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </div>
                      </>
                    )}
                  </div>

                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
