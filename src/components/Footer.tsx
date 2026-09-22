import { ArrowUp, Globe } from 'lucide-react'
import { siteData } from '@/data'

// Social Media SVGs
function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

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
                <div key={idx}>
                  <p className="font-bold text-blue-100 uppercase tracking-wider text-[11px] mb-1">
                    {item.label}:
                  </p>
                  <a
                    href={`mailto:${item.email}`}
                    className="font-semibold text-white hover:text-cyan-200 transition-colors underline underline-offset-4"
                  >
                    {item.email}
                  </a>
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

          {/* Social Media Icons & Back to top */}
          <div className="flex items-center space-x-6">
            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-4 text-slate-600">
              <a href="#youtube" className="hover:text-blue-600 transition-colors p-1" aria-label="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-blue-600 transition-colors p-1" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#twitter" className="hover:text-blue-600 transition-colors p-1" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#global" className="hover:text-blue-600 transition-colors p-1" aria-label="Global Web">
                <Globe className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-900 hover:text-blue-600 transition-colors cursor-pointer pl-4 border-l border-slate-200"
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
