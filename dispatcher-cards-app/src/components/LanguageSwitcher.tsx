'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  currentLocale: Locale
  onLocaleChange: (locale: Locale) => void
}

export default function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'ru' as Locale, label: 'RU', flag: '🇷🇺' },
    { code: 'en' as Locale, label: 'EN', flag: '🇺🇸' },
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all text-xs sm:text-sm font-semibold"
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 right-0 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLocaleChange(lang.code)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-white/10 transition-colors ${
                currentLocale === lang.code ? 'bg-white/5' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-white font-medium">{lang.label}</span>
              {currentLocale === lang.code && (
                <svg className="w-4 h-4 ml-auto text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
