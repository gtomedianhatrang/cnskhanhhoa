import { create } from 'zustand'

export type NavKey = 'home' | 'about' | 'timeline' | 'speakers' | 'gallery' | 'news'
export type LangType = 'VI' | 'EN'

interface UIState {
  activeNav: NavKey
  isMobileMenuOpen: boolean
  currentLang: LangType
  setActiveNav: (nav: NavKey) => void
  setIsMobileMenuOpen: (isOpen: boolean) => void
  toggleMobileMenu: () => void
  setCurrentLang: (lang: LangType) => void
  toggleLang: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeNav: 'home',
  isMobileMenuOpen: false,
  currentLang: 'VI',

  setActiveNav: (nav: NavKey) => 
    set({ activeNav: nav }),

  setIsMobileMenuOpen: (isOpen: boolean) => 
    set({ isMobileMenuOpen: isOpen }),

  toggleMobileMenu: () => 
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setCurrentLang: (lang: LangType) => 
    set({ currentLang: lang }),

  toggleLang: () => 
    set((state) => ({ currentLang: state.currentLang === 'VI' ? 'EN' : 'VI' })),
}))
