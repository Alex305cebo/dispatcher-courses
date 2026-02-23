import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

export type Locale = 'en' | 'ru'

export const locales: Locale[] = ['en', 'ru']

export const defaultLocale: Locale = 'ru'

type Messages = typeof ru

const messages: Record<Locale, Messages> = {
  en,
  ru,
}

export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages[defaultLocale]
}

export function createTranslator(locale: Locale) {
  const msgs = getMessages(locale)
  
  return function t(key: string): string {
    const keys = key.split('.')
    let value: any = msgs
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}
