'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
}

interface ModuleData {
  id: number
  title: string
  fullDescription: string
  duration: string
  lessons: Lesson[]
}

const modulesData: Record<number, ModuleData> = {
  1: {
    id: 1,
    title: 'Подготовка и сбор информации',
    fullDescription:
      'Прежде чем искать и выбирать груз для водителя, диспетчер должен собрать и проанализировать всю необходимую информацию. Этот модуль учит вас как правильно подготовиться: проверить документы водителя, уточнить его предпочтения и ограничения, оценить возможности выполнить заказ и обеспечить безопасность на всех этапах операции.',
    duration: '2.5 часа',
    lessons: [
      {
        id: 1,
        title: 'Проверка документов и лицензий водителя',
        description:
          'Изучение требуемых документов: CDL (коммерческие водительские права), медицинская справка, прошлые нарушения и стаж вождения. Проверка статуса лицензии в FMCSA.',
        duration: '25 мин',
      },
      {
        id: 2,
        title: 'Оценка возможностей и ограничений водителя',
        description:
          'Понимание опыта водителя, его специализации (сквозная сертификация Hazmat, рефрижератор), рабочий статус и количество часов вождения за период отдыха.',
        duration: '25 мин',
      },
      {
        id: 3,
        title: 'Анализ характеристик автомобиля',
        description: 'Проверка технического состояния, типа оборудования (53ft ван, reefer, flatbed), грузоподъемности, состояния документов и страховки транспорта.',
        duration: '30 мин',
      },
      {
        id: 4,
        title: 'Сбор информации о требованиях груза',
        description:
          'Изучение типов грузов, спецтребований (опасные материалы, охлаждаемые, хрупкие), сроков доставки и согласованности с возможностями водителя и автомобиля.',
        duration: '30 мин',
      },
      {
        id: 5,
        title: 'Планирование и график доставки',
        description: 'Расчет времени в пути, времени разгрузки, требуемые остановки отдыха и оценка реалистичности выполнения заказа в установленные сроки.',
        duration: '25 мин',
      },
    ],
  },
  2: {
    id: 2,
    title: 'Маршрутизация и планирование',
    fullDescription:
      'В этом модуле вы научитесь оптимизировать маршруты доставки, планировать графики и снижать затраты на топливо и время в пути.',
    duration: '3 часа',
    lessons: [
      {
        id: 1,
        title: 'Основы маршрутизации',
        description: 'Изучение методов построения эффективных маршрутов доставки.',
        duration: '30 мин',
      },
      {
        id: 2,
        title: 'Использование GPS и картографии',
        description: 'Работа с картами, определение оптимальных путей, анализ трафика.',
        duration: '35 мин',
      },
      {
        id: 3,
        title: 'Планирование графиков доставки',
        description: 'Составление расписания с учетом объемов и приоритетов задач.',
        duration: '30 мин',
      },
      {
        id: 4,
        title: 'Оптимизация затрат',
        description: 'Снижение расходов на топливо и время ожидания через умное планирование.',
        duration: '25 мин',
      },
      {
        id: 5,
        title: 'Анализ и улучшение маршрутов',
        description: 'Аналитика производительности и методы постоянного совершенствования.',
        duration: '30 мин',
      },
      {
        id: 6,
        title: 'Практические кейсы маршрутизации',
        description: 'Решение реальных задач построения маршрутов для различных сценариев.',
        duration: '30 мин',
      },
    ],
  },
  3: {
    id: 3,
    title: 'Работа с системами связи',
    fullDescription:
      'Изучение современных систем коммуникации, GPS-мониторинга и цифровых платформ для координации работы с водителями и техникой.',
    duration: '2.5 часа',
    lessons: [
      {
        id: 1,
        title: 'Радиосвязь и её особенности',
        description: 'Принципы работы радиосвязи, выбор оборудования, эксплуатация и техническое обслуживание.',
        duration: '30 мин',
      },
      {
        id: 2,
        title: 'GPS-мониторинг и отслеживание',
        description: 'Использование GPS для отслеживания транспорта в реальном времени и сбора аналитики.',
        duration: '30 мин',
      },
      {
        id: 3,
        title: 'Цифровые платформы управления',
        description: 'Работа с мобильными приложениями и веб-платформами для управления заказами.',
        duration: '25 мин',
      },
      {
        id: 4,
        title: 'Аварийная коммуникация и протоколы',
        description: 'Процедуры экстренной связи и восстановления в случае потери сигнала.',
        duration: '25 мин',
      },
    ],
  },
  4: {
    id: 4,
    title: 'Управление критическими ситуациями',
    fullDescription:
      'Подготовка к чрезвычайным ситуациям, протоколы действий при авариях, конфликтах и экстренных событиях. Развитие навыков принятия решений под давлением.',
    duration: '3 часа',
    lessons: [
      {
        id: 1,
        title: 'Типы критических ситуаций',
        description: 'Классификация кризисных событий: аварии, конфликты, форс-мажоры.',
        duration: '30 мин',
      },
      {
        id: 2,
        title: 'Протоколы действий при ДТП',
        description: 'Пошаговые инструкции для диспетчера при дорожно-транспортном происшествии.',
        duration: '35 мин',
      },
      {
        id: 3,
        title: 'Управление конфликтами',
        description: 'Методы разрешения конфликтов между водителями, клиентами и компанией.',
        duration: '30 мин',
      },
      {
        id: 4,
        title: 'Экстренные медицинские и спасательные ситуации',
        description: 'Координация с аварийными службами и первая помощь при чрезвычайных происшествиях.',
        duration: '30 мин',
      },
      {
        id: 5,
        title: 'Психологическая устойчивость и стресс-менеджмент',
        description: 'Методы справления со стрессом и эмоциональной нагрузкой в критических ситуациях.',
        duration: '25 мин',
      },
      {
        id: 6,
        title: 'Документирование и отчётность',
        description: 'Правильное оформление отчетов о критических ситуациях для страховой и юридической защиты.',
        duration: '20 мин',
      },
      {
        id: 7,
        title: 'Практические симуляции и кейсы',
        description: 'Разбор реальных случаев и практическое применение полученных знаний.',
        duration: '30 мин',
      },
    ],
  },
  5: {
    id: 5,
    title: 'Клиентское обслуживание',
    fullDescription:
      'Развитие навыков общения с клиентами, решение проблем, повышение удовлетворённости и лояльности через качественное обслуживание.',
    duration: '1.5 часа',
    lessons: [
      {
        id: 1,
        title: 'Основы качественного обслуживания',
        description:
          'Принципы и стандарты обслуживания, которые обеспечивают удовлетворение клиентов.',
        duration: '25 мин',
      },
      {
        id: 2,
        title: 'Коммуникация и активное слушание',
        description: 'Техники эффективного общения, умение слушать и понимать потребности клиентов.',
        duration: '25 мин',
      },
      {
        id: 3,
        title: 'Решение проблем и жалоб клиентов',
        description:
          'Методы быстрого и справедливого разрешения конфликтов и претензий.',
        duration: '20 мин',
      },
    ],
  },
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = Number(params.id)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  const module = modulesData[moduleId]

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Модуль не найден</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const toggleLesson = (id: number) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    )
  }

  const progress = Math.round((completedLessons.length / module.lessons.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
            <p className="text-gray-600 text-sm">Модуль #{module.id}</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Назад
          </Link>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Описание модуля */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Описание модуля</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">{module.fullDescription}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>⏱️ Длительность: {module.duration}</span>
            <span>📚 Уроков: {module.lessons.length}</span>
          </div>
        </div>

        {/* Прогресс */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ваш прогресс</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900">{progress}%</span>
          </div>
          <p className="text-gray-600 mt-2">
            Пройдено уроков: {completedLessons.length} из {module.lessons.length}
          </p>
        </div>

        {/* Уроки */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Уроки модуля</h2>
          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-lg font-semibold text-gray-500">
                        Урок {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{lesson.description}</p>
                    <span className="text-sm text-gray-500">⏱️ {lesson.duration}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={completedLessons.includes(lesson.id)}
                    onChange={() => toggleLesson(lesson.id)}
                    className="w-6 h-6 text-blue-600 rounded mt-1 flex-shrink-0"
                  />
                </div>

                {completedLessons.includes(lesson.id) && (
                  <div className="mt-4 pt-4 border-t border-green-200 bg-green-50 -mx-6 px-6 py-3 rounded-b-lg">
                    <p className="text-green-700 font-medium text-sm flex items-center gap-2">
                      ✓ Урок пройден
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Завершение модуля */}
        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg shadow p-6 border-2 border-green-400">
            <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 Модуль пройден!</h3>
            <p className="text-green-800 mb-4">
              Поздравляем! Вы успешно прошли все уроки модуля "{module.title}".
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                Скачать сертификат
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                К следующему модулю
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
