/**
 * Utilities for automatic page translation via Google Translate element
 */

export type SupportedLang = 'VI' | 'EN'

export interface LanguageOption {
  code: SupportedLang
  label: string
  subLabel: string
  flag: string
  googleCode: string
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'VI',
    label: 'Tiếng Việt',
    subLabel: 'Vietnam',
    flag: '🇻🇳',
    googleCode: 'vi',
  },
  {
    code: 'EN',
    label: 'English',
    subLabel: 'United States',
    flag: '🇬🇧',
    googleCode: 'en',
  },
]

export function getSavedLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'VI'
  
  // Check cookie or localStorage
  const saved = localStorage.getItem('app_lang') as SupportedLang | null
  if (saved === 'VI' || saved === 'EN') return saved

  if (document.cookie.includes('googtrans=/vi/en')) {
    return 'EN'
  }

  return 'VI'
}

export function setPageLanguage(lang: SupportedLang) {
  if (typeof window === 'undefined') return

  const targetGoogleCode = lang === 'EN' ? 'en' : 'vi'
  const hostname = window.location.hostname

  localStorage.setItem('app_lang', lang)

  if (lang === 'VI') {
    // Clear cookie to restore default Vietnamese
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`
    if (hostname.includes('.')) {
      const rootDomain = '.' + hostname.split('.').slice(-2).join('.')
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`
    }
    document.cookie = 'googtrans=/vi/vi; path=/;'
  } else {
    // Set cookie for English
    const cookieVal = `/vi/${targetGoogleCode}`
    document.cookie = `googtrans=${cookieVal}; path=/;`
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${hostname};`
    if (hostname.includes('.')) {
      const rootDomain = '.' + hostname.split('.').slice(-2).join('.')
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${rootDomain};`
    }
  }

  // Trigger Google Translate select element
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
  if (select) {
    select.value = targetGoogleCode
    select.dispatchEvent(new Event('change'))
    
    // If switching back to VI, reloading ensures 100% clean DOM reset
    if (lang === 'VI') {
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  } else {
    // If widget not initialized yet, reload to apply cookie immediately
    window.location.reload()
  }
}
