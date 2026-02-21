"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { mockLoads, Load } from '../../data/mockLoads'

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map((x) => parseInt(x, 10))
  return h * 60 + (m || 0)
}

export default function SimulatorPage() {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)

  // Step 1: driver setup
  const [driverName, setDriverName] = useState('')
  const [truckReady, setTruckReady] = useState(false)
  const [trailerFreeAt, setTrailerFreeAt] = useState('08:00')

  // Step 2: search loads
  const [query, setQuery] = useState('')
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null)
  // Step 4: broker communication
  const [driverDistanceToPickup, setDriverDistanceToPickup] = useState<number>(15)
  const [driverLocation, setDriverLocation] = useState<string>('Alexander City, AL')
  const [trailerType, setTrailerType] = useState<string>('')
  const [allowedWeight, setAllowedWeight] = useState<number>(45000)
  const [brokerContact, setBrokerContact] = useState<string>('broker@example.com')
  const [brokerMessages, setBrokerMessages] = useState<string[]>([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return mockLoads.slice(0, 20)
    return mockLoads.filter((l) =>
      l.pickupCity.toLowerCase().includes(q) ||
      l.deliveryCity.toLowerCase().includes(q) ||
      l.pickupState.toLowerCase().includes(q) ||
      l.deliveryState.toLowerCase().includes(q)
    )
  }, [query])

  const handleNext = () => {
    if (step === 1 && !driverName.trim()) {
      // auto-generate driver name if not provided
      const first = ['Alex','Sam','Taylor','Jordan','Chris','Pat','Lee','Morgan','Drew','Casey']
      const last = ['Ivanov','Petrov','Smith','Johnson','Brown','Davis','Miller','Wilson','Moore','Taylor']
      const gen = `${first[Math.floor(Math.random()*first.length)]} ${last[Math.floor(Math.random()*last.length)]}`
      setDriverName(gen)
      // inform user
      alert(`Имя водителя не указано — сгенерировано: ${gen}`)
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const handleBack = () => setStep((s) => Math.max(1, s - 1))

  const canDispatch = () => {
    if (!selectedLoad) return false
    // Check trailer free time vs pickup time
    const trailerMin = timeToMinutes(trailerFreeAt)
    const pickupMin = timeToMinutes(selectedLoad.pickupTime)
    return truckReady && trailerMin <= pickupMin
  }

  const handleDispatch = () => {
    if (!canDispatch()) {
      alert('Водитель/трак не готов или трейлер будет занят к моменту погрузки.')
      return
    }
    // Assign driver automatically without showing a message
    if (selectedLoad) {
      const idx = mockLoads.findIndex((l) => l.id === selectedLoad.id)
      if (idx >= 0) {
        mockLoads[idx] = { ...mockLoads[idx], status: 'Assigned', assignedDriver: driverName }
      }
      setSelectedLoad({ ...selectedLoad, status: 'Assigned', assignedDriver: driverName })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Симулятор диспетчера</h1>
            <p className="text-blue-100 text-sm">Практическая рабочая поверхность для тренировки задач диспетчера</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dispatcher" className="px-3 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20">Открыть Load Board</Link>
            <Link href="/" className="px-3 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20">Главная</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${step===1?'bg-indigo-600 text-white shadow-lg':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={()=>setStep(1)}>Подготовка</span>
              <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${step===2?'bg-indigo-600 text-white shadow-lg':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={()=>setStep(2)}>Поиск грузов</span>
              <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${step===3?'bg-indigo-600 text-white shadow-lg':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={()=>setStep(3)}>Проверка готовности</span>
              <span className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide whitespace-nowrap cursor-pointer transition-all ${step===4?'bg-indigo-600 text-white shadow-lg':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={()=>setStep(4)}>Связь с брокером</span>
            </div>
          </div>

          {step === 1 && (
            <section>
              <h3 className="font-semibold mb-3">Подготовка водителя и сбор информации</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input value={driverName} onChange={(e)=>setDriverName(e.target.value)} placeholder="Имя водителя" className="p-2 border rounded" />
                <div className="flex items-center gap-2">
                  <input id="truckReady" type="checkbox" checked={truckReady} onChange={(e)=>setTruckReady(e.target.checked)} />
                  <label htmlFor="truckReady">Трак готов к выезду</label>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Когда трейлер освободится (время)</label>
                  <input type="time" value={trailerFreeAt} onChange={(e)=>setTrailerFreeAt(e.target.value)} className="p-2 border rounded w-full" />
                </div>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded">Далее</button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h3 className="font-semibold mb-3">Поиск грузов</h3>
              <div className="flex gap-2 mb-4">
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Поиск по городу или штату" className="flex-1 p-2 border rounded" />
                <button onClick={()=>setQuery('')} className="px-3 py-2 bg-gray-100 rounded">Сброс</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-72 overflow-auto">
                {filtered.map((l)=> (
                  <div key={l.id} className={`p-3 border rounded ${selectedLoad?.id===l.id?'border-indigo-500':'border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">Груз #{l.id} — ${l.rate}</div>
                        <div className="text-sm text-gray-600">{l.pickupCity}, {l.pickupState} → {l.deliveryCity}, {l.deliveryState}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={()=>setSelectedLoad(l)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Выбрать</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <button onClick={handleBack} className="px-4 py-2 bg-gray-100 rounded">Назад</button>
                <button onClick={handleNext} className="px-4 py-2 bg-indigo-600 text-white rounded">Далее</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h3 className="font-semibold mb-3">Проверка готовности водителя и трака</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Информация о водителе</h4>
                  <p><strong>Имя:</strong> {driverName || '—'}</p>
                  <p><strong>Трак готов:</strong> {truckReady ? 'Да' : 'Нет'}</p>
                  <p><strong>Трейлер свободен:</strong> {trailerFreeAt}</p>
                </div>

                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Выбранный груз</h4>
                  {selectedLoad ? (
                    <>
                      <p><strong>Груз #{selectedLoad.id}</strong></p>
                      <p>{selectedLoad.pickupCity}, {selectedLoad.pickupState} → {selectedLoad.deliveryCity}, {selectedLoad.deliveryState}</p>
                      <p>Время погрузки: {selectedLoad.pickupTime}</p>
                      <p>Ставка: ${selectedLoad.rate}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Груз не выбран</p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button onClick={handleBack} className="px-4 py-2 bg-gray-100 rounded">Назад</button>
                <div className="flex gap-2">
                  <button onClick={()=>{setStep(1)}} className="px-4 py-2 bg-yellow-100 rounded">Править данные водителя</button>
                  <button onClick={handleDispatch} disabled={!selectedLoad || selectedLoad?.status==='Assigned'} className={`px-4 py-2 rounded ${selectedLoad?.status==='Assigned' ? 'bg-gray-300 text-gray-700' : canDispatch()? 'bg-green-600 text-white':'bg-gray-300 text-gray-700'}`}>
                    {selectedLoad?.status==='Assigned' ? 'Назначено' : 'Подтвердить назначение'}
                  </button>
                  <button onClick={()=>setStep(4)} className="px-4 py-2 bg-blue-100 rounded">Связаться с брокером</button>
                </div>
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <h3 className="font-semibold mb-3">Четкое понимание и связь с брокером</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Параметры водителя/трак</h4>
                  <label className="block text-sm text-gray-600">Расстояние до места погрузки (мили)</label>
                  <input type="number" value={driverDistanceToPickup} onChange={(e)=>setDriverDistanceToPickup(Number(e.target.value))} className="w-full p-2 border rounded mb-2" />
                  <label className="block text-sm text-gray-600">Текущее местоположение водителя</label>
                  <input type="text" value={driverLocation} onChange={(e)=>setDriverLocation(e.target.value)} className="w-full p-2 border rounded mb-2" />
                  <label className="block text-sm text-gray-600">Тип трейлера</label>
                  <input type="text" value={trailerType || (selectedLoad?.equipment ?? '')} onChange={(e)=>setTrailerType(e.target.value)} className="w-full p-2 border rounded mb-2" />
                  <label className="block text-sm text-gray-600">Допустимый вес (фунты)</label>
                  <input type="number" value={allowedWeight} onChange={(e)=>setAllowedWeight(Number(e.target.value))} className="w-full p-2 border rounded" />
                </div>

                <div className="p-4 border rounded">
                  <h4 className="font-semibold mb-2">Подготовка сообщения брокеру</h4>
                  <label className="block text-sm text-gray-600">Контакт брокера</label>
                  <input type="text" value={brokerContact} onChange={(e)=>setBrokerContact(e.target.value)} className="w-full p-2 border rounded mb-2" />

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-lg mb-3">
                    <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span className="text-lg">📧</span>
                      Предпросмотр сообщения
                    </p>
                    {selectedLoad ? (
                      <div className="space-y-3 text-sm">
                        {/* Greeting */}
                        <div>
                          <p className="text-gray-800 font-medium">Здравствуйте,</p>
                        </div>

                        {/* Intro */}
                        <div className="pl-3 border-l-2 border-blue-400 text-gray-700">
                          <p>Не могли бы вы предоставить более подробную информацию о следующем грузе?</p>
                        </div>

                        {/* Load Details Grid */}
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Номер груза</p>
                              <p className="text-blue-600 font-bold">{selectedLoad.id}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Дата доступности</p>
                              <p className="text-gray-700">{selectedLoad.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Отправка из</p>
                              <p className="text-gray-700 font-medium">{selectedLoad.pickupCity}, {selectedLoad.pickupState}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Доставка в</p>
                              <p className="text-gray-700 font-medium">{selectedLoad.deliveryCity}, {selectedLoad.deliveryState}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Местоположение водителя</p>
                              <p className="text-gray-700">{driverLocation}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Холостой ход</p>
                              <p className="text-gray-700">{driverDistanceToPickup} миль</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Расстояние поездки</p>
                              <p className="text-gray-700">{selectedLoad.distance} миль</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Ставка</p>
                              <p className="text-green-600 font-bold">${selectedLoad.rate}</p>
                            </div>
                          </div>
                        </div>

                        {/* Confirmation request */}
                        <div className="pl-3 border-l-2 border-blue-400 text-gray-700">
                          <p>Не могли бы вы также подтвердить тип товара и лучшую доступную ставку для этой перевозки?</p>
                        </div>

                        {/* Closing */}
                        <div>
                          <p className="text-gray-800 font-medium">Спасибо</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-600">📭 Груз не выбран — выберите груз на шаге 2, чтобы увидеть предпросмотр.</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => {
                      if(!selectedLoad){ alert('Выберите груз прежде чем копировать сообщение'); return }
                      const preview = `Здравствуйте,\n\nНе могли бы вы предоставить более подробную информацию о следующем грузе?\n\nНомер груза: ${selectedLoad.id}\nОтправка из: ${selectedLoad.pickupCity}, ${selectedLoad.pickupState}\nДоставка в: ${selectedLoad.deliveryCity}, ${selectedLoad.deliveryState}\nДата доступности: ${selectedLoad.createdAt}\nМестоположение водителя: ${driverLocation}\nХолостой ход: ${driverDistanceToPickup} миль\nРасстояние поездки: ${selectedLoad.distance} миль\nСтавка: $${selectedLoad.rate}\n\nНе могли бы вы также подтвердить тип товара и лучшую доступную ставку для этой перевозки?\n\nСпасибо`;
                      try {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          await navigator.clipboard.writeText(preview)
                          alert('✅ Сообщение скопировано в буфер обмена')
                        } else {
                          // fallback: open prompt so user can copy manually
                          // eslint-disable-next-line no-alert
                          window.prompt('Скопируйте сообщение вручную:', preview)
                        }
                      } catch (err) {
                        console.error('Clipboard error', err)
                        window.prompt('Скопируйте сообщение вручную:', preview)
                      }
                    }} className="flex-1 min-w-[150px] px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold rounded-lg transition">
                      📋 Скопировать сообщение
                    </button>

                    <button onClick={() => {
                      if(!selectedLoad){ alert('Выберите груз прежде чем отправлять сообщение'); return }
                      const msg = `Кому: ${brokerContact}\nТема: Груз ${selectedLoad.id} - запрос деталей\n\nЗдравствуйте,\n\nНе могли бы вы предоставить более подробную информацию о следующем грузе?\n\nНомер груза: ${selectedLoad.id}\nОтправка из: ${selectedLoad.pickupCity}, ${selectedLoad.pickupState}\nДоставка в: ${selectedLoad.deliveryCity}, ${selectedLoad.deliveryState}\nДата доступности: ${selectedLoad.createdAt}\nМестоположение водителя: ${driverLocation}\nХолостой ход: ${driverDistanceToPickup} миль\nРасстояние поездки: ${selectedLoad.distance} миль\nСтавка: $${selectedLoad.rate}\n\nНе могли бы вы также подтвердить тип товара и лучшую доступную ставку для этой перевозки?\n\nСпасибо`;
                      setBrokerMessages((m)=>[msg, ...m])
                      alert('✅ Сообщение отправлено брокеру (эмуляция)')
                    }} className="flex-1 min-w-[150px] px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition">
                      ✉️ Отправить брокеру
                    </button>

                    <button onClick={()=>setBrokerMessages([])} className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition">
                      🗑️ Очистить журнал
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-lg border-2 border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">📬</span>
                  Журнал отправленных сообщений
                </h4>
                {brokerMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Отправленных сообщений нет. Отправляйте сообщения брокерам для заполнения журнала.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-auto">
                    {brokerMessages.map((m, idx)=> (
                      <details key={idx} className="bg-gray-50 rounded border border-gray-300 hover:border-blue-400 transition cursor-pointer">
                        <summary className="px-4 py-3 font-semibold text-gray-800 select-none">
                          <span className="text-sm text-gray-500">Сообщение #{brokerMessages.length - idx}</span>
                        </summary>
                        <div className="px-4 pb-3 border-t border-gray-200 bg-white">
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words font-mono">{m}</pre>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <button onClick={handleBack} className="px-4 py-2 bg-gray-100 rounded">Назад</button>
                <div className="flex gap-2">
                  <button onClick={()=>setStep(1)} className="px-4 py-2 bg-yellow-100 rounded">Вернуться к началу</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
