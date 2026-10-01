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

        {/* Grid Layout (Thẳng hàng) */}
        <div className="relative w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {techShowcase.items.map((item: any, idx: number) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden border-b border-slate-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-blue-600 text-lg shadow-lg">
                    {item.id}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 lg:p-10 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
