'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ResultsModalProps {
  isOpen: boolean
  correct: number
  wrong: number
  total: number
  byCategory?: Record<string, { correct: number; total: number }>
  onRestart: () => void
  onClose: () => void
  t: (key: string) => string
}

export default function ResultsModal({
  isOpen,
  correct,
  wrong,
  total,
  byCategory = {},
  onRestart,
  onClose,
  t
}: ResultsModalProps) {
  const percentage = Math.round((correct / total) * 100)
  
  const categoryNames: Record<string, string> = {
    'Законодательство': '⚖️ Законодательство',
    'Финансы': '💰 Финансы',
    'Переговоры': '🤝 Переговоры',
    'Основы работы': '📋 Основы работы',
    'Безопасность': '🛡️ Безопасность',
    'Документация': '📄 Документация'
  }
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return t('results.excellent')
    if (percentage >= 70) return t('results.good')
    return t('results.needsPractice')
  }
  
  const getPerformanceEmoji = () => {
    if (percentage >= 80) return '🎉'
    if (percentage >= 60) return '👍'
    return '💪'
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-md rounded-3xl p-4 backdrop-blur-xl border border-white/20 bg-slate-900/90 shadow-2xl"
          >
            {/* Restart Button - на верху */}
            <div className="mb-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRestart}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition-shadow duration-200 text-sm"
              >
                {t('results.restart')}
              </motion.button>
            </div>

            {/* Header - компактный, текст уменьшен на 30% */}
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold mb-0.5 text-white">
                {t('results.title')}
              </h2>
              <p className={`text-sm font-semibold ${
                percentage >= 80 ? 'text-green-400' : 
                percentage >= 60 ? 'text-purple-400' : 'text-red-400'
              }`}>
                {getPerformanceMessage()}
              </p>
            </div>
            
            {/* Stats - компактные, текст уменьшен на 30% */}
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl p-1.5 text-center bg-green-500/20 border-2 border-green-500/30"
              >
                <div className="text-xl font-black text-green-400 mb-0">
                  {correct}
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-300">
                  {t('results.correctAnswers')}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl p-1.5 text-center bg-red-500/20 border-2 border-red-500/30"
              >
                <div className="text-xl font-black text-red-400 mb-0">
                  {wrong}
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-300">
                  {t('results.wrongAnswers')}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl p-1.5 text-center bg-purple-500/20 border-2 border-purple-500/30"
              >
                <div className="text-xl font-black text-purple-400 mb-0">
                  {percentage}%
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-300">
                  {t('results.successRate')}
                </div>
              </motion.div>
            </div>
            
            {/* Category Breakdown - компактная, увеличенный текст */}
            {Object.keys(byCategory).length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-1.5 rounded-xl bg-white/5 border border-white/10"
              >
                <h3 className="text-[12px] font-bold text-white mb-1 uppercase tracking-wide">
                  📊 По категориям
                </h3>
                <div className="space-y-0.5">
                  {Object.entries(byCategory).map(([category, stats]) => {
                    const catPercentage = Math.round((stats.correct / stats.total) * 100)
                    return (
                      <div key={category} className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-300">{categoryNames[category] || category}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-semibold">
                            {stats.correct}/{stats.total}
                          </span>
                          <span className={`font-bold ${
                            catPercentage >= 80 ? 'text-green-400' : 
                            catPercentage >= 60 ? 'text-purple-400' : 'text-red-400'
                          }`}>
                            {catPercentage}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
