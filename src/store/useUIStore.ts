import { create } from 'zustand'
import { getSavedLanguage, setPageLanguage, type SupportedLang } from '@/utils/translator'

export type NavKey = 'home' | 'about' | 'timeline' | 'speakers' | 'gallery' | 'news'
export type LangType = SupportedLang

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

export const useUIStore = create<UIState>((set, get) => ({
  activeNav: 'home',
  isMobileMenuOpen: false,
  currentLang: getSavedLanguage(),

  setActiveNav: (nav: NavKey) => 
    set({ activeNav: nav }),

  setIsMobileMenuOpen: (isOpen: boolean) => 
    set({ isMobileMenuOpen: isOpen }),

  toggleMobileMenu: () => 
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  setCurrentLang: (lang: LangType) => {
    set({ currentLang: lang })
    setPageLanguage(lang)
  },

  toggleLang: () => {
    const nextLang = get().currentLang === 'VI' ? 'EN' : 'VI'
    set({ currentLang: nextLang })
    setPageLanguage(nextLang)
  },
}))
