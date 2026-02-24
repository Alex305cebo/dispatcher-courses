'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

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
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen w-full max-w-[430px] mx-auto border-x border-white/10 bg-slate-900/50 backdrop-blur-sm flex flex-col">
        
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">🚛</div>
            <h1 className="text-3xl font-black text-white mb-2">
              Dispatcher Cards
            </h1>
            <p className="text-gray-400 text-sm">
              Тренировка знаний диспетчера
            </p>
          </motion.div>

          {/* Name Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <label className="block text-white text-sm font-semibold mb-2">
              👤 Ваше имя
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <label className="block text-white text-sm font-semibold mb-3">
              🎯 Выберите сложность
            </label>
            <div className="space-y-3">
              {difficulties.map((diff) => (
                <motion.button
                  key={diff.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDifficulty(diff.id as any)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedDifficulty === diff.id
                      ? 'border-white bg-white/10 shadow-lg'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{diff.icon}</span>
                      <div className="text-left">
                        <div className="text-white font-bold text-base">
                          {diff.name}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {diff.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-semibold">
                        {diff.questions} вопросов
                      </div>
                      <div className="text-gray-400 text-xs">
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
            className="w-full py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-shadow"
          >
            🚀 Начать тест
          </motion.button>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-center text-gray-500 text-xs">
            © 2024 Dispatcher Training App
          </p>
        </div>

      </main>
    </>
  )
}
