import { useState, useEffect, useRef } from 'react'
import { Globe, X, Menu, ChevronDown } from 'lucide-react'
import { siteData } from '@/data'
import { useUIStore, type NavKey } from '@/store'
import { LANGUAGE_OPTIONS } from '@/utils/translator'

export type { NavKey }

interface HeaderProps {
  activeNav?: NavKey
  onNavChange?: (nav: NavKey) => void
}

export function Header({ activeNav: propActiveNav, onNavChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  const {
    activeNav: storeActiveNav,
    setActiveNav,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentLang,
    setCurrentLang,
  } = useUIStore()

  const activeNav = propActiveNav || storeActiveNav
  const { header } = siteData

  // Detect scroll to transition header to fixed white background and update active nav
  useEffect(() => {
    const handleScroll = () => {
      // 1. Header visual transition
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // 2. Active section ScrollSpy
      const sections = header.nav.map(item => ({
        key: item.key,
        element: document.getElementById(item.targetId)
      }))

      let currentActiveKey = header.nav[0]?.key || 'home'
      
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          // 150px offset to trigger slightly before the section hits the very top
          if (rect.top <= 150) {
            currentActiveKey = section.key
          }
        }
      }

      setActiveNav(currentActiveKey)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [header.nav, setActiveNav])

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

  const scrollToSection = (id: string, navKey: NavKey) => {
    setActiveNav(navKey)
    if (onNavChange) {
      onNavChange(navKey)
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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

          {/* Mobile Hamburger Button (Only on < md: < 768px) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ml-1 rounded-xl transition-colors ${
              isScrolled 
                ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Solid Right Slide-over) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer Sheet */}
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-slate-950 p-6 flex flex-col justify-between text-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-end pb-5 border-b border-slate-800">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Đóng menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Language Switcher */}
            <div className="grid grid-cols-2 gap-2 pt-4 notranslate mt-auto" translate="no">
              {LANGUAGE_OPTIONS.map((opt) => {
                const isSelected = currentLang === opt.code
                return (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setCurrentLang(opt.code)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
