'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import NeuralBackground from '@/components/NeuralBackground'

export default function HomePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  
  const difficulties = [
    {
      id: 'easy',
      name: 'Легкий',
      icon: '🟢',
      questions: 15,
      maxErrors: 10,
      description: 'Идеально для начинающих',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'medium',
      name: 'Средний',
      icon: '🟡',
      questions: 30,
      maxErrors: 15,
      description: 'Стандартный тест',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'hard',
      name: 'Сложный',
      icon: '🔴',
      questions: 50,
      maxErrors: 20,
      description: 'Для профессионалов',
      color: 'from-red-500 to-pink-500'
    }
  ]
  
  const handleStart = () => {
    const userName = name.trim() || 'Гость'
    router.push(`/test?difficulty=${selectedDifficulty}&name=${encodeURIComponent(userName)}`)
  }
  
  return (
    <>
      {/* Neural Background */}
      <div className="fixed inset-0 z-0">
        <NeuralBackground 
          color="#a78bfa"
          trailOpacity={0.15}
          particleCount={1500}
          speed={0.8}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen w-full max-w-[430px] mx-auto border-x border-white/10 bg-slate-900/50 backdrop-blur-sm flex flex-col safe-area-inset">
        
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8 pb-safe">
          
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🚛</div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Dispatcher Cards
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Тренировка знаний диспетчера
            </p>
          </motion.div>

          {/* Name Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <label className="block text-white text-xs sm:text-sm font-semibold mb-2">
              👤 Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
            />
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <label className="block text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              🎯 Выберите сложность
            </label>
            <div className="space-y-2 sm:space-y-3">
              {difficulties.map((diff) => (
                <motion.button
                  key={diff.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(diff.id as any)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    selectedDifficulty === diff.id
                      ? 'border-white bg-white/10 shadow-lg'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-2xl sm:text-3xl">{diff.icon}</span>
                      <div className="text-left">
                        <div className="text-white font-bold text-sm sm:text-base">
                          {diff.name}
                        </div>
                        <div className="text-gray-400 text-[10px] sm:text-xs">
                          {diff.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-xs sm:text-sm font-semibold">
                        {diff.questions} вопросов
                      </div>
                      <div className="text-gray-400 text-[10px] sm:text-xs">
                        макс. {diff.maxErrors} ошибок
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="w-full py-3 sm:py-4 rounded-xl font-bold text-white text-base sm:text-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-shadow"
          >
            🚀 Начать тест
          </motion.button>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 pb-safe">
          <p className="text-center text-gray-500 text-[10px] sm:text-xs">
            © 2024 Dispatcher Training App
          </p>
        </div>

      </main>
    </>
  )
}
