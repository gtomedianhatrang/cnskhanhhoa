import { ArrowUp } from 'lucide-react'
import { siteData } from '@/data'


export function Footer() {
  const { footer } = siteData

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-900 select-none">
      {/* 1. Upper Section: 2 Columns (Left Featured Blue Contact Block + Right Organizers / Partners) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left Column: Featured Blue Contact Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-12 md:p-14 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
              {footer.contactTitle}
            </h3>

            <div className="space-y-6 text-xs sm:text-sm">
              {footer.contacts.map((item, idx) => (
                <div key={idx} className="flex flex-wrap items-baseline gap-1.5">
                  <span className="font-bold text-blue-100 uppercase tracking-wider text-[11px]">
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

        {/* Right Column: Brought To You By & Supported By in Clean Light Theme */}
        <div className="lg:col-span-8 bg-slate-50 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
          <div className="space-y-10 max-w-3xl">
            {/* Brought to you by */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                {footer.broughtToYouByTitle}
              </h4>
              <div className="text-sm font-semibold text-slate-700 space-y-1 leading-relaxed">
                {footer.broughtToYouBy.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>

            {/* Supported by */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-3">
                {footer.supportedByTitle}
              </h4>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed font-medium">
                {footer.supportedBy.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            </div>
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
