import { useState, useEffect, useRef } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store'
import { LANGUAGE_OPTIONS } from '@/utils/translator'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  const {
    currentLang,
    setCurrentLang,
  } = useUIStore()

  // Detect scroll to transition header to fixed white background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-white/95 text-slate-900 shadow-sm backdrop-blur-md border-b border-slate-200/80 py-3.5'
          : 'bg-transparent text-white border-b-0 border-transparent shadow-none py-5 sm:py-6'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-end">
        <div className="flex items-center gap-2 md:gap-0">
          {/* Language Dropdown Selector */}
          <div className="relative notranslate shrink-0" translate="no" ref={langDropdownRef}>
            <button 
              type="button"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center gap-1.5 font-bold text-xs uppercase transition-colors cursor-pointer py-1 ${
                isScrolled 
                  ? 'text-slate-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              }`}
              aria-label="Ngôn ngữ"
              aria-expanded={isLangDropdownOpen}
            >
              <Globe className={`w-4 h-4 md:w-3.5 md:h-3.5 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
              <span>{currentLang}</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isLangDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu Popup */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-3 md:mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {LANGUAGE_OPTIONS.map((opt) => {
                  const isSelected = currentLang === opt.code
                  return (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setCurrentLang(opt.code)
                        setIsLangDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
