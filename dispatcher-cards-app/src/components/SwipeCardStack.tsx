'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DispatcherCard from './DispatcherCard'
import { Question } from '@/data/questions'

interface SwipeCardStackProps {
  questions: Question[]
  onComplete: (results: { correct: number; wrong: number; byCategory: Record<string, { correct: number; total: number }> }) => void
  onSuccess: () => void
  onError: () => void
  onFlip: () => void
  onIndexChange?: (index: number) => void
  t: (key: string) => string
}

export default function SwipeCardStack({ 
  questions, 
  onComplete,
  onSuccess,
  onError,
  onFlip,
  onIndexChange,
  t
}: SwipeCardStackProps) {
  const [cards] = useState<Question[]>(questions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [categoryStats, setCategoryStats] = useState<Record<string, { correct: number; total: number }>>({})
  const swipeHandlerRef = useRef<((direction: 'left' | 'right') => void) | null>(null)

  // Лимит ошибок: 15 из 30 вопросов
  const maxWrongAnswers = 15

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex)
    }
  }, [currentIndex, onIndexChange])

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentCard = cards[currentIndex]
    const userAnswerYes = direction === 'right'
    const isCorrect = userAnswerYes === currentCard?.isCorrect
    
    if (isCorrect) {
      onSuccess()
      setCorrectCount(prev => prev + 1)
    } else {
      onError()
      setWrongCount(prev => prev + 1)
    }
    
    setCategoryStats(prev => {
      const category = currentCard?.category || 'default'
      const current = prev[category] || { correct: 0, total: 0 }
      return {
        ...prev,
        [category]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          total: current.total + 1
        }
      }
    })
    
    if (navigator.vibrate) {
      navigator.vibrate(isCorrect ? 50 : [50, 50, 50])
    }
    
    setTimeout(() => {
      const newCorrectCount = correctCount + (isCorrect ? 1 : 0)
      const newWrongCount = wrongCount + (isCorrect ? 0 : 1)
      const newCategoryStats = {
        ...categoryStats,
        [currentCard?.category || 'default']: {
          correct: (categoryStats[currentCard?.category || 'default']?.correct || 0) + (isCorrect ? 1 : 0),
          total: (categoryStats[currentCard?.category || 'default']?.total || 0) + 1
        }
      }
      
      // Проверка: если закончились вопросы - показываем результаты
      if (currentIndex + 1 >= cards.length) {
        onComplete({ 
          correct: newCorrectCount, 
          wrong: newWrongCount,
          byCategory: newCategoryStats
        })
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 300)
  }

  const handleButtonClick = (direction: 'left' | 'right') => {
    if (swipeHandlerRef.current) {
      swipeHandlerRef.current(direction)
    }
  }

  const visibleCards = cards.slice(currentIndex, currentIndex + 2)
  const progress = ((currentIndex) / 30) * 100

  return (
    <>
      {/* Progress Bar - Компактный */}
      <div className="px-3 pt-2 pb-1 flex-shrink-0">
        <div className="flex items-center justify-between mb-1 text-white text-[10px]">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">✓ {correctCount}</span>
            <span className="text-red-400 font-bold">✗ {wrongCount}</span>
          </div>
        </div>
        <div className="h-1 rounded-full overflow-hidden bg-white/10">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* CARDS CONTAINER - Занимает оставшееся пространство */}
      <div className="flex-1 px-3 pb-1 relative overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence>
            {visibleCards.map((question, idx) => (
              <DispatcherCard
                key={question?.id || idx}
                question={question}
                onSwipe={handleSwipe}
                isTop={idx === 0}
                index={idx}
                t={t}
                registerSwipeHandler={idx === 0 ? (handler) => { swipeHandlerRef.current = handler } : undefined}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* CONTROL BUTTONS - Подтянуты ближе к карточке */}
      <div className="flex items-center justify-center gap-4 px-4 py-2 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('left')}
          className="w-[55px] h-[55px] rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center text-xl font-bold"
          aria-label="Ответ: Нет"
        >
          ✗
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onFlip}
          className="w-[55px] h-[55px] rounded-full bg-purple-500 text-white shadow-lg flex items-center justify-center text-xl"
          aria-label="Показать ответ"
        >
          ℹ️
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('right')}
          className="w-[55px] h-[55px] rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center text-xl font-bold"
          aria-label="Ответ: Да"
        >
          ✓
        </motion.button>
      </div>
    </>
  )
}
