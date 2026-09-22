/**
 * Simplified Utilities for automatic page translation via Google Translate element
 */

export type SupportedLang = 'VN' | 'EN'

export interface LanguageOption {
  code: SupportedLang
  label: string
  googleCode: string
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'VN',
    label: 'Tiếng Việt',
    googleCode: 'vi',
  },
  {
    code: 'EN',
    label: 'English',
    googleCode: 'en',
  },
]

export function getSavedLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'VN'
  
  const saved = localStorage.getItem('app_lang') as SupportedLang | null
  if (saved === 'VN' || saved === 'EN') return saved
  if (saved === ('VI' as any)) return 'VN'

  if (document.cookie.includes('googtrans=/vi/en')) {
    return 'EN'
  }

  return 'VN'
}

export function setPageLanguage(lang: SupportedLang) {
  if (typeof window === 'undefined') return

  const targetGoogleCode = lang === 'EN' ? 'en' : 'vi'
  const hostname = window.location.hostname

  localStorage.setItem('app_lang', lang)

  if (lang === 'VN') {
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
    
    // If switching back to VN, reloading ensures clean DOM reset
    if (lang === 'VN') {
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }
  } else {
    window.location.reload()
  }
}
