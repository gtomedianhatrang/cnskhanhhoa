import { ArrowUp } from 'lucide-react'
import { siteData } from '@/data'


export function Footer() {
  const { footer } = siteData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-900 select-none">
      {/* 1. Upper Section: Full Width Contact Block */}
      <div className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-12 md:p-14 min-h-[300px] flex flex-col justify-center shadow-xl">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
            {footer.contactTitle}
          </h3>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-6 text-sm sm:text-base items-baseline">
            {footer.contacts.map((item, idx) => (
              <div key={idx} className="contents">
                <span className="font-bold text-blue-100 uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap">
                  {item.label}:
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-semibold text-white hover:text-cyan-200 transition-colors underline underline-offset-4 break-words"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-semibold text-white leading-relaxed">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Bottom Sub-Footer Bar with Copyright & Social Media Icons */}
      <div className="w-full bg-white border-t border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright text */}
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed text-center md:text-left">
            {footer.copyright}
          </p>

          {/* Back to top */}
          <div className="flex items-center sm:mr-16">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
            >
              <span>{footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
