'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [completedModules, setCompletedModules] = useState<number[]>([])

  const modules = [
    {
      id: 1,
      title: 'Подготовка и сбор информации',
      description: 'Проверка документов водителя и подготовка перед поиском груза',
      duration: '2.5 часа',
      lessons: 5,
    },
    {
      id: 2,
      title: 'Маршрутизация и планирование',
      description: 'Оптимизация маршрутов и составление графиков доставки',
      duration: '3 часа',
      lessons: 6,
    },
    {
      id: 3,
      title: 'Работа с системами связи',
      description: 'Использование радиосвязи и систем GPS-мониторинга',
      duration: '2.5 часа',
      lessons: 4,
    },
    {
      id: 4,
      title: 'Управление критическими ситуациями',
      description: 'Протоколы действий при аварийных и чрезвычайных ситуациях',
      duration: '3 часа',
      lessons: 7,
    },
    {
      id: 5,
      title: 'Клиентское обслуживание',
      description: 'Эффективная коммуникация с клиентами и водителями',
      duration: '1.5 часа',
      lessons: 3,
    },
  ]

  const toggleModule = (id: number) => {
    setCompletedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const progress = Math.round((completedModules.length / modules.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Курс для Диспетчеров</h1>
            <p className="text-gray-600 mt-1">Профессиональное обучение диспетчерской деятельности</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Выход
          </Link>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Кнопка входа в диспетчерскую консоль */}
        <Link
          href="/dispatcher"
          className="block mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg shadow-lg p-6 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">📍 Dispatcher Load Board</h2>
              <p className="text-purple-100">
                Эмулятор работы диспетчера для поиска и распределения грузов для водителей в США
              </p>
            </div>
            <div className="text-4xl">→</div>
          </div>
        </Link>

        {/* Прогресс обучения */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ваш прогресс</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-4">
              {progress}%
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            Пройдено модулей: {completedModules.length} из {modules.length}
          </p>
        </div>

        {/* Модули курса */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Модули обучения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {module.title}
                    </h3>
                    <input
                      type="checkbox"
                      checked={completedModules.includes(module.id)}
                      onChange={() => toggleModule(module.id)}
                      className="w-5 h-5 text-green-600 rounded mt-1"
                    />
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{module.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>⏱️ {module.duration}</span>
                    <span>📚 {module.lessons} уроков</span>
                  </div>

                  <Link
                    href={`/dashboard/module/${module.id}`}
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                  >
                    Начать модуль
                  </Link>
                </div>

                {completedModules.includes(module.id) && (
                  <div className="bg-green-50 px-6 py-3 border-t border-green-200">
                    <p className="text-green-700 font-medium text-sm flex items-center gap-2">
                      ✓ Модуль пройден
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Сертификат */}
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg shadow p-6 border-2 border-yellow-400">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">🎓 Поздравляем!</h3>
            <p className="text-yellow-800 mb-4">
              Вы прошли все модули курса и готовы получить сертификат диспетчера.
            </p>
            <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
              Получить сертификат
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
