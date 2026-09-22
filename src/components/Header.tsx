import { useState, useEffect } from 'react'
import { Globe, X, Menu } from 'lucide-react'
import { siteData } from '@/data'
import { useUIStore, type NavKey } from '@/store'

export type { NavKey }

interface HeaderProps {
  activeNav?: NavKey
  onNavChange?: (nav: NavKey) => void
}

export function Header({ activeNav: propActiveNav, onNavChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const {
    activeNav: storeActiveNav,
    setActiveNav,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentLang,
    toggleLang
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

          {/* Language Selector */}
          <button 
            onClick={toggleLang}
            className={`flex items-center space-x-1.5 font-bold transition-colors cursor-pointer pl-4 border-l py-1 ${
              isScrolled 
                ? 'text-slate-700 hover:text-blue-600 border-slate-300' 
                : 'text-white/90 hover:text-white border-white/20'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 ${isScrolled ? 'text-blue-600' : 'text-blue-400'}`} />
            <span>{currentLang}</span>
          </button>
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
          <button 
            onClick={toggleLang}
            className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white cursor-pointer"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>LANGUAGE: {currentLang}</span>
          </button>
        </div>
      )}
    </header>
  )
}
