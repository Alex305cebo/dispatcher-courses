'use client'

import { Locale } from '@/lib/i18n'

interface LanguageToggleProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

export default function LanguageToggle({ currentLocale, onLocaleChange }: LanguageToggleProps) {
  const toggleLanguage = () => {
    const newLocale = currentLocale === 'ru' ? 'en' : 'ru'
    onLocaleChange(newLocale)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-all duration-200 text-xs font-bold"
      aria-label="Toggle language"
    >
      {currentLocale.toUpperCase()}
    </button>
  )
}
