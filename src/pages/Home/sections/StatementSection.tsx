import { siteData } from '@/data'

export function StatementSection() {
  const { statement } = siteData

  return (
    <section id="statement" className="relative py-20 md:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-slate-900 leading-relaxed tracking-tight text-justify [text-align-last:center]">
          {statement.textBefore}{' '}
          <span className="text-blue-600 font-black">{statement.sessionsHighlight}</span>{' '}
          {statement.textMiddle}{' '}
          <span className="font-display bg-prism-gradient font-black">{statement.eventName}</span>{' '}
          <span className="text-slate-800 font-bold">{statement.textAfter}</span>
        </h2>
      </div>
    </section>
  )
}

