 'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { mockLoads } from '../data/mockLoads'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/simulator')
    }, 500)
  }

  const [language, setLanguage] = useState<'ru' | 'en'>('ru')
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('courseLanguage') : null
    if (saved === 'ru' || saved === 'en') setLanguage(saved)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('courseLanguage', language)
  }, [language])

  const handlePayment = () => {
    if (isPaid) return
    // navigate to dedicated checkout confirmation page
    router.push('/checkout')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">Курсы - Диспетчера</h1>
            <p className="text-gray-600">Профессиональное обучение диспетчеров</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePayment}
              disabled={isLoading || isPaid}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${isPaid ? 'bg-gray-200 text-gray-600' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              {isPaid ? (language === 'ru' ? 'Оплачен' : 'Paid') : (language === 'ru' ? 'Оплатить курс' : 'Pay Course')}
            </button>

            <div className="flex items-center space-x-2">
              <label className="sr-only">{language === 'ru' ? 'Язык' : 'Language'}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ru' | 'en')}
                className="px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Героический раздел */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex justify-center mb-6">
              <Link href="/simulator" className="no-underline">
                <div className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg">
                  <h2 className="text-3xl font-bold text-center">Симулятор диспетчера грузоперевозок</h2>
                </div>
              </Link>
            </div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Интерактивный тренажёр для обучения приёмам планирования, назначения водителей и оптимизации маршрутов. Практические сценарии и реальные данные симуляций.
            </p>
            
            {/* Центральная кнопка — одна по середине страницы */}
          </div>

          {/* Информационные карточки */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5 Модулей</h3>
              <p className="text-gray-600">Комплексное обучение по разным аспектам диспетчерской работы</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Симулятор Грузов</h3>
              <p className="text-gray-600">Практический опыт с реальными данными американских перевозок</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{language === 'ru' ? 'Найдено грузов' : 'Loads found'}</h3>
              <div className="text-indigo-600 text-4xl font-extrabold">{mockLoads.length}</div>
              <p className="text-gray-600 mt-2">{language === 'ru' ? 'Данные из симуляции диспетчера' : 'Data from dispatcher simulator'}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="px-12 py-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
          >
            {isLoading ? (language === 'ru' ? '⏳ Загрузка...' : '⏳ Loading...') : (language === 'ru' ? 'Приступить к работе' : 'Begin Work')}
          </button>
        </div>
      </section>

      {/* Особенности курса */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Что вы изучите</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 text-5xl">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Подготовка и Планирование</h3>
              <p className="text-gray-600">Проверка документов, анализ погрузочных данных и оптимизация маршрутов</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 text-5xl">📡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Системы Коммуникации</h3>
              <p className="text-gray-600">Работа с GPS-мониторингом, радиосвязью и платформами управления</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 text-5xl">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Управление Кризисом</h3>
              <p className="text-gray-600">Протоколы действий при аварийных ситуациях и форс-мажорных обстоятельствах</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 text-5xl">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Коммуникация</h3>
              <p className="text-gray-600">Эффективное взаимодействие с водителями, клиентами и партнёрами</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 text-5xl">🗺️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Логистика США</h3>
              <p className="text-gray-600">Реальные данные грузоперевозок со всех 50 штатов США</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 text-5xl">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Практические Навыки</h3>
              <p className="text-gray-600">Интерактивные симуляторы и реальные сценарии диспетчерской работы</p>
            </div>
          </div>
        </div>
      </section>

      {/* Футер с CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Готовы начать?</h2>
          <p className="text-indigo-100 text-lg mb-8">
            Присоединяйтесь к курсу и получите практические навыки диспетчерской деятельности
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isLoading ? '⏳ Загрузка...' : '🎓 Начать учебу'}
          </button>
        </div>
      </section>
    </main>
  )
}
