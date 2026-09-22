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
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Logo & Text */}
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="CNS Khánh Hòa" className="h-12 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105" />
            <span 
              className={`font-display text-xl sm:text-2xl font-black tracking-wider transition-colors hidden sm:inline-block ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`}
            >
              CÔNG NGHỆ SỐ
            </span>
          </a>
        </div>

        {/* Right Navigation Menu - Active chỉ đổi sắc độ chữ xanh đậm/nhạt, không gạch chân */}
        <nav className="hidden lg:flex items-center space-x-7 sm:space-x-8 text-xs uppercase tracking-widest">
          {header.nav.map((item) => {
            const isActive = activeNav === item.key
            return (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.targetId, item.key)}
                className={`py-1 transition-colors cursor-pointer ${
                  isScrolled
                    ? isActive
                      ? 'text-blue-600 font-black'
                      : 'text-slate-500 hover:text-blue-600 font-bold'
                    : isActive
                      ? 'text-blue-400 font-black'
                      : 'text-white/70 hover:text-blue-400 font-bold'
                }`}
              >
                <span>{item.label}</span>
              </button>
            )
          })}

          {/* Language Dropdown Selector */}
          <div className="relative pl-4 border-l border-slate-300 dark:border-white/20" ref={langDropdownRef}>
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
              <Globe className={`w-3.5 h-3.5 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
              <span>{currentLang}</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isLangDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu Popup */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-100">
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
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            isScrolled 
              ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl p-6 flex flex-col justify-between text-white animate-in fade-in">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="CNS Khánh Hòa" className="h-10 w-auto object-contain" />
              <span className="font-display text-lg font-bold tracking-wider">CÔNG NGHỆ SỐ</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-5 text-sm font-bold uppercase tracking-widest py-6">
            {header.nav.map((item) => (
              <button 
                key={item.key}
                onClick={() => { setIsMobileMenuOpen(false); scrollToSection(item.targetId, item.key) }}
                className={`text-left py-2 transition-colors ${
                  activeNav === item.key ? 'text-blue-400 font-black' : 'text-slate-400 hover:text-blue-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Language Switcher */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800">
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
      )}
    </header>
  )
}
