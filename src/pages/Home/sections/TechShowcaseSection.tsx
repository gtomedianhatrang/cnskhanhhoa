import { siteData } from '@/data'

export function TechShowcaseSection() {
  const { techShowcase } = siteData

  return (
    <section className="w-full py-24 bg-slate-50 relative overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header - Elegant Layout */}
        <div className="relative mb-24 max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-20 h-20 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                {techShowcase.title} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 font-black">
                  {techShowcase.titleHighlight}
                </span>
              </h2>
            </div>
            <div className="lg:w-2/5">
              <p className="text-slate-600 text-lg border-l-2 border-indigo-200 pl-5 font-medium leading-relaxed">
                {techShowcase.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap Layout */}
        <div className="relative w-full mx-auto">

          {/* Continuous Snake Line (Desktop Only) - Circuit Board Style */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-blue-300 -translate-x-1/2 z-0"></div>

          <div className="flex flex-col space-y-16 md:space-y-32">
            {techShowcase.items.map((item: any, idx: number) => {
              const isEven = idx % 2 !== 0; // 0 is odd in UI layout (left), 1 is even (right)

              return (
                <div key={item.id} className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch w-full">
                  {/* Center Dot (Glowing Circuit Node) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 z-40"></div>


                  {/* LEFT HALF */}
                  <div className={`w-full md:w-1/2 flex items-center justify-start pr-0 md:pr-8 lg:pr-16 ${isEven ? 'order-2 mt-8 md:mt-0' : 'order-1'} md:order-none`}>
                    {isEven ? (
                      // Image is on the left
                      <>
                        <div className="relative w-full max-w-md aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white transform transition-transform duration-500 hover:scale-105 z-20">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
                        </div>
                      </>
                    ) : (
                      // Content is on the left
                      <>
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-lg relative group z-20">
                          <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-200 absolute -top-4 md:-top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 md:mb-4 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:block flex-1 h-[2px] bg-blue-300 z-10 relative -mr-8 lg:-mr-16">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -ml-1 z-20"></div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* RIGHT HALF */}
                  <div className={`w-full md:w-1/2 flex items-center justify-end pl-0 md:pl-8 lg:pl-16 ${isEven ? 'order-1' : 'order-2 mt-8 md:mt-0'} md:order-none`}>
                    {isEven ? (
                      // Content is on the right
                      <>
                        <div className="hidden md:block flex-1 h-[2px] bg-blue-300 z-10 relative -ml-8 lg:-ml-16">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 -mr-1 z-20"></div>
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-200 border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full max-w-lg relative group z-20">
                          <div className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-200 absolute -top-4 md:-top-6 -right-2 z-0 tracking-tighter group-hover:text-blue-100 transition-colors">
                            {item.id}
                          </div>
                          <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 md:mb-4 group-hover:text-blue-600 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Image is on the right
                      <>
                        <div className="relative w-full max-w-md aspect-video md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white transform transition-transform duration-500 hover:scale-105 z-20">
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
