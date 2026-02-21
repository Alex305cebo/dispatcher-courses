 'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Load, mockLoads as baseMockLoads } from '../../data/mockLoads'

export default function DispatcherPage() {
  const initialLoads: Load[] = (() => {
    const loadsCopy: Load[] = [...baseMockLoads]
    const allStates = [
      'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ]
    const present = new Set(loadsCopy.map((l) => l.pickupState))
    let nextId = Math.max(...loadsCopy.map((l) => l.id)) + 1
    allStates.forEach((st) => {
      if (!present.has(st)) {
        loadsCopy.push({
          id: nextId++,
          shipper: `AutoGen ${st}`,
          pickupLocation: `Auto pickup ${st}`,
          pickupCity: st,
          pickupState: st,
          deliveryLocation: `Auto delivery ${st}`,
          deliveryCity: st,
          deliveryState: st,
          distance: 100,
          weight: 30000,
          cargoType: 'General Merchandise',
          rate: 800,
          equipment: '53ft Dry Van',
          createdAt: '2025-02-19',
          status: 'Available',
          unloadTime: 1,
          pickupTime: '08:00',
        })
      }
    })

    // Связываем все грузы в кольцевую цепочку через поле linkedTo
    loadsCopy.forEach((l, i) => {
      l.linkedTo = loadsCopy[(i + 1) % loadsCopy.length].id
    })

    return loadsCopy
  })()

  const [loads, setLoads] = useState<Load[]>(initialLoads)
  const [filteredLoads, setFilteredLoads] = useState<Load[]>(initialLoads)
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null)
  const [searchCity, setSearchCity] = useState('')
  const [driverArrivalCity, setDriverArrivalCity] = useState('')
  const [filterEquipment, setFilterEquipment] = useState('All')
  const [filterShipmentState, setFilterShipmentState] = useState('All')
  const [filterPickupTime, setFilterPickupTime] = useState('All')
  const [assignedLoads, setAssignedLoads] = useState<number[]>([])
  const [driverName, setDriverName] = useState('')

  const applyFilters = () => {
    let filtered = loads.filter((load) => {
      const matchCity =
        !searchCity ||
        load.pickupCity.toLowerCase().includes(searchCity.toLowerCase()) ||
        load.deliveryCity.toLowerCase().includes(searchCity.toLowerCase())

      const matchDriverArrival =
        !driverArrivalCity ||
        load.deliveryCity.toLowerCase().includes(driverArrivalCity.toLowerCase())

      const matchEquipment = filterEquipment === 'All' || load.equipment === filterEquipment

      const matchShipmentState = filterShipmentState === 'All' || load.pickupState === filterShipmentState

      const getTimeOfDay = (time: string) => {
        const hour = parseInt(time.split(':')[0])
        if (hour >= 0 && hour < 4) return '00-04'
        if (hour >= 4 && hour < 8) return '04-08'
        if (hour >= 8 && hour < 12) return '08-12'
        if (hour >= 12 && hour < 16) return '12-16'
        if (hour >= 16 && hour < 20) return '16-20'
        return '20-24'
      }

      const matchPickupTime =
        filterPickupTime === 'All' || getTimeOfDay(load.pickupTime) === filterPickupTime

      const matchStatus = load.status === 'Available'

      return matchCity && matchDriverArrival && matchEquipment && matchShipmentState && matchPickupTime && matchStatus
    })

    setFilteredLoads(filtered)
  }

  const handleAssignLoad = (loadId: number) => {
    if (!driverName.trim()) {
      alert('Пожалуйста, введите имя водителя')
      return
    }

    setAssignedLoads([...assignedLoads, loadId])
    setLoads((prev) =>
      prev.map((load) =>
        load.id === loadId
          ? { ...load, status: 'Assigned' as const, assignedDriver: driverName }
          : load
      )
    )

    setFilteredLoads((prev) =>
      prev.filter((load) => {
        if (load.id === loadId) return false
        return true
      })
    )

    setSelectedLoad(null)
    alert(`Груз #${loadId} успешно назначен водителю ${driverName}!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">📍 Dispatcher Load Board</h1>
            <p className="text-blue-100 mt-1">Поиск и распределение грузов для водителей</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
            ← Вернуться
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Панель фильтров и информация */}
          <aside className="lg:col-span-1">
          

            {/* Фильтры */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 Фильтры</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Город прибывания водителя
                </label>
                <input
                  type="text"
                  value={driverArrivalCity}
                  onChange={(e) => setDriverArrivalCity(e.target.value)}
                  placeholder="например: Chicago"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🚛 Поиск по городу груза
                </label>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="например: Los Angeles"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📦 Штат отправки груза
                </label>
                <select
                  value={filterShipmentState}
                  onChange={(e) => setFilterShipmentState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">Все штаты</option>
                  <option value="AL">Alabama (AL)</option>
                  <option value="AK">Alaska (AK)</option>
                  <option value="AZ">Arizona (AZ)</option>
                  <option value="AR">Arkansas (AR)</option>
                  <option value="CA">California (CA)</option>
                  <option value="CO">Colorado (CO)</option>
                  <option value="CT">Connecticut (CT)</option>
                  <option value="DE">Delaware (DE)</option>
                  <option value="FL">Florida (FL)</option>
                  <option value="GA">Georgia (GA)</option>
                  <option value="HI">Hawaii (HI)</option>
                  <option value="ID">Idaho (ID)</option>
                  <option value="IL">Illinois (IL)</option>
                  <option value="IN">Indiana (IN)</option>
                  <option value="IA">Iowa (IA)</option>
                  <option value="KS">Kansas (KS)</option>
                  <option value="KY">Kentucky (KY)</option>
                  <option value="LA">Louisiana (LA)</option>
                  <option value="ME">Maine (ME)</option>
                  <option value="MD">Maryland (MD)</option>
                  <option value="MA">Massachusetts (MA)</option>
                  <option value="MI">Michigan (MI)</option>
                  <option value="MN">Minnesota (MN)</option>
                  <option value="MS">Mississippi (MS)</option>
                  <option value="MO">Missouri (MO)</option>
                  <option value="MT">Montana (MT)</option>
                  <option value="NE">Nebraska (NE)</option>
                  <option value="NV">Nevada (NV)</option>
                  <option value="NH">New Hampshire (NH)</option>
                  <option value="NJ">New Jersey (NJ)</option>
                  <option value="NM">New Mexico (NM)</option>
                  <option value="NY">New York (NY)</option>
                  <option value="NC">North Carolina (NC)</option>
                  <option value="ND">North Dakota (ND)</option>
                  <option value="OH">Ohio (OH)</option>
                  <option value="OK">Oklahoma (OK)</option>
                  <option value="OR">Oregon (OR)</option>
                  <option value="PA">Pennsylvania (PA)</option>
                  <option value="RI">Rhode Island (RI)</option>
                  <option value="SC">South Carolina (SC)</option>
                  <option value="SD">South Dakota (SD)</option>
                  <option value="TN">Tennessee (TN)</option>
                  <option value="TX">Texas (TX)</option>
                  <option value="UT">Utah (UT)</option>
                  <option value="VT">Vermont (VT)</option>
                  <option value="VA">Virginia (VA)</option>
                  <option value="WA">Washington (WA)</option>
                  <option value="WV">West Virginia (WV)</option>
                  <option value="WI">Wisconsin (WI)</option>
                  <option value="WY">Wyoming (WY)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🚛 Тип оборудования
                </label>
                <select
                  value={filterEquipment}
                  onChange={(e) => setFilterEquipment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">Все</option>
                  <option value="53ft Dry Van">53ft Dry Van</option>
                  <option value="53ft Reefer">53ft Reefer</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Amazon">Amazon</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🕐 Время отправки груза (промежутки суток)
                </label>
                <select
                  value={filterPickupTime}
                  onChange={(e) => setFilterPickupTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All">Все промежутки</option>
                  <option value="00-04">🌙 Ночь (00:00-04:00)</option>
                  <option value="04-08">🌅 Раннее утро (04:00-08:00)</option>
                  <option value="08-12">☀️ Утро/День (08:00-12:00)</option>
                  <option value="12-16">🌤️ День/Полдень (12:00-16:00)</option>
                  <option value="16-20">🌆 Вечер (16:00-20:00)</option>
                  <option value="20-24">🌃 Ночь (20:00-24:00)</option>
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Применить фильтры
              </button>
            </div>

            {/* Статистика */}
            <div className="bg-white rounded-lg shadow p-6 mt-6 border-l-4 border-purple-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Статистика</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Доступных грузов:</span>
                  <span className="font-bold text-gray-900">{filteredLoads.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Сумма ставок:</span>
                  <span className="font-bold text-green-600">
                    ${filteredLoads.reduce((sum, load) => sum + load.rate, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Средняя дистанция:</span>
                  <span className="font-bold text-gray-900">
                    {filteredLoads.length > 0
                      ? Math.round(filteredLoads.reduce((sum, load) => sum + load.distance, 0) / filteredLoads.length)
                      : 0}{' '}
                    миль
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Список грузов */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">🚚 Доступные грузы</h2>
              <span className="text-lg font-semibold text-blue-600">{filteredLoads.length} грузов</span>
            </div>

            {filteredLoads.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">Грузы не найдены. Измените фильтры.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLoads.map((load) => (
                  <div
                    key={load.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-l-4 border-blue-500"
                    onClick={() => setSelectedLoad(load)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Груз #{load.id}</h3>
                        <p className="text-gray-600 text-sm">{load.shipper}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-green-600">${load.rate}</p>
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        ⏱️ {load.unloadTime} часов
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">🚛 Маршрут</p>
                        <p className="font-semibold text-gray-900">
                          {load.pickupCity}, {load.pickupState} → {load.deliveryCity}, {load.deliveryState}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">📏 Информация</p>
                        <p className="font-semibold text-gray-900">
                          {load.distance} миль • {load.weight.toLocaleString()} фунтов
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">📦 Груз</p>
                        <p className="font-semibold text-gray-900">{load.cargoType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">🚐 Оборудование</p>
                        <p className="font-semibold text-gray-900">{load.equipment}</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedLoad(load)
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Просмотреть подробно
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Модальное окно с деталями груза */}
      {selectedLoad && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 sticky top-0">
              <h2 className="text-2xl font-bold">Груз #{selectedLoad.id}</h2>
              <p className="text-blue-100">Детальная информация о грузе</p>
            </div>

            <div className="p-6">
              {/* Основная информация */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Основная информация</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Отправитель</p>
                    <p className="font-semibold text-gray-900">{selectedLoad.shipper}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Время разгрузки</p>
                    <p className="font-semibold text-blue-600">{selectedLoad.unloadTime} часов</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ставка</p>
                    <p className="text-2xl font-bold text-green-600">${selectedLoad.rate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Статус</p>
                    <p className="font-semibold text-blue-600">{selectedLoad.status}</p>
                  </div>
                </div>
              </div>

              {/* Маршрут */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🗺️ Маршрут</h3>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <div className="flex flex-col gap-2 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Пункт отправления</p>
                      <p className="font-semibold text-gray-900">{selectedLoad.pickupLocation}</p>
                      <p className="text-gray-600">
                        {selectedLoad.pickupCity}, {selectedLoad.pickupState}
                      </p>
                    </div>
                    <div className="text-center text-blue-600 font-bold">↓</div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Пункт назначения</p>
                      <p className="font-semibold text-gray-900">{selectedLoad.deliveryLocation}</p>
                      <p className="text-gray-600">
                        {selectedLoad.deliveryCity}, {selectedLoad.deliveryState}
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-lg font-bold text-gray-900">
                    📏 {selectedLoad.distance} миль
                  </p>
                </div>
              </div>

              {/* Параметры груза */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📦 Параметры груза</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Тип груза</p>
                    <p className="font-semibold text-gray-900">{selectedLoad.cargoType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Вес</p>
                    <p className="font-semibold text-gray-900">{selectedLoad.weight.toLocaleString()} фунтов</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Требуемое оборудование</p>
                    <p className="font-semibold text-gray-900">{selectedLoad.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Дата создания</p>
                    <p className="font-semibold text-gray-900">{selectedLoad.createdAt}</p>
                  </div>
                </div>
              </div>

              {/* Расчёт доходов */}
              <div className="mb-6 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💰 Расчёты</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ставка за груз:</span>
                    <span className="font-semibold text-gray-900">${selectedLoad.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Расстояние:</span>
                    <span className="font-semibold text-gray-900">{selectedLoad.distance} миль</span>
                  </div>
                  <div className="flex justify-between border-t border-green-200 pt-2 mt-2">
                    <span className="text-gray-600">К/м показатель:</span>
                    <span className="font-bold text-green-600">
                      ${(selectedLoad.rate / selectedLoad.distance).toFixed(2)}/миля
                    </span>
                  </div>
                </div>
              </div>

              {/* Кнопки действия */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (driverName.trim()) {
                      handleAssignLoad(selectedLoad.id)
                    } else {
                      alert('Пожалуйста, введите имя водителя в левой панели')
                    }
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                >
                  ✓ Назначить водителю
                </button>
                <button
                  onClick={() => setSelectedLoad(null)}
                  className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
